function createGrid(rows, cols) {
  const baseNode = {
    weight: 1,
    isStart: false,
    isTarget: false,
    isWall: false,
  };
  let grid = [];

  // Create the grid
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      let node = { ...baseNode, x: x, y: y };
      let neighbors = [
        [[x, y - 1], 1],
        [[x, y + 1], 1],
        [[x - 1, y], 1],
        [[x + 1, y], 1],
      ];
      node['neighbors'] = neighbors.filter((n) =>
        validNode(n[0][0], n[0][1], rows, cols)
      );
      row.push(node);
    }
    grid.push(row);
  }

  // Create start and target nodes
  let start = [randInt(0, cols), randInt(0, rows)];
  let target = [randInt(0, cols), randInt(0, rows)];
  while (start[0] == target[0] && start[1] == target[1]) {
    target = [randInt(0, cols), randInt(0, rows)];
  }
  grid[start[1]][start[0]]['isStart'] = true;
  grid[target[1]][target[0]]['isTarget'] = true;

  return grid;
}

// Check whether a node is a valid (non-wall) node.
function validNode(x, y, rows, cols) {
  return 0 <= y && y < rows && 0 <= x && x < cols;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { createGrid, validNode };
