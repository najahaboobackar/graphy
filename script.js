const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Edge {
  constructor(s, d) {
    this.src = s;
    this.dst = d;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
    this.adjacencyList = new Map();
  }

  createGraph() {
    const edges = [
      new Edge('payment', 'click option'),
      new Edge('click option', 'cash'),
      new Edge('click option', 'online payment'),
      new Edge('cash', 'click option'),
      new Edge('cash', 'online payment'),
      new Edge('cash', 'payment'),
      new Edge('online payment', 'click option'),
      new Edge('online payment', 'cash')
    ];

    for (const edge of edges) {
      this.addEdge(edge.src, edge.dst);
    }
  }

  addEdge(src, dst) {
    if (!this.adjacencyList.has(src)) {
      this.adjacencyList.set(src, []);
    }

    this.adjacencyList.get(src).push(dst);
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
      const curr = queue.shift();
      if (!visited.has(curr)) {
        
        visited.add(curr);
        const neighbors = this.adjacencyList.get(curr);

        if (neighbors) {
          for (const neighbor of neighbors) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  main() {
    this.createGraph();

    const visited = new Set();

    for (const node of this.adjacencyList.keys()) {
      if (!visited.has(node)) {
        this.bfs(node);
      }
    }

    // Print 2 edges
    const edges = this.adjacencyList.get('payment');
    if (edges) {
      for (const edge of edges) {
        console.log(edge + ' ');
      }
    }
  }
}

const graph = new Graph();
graph.main();
