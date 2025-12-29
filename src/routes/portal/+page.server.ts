import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, safeGetSession } }) => {
	console.log('--- 🚀 PORTAL LOAD DEBUGGER START 🚀 ---');

	// 1. Check Session
	const { session, user } = await safeGetSession();

	if (!session) {
		console.log('❌ No Session Found. Redirecting to Login.');
		throw redirect(303, '/login');
	}

	console.log(`👤 User Detected: ${user.email} (ID: ${user.id})`);

	// 2. SECURITY FIX: Hanapin ang Client Record na MATCH sa User ID
	const { data: clients, error } = await supabase
		.from('authorized_clients')
		.select('*, projects(*)')
		.eq('auth_id', user.id); // <--- IMPORTANT: User ID Match Only

	if (error) {
		console.log('❌ Database Error:', error.message);
	}

	const foundCount = clients ? clients.length : 0;
	console.log(`🔍 Client Records Found for this User: ${foundCount}`);

	// 3. DECISION LOGIC
	if (!clients || clients.length === 0) {
		console.log('⚠️ Access Denied: No client record found in DB for this user.');
		console.log('👉 Redirecting to: /portal/onboarding');
		throw redirect(303, '/portal/onboarding');
	}

	// 4. Hanapin ang Active Project
	// (Hanapin ang row na may laman ang projects array)
	const activeClient = clients.find((c) => c.projects && c.projects.length > 0);
	const clientToUse = activeClient || clients[0];
	const projects = clientToUse.projects || [];

	console.log(`📂 Projects Linked to this Client: ${projects.length}`);

	if (projects.length > 0) {
		const target = `/portal/${projects[0].tenant_slug}`;
		console.log(`✅ Access Granted! Redirecting to Dashboard: ${target}`);
		throw redirect(303, target);
	} else {
		console.log('⚠️ Client found, but NO projects linked.');
		console.log('👉 Redirecting to: /portal/onboarding');
		throw redirect(303, '/portal/onboarding');
	}
};
