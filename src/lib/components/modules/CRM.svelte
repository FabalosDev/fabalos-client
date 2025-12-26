<script lang="ts">
	// 🆕 Accept the real number from the parent page
	export let count: number = 0;
</script>

<div
	class="group relative h-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] p-6"
>
	<div class="absolute top-0 right-0 p-4 opacity-10">
		<span class="text-4xl font-black text-blue-500">CRM</span>
	</div>

	<h3 class="mb-4 font-mono text-xs tracking-widest text-blue-500 uppercase">Lead_Flow</h3>

	<div class="space-y-4">
		<div class="flex items-end justify-between border-b border-white/5 pb-2">
			<span class="text-sm text-gray-400">Total_Leads</span>
			<span class="text-xl font-bold text-white">{count}</span>
		</div>

		<div class="flex items-end justify-between border-b border-white/5 pb-2">
			<span class="text-sm text-gray-400">Conversion_Rate</span>
			<span class="text-xl font-bold text-emerald-400">4.2%</span>
		</div>
	</div>

	<div class="mt-6">
		<a
			href="/vault/crm"
			class="block w-full rounded border border-blue-500/20 bg-blue-500/10 py-2 text-center font-mono text-[10px] text-blue-400 uppercase transition-all hover:bg-blue-500 hover:text-white"
		>
			Open_CRM_View →
		</a>
	</div>
</div>
