<script lang="ts">
  export let data;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });
</script>

<svelte:head>
  <title>Secure Gateway · Fabalos Portal</title>
</svelte:head>

<div class="min-h-screen bg-[#050505] text-slate-300 font-sans flex items-center justify-center p-6 relative overflow-hidden">
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
  <div class="absolute inset-0 bg-radial-gradient from-transparent to-[#050505] opacity-80 pointer-events-none"></div>

  <div class="relative w-full max-w-lg bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

    <div class="space-y-8 text-center">
      <div class="space-y-2">
        <div class="flex justify-center mb-4">
          <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shadow-inner">
             <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Identity Verified</h1>
        <p class="text-sm text-slate-500 font-mono uppercase tracking-widest">
          Welcome, {data.user.name}
        </p>
      </div>

      <div class="bg-black/30 rounded-lg p-4 border border-white/5 text-left space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-500">Uplink Status</span>
          <span class="text-emerald-400 font-bold tracking-wider">SECURE</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-500">Organization</span>
          <span class="text-white font-medium">{data.user.company}</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-500">Timestamp</span>
          <span class="text-slate-400 font-mono">{today}</span>
        </div>
      </div>

      <a
        href={data.routing.target}
        class="group relative w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
      >
        <span>INITIALIZE DASHBOARD</span>
        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        <div class="absolute inset-0 rounded-lg ring-1 ring-white/20 group-hover:ring-white/40 transition-all"></div>
      </a>

      <p class="text-[10px] text-slate-600 font-mono uppercase">
        Fabalos Automation // Client Portal v2.0
      </p>
    </div>
  </div>
</div>