<script>
  import { getContext } from 'svelte';
  import GridNode from './GridNode.svelte';
  import { createGrid } from './grid.js';
  import { dijkstra } from '../../algorithms/dijkstra';
  import _ from 'lodash';

  export let rows, cols;
  let { grid, nodes, source, target } = createGrid(rows, cols);

  // Get context from App.svelte
  let algorithm = getContext('runAlgorithm');
  // handle algorithm execute
  function runAlgorithm(algorithm) {
    if (algorithm != null && algorithm != '') {
      if (algorithm == 'dijkstra') {
        let { targetPath, visitedInOrder } = dijkstra(
          _.cloneDeep(nodes),
          source,
          target
        );
        animateNodes(targetPath, visitedInOrder);
      }
    }
  }
  $: runAlgorithm($algorithm);

  function animateNodes(targetPath, visitedInOrder) {
    visitedInOrder.forEach((n) => {
      grid[n[1]][n[0]]['isVisited'] = true;
    });
    targetPath.forEach((n) => {
      grid[n[1]][n[0]]['isPath'] = true;
    });
  }
</script>

<div class="grid-container">
  <div class="grid d-flex flex-column justify-center align-center">
    {#each grid as row, i}
      <div class="row d-flex">
        {#each row as { isStart, isTarget, isWall, isVisited, isPath, weight, neighbors, x, y }, j}
          <GridNode
            bind:isStart
            bind:isTarget
            bind:isWall
            bind:isVisited
            bind:isPath
            {weight}
            {neighbors}
            {x}
            {y}
          />
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
