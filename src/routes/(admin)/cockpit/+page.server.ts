import { error, fail } from '@sveltejs/kit';

// 1. DATA LOADER (Ito ang nawala kaya naging 0 Users / No Systems)
export const load = async ({ locals: { supabase }, platform }) => {
	try {
		const [projects, clients, tickets, milestones, users] = await Promise.all([
			// Projects
			supabase
				.from('projects')
				.select('*, authorized_clients(*)')
				.order('created_at', { ascending: false }),

			// Clients
			supabase.from('authorized_clients').select('*').order('display_name', { ascending: true }),

			// Tickets (Hide Resolved)
			supabase
				.from('support_tickets')
				.select('*')
				.neq('status', 'RESOLVED')
				.order('created_at', { ascending: false }),

			// Milestones
			supabase
				.from('milestones')
				.select('*, projects(tenant_slug)')
				.order('target_date', { ascending: true }),

			// 🔥 Users Directory (Ito yung para sa Select User tab)
			supabase.from('admin_user_directory').select('*').order('created_at', { ascending: false })
		]);

		return {
			allProjects: projects.data || [],
			allClients: clients.data || [],
			tickets: tickets.data || [],
			milestones: milestones.data || [],
			systemUsers: users.data || [], // Pass users to frontend
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

// 2. FORM ACTIONS (Buttons Logic)
export const actions = {
	// Add Client (Auto-fill fix)
	addClient: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const display_name = formData.get('display_name');
		const auth_id = formData.get('auth_id');
		const email = formData.get('email');

		const { error } = await supabase.from('authorized_clients').insert([
			{
				display_name: display_name,
				client_name: display_name,
				auth_id: auth_id,
				email: email,
				status: 'ACTIVE'
			}
		]);

		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	// Toggle Status (Enable/Disable)
	toggleClientStatus: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const currentStatus = formData.get('current_status');

		const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

		const { error } = await supabase
			.from('authorized_clients')
			.update({ status: newStatus })
			.eq('id', id);

		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	// Add Milestone
	addMilestone: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { project_id, title, target_date } = Object.fromEntries(formData);

		const { error } = await supabase
			.from('milestones')
			.insert([{ project_id, title, target_date, status: 'PENDING' }]);

		if (error) return fail(400, { message: error.message });
		return { success: true };
	},

	// Resolve Ticket
	resolveTicket: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const rawNotes = formData.get('admin_notes');
		const admin_notes = rawNotes ? rawNotes.toString() : 'NO_NOTES_LOGGED';

		const { error } = await supabase
			.from('support_tickets')
			.update({ status: 'RESOLVED', admin_notes, resolved_at: new Date() })
			.eq('id', id);

		if (error) return fail(500, { message: error.message });
		return { success: true };
	}
};
