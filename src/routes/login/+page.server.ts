import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase } }) => {
	// 1. Get Session
	const { session } = await safeGetSession();

	// 2. If logged in, perform the "Smart Check"
	if (session) {
		// 🔍 CORRECT QUERY: Check authorized_clients first (matches your Portal logic)
		const { data: client } = await supabase
			.from('authorized_clients')
			.select('*, projects(*)') // Fetch linked projects
			.eq('auth_id', session.user.id)
			.single();

		// 3. Decide Destination
		if (client && client.projects && client.projects.length > 0) {
			// ✅ Case A: Existing Client -> Use 'tenant_slug' (not 'slug')
			throw redirect(303, `/portal/${client.projects[0].tenant_slug}`);
		} else {
			// 🆕 Case B: New User -> Go to Onboarding
			throw redirect(303, '/portal/onboarding');
		}
	}

	// 3. If not logged in, return empty (render the login page)
	return {};
};
