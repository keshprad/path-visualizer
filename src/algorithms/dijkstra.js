import _ from 'lodash';

function dijkstra(nodes, source, target) {
  nodes[source]['minDistance'] = 0;
  nodes[source]['path'].push(source);
  let unvisited = new Set(Object.keys(nodes));

  let visitedInOrder = [];
  const result = dijkstraHelper(nodes, source, unvisited, visitedInOrder);
  nodes = result.nodes;
  visitedInOrder = result.visitedInOrder;

  return { targetPath: nodes[target]['path'], visitedInOrder };
}

function dijkstraHelper(nodes, vertex, unvisited, visitedInOrder) {
  // base case
  if (unvisited.length == 0 || !nodes.hasOwnProperty(vertex)) {
    return;
  }

  nodes[vertex]['neighbors'].forEach((n) => {
    const adj_vertex = n[0];
    const edge_weight = n[1];

    if (unvisited.has(adj_vertex.toString())) {
      const dist = nodes[vertex]['minDistance'] + edge_weight;

      if (nodes[adj_vertex]['minDistance'] > dist) {
        nodes[adj_vertex]['minDistance'] = dist;
        nodes[adj_vertex]['path'] = _.clone(nodes[vertex]['path']).concat([
          adj_vertex,
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
  return next.split(',').map((n) => Number(n));
}

export { dijkstra };
