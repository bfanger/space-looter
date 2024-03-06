<script lang="ts">
  import MatterRender from "$lib/components/matter/MatterRender.svelte";
  import MatterProvider from "$lib/components/matter/MatterProvider.svelte";
  import PixiProvider from "$lib/components/pixi/PixiProvider.svelte";
  import "../app.scss";

  let debug = false;
</script>

<MatterProvider>
  <div class="canvasses">
    <PixiProvider>
      <slot />
    </PixiProvider>
    {#if debug}
      <MatterRender followPlayer />
    {/if}
  </div>
  <div class="ui">
    <input type="checkbox" bind:checked={debug} />
  </div>
</MatterProvider>

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
