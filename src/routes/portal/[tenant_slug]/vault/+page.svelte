<script lang="ts">
  import Starfield from '$lib/components/Starfield.svelte';
  import { invalidateAll } from '$app/navigation';

  export let data;

  $: ({ project, supabase } = data);
  $: files = data.files || [];

  let uploading = false;
  let fileInput: HTMLInputElement;

  // --- CONFIG: ALLOWED PROTOCOLS ---
  const ALLOWED_TYPES = [
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg', 'image/png', 'image/webp',
      'application/zip', 'application/x-zip-compressed'
  ];
  const ACCEPT_ATTR = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.jpeg,.webp,.zip";
  const MAX_SIZE_MB = 50;

  // --- UPLOAD HANDLER ---
  async function handleUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0];

    // 1. GATEKEEPER: Check File Type
    if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`⚠️ SECURITY PROTOCOL: Invalid File Type.\nSystem only accepts Contracts, Documents, and Archives.`);
        target.value = '';
        return;
    }

    // 2. GATEKEEPER: Check Size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`⚠️ SECURITY PROTOCOL: File exceeds limitation.\nMaximum payload size is ${MAX_SIZE_MB}MB.`);
        target.value = '';
        return;
    }

    uploading = true;

    try {
      const filePath = `${project.tenant_slug}/${Date.now()}_${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('vault')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('project_vault')
        .insert({
          project_id: project.id,
          file_name: file.name,
          file_size: file.size,
          file_path: uploadData.path,
          storage_provider: 'supabase'
        });

      if (dbError) throw dbError;

      await invalidateAll();

    } catch (err: any) {
      alert('Transmission Failed: ' + err.message);
    } finally {
      uploading = false;
      target.value = '';
    }
  }

  // --- DOWNLOAD HANDLER ---
  async function downloadFile(filePath, fileName) {
      if (!filePath) return;
      const safeName = fileName || 'download';
      const { data } = supabase.storage.from('vault').getPublicUrl(filePath);
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.download = safeName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
</script>

<div class="relative min-h-screen bg-[#020617] text-slate-300">
  <Starfield />

  <input
    type="file"
    bind:this={fileInput}
    on:change={handleUpload}
    accept={ACCEPT_ATTR}
    class="hidden"
  />

  <div class="relative z-10 p-8 md:p-12 space-y-10 max-w-6xl mx-auto">

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

      <button
        on:click={() => fileInput.click()}
        disabled={uploading}
        class="w-full border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-emerald-500/30 transition-all bg-white/[0.02] group cursor-pointer shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div class="text-emerald-500 mb-4 flex justify-center transition-transform group-hover:scale-110">
          {#if uploading}
             <svg class="animate-spin w-10 h-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          {:else}
             <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
             </svg>
          {/if}
        </div>
        <p class="text-sm font-bold text-white uppercase tracking-widest font-mono">
            {uploading ? 'TRANSMITTING DATA...' : 'INITIALIZE_UPLINK'}
        </p>
        <p class="text-[10px] text-slate-500 mt-1 uppercase font-mono tracking-tighter">
            {uploading ? 'ACCEPTED FORMATS: PDF, DOCX, IMG, ZIP' : 'CLICK TO UPLOAD ASSETS'}
        </p>
      </button>

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
              {#if file && file.file_name}
                  <tr class="hover:bg-white/[0.02] transition-colors group">
                    <td class="px-6 py-4 text-white font-medium flex items-center gap-3">
                      <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {file.file_name}
                    </td>
                    <td class="px-6 py-4 text-slate-500">
                        {file.file_size ? (file.file_size / 1024).toFixed(1) : '0'} KB
                    </td>
                    <td class="px-6 py-4 text-slate-500 text-center">
                        {new Date(file.created_at).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button
                            on:click={() => downloadFile(file.file_path, file.file_name)}
                            class="text-emerald-500 font-bold tracking-widest hover:text-white transition-colors"
                        >
                          DOWNLOAD >>
                        </button>
                    </td>
                  </tr>
              {/if}
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