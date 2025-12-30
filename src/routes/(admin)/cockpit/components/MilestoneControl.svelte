<script lang="ts">
  import { enhance } from '$app/forms';

  export let projects = [];
  let selectedProject = null;

  // --- EDIT STATE VARIABLES ---
  let isEditing = false;
  let editingId = null;

  // Default Values
  let formTitle = '';
  let formPhase = 'Phase I: Ignition';
  let formStatus = 'PENDING';
  let formDate = '';

  // SYNC FIX
  $: if (selectedProject && projects.length > 0) {
      const freshData = projects.find(p => p.id === selectedProject.id);
      if (freshData) selectedProject = freshData;
  }

  function formatDate(dateString) {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // --- FUNCTION: AKYAT DATA SA FORM ---
  function editMilestone(m) {
      isEditing = true;
      editingId = m.id;

      // Populate inputs
      formTitle = m.title;
      formPhase = m.phase_label;
      formStatus = m.status;
      // Convert ISO date to YYYY-MM-DD for input field
      formDate = m.due_date ? new Date(m.due_date).toISOString().split('T')[0] : '';
  }

  // --- FUNCTION: CANCEL EDIT ---
  function resetForm() {
      isEditing = false;
      editingId = null;
      formTitle = '';
      formPhase = 'Phase I: Ignition';
      formStatus = 'PENDING';
      formDate = '';
  }
</script>

<div class="rounded border border-slate-900 bg-slate-950 p-6 shadow-2xl h-full flex flex-col">

  <div class="flex justify-between items-center mb-6 border-b border-slate-900 pb-4">
    <h2 class="text-xs font-bold text-emerald-400 uppercase tracking-widest">
      {selectedProject ? `>> TARGET: ${selectedProject.tenant_slug}` : '>> SELECT PROJECT UPLINK'}
    </h2>
    {#if selectedProject}
      <button on:click={() => { selectedProject = null; resetForm(); }} class="text-[10px] font-bold text-slate-500 hover:text-white uppercase transition-colors">
        [ RETURN TO GRID ]
      </button>
    {/if}
  </div>

  {#if !selectedProject}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pr-2 max-h-[400px]">
      {#each projects as p}
        <button on:click={() => selectedProject = p} class="group text-left p-4 border border-slate-800 bg-slate-900/30 hover:bg-emerald-900/10 hover:border-emerald-500/50 transition-all rounded">
          <div class="text-white font-bold text-xs uppercase mb-1">{p.authorized_clients?.client_name || p.tenant_slug}</div>
          <div class="flex justify-between text-[9px] text-slate-500 font-mono uppercase">
            <span>ID: {p.tenant_slug}</span>
            <span class="group-hover:text-emerald-400 transition-colors">MILESTONES: {p.project_milestones?.length || 0}</span>
          </div>
        </button>
      {/each}
    </div>

  {:else}

    <form
        method="POST"
        action={isEditing ? "?/updateMilestone" : "?/addMilestone"}
        use:enhance={() => {
            return async ({ update }) => {
                await update();
                resetForm(); // Clear form after success
            };
        }}
        class="mb-6 space-y-3 border-b border-slate-900 pb-6 relative"
    >
      <input type="hidden" name="project_id" value={selectedProject.id} />
      {#if isEditing}
          <input type="hidden" name="id" value={editingId} />
          <div class="absolute -top-10 right-0">
              <button type="button" on:click={resetForm} class="text-[9px] text-red-400 hover:text-red-300 uppercase font-bold bg-red-900/20 px-2 py-1 border border-red-900/50 rounded">
                  [ CANCEL EDIT ]
              </button>
          </div>
      {/if}

      <div class="grid grid-cols-5 gap-2">

        <div class="col-span-2">
           <label class="block text-[8px] text-slate-500 uppercase mb-1">Objective</label>
           <input name="title" bind:value={formTitle} placeholder="ENTER OBJECTIVE..." required class="w-full bg-black border border-slate-800 p-2 text-[10px] text-white uppercase focus:border-emerald-500 outline-none" />
        </div>

        <div class="col-span-1">
           <label class="block text-[8px] text-slate-500 uppercase mb-1">Phase</label>
           <select name="phase_label" bind:value={formPhase} class="w-full bg-black border border-slate-800 p-2 text-[10px] text-white uppercase focus:border-emerald-500 outline-none">
              <option value="Phase I: Ignition">Phase I</option>
              <option value="Phase II: Orbit">Phase II</option>
              <option value="Phase III: Landing">Phase III</option>
           </select>
        </div>

        <div class="col-span-1">
            <label class="block text-[8px] text-slate-500 uppercase mb-1">Status</label>
            <select name="status" bind:value={formStatus} class="w-full bg-black border border-slate-800 p-2 text-[10px] text-white uppercase focus:border-emerald-500 outline-none">
               <option value="PENDING">PENDING</option>
               <option value="COMPLETE">COMPLETE</option>
               <option value="ACTIVE">ACTIVE</option>
               <option value="INACTIVE">INACTIVE</option>
               <option value="CANCELED">CANCELED</option>
               <option value="IGNORED">IGNORED</option>
            </select>
         </div>

        <div class="col-span-1">
           <label class="block text-[8px] text-slate-500 uppercase mb-1">Target Date</label>
           <input name="due_date" type="date" bind:value={formDate} required class="w-full bg-black border border-slate-800 p-2 text-[10px] text-slate-400 uppercase focus:border-emerald-500 outline-none" />
        </div>

      </div>

      <button type="submit" class="w-full py-2 text-[10px] font-bold uppercase transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]
        {isEditing
            ? 'bg-yellow-900/20 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-600 hover:text-black'
            : 'bg-emerald-900/20 border border-emerald-900/50 text-emerald-500 hover:bg-emerald-600 hover:text-white'}">
        {isEditing ? '[ UPDATE_MILESTONE_DATA ]' : '[ INJECT_MILESTONE_DATA ]'}
      </button>
    </form>

    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[300px]">
      {#if selectedProject.project_milestones && selectedProject.project_milestones.length > 0}
        <div class="space-y-2">
          {#each selectedProject.project_milestones.sort((a,b) => (a.status === 'COMPLETED') - (b.status === 'COMPLETED')) as m}

            <div class="flex items-center justify-between p-3 border rounded transition-all
                {editingId === m.id ? 'border-yellow-500/50 bg-yellow-500/10' :
                m.status === 'COMPLETED' ? 'border-emerald-900/30 bg-emerald-900/5 opacity-50' : 'border-slate-800 bg-slate-900/20'}">

              <div class="flex items-center gap-3">
                <form method="POST" action="?/toggleMilestone" use:enhance>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="current_status" value={m.status} />
                  <button class="h-5 w-5 flex items-center justify-center rounded border {m.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600 hover:border-white'} transition-all">
                    {#if m.status === 'COMPLETED'}
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {/if}
                  </button>
                </form>

                <div>
                  <p class="text-[10px] font-bold uppercase {m.status === 'COMPLETED' ? 'text-emerald-500 line-through' : 'text-white'}">
                    {m.title}
                  </p>
                  <p class="text-[9px] text-slate-500 font-mono">
                    TARGET: {formatDate(m.due_date)} • {m.status}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                  <button on:click={() => editMilestone(m)} class="text-[9px] text-slate-500 hover:text-yellow-400 font-bold uppercase transition-colors">
                      [EDIT]
                  </button>

                  <form method="POST" action="?/deleteMilestone" use:enhance>
                    <input type="hidden" name="id" value={m.id} />
                    <button class="text-[9px] text-slate-700 hover:text-red-500 font-bold uppercase transition-colors">
                      [DEL]
                    </button>
                  </form>
              </div>

            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-8 text-[10px] text-slate-600 uppercase border border-dashed border-slate-900 rounded">
          NO DATA FOUND IN SECTOR
        </div>
      {/if}
    </div>

  {/if}
</div>