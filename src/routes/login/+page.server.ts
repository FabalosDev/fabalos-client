import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	// Kung may active session na, huwag nang ipakita ang login page
	// I-redirect agad sa Portal Gateway
	if (session) {
		throw redirect(303, '/portal');
	}

	return {};
};
