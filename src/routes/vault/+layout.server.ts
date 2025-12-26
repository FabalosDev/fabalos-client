// src/routes/vault/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	// 🔒 GATEKEEPER: This only protects /vault and its children
	if (!session) {
		throw redirect(303, '/login');
	}

	// Fetch tenant details ONLY for authorized users
	const { data: profile } = await supabase
		.from('authorized_clients')
		.select('tenant_slug, display_name')
		.eq('email', session.user.email)
		.single();

	// Add this inside your vault layout load function
	const {
		data: { user },
		error
	} = await supabase.auth.getUser(); // Checks with Supabase Server
	if (error || !user) throw redirect(303, '/login');

	if (!profile) {
		throw redirect(303, '/unauthorized'); // Optional: Handle users without a profile
	}

	return {
		session,
		tenant: profile
	};
};
