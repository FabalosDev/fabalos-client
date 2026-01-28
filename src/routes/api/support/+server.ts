import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase } }) => {
	try {
		const formData = await request.formData();

		// Mapping fields for Automation Routing
		const payload = {
			project_id: formData.get('project_id'),
			tenant_slug: formData.get('tenant_slug'),
			category: formData.get('category'), // New Routing Tag
			severity: formData.get('priority'),
			subject: formData.get('subject'),
			description: formData.get('message'),
			context_url: formData.get('context_url'), // Auto-Location Tag
			status: 'OPEN',
			created_at: new Date().toISOString()
		};

		if (!payload.project_id || !payload.tenant_slug) {
			return json({ success: false, error: 'MISSING_IDENTITY_PACKET' }, { status: 400 });
		}

		// Insert to Supabase
		const { error } = await supabase.from('support_tickets').insert(payload);

		if (error) throw error;
		return json({ success: true });
	} catch (err: any) {
		console.error('Ticket Error:', err);
		return json({ success: false, error: err.message || 'Server Fault' }, { status: 500 });
	}
};