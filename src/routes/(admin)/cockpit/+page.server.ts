import { error, fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, platform }) => {
	const { data: allProjects, error: dbError } = await supabase
		.from('project_status')
		.select(
			`
      *,
      authorized_clients (
        display_name,
        email
      )
    `
		)
		.order('last_updated', { ascending: false });

	if (dbError) {
		console.error('Admin Data Fetch Error:', dbError);
		throw error(500, 'Internal Server Error: Vault Access Failed');
	}

	const storageStatus = {
		connected: !!platform?.env?.CLIENT_ASSETS,
		bucketName: platform?.env?.CLIENT_ASSETS ? 'fabalos-client-assets' : 'DISCONNECTED'
	};

	const stats = {
		totalProjects: allProjects?.length || 0,
		healthySystems: allProjects?.filter((p) => p.storage_health === 'healthy').length || 0,
		activeModules: [...new Set(allProjects?.flatMap((p) => p.active_modules || []))].length
	};

	return { allProjects, storageStatus, stats };
};

export const actions = {
	provision: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const clientName = formData.get('client_name') as string;
		const clientEmail = formData.get('client_email') as string;
		const tenantSlug = formData.get('tenant_slug') as string;

		// 1. CREATE CLIENT IDENTITY
		const { data: client, error: clientError } = await supabase
			.from('authorized_clients')
			.insert([
				{
					display_name: clientName,
					email: clientEmail
				}
			])
			.select()
			.single();

		if (clientError) {
			return fail(400, {
				message: 'Failed to create client identity.',
				error: clientError.message
			});
		}

		// 2. LINK INFRASTRUCTURE (The Floor)
		const { error: projectError } = await supabase.from('project_status').insert([
			{
				client_id: client.id,
				tenant_slug: tenantSlug,
				storage_health: 'healthy',
				database_version: 'Supabase_v1.0',
				active_modules: ['files', 'reports', 'crm'] // Standard Lane 2 Starter Pack
			}
		]);

		if (projectError) {
			// Cleanup: We could delete the client here if this fails,
			// but keeping it allows for manual retry in the dashboard.
			return fail(400, { message: 'Project link failed.', error: projectError.message });
		}

		return { success: true };
	}
};
