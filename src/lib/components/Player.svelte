<script lang="ts">
  import { onMount } from "svelte";
  import { Bodies, Body } from "matter-js";
  import { getPixiContext } from "$lib/services/pixi-fns";
  import {
    onMatterEvent,
    mountMatter,
    getMatterContext,
  } from "$lib/services/matter-fns";
  import joystick from "$lib/services/joystick";
  import Aseprite from "$lib/services/Aseprite";

  const { engine, player } = getMatterContext();
  const { app } = getPixiContext();
  const sprite = new Aseprite("/img/player.json");
  sprite.label = "player";

  sprite.scale.set(4);
  sprite.anchor.set(0.5, 0.5);

  const maxSpeed = 5;
  const force = 0.2;
  const body = Body.create({
    label: "player",
    frictionAir: 0.2,
    mass: 50,

    parts: [Bodies.rectangle(0, 0, 100, 40), Bodies.circle(40, -36, 10)],
  });
  Body.setPosition(body, { x: 580, y: 300 });
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

  onMatterEvent(engine, "afterUpdate", () => {
    sprite.position.set(body.position.x, body.position.y);
    sprite.rotation = body.angle;
    app.stage.x = -body.position.x + 320;
    app.stage.y = -body.position.y + 240;
  });

  onMount(() => {
    app.stage.addChild(sprite);
    return () => app.stage.removeChild(sprite);
  });
</script>
