<script lang="ts">
	import '$styles/global.css';
	import '$styles/app.css';
	import { page } from '$app/stores';

	export let data;

	// 🛡️ Reactive check: safely grab the user from the session
	$: user = $page.data.session?.user || data?.session?.user;
	$: currentPath = $page.url.pathname;
</script>

<svelte:head>
	<title>Fabalos Automation — Intelligent Systems Architecture</title>
	<meta
		name="description"
		content="Fabalos Automation architects custom n8n workflows, secure data pipelines, and business intelligence systems for scaling enterprises."
	/>
	<meta
		name="keywords"
		content="fabalos, automation, n8n, systems architecture, business intelligence, workflow engineering, sveltekit"
	/>
	<meta name="author" content="Frank Abalos (Systems Architect)" />
	<meta name="robots" content="index, follow" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fabalos.com{currentPath}" />
	<meta property="og:title" content="Fabalos Automation — Intelligent Systems Architecture" />
	<meta
		property="og:description"
		content="Stop doing manual work. We build the engine that runs your business. Secure, scalable, and automated."
	/>
	<meta property="og:image" content="https://fabalos.com/og-card-v2.png" />
	<meta property="og:site_name" content="Fabalos Automation" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://fabalos.com{currentPath}" />
	<meta name="twitter:title" content="Fabalos Automation" />
	<meta
		name="twitter:description"
		content="Stop doing manual work. We build the engine that runs your business."
	/>
	<meta name="twitter:image" content="https://fabalos.com/og-card-v2.png" />

	<link rel="icon" href="/favicon.png" type="image/png" />
	<meta name="theme-color" content="#030303" />
</svelte:head>

<div
	class="relative min-h-screen overflow-x-hidden bg-[#030303] font-sans text-gray-300 selection:bg-blue-500/30"
>
	<div
		class="pointer-events-none absolute inset-0 z-0"
		style="background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px; mask-image: linear-gradient(to bottom, black 40%, transparent 100%);"
	></div>

	{#if user}
		<div
			class="fixed top-4 right-4 z-50 rounded border border-white/10 bg-black/80 px-3 py-1 font-mono text-xs tracking-widest text-blue-500/50 uppercase shadow-2xl backdrop-blur-md"
		>
			ID: <strong class="text-blue-400">{user.email}</strong>
		</div>
	{:else}
		<div
			class="fixed top-4 right-4 z-50 hidden font-mono text-[10px] tracking-widest text-red-500/50 uppercase opacity-50 md:block"
		>
			// Not_Authenticated
		</div>
	{/if}

	<div class="relative z-10">
		<slot />
	</div>
</div>
