import { json } from '@sveltejs/kit';

export const POST = async ({ request, params, locals: { supabase } }) => {
	const { tenant_slug } = params;
	const { name, email, status, source } = await request.json();

	// --- GATEKEEPER FUNCTION (Identity Check) ---
	// Bago tayo mag-save, check muna natin kung legitimate client ito.
	const { data: validClient } = await supabase
		.from('project_status')
		.select('id')
		.eq('tenant_slug', tenant_slug)
		.single();

	// Kapag hindi nahanap sa database, BLOCK agad.
	if (!validClient) {
		console.warn(`SECURITY: Unknown signal source for slug: ${tenant_slug}`);
		return json({ error: 'Unauthorized: Client Identity Unknown' }, { status: 401 });
	}
	// --------------------------------------------

	// Validation ng Data
	if (!name || !email) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}

	// Kung kilala ang client, Insert na sa database
	const { error } = await supabase.from('crm_contacts').insert({
		tenant_slug: tenant_slug,
		name,
		email,
		status: status || 'processing',
		role: source || 'AUTOMATION'
	});

	if (error) {
		console.error('Webhook Error:', error);
		return json({ error: 'Database Write Failed' }, { status: 500 });
	}

	return json({ success: true, message: 'Identity Verified & Telemetry Recorded' });
};
