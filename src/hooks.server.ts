import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	// 1. INITIALIZE: Create the Supabase client
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	// 2. DEFINE: Helper function
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// 3. EXECUTE: Safety Check
	const session = await event.locals.getSession();
	const path = event.url.pathname;

	// 🛡️ AUTO-PILOT: Auth handling
	if (session && path === '/login') {
		throw redirect(303, '/portal/test'); // Updated to your current vault path
	}

	// 🛑 4. ADMIN SHIELD: Pure Server-Side Protection
	// Only you (frank.2.abalos@gmail.com) can enter the dashboard.
	if (path.startsWith('/dashboard')) {
		if (!session || session.user.email !== 'frank.2.abalos@gmail.com') {
			// We return a 404 instead of a redirect.
			// This hides the existence of the admin route from unauthorized users.
			return new Response('Not Found', { status: 404 });
		}
	}

	return resolve(event);
};
