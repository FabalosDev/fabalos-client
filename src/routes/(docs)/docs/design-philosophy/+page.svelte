<svelte:head>
  <title>Design Philosophy · Fabalos Automation</title>
  <meta name="description" content="Operational design principles for Fabalos Automation interfaces." />
</svelte:head>

<section class="space-y-12 max-w-3xl">

  <div class="space-y-6">
    <h1 class="text-4xl font-bold text-white tracking-tight">
      Design Philosophy
    </h1>
    <p class="text-lg text-slate-300 leading-relaxed">
      Fabalos Automation interfaces follow principles that treat UIs as <strong class="text-white font-medium">operational tools</strong> for engineers and operators, not marketing showcases. Every design choice reduces cognitive load and surfaces actionable information without distraction.
    </p>
  </div>

  <hr class="border-slate-800/60" />

  <div class="space-y-6">
    <h2 class="text-2xl font-semibold text-white">Core Principles</h2>

    <dl class="grid gap-8">

      <div class="space-y-2">
        <dt class="text-lg font-medium text-white flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Data density over decoration
        </dt>
        <dd class="text-slate-400 pl-4.5 leading-relaxed">
          Screens maximize useful information density—metrics, status, controls—while eliminating ornamental elements that consume space without adding value.
        </dd>
      </div>

      <div class="space-y-2">
        <dt class="text-lg font-medium text-white flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          Visual calm over visual noise
        </dt>
        <dd class="text-slate-400 pl-4.5 leading-relaxed">
          Consistent spacing, restrained color palettes, and minimal animations prevent visual fatigue during extended operational use.
        </dd>
      </div>

      <div class="space-y-2">
        <dt class="text-lg font-medium text-white flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
          Dark-mode by default
        </dt>
        <dd class="text-slate-400 pl-4.5 leading-relaxed">
          Reduces eye strain for 24/7 monitoring and aligns with developer/operator preferences in low-light environments.
        </dd>
      </div>

      <div class="space-y-2">
        <dt class="text-lg font-medium text-white flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          Optimized for operators, not viewers
        </dt>
        <dd class="text-slate-400 pl-4.5 leading-relaxed">
          Prioritizes keyboard navigation, dense tables, bulk actions, and direct state manipulation over polished consumer flows.
        </dd>
      </div>

    </dl>
  </div>

  <div class="p-6 bg-slate-900/50 border border-slate-800 rounded-lg space-y-4">
    <h3 class="text-xl font-semibold text-white">Why This Approach Works</h3>
    <p class="text-slate-400">
      Automation systems run continuously and handle real money, data, and decisions. Operators need tools that stay out of the way while making system state immediately obvious.
    </p>
    <ul class="space-y-3 pt-2">
      <li class="flex items-start gap-3 text-slate-300">
        <svg class="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>Dense layouts let teams monitor <strong>10x more context</strong> without scrolling.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <svg class="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>Predictable patterns reduce training time and context-switching costs.</span>
      </li>
      <li class="flex items-start gap-3 text-slate-300">
        <svg class="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>Dark mode and calm visuals support long monitoring sessions without burnout.</span>
      </li>
    </ul>
    <p class="text-sm text-slate-500 pt-2 border-t border-slate-800/50 mt-4">
      This philosophy scales from solo operators to distributed teams managing dozens of workflows.
    </p>
  </div>

</section>