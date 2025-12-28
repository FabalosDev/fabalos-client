<script lang="ts">
  import { enhance } from '$app/forms';
  export let data;

  // Modal State
  let showModal = false;
  let loading = false;

  $: contacts = data.contacts;

  // Automation Status Colors
  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'synced': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.2)]';
      case 'processing': return 'text-amber-400 bg-amber-500/10 border-amber-500/30 animate-pulse';
      case 'error': return 'text-red-400 bg-red-500/10 border-red-500/30 shadow-[0_0_10px_rgba(248,113,113,0.2)]';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  }


$: contacts = data.contacts;

  // REAL-TIME CALCULATIONS
  $: totalVolume = contacts ? contacts.length : 0;

  $: successCount = contacts
    ? contacts.filter(c => c.status === 'synced').length
    : 0;

  $: successRate = totalVolume > 0
    ? ((successCount / totalVolume) * 100).toFixed(1)
    : '0.0';

</script>

<div class="h-full flex flex-col space-y-6 relative">

  <div class="flex flex-col gap-6 border-b border-cyan-900/30 pb-6 relative">
    <div class="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>

    <div class="flex justify-between items-start">
        <div>
            <h1 class="text-3xl font-black text-white tracking-tighter uppercase font-mono">
                <span class="text-cyan-500">///</span> CRM_TELEMETRY
            </h1>
            <p class="text-[10px] text-cyan-600/80 font-mono mt-1 uppercase tracking-[0.2em]">
                Sector: Automation Oversight // NODE_01
            </p>
        </div>

        <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">Uplink Active</span>
        </div>
    </div>

    <div class="bg-amber-500/5 border border-amber-500/20 rounded-sm p-4 flex gap-4 items-start">
        <div class="mt-1 text-amber-500">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div>
            <h4 class="text-amber-500 text-xs font-bold uppercase tracking-widest font-mono mb-1">System Protocol: OBSERVER MODE</h4>
            <p class="text-xs text-slate-400 leading-relaxed font-mono">
                This interface monitors the <span class="text-white">Fabalos Automation Pipeline</span>.
                Data shown here is a mirror of incoming leads processed by Fabalos Automation.
                <br>
                <span class="text-amber-500/80">>> Please perform actual contact management in your primary CRM (HubSpot / GoHighLevel).</span>
            </p>
        </div>
    </div>

