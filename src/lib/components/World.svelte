<script lang="ts">
  import { Engine, Runner } from "matter-js";
  import { onMount } from "svelte";
  import { setMatterContext } from "$lib/services/matter-fns";

  const engine = Engine.create({ gravity: { x: 0, y: 0 } });
  const runner = Runner.create();

  setMatterContext({ engine });

  onMount(() => {
    Runner.run(runner, engine);
    return () => Runner.stop(runner);
  });
</script>

<slot />
