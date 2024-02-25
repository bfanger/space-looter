<script lang="ts">
  import { Application } from "pixi.js";
  import { setPixiContext } from "$lib/services/pixi-fns";

  const { app } = setPixiContext({
    app: new Application({
      width: 640,
      height: 480,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      autoStart: false,
    }),
  });

  /* eslint-disable no-underscore-dangle */
  (window as any).__PIXI_APP__ = app;
</script>

<slot />
