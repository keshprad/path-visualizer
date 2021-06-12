import _ from 'lodash';
function createGrid(rows, cols, gridType = 'simple-random') {
  // create the base grid
  let grid = emptyGrid(rows, cols);
  let nodes = {};

  // Put random walls
  if (gridType == 'simple-random') {
    grid = simpleRandomWalls(grid, rows, cols);
  } else if (gridType == 'recursive-division-maze') {
    grid = recursiveDivisionMaze(grid, rows, cols);
  }

  // Find neighbors for all nodes
  ({ grid, nodes } = findNeighbors(grid, rows, cols));

  // Create source and target nodes
  let source, target;
  ({ grid, source, target } = placeSourceAndTarget(grid, rows, cols));

  return { grid, nodes, source, target };
}

// Creates an grid of baseNodes
function emptyGrid(rows, cols) {
  const baseNode = {
    weight: 1,
    isSource: false,
    isTarget: false,
    isWall: false,
    isVisited: false,
    isPath: false,
  };
  let grid = [];

  // Create the grid
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push({ ...baseNode, x, y });
    }
    grid.push(row);
  }
  return grid;
}

// Places walls randomly
function simpleRandomWalls(grid, rows, cols) {
  // Use a random amount of walls between 25% and 40%!
  let numWalls = rows * cols * (Math.random() * (0.4 - 0.25) + 0.25);
  for (let i = 0; i < numWalls; i++) {
    let wall = [randInt(0, cols), randInt(0, rows)];
    if (!grid[wall[1]][wall[0]]['isWall']) {
      grid[wall[1]][wall[0]]['isWall'] = true;
    }
  }
  return grid;
}

function recursiveDivisionMaze(grid, rows, cols, offset = [0, 0]) {
  if (rows <= 2 || cols <= 2) {
    return grid;
  }

  let rowNum = randInt(offset[1] + 1, offset[1] + rows - 1);
  let colNum = randInt(offset[0] + 1, offset[0] + cols - 1);
  // build walls
  for (let i = offset[0]; i < offset[0] + cols; i++) {
    grid[rowNum][i]['isWall'] = true;
    // If the ends of wall at blocking, set isWall to false
    if (
      (i == offset[0] &&
        validNonWallNode(grid, i - 1, rowNum, grid.length, grid[0].length)) ||
      (i == offset[0] + cols - 1 &&
        validNonWallNode(grid, i + 1, rowNum, grid.length, grid[0].length))
    ) {
      grid[rowNum][i]['isWall'] = false;
    }
  }
  for (let i = offset[1]; i < offset[1] + rows; i++) {
    grid[i][colNum]['isWall'] = true;
    // If the ends of wall at blocking, set isWall to false
    if (
      (i == offset[1] &&
        validNonWallNode(grid, colNum, i - 1, grid.length, grid[0].length)) ||
      (i == offset[1] + rows - 1 &&
        validNonWallNode(grid, colNum, i + 1, grid.length, grid[0].length))
    ) {
      grid[i][colNum]['isWall'] = false;
    }
  }

  let paths = [
    [randInt(colNum + 1, offset[0] + cols), rowNum],
    [randInt(offset[0], colNum), rowNum],
    [colNum, randInt(0, rowNum)],
  ];
  paths.forEach((path) => {
    grid[path[1]][path[0]]['isWall'] = false;
  });

  // recurse top-left
  grid = recursiveDivisionMaze(
    grid,
    rowNum - offset[1],
    colNum - offset[0],
    offset
  );
  // recurse top-right
  grid = recursiveDivisionMaze(
    grid,
    rowNum - offset[1],
    cols - (colNum - offset[0]) - 1,
    [colNum + 1, offset[1]]
  );
  // recurse bottom-left
  grid = recursiveDivisionMaze(
    grid,
    rows - (rowNum - offset[1]) - 1,
    colNum - offset[0],
    [offset[0], rowNum + 1]
  );
  // recurse bottom-right
  grid = recursiveDivisionMaze(
    grid,
    rows - (rowNum - offset[1]) - 1,
    cols - (colNum - offset[0]) - 1,
    [colNum + 1, rowNum + 1]
  );
  return grid;
}

function findNeighbors(grid, rows, cols) {
  let nodes = {};

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbors = [
        [[x, y - 1], 1],
        [[x, y + 1], 1],
        [[x - 1, y], 1],
        [[x + 1, y], 1],
      ].filter((n) => validNonWallNode(grid, n[0][0], n[0][1], rows, cols));

      grid[y][x]['neighbors'] = neighbors;
      nodes[[x, y]] = {
        neighbors,
        pos: [x, y],
        minDistance: Infinity,
        path: [],
      };
    }
  }

  return { grid, nodes };
}

function placeSourceAndTarget(grid, rows, cols) {
  // Randomly generate valid source node
  let source = [randInt(0, cols), randInt(0, rows)];
  while (!validNonWallNode(grid, source[0], source[1], rows, cols)) {
    source = [randInt(0, cols), randInt(0, rows)];
  }

  // Randomly generate valid target node
  let target = [randInt(0, cols), randInt(0, rows)];
  while (
    !validNonWallNode(grid, target[0], target[1], rows, cols) ||
    (source[0] == target[0] && source[1] == target[1])
  ) {
    target = [randInt(0, cols), randInt(0, rows)];
  }

  // Set nodes to source and target
  grid[source[1]][source[0]]['isSource'] = true;
  grid[target[1]][target[0]]['isTarget'] = true;
  return { grid, source, target };
}

// Check whether a node is a valid (non-wall) node.
function validNonWallNode(grid, x, y, rows, cols) {
  return 0 <= y && y < rows && 0 <= x && x < cols && !grid[y][x]['isWall'];
}

// Check whether a node is in bounds
function isInBounds(grid, x, y, rows, cols) {
  return 0 <= y && y < rows && 0 <= x && x < cols;
}

// the max is NON-INCLUSIVE
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export { createGrid };
