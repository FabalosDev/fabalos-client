<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';

  export let data;
  export let form;

  // ⚡ FIX: Destructure the server data so 'allProjects' exists
  $: ({ allProjects, allClients, tickets, milestones, availableModules, stats, storageStatus } = data);

  let showProvisionModal = false;
  let loading = false;

  // 🎨 NEW: Default to Fabalos Blue, but bindable for real-time changes
  let brandColor = '#3b82f6';

  // ⚡ FILTER: Show ALL projects except those explicitly marked inactive/finished
  $: activeProjects = allProjects?.filter((p) => {
    const s = p.storage_health?.toLowerCase() || '';
    // Add any other "dead" statuses to this list
    const excluded = ['completed', 'inactive', 'end_contract', 'end', 'finished'];

    // Keep project if its status is NOT in the excluded list
    return !excluded.some(status => s.includes(status));
  }) || [];

  // Helper: Status Colors
  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case 'healthy':
        return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
      case 'warning':
        return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]';
      case 'critical':
        return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
      default:
        return 'bg-slate-500';
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  export const actions = {
  // PROVISIONING NEW TENANT
  provision: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const { client_name, client_email, tenant_slug, brand_color } = Object.fromEntries(formData);

    // 1. Client Identity
    const { data: client, error: cErr } = await supabase.from('authorized_clients').insert([{ display_name: client_name, email: client_email }]).select().single();
    if (cErr) return fail(400, { message: 'Client Creation Failed' });

    // 2. Project Link
    const { error: pErr } = await supabase.from('projects').insert([{
      client_id: client.id,
      tenant_slug,
      brand_color: brand_color || '#3b82f6',
      storage_health: 'healthy',
      active_modules: ['vault', 'support']
    }]);

    return pErr ? fail(400, { message: 'Link Failed' }) : { success: true };
  },

  // ASSIGN MILESTONE
  addMilestone: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const { project_id, title, target_date } = Object.fromEntries(formData);
    const { error } = await supabase.from('milestones').insert([{ project_id, title, target_date, status: 'PENDING' }]);
    return error ? fail(400) : { success: true };
  },

  // RESOLVE ANOMALY
  resolveTicket: async ({ request, locals: { supabase } }) => {
    const id = (await request.formData()).get('id');
    await supabase.from('support_tickets').update({ status: 'RESOLVED' }).eq('id', id);
    return { success: true };
  }
};
</script>

<svelte:head>
  <title>Fabalos // Cockpit</title>
</svelte:head>

<div class="min-h-screen bg-[#050505] p-6 font-mono text-slate-200 selection:bg-red-500/30 md:p-12">
<header
    class="mb-12 flex flex-col justify-between gap-6 border-b border-slate-900 pb-6 md:flex-row md:items-end"
  >
    <div>
      <h1 class="text-4xl font-black tracking-tighter text-white uppercase">
        <span class="text-red-600">SYS_ADMIN</span> // COCKPIT
      </h1>
      <p class="mt-2 flex items-center gap-2 text-[10px] tracking-[0.2em] text-slate-500 uppercase">
        <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
        Secure_Session_Active: Frank Abalos
      </p>
    </div>

    <div class="flex items-center gap-6 text-right">
      <div>
        <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Storage Uplink</p>
        <p
          class="text-xs font-bold uppercase {storageStatus.connected
            ? 'text-blue-500'
            : 'text-red-500'}"
        >
          {storageStatus.bucketName}
        </p>
      </div>

      <div>
        <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest">System Time</p>
        <p class="text-xs font-bold text-slate-300 uppercase">{new Date().toLocaleTimeString()}</p>
      </div>

      <div class="hidden h-8 w-px bg-slate-800 md:block"></div>

      <form action="/auth/logout" method="POST">
        <button
          type="submit"
          class="flex items-center gap-2 text-xs font-bold text-red-500 transition-colors hover:text-red-400 uppercase"
        >
          <span>Disconnect</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
              points="16 17 21 12 16 7"
            /><line x1="21" x2="9" y1="12" y2="12" /></svg
          >
        </button>
      </form>
    </div>
  </header>
  <section class="mb-16">
    <div class="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div
        class="group relative overflow-hidden rounded border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-600"
      >
        <p class="mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Total Projects
        </p>
        <p class="text-3xl font-bold text-white transition-colors group-hover:text-blue-400">
          {stats.totalProjects}
        </p>
        <div class="absolute -right-4 -bottom-4 text-slate-800 opacity-20">
          <svg class="h-24 w-24" fill="currentColor" viewBox="0 0 24 24"
            ><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg
          >
        </div>
      </div>

<div class="group relative overflow-hidden rounded border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-red-600">
    <p class="mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Open Anomalies</p>
    <p class="text-3xl font-bold text-red-500 group-hover:animate-pulse">{stats.openTickets || 0}</p>
</div>

<div class="group relative overflow-hidden rounded border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-blue-600">
    <p class="mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authorized Entities</p>
    <p class="text-3xl font-bold text-blue-500">{stats.totalClients || 0}</p>
