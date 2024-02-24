<script lang="ts">
  import MatterRender from "$lib/components/MatterRender.svelte";
  import Player from "$lib/components/Player.svelte";
  import World from "$lib/components/World.svelte";
  import SpaceShip from "$lib/components/SpaceShip.svelte";
  import Scrap from "$lib/components/Scrap.svelte";
</script>

<World>
  <Player />
  <SpaceShip />
  <Scrap />
  <MatterRender followPlayer />
</World>
