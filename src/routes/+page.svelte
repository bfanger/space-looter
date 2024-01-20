<script lang="ts">
  import { getContext, onMount } from "svelte";
  import Canvas from "$lib/components/Canvas/Canvas.svelte";
  import { randomize, tick, type World } from "$lib/services/world-fns";

  const world = getContext<World>("world");
  onMount(() => {
    setInterval(() => {
      tick(world);
    }, 1000);
  });
</script>

<svelte:head>
  <title>Evolve</title>
</svelte:head>

<Canvas />
<button on:click={() => tick(world)}>Tick</button>
<button
  on:click={() => {
    randomize(world);
    tick(world);
  }}>Randomize</button
>
