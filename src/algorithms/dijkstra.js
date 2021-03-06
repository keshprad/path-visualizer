import _ from 'lodash';

function dijkstra(nodes, source, target) {
  nodes[source]['minDistance'] = 0;
  nodes[source]['path'].push(source);
  let unvisited = new Set(Object.keys(nodes));

  let visitedInOrder = [];
  ({ nodes, visitedInOrder } = dijkstraHelper(
    nodes,
    source,
    unvisited,
    visitedInOrder
  ));

  return { nodes, visitedInOrder, targetPath: nodes[target]['path'] };
}

function dijkstraHelper(nodes, vertex, unvisited, visitedInOrder) {
  // base case
  if (unvisited.length == 0 || !nodes.hasOwnProperty(vertex)) {
    return;
  }

  nodes[vertex]['neighbors'].forEach((n) => {
    const adjVertex = n[0];
    const edgeWeight = n[1];

    if (unvisited.has(adjVertex.toString())) {
      const dist = nodes[vertex]['minDistance'] + edgeWeight;

      if (nodes[adjVertex]['minDistance'] > dist) {
        nodes[adjVertex]['minDistance'] = dist;
        nodes[adjVertex]['path'] = _.clone(nodes[vertex]['path']).concat([
          adjVertex,
        ]);
      }
    }
  });

  unvisited.delete(vertex.toString());
  visitedInOrder.push(vertex);
  const next = nextVertex(nodes, unvisited);
  dijkstraHelper(nodes, next, unvisited, visitedInOrder);
  return { nodes, visitedInOrder };
}

function nextVertex(nodes, unvisited) {
  let next = '',
    minimum = Infinity;
  unvisited.forEach((vertex) => {
    if (nodes[vertex]['minDistance'] < minimum) {
      next = vertex;
      minimum = nodes[vertex]['minDistance'];
    }
  });
  next = next.split(',').map((n) => Number(n));
  return next;
}

export { dijkstra };
