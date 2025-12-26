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

	// 🛡️ AUTO-PILOT: If user is logged in and tries to visit Login, push to Vault
	// This was disabled during debug, now we re-enable it.
	if (session && path === '/login') {
		throw redirect(303, '/vault');
	}

	// Note: We REMOVED the "Guard" logic here because we moved it
	// to 'src/routes/vault/+layout.server.ts'. This prevents conflicts!

	return resolve(event);
};
