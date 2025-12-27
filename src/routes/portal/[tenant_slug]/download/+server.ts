import { error } from '@sveltejs/kit';

export const GET = async ({ url, params, locals: { safeGetSession }, platform }) => {
	// 1. SECURITY: Authentication Check
	const { session, user } = await safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	// 2. VALIDATION: Ensure parameters exist
	const fileKey = url.searchParams.get('file');
	if (!fileKey) throw error(400, 'File key required');

	// 3. INFRASTRUCTURE: Connect to R2
	const bucket = platform?.env?.CLIENT_ASSETS;
	if (!bucket) throw error(500, 'Storage Uplink Disconnected');

	// Security: Prevent accessing other tenants' files
	if (!fileKey.startsWith(params.tenant_slug)) {
		throw error(403, 'Access Denied: Cross-Tenant Breach Attempt');
	}

	// 4. RETRIEVAL: Get the file stream
	const object = await bucket.get(fileKey);
	if (!object) throw error(404, 'Asset Not Found');

	// 5. LANE 1: THE ACTIVITY LOG (Fire & Forget)
	// We use platform.context.waitUntil to ensure this runs without blocking the response
	if (platform?.context?.waitUntil) {
		const logActivity = async () => {
			try {
				const fileName = fileKey.split('/').pop();
				console.log(`[AUDIT] User ${user?.email} downloaded ${fileName}`);

				// 🔗 WEBHOOK: Send to n8n / Google Tasks Middleware
				if (platform.env.N8N_WEBHOOK_URL) {
					await fetch(platform.env.N8N_WEBHOOK_URL, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							type: 'CLIENT_ACTION',
							event: 'FILE_DOWNLOAD',
							tenant: params.tenant_slug,
							user: user?.email,
							file: fileName,
							timestamp: new Date().toISOString(),
							// This field tells n8n to create a Google Task
							action_required: `Verify invoice status for ${params.tenant_slug}`
						})
					});
				}
			} catch (err) {
				console.error('Failed to log activity:', err);
			}
		};

		platform.context.waitUntil(logActivity());
	}

	// 6. DELIVERY: Stream the file to the browser
	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set('etag', object.httpEtag);
	headers.set('Content-Disposition', `attachment; filename="${fileKey.split('/').pop()}"`);

	return new Response(object.body, { headers });
};
