// Drag Utilities
function dragstarted(d, force) {
  if (!d3.event.active) force.alphaTarget(0.1).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  // $(".node-group").css("pointer-events", "none");
}

function dragended(d, force) {
  if (!d3.event.active) force.alphaTarget(0.0).alpha(0.7);
  d.fx = null;
  d.fy = null;
  // $(".node-group").css("pointer-events", "auto");
}

// Node Tick Update
function nodeTickUpdate(nodes) {
  nodes.attr("transform", (d, i) => {
    const chartWidth = $("#collection-overview-chart").width();
    const chartHeight = $("#collection-overview-chart").height();
    return (
      "translate(" +
      Math.max(d.radius, Math.min(chartWidth - d.radius - 2, d.x)) +
      "," +
      Math.max(d.radius, Math.min(chartHeight - d.radius - 2, d.y)) +
      ")"
    );
  });
}

const createNodesForce = (collectionItems, nodeGroups) => {
  const chartWidth = $("#collection-overview-chart").width();
  const chartHeight = $("#collection-overview-chart").height();

  const nodeXAxisScale = createNodeAxisScale(
    collectionItems.length,
    chartWidth
  );

  // Create Force Layout
  NODE_FORCE = d3
    .forceSimulation(collectionItems)
    .force("x", d3.forceX((_, i) => nodeXAxisScale(i)).strength(0.6))
    .force("y", d3.forceY(chartHeight / 2).strength(0.1))
    .force(
      "collision",
      d3
        .forceCollide((d) => d.radius * 1.02)
        .strength(NODE_LINEAR_BOOL ? 0 : 0.7)
        .iterations(20)
    )
    .alphaTarget(0)
    .alphaDecay(0.1);

  // Tie Force to Nodes
  NODE_FORCE.on("tick", (_) => {
    nodeTickUpdate(nodeGroups);
  });

  nodeGroups.call(
    d3
      .drag()
      .on("start", (d) => dragstarted(d, NODE_FORCE))
      .on("drag", (d) => dragged(d, NODE_FORCE))
      .on("end", (d) => dragended(d, NODE_FORCE))
  );

  return NODE_FORCE;
};

const updateNodesForce = (collectionItems) => {
  const chartWidth = $("#collection-overview-chart").width();
  const chartHeight = $("#collection-overview-chart").height();

  const nodeXAxisScale = createNodeAxisScale(
    collectionItems.length > COLLECTION_OVERVIEW_NUM_NODES / 2
      ? collectionItems.length / 2 + 1
      : collectionItems.length,
    chartWidth
  );

  // NODE_FORCE.force("x", d3.forceX((_, i) => i <= COLLECTION_OVERVIEW_NUM_NODES/2 ? nodeXAxisScale(i) : nodeXAxisScale(i-collectionItems.length/2 + (collectionItems.length/2 - (collectionItems.length - collectionItems.length/2))/2  ) ).strength(0.6))
  NODE_FORCE.force(
    "x",
    d3
      .forceX((_, i) => {
        if (collectionItems.length > COLLECTION_OVERVIEW_NUM_NODES / 2) {
          return i <= collectionItems.length / 2
            ? nodeXAxisScale(i)
            : nodeXAxisScale(i - collectionItems.length / 2);
        } else {
          return nodeXAxisScale(i);
        }
      })
      .strength(0.6)
  )
    .force(
      "y",
      d3
        .forceY((_, i) =>
          NODE_LINEAR_BOOL
            ? getNodeYPosition(i, collectionItems.length)
            : chartHeight / 2
        )
        .strength(0.3)
    )
    .force(
      "collision",
      d3
        .forceCollide((d) => d.radius * 1.02)
        .strength(NODE_LINEAR_BOOL ? 0 : 0.7)
        .iterations(20)
    )
    .alpha(1)
    .restart();
};
