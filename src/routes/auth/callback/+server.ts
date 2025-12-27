// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	// CHANGED: Default to /portal/test instead of /vault
	const next = url.searchParams.get('next') ?? '/portal/test';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, next);
		}
	}
	throw redirect(303, '/auth/auth-code-error');
};
