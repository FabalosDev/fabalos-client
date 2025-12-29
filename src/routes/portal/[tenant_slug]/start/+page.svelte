<script lang="ts">
	import TicketModal from '$lib/components/TicketModal.svelte';

	// State management para sa Action Node
	let showTicketModal = false;

	const phases = [
		{
			id: '01',
			title: 'Connection Protocol',
			desc: 'API credentials and secure permissions are integrated across your ecosystem (CRM, Email, Forms, etc.).',
			details:
				'During this stage, we ensure the automation engine can securely communicate with your tools. We verify that it can read and write data only where strictly necessary for the workflow.'
		},
		{
			id: '02',
			title: 'Logic Validation',
			desc: 'The system undergoes controlled testing to confirm behavior before interacting with real production data.',
			details:
				'You may notice test records or dummy files inside your connected platforms. These are intentionally generated to validate error handling and ensure no actual customer data is affected during staging.'
		},
		{
			id: '03',
			title: 'Production Release',
			desc: 'The architecture is promoted to a live state where it begins processing real-world data autonomously.',
			details:
				'Once the system is live, no daily manual action is required on your part. The engine operates 24/7 in the background based on the agreed-upon schedules and logic paths.'
		}
	];
</script>

<div class="space-y-16 py-12">
	<header class="max-w-4xl zborder-primary pl-8">
		<h2 class="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
			System_Standard_Operating_Procedure
		</h2>
		<h3 class="mt-4 text-4xl font-bold tracking-tighter text-white">Getting Started</h3>
		<div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-400">
			<p>
				This dashboard serves as a <span class="text-white font-bold">read-only monitoring interface</span
				>. It is designed to provide visibility into the operational state of your automation system
				as it moves through its lifecycle.
			</p>
			<div class="rounded-lg border border-primary/20 bg-primary/5 p-5">
				<p class="text-xs leading-relaxed text-slate-300">
					<strong class="mb-1 block uppercase tracking-widest text-primary">Execution Policy:</strong>
					You are not expected to manage, configure, or manually trigger automations from this screen.
					Most processes run autonomously in the background according to the technical specifications
					established during build.
				</p>
			</div>
		</div>
	</header>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		{#each phases as phase}
			<div class="relative border border-white/5 bg-slate-900/30 p-8 transition-all">
				<span class="font-mono text-[10px] tracking-widest text-slate-600">PHASE_{phase.id}</span>
				<h4 class="mt-6 text-lg font-bold uppercase tracking-tight text-white">{phase.title}</h4>
				<div class="mt-4 space-y-4">
					<p class="text-xs font-medium leading-relaxed text-slate-300">{phase.desc}</p>
					<p class="text-justify text-[11px] italic leading-relaxed text-slate-500">
						{phase.details}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="rounded-2xl border border-white/10 bg-black/40 p-12">
		<div class="mb-12 flex items-center gap-6">
			<h3 class="font-mono text-[11px] font-bold uppercase tracking-[0.5em] text-primary">
				System_Behavior_Protocol
			</h3>
			<div class="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
		</div>

		<div class="grid grid-cols-1 gap-16 md:grid-cols-2">
			<div class="space-y-4">
				<h4 class="border-b border-primary/30 pb-2 text-sm font-bold uppercase tracking-widest text-white">
					Read-Only Architecture
				</h4>
				<p class="text-justify text-xs leading-relaxed text-slate-400">
					This interface is intentionally <span class="text-white">monitor-only</span> to prevent accidental
					desync between platforms. Any manual edits to contacts, deals, or files should always be performed
					within the original source platform.
				</p>
			</div>

			<div class="space-y-4">
				<h4 class="border-b border-primary/30 pb-2 text-sm font-bold uppercase tracking-widest text-white">
					Event Log Frequency
				</h4>
				<p class="text-justify text-xs leading-relaxed text-slate-400">
					The system records <span class="text-white">events</span> rather than individual records. Seeing
					multiple entries for the same item is expected behavior and confirms active sync cycles.
				</p>
			</div>

			<div class="mt-6 border-t border-white/10 pt-10 md:col-span-2">
				<div
					class="flex flex-col items-center justify-between gap-10 rounded-xl border border-red-500/10 bg-red-500/5 p-8 md:flex-row"
				>
					<div class="space-y-3">
						<h4 class="text-sm font-bold uppercase tracking-widest text-red-500">
							Anomaly & Error Handling
						</h4>
						<p class="max-w-2xl text-xs leading-relaxed text-slate-400">
							Errors are captured and surfaced as alerts. If you receive an error notification, <span
								class="font-bold italic text-white underline">do not attempt to fix it yourself</span
							>. Submit a priority ticket through the engineering channel immediately.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showTicketModal}
	<TicketModal bind:show={showTicketModal} />
{/if}