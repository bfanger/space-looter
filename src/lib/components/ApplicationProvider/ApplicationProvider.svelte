<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { Application } from "pixi.js";
  import type { World } from "$lib/services/world-fns";

  const world = getContext<World>("world");
  const app = setContext(
    "app",
    new Application({
      width: world.width * 14,
      height: world.height * 14,
      resolution: 2,
      autoDensity: true,
    })
  );
  /* eslint-disable no-underscore-dangle */
  (window as any).__PIXI_APP__ = app;
</script>

<slot />
