import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase }, parent }) => {
	await parent();
	const { tenant_slug } = params;

	// FIX: Tinanggal ang !inner at strict filter para hindi mag-404 kahit walang modules
	const { data: project, error: err } = await supabase
		.from('projects')
		.select(
			`
            *,
            storage_health,
            authorized_clients ( display_name ),
            project_modules (
                is_enabled,
                modules ( name, slug )
            )
            `
		)
		.eq('tenant_slug', tenant_slug)
		.single();

	if (err || !project) {
		console.error(`Portal Access Error: ${tenant_slug}`, err);
		throw error(404, 'Portal Node Not Found');
	}

	// Filter sa JS side na lang para safe
	const active_modules =
		project.project_modules
			?.filter((pm) => pm.is_enabled !== false) // Default to include if validation allows
			.map((pm) => ({
				name: pm.modules?.name,
				slug: pm.modules?.slug
			}))
			.filter((m) => m.slug) || [];

	return {
		project: {
			...project,
			active_modules
		},
		brandColor: project.brand_color || '#10b981'
	};
};
