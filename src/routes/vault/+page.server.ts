import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	// 1. Get User Identity (Who is logged in?)
	const { data: tenant } = await supabase
		.from('authorized_clients')
		.select('*')
		.eq('email', session.user.email)
		.single();

	if (!tenant) {
		throw redirect(303, '/unauthorized');
	}

	// 2. Get System Status (Green/Red lights)
	const { data: status } = await supabase
		.from('project_status')
		.select('*')
		.eq('tenant_slug', tenant.tenant_slug)
		.single();

	// 3. 🆕 THE MISSING PIECE: Count the Leads
	const { count: leadCount } = await supabase
		.from('crm_leads')
		.select('*', { count: 'exact', head: true }) // 'head: true' means "Just count, don't download data"
		.eq('tenant_slug', tenant.tenant_slug);

	return {
		session,
		tenant,
		status,
		// 4. Send the count to the frontend
		leadCount: leadCount || 0
	};
};
