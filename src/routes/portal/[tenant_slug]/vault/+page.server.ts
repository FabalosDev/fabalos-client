import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) throw redirect(303, '/login');

	// 1. HANAPIN ANG PROJECT GAMIT ANG URL SLUG
	const { data: project } = await supabase
		.from('projects')
		.select('*')
		.eq('tenant_slug', params.tenant_slug)
		.single();

	if (!project) return { status: 'not_found' };

	// 2. KUNIN ANG FILES SA VAULT
	const { data: files } = await supabase
		.from('project_vault')
		.select('*')
		.eq('project_id', project.id)
		.order('created_at', { ascending: false });

	// 3. SECURITY FILTER (Para iwas crash sa ghost files)
	const cleanFiles = (files || []).filter((f) => f.file_name && f.file_path);

	return {
		project,
		files: cleanFiles
	};
};
