import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session) throw redirect(303, '/login');

	// 1. Verify Super Admin Status
	const { data: profile } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single();

	if (profile?.role !== 'super_admin') {
		// If a normal user tries to guess this URL, kick them out
		throw redirect(303, '/portal/onboarding');
	}

	// 2. FETCH ALL PROJECTS (God Mode)
	// Since you are Super Admin, RLS allows this query to return everyone.
	const { data: projects, error } = await supabase
		.from('projects')
		.select('*, authorized_clients(client_name)') // Optional: Get client names if linked
		.order('created_at', { ascending: false });

	if (error) console.error('God Mode Fetch Error:', error);

	return {
		user,
		projects: projects || []
	};
};
