import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	console.log('--- 🛠️ DEBUG: Project Dispatcher Load ---');
	console.log('Target ID:', params.id);

	try {
		// 1. SIMPLE FETCH MUNA (Walang Join para hindi sumabog kung walang FK)
		const { data: project, error: projectError } = await supabase
			.from('projects')
			.select('*')
			.eq('id', params.id)
			.single();

		if (projectError) {
			console.error('❌ DB Error (Project):', projectError.message);
			// Kung invalid ID format (e.g. text instead of UUID), redirect na lang
			if (projectError.code === '22P02') throw redirect(303, '/cockpit');
			throw projectError;
		}

		if (!project) {
			console.error('❌ Project Not Found');
			throw redirect(303, '/cockpit');
		}

		console.log('✅ Project Found:', project.name);

		// 2. FETCH CLIENT NAME (Manual Fetch para safe)
		let clientName = 'Unassigned';
		// NOTE: Check mo sa Supabase kung 'authorized_client_id' o 'client_id' ang column mo
		// Kung wala kang column na nagtuturo sa client, skip na muna ito.
		if (project.authorized_client_id) {
			const { data: client } = await supabase
				.from('authorized_clients')
				.select('client_name')
				.eq('id', project.authorized_client_id)
				.single();
			if (client) clientName = client.client_name;
		}

		// 3. FETCH CONTRACTS/APPROVALS
		const { data: approvals, error: approvalsError } = await supabase
			.from('project_approvals')
			.select('*')
			.eq('project_id', params.id)
			.order('created_at', { ascending: false });

		if (approvalsError) {
			// Log lang pero wag icrash ang app. Hayaan mag-load kahit walang contracts.
			console.error('⚠️ Approvals Error:', approvalsError.message);
		}

		// 4. Return Data safely
		return {
			project: {
				...project,
				// I-inject manually ang client name para di masira ang UI
				authorized_clients: { client_name: clientName }
			},
			approvals: approvals || []
		};
	} catch (err) {
		console.error('💥 CRITICAL CRASH:', err);
		// Re-throw para makita mo sa terminal, pero pwede ring mag-redirect
		throw err;
	}
};

// --- ACTIONS (Copy paste mo lang yung dati dito) ---
export const actions = {
	createProposal: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const description = formData.get('description');
		const file_link = formData.get('file_link');

		const { error } = await supabase.from('project_approvals').insert({
			project_id: params.id,
			title,
			description,
			file_link: file_link || null,
			status: 'pending'
		});

		if (error) return fail(500, { message: error.message });
		return { success: true };
	},

	deleteProposal: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const { error } = await supabase.from('project_approvals').delete().eq('id', id);
		if (error) return fail(500, { message: error.message });
		return { success: true };
	}
};
