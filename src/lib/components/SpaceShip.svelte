<script lang="ts">
  import { Bodies } from "matter-js";
  import { mountMatter } from "$lib/services/matter-fns";

  const box = Bodies.rectangle(450, 350, 120, 120, {
    frictionAir: 0.1,
    mass: 100,
    render: { fillStyle: "brown", strokeStyle: "white", lineWidth: 3 },
  });

  const ground = Bodies.rectangle(400, 610, 810, 60, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  const wall = Bodies.rectangle(835, 175, 60, 810, {
    isStatic: true,

    render: { fillStyle: "white" },
  });

  mountMatter([box, ground, wall]);
</script>
