import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/vault';

	if (code) {
		// 🛡️ Exchange the temporary code for a permanent session
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			// 🛡️ Log the success to the terminal to confirm the handshake
			console.log(`[AUTH_CALLBACK] Handshake Successful. Routing to: ${next}`);

			// Ensure the path is absolute
			const path = next.startsWith('/') ? next : `/${next}`;
			throw redirect(303, path);
		} else {
			console.error(`[AUTH_CALLBACK] Exchange Error: ${error.message}`);
		}
	}

	// ⚠️ Fail-safe: If code is missing or exchange fails
	throw redirect(303, '/auth/auth-code-error');
};
