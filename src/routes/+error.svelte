<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-slate-950 font-mono text-slate-400">
	<div class="text-center">
		<h1 class="text-6xl font-bold text-slate-800">404</h1>
		<div class="mx-auto mt-4 h-px w-12 bg-red-500"></div>

		<h2 class="mt-6 text-xl font-bold text-white uppercase tracking-widest">
			Signal_Lost
		</h2>

		<p class="mt-4 text-xs">
			The requested node <span class="text-red-400">{$page.url.pathname}</span> does not exist in the vault map.
		</p>

		<a
			href="/portal/test"
			class="mt-8 inline-flex items-center gap-2 rounded border border-slate-800 bg-slate-900 px-6 py-2 text-xs font-bold uppercase text-white hover:border-blue-500 hover:text-blue-400 transition-all"
		>
			<span>← Return to Grid</span>
		</a>
	</div>
</div>