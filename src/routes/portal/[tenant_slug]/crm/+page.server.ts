import { error } from '@sveltejs/kit';

export const load = async ({ parent, locals: { supabase } }) => {
	// 1. INHERIT Project ID from Layout
	const { project } = await parent();

	console.log('Loading CRM for Project ID:', project.id);

	// 2. STRICT FETCH: Use project_id
	const { data: contacts } = await supabase
		.from('crm_contacts')
		.select('*')
		.eq('project_id', project.id) // <--- FIX
		.order('created_at', { ascending: false });

	return {
		contacts: contacts || []
	};
};

export const actions = {
	createEntity: async ({ request, locals: { supabase }, params }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const role = formData.get('role') as string;
		const status = formData.get('status') as string;

		// Lookup Project ID first
		const { data: project } = await supabase
			.from('projects') // <--- FIX
			.select('id')
			.eq('tenant_slug', params.tenant_slug)
			.single();

		if (!project) return { success: false, error: 'Project not found' };

		// Insert with Link
		const { error } = await supabase.from('crm_contacts').insert({
			project_id: project.id, // <--- FIX
			name,
			email,
			role,
			status: status || 'lead',
			tenant_slug: params.tenant_slug
		});

		if (error) {
			console.error('Insert Failed:', error);
			return { success: false, error: error.message };
		}

		return { success: true };
	}
};
