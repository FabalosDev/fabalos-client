import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase }, parent }) => {
	// 1. Wait for global root data
	await parent();

	const { tenant_slug } = params;

	// 2. Fetch Project Identity (Single Source of Truth)
	const { data: project, error: err } = await supabase
		.from('project_status')
		.select(
			`
      *,
      authorized_clients (
        display_name
      )
    `
		)
		.eq('tenant_slug', tenant_slug)
		.single();

	if (err || !project) {
		console.error(`Portal Access Error: ${tenant_slug}`, err);
		throw error(404, 'Portal Node Not Found');
	}

	// 3. Return to all children pages
	return {
		project,
		brandColor: project.brand_color || '#3b82f6'
	};
};