</div>

      <div
        class="group relative overflow-hidden rounded border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-600"
      >
        <p class="mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Modules</p>
        <p class="text-3xl font-bold text-yellow-500">{stats.activeModules}</p>
        <p class="text-[10px] text-slate-500">DEPLOYED</p>
      </div>
    </div>
  </section>

<section class="mb-16 border-t border-slate-900 pt-12">
    <div class="mb-6 flex items-center justify-between border-l-2 border-red-600 px-2 pl-4">
        <h2 class="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">Support_Anomaly_Monitor</h2>
    </div>
    <div class="overflow-x-auto rounded-lg border border-slate-900 bg-slate-950">
        <table class="w-full text-left text-xs font-mono">
            <thead class="bg-black/50 text-slate-500 uppercase tracking-wider">
                <tr><th class="px-6 py-4">Tenant</th><th class="px-6 py-4">Subject</th><th class="px-6 py-4">Severity</th><th class="px-6 py-4 text-right">Uplink</th></tr>
            </thead>
            <tbody class="divide-y divide-slate-900 text-slate-400">
                {#each tickets as ticket}
                    <tr class="hover:bg-slate-900/50 transition-colors">
                        <td class="px-6 py-4 font-bold text-white uppercase">{ticket.tenant_slug}</td>
                        <td class="px-6 py-4 opacity-70">{ticket.subject}</td>
                        <td class="px-6 py-4"><span class="px-2 py-0.5 rounded text-[9px] {ticket.severity === 'HIGH' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}">[{ticket.severity}]</span></td>
                        <td class="px-6 py-4 text-right">
                            <form method="POST" action="?/resolveTicket" use:enhance><input type="hidden" name="id" value={ticket.id} /><button type="submit" class="text-emerald-500 hover:text-white uppercase font-bold text-[10px]">Resolve</button></form>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>
  <section class="mb-16">
    <div class="mb-6 flex items-center justify-between border-l-2 border-green-500 px-2 pl-4">
      <h2 class="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
        Live_Operations_Monitor
      </h2>
      <span class="text-[10px] text-green-500 uppercase animate-pulse">
        ● {activeProjects.length} Systems Online
      </span>
    </div>

    {#if activeProjects.length > 0}
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each activeProjects as project}
          <div
            class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20"
          >
            <div
              class="absolute top-0 left-0 h-full w-1 {project.storage_health === 'healthy'
                ? 'bg-green-500'
                : 'bg-slate-700'} transition-all group-hover:h-full"
            ></div>

            <div class="p-6 pl-8">
              <div class="mb-4 flex items-start justify-between">
                <div>
                  <h3
                    class="text-xl font-bold text-white transition-colors group-hover:text-green-400"
                  >
                    {project.tenant_slug}
                  </h3>
                  <p class="mt-1 text-[10px] tracking-widest text-slate-500 uppercase">
                    UUID: {project.id.slice(0, 8)}...
                  </p>
                </div>

                <div class="relative">
                  <div
                    class={`h-3 w-3 rounded-full ${getStatusColor(project.storage_health || 'default')}`}
                  ></div>
                </div>
              </div>

              <div
                class="mb-6 grid grid-cols-2 gap-x-2 gap-y-4 border-t border-slate-800 pt-4 text-xs"
              >
                <div>
                  <span class="block text-slate-500 uppercase">DB Version</span>
                  <span class="text-slate-300">{project.database_version || 'v1.0'}</span>
                </div>
                <div>
                  <span class="block text-slate-500 uppercase">Last Sync</span>
                  <span class="text-slate-300">{formatDate(project.last_updated)}</span>
                </div>
                <div class="col-span-2">
                  <span class="mb-1 block text-slate-500 uppercase">Modules Active</span>
                  <div class="flex gap-2">
                    {#if project.active_modules}
                      {#each project.active_modules as mod}
                        <span
                          class="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-300"
                        >
                          {mod}
                        </span>
                      {/each}
                    {:else}
                      <span class="text-slate-600 italic">None active</span>
                    {/if}
                  </div>
                </div>
              </div>

              <a href="/portal/{project.tenant_slug}" class="block w-full">
                <button
                  class="flex w-full items-center justify-center gap-2 rounded bg-slate-800 py-2 text-xs font-bold tracking-wider text-slate-400 uppercase transition-colors hover:bg-green-600 hover:text-white"
                >
                  <span>Enter System</span>
                  <svg
                    class="h-3 w-3 min-w-[12px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path></svg
                  >
                </button>
              </a>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="rounded border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center">
        <p class="text-sm text-slate-500">No Active Systems Detected</p>
        <p class="mt-1 text-[10px] text-slate-600 uppercase">Check provisioning table below</p>
      </div>
    {/if}
  </section>

  <section class="rounded-lg border border-slate-900 bg-slate-950 shadow-2xl">
    <div
      class="flex items-center justify-between border-b border-slate-900 bg-slate-900/50 px-6 py-4"
    >
      <div class="flex items-center gap-4">
        <h2 class="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
          Global_Provisioning_Table
        </h2>
        <span class="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500">
          TOTAL: {allProjects.length}
        </span>
      </div>

      <button
        on:click={() => (showProvisionModal = true)}
        class="group flex items-center gap-2 rounded border border-slate-700 bg-slate-900 px-4 py-2 text-[10px] font-bold text-white uppercase transition-all hover:border-blue-500 hover:bg-blue-500/10"
      >
        <span class="group-hover:text-blue-400">+ Provision New Tenant</span>
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-black/50 text-slate-500 uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4 font-normal">Tenant Slug</th>
            <th class="px-6 py-4 font-normal">Authorized Entity</th>
            <th class="px-6 py-4 font-normal">Contact / ID</th>
            <th class="px-6 py-4 font-normal">Integrity</th>
            <th class="px-6 py-4 text-right font-normal">Control</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-900 text-slate-400">
          {#each allProjects as project}
            <tr class="group transition-colors hover:bg-slate-900/50">
              <td class="px-6 py-4 font-bold text-white group-hover:text-blue-400">
                {project.tenant_slug}
              </td>
              <td class="px-6 py-4">
                {project.authorized_clients?.display_name || 'ORPHAN_PROJECT'}
              </td>
              <td class="px-6 py-4 font-mono text-[10px] text-slate-600">
                {project.authorized_clients?.email || 'N/A'}
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wide
                  {project.storage_health === 'healthy'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'}"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full {project.storage_health === 'healthy'
                      ? 'bg-green-500'
                      : 'bg-red-500'}"
                  ></span>
                  {project.storage_health}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
                  class="mr-4 text-[10px] font-bold text-slate-600 uppercase transition-colors hover:text-white"
                >
                  Edit_Access
                </button>
                <button
                  class="text-[10px] font-bold text-red-900 uppercase transition-colors hover:text-red-500"
                >
                  Decommission
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  {#if showProvisionModal}
    <div
      transition:fade
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-lg overflow-hidden rounded-lg border border-slate-700 bg-[#0a0a0a] shadow-2xl"
        transition:fly={{ y: 20 }}
      >
        <div class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
          <span class="text-xs font-bold text-white uppercase tracking-widest">
            Provisioning_Terminal
          </span>
          <button
            on:click={() => (showProvisionModal = false)}
            class="text-slate-500 hover:text-red-500"
          >
            ✖
          </button>
        </div>

        <div class="p-8">
          <form
            method="POST"
            action="?/provision"
            use:enhance={() => {
              loading = true;
              return async ({ update }) => {
                await update();
                loading = false;
                if (form?.success) showProvisionModal = false;
              };
            }}
            class="space-y-6"
          >
            <div class="space-y-1">
              <label
                for="tenant_slug"
                class="text-[10px] font-bold text-blue-500 uppercase tracking-widest"
              >
                Target Tenant Slug
              </label>
              <input
                name="tenant_slug"
                type="text"
                placeholder="e.g. project-omega"
                required
                class="w-full rounded border border-slate-800 bg-black px-4 py-3 text-sm text-white placeholder-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div class="space-y-1">
              <label
                for="brand_color"
                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
              >
                Brand Color (Identity)
              </label>
              <div class="flex gap-2">
                <div class="relative">
                  <input
                    type="color"
                    bind:value={brandColor}
                    class="h-10 w-10 cursor-pointer rounded border border-slate-800 bg-black p-1"
                  />
                </div>
                <input
                  name="brand_color"
                  type="text"
                  bind:value={brandColor}
                  class="w-full rounded border border-slate-800 bg-black px-4 py-2 text-sm text-white placeholder-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label
                  for="client_name"
                  class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                >
                  Client Name
                </label>
                <input
                  name="client_name"
                  type="text"
                  placeholder="Acme Corp"
                  required
                  class="w-full rounded border border-slate-800 bg-black px-4 py-3 text-sm text-white placeholder-slate-700 focus:border-slate-600 focus:ring-0"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="client_email"
                  class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                >
                  Auth Email
                </label>
                <input
                  name="client_email"
                  type="email"
                  placeholder="admin@acme.com"
                  required
                  class="w-full rounded border border-slate-800 bg-black px-4 py-3 text-sm text-white placeholder-slate-700 focus:border-slate-600 focus:ring-0"
                />
              </div>
            </div>

            <div class="border-t border-slate-800 pt-4">
              <button
                type="submit"
                disabled={loading}
                class="w-full rounded bg-white py-3 text-xs font-black tracking-widest text-black uppercase transition-colors hover:bg-slate-200 disabled:opacity-50"
              >
                {loading ? 'Executing_Protocol...' : 'Initialize_Node'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>
<div class="min-h-screen bg-[#050505] p-6 font-mono text-slate-200 selection:bg-red-500/30 md:p-12">

</div>
