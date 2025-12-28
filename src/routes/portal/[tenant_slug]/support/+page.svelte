<script lang="ts">
  import { enhance } from '$app/forms';

  export let data; // Galing sa load function

  let transmitting = false;
  let success = false;
</script>

<div class="fixed inset-0 bg-[#020617] -z-50">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-[#020617] to-[#020617]"></div>
</div>

<div class="max-w-4xl mx-auto space-y-8 p-6">

  <div class="border-b border-red-900/30 pb-6">
    <h1 class="text-3xl font-black text-white uppercase font-mono flex items-center gap-4">
        <span class="flex h-8 w-8 items-center justify-center rounded bg-red-500/10 text-red-500 border border-red-500/20">!</span>
        Anomaly Reporting
    </h1>
    <p class="text-xs text-red-400/60 font-mono mt-2 tracking-[0.2em] uppercase pl-12">
        Channel: Encrypted // Operator Eyes Only
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div class="space-y-4">
          <div class="bg-red-950/10 border border-red-900/30 p-6 rounded-lg">
              <div class="text-[10px] text-red-400 uppercase tracking-widest font-mono mb-2">System Status</div>
              <div class="flex items-center gap-2">
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span class="text-white font-mono font-bold">Online / Monitoring</span>
              </div>
          </div>
          <div class="bg-[#0f172a]/50 border border-white/5 p-6 rounded-lg">
               <a href="mailto:support@fabalos.com" class="text-xs text-cyan-400 hover:text-cyan-300 font-mono border-b border-cyan-500/30 pb-1">
                  >> support@fabalos.com
              </a>
          </div>
      </div>

      <div class="lg:col-span-2">
          {#if success}
            <div class="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-lg text-center">
                <h3 class="text-xl font-bold text-white font-mono uppercase tracking-widest">Transmission Sent</h3>
                <button on:click={() => success = false} class="mt-6 text-xs text-slate-500 hover:text-white uppercase tracking-widest font-mono">
                    [ Send Another Report ]
                </button>
            </div>
          {:else}
            <form method="POST" use:enhance={() => {
                transmitting = true;
                return async ({ update }) => {
                    await update();
                    transmitting = false;
                    success = true;
                };
            }} class="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-8 rounded-lg space-y-6 shadow-2xl">

                <div>
                    <label class="block text-[10px] uppercase text-slate-400 font-mono mb-2 tracking-widest">Subject</label>
                    <input name="subject" type="text" required placeholder="e.g. API Error"
                           class="w-full bg-[#020617] border border-slate-700 text-white p-3 text-sm focus:border-red-500 outline-none font-mono rounded-sm" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                     <div>
                        <label class="block text-[10px] uppercase text-slate-400 font-mono mb-2 tracking-widest">Severity</label>
                        <select name="severity" class="w-full bg-[#020617] border border-slate-700 text-white p-3 text-sm focus:border-red-500 outline-none font-mono rounded-sm">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="critical">CRITICAL</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase text-slate-400 font-mono mb-2 tracking-widest">Node</label>
                        <select name="affected_node" class="w-full bg-[#020617] border border-slate-700 text-white p-3 text-sm focus:border-red-500 outline-none font-mono rounded-sm">
                            <option value="General">General</option>
                            {#if data.nodes}
                                {#each data.nodes as node}
                                    <option value={node.module_name}>{node.module_name.toUpperCase()}</option>
                                {/each}
                            {/if}
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] uppercase text-slate-400 font-mono mb-2 tracking-widest">Description</label>
                    <textarea name="description" required rows="5"
                              class="w-full bg-[#020617] border border-slate-700 text-white p-3 text-sm focus:border-red-500 outline-none font-mono rounded-sm"></textarea>
                </div>

                <div class="pt-4 border-t border-white/5 flex justify-end">
                    <button type="submit" disabled={transmitting}
                            class="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 font-bold font-mono uppercase tracking-widest text-sm transition-all">
                        {transmitting ? 'SENDING...' : 'INITIATE UPLINK'}
                    </button>
                </div>

            </form>
          {/if}
      </div>
  </div>
</div>