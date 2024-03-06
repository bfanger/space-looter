<script lang="ts">
  import { Assets } from "pixi.js";
  import SpaceShip from "$lib/components/SpaceShip.svelte";
  import Player from "$lib/components/Player.svelte";
  import Scrap from "$lib/components/Scrap.svelte";

  const assets = Assets.load([
    "/img/scrap-1.png",
    "/img/scrap-2.png",
    "/img/player.png",
  ]);
</script>

{#await assets}
  Loading...
{:then _}
  <Player />
  <SpaceShip />
  <Scrap />
{/await}
