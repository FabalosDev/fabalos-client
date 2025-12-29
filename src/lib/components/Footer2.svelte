<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="mt-auto py-5 font-mono text-[10px] text-slate-500 opacity-70">
  <div class="mx-auto max-w-[1400px] px-8">

    <div class="flex items-center justify-between">

      <!-- LEFT: Brand -->
      <div class="flex items-center gap-3 uppercase tracking-[0.3em] text-slate-300 font-bold">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        Fabalos<span class="text-slate-600">//</span>Systems
        <span class="text-slate-600 font-normal tracking-widest text-[9px] ml-2">
          © {year}
        </span>
      </div>

      <!-- CENTER: Navigation -->
      <nav class="flex gap-8 uppercase tracking-[0.25em] font-bold text-[9px] text-slate-400">
        <a href="/knowledge" class="hover:text-white transition-colors">Knowledge</a>
        <a href="/docs" class="hover:text-white transition-colors">Docs</a>
        <a href="/faq" class="hover:text-white transition-colors">Faq</a>
        <a href="/legal" class="hover:text-white transition-colors">Legal</a>
      </nav>

      <!-- RIGHT: Status -->
      <div class="flex items-center gap-2 text-emerald-500/70 uppercase tracking-widest text-[8px]">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        ACTIVE
      </div>

    </div>

    <!-- Bottom divider -->
    <div class="mt-4 h-px w-full bg-slate-800/60"></div>

  </div>
</footer>
