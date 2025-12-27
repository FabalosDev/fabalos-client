import { redirect, error } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
	// ⚡ FIX: Use the new secure function
	const { session, user } = await safeGetSession();

	// 1. BASIC AUTH CHECK: Are they even logged in?
	if (!session) {
		throw redirect(303, '/login');
	}

	// 2. IDENTITY CHECK: Is this Frank?
	// Note: We use the secure 'user' object returned from safeGetSession
	const isAdmin = user?.email === 'frank.2.abalos@gmail.com';

	if (!isAdmin) {
		// We throw a 404 instead of a 403 to hide the route.
		throw error(404, 'Not Found');
	}

	return {
		user,
		role: 'ADMIN_SUPERUSER'
	};
};
