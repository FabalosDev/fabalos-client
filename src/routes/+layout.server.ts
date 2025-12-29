import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
	// Gamitin ang safeGetSession para secure
	const { session, user } = await safeGetSession();

	return {
		session,
		user
	};
};
