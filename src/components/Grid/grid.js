function createGrid(rows, cols) {
  const baseNode = {
    weight: 1,
    isSource: false,
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
      row.push({ ...baseNode, x, y });
    }
    grid.push(row);
  }

  // Put random walls
  let numWalls = rows * cols * (Math.random() * (0.4 - 0.25) + 0.25);
  for (let i = 0; i < numWalls; i++) {
    let wall = [randInt(0, cols), randInt(0, rows)];
    if (!grid[wall[1]][wall[0]]['isWall']) {
      grid[wall[1]][wall[0]]['isWall'] = true;
    }
  }

  // Find neighbors for all nodes
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbors = [
        [[x, y - 1], 1],
        [[x, y + 1], 1],
        [[x - 1, y], 1],
        [[x + 1, y], 1],
      ].filter((n) => validNode(grid, n[0][0], n[0][1], rows, cols));

      grid[y][x]['neighbors'] = neighbors;
      nodes[[x, y]] = {
        neighbors,
        pos: [x, y],
        minDistance: Infinity,
        path: [],
      };
    }
  }

  // Create source and target nodes
  let source = [randInt(0, cols), randInt(0, rows)];
  while (!validNode(grid, source[0], source[1], rows, cols)) {
    source = [randInt(0, cols), randInt(0, rows)];
  }
  let target = [randInt(0, cols), randInt(0, rows)];
  while (
    !validNode(grid, target[0], target[1], rows, cols) ||
    (source[0] == target[0] && source[1] == target[1])
  ) {
    target = [randInt(0, cols), randInt(0, rows)];
  }
  grid[source[1]][source[0]]['isSource'] = true;
  grid[target[1]][target[0]]['isTarget'] = true;

  return { grid, nodes, source, target };
}

// Check whether a node is a valid (non-wall) node.
function validNode(grid, x, y, rows, cols) {
  return 0 <= y && y < rows && 0 <= x && x < cols && !grid[y][x]['isWall'];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { createGrid, validNode };
