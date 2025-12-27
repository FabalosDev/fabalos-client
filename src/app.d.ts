/// <reference types="@sveltejs/kit" />

import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			// 🛡️ The core Supabase client for DB operations
			supabase: SupabaseClient;

			// 🛡️ The helper function we defined in hooks.server.ts
			// It returns a Promise because getSession() is asynchronous
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
		}

			// 🛡️ Standard session and user objects for quick access
			session: Session | null;
			user: User | null;
		}

		// This allows $page.data to have types in your Svelte components
		interface PageData {
			supabase: SupabaseClient; // 👈 ADD THIS LINE
			session: Session | null;
			user: User | null;
			tenant?: {
				tenant_slug: string;
				display_name: string;
			};
		}
	}
}

export {};
