<script lang="ts">
	export let data;
	// 🛡️ CRM Page only receives 'leads' and 'tenant', NOT 'status'
	$: ({ leads, tenant } = data);
</script>

<div class="min-h-screen bg-[#050505] p-6 font-sans text-gray-300 md:p-12">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<a
				href="/vault"
				class="font-mono text-[10px] tracking-widest text-blue-500 uppercase transition-colors hover:text-white"
				>← Back_To_Vault</a
			>
			<h1 class="mt-2 text-3xl font-black tracking-tighter text-white uppercase">CRM_Database</h1>
			<p class="font-mono text-xs text-white/30">
				Tenant: {tenant.display_name} // Records: {leads.length}
			</p>
		</div>
		<button
			class="rounded bg-blue-600 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-blue-500"
		>
			+ Manual_Entry
		</button>
	</div>

	<div
		class="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 shadow-2xl backdrop-blur-md"
	>
		<div
			class="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-transparent opacity-50"
		></div>

		<div class="overflow-x-auto">
			<table class="w-full border-collapse text-left">
				<thead>
					<tr
						class="border-b border-white/5 bg-white/[0.02] font-mono text-[9px] font-normal tracking-[0.2em] text-blue-400/80 uppercase"
					>
						<th class="p-4">System_Status</th>
						<th class="p-4">Identity_Key</th>
						<th class="p-4">Origin_Node</th>
						<th class="p-4">Timestamp</th>
						<th class="p-4 text-right">Protocol</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-sm">
					{#each leads as lead}
						<tr class="group cursor-default transition-colors hover:bg-blue-500/[0.02]">
							<td class="p-4">
								<span
									class="inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase
                {lead.status === 'New'
										? 'border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_-4px_rgba(59,130,246,0.5)]'
										: lead.status === 'Closed'
											? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_-4px_rgba(16,185,129,0.5)]'
											: 'border-white/10 bg-white/5 text-gray-400'}"
								>
									{#if lead.status === 'New'}
										<span class="mr-1.5 h-1 w-1 animate-pulse rounded-full bg-blue-400"></span>
									{/if}
									{lead.status}
								</span>
							</td>

							<td class="p-4">
								<div
									class="font-bold tracking-tight text-gray-200 transition-colors group-hover:text-blue-200"
								>
									{lead.name}
								</div>
								<div class="font-mono text-[10px] text-gray-600">{lead.email}</div>
							</td>

							<td class="p-4 font-mono text-[10px] tracking-wider text-gray-500 uppercase"
								>{lead.source}</td
							>

							<td class="p-4 font-mono text-[10px] text-gray-600"
								>{new Date(lead.created_at).toLocaleDateString()}</td
							>

							<td class="p-4 text-right opacity-0 transition-opacity group-hover:opacity-100">
								<button
									class="rounded border border-white/10 px-3 py-1 text-[9px] font-bold tracking-widest text-white/40 uppercase transition-all hover:bg-white/5 hover:text-white"
								>
									Execute_View
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div
			class="flex items-center justify-between border-t border-white/5 bg-black/40 p-2 font-mono text-[9px] tracking-widest text-white/20 uppercase"
		>
			<span>Secure_Connection_Established</span>
			<span>Latency: 12ms</span>
		</div>
	</div>
</div>
