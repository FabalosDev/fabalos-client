import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
	// 1. Use the new SAFE session checker we created
	const { session, user } = await safeGetSession();

	// 2. Pass it down to every page in the app
	return {
		session,
		user
	};
};
