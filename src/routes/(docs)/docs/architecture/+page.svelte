<svelte:head>
  <title>Architecture & Stack · Docs</title>
</svelte:head>

<article class="space-y-6">
  <h1 class="text-3xl font-bold text-white">Architecture & Stack</h1>

  <p>
    Fabalos Automation systems are designed using a serverless-first, low-maintenance
    architecture with clear ownership boundaries and deterministic deployments.
  </p>

  <h2 class="text-xl font-semibold text-white">Frontend</h2>
  <ul class="list-disc pl-6">
    <li>SvelteKit</li>
    <li>TypeScript</li>
    <li>TailwindCSS</li>
    <li>Static-first rendering</li>
  </ul>

  <h2 class="text-xl font-semibold text-white">Backend & Authentication</h2>
  <ul class="list-disc pl-6">
    <li>Supabase (PostgreSQL + Auth)</li>
    <li>Row Level Security (RLS)</li>
    <li>Environment-isolated credentials</li>
  </ul>

  <h2 class="text-xl font-semibold text-white">Automation & Orchestration</h2>
  <ul class="list-disc pl-6">
    <li>n8n (self-hosted or cloud)</li>
    <li>Event-driven workflows</li>
    <li>Python for heavy processing tasks</li>
  </ul>

  <h2 class="text-xl font-semibold text-white">Infrastructure</h2>
  <ul class="list-disc pl-6">
    <li>Cloudflare (DNS, Pages, R2)</li>
    <li>GitHub (version control, CI)</li>
    <li>Environment-based configuration</li>
  </ul>
</article>
