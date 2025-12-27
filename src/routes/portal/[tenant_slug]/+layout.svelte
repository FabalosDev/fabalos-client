<script lang="ts">
  export let data;

  // Reactive: Update color if data changes (e.g. during dev HMR)
  $: brandColor = data.brandColor;
</script>

<div
  class="min-h-screen bg-background text-text-main font-body selection:bg-primary/30"
  style="
    --primary: {brandColor};
    --foxther-glow: {brandColor};
    --button-glow: {brandColor};
  "
>
  <slot />
</div>