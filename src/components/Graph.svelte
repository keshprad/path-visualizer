<script>
  import GraphNode from './GraphNode.svelte';

  export let rows, cols;

  const createGraph = (rows, cols) =>
    Array(rows)
      .fill()
      .map(() => Array(cols));
  let graph = createGraph(rows, cols);

  let start = [1, 2];
  let target = [5, 10];
</script>

<div class="graph">
  {#each graph as row, i}
    <div class="row">
      {#each row as node, j}
        <GraphNode
          row={i}
          col={j}
          isStart={j == start[0] && i == start[1]}
          isTarget={j == target[0] && i == target[1]}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  div.graph {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div.row {
    display: flex;
  }
</style>
