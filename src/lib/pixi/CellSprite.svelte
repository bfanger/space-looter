<script lang="ts">
  import { Application, SCALE_MODES, Sprite, Texture } from "pixi.js";
  import { getContext, onMount } from "svelte";
  import type { CellType } from "$lib/services/world-fns";

  export let x: number;
  export let y: number;
  export let type: CellType;

  const app = getContext<Application>("app");
  const options = {
    scaleMode: SCALE_MODES.NEAREST,
  };
  const textures: Record<CellType, Texture> = {
    antenna: Texture.from("/img/antenna.png", options),
    blaadje: Texture.from("/img/blaadje.png", options),
    empty: Texture.from("/img/empty.png", options),
    stem: Texture.from("/img/stem.png", options),
    water: Texture.from("/img/water.png", options),
    wortel: Texture.from("/img/wortel.png", options),
    zaad: Texture.from("/img/zaad.png", options),
  };
  const sprite = new Sprite(textures[type]);

  $: sprite.x = x * 14;
  $: sprite.y = y * 14;
  $: sprite.texture = textures[type];

  onMount(() => {
    app.stage.addChild(sprite);
    return () => app.stage.removeChild(sprite);
  });
</script>
