<script lang="ts">
  import { getMatterContext, onMatterEvent } from "$lib/services/matter-fns";
  import { getPixiContext } from "$lib/services/pixi-fns";

  const { app } = getPixiContext();
  const { engine } = getMatterContext();

  app.ticker.stop();

  onMatterEvent(engine, "afterUpdate", () => {
    app.ticker.update();
  });

  function inject(el: HTMLElement) {
    el.appendChild(app.view as HTMLCanvasElement);
  }
</script>

<pixi-view use:inject />
