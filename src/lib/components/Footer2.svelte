<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-slate-900 bg-[#050505] py-8 font-mono text-xs text-slate-500">
  <div class="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">

    <div class="flex items-center gap-4">
      <span class="font-bold text-slate-400 uppercase tracking-widest">Fabalos // Systems</span>
      <span class="hidden md:inline text-slate-800">|</span>
      <span>© {year}</span>
    </div>

    <div class="flex gap-6 uppercase tracking-wider">
      <a href="/support" class="hover:text-blue-500 transition-colors">Support_Ticket</a>
      <a href="/privacy" class="hover:text-blue-500 transition-colors">Privacy</a>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-[10px] text-slate-700">LOC: PH_MNL_01</span>
      <div class="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 border border-slate-800">
        <span class="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span class="text-[10px] font-bold text-green-500 uppercase">Operational</span>
      </div>
    </div>

  </div>
</footer>