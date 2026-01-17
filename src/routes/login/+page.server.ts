import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase } }) => {
	// 1. Get Session
	const { session } = await safeGetSession();

	// 2. If logged in, decide where to go
	if (session) {
		// 🔍 SMART ROUTING: Check if user has an active project
		const { data: project } = await supabase
			.from('projects') // ⚠️ Make sure this matches your table name
			.select('slug')
			.eq('user_id', session.user.id)
			.limit(1)
			.single();

		if (project && project.slug) {
			// ✅ Case A: Existing Client -> Go to their specific Project Dashboard
			throw redirect(303, `/portal/${project.slug}`);
		} else {
			// 🆕 Case B: New User -> Go to Onboarding
			throw redirect(303, '/portal/onboarding');
		}
	}

	// 3. If not logged in, return empty (stay on login page)
	return {};
};
