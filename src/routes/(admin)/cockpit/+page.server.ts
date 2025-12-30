import { error, fail, redirect } from '@sveltejs/kit';

// ==========================================
// 1. DATA LOADER (GET DATA)
// ==========================================
export const load = async ({ locals: { supabase }, platform }) => {
	try {
		const [projects, clients, tickets, users, modules, projectModules, milestones] =
			await Promise.all([
				// A. Projects
				supabase
					.from('projects')
					.select(`*, authorized_clients(*), project_milestones(*)`)
					.order('created_at', { ascending: false }),

				// B. Clients
				supabase.from('authorized_clients').select('*').order('display_name', { ascending: true }),

				// C. Tickets
				supabase
					.from('support_tickets')
					.select('*')
					.neq('status', 'RESOLVED')
					.order('created_at', { ascending: false }),

				// D. Users
				supabase.from('admin_user_directory').select('*').order('created_at', { ascending: false }),

				// E. Modules (Definition List)
				supabase.from('modules').select('*').order('name'),

				// F. Project Modules (Active Links)
				supabase.from('project_modules').select('*'),

				// G. Milestones (Idinagdag ko ito para hindi mag-error ang return mo)
				supabase.from('project_milestones').select('*')
			]);

		// Logic: Idikit ang Active Modules sa Projects
		const enrichedProjects = projects.data?.map((p) => {
			const active = projectModules.data
				?.filter((pm) => pm.project_id === p.id)
				.map((pm) => pm.module_id);
			return { ...p, active_module_ids: active || [] };
		});

		return {
			allProjects: enrichedProjects || [],
			allClients: clients.data || [],
			tickets: tickets.data || [],
			systemUsers: users.data || [],
			modules: modules.data || [],
			milestones: milestones.data || [], // Ngayon, defined na ito
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
	// ==========================================
	// GROUP 1: CLIENT MANAGEMENT (ClientManager)
	// ==========================================
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

	// ==========================================
	// GROUP 2: PROJECT OPERATIONS (ProjectGrid)
	// ==========================================
	upsertProject: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const tenant_slug = formData.get('tenant_slug');
		const client_id = formData.get('client_id'); // Fix: Saving Client Link
		const status = formData.get('status');

		const payload = {
			name,
			tenant_slug,
			client_id: client_id ? client_id.toString() : null,
			storage_health: status || 'active'
		};

		if (id) {
			// UPDATE
			const { error } = await supabase.from('projects').update(payload).eq('id', id);
			if (error) return fail(500, { message: error.message });
		} else {
			// INSERT
			const { error } = await supabase.from('projects').insert(payload);
			if (error) return fail(500, { message: error.message });
		}
		throw redirect(303, '/cockpit');
	},

	deleteProject: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const { error } = await supabase.from('projects').delete().eq('id', id);
		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	// Ito ay para sa pag-ON/OFF ng module sa isang SPECIFIC na Project
	// --- MODULE LINKING ACTIONS (Project <-> Module) ---
	toggleModule: async ({ request, locals: { supabase } }) => {
		console.log('[BINDING_DEBUG] Toggle Action Triggered');

		const formData = await request.formData();
		const project_id = formData.get('project_id');
		const module_id = formData.get('module_id');
		const action = formData.get('action'); // 'add' or 'remove'

		console.log(`[BINDING_DEBUG] Action: ${action.toUpperCase()}`);
		console.log(`[BINDING_DEBUG] Project ID: ${project_id}`);
		console.log(`[BINDING_DEBUG] Module ID: ${module_id}`);

		if (action === 'add') {
			// BIND (Connect)
			const { error } = await supabase.from('project_modules').insert({ project_id, module_id });

			if (error) {
				console.error('[BINDING_DEBUG] Bind Error:', error);
				// Check kung duplicate key error (minsan naki-click ng 2 times)
				if (error.code !== '23505') return fail(500, { message: error.message });
			}
			console.log('[BINDING_DEBUG] Successfully Linked!');
		} else {
			// UNBIND (Disconnect)
			const { error } = await supabase
				.from('project_modules')
				.delete()
				.match({ project_id, module_id });

			if (error) {
				console.error('[BINDING_DEBUG] Unbind Error:', error);
				return fail(500, { message: error.message });
			}
			console.log('[BINDING_DEBUG] Successfully Unlinked!');
		}

		throw redirect(303, '/cockpit');
	},

	// ==========================================
	// GROUP 3: MODULE DEFINITIONS (ModuleManager)
	// ==========================================
	// --- MODULE MANAGER ACTIONS ---
	upsertModule: async ({ request, locals: { supabase } }) => {
		console.log('[MODULE_DEBUG] Upsert Action Triggered'); // 1. Check kung tinawag

		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const slug = formData.get('slug');
		const description = formData.get('description');

		const payload = { name, slug, description };

		// 2. I-log kung ano ang data na nareceive galing sa form
		console.log('[MODULE_DEBUG] Payload Received:', { id, ...payload });

		if (id) {
			// UPDATE
			console.log('[MODULE_DEBUG] Operation: UPDATE');
			const { error } = await supabase.from('modules').update(payload).eq('id', id);

			if (error) {
				console.error('[MODULE_DEBUG] Update Error:', error); // 3. Dito lalabas ang RLS/DB Error
				return fail(500, { message: error.message });
			}
		} else {
			// INSERT
			console.log('[MODULE_DEBUG] Operation: INSERT');
			const { error } = await supabase.from('modules').insert(payload);

			if (error) {
				console.error('[MODULE_DEBUG] Insert Error:', error); // 3. Dito lalabas ang RLS/DB Error
				return fail(500, { message: error.message });
			}
		}

		console.log('[MODULE_DEBUG] Success! Redirecting...');
		throw redirect(303, '/cockpit');
	},

	deleteModule: async ({ request, locals: { supabase } }) => {
		console.log('[MODULE_DEBUG] Delete Action Triggered');

		const formData = await request.formData();
		const id = formData.get('id');

		console.log('[MODULE_DEBUG] Target ID to Delete:', id);

		const { error } = await supabase.from('modules').delete().eq('id', id);

		if (error) {
			console.error('[MODULE_DEBUG] Delete Error:', error);
			return fail(500, { message: error.message });
		}

		console.log('[MODULE_DEBUG] Deleted Successfully.');
		throw redirect(303, '/cockpit');
	},

	// ==========================================
	// GROUP 4: MILESTONES (MilestoneControl)
	// ==========================================
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

	toggleMilestone: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const currentStatus = formData.get('current_status');
		const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';

		const { error } = await supabase
			.from('project_milestones')
			.update({ status: newStatus })
			.eq('id', id);

		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	deleteMilestone: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const { error } = await supabase.from('project_milestones').delete().eq('id', id);
		if (error) return fail(500, { message: error.message });
		throw redirect(303, '/cockpit');
	},

	// Sa loob ng iyong actions = { ... }

	updateMilestone: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// Kunin ang bagong values
		const title = formData.get('title');
		const phase_label = formData.get('phase_label');
		const status = formData.get('status');
		const due_date = formData.get('due_date');

		const { error } = await locals.supabase
			.from('project_milestones')
			.update({
				title,
				phase_label,
				status,
				due_date
			})
			.eq('id', id);

		if (error) {
			console.error('Update Error:', error);
			return { success: false };
		}
		return { success: true };
	}
};
