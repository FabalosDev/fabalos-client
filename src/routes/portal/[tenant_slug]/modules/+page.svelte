<script lang="ts">
  export let data;
  // data.modules ang galing sa backend na ginawa mo kanina
</script>

<div class="p-6 max-w-4xl mx-auto">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-gray-100">Project Modules</h1>
    <p class="text-gray-400">Enable or disable features for this project.</p>
  </div>

  <div class="grid gap-4">
    {#each data.modules as module (module.id)}
      <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">

        <div>
          <h3 class="font-semibold text-gray-100">{module.name}</h3>
          <p class="text-sm text-gray-400">{module.slug}</p>
        </div>

        <form method="POST" action="?/toggleModule">
          <input type="hidden" name="module_id" value={module.id} />

          <input type="hidden" name="state" value={!module.is_enabled} />

          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium rounded-md transition-colors
            {module.is_enabled
              ? 'bg-green-900 text-green-300 border border-green-700 hover:bg-green-800'
              : 'bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600'}"
          >
            {module.is_enabled ? 'Enabled' : 'Disabled'}
          </button>
        </form>

      </div>
    {/each}
  </div>
</div>