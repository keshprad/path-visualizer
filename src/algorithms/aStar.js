import _ from 'lodash';

function aStar(nodes, source, target) {
  nodes[source]['minDistance'] = 0;
  nodes[source]['distToTarget'] = manhattanDistance(source, target);
  nodes[source]['path'].push(source);
  let unvisited = new Set(Object.keys(nodes));

  let visitedInOrder = [];
  ({ nodes, visitedInOrder } = aStarHelper(
    nodes,
    source,
    target,
    unvisited,
    visitedInOrder
  ));
  return { nodes, visitedInOrder, targetPath: nodes[target]['path'] };
}

function aStarHelper(nodes, vertex, target, unvisited, visitedInOrder) {
  // base case
  if (unvisited.length == 0 || !nodes.hasOwnProperty(vertex)) {
    return;
  }

  nodes[vertex]['neighbors'].forEach((n) => {
    const adjVertex = n[0];
    const edgeWeight = n[1];

    if (unvisited.has(adjVertex.toString())) {
      // Creating the heuristic
      // f(x) = g(x) + h(x)
      const g = nodes[vertex]['minDistance'] + edgeWeight; // g is the minDist from source to adjVertex
      nodes[adjVertex]['distToTarget'] = manhattanDistance(adjVertex, target);
      const h = nodes[adjVertex]['distToTarget']; // h is the approximate dist from adjVertex to target
      const f = g + h;

      // Set minDistance if lower
      // Update path as needed
      if (
        nodes[adjVertex]['minDistance'] + nodes[adjVertex]['distToTarget'] >
        f
      ) {
        nodes[adjVertex]['minDistance'] = Math.min(
          nodes[adjVertex]['minDistance'],
          g
        );
        nodes[adjVertex]['path'] = _.clone(nodes[vertex]['path']).concat([
          adjVertex,
        ]);
      }
    }
  });

  unvisited.delete(vertex.toString());
  visitedInOrder.push(vertex);
  const next = nextVertex(nodes, unvisited); // Choose new vertex
  aStarHelper(nodes, next, target, unvisited, visitedInOrder);
  return { nodes, visitedInOrder };
}

function nextVertex(nodes, unvisited) {
  let next = '',
    minimum = Infinity;
  unvisited.forEach((vertex) => {
    if (
      nodes[vertex]['minDistance'] + nodes[vertex]['distToTarget'] <
      minimum
    ) {
      next = vertex;
      minimum = nodes[vertex]['minDistance'] + nodes[vertex]['distToTarget'];
    }
  });
  next = next.split(',').map((n) => Number(n));
  return next;
}

function euclideanDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function manhattanDistance(p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

export { aStar };
