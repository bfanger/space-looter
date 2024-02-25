<script lang="ts">
  import { Render } from "matter-js";
  import { getMatterContext, onMatterEvent } from "$lib/services/matter-fns";

  export let followPlayer = false;

  const { engine, player } = getMatterContext();

  function mount(canvas: HTMLCanvasElement) {
    const render = Render.create({
      canvas,
      engine,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: 640, y: 480 },
      },
      options: {
        width: 640,
        height: 480,
        pixelRatio: window.devicePixelRatio,
        showAxes: true,
        hasBounds: true,
        background: "transparent",
        showCollisions: true,
        showSeparations: true,
        showSleeping: true,
        showVelocity: true,
        wireframeBackground: "transparent",
      },
    });

    onMatterEvent(render, "beforeRender", () => {
      if (followPlayer) {
        render.bounds.min.x = $player.position.x - 320;
        render.bounds.max.x = $player.position.x + 320;
        render.bounds.min.y = $player.position.y - 240;
        render.bounds.max.y = $player.position.y + 240;
      }
    });
    Render.run(render);

    return {
      destroy() {
        Render.stop(render);
        render.canvas.remove();
      },
    };
  }
</script>

<canvas use:mount />
