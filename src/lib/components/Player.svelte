<script lang="ts">
  import { Bodies, Body } from "matter-js";
  import { onEngineBeforeUpdate, worldAdd } from "$lib/services/matter-fns";
  import joystick from "$lib/services/joystick";

  const maxSpeed = 4;
  const force = 0.05;

  export const body = Bodies.rectangle(400, 200, 80, 80, {
    label: "player",
    frictionAir: 0.05,
    mass: 50,
    render: {
      opacity: 1,
      strokeStyle: "white",
      fillStyle: "#00ff00",
      lineWidth: 3,
    },
  });

  worldAdd(body);

  onEngineBeforeUpdate(() => {
    if ($joystick.up) {
      body.force.y = -force;
    }
    if ($joystick.down) {
      body.force.y = force;
    }
    if ($joystick.left) {
      body.force.x = -force;
    }
    if ($joystick.right) {
      body.force.x = force;
    }
    Body.setAngle(body, 0);
    Body.getSpeed(body);
    if (Body.getSpeed(body) > maxSpeed) {
      Body.setSpeed(body, maxSpeed);
    }
  });
</script>
