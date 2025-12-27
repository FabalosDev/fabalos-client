export const load = async ({ params, platform, locals: { supabase } }) => {
	const { tenant_slug } = params;

	// 1. Fetch DB Status with Theme & Client Details
	// We use safeGetSession implicitly via the supabase client here
	const { data: project } = await supabase
		.from('project_status')
		.select('*, authorized_clients(*)') // <--- Fetches Client Name + Theme Settings
		.eq('tenant_slug', tenant_slug)
		.single();

	if (!project) return { status: 404 };

	// 2. R2 Integration: List Objects
	let files: any[] = [];

	if (platform?.env?.CLIENT_ASSETS) {
		try {
			const list = await platform.env.CLIENT_ASSETS.list({
				prefix: `${tenant_slug}/`,
				delimiter: '/'
			});

			files = list.objects.map((obj: any) => ({
				key: obj.key,
				size: (obj.size / 1024 / 1024).toFixed(2) + ' MB',
				updated: obj.uploaded
			}));
		} catch (e) {
			console.error('R2 Error:', e);
			// Fail gracefully if R2 is down/misconfigured
		}
	}

	return { project, files };
};
