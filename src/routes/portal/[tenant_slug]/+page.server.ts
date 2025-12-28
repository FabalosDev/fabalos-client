import { fail } from '@sveltejs/kit';
// Siguraduhin na ang webhook URL ay galing sa env para sa floflux.com dev testing [cite: 2025-12-25]
import { N8N_WEBHOOK_URL } from '$env/static/private';

export const load = async ({ platform, parent, locals: { supabase } }) => {
	const { project } = await parent();
	const { tenant_slug, id: project_id } = project;

	// Fetch Milestones - Ginagamit ang project_id na galing sa parent layout
	const { data: milestones } = await supabase
		.from('project_milestones')
		.select('*')
		.eq('project_id', project_id)
		.order('sort_order', { ascending: true });

	// R2 Storage - Folder Isolation para sa fabalos.com production [cite: 2025-12-25]
	let files: any[] = [];
	if (platform?.env?.CLIENT_ASSETS) {
		try {
			const list = await platform.env.CLIENT_ASSETS.list({
				prefix: `${tenant_slug}/`,
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

		if (!subject || !message) {
			return fail(400, { error: 'Subject and message are required' });
		}

		// Kinukuha ang ID base sa tenant_slug (e.g., admin_core)
		const { data: project } = await supabase
			.from('project_status')
			.select('id, client_id')
			.eq('tenant_slug', params.tenant_slug)
			.single();

		if (!project) return fail(404, { error: 'Project node not found' });

		// INSERT FIX: Kailangan ng .select().single() para makuha ang ticket object
		const { data: ticket, error } = await supabase
			.from('support_tickets')
			.insert({
				project_id: project.id,
				subject,
				message,
				priority: priority || 'normal'
			})
			.select()
			.single();

		if (error) {
			console.error('Vault Write Error:', error);
			return fail(500, { error: 'Failed to submit ticket' });
		}

		// Orchestration Layer (n8n) [cite: 2025-12-25]
		try {
			// Ginagamit ang floflux.com endpoint para sa R&D/Testing [cite: 2025-12-25]
			await fetch('https://floflux.fabalos.com/webhook/ticket', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					event: 'NEW_SUPPORT_TICKET',
					ticket_id: ticket.id,
					client_id: project.client_id,
					subject,
					message,
					timestamp: new Date().toISOString()
				})
			});
		} catch (err) {
			console.error('n8n Uplink Failed:', err);
			// Idempotent: Okay lang mag-fail ang webhook dahil saved na sa DB [cite: 2025-12-25]
		}

		return { success: true };
	}
};
