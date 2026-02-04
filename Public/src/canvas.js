export function draw(graph, ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw edges
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 2;

  graph.edges.forEach(e => {
    const a = graph.nodes.find(n => n.id === e.from);
    const b = graph.nodes.find(n => n.id === e.to);
    if (!a || !b) return;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });

  // Draw nodes
  graph.nodes.forEach(n => {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(n.label, n.x, n.y);
  });
}
