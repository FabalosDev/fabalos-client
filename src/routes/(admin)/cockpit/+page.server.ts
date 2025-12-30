import { error, fail, redirect } from '@sveltejs/kit'; // Idinagdag ang redirect dito

// 1. DATA LOADER
export const load = async ({ locals: { supabase }, platform }) => {
	try {
		const [projects, clients, tickets, users] = await Promise.all([
			// A. PROJECTS
			supabase
				.from('projects')
				.select(`*, authorized_clients(*), project_milestones(*)`)
				.order('created_at', { ascending: false }),

			// B. CLIENTS
			supabase.from('authorized_clients').select('*').order('display_name', { ascending: true }),

			// C. TICKETS
			supabase
				.from('support_tickets')
				.select('*')
				.neq('status', 'RESOLVED')
				.order('created_at', { ascending: false }),

			// D. USERS DIRECTORY
			supabase.from('admin_user_directory').select('*').order('created_at', { ascending: false })
		]);

		return {
			allProjects: projects.data || [],
			allClients: clients.data || [],
			tickets: tickets.data || [],
			systemUsers: users.data || [],
			storageStatus: {
				connected: !!platform?.env?.CLIENT_ASSETS,
				bucketName: platform?.env?.CLIENT_ASSETS ? 'fabalos-client-assets' : 'DISCONNECTED'
			}
		};
	} catch (err) {
		console.error('COCKPIT_LOAD_ERROR:', err);
		throw error(500, 'COCKPIT_OFFLINE');
	}
};

// 2. FORM ACTIONS
export const actions = {
	// --- CLIENT ACTIONS ---
	addClient: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { email, auth_id, display_name, client_name } = Object.fromEntries(formData);

		if (!email || !auth_id) return fail(400, { message: 'User selection required' });

		const { error } = await supabase
			.from('authorized_clients')
			.insert([{ email, auth_id, display_name, client_name, status: 'ACTIVE' }]);

		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	updateClient: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { id, display_name, client_name } = Object.fromEntries(formData);

		const { error } = await supabase
			.from('authorized_clients')
			.update({ display_name, client_name })
			.eq('id', id);

		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	toggleClientStatus: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const currentStatus = formData.get('current_status');
		const newStatus = currentStatus === 'ACTIVE' ? 'COMPLETED' : 'ACTIVE';

		const { error } = await supabase
			.from('authorized_clients')
			.update({ status: newStatus })
			.eq('id', id);

		if (error) return fail(400, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	// --- MILESTONE ACTIONS ---
	addMilestone: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { project_id, title, due_date, phase_label } = Object.fromEntries(formData);

		if (!project_id || !title || !due_date) return fail(400, { message: 'Missing fields' });

		const { error } = await supabase.from('project_milestones').insert([
			{
				project_id,
				title,
				due_date,
				status: 'PENDING',
				phase_label: phase_label || 'Phase I: Ignition'
			}
		]);

		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	// Hanapin ito sa iyong +page.server.ts at i-rename
	toggleMilestone: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const currentStatus = formData.get('current_status');

		// Toggle logic: PENDING <-> COMPLETED
		const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';

		const { error } = await supabase
			.from('project_milestones')
			.update({ status: newStatus })
			.eq('id', id);

		if (error) return fail(500, { message: error.message });

		// Crucial: Kailangan ang redirect para mag-trigger ang load function
		// at mag-sync ang reactive declaration ($:) sa UI mo.
		throw redirect(303, '/cockpit');
	},

	deleteMilestone: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const { error } = await supabase.from('project_milestones').delete().eq('id', id);
		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	}
};
