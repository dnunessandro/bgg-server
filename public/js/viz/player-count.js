// Inputs

const drawPlayerCountChart = (playerCountData) => {
  nCircles = 8;
  svgId = "#boardgame-player-count-svg";
  // Get SVG Dimensions
  const svgWidth = $(svgId).width();

  const svgXPad = 8;
  const svgTopYPad = 7;
  const svgBottomYPad = 7;
  const circleRadius = Math.min(13,
    (svgWidth - (nCircles - 1) * 2 - svgXPad * 2) / nCircles / 2);

  // const svgHeight = svgTopYPad + svgBottomYPad + circleRadius * 2;
  const svgHeight = $("#price-p").height()

  // Get SVG Element
  const svg = d3
    .select(svgId)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Create Background

  if (svg.select(".player-count-bg").empty()) {
    svg
      .append("rect")
      .classed("player-count-bg", true)
      .attr("width", svg.attr("width"))
      .attr("height", svgHeight);
  }

  // Get Circle Coords Scale =
  const circleCoordsScale = createCircleCoordsScale(
    nCircles,
    svgWidth,
    circleRadius,
    svgXPad
  );

  // Create  Groups, Circles and Labels
  let playerCountGroups = svg
    .selectAll("g.player-count-group")
    .data(Object.values(playerCountData));

  playerCountGroups.exit().remove();
  const playerCountGroupsEnter = playerCountGroups
    .enter()
    .append("g")
    .classed("player-count-group", true);

  playerCountGroupsEnter.append("circle").classed("player-count-circle", true);
  playerCountGroupsEnter.append("text").classed("player-count-text", true);
  playerCountGroups = playerCountGroups.merge(playerCountGroupsEnter);

  // Draw Circles
  playerCountGroups
    .select("circle")
    .style("stroke-width", (d) => (d.recommendation == "Best" ? 3 : 1))
    .transition()
    .duration(300)
    .ease(d3.easePoly)
    .style("stroke", (d) => PLAYER_COUNT_COLOR_MAP[d.recommendation])
    .style("fill", (d) => PLAYER_COUNT_COLOR_MAP[d.recommendation])
    .style("fill-opacity", 0.2)
    .attr("r", circleRadius);

  // Draw Text
  playerCountGroups
    .select("text")
    .text((d) => d.label)
    .transition()
    .duration(300)
    .ease(d3.easePoly)
    .style("fill", (d) => PLAYER_COUNT_COLOR_MAP[d.recommendation])
    .style("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .style("cursor", "default")

  // Translate Groups
  playerCountGroups.attr(
    "transform",
    (_, i) =>
      "translate(" +
      circleCoordsScale(i) +
      "," +
      (svgTopYPad-2 + circleRadius) +
      ")"
  );

  // Create Tooltips
  const tip = d3;
  //   .tip()
  //   .attr("class", "d3-tip")
  //   .offset([-10, 0])
  //   .html(function (d) {
  //     return "<span>" + d.recommendation + "</span>";
  //   });

  // svg.call(tip);
  // playerCountGroups.on("mouseover", tip.show).on("mouseout", tip.hide);

  d3.selectAll(".player-count-group").attr("data-toggle", "tooltip").attr("data-placement", "bottom").attr("data-original-title", d=>d.recommendation);
};
