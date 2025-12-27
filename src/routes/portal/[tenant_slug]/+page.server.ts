import { fail } from '@sveltejs/kit';

export const load = async ({ platform, parent, locals: { supabase } }) => {
	// 1. Inherit Project Data from Layout (No double DB call)
	const { project } = await parent();
	const { tenant_slug, id: project_id } = project;

	// 2. Fetch Milestones (New Feature)
	const { data: milestones } = await supabase
		.from('project_milestones')
		.select('*')
		.eq('project_id', project_id)
		.order('sort_order', { ascending: true });

	// 3. R2 Storage Logic (Dashboard Specific)
	let files: any[] = [];
	if (platform?.env?.CLIENT_ASSETS) {
		try {
			const list = await platform.env.CLIENT_ASSETS.list({
				prefix: `${tenant_slug}/`, // Enforce Folder Isolation
				delimiter: '/',
				limit: 20
			});

			files = list.objects.map((obj: any) => ({
				key: obj.key,
				size: (obj.size / 1024 / 1024).toFixed(2) + ' MB',
				uploaded: obj.uploaded
			}));
		} catch (e) {
			console.error('R2 Link Failed:', e);
		}
	}

	// Return everything needed for the dashboard
	return {
		project,
		files,
		milestones: milestones || []
	};
};

export const actions = {
	createTicket: async ({ request, locals: { supabase }, params }) => {
		const formData = await request.formData();
		const subject = formData.get('subject') as string;
		const message = formData.get('message') as string;
		const priority = formData.get('priority') as string;

		// 1. Validate
		if (!subject || !message) {
			return fail(400, { error: 'Subject and message are required' });
		}

		// 2. Get Project ID (to link the ticket)
		const { data: project } = await supabase
			.from('project_status')
			.select('id')
			.eq('tenant_slug', params.tenant_slug)
			.single();

		if (!project) return fail(404, { error: 'Project not found' });

		// 3. Insert into DB
		const { error } = await supabase.from('support_tickets').insert({
			project_id: project.id,
			subject,
			message,
			priority
		});

		if (error) {
			console.error('Ticket Error:', error);
			return fail(500, { error: 'Failed to submit ticket' });
		}

		// 4. (Optional) TRIGGER N8N WEBHOOK HERE FOR ALERT
		// await fetch(process.env.N8N_WEBHOOK_URL, { ... })

		return { success: true };
	}
};
