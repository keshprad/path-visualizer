<script>
  import GridNode from './GridNode.svelte';
  import { createGrid } from './grid.js';

  export let rows, cols;
  let grid = createGrid(rows, cols);
</script>

<div class="grid-container">
  <div class="grid d-flex flex-column justify-center align-center">
    {#each grid as row, i}
      <div class="row d-flex">
        {#each row as node, j}
          <GridNode {...node} />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  div.grid-container {
    height: 100%;
    width: 100%;
  }
  div.grid {
    height: 100%;
  }
</style>
