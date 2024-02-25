<script lang="ts">
  import MatterRender from "$lib/components/matter/MatterRender.svelte";
  import MatterProvider from "$lib/components/matter/MatterProvider.svelte";
  import PixiProvider from "$lib/components/pixi/PixiProvider.svelte";
  import PixiView from "$lib/components/pixi/PixiView.svelte";
  import "../app.scss";

  let debug = true;
</script>

<PixiProvider>
  <MatterProvider>
    <slot />
    <div class="canvasses">
      <PixiView />
      {#if debug}
        <MatterRender followPlayer />
      {/if}
    </div>
    <div class="ui">
      <input type="checkbox" bind:checked={debug} />
    </div>
  </MatterProvider>
</PixiProvider>

<style lang="scss">
  .canvasses {
    display: grid;
    place-items: center center;
    height: 100vh;

    & :global(> *) {
      grid-area: 1 / 1;
    }
  }

  .ui {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
