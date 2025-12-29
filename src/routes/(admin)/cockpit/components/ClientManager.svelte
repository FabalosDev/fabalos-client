<script lang="ts">
  import { enhance } from '$app/forms';
  export let clients = [];
  export let users = [];

  let viewMode = 'users'; // Default sa Users para pumili ka agad

  // Variables para sa Auto-Fill
  let selectedEmail = '';
  let selectedUUID = '';

  // Function pag nag-click ka ng user sa listahan
  function selectUser(user) {
    selectedEmail = user.email;
    selectedUUID = user.id;
    viewMode = 'registry'; // Automatic lipat sa form pagka-select
  }
</script>

<div class="rounded border border-slate-900 bg-slate-950 p-6 shadow-2xl h-full flex flex-col">

  <div class="mb-6 flex items-center justify-between border-b border-blue-900/30 pb-4">
    <div class="flex gap-4">
      <button on:click={() => viewMode = 'registry'} class="{viewMode === 'registry' ? 'text-blue-400 font-bold' : 'text-slate-600'} text-xs uppercase tracking-widest transition-colors">
        1. Registry Form
      </button>
      <span class="text-slate-700">|</span>
      <button on:click={() => viewMode = 'users'} class="{viewMode === 'users' ? 'text-emerald-400 font-bold' : 'text-slate-600'} text-xs uppercase tracking-widest transition-colors">
        2. Select User ({users?.length || 0})
      </button>
    </div>
  </div>

  {#if viewMode === 'registry'}
    <form method="POST" action="?/addClient" use:enhance class="mb-8 space-y-4 border border-blue-900/20 bg-blue-900/5 p-4 rounded">

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
           <label class="block text-[9px] text-blue-400 uppercase mb-1">Client Display Name</label>
           <input
             name="display_name"
             placeholder="E.G. JUAN DELA CRUZ / ACME INC."
             required
             class="w-full bg-black border border-slate-800 p-2.5 text-xs text-white uppercase focus:border-blue-500 outline-none"
           />
        </div>

        <div>
           <label class="block text-[9px] text-emerald-500 uppercase mb-1">Linked Account (Auto-filled)</label>
           <input type="text" value={selectedEmail || '<< SELECT USER FROM TAB 2'} disabled class="w-full bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-300 cursor-not-allowed" />
        </div>
      </div>

      <input type="hidden" name="email" value={selectedEmail} />
      <input type="hidden" name="auth_id" value={selectedUUID} />

      <button type="submit" disabled={!selectedUUID} class="w-full bg-blue-600 py-3 text-[10px] font-black uppercase text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        {selectedUUID ? 'SAVE CLIENT ACCESS' : 'PLEASE SELECT A USER FIRST'}
      </button>
    </form>

    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar border-t border-slate-900 pt-4">
      <table class="w-full text-left text-[10px] font-mono text-slate-400">
        <thead class="uppercase text-slate-600">
          <tr class="border-b border-slate-900">
            <th class="py-2">Client Name</th>
            <th class="py-2">Linked Account</th>
            <th class="py-2 text-center">Status</th>
            <th class="py-2 text-right pr-2">Control</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-900/50">
          {#each clients as client}
            <tr class="group hover:bg-blue-900/10">

              <td class="py-3 font-bold text-white uppercase">
                {client.display_name}
              </td>

              <td class="py-3 opacity-60 truncate max-w-[150px]" title={client.email}>
                {client.email}
              </td>

<td class="py-3 text-center">
  {#if client.status === 'ACTIVE'}
     <span class="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-500 ring-1 ring-inset ring-emerald-400/20">ACTIVE</span>
  {:else}
     <span class="inline-flex items-center rounded-full bg-red-400/10 px-2 py-0.5 text-[9px] font-medium text-red-500 ring-1 ring-inset ring-red-400/20">INACTIVE</span>
  {/if}
</td>

              <td class="py-3 text-right pr-2">
                <form method="POST" action="?/toggleClientStatus" use:enhance>
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