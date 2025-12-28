import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	// If 'next' is present, use it; otherwise, default to the Portal Airlock
	const next = url.searchParams.get('next') ?? '/portal';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			// Use a 303 redirect to ensure the browser performs a GET request to the next page
			throw redirect(303, next);
		}
	}

	// If code exchange fails, send to the error node
	throw redirect(303, '/auth/auth-code-error');
};
