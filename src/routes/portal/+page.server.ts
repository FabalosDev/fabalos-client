// src/routes/portal/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	// Inherit from Layout
	const { user, client, isSuperAdmin, projects } = await parent();

	// 1. GOD MODE REDIRECT
	if (isSuperAdmin) {
		console.log('⚡ SUPER ADMIN DETECTED. Warping to Mission Control.');
		throw redirect(303, '/portal/fabalos');
	}

	// 2. CLIENT REDIRECT
	if (client && projects.length > 0) {
		throw redirect(303, `/portal/${projects[0].tenant_slug}`);
	}

	// 3. NEW USER REDIRECT
	throw redirect(303, '/portal/onboarding');
};
