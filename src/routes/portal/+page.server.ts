import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	// --- THE BYPASS FIX ---
	// Kukunin ang UNANG CLIENT sa listahan.
	const { data: client } = await supabase.from('authorized_clients').select('*').limit(1).single();

	if (!client) {
		return { status: 'empty_db', user };
	}

	// Get Projects for this client
	const { data: projects } = await supabase.from('projects').select('*').eq('client_id', client.id);

	return {
		status: 'authorized',
		user,
		client,
		projects: projects || []
	};
};
