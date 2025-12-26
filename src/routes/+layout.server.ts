// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	// 1. Passive Check: Just get the session
	const session = await getSession();

	// 2. Pass it down: Don't redirect here! Let hooks or specific pages decide.
	return {
		session
	};
};
