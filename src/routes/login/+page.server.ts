import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
	// Gamitin ang bagong function
	const { session } = await safeGetSession();

	// Kung naka-login na, tendalon agad sa portal
	if (session) {
		throw redirect(303, '/portal');
	}

	return {};
};
