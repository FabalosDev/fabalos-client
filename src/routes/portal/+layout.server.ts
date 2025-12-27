import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
	// ⚡ FIX: Use the new secure function
	const { session, user } = await safeGetSession();

	// 1. THE BOUNCER
	// If no valid session exists, kick them out to login immediately.
	if (!session) {
		throw redirect(303, '/login');
	}

	// 2. THE PASSTHROUGH
	return {
		session,
		user // We can pass the secure user object directly
	};
};
