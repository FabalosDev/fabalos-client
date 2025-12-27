<script lang="ts">
	export let data;

	// Destructure data
	$: ({ visible_projects, user } = data);

	// Helper: Determine Status Color
	function getStatusColor(status: string) {
		switch (status?.toLowerCase()) {
			case 'healthy':
				return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
			case 'warning':
				return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]';
			case 'critical':
				return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
			default:
				return 'bg-slate-500';
		}
	}

	// Format Date Helper
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<div class="min-h-screen bg-slate-950 p-8 font-mono text-slate-200">
	<header
		class="mb-8 flex flex-col items-start justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-end"
	>
		<div>
			<h1 class="mb-2 text-3xl font-bold tracking-tight text-white">
				<span class="text-blue-500">///</span> PROJECT VAULT
			</h1>
			<div class="flex items-center gap-3 text-sm text-slate-400">
				<span class="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
				<span>Connected as: <span class="text-white">{user}</span></span>
			</div>
		</div>

		<div class="flex gap-4">
			<div class="text-right">
				<p class="text-xs tracking-widest text-slate-500 uppercase">Active Projects</p>
				<p class="text-2xl leading-none font-bold text-white">{visible_projects?.length || 0}</p>
			</div>
		</div>
	</header>

	{#if !visible_projects || visible_projects.length === 0}
		<div
			class="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/50"
		>
			<p class="mb-2 text-slate-500">No Signal</p>
			<span class="text-xs text-slate-600 uppercase">Check RLS Policy or Client Linkage</span>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each visible_projects as project}
			<div
				class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20"
			>
				<div
					class="absolute top-0 left-0 h-full w-1 {project.storage_health === 'healthy'
						? 'bg-green-500'
						: 'bg-slate-700'} transition-all group-hover:h-full"
				></div>

				<div class="p-6 pl-8">
					<div class="mb-4 flex items-start justify-between">
						<div>
							<h3 class="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
								{project.tenant_slug}
							</h3>
							<p class="mt-1 text-[10px] tracking-widest text-slate-500 uppercase">
								UUID: {project.id.slice(0, 8)}...
							</p>
						</div>

						<div class="relative">
							<div
								class={`h-3 w-3 rounded-full ${getStatusColor(project.storage_health || 'default')}`}
							></div>
						</div>
					</div>

					<div class="mb-6 grid grid-cols-2 gap-x-2 gap-y-4 border-t border-slate-800 pt-4 text-xs">
						<div>
							<span class="block text-slate-500 uppercase">DB Version</span>
							<span class="text-slate-300">{project.database_version || 'v1.0'}</span>
						</div>
						<div>
							<span class="block text-slate-500 uppercase">Last Sync</span>
							<span class="text-slate-300">{formatDate(project.last_updated)}</span>
						</div>
						<div class="col-span-2">
							<span class="mb-1 block text-slate-500 uppercase">Modules Active</span>
							<div class="flex gap-2">
								{#if project.active_modules}
									{#each project.active_modules as mod}
										<span
											class="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-300"
											>{mod}</span
										>
									{/each}
								{:else}
									<span class="text-slate-600 italic">None active</span>
								{/if}
							</div>
						</div>
					</div>
					<a href="/portal/{project.tenant_slug}" class="block w-full">
						<button
							class="flex w-full items-center justify-center gap-2 rounded bg-slate-800 py-2 text-xs font-bold tracking-wider text-slate-400 uppercase transition-colors hover:bg-blue-600 hover:text-white"
						>
							<span>Enter System</span>
							<svg
								class="h-3 w-3 min-w-[12px]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								></path></svg
							>
						</button>
					</a>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-12 border-t border-slate-800 pt-8">
		<details class="group">
			<summary
				class="flex cursor-pointer items-center gap-2 text-xs text-slate-500 transition-colors hover:text-blue-400"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					></path></svg
				>
				<span>Reveal Raw Data Payload</span>
			</summary>
			<pre
				class="mt-4 overflow-x-auto rounded border border-slate-800 bg-black p-4 text-[10px] text-green-500">
        {JSON.stringify(visible_projects, null, 2)}
      </pre>
		</details>
	</div>
</div>
