export class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(x, y) {
    const id = "n" + (this.nodes.length + 1);
    this.nodes.push({
      id,
      x,
      y,
      label: id
    });
  }

  addEdge(a, b) {
    const id = "e" + (this.edges.length + 1);
    this.edges.push({
      id,
      from: a,
      to: b
    });
  }

  getNodeAt(x, y) {
    return this.nodes.find(n => {
      const dx = x - n.x;
      const dy = y - n.y;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });
  }
}
