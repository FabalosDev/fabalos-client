<script lang="ts">
  import { enhance } from '$app/forms';
  export let clients = [];
  export let users = [];

  let viewMode = 'users';

  // --- VARIABLES ---
  let selectedEmail = '';
  let selectedUUID = '';

  let client_company_name = '';
  let client_display_name = '';

  let editing_client_id = null;

  // --- FUNCTIONS ---

  function selectUser(user) {
    selectedEmail = user.email;
    selectedUUID = user.id;

    // Reset Edit Mode
    editing_client_id = null;
    client_company_name = '';
    client_display_name = '';

    viewMode = 'registry';
  }

  function editClient(client) {
    selectedEmail = client.email;
    selectedUUID = client.auth_id;

    // Populate fields
    client_company_name = client.client_name;
    client_display_name = client.display_name;

    editing_client_id = client.id;
    viewMode = 'registry';
  }
</script>

<div class="rounded border border-slate-900 bg-slate-950 p-6 shadow-2xl h-full flex flex-col">

  <div class="mb-6 flex items-center justify-between border-b border-blue-900/30 pb-4">
    <div class="flex gap-4">
      <button on:click={() => viewMode = 'registry'} class="{viewMode === 'registry' ? 'text-blue-400 font-bold' : 'text-slate-600'} text-xs uppercase tracking-widest transition-colors">
        1. {editing_client_id ? 'EDIT MODE' : 'REGISTRY FORM'}
      </button>
      <span class="text-slate-700">|</span>
      <button on:click={() => { viewMode = 'users'; editing_client_id = null; client_company_name = ''; client_display_name = ''; }} class="{viewMode === 'users' ? 'text-emerald-400 font-bold' : 'text-slate-600'} text-xs uppercase tracking-widest transition-colors">
        2. Select New User ({users?.length || 0})
      </button>
    </div>
  </div>

  {#if viewMode === 'registry'}
    <form
      method="POST"
      action={editing_client_id ? '?/updateClient' : '?/addClient'}
      use:enhance
      class="mb-8 border border-blue-900/20 bg-blue-900/5 p-4 rounded relative overflow-hidden"
    >
      {#if selectedEmail}
        <div class="mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
            <div class="h-8 w-8 rounded bg-gradient-to-br {editing_client_id ? 'from-blue-600 to-blue-800' : 'from-emerald-600 to-emerald-800'} flex items-center justify-center font-bold text-white text-xs">
                {editing_client_id ? 'ED' : 'NW'}
            </div>
            <div>
                <p class="text-[9px] uppercase tracking-widest text-slate-500">Target Identity</p>
                <p class="text-sm font-mono font-bold {editing_client_id ? 'text-blue-400' : 'text-emerald-400'}">
                    {selectedEmail}
                </p>
            </div>
        </div>
      {/if}

      <input type="hidden" name="id" value={editing_client_id || ''} />

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">

        <div>
           <label class="block text-[9px] text-blue-400 uppercase mb-1">Client Name (Company)</label>
           <input
             name="client_name"
             bind:value={client_company_name}
             placeholder="E.G. FABALOS AUTOMATION"
             required
             class="w-full bg-black border border-slate-800 p-2.5 text-xs text-white uppercase focus:border-blue-500 outline-none placeholder:text-slate-700"
           />
        </div>

        <div>
           <label class="block text-[9px] text-purple-400 uppercase mb-1">Display Name (User Alias)</label>
           <input
             name="display_name"
             bind:value={client_display_name}
             placeholder="E.G. FAB ADMIN"
             required
             class="w-full bg-black border border-slate-800 p-2.5 text-xs text-white uppercase focus:border-purple-500 outline-none placeholder:text-slate-700"
           />
        </div>
      </div>

      <input type="hidden" name="email" value={selectedEmail} />
      <input type="hidden" name="auth_id" value={selectedUUID} />

      <button type="submit" disabled={!selectedUUID} class="w-full bg-slate-800 border border-slate-700 py-3 text-[10px] font-black uppercase text-white hover:bg-slate-700 hover:border-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
        {editing_client_id ? 'UPDATE ACCESS DATA' : (selectedUUID ? 'GRANT ACCESS' : 'PLEASE SELECT A USER FROM TAB 2')}
      </button>
    </form>

    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar border-t border-slate-900 pt-4">
      <table class="w-full text-left text-[10px] font-mono text-slate-400">
        <thead class="uppercase text-slate-600">
          <tr class="border-b border-slate-900">
            <th class="py-2">Client / Company</th>
            <th class="py-2">User Alias</th>
            <th class="py-2 text-center">Status</th>
            <th class="py-2 text-right pr-2">Control</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-900/50">
          {#each clients as client}
            <tr class="group hover:bg-blue-900/10">

              <td class="py-3 font-bold text-white uppercase">
                {client.client_name || '---'}
                <div class="text-[9px] text-slate-600 font-normal hidden group-hover:block">{client.email}</div>
              </td>

              <td class="py-3 text-purple-300 uppercase">
                {client.display_name || '---'}
              </td>

              <td class="py-3 text-center">
                 {#if client.status === 'ACTIVE'}
                    <span class="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-500 ring-1 ring-inset ring-emerald-400/20">ACTIVE</span>
                 {:else}
                    <span class="inline-flex items-center rounded-full bg-red-400/10 px-2 py-0.5 text-[9px] font-medium text-red-500 ring-1 ring-inset ring-red-400/20">INACTIVE</span>
                 {/if}
              </td>

              <td class="py-3 text-right pr-2 space-x-2">
                <button
                  on:click={() => editClient(client)}
                  class="text-blue-400 hover:text-blue-300 font-bold uppercase hover:underline"
                >
                  [EDIT]
                </button>

                <form method="POST" action="?/toggleClientStatus" use:enhance class="inline">
                  <input type="hidden" name="id" value={client.id} />
                  <input type="hidden" name="current_status" value={client.status || 'ACTIVE'} />
                  <button class="font-bold uppercase hover:underline {client.status === 'ACTIVE' ? 'text-red-500 hover:text-red-400' : 'text-emerald-500 hover:text-emerald-400'}">
                    [{client.status === 'ACTIVE' ? 'DISABLE' : 'ENABLE'}]
                  </button>
                </form>
              </td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  {:else}
    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <p class="mb-4 text-[10px] text-emerald-500 uppercase animate-pulse">>> Click a user to auto-fill the form</p>
      <table class="w-full text-left text-[10px] font-mono text-slate-400">
        <tbody class="divide-y divide-slate-900/50">
          {#each users as user}
            <tr on:click={() => selectUser(user)} class="group hover:bg-emerald-900/20 cursor-pointer transition-colors border-l-2 border-transparent hover:border-emerald-500">
              <td class="py-3 pl-2 text-white font-bold">{user.email}</td>
              <td class="py-3 text-right pr-2 text-emerald-600 group-hover:text-emerald-400">SELECT >></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>