import { redirect } from '@sveltejs/kit';

// ⚡ FIX: Destructure 'safeGetSession' instead of 'getSession'
export const load = async ({ locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	// 1. Security Check: Kick them out if not logged in
	if (!session) {
		throw redirect(303, '/login');
	}

	console.log('👮 Testing Portal Access for User:', user?.email);

	// 2. The Query: Ask for EVERYTHING (The "Hacker" Test)
	// We intentionally do NOT add .eq('client_id', ...) to prove RLS works.
	const { data: projects, error } = await supabase.from('project_status').select(`
      *,
      authorized_clients ( client_name )
    `);

	if (error) {
		console.error('❌ Database Error:', error);
		return { status: 'Error', msg: error.message };
	}

	// 3. The Audit Log
	console.log('✅ Data Returned:', projects);

	return {
		user: user?.email,
		visible_projects: projects
	};
};