<div class="grid grid-cols-3 gap-4">

        <div class="bg-[#030712] border border-cyan-900/30 p-3 rounded-sm">
            <div class="text-[10px] text-cyan-700 uppercase tracking-widest font-mono">Total Processed</div>
            <div class="text-xl text-white font-mono font-bold mt-1">{totalVolume}</div>
        </div>

        <div class="bg-[#030712] border border-cyan-900/30 p-3 rounded-sm">
            <div class="text-[10px] text-emerald-700 uppercase tracking-widest font-mono">Success Rate</div>
            <div class="text-xl font-mono font-bold mt-1 {parseFloat(successRate) > 80 ? 'text-emerald-400' : 'text-amber-400'}">
                {successRate}%
            </div>
        </div>

        <div class="bg-[#030712] border border-cyan-900/30 p-3 rounded-sm flex items-center justify-between">
            <div>
                <div class="text-[10px] text-cyan-700 uppercase tracking-widest font-mono">Last Sync</div>
                <div class="text-xs text-cyan-300 font-mono mt-1">
                    {contacts && contacts.length > 0 ? 'Live Stream' : 'Idle'}
                </div>
            </div>
            <button on:click={() => showModal = true} class="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[9px] text-cyan-400 uppercase tracking-widest transition-colors">
                + Test Signal
            </button>
        </div>
    </div>
  </div>

  <div class="grow flex flex-col relative rounded-sm border border-cyan-900/30 bg-[#030712]/80 backdrop-blur-sm overflow-hidden min-h-[400px]">

    <div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

    <div class="overflow-x-auto relative z-10 h-full">
      <table class="w-full text-left text-sm">
        <thead class="bg-cyan-950/20 text-[10px] uppercase font-bold text-cyan-600/80 tracking-[0.2em] font-mono border-b border-cyan-900/50 sticky top-0 backdrop-blur-md">
          <tr>
            <th class="px-6 py-4 w-1/3">Entity_Data</th>
            <th class="px-6 py-4">Source_Origin</th>
            <th class="px-6 py-4">Sync_Status</th>
            <th class="px-6 py-4 text-right">Timestamp</th>
            <th class="px-6 py-4 text-right">Log_ID</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-cyan-900/20">
          {#if contacts && contacts.length > 0}
            {#each contacts as contact}
              <tr class="group hover:bg-cyan-500/[0.03] transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="h-8 w-8 rounded-sm bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-400 group-hover:border-cyan-400/50 transition-colors">
                        AI
                    </div>
                    <div>
                        <div class="font-bold text-cyan-100 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">{contact.name}</div>
                        <div class="text-[10px] text-cyan-700 font-mono">{contact.email}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-slate-400 font-mono text-xs tracking-tight">WEBHOOK_IN</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase font-mono tracking-widest border {getStatusColor(contact.status)}">
                     {contact.status}
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-[10px] text-cyan-800 font-mono">
                    {new Date(contact.created_at).toLocaleTimeString()}
                </td>
                <td class="px-6 py-4 text-right text-[10px] text-slate-600 font-mono">
                  #{contact.id.slice(0,8)}
                </td>
              </tr>
            {/each}
          {:else}
             {#each Array(8) as _, i}
                <tr class="border-b border-cyan-900/5 opacity-30">
                    <td class="px-6 py-5 text-cyan-900/20 font-mono text-[10px] tracking-widest animate-pulse">// AWAITING_PACKET...</td>
                    <td class="px-6 py-5 text-right text-cyan-900/20 font-mono">--</td>
                    <td class="px-6 py-5 text-right text-cyan-900/20 font-mono">--</td>
                    <td class="px-6 py-5 text-right text-cyan-900/20 font-mono">--</td>
                    <td class="px-6 py-5 text-right text-cyan-900/20 font-mono">--</td>
                </tr>
            {/each}
          {/if}
        </tbody>
      </table>

      {#if !contacts || contacts.length === 0}
        <div class="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            <div class="relative flex items-center justify-center h-24 w-24 mb-6">
                 <div class="absolute inset-0 rounded-full border border-cyan-500/20 border-t-cyan-500 border-r-cyan-500 animate-spin duration-[3s]"></div>
                 <div class="absolute inset-2 rounded-full border border-cyan-500/10 border-b-cyan-400 animate-spin" style="animation-direction: reverse; animation-duration: 2s;"></div>
                 <div class="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] animate-ping"></div>
            </div>
            <p class="text-sm text-cyan-400 font-bold tracking-[0.3em] font-mono uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Channel Open</p>
            <p class="text-[10px] text-cyan-700 mt-2 font-mono uppercase tracking-widest animate-pulse">Listening for inbound webhooks...</p>
        </div>
      {/if}

    </div>
  </div>

  {#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div class="w-full max-w-md bg-[#030712] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] rounded-sm relative overflow-hidden">

            <div class="bg-cyan-950/30 px-6 py-4 border-b border-cyan-900/50 flex justify-between items-center">
                <h3 class="text-cyan-400 font-mono font-bold tracking-widest uppercase text-sm">>> Inject Test Packet</h3>
                <button on:click={() => showModal = false} class="text-cyan-700 hover:text-white transition-colors">X</button>
            </div>

            <form method="POST" action="?/createEntity" use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    loading = false;
                    showModal = false;
                    update();
                };
            }} class="p-6 space-y-4">

                <p class="text-[10px] text-slate-500 font-mono border-b border-white/5 pb-4 mb-4">
                    Simulate an incoming webhook payload from an external source (e.g. Facebook Lead Form).
                </p>

                <div>
                    <label class="block text-[10px] uppercase text-cyan-700 font-mono mb-1">Entity Name</label>
                    <input name="name" type="text" required placeholder="TEST_DATA_01" class="w-full bg-black border border-cyan-900 text-cyan-100 text-xs p-2 focus:border-cyan-500 outline-none font-mono" />
                </div>

                <div>
                    <label class="block text-[10px] uppercase text-cyan-700 font-mono mb-1">Entity ID (Email)</label>
                    <input name="email" type="email" required placeholder="test@packet.local" class="w-full bg-black border border-cyan-900 text-cyan-100 text-xs p-2 focus:border-cyan-500 outline-none font-mono" />
                </div>

                <input type="hidden" name="role" value="AUTOMATION_BOT" />

                <div>
                    <label class="block text-[10px] uppercase text-cyan-700 font-mono mb-1">Simulate Status</label>
                    <select name="status" class="w-full bg-black border border-cyan-900 text-cyan-100 text-xs p-2 focus:border-cyan-500 outline-none font-mono">
                        <option value="processing">Processing (Checking)</option>
                        <option value="synced">Synced (Success)</option>
                        <option value="error">Error (Failed)</option>
                    </select>
                </div>

                <div class="pt-4 flex justify-end gap-3">
                    <button type="button" on:click={() => showModal = false} class="px-4 py-2 text-[10px] font-mono uppercase text-cyan-600 hover:text-white">Cancel</button>
                    <button type="submit" disabled={loading} class="px-6 py-2 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 text-[10px] font-bold font-mono uppercase hover:bg-cyan-500 hover:text-black transition-all">
                        {loading ? 'INJECTING...' : 'SEND PACKET'}
                    </button>
                </div>

            </form>
            <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20"></div>
        </div>
    </div>
  {/if}

</div>