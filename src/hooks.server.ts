import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	// 1. INITIALIZE Supabase
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

	// 2. DEFINE: Secure Session Helper (The Fix)
	// This replaces the old 'getSession' with a server-validated check.
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) {
			return { session: null, user: null };
		}

		// 🛡️ SECURITY CHECK: Validate token with Supabase Auth Server
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();

		if (error) {
			// Token is fake or expired -> wipe it
			return { session: null, user: null };
		}

		return { session, user };
	};

	// 3. PROTECTED ROUTES
	const { session, user } = await event.locals.safeGetSession();
	const path = event.url.pathname;

	// Redirect authenticated users away from login
	if (session && path === '/login') {
		throw redirect(303, '/portal/test');
	}

	// 🛑 ADMIN SHIELD
	if (path.startsWith('/dashboard')) {
		// Strict check: Must have session AND specific email
		if (!session || user?.email !== 'frank.2.abalos@gmail.com') {
			return new Response('Not Found', { status: 404 });
		}
	}

	return resolve(event);
};
