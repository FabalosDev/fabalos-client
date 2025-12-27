export const load = async ({ params, platform, locals: { supabase } }) => {
	const { tenant_slug } = params;

	// 1. Fetch DB Status (The logic we built earlier)
	const { data: project } = await supabase
		.from('project_status')
		.select('*')
		.eq('tenant_slug', tenant_slug)
		.single();

	if (!project) return { status: 404 };

	// 2. R2 Integration: List Objects
	// We use the tenant_slug as a folder prefix (e.g., "admin_core/")
	let files: any[] = [];

	if (platform?.env?.CLIENT_ASSETS) {
		const list = await platform.env.CLIENT_ASSETS.list({
			prefix: `${tenant_slug}/`,
			delimiter: '/'
		});

		files = list.objects.map((obj) => ({
			key: obj.key,
			size: (obj.size / 1024 / 1024).toFixed(2) + ' MB',
			updated: obj.uploaded
		}));
	}

	return { project, files };
};
