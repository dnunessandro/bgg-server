// Create Radius Scale
const createRadiusScale = (domain, range) => {
  const scale = d3.scaleSqrt().domain(domain).range(range).clamp(true);

  return scale;
};

// Create X-Axis Scale
const createNodeAxisScale = (nNodes, chartDim) => {
  const chartWidth = $("#collection-overview-chart").width();
  const chartHeight = $("#collection-overview-chart").height();
  const scale = d3
    .scaleLinear()
    .domain([0, nNodes - 1])
    .range([
      DEFAULT_NODE_RADIUS_FACTOR * chartHeight,
      chartDim - DEFAULT_NODE_RADIUS_FACTOR * chartHeight,
    ])
    .clamp(true);

  return scale;
};

// Create Circle Coords Scale
const createCircleCoordsScale = (nCircles, svgWidth, circleRadius, svgXpad) => {

  const scale = d3
    .scaleLinear()
    .domain([0, nCircles - 1])
    .range([svgXpad+circleRadius, svgWidth - svgXpad-circleRadius])
    .clamp(true);
  return scale
};

 