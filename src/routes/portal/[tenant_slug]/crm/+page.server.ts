import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { tenant_slug } = params;

	console.log('Loading CRM for:', tenant_slug);

	// DIRECT ACCESS: Hindi na kailangan dumaan sa project_status para kumuha ng ID.
	// Kukunin na natin direkta gamit ang 'tenant_slug' column na kakagawin lang natin.
	const { data: contacts } = await supabase
		.from('crm_contacts')
		.select('*')
		.eq('tenant_slug', tenant_slug) // <--- ETO ANG BAGONG SUSI
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
		const { tenant_slug } = params; // Kunin ang slug sa URL

		// INSERT DIRECTLY: Isasave natin ang tenant_slug (e.g., 'admin_core')
		const { error } = await supabase.from('crm_contacts').insert({
			tenant_slug: tenant_slug, // <--- DIRECT LINK NA
			name,
			email,
			role,
			status: status || 'lead'
			// Note: Hindi na natin kailangan ng project_id dito
		});

		if (error) {
			console.error('Insert Failed:', error);
			return { success: false, error: error.message };
		}

		return { success: true };
	}
};
