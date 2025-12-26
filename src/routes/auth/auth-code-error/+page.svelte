<main
	class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-6 text-center font-mono"
>
	<div class="max-w-md rounded-lg border border-red-500/20 bg-red-500/5 p-8">
		<h1 class="mb-4 font-bold tracking-widest text-red-500 uppercase">Auth_Failure // 0x401</h1>
		<p class="mb-8 text-xs leading-relaxed text-gray-400">
			The authentication handshake failed. This is typically due to an expired magic link or a
			session mismatch.
		</p>
		<a
			href="/login"
			class="inline-block border border-white/10 px-6 py-3 text-[10px] font-bold tracking-widest text-white uppercase hover:bg-white/5"
		>
			Retry_Authentication
		</a>
	</div>
</main>
