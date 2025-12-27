import { redirect, error } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	// 1. BASIC AUTH CHECK: Are they even logged in?
	if (!session) {
		throw redirect(303, '/login');
	}

	// 2. IDENTITY CHECK: Is this Frank?
	// We use the email from your Saved Information as the source of truth.
	const isAdmin = session.user.email === 'frank.2.abalos@gmail.com';

	if (!isAdmin) {
		// We throw a 404 instead of a 403.
		// This makes the page appear non-existent to hackers/curious clients.
		throw error(404, 'Not Found');
	}

	return {
		user: session.user,
		role: 'ADMIN_SUPERUSER'
	};
};
