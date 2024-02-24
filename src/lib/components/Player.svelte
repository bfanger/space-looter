<script lang="ts">
  import { Bodies, Body } from "matter-js";
  import {
    onMatterEvent,
    mountMatter,
    getMatterContext,
  } from "$lib/services/matter-fns";
  import joystick from "$lib/services/joystick";

  const { engine, player } = getMatterContext();

  const maxSpeed = 5;
  const force = 0.2;
  const body = Bodies.rectangle(600, 500, 80, 80, {
    label: "player",
    frictionAir: 0.2,
    mass: 50,
    render: {
      sprite: {
        texture: "/img/player-frame.png",
        xScale: 3.5,
        yScale: 3.5,
      },
    },
  });

  player.set(body);

  mountMatter(body);

  onMatterEvent(engine, "beforeUpdate", () => {
    if ($joystick.up && !$joystick.down) {
      body.force.y = -force;
    }
    if ($joystick.down && !$joystick.up) {
      body.force.y = force;
    }
    if ($joystick.left && !$joystick.right) {
      body.force.x = -force;
    }
    if ($joystick.right && !$joystick.left) {
      body.force.x = force;
    }
    Body.setAngle(body, 0);
    Body.getSpeed(body);
    if (Body.getSpeed(body) > maxSpeed) {
      Body.setSpeed(body, maxSpeed);
    }
  });
</script>
