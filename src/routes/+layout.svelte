<script lang="ts">
  import WorldProvider from "../lib/components/WorldProvider/WorldProvider.svelte";
  import ApplicationProvider from "../lib/components/ApplicationProvider/ApplicationProvider.svelte";
  import "../app.scss";
</script>

<WorldProvider>
  <ApplicationProvider>
    <slot />
  </ApplicationProvider>
</WorldProvider>
