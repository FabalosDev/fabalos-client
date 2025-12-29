// src/routes/api/support/+server.ts
import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase }, params }) => {
	try {
		const formData = await request.formData();

		// Mapping fields base sa image_7b3d64.png schema
		const payload = {
			project_id: formData.get('project_id'),
			tenant_slug: formData.get('tenant_slug'), // Naka-always on dapat ito
			subject: formData.get('subject'),
			description: formData.get('message'),
			severity: formData.get('priority'), // 'priority' sa form -> 'severity' sa DB
			status: 'OPEN'
		};

		if (!payload.project_id || !payload.tenant_slug) {
			return json({ success: false, error: 'MISSING_IDENTITY_PACKET' }, { status: 400 });
		}

		const { error } = await supabase.from('support_tickets').insert(payload);

		if (error) throw error;
		return json({ success: true });
	} catch (err) {
		return json({ success: false, error: err.message }, { status: 500 });
	}
};
