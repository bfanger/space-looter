<script lang="ts">
  import { Application } from "pixi.js";
  import { setPixiContext } from "$lib/services/pixi-fns";
  import { getMatterContext, onMatterEvent } from "$lib/services/matter-fns";

  const { engine } = getMatterContext();
  const { app } = setPixiContext({ app: new Application() });

  let ready = false;

  function pixi(el: HTMLCanvasElement) {
    (async () => {
      await app.init({
        canvas: el,
        width: 640,
        height: 480,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        autoStart: false,
      });
      ready = true;
    })();
  }

  onMatterEvent(engine, "afterUpdate", (e) => {
    if (ready) {
      app.ticker.update(e.timestamp);
    }
  });

  /* eslint-disable no-underscore-dangle */
  (window as any).__PIXI_APP__ = app;
</script>

<canvas use:pixi />
{#if ready}
  <slot />
{/if}
