import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			// 🛡️ The core Supabase client for DB operations
			supabase: SupabaseClient;

			// 🛡️ The helper function defined in hooks.server.ts
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;

			// 🛡️ Quick access objects for server-side logic
			session: Session | null;
			user: User | null;
		}

		// 🛡️ Data accessible via $page.data in Svelte components
		interface PageData {
			session: Session | null;
			user: User | null;
			tenant?: {
				tenant_slug: string;
				display_name: string;
			};
		}

		// 🛡️ CLOUDFLARE BINDINGS: Essential for R2 access
		interface Platform {
			env: {
				CLIENT_ASSETS: R2Bucket; // 👈 Matches your wrangler.toml binding
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
