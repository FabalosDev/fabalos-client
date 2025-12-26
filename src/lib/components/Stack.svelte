<!-- ⚙️ Tech Stack & Automation Possibilities -->
<section id="stack" class="section bg-background text-main">
  <div class="container">
    <h2 class="text-3xl font-heading text-center mb-2 text-primary">What's Possible</h2>
    <p class="text-center text-soft mb-12">Discover workflows that radically save time</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- ✅ Use Case Cards -->
      {#each [
        {
          tag: 'Report',
          title: 'Generate weekly reports',
          description: 'Automate the creation of complex reports.',
          tagColor: 'bg-blue-100 text-blue-700'
        },
        {
          tag: 'Process',
          title: 'Process form submissions',
          description: 'Handle and organize form data efficiently.',
          tagColor: 'bg-green-100 text-green-700'
        },
        {
          tag: 'Notify',
          title: 'Notify your users',
          description: 'Send automated messages to your audience.',
          tagColor: 'bg-yellow-100 text-yellow-700'
        }
      ] as card}
        <div class="rounded-2xl bg-white p-6 text-center shadow-md hover:shadow-lg transition">
          <span class={`inline-block ${card.tagColor} text-sm font-medium px-3 py-1 rounded-full mb-4`}>
            {card.tag}
          </span>
          <h3 class="text-xl font-semibold text-primary mb-2">{card.title}</h3>
          <p class="text-soft text-sm">{card.description}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- 🚀 Tools & Technologies -->
  <div class="container mt-20">
    <h2 class="text-3xl font-heading text-center mb-8 text-primary">Tech & Tools I Use</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
      <!-- Tool Cards -->
      {#each [
        { name: 'Make.com', desc: 'Visual builder with powerful integrations.' },
        { name: 'GPT', desc: 'Context-aware tagging and data generation.' },
        { name: 'n8n', desc: 'Self-hosted flows for secure automation pipelines.' }
      ] as tool}
        <div class="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition">
          <h3 class="text-xl font-semibold text-primary mb-2">{tool.name}</h3>
          <p class="text-soft text-sm mt-2">{tool.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>