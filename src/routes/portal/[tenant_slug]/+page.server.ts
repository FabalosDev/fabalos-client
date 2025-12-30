import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) throw redirect(303, '/login');

	const { data: client } = await supabase
		.from('authorized_clients')
		.select('*')
		.eq('auth_id', user.id) // FIX: Removed the invalid 3rd argument
		.single();

	if (!client) return { status: 'unauthorized', user };

	// 1. Kunin ang current project gamit ang slug sa URL
	const { data: project } = await supabase
		.from('projects')
		.select('*, authorized_clients(client_name)') // FIX: Added join para makuha ang client_name
		.eq('tenant_slug', params.tenant_slug)
		.single();

	if (!project) return { status: 'not_found' };

	// 2. FETCH REAL DATA PARA SA STATS
	const [milestonesRes, modulesRes, filesRes] = await Promise.all([
		supabase
			.from('project_milestones')
			.select('*')
			.eq('project_id', project.id)
			.order('due_date', { ascending: true }),
		supabase.from('project_modules').select('*, modules(*)').eq('project_id', project.id),
		// Placeholder muna ang files hangga't wala tayong storage table
		{ data: [] }
	]);

	// I-format ang modules para sa sidebar
	// Sa loob ng +page.server.ts load function:
	const active_modules =
		modulesRes.data
			?.map((m) => ({
				name: m.modules?.name,
				slug: m.modules?.slug
			}))
			.filter((m) => m.slug) || [];

	return {
		status: 'authorized',
		user,
		client,
		project: { ...project, active_modules },
		milestones: milestonesRes.data || [],
		files: filesRes.data || [],
		actionItems: [],
		logs: []
	};
};
