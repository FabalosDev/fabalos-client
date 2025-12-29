import { createBrowserClient, isBrowser, parse, serialize } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		}
		// No need for manual cookie logic here.
		// The library handles document.cookie automatically in the browser.
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session: session ?? data.session };
};
