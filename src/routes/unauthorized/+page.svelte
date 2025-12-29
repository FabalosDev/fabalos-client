<script lang="ts">
  import { page } from '$app/stores';
</script>

<main
  class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-6 text-center font-mono"
>
  <div class="max-w-md rounded-lg border border-red-500/20 bg-red-500/5 p-8">
    <h1 class="mb-4 text-xl font-bold tracking-widest text-red-500 uppercase">
      Access_Denied // 0x403
    </h1>
    <p class="mb-8 text-xs leading-relaxed text-gray-400">
      Your identity <strong>({$page.data.session?.user?.email || 'Unknown'})</strong> is authenticated
      but not authorized for vault access.
    </p>
    <div class="mb-8 rounded border border-white/5 bg-black/50 p-4 text-left">
      <p class="mb-2 text-[10px] text-gray-500 uppercase">System_Log:</p>
      <code class="text-[10px] text-red-400"
        >Error: User email not found in 'authorized_clients' table.</code
      >
    </div>

    <a
      href="/login"
      class="inline-block border border-white/10 px-6 py-3 text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-white/5"
    >
      Return_To_Base
    </a>
  </div>
</main>