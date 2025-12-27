import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// 1. THE BOUNCER
	// If no valid session exists, kick them out to login immediately.
	if (!session) {
		throw redirect(303, '/login');
	}

	// 2. THE PASSTHROUGH
	// If they are allowed in, pass their User Data down to every child page.
	// This means you don't have to re-fetch "Who am I?" in the sub-pages.
	return {
		session,
		user: session.user
	};
};
