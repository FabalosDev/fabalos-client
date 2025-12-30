import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { safeGetSession, supabase }, url }) => {
	// 1. SECURITY
	const { session, user } = await safeGetSession();
	if (!session) throw redirect(303, '/login');

	// 2. FETCH CLIENT DATA (Kailangan ito ng Onboarding UI!)
	const { data: client } = await supabase
		.from('authorized_clients')
		.select('*')
		.eq('auth_id', user.id)
		.single();

	// Kung walang client record, logout agad.
	if (!client) throw redirect(303, '/auth/logout');

	// 3. STATUS CHECKS

	// SCENARIO: Nasa Onboarding page ka ba?
	if (url.pathname.startsWith('/portal/onboarding')) {
		// DITO ANG FIX: Hayaan lang silang manatili dito kahit ACTIVE sila.
		// Tinanggal natin yung redirect pabalik sa '/portal' para iwas Loop.
		return { session, user, client };
	}

	// SCENARIO: Bawal ang Pending/Disabled sa loob ng Portal
	if (client.status !== 'ACTIVE') {
		// Kung Pending -> Onboarding
		if (client.status === 'PENDING') {
			throw redirect(303, '/portal/onboarding');
		}
		// Kung Disabled -> Onboarding (para makita ang message) or Logout
		if (['COMPLETED', 'ARCHIVED', 'DISABLED'].includes(client.status)) {
			throw redirect(303, '/portal/onboarding');
		}

		// Default fallback
		throw redirect(303, '/portal/onboarding');
	}

	// 4. ACTIVE & AUTHORIZED
	return {
		session,
		user,
		client
	};
};
