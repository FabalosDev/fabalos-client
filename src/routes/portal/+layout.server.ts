import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase }, url }) => {
	// 1. AUTH GUARD
	const { session, user } = await safeGetSession();
	if (!session) throw redirect(303, '/login');

	// 2. BYPASS LOGIC (The "Anti-Loop" Valve)
	// Kung papunta na sa onboarding, wag na dumaan sa DB check sa baba.
	if (url.pathname === '/portal/onboarding') {
		return { session, user };
	}

	// 3. FETCH CLIENT DATA
	const { data: client, error } = await supabase
		.from('authorized_clients')
		.select('*, projects(*)')
		.eq('auth_id', user.id)
		.single();

	// 4. DECISION TREE

	// A. No Record Found -> New User
	if (!client || error) {
		console.log('🆕 New User / No Record: Routing to Onboarding');
		throw redirect(303, '/portal/onboarding');
	}

	// B. Not Active -> Guide to Onboarding/Status Page
	if (client.status !== 'ACTIVE') {
		console.log(`⚠️ Status: ${client.status}. Restricted access.`);
		throw redirect(303, '/portal/onboarding');
	}

	// C. Active but No Projects -> Onboarding
	const projects = client.projects || [];
	if (projects.length === 0) {
		console.log('⚠️ Active Client, but 0 projects linked.');
		throw redirect(303, '/portal/onboarding');
	}

	// D. Fully Authorized -> Direct to their specific Tenant/Project
	const target = `/portal/${projects[0].tenant_slug}`;

	// ✅ FIX: Only redirect if they are NOT inside the correct tenant folder yet.
	// This allows "/portal/slug/crm" and "/portal/slug/files" to pass.
	if (!url.pathname.startsWith(target)) {
		console.log(`✅ Redirecting to correct tenant: ${target}`);
		throw redirect(303, target);
	}

	return { session, user, client, projects };
};
