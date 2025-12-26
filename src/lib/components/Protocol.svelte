<script lang="ts">
  const steps = [
    { num: '01', title: 'Audit', desc: 'High-signal technical review of current bottlenecks.' },
    { num: '02', title: 'Architecture', desc: 'Mapping the engine room in the DevLab sandbox.' },
    { num: '03', title: 'Execution', desc: 'Idempotent deployment of n8n & Supabase agents.' },
    { num: '04', title: 'SLA', desc: 'Continuous 24/7 monitoring and system maintenance.' }
  ];
</script>

<section id="protocol" class="py-24 bg-[#0a0a0a] border-t border-white/5">
  <div class="max-w-6xl mx-auto px-6">
    <div class="mb-16">
      <h2 class="text-xs font-mono tracking-[0.3em] text-blue-500 uppercase mb-4">02 // THE PROTOCOL</h2>
      <h3 class="text-3xl font-bold tracking-tighter text-white mb-6">Deterministic Lifecycle</h3>
      <p class="text-gray-400 max-w-2xl leading-relaxed">
        We follow a clinical execution path to move from raw ideas to production-grade stability.
        No hacks, just engineering.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      {#each steps as step}
        <div class="p-6 bg-[#111] border border-white/5 rounded-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <span class="text-6xl font-black text-white/[0.02] absolute -bottom-4 -right-2 italic group-hover:text-blue-500/5 transition-colors">
            {step.num}
          </span>
          <h4 class="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">{step.title}</h4>
          <p class="text-xs text-gray-400 leading-relaxed relative z-10">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>