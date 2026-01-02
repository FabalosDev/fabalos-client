// src/routes/portal/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase } }) => {
	// 1. AUTH GUARD (Keep this global)
	const { session, user } = await safeGetSession();
	if (!session) throw redirect(303, '/login');

	// 2. FETCH ADMIN STATUS (New Global Data)
	// We grab this here so EVERY page knows if you are the Boss.
	const { data: profile } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single();

	const isSuperAdmin = profile?.role === 'super_admin';

	// 3. FETCH CLIENT DATA (Passive)
	// We just fetch it. We DO NOT redirect if it's missing.
	const { data: client } = await supabase
		.from('authorized_clients')
		.select('*, projects(*)')
		.eq('auth_id', user.id)
		.single();

	// Return everything to the pages. Let them decide what to do.
	return {
		session,
		user,
		client,
		isSuperAdmin,
		projects: client?.projects || []
	};
};
