import { Graph } from "./graph.js";
import { draw } from "./canvas.js";

const canvas = document.getElementById("roadCanvas");
const ctx = canvas.getContext("2d");

const graph = new Graph();

let mode = "add";
let dragging = null;
let offset = { x: 0, y: 0 };
let selected = null;

document.getElementById("addNodes").onclick = () => {
  mode = "add";
  selected = null;
};

document.getElementById("connectNodes").onclick = () => {
  mode = "connect";
  selected = null;
};

document.getElementById("exportMap").onclick = () => {
  console.log(JSON.stringify(graph, null, 2));
  alert("Map exported to console");
};

canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const node = graph.getNodeAt(x, y);

  if (mode === "add") {
    if (node) {
      dragging = node;
      offset.x = x - node.x;
      offset.y = y - node.y;
    } else {
      graph.addNode(x, y);
    }
  }

  if (mode === "connect") {
    if (!node) return;

    if (!selected) {
      selected = node;
    } else if (selected.id !== node.id) {
      graph.addEdge(selected.id, node.id);
      selected = null;
    }
  }
});

canvas.addEventListener("mousemove", e => {
  if (!dragging) return;

  const rect = canvas.getBoundingClientRect();
  dragging.x = e.clientX - rect.left - offset.x;
  dragging.y = e.clientY - rect.top - offset.y;
});

canvas.addEventListener("mouseup", () => {
  dragging = null;
});

function loop() {
  draw(graph, ctx);
  requestAnimationFrame(loop);
}

loop();
