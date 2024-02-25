<script lang="ts">
  import { Bodies, Detector } from "matter-js";
  import { SCALE_MODES, Sprite, Texture } from "pixi.js";
  import {
    getMatterContext,
    mountMatter,
    onMatterEvent,
  } from "$lib/services/matter-fns";
  import { getPixiContext } from "$lib/services/pixi-fns";

  const body = Bodies.rectangle(250, 150, 50, 50, {
    label: "scrap",
    isSensor: true,
  });
  const texture1 = Texture.from("/img/scrap-1.png", {
    scaleMode: SCALE_MODES.NEAREST,
  });
  const texture2 = Texture.from("/img/scrap-2.png", {
    scaleMode: SCALE_MODES.NEAREST,
  });

  const sprite = Sprite.from(texture1);
  sprite.scale.set(4);
  sprite.anchor.set(0.5, 0.55);
  sprite.position.set(body.position.x, body.position.y);
  const { app } = getPixiContext();
  app.stage.addChild(sprite);

  // $: sprite.texture = active ? "/img/scrap-2.png" : "/img/scrap-1.png";

  const { engine, player } = getMatterContext();

  const detector = Detector.create({ bodies: [body, $player] });
  $: detector.bodies = [body, $player];

  mountMatter([body]);
  onMatterEvent(engine, "collisionStart", (e) => {
    if (e.pairs.find((pair) => pair.bodyA === body || pair.bodyB === body)) {
      sprite.texture = texture2;
      // active = true;
    }
  });
  onMatterEvent(engine, "collisionEnd", (e) => {
    if (e.pairs.find((pair) => pair.bodyA === body || pair.bodyB === body)) {
      // active = false;
      sprite.texture = texture1;
    }
  });
</script>
