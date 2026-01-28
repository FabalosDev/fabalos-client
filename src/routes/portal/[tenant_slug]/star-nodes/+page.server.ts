import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
    // 1. Get Project
    const { data: project, error: pError } = await supabase
        .from('projects')
        .select('*')
        .eq('tenant_slug', params.tenant_slug)
        .single();

    if (pError || !project) throw error(404, 'Project not found');

    // 2. Get Milestones (Table: project_milestones | Column: due_date)
    const { data: milestones } = await supabase
        .from('project_milestones')
        .select('*')
        .eq('project_id', project.id)
        .order('due_date', { ascending: true });

    // 3. Get Files (Table: project_vault)
    // NOTE: We assign it to 'files' variable so the Frontend doesn't break
    const { data: files } = await supabase
        .from('project_vault')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: false });

    return {
        project,
        milestones: milestones || [],
        files: files || []
    };
};