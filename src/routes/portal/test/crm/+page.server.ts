import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	// 1. Get the Tenant Identity from the parent layout
	const { tenant } = await parent();

	// 2. Security Gate: Does this tenant actually have access to CRM?
	// We check the 'active_modules' list we made earlier.
	const { data: status } = await supabase
		.from('project_status')
		.select('active_modules')
		.eq('tenant_slug', tenant.tenant_slug)
		.single();

	if (!status?.active_modules?.includes('crm')) {
		throw redirect(303, '/vault'); // Kick them out if they didn't pay for CRM
	}

	// 3. Fetch THEIR leads only
	const { data: leads } = await supabase
		.from('crm_leads')
		.select('*')
		.eq('tenant_slug', tenant.tenant_slug)
		.order('created_at', { ascending: false });

	return { leads: leads || [] };
};
