import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase }, parent }) => {
	await parent();
	const { tenant_slug } = params;

	// Query projects + authorized_clients + modules (via project_modules junction)
	const { data: project, error: err } = await supabase
		.from('projects')
		.select(
			`
    *,
    storage_health,
    authorized_clients (
      display_name
    ),
    project_modules!inner (
      is_enabled,
      modules!inner (
        name,
        slug
      )
    )
  `
		)
		.eq('tenant_slug', tenant_slug)
		.eq('project_modules.is_enabled', true)
		.single();

	if (err || !project) {
		console.error(`Portal Access Error: ${tenant_slug}`, err);
		throw error(404, 'Portal Node Not Found');
	}

	// I-flatten ang nested join para maging malinis na array para sa Sidebar
	const active_modules =
		project.project_modules?.map((pm) => ({
			name: pm.modules.name,
			slug: pm.modules.slug
		})) || [];

	return {
		project: {
			...project,
			active_modules
		},
		brandColor: project.brand_color || '#10b981'
	};
};
