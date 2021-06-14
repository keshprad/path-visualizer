<script>
  import { getContext } from 'svelte';
  import { dijkstra } from '../../algorithms/dijkstra';
  import { aStar } from '../../algorithms/aStar';
  import { createGrid } from './grid.js';
  import _ from 'lodash';

  // Components
  import { Button } from 'svelte-materialify';
  import GridNode from './GridNode.svelte';
  import Snackbar from '../Snackbar.svelte';

  export let rows, cols;
  let { grid, nodes, source, target } = createGrid(rows, cols);
  let pathFound;

  // Get gridType context from App.svelte
  let gridType = getContext('gridTypeStore');
  let drawnGridType = $gridType;
  // Handle create new grid on gridType change
  function createNewGrid(gridType) {
    if (gridType != '' && gridType != null && gridType != drawnGridType) {
      drawnGridType = gridType;
      ({ grid, nodes, source, target } = createGrid(rows, cols, gridType));
    }
  }
  $: createNewGrid($gridType);

  // Get algorithm context from App.svelte
  let algorithm = getContext('runAlgorithmStore');
  // Handle algorithm execute
  function runAlgorithm(algorithm) {
    if (algorithm != null && algorithm != '') {
      let targetPath, visitedInOrder;
      if (algorithm == 'dijkstra') {
        ({ targetPath, visitedInOrder } = dijkstra(
          _.cloneDeep(nodes),
          source,
          target
        ));
      } else if (algorithm == 'a-star') {
        ({ targetPath, visitedInOrder } = aStar(
          _.cloneDeep(nodes),
          source,
          target
        ));
      }
      animateNodes(targetPath, visitedInOrder);
    }
  }
  $: runAlgorithm($algorithm);

  function animateNodes(targetPath, visitedInOrder) {
    visitedInOrder.every((n) => {
      setTimeout(() => {
        grid[n[1]][n[0]]['isVisited'] = true;
      }, 50);

      // Decide whether to break loop
      return n[0] != target[0] || n[1] != target[1];
    });

    if (targetPath.length == 0) {
      setTimeout(() => {
        pathFound = false;
      }, 50);
    } else {
      targetPath.forEach((n) => {
        setTimeout(() => {
          grid[n[1]][n[0]]['isPath'] = true;
        }, 50);
      });
      setTimeout(() => {
        pathFound = true;
      }, 50);
    }
  }

  // Creating a new grid
  function handleNewGrid() {
    ({ grid, nodes, source, target } = createGrid(rows, cols, $gridType));
    console.log($gridType);
    $algorithm = '';
    pathFound = null;
  }
  // Resetting grid
  function handleResetGrid() {
    // Reset grid to original
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x].isVisited = false;
        grid[y][x].isPath = false;
      }
    }
    // Reset algorithm store and bool pathFound to original
    $algorithm = '';
    pathFound = null;
  }
</script>

<div class="grid-container">
  <div class="grid d-flex flex-column justify-center align-center">
    {#each grid as row, i}
      <div class="row d-flex">
        {#each row as { isSource, isTarget, isWall, isVisited, isPath, weight, neighbors, x, y }, j}
          <GridNode
            bind:isSource
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

<!-- Snackbars -->
<Snackbar active={pathFound == false}>
  <!-- Snackbar shouldn't be active on null -->
  <span slot="context">No path was found!</span>
  <div slot="actions">
    <Button text on:click={handleNewGrid}>New Grid</Button>
  </div>
</Snackbar>

<Snackbar active={pathFound == true}>
  <!-- Snackbar shouldn't be active on null -->
  <span slot="context">Path found!</span>
  <div slot="actions">
    <Button text on:click={handleResetGrid}>Reset Grid</Button>
    <Button text on:click={handleNewGrid}>New Grid</Button>
  </div>
</Snackbar>

<style>
  div.grid-container {
    height: 100%;
    width: 100%;
  }
  div.grid {
    height: 100%;
  }
</style>
