<script>
  import GridNode from './GridNode.svelte';

  export let rows, cols;

  rows = 5;
  cols = 5;
  let grid = createGrid(rows, cols);

  function validPoint(x, y) {
    return 0 <= x && x < cols && 0 <= y && y < rows;
  }

  function createGrid(rows, cols) {
    let grid = Array(rows)
      .fill()
      .map(() => Array(cols).fill([]));

    grid.forEach((row, y) => {
      row.forEach((node, x) => {
        const neighbors = [
          [[x, y - 1], 1],
          [[x, y + 1], 1],
          [[x - 1, y], 1],
          [[x + 1, y], 1],
        ];
        neighbors.forEach((n) => {
          if (validPoint(n[0][0], n[0][1])) {
            grid[y][x].push(n);
          }
        });
      });
    });
    console.log(JSON.stringify(grid));
    return grid;
  }

  let start = [1, 2];
  let target = [5, 10];
</script>

<div class="grid">
  {#each grid as row, i}
    <div class="row">
      {#each row as node, j}
        <GridNode
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
  div.grid {
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
