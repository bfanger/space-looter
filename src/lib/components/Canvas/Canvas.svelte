<script lang="ts">
  import type { World } from "$lib/services/world-fns";
  import type { Application } from "pixi.js";
  import { getContext, onMount } from "svelte";
  import Cell from "../CellSprite.svelte";

  const app = getContext<Application>("app");
  const world = getContext<World>("world");
  let { grid } = world;
  onMount(() => {
    function listener() {
      grid = world.grid;
    }
    world.addEventListener("tick", listener);
    return () => world.removeEventListener("tick", listener);
  });

  function appendCanvas(el: HTMLDivElement) {
    el.appendChild(app.view as HTMLCanvasElement);
  }
</script>

<div use:appendCanvas />
{#each grid as column, x}
  {#each column as cell, y}
    <Cell {x} {y} type={cell.type} />
  {/each}
{/each}
