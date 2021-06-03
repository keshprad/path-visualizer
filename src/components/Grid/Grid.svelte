<script>
  import { getContext } from 'svelte';
  import { dijkstra } from '../../algorithms/dijkstra';
  import { createGrid } from './grid.js';
  import _ from 'lodash';

  // Components
  import GridNode from './GridNode.svelte';
  import TextSnackbar from '../TextSnackbar.svelte';

  export let rows, cols;
  let { grid, nodes, source, target } = createGrid(rows, cols);
  let pathNotFound;

  // Get context from App.svelte
  let algorithm = getContext('runAlgorithm');
  // handle algorithm execute
  function runAlgorithm(algorithm) {
    if (algorithm != null && algorithm != '') {
      let targetPath, visitedInOrder;
      if (algorithm == 'dijkstra') {
        let result = dijkstra(_.cloneDeep(nodes), source, target);
        targetPath = result.targetPath;
        visitedInOrder = result.visitedInOrder;
      }
      animateNodes(targetPath, visitedInOrder);
    }
  }
  $: runAlgorithm($algorithm);

  function animateNodes(targetPath, visitedInOrder) {
    visitedInOrder.every((n) => {
      setTimeout(() => {
        grid[n[1]][n[0]]['isVisited'] = true;
      }, 100);

      // Decide whether to break loop
      return n[0] != target[0] || n[1] != target[1];
    });

    // Show a popup if no path found to targetPath
    if (targetPath.length == 0) {
      pathNotFound = true;
    } else {
      targetPath.forEach((n) => {
        setTimeout(() => {
          grid[n[1]][n[0]]['isPath'] = true;
        }, 500);
      });
    }
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

{#if pathNotFound}
  <TextSnackbar active={pathNotFound} timeout={3000} />
{/if}

<style>
  div.grid-container {
    height: 100%;
    width: 100%;
  }
  div.grid {
    height: 100%;
  }
</style>
