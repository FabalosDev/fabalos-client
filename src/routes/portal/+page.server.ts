import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const { data: project, error } = await supabase
		.from('project_status')
		.select(
			`
			tenant_slug,
			authorized_clients!inner (
				client_name,
				email
			)
		`
		)
		.eq('authorized_clients.email', session.user.email)
		.single();

	if (project && !error) {
		return {
			user: {
				name: session.user.email,
				company: project.authorized_clients.client_name
			},
			routing: {
				target: `/portal/${project.tenant_slug}`
			}
		};
	}

	return {
		user: { name: session.user.email, company: 'Unauthorized' },
		routing: { target: '/portal/onboarding' }
	};
};
