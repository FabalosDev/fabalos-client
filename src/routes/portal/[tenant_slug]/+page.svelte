<script lang="ts">
	export let data;
	$: ({ project } = data);
</script>

<div class="min-h-screen bg-slate-950 font-mono text-slate-200">
	<nav class="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

			<div class="flex items-center gap-4">
				<a href="/portal/test" class="text-xs text-slate-500 transition-colors hover:text-white">
					← BACK TO VAULT
				</a>
				<span class="text-slate-700">/</span>
				<h1 class="text-lg font-bold tracking-tight text-white uppercase">
					{project.tenant_slug}
				</h1>
			</div>

			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2">
					<span
						class="h-2 w-2 rounded-full {project.storage_health === 'healthy'
							? 'animate-pulse bg-green-500'
							: 'bg-red-500'}"
					></span>
					<span class="text-xs font-bold text-slate-400 uppercase">System Online</span>
				</div>

				<div class="h-4 w-px bg-slate-800"></div>

				<form action="/auth/logout" method="POST">
					<button
						type="submit"
						class="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 uppercase transition-colors"
					>
						<span>Disconnect</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
								points="16 17 21 12 16 7"
							/><line x1="21" x2="9" y1="12" y2="12" /></svg
						>
					</button>
				</form>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-7xl px-6 py-12">
		<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg border border-slate-800 bg-slate-900 p-6">
				<h3 class="mb-2 text-xs tracking-widest text-slate-500 uppercase">Database Version</h3>
				<p class="text-2xl font-bold text-white">{project.database_version}</p>
			</div>

			<div class="rounded-lg border border-slate-800 bg-slate-900 p-6">
				<h3 class="mb-2 text-xs tracking-widest text-slate-500 uppercase">Last Sync</h3>
				<p class="text-2xl font-bold text-white">
					{new Date(project.last_updated).toLocaleDateString()}
				</p>
			</div>

			<div class="rounded-lg border border-slate-800 bg-slate-900 p-6">
				<h3 class="mb-2 text-xs tracking-widest text-slate-500 uppercase">Authorized Entity</h3>
				<p class="text-lg font-bold text-blue-400">
					{project.authorized_clients?.display_name || 'Unknown Entity'}
				</p>
			</div>
		</div>

		<div class="border-t border-slate-800 pt-8">
			<h2 class="mb-6 text-xl font-bold text-white">Active Modules</h2>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#if project.active_modules}
					{#each project.active_modules as mod}
						<div
							class="group flex cursor-pointer items-center justify-between rounded border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-600"
						>
							<span class="font-bold text-slate-300 group-hover:text-white">{mod}</span>
							<svg
								class="h-4 w-4 text-slate-600 group-hover:text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								></path></svg
							>
						</div>
					{/each}
				{:else}
					<div class="rounded border border-dashed border-slate-800 p-8 text-center text-slate-600">
						No Active Modules Configured
					</div>
				{/if}
			</div>

			<div class="mt-8 border-t border-slate-800 pt-8">
				<h2 class="mb-6 text-xl font-bold tracking-tight text-white">Delivery Vault</h2>

				<div class="grid gap-4">
					{#each data.files as file}
						<div
							class="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4 transition-all hover:border-blue-500"
						>
							<div class="flex items-center gap-4">
								<div
									class="rounded bg-slate-800 p-2 text-blue-400 transition-colors group-hover:text-white"
								>
									<svg
										class="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										></path></svg
									>
								</div>
								<div>
									<p class="text-sm font-bold text-slate-200">{file.key.split('/').pop()}</p>
									<p class="text-xs text-slate-500 uppercase">
										{file.size} • {new Date(file.updated).toLocaleDateString()}
									</p>
								</div>
							</div>

							<button
								class="rounded bg-slate-800 px-4 py-2 text-xs font-bold uppercase transition-colors hover:bg-blue-600"
							>
								Download
							</button>
						</div>
					{:else}
						<p class="text-sm italic text-slate-600">No assets found in this vault.</p>
					{/each}
				</div>
			</div>
		</div>
	</main>
</div>