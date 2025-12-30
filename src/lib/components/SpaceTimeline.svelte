<script lang="ts">
  export let milestones: any[] = [];

  const isDone = (s: string) => ['COMPLETED', 'COMPLETE', 'TAPOS NA', 'OK'].includes(s?.toUpperCase());
  const isActive = (s: string) => ['ACTIVE', 'ORBITING', 'IN PROGRESS'].includes(s?.toUpperCase());

  function isNewPhase(i: number) {
      if (i === 0) return true;
      return milestones[i].phase_label !== milestones[i - 1].phase_label;
  }
</script>

<div class="relative pl-6 pb-24 space-y-14 font-mono">
  <!-- Structural Mission Spine -->
  <div class="absolute left-[22px] top-0 h-full w-px bg-slate-700/40"></div>

  {#each milestones as step, i}
    {#if isNewPhase(i)}
      <div class="relative pt-10 pl-10">
        <h3 class="text-[9px] uppercase tracking-[0.35em] text-emerald-500/40">
          Mission Phase {step.phase_label ?? '—'}
        </h3>
      </div>
    {/if}

    <div
      class="group relative flex items-start gap-10 pl-10 transition-all duration-700
      {isActive(step.status) ? 'translate-x-2' : ''}
      {isDone(step.status) ? 'opacity-70' : 'opacity-60 hover:opacity-90 hover:translate-x-1'}"
    >
      <!-- Orbital Marker -->
      <div class="absolute left-[22px] top-4 -translate-x-1/2 z-10 flex items-center justify-center">
        {#if isActive(step.status)}
          <!-- Active Orbital Beacon -->
          <div class="relative h-6 w-6 flex items-center justify-center">

            <svg class="h-5 w-5 text-emerald-300 drop-shadow-[0_0_15px_#10b981] animate-intense-blink z-20" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.869 1.4-8.168-5.934-5.787 8.2-1.192L12 .587z"/>
             </svg>
          </div>
        {:else if isDone(step.status)}
          <!-- Spent Orbit -->
          <div class="h-1.5 w-1.5 rounded-full bg-emerald-400/30"></div>
        {:else}
          <!-- Cold Space -->
          <div class="h-1 w-1 rounded-full bg-slate-700"></div>
        {/if}
      </div>

      <!-- Content -->
<div class="flex-1 {isActive(step.status) ? 'opacity-100 translate-x-3' : 'opacity-25 hover:opacity-100'} transition-all duration-1000">
        <div class="flex items-center gap-4 mb-1">
            <span class="text-[9px] font-black tracking-[0.5em] {isActive(step.status) ? 'text-emerald-400' : 'text-slate-600'}">
                {isActive(step.status) ? '>> ORBITING' : isDone(step.status) ? '● DOCKED' : 'LOCKED'}
            </span>
            <div class="h-[1px] flex-1 bg-gradient-to-r {isActive(step.status) ? 'from-emerald-500/20' : 'from-slate-800/50'} to-transparent"></div>
        </div>

        <h4 class="text-sm font-bold tracking-[0.2em] {isDone(step.status) ? 'text-slate-500' : 'text-slate-100'} uppercase">
            {step.title}
        </h4>

        {#if isActive(step.status)}
           <div class="mt-4 h-[1px] w-48 bg-emerald-900/10 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-data-flow"></div>
           </div>
        {/if}
      </div>    </div>
  {/each}
</div>

<style>
  /* INTENSE STAR BLINK */
  @keyframes intense-blink {
    0%, 100% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 20px #34d399); }
    50% { opacity: 0.3; transform: scale(0.8); filter: drop-shadow(0 0 5px #10b981); }
  }
  .animate-intense-blink { animation: intense-blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
</style>