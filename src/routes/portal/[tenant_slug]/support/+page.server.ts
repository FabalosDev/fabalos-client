import { fail } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { tenant_slug } = params;

	// DROPDOWN DATA: Kunin ang modules galing sa project_status
	// (Dahil nasa project_status na rin naman ang module list)
	const { data: project } = await supabase
		.from('project_status')
		.select('module_name') // Assuming nandito ang list ng modules mo
		.eq('tenant_slug', tenant_slug)
		.single();

	return {
		// Safety rail: Kung walang laman, empty array
		nodes: project ? [project.module_name] : []
		// NOTE: Kung array ang module_name sa DB, alisin ang [] sa labas.
		// Kung string lang siya, retain mo ganyan.
	};
};

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const subject = formData.get('subject') as string;
		const severity = formData.get('severity') as string;
		const description = formData.get('description') as string;
		const affected_node = formData.get('affected_node') as string;

		// 1. KUNIN ANG INPUT NA SLUG
		const { tenant_slug } = params;

		// --- LOGIC: HANAPIN ANG PROJECT ID (Relational Check) ---
		// Hahanapin natin ang row sa 'project_status' kung saan match ang slug.
		const { data: projectRecord, error: findError } = await supabase
			.from('project_status')
			.select('id')
			.eq('tenant_slug', tenant_slug)
			.single();

		// SAFETY RAIL: Kapag walang nakitang project ID para sa slug na 'to, STOP.
		if (findError || !projectRecord) {
			console.error('>> CRITICAL: Project Status ID not found for slug:', tenant_slug);
			return fail(404, { error: 'System Error: Cannot link ticket to a valid project ID.' });
		}

		const valid_project_id = projectRecord.id;
		console.log('>> LINKED TO PROJECT ID:', valid_project_id);

		// --- SAVE TICKET ---
		const { error: insertError } = await supabase.from('support_tickets').insert({
			project_id: valid_project_id, // Ito ang foreign key link
			tenant_slug: tenant_slug, // Fallback text reference
			subject: subject,
			severity: severity,
			description: `[Node: ${affected_node}] ${description}`,
			status: 'open'
		});

		if (insertError) {
			console.error('>> DB INSERT ERROR:', insertError);
			return fail(500, { error: 'Ticket creation failed.' });
		}

		return { success: true };
	}
};
