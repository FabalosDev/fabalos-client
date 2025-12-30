import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) throw redirect(303, '/login');

	const { data: client } = await supabase
		.from('authorized_clients')
		.select('*')
		.eq('auth_id', user.id)
		.single();

	if (!client) return { status: 'unauthorized', user };

	// 1. KUNIN ANG PROJECT
	const { data: project } = await supabase
		.from('projects')
		.select('*, authorized_clients(client_name)')
		.eq('tenant_slug', params.tenant_slug)
		.single();

	if (!project) return { status: 'not_found' };

	// 2. FETCH REAL DATA
	const [milestonesRes, modulesRes, filesRes] = await Promise.all([
		// A. Milestones
		supabase
			.from('project_milestones')
			.select('*')
			.eq('project_id', project.id)
			.order('due_date', { ascending: true }),

		// B. Modules
		supabase.from('project_modules').select('*, modules(*)').eq('project_id', project.id),

		// C. FILES
		supabase
			.from('project_vault')
			.select('*')
			.eq('project_id', project.id)
			.order('created_at', { ascending: false })
	]);

	// I-format ang modules
	const active_modules =
		modulesRes.data
			?.map((m) => ({
				name: m.modules?.name,
				slug: m.modules?.slug
			}))
			.filter((m) => m.slug) || [];

	// --- SECURITY FILTER ---
	// Dito natin tatanggalin ang mga "Ghost Files" (null filenames)
	// para hindi na mag-error ang .split() sa frontend.
	const cleanFiles = (filesRes.data || []).filter((f) => f.file_name && f.file_path);

	return {
		status: 'authorized',
		user,
		client,
		project: { ...project, active_modules },
		milestones: milestonesRes.data || [],
		files: cleanFiles, // Gamitin ang malinis na listahan
		actionItems: [],
		logs: []
	};
};
