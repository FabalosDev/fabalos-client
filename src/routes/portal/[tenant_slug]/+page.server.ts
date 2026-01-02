// src/routes/portal/[tenant_slug]/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, parent, locals: { supabase } }) => {
	// 1. Inherit Data from Layout (Efficient!)
	const { user, client, isSuperAdmin } = await parent();

	// 2. THE GATEKEEPER
	// If you aren't the Client AND you aren't the Admin -> KICK.
	if (!client && !isSuperAdmin) {
		console.log('⛔ Access Denied: User is neither Client nor Admin.');
		throw redirect(303, '/portal/onboarding');
	}

	// 3. FETCH PROJECT
	// (Your RLS will allow this because you are Super Admin)
	const { data: project } = await supabase
		.from('projects')
		.select('*, authorized_clients(client_name)')
		.eq('tenant_slug', params.tenant_slug)
		.single();

	if (!project) return { status: 'not_found' };

	// 4. FETCH ASSETS (Parallel)
	const [milestonesRes, modulesRes, filesRes] = await Promise.all([
		supabase
			.from('project_milestones')
			.select('*')
			.eq('project_id', project.id)
			.order('due_date', { ascending: true }),
		supabase.from('project_modules').select('*, modules(*)').eq('project_id', project.id),
		supabase
			.from('project_vault')
			.select('*')
			.eq('project_id', project.id)
			.order('created_at', { ascending: false })
	]);

	// Clean Data
	const active_modules =
		modulesRes.data
			?.map((m) => ({ name: m.modules?.name, slug: m.modules?.slug }))
			.filter((m) => m.slug) || [];
	const cleanFiles = (filesRes.data || []).filter((f) => f.file_name && f.file_path);

	return {
		status: 'authorized',
		user,
		// If Admin, use a dummy name so the UI doesn't crash
		client: client || { client_name: 'FABALOS_ADMIN_OVERRIDE' },
		project: { ...project, active_modules },
		milestones: milestonesRes.data || [],
		files: cleanFiles
	};
};
