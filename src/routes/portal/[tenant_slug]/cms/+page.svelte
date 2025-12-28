<script lang="ts">
  const posts = [
    { title: 'System Update v2.4', type: 'Announcement', date: '2025-12-28', status: 'Published' },
    { title: 'Q4 Performance Review', type: 'Report', date: '2025-12-20', status: 'Draft' },
    { title: 'Onboarding Protocol', type: 'Guide', date: '2025-12-15', status: 'Published' },
  ];
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between border-b border-white/5 pb-6">
    <div>
      <h1 class="text-2xl font-bold text-white tracking-tight">HEADLESS CMS</h1>
      <p class="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">Content Repository</p>
    </div>
    <div class="flex gap-3">
        <button class="px-4 py-2 rounded bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase hover:bg-white/10">Filter</button>
        <button class="px-4 py-2 rounded bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">Create Entry</button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each posts as post}
      <div class="group relative rounded-xl border border-white/10 bg-[#020617]/50 p-6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
        <div class="flex justify-between items-start mb-4">
            <span class="text-[10px] font-mono uppercase tracking-widest text-slate-500">{post.type}</span>
            <span class={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${post.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {post.status}
            </span>
        </div>

        <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
        <p class="text-xs text-slate-400 mb-6">Last edited on {post.date}</p>

        <div class="flex items-center justify-between border-t border-white/5 pt-4">
            <button class="text-xs font-bold text-slate-400 hover:text-white">PREVIEW</button>
            <button class="text-xs font-bold text-blue-500 hover:text-blue-400">EDIT >></button>
        </div>
      </div>
    {/each}
  </div>
</div>