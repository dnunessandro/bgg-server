// Inputs

const drawPlayerCountChart = (playerCountData) => {
  nCircles = 8;
  svgId = "#boardgame-player-count-svg";
  // Get SVG Dimensions
  const svgWidth = $(svgId).width() - 4;

  const svgXPad = 8;
  const svgTopYPad = 7;
  const svgBottomYPad = 7;
  const circleRadius = Math.min(
    13,
    (svgWidth - (nCircles - 1) * 2 - svgXPad * 2) / nCircles / 2
  );

  // const svgHeight = svgTopYPad + svgBottomYPad + circleRadius * 2;
  const svgHeight = $("#price-p").height();

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
      .attr("height", svgHeight)
      .attr("rx", "15px")
      .attr("ry", "20px");
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
    .style("cursor", "default");

  // Translate Groups
  playerCountGroups.attr(
    "transform",
    (_, i) =>
      "translate(" +
      circleCoordsScale(i) +
      "," +
      (svgTopYPad - 2 + circleRadius) +
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

  d3.selectAll(".player-count-group")
    .attr("data-toggle", "tooltip")
    .attr("data-placement", "bottom")
    .attr("data-original-title", (d) => d.recommendation);
};

// Inputs

const drawPlayerCountChartMobile = (collectionItem) => {
  const minPlayers = collectionItem.minPlayers;
  const maxPlayers = collectionItem.maxPlayers;
  const avgTime = collectionItem.maxPlayers;
  const minMaxTimeFlag =
    collectionItem.maxPlayers != collectionItem.minPlayers ||
    collectionItem.maxPlayers != collectionItem.maxPlayers;

  svgId = "#boardgame-player-count-svg";

  const svgWidth = parseInt($("#boardgame-player-count-svg").css("width")) - 2;
  const svgHeight = parseInt($("#weight-p").css("height"));

  // Create X Axis Scale
  const xAxisScale = d3.scaleLinear().domain([0, 1]).range([0, svgWidth]);

  // Get SVG Element
  const svg = d3.select(svgId).attr("height", svgHeight);

  let lineGroup = svg
    .selectAll(".time-line")
    .data([
      { minPlayers: minPlayers, maxPlayers: maxPlayers, maxPlayers: avgTime },
    ]);

  let minPlayersGroup = svg
    .selectAll("g.min-players-group")
    .data([
      { minPlayers: minPlayers, maxPlayers: maxPlayers, maxPlayers: avgTime },
    ]);

  let maxPlayersGroup = svg
    .selectAll("g.max-players-group")
    .data([
      { minPlayers: minPlayers, maxPlayers: maxPlayers, maxPlayers: avgTime },
    ]);

  minPlayersGroup.exit().remove();
  maxPlayersGroup.exit().remove();
  lineGroup.exit().remove();

  const lineGroupEnter = lineGroup
    .enter()
    .append("path")
    .classed("time-line", true);

  const minPlayersGroupEnter = minPlayersGroup
    .enter()
    .append("g")
    .classed("min-players-group", true);
  const maxPlayersGroupEnter = maxPlayersGroup
    .enter()
    .append("g")
    .classed("max-players-group", true);

  lineGroup = lineGroup.merge(lineGroupEnter);
  minPlayersGroupEnter.append("rect").classed("min-players-rect", true);
  minPlayersGroupEnter.append("text").classed("min-players-text", true);
  minPlayersGroup = minPlayersGroup.merge(minPlayersGroupEnter);
  maxPlayersGroupEnter.append("rect").classed("max-players-rect", true);
  maxPlayersGroupEnter.append("text").classed("max-players-text", true);
  maxPlayersGroup = maxPlayersGroup.merge(maxPlayersGroupEnter);

  // Draw Line
  const line = d3.line();
  svg
    .select(".time-line")
    .transition()
    .duration(500)
    .ease(d3.easePoly)
    .attr("d", function (d) {
      return line([
        [
          minMaxTimeFlag ? xAxisScale(0) + svgWidth / 4 : xAxisScale(1),
          svgHeight / 2,
        ],
        [xAxisScale(1) - svgWidth / 4, svgHeight / 2],
      ]);
    })
    .style("opacity", (d) => (minMaxTimeFlag ? 0.8 : 0));

  // Draw Text
  minPlayersGroup
    .select("text")
    .text((d) => d.minPlayers)
    .style("fill", (d) => checkMapRange(d.minPlayers, PLAYER_COUNT_MAP))
    .style("alignment-baseline", "middle")
    .style("cursor", "default");

  maxPlayersGroup
    .select("text")
    .text((d) => d.maxPlayers)
    .style("fill", (d) => checkMapRange(d.maxPlayers, PLAYER_COUNT_MAP))
    .style("alignment-baseline", "middle")
    .style("cursor", "default");

  // Get Text Dims
  minTextWidth = minPlayersGroup.select("text").node().getBBox().width;
  minTextHeight = minPlayersGroup.select("text").node().getBBox().height;
  maxTextWidth = maxPlayersGroup.select("text").node().getBBox().width;
  maxTextHeight = maxPlayersGroup.select("text").node().getBBox().height;

  // Draw Rects
  const xPad = parseInt($(".misc-stat-span").css("padding-left"));
  const yPad = parseInt($(".misc-stat-span").css("padding-top"));
  minPlayersGroup
    .select("rect")
    .attr("width", minTextWidth + xPad * 2)
    .attr("height", svgHeight - 2)
    .attr("transform", `translate(${-xPad + 1},${-(svgHeight - 2) / 2})`);
  maxPlayersGroup
    .select("rect")
    .attr("width", maxTextWidth + xPad * 2)
    .attr("height", svgHeight - 2)
    .attr("transform", `translate(${-xPad + 1},${-(svgHeight - 2) / 2})`);

  // Translate Groups
  minPlayersGroup
    .transition()
    .duration(500)
    .ease(d3.easePoly)
    .attr("transform", `translate(${xAxisScale(0) + xPad},${svgHeight / 2})`)
    .style("opacity", (d) => (minMaxTimeFlag != d.maxPlayers ? 1 : 0));

  maxPlayersGroup
    .transition()
    .duration(500)
    .ease(d3.easePoly)
    .attr(
      "transform",
      (d) =>
        `translate(${
          d.minPlayers == d.maxPlayers
            ? xAxisScale(0) + xPad
            : xAxisScale(1) - maxTextWidth - xPad - 1
        },${svgHeight / 2})`
    );

  // Add Tooltips
  if (minMaxTimeFlag) {
    $("#player-count-p svg g")
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("data-original-title");
    $(".min-players-group")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "top")
      .attr("data-original-title", "Minimum Player Count");
    $(".max-players-group")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "top")
      .attr("data-original-title", "Maximum Player Count");

    // $("#player-count-icon")
    //   .attr("data-toggle", "tooltip")
    //   .attr("data-placement", "left")
    //   .attr("data-original-title", "Play Time");
    $('[data-toggle="tooltip"]').tooltip();
  } else {
    $(".min-players-group")
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("data-original-title");
    $(".max-players-group")
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("data-original-title");
    // $("#player-count-icon")
    //   .removeAttr("data-toggle")
    //   .removeAttr("data-placement")
    //   .removeAttr("data-original-title");
    $("#player-count-p svg g")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "left")
      .attr("data-original-title", "Player Count");
    $('[data-toggle="tooltip"]').tooltip();
  }
};
