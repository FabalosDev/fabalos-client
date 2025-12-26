// src/routes/+layout.ts
import { createBrowserClient, isBrowser, parse, serialize } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			// 🛡️ FIX: Use 'getAll' instead of 'get'
			getAll() {
				if (!isBrowser()) {
					// On server, return empty (we rely on data.session passed from server load)
					return [];
				}
				const cookie = parse(document.cookie);
				return Object.keys(cookie).map((key) => ({ name: key, value: cookie[key] }));
			},
			// 🛡️ FIX: Add required 'setAll' method
			setAll(cookiesToSet) {
				if (!isBrowser()) return;

				cookiesToSet.forEach(({ name, value, options }) => {
					document.cookie = serialize(name, value, options);
				});
			}
		}
	});

	// 🛡️ Hydration Logic:
	// On the client, this gets the session from the browser cookies.
	// On the server, this might return null, so we fallback to 'data.session'
	// which comes from the secure 'hooks.server.ts' via '+layout.server.ts'.
	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session: session ?? data.session };
};
