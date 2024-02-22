<script lang="ts">
  import { Bodies, Body, Detector } from "matter-js";
  import { onEngineAfterUpdate, worldAdd } from "$lib/services/matter-fns";

  export let player: Body | undefined;

  const body = Bodies.rectangle(250, 150, 50, 50, {
    label: "scrap",
    mass: 10,
    isSensor: true,
    render: { fillStyle: "gold", strokeStyle: "white", lineWidth: 3 },
  });

  const detector = Detector.create({ bodies: [body] });

  $: if (player) {
    detector.bodies = [player, body];
  }
  onEngineAfterUpdate(() => {
    if (detector.bodies.length > 0) {
      Detector.clear(detector);
      const collisions = Detector.collisions(detector);
      body.render.fillStyle = collisions.length > 0 ? "blue" : "gold";
    }
  });
  worldAdd(body);
</script>
