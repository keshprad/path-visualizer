<script>
  import { getContext } from 'svelte';
  import { dijkstra } from '../../algorithms/dijkstra';
  import { createGrid } from './grid.js';
  import _ from 'lodash';

  // Components
  import { Button } from 'svelte-materialify';
  import GridNode from './GridNode.svelte';
  import Snackbar from '../Snackbar.svelte';

  export let rows, cols;
  let { grid, nodes, source, target } = createGrid(rows, cols);
  let pathFound;

  // Get algorithm context from App.svelte
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

    if (targetPath.length == 0) {
      setTimeout(() => {
        pathFound = false;
      }, 100);
    } else {
      targetPath.forEach((n) => {
        setTimeout(() => {
          grid[n[1]][n[0]]['isPath'] = true;
        }, 100);
      });
      setTimeout(() => {
        pathFound = true;
      }, 100);
    }
  }

  // Resetting grid
  function handleNewGrid() {
    ({ grid, nodes, source, target } = createGrid(rows, cols));
    $algorithm = '';
    pathFound = null;
  }
  function handleResetGrid() {
    // Reset nodes to original
    Object.keys(nodes).forEach((key) => {
      nodes[key].minDistance = Infinity;
      nodes[key].path = [];
    });
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
