import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	if (!session) throw redirect(303, '/login');

	// 1. Get Project
	const { data: project } = await supabase
		.from('projects')
		.select('id, tenant_slug')
		.eq('tenant_slug', params.tenant_slug)
		.single();

	if (!project) return { status: 'not_found' };

	// 2. Get Approvals
	const { data: approvals } = await supabase
		.from('project_approvals')
		.select('*')
		.eq('project_id', project.id)
		.order('created_at', { ascending: false });

	return {
		project,
		approvals: approvals || [],
		user
	};
};

export const actions = {
	approve: async ({ request, locals: { supabase, safeGetSession } }) => {
		const { user } = await safeGetSession();
		if (!user) return fail(401, { message: 'Unauthorized' });

		const formData = await request.formData();
		const approval_id = formData.get('approval_id');

		// DIGITAL SIGNATURE LOGIC:
		// Update status to 'approved' + timestamp + user ID
		const { error } = await supabase
			.from('project_approvals')
			.update({
				status: 'approved',
				approved_at: new Date().toISOString(),
				approved_by: user.id
			})
			.eq('id', approval_id);

		if (error) return fail(500, { message: error.message });

		return { success: true };
	}
};
