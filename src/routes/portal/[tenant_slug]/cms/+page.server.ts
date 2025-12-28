import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { tenant_slug } = params;

	// FINAL: Sa 'project_status' tayo kukuha. Dito tayo naka-lock.
	const { data: project } = await supabase
		.from('project_status')
		.select('id, tenant_slug')
		.eq('tenant_slug', tenant_slug)
		.single();

	if (!project) throw error(404, 'System Node Not Found');

	const { data: posts } = await supabase
		.from('cms_posts')
		.select('*')
		.eq('project_id', project.id)
		.order('created_at', { ascending: false });

	return {
		posts: posts || []
	};
};
