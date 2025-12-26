<script lang="ts">
	import CRM from '$lib/components/modules/CRM.svelte';
	// import CMS from '$lib/components/modules/CMS.svelte'; // ❌ DISABLED FOR BUILD

	export let data;
	$: ({ session, tenant, status, leadCount } = data);

	// 🛡️ Safe check for modules array
	$: modules = status.active_modules || [];

	// 🎨 Helper for status colors
	const getStatusColor = (s: string) => {
		if (s.includes('Active') || s.includes('Operational'))
			return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_10px_-4px_rgba(16,185,129,0.3)]';
		if (s.includes('Offline') || s.includes('Disconnected'))
			return 'text-red-400 bg-red-400/10 border-red-400/20 shadow-[0_0_10px_-4px_rgba(248,113,113,0.3)]';
		return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
	};
</script>

<div class="min-h-screen bg-transparent pb-20 font-sans text-gray-300">
	<header class="sticky top-0 z-40 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md">
		<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
			<div class="flex items-center gap-4">
				<div
					class="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-white/5 text-white/40 shadow-inner"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg
					>
				</div>
				<div>
					<h1 class="text-sm font-bold tracking-widest text-white uppercase drop-shadow-md">
						{tenant.display_name}
					</h1>
					<div class="mt-1 flex items-center gap-2">
						<span
							class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
						></span>
						<span class="font-mono text-[10px] tracking-wider text-emerald-500"
							>SYSTEM_OPTIMINAL</span
						>
					</div>
				</div>
			</div>
			<div
				class="hidden items-center gap-8 font-mono text-[10px] tracking-widest text-white/30 uppercase md:flex"
			>
				<div class="text-right">
					<span class="block text-white/10">Tenant_ID</span>
					{tenant.tenant_slug}
				</div>
				<div class="text-right">
					<span class="block text-white/10">Latency</span>
					24ms
				</div>
				<div class="text-right">
					<span class="block text-white/10">Uptime</span>
					99.98%
				</div>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-7xl px-6 pt-12">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="font-mono text-xs tracking-widest text-blue-500 uppercase">Live_Telemetry</h2>
		</div>

		<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div
				class="group relative rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)]"
			>
				<h3 class="mb-4 font-mono text-[10px] tracking-wider text-white/40 uppercase">
					Orchestration_Engine
				</h3>
				<span class="text-2xl font-bold tracking-tight text-white">{status.n8n_status}</span>
				<div
					class={`mt-4 inline-flex items-center rounded border px-2 py-1 font-mono text-[10px] font-bold uppercase ${getStatusColor(status.n8n_status)}`}
				>
					● STATE: {status.n8n_status.includes('//') ? 'ACTIVE' : 'OFFLINE'}
				</div>
			</div>

			<div
				class="group relative rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)]"
			>
				<h3 class="mb-4 font-mono text-[10px] tracking-wider text-white/40 uppercase">
					Database_Core
				</h3>
				<span class="text-2xl font-bold tracking-tight text-white">{status.database_version}</span>
				<div class="mt-4 inline-flex items-center gap-2 font-mono text-[10px] text-green-500">
					✓ Replica_Synced
				</div>
			</div>

			<div
				class="group relative rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)]"
			>
				<h3 class="mb-4 font-mono text-[10px] tracking-wider text-white/40 uppercase">
					Global_CDN
				</h3>
				<span class="text-2xl font-bold tracking-tight text-white">{status.storage_health}</span>
				<div class="mt-4 h-1 w-full rounded-full bg-white/5">
					<div class="h-1 w-3/4 rounded-full bg-blue-500"></div>
				</div>
			</div>
		</div>

		{#if modules.length > 0}
			<div class="mb-6 flex items-center justify-between border-t border-white/5 pt-12">
				<h2 class="font-mono text-xs tracking-widest text-blue-500 uppercase">Active_Protocols</h2>
				<span class="text-[10px] text-white/20">Configured: {modules.length} Modules</span>
			</div>

			<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#if modules.includes('crm')}
					<CRM count={leadCount} />
				{/if}

				{#if modules.includes('tagging')}
					<div
						class="group relative flex h-full items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/[0.01] p-6 font-mono text-xs text-white/20 uppercase transition-all hover:border-white/10 hover:text-white/40"
					>
						Tagging_Engine // Active
					</div>
				{/if}
			</div>
		{/if}
	</main>
</div>
