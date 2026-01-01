import { redirect, error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, safeGetSession }, url, parent }) => {
	// 1. Wait for Parent Auth (Wait for root layout)
	const { session, user } = await safeGetSession();
	if (!session) throw redirect(303, '/login');

	const { tenant_slug } = params;

	// 2. FETCH PROJECT & MODULES
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

	// 3. 🛡️ SECURITY: REDIRECT LOOP FIX
	// Old Code: if (url.pathname !== target) -> caused the loop!
	// New Code: "If we are NOT inside the tenant folder, go there."
	const target = `/portal/${project.tenant_slug}`;
	if (!url.pathname.startsWith(target)) {
		console.log(`✅ Redirecting to correct tenant: ${target}`);
		throw redirect(303, target);
	}

	// 4. 🎨 UI STABILITY: SORT FIX
	// We filter AND sort here so the sidebar never "dances"
	const active_modules =
		project.project_modules
			?.filter((pm) => pm.is_enabled !== false)
			.map((pm) => ({
				name: pm.modules?.name,
				slug: pm.modules?.slug
			}))
			.filter((m) => m.slug)
			// 👇 THIS KILLS THE JUMPING BUG (Alphabetical Sort) 👇
			.sort((a, b) => a.name.localeCompare(b.name)) || [];

	return {
		project: {
			...project,
			active_modules
		},
		brandColor: project.brand_color || '#10b981'
	};
};
