<script lang="ts">
  import { Events, Render } from "matter-js";
  import { getMatterContext } from "$lib/services/matter-fns";

  export let followPlayer = false;

  const { engine, player } = getMatterContext();

  function mount(canvas: HTMLCanvasElement) {
    const render = Render.create({
      canvas,
      engine,
      options: {
        width: 640,
        height: 480,
        wireframes: false,
      },
    });

    function afterUpdate() {
      if (followPlayer) {
        Render.lookAt(render, $player, {
          x: 640 / 2,
          y: 480 / 2,
        });
      }
    }

    Render.run(render);
    Events.on(engine, "afterUpdate", afterUpdate);

    return {
      destroy() {
        Events.off(engine, "afterUpdate", afterUpdate);
        Render.stop(render);
        render.canvas.remove();
      },
    };
  }
</script>

<canvas use:mount />

<style>
  canvas {
    display: block;
    margin: 0 auto;
    border: 1px solid #000;
  }
</style>
