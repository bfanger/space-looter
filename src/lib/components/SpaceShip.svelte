<script lang="ts">
  import { Bodies } from "matter-js";
  import { mountMatter } from "$lib/services/matter-fns";

  const box = Bodies.rectangle(450, 350, 120, 120, {
    frictionAir: 0.1,
    mass: 100,
    render: { fillStyle: "brown", strokeStyle: "white", lineWidth: 3 },
  });

  const ground = Bodies.rectangle(315, 480, 640, 10, { isStatic: true });
  const wall = Bodies.rectangle(640, 235, 10, 480, { isStatic: true });

  mountMatter([box, ground, wall]);
</script>
