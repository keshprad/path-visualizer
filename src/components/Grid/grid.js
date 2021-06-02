function createGrid(rows, cols) {
  const baseNode = {
    weight: 1,
    isStart: false,
    isTarget: false,
    isWall: false,
    isVisited: false,
    isPath: false,
  };
  let grid = [];
  let nodes = {};

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
      ].filter((n) => validNode(n[0][0], n[0][1], rows, cols));

      node['neighbors'] = neighbors;
      nodes[[x, y]] = {
        neighbors,
        minDistance: Infinity,
        path: [],
      };
      row.push(node);
    }
    grid.push(row);
  }

  // Create source and target nodes
  let source = [randInt(0, cols), randInt(0, rows)];
  let target = [randInt(0, cols), randInt(0, rows)];
  while (source[0] == target[0] && source[1] == target[1]) {
    target = [randInt(0, cols), randInt(0, rows)];
  }
  grid[source[1]][source[0]]['isStart'] = true;
  grid[target[1]][target[0]]['isTarget'] = true;

  return { grid, nodes, source, target };
}

// Check whether a node is a valid (non-wall) node.
function validNode(x, y, rows, cols) {
  return 0 <= y && y < rows && 0 <= x && x < cols;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { createGrid, validNode };
