<script lang="ts">
  import { enhance } from '$app/forms';
  export let milestones = [];
  export let projects = [];
</script>

<section class="rounded border border-slate-900 bg-slate-950 p-6">
  <h2 class="mb-4 text-xs font-bold text-emerald-400 uppercase tracking-widest">>> Project_Roadmap_Uplink</h2>

  <form method="POST" action="?/addMilestone" use:enhance class="mb-6 space-y-3 border-b border-slate-900 pb-6">
    <div class="grid grid-cols-2 gap-2">
      <select name="project_id" class="w-full bg-black border border-slate-800 p-2 text-[10px] text-white uppercase focus:border-emerald-500">
        {#each projects as p}
          <option value={p.id}>{p.tenant_slug}</option>
        {/each}
      </select>
      <input name="target_date" type="date" required class="w-full bg-black border border-slate-800 p-2 text-[10px] text-white uppercase focus:border-emerald-500" />
    </div>
    <input name="title" placeholder="MILESTONE_OBJECTIVE" required class="w-full bg-black border border-slate-800 p-2 text-[10px] text-white uppercase focus:border-emerald-500" />
    <button class="w-full bg-emerald-900/50 border border-emerald-900 py-2 text-[10px] font-bold text-emerald-500 uppercase hover:bg-emerald-600 hover:text-white transition-all">
      Inject_Milestone_Data
    </button>
  </form>

  <div class="max-h-[250px] overflow-y-auto pr-2">
    <table class="w-full text-[10px]">
      {#each milestones as m}
        <tr class="border-b border-slate-900/50 last:border-0">
          <td class="py-2 text-white font-bold">{m.projects?.tenant_slug}</td>
          <td class="py-2 text-slate-400">{m.title}</td>
          <td class="py-2 text-right text-emerald-500 font-mono">{new Date(m.target_date).toLocaleDateString()}</td>
        </tr>
      {/each}
    </table>
  </div>
</section>