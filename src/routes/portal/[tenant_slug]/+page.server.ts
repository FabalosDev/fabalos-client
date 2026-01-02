import { redirect } from '@sveltejs/kit';

export const load = async ({ params, parent, locals: { supabase } }) => {
	// 1. Inherit Data from Layout
	// This gives us the User, the Client Record, and the Super Admin status
	const { user, client, isSuperAdmin } = await parent();

	// 2. THE GATEKEEPER (Level 1)
	// Stop random strangers who aren't in your 'authorized_clients' table
	if (!client && !isSuperAdmin) {
		console.log('⛔ Access Denied: User is neither Client nor Admin.');
		throw redirect(303, '/portal/onboarding');
	}

	// 3. FETCH PROJECT
	const { data: project } = await supabase
		.from('projects')
		.select('*, authorized_clients(client_name)')
		.eq('tenant_slug', params.tenant_slug)
		.single();

	if (!project) return { status: 'not_found' };

	// 4. THE OWNERSHIP CHECK (Level 2 - THE FIX)
	// We explicitly check: Does this project belong to this user?
	// Note: We check both user.id and client.id to cover your schema setup.
	const isOwner = project.client_id === user.id || project.client_id === client?.id;

	if (!isSuperAdmin && !isOwner) {
		console.log(`⛔ SECURITY ALERT: User ${user.email} tried to access project ${project.name}`);
		// Redirect them to their OWN dashboard instead of the one they tried to hack
		throw redirect(303, '/unauthorized');
	}

	// 5. FETCH ASSETS (Only runs if you passed the check above)
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
		client: client || { client_name: 'FABALOS_ADMIN_OVERRIDE' },
		project: { ...project, active_modules },
		milestones: milestonesRes.data || [],
		files: cleanFiles
	};
};
