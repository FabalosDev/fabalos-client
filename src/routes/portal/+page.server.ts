export const load = async ({ locals: { supabase } }) => {
	// We just ask for "all" projects.
	// RLS automatically filters this to ONLY show the logged-in user's data.
	const { data: projects, error } = await supabase.from('project_status').select('*');

	if (error) {
		console.error('Error loading projects:', error);
		return { projects: [] };
	}

	return { projects };
};
