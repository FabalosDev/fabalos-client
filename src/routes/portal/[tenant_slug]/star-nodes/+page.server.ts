import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
    // 1. Kunin ang Project Details base sa tenant_slug
    const { data: project, error: pError } = await supabase
        .from('projects')
        .select('*')
        .eq('tenant_slug', params.tenant_slug)
        .single();

    if (pError || !project) throw error(404, 'Project not found');

    // 2. Kunin ang Milestones (Star Nodes)
    const { data: milestones } = await supabase
        .from('milestones')
        .select('*')
        .eq('project_id', project.id)
        .order('target_date', { ascending: true });

    // 3. Kunin ang Files (Transmissions)
    const { data: files } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: false });

    // ITO ANG IMPORTANTE: Ang mga keys dito (project, milestones, files)
    // dapat match sa dini-destructure mo sa frontend script.
    return {
        project,
        milestones: milestones || [],
        files: files || []
    };
};