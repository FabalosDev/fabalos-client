<script lang="ts">
  import Starfield from '$lib/components/Starfield.svelte';
  export let data;

  // Reactive data intake
  $: project = data.project;
  $: files = data.files || [];
</script>

<div class="relative min-h-screen bg-[#020617] text-slate-300">
  <Starfield />

  <div class="relative z-10 p-8 md:p-12 space-y-10">
    <header>
      <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">
        <span class="h-px w-8 bg-emerald-500"></span>
        Project Assets
      </div>
      <h1 class="text-4xl font-mono font-bold text-white tracking-tighter uppercase">Content_Vault</h1>
      <p class="text-xs text-slate-500 font-mono mt-1 uppercase tracking-tighter">
        Secure_Storage_Node: <span class="text-emerald-500/80">{project.tenant_slug}</span>
      </p>
    </header>

    <main class="grid grid-cols-1 gap-6">
      <div class="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-emerald-500/30 transition-all bg-white/[0.02] group cursor-pointer shadow-2xl">
        <div class="text-emerald-500 mb-4 flex justify-center transition-transform group-hover:scale-110">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p class="text-sm font-bold text-white uppercase tracking-widest font-mono">Initialize_Uplink</p>
        <p class="text-[10px] text-slate-500 mt-1 uppercase font-mono tracking-tighter">Drag and drop assets or click to browse</p>
      </div>

      <div class="rounded-xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden shadow-2xl">
        <table class="w-full text-left text-xs font-mono">
          <thead class="bg-white/5 text-slate-500 uppercase tracking-widest">
            <tr>
              <th class="px-6 py-4 font-bold border-b border-white/5">Asset Name</th>
              <th class="px-6 py-4 font-bold border-b border-white/5">Size</th>
              <th class="px-6 py-4 font-bold border-b border-white/5 text-center">Timestamp</th>
              <th class="px-6 py-4 font-bold border-b border-white/5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            {#each files as file}
              <tr class="hover:bg-white/[0.02] transition-colors group">
                <td class="px-6 py-4 text-white font-medium flex items-center gap-3">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {file.file_name}
                </td>
                <td class="px-6 py-4 text-slate-500">{(file.file_size / 1024).toFixed(1)} KB</td>
                <td class="px-6 py-4 text-slate-500 text-center">{new Date(file.created_at).toLocaleDateString()}</td>
                <td class="px-6 py-4 text-right">
                   <button class="text-emerald-500 font-bold tracking-widest hover:text-white transition-colors">
                     DOWNLOAD >>
                   </button>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="px-6 py-20 text-center">
                  <p class="text-xs text-slate-600 italic uppercase tracking-[0.2em] font-mono">No_Assets_Transmitted_To_Vault</p>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>