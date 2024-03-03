<script lang="ts">
  import { getMatterContext, onMatterEvent } from "$lib/services/matter-fns";
  import { getPixiContext } from "$lib/services/pixi-fns";

  const { app } = getPixiContext();
  const { engine } = getMatterContext();

  app.ticker.stop();

  onMatterEvent(engine, "afterUpdate", (e) => {
    app.ticker.update(e.timestamp);
  });

  function inject(el: HTMLElement) {
    el.appendChild(app.view as HTMLCanvasElement);
  }
</script>

<pixi-view use:inject />
