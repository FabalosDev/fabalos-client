<script lang="ts">
	import { page } from '$app/stores';

	// 🛡️ SYSTEM INTEGRATION: Pull the authorized client from the server
	// This ensures we share the same cookie state as the "Gatekeeper"
	$: supabase = $page.data.supabase;

	let email = '';
	let loading = false;
	let message = '';

	async function signInWithMagicLink() {
		loading = true;
		message = '';

		// 🔒 SENIOR CHECK: Ensure the client exists before firing
		if (!supabase) {
			message = 'SYSTEM_ERROR: Auth client unreachable.';
			loading = false;
			return;
		}

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				// 🔗 This must match the URL in your Supabase Dashboard > Auth > URL Configuration
				emailRedirectTo: `${window.location.origin}/auth/callback`,
				flowType: 'pkce'
			}
		});

		if (error) {
			message = `ERROR_LOG: ${error.message}`;
		} else {
			message = 'AUTH_SIGNAL: Secure code dispatched to inbox.';
		}
		loading = false;
	}
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] p-6 font-mono">
	<div class="w-full max-w-md rounded-lg border border-white/5 bg-[#111] p-8 shadow-2xl">
		<div class="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
			<div class="flex items-center gap-2">
				<div class="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
				<span class="text-[10px] tracking-[0.2em] text-white/50 uppercase"
					>Security_Protocol: OTP</span
				>
			</div>
			<span class="text-[9px] text-white/20 uppercase">v1.0.4</span>
		</div>

		<h1 class="mb-2 text-2xl font-black tracking-tighter text-white uppercase">Access_Vault</h1>
		<p class="mb-8 text-xs leading-relaxed text-gray-500">
			Provide authorized email to receive a secure access token. No password required.
		</p>

		<div class="space-y-4">
			<div class="group">
				<label
					for="email"
					class="mb-2 ml-1 block text-[10px] tracking-widest text-blue-500/50 uppercase"
				>
					Identity_Input
				</label>
				<input
					id="email"
					type="email"
					placeholder="user@domain.com"
					bind:value={email}
					class="w-full rounded border border-white/10 bg-black p-4 text-sm text-white transition-all placeholder:text-white/10 focus:border-blue-500/50 focus:outline-none"
				/>
			</div>

			<button
				on:click={signInWithMagicLink}
				class="w-full bg-blue-600 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={loading}
			>
				{loading ? 'Transmitting...' : 'Execute_Sign_In'}
			</button>
		</div>

		{#if message}
			<div class="mt-8 rounded border border-white/5 bg-black/50 p-4">
				<p
					class="text-[10px] {message.includes('ERROR')
						? 'text-red-500'
						: 'text-blue-400'} leading-relaxed italic"
				>
					> {message}
				</p>
			</div>
		{/if}

		<div class="mt-8 text-center">
			<a
				href="/"
				class="text-[10px] tracking-widest text-white/20 uppercase transition-colors hover:text-white/50"
			>
				← Abort_Operation
			</a>
		</div>
	</div>

	<div class="fixed bottom-6 left-6 hidden opacity-10 lg:block">
		<div class="space-y-1 font-mono text-[9px] text-white uppercase">
			<p>ID: {email || 'ANONYMOUS'}</p>
			<p>STATUS: AWAITING_AUTH</p>
			<p>PORT: 443_ENCRYPTED</p>
		</div>
	</div>
</main>
