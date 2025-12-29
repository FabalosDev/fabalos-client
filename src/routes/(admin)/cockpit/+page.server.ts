import { error, fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, platform }) => {
	try {
		// ⚡ FULL INFRASTRUCTURE UPLINK
		const [projects, clients, tickets, milestones, modules, vault_stats] = await Promise.all([
			// PROJECTS & LINKED CLIENTS
			supabase
				.from('projects')
				.select('*, authorized_clients(*)')
				.order('created_at', { ascending: false }),
			// ALL REGISTERED CLIENT ENTITIES
			supabase.from('authorized_clients').select('*').order('display_name', { ascending: true }),
			// SYSTEM ANOMALIES
			supabase.from('support_tickets').select('*').order('created_at', { ascending: false }),
			// PROJECT ROADMAPS
			supabase
				.from('milestones')
				.select('*, projects(tenant_slug)')
				.order('target_date', { ascending: true }),
			// AVAILABLE SYSTEM MODULES (CRM, VAULT, etc.)
			supabase.from('project_modules').select('*'),
			// GLOBAL VAULT OVERVIEW
			supabase.from('project_vault').select('count', { count: 'exact', head: true })
		]);

		if (projects.error) throw new Error(`DB_SYNC_FAIL: ${projects.error.message}`);

		// 🚀 TELEMETRY MAPPING
		const stats = {
			totalProjects: projects.data?.length || 0,
			healthySystems: projects.data?.filter((p) => p.storage_health === 'healthy').length || 0,
			activeModules: [...new Set(projects.data?.flatMap((p) => p.active_modules || []))].length,
			openTickets: tickets.data?.filter((t) => t.status === 'OPEN').length || 0,
			totalClients: clients.data?.length || 0,
			totalVaultFiles: vault_stats.count || 0
		};

		return {
			allProjects: projects.data || [],
			allClients: clients.data || [],
			tickets: tickets.data || [],
			milestones: milestones.data || [],
			availableModules: modules.data || [],
			stats,
			storageStatus: {
				connected: !!platform?.env?.CLIENT_ASSETS,
				bucketName: platform?.env?.CLIENT_ASSETS ? 'fabalos-client-assets' : 'DISCONNECTED'
			}
		};
	} catch (err) {
		console.error('COCKPIT_MASTER_CRASH:', err);
		throw error(500, { message: 'Vault Access Failed: Full Schema Sync Interrupted' });
	}
};

export const actions = {
	addClient: async ({ request, locals: { supabase } }) => {
		// Logic for authorized_clients
	},
	addMilestone: async ({ request, locals: { supabase } }) => {
		// Logic for milestones table
	},
	updateModules: async ({ request, locals: { supabase } }) => {
		// Logic for project_modules
	}
};
