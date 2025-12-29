import { fail } from '@sveltejs/kit';

export const actions = {
	upload: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const project_id = formData.get('project_id'); // Ipasa natin ito manually

		if (!file || !project_id) return fail(400, { message: 'Incomplete Packet' });

		const filePath = `${project_id}/${Date.now()}_${file.name}`;

		// Upload to Storage
		const { error: storageError } = await supabase.storage
			.from('vault_assets')
			.upload(filePath, file);

		if (storageError) return fail(500, { message: 'Uplink Failed' });

		// DB Insert
		await supabase.from('project_vault').insert({
			project_id,
			file_name: file.name,
			file_path: filePath
		});

		return { success: true };
	}
};
