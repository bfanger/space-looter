<script lang="ts">
  import { Body, Engine, Runner } from "matter-js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { setMatterContext } from "$lib/services/matter-fns";

  const runner = Runner.create();

  const { engine } = setMatterContext({
    engine: Engine.create({ gravity: { x: 0, y: 0 } }),
    player: writable(Body.create({ label: "placeholder" })),
  });

  onMount(() => {
    Runner.run(runner, engine);
    return () => Runner.stop(runner);
  });
</script>

<slot />
