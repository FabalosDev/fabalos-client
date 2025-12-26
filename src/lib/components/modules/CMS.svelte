<div
	class="group relative h-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] p-6"
>
	<div class="absolute top-0 right-0 p-4 opacity-10">
		<span class="text-4xl font-black text-purple-500">CMS</span>
	</div>
	<h3 class="mb-4 font-mono text-xs tracking-widest text-purple-500 uppercase">Editorial_Ops</h3>

	<div class="space-y-3">
		{#each ['Drafting', 'Review', 'Published'] as stage}
			<div class="flex items-center gap-3">
				<div
					class="h-2 w-2 rounded-full {stage === 'Published' ? 'bg-purple-500' : 'bg-gray-700'}"
				></div>
				<span class="text-xs tracking-wider text-gray-400 uppercase">{stage}</span>
			</div>
		{/each}
	</div>
	<div class="mt-6">
		<button
			class="w-full border border-purple-500/20 bg-purple-500/10 py-2 font-mono text-[10px] text-purple-400 uppercase transition-all hover:bg-purple-500 hover:text-white"
		>
			Manage_Content →
		</button>
	</div>
</div>
