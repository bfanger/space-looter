<script lang="ts">
  import type { Body } from "matter-js";
  import DebugRender from "$lib/components/DebugRender.svelte";
  import Player from "$lib/components/Player.svelte";
  import World from "$lib/components/World.svelte";
  import SpaceShip from "$lib/components/SpaceShip.svelte";
  import Scrap from "$lib/components/Scrap.svelte";

  let player: Body;
</script>

<World>
  <Player bind:body={player} />
  <SpaceShip />
  <DebugRender lookAt={player} />
  <Scrap {player} />
</World>
