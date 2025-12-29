import { fail, redirect } from '@sveltejs/kit';

// 1. LOADER: Kukunin ang modules at status pag-load ng page
export const load = async ({ params, locals: { supabase } }) => {
	const { tenant_slug } = params;

	// A. Hanapin ang Project ID
	const { data: project } = await supabase
		.from('projects')
		.select('id, name')
		.eq('tenant_slug', tenant_slug)
		.single();

	if (!project) throw redirect(303, '/portal');

	// B. Kunin ang Master List (Menu)
	const { data: allModules } = await supabase.from('modules').select('*').order('name');

	// C. Kunin ang Active Subscriptions
	const { data: activeLinks } = await supabase
		.from('project_modules')
		.select('module_id, is_enabled')
		.eq('project_id', project.id);

	// D. Pagsamahin (Merge)
	const modulesWithStatus = allModules?.map((mod) => {
		const link = activeLinks?.find((l) => l.module_id === mod.id);
		return {
			...mod,
			is_enabled: link ? link.is_enabled : false
		};
	});

	return { project, modules: modulesWithStatus || [] };
};

// 2. ACTIONS: Dito ilalagay ang UPSERT code mo
export const actions = {
	toggleModule: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const module_id = formData.get('module_id') as string;
		const target_state = formData.get('state') === 'true'; // Convert "true"/"false" string to boolean
		const { tenant_slug } = params;

		// A. Kunin ulit ang Project ID (Security check)
		const { data: project } = await supabase
			.from('projects')
			.select('id')
			.eq('tenant_slug', tenant_slug)
			.single();

		if (!project) return fail(404, { error: 'Project not found' });

		// B. ETO YUNG UPSERT CODE MO
		const { error } = await supabase.from('project_modules').upsert(
			{
				project_id: project.id,
				module_id: module_id,
				is_enabled: target_state
			},
			{ onConflict: 'project_id, module_id' } // Ito ang magic key
		);

		if (error) {
			console.error('Upsert Error:', error);
			return fail(500, { error: error.message });
		}

		return { success: true };
	}
};
