<script lang="ts">
  import { Bodies, Detector, type IBodyRenderOptionsSprite } from "matter-js";
  import {
    getMatterContext,
    mountMatter,
    onMatterEvent,
  } from "$lib/services/matter-fns";

  let active = false;

  const body = Bodies.rectangle(250, 150, 50, 50, {
    label: "scrap",
    isSensor: true,
    render: { sprite: { texture: "/img/scrap-1.png", xScale: 4, yScale: 4 } },
  });
  const sprite = body.render.sprite as IBodyRenderOptionsSprite;

  $: sprite.texture = active ? "/img/scrap-2.png" : "/img/scrap-1.png";

  const { engine, player } = getMatterContext();

  const detector = Detector.create({ bodies: [body, $player] });
  $: detector.bodies = [body, $player];

  mountMatter([body]);
  onMatterEvent(engine, "collisionStart", (e) => {
    if (e.pairs.find((pair) => pair.bodyA === body || pair.bodyB === body)) {
      active = true;
    }
  });
  onMatterEvent(engine, "collisionEnd", (e) => {
    if (e.pairs.find((pair) => pair.bodyA === body || pair.bodyB === body)) {
      active = false;
    }
  });
</script>
