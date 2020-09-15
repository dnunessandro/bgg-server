// Inputs

const drawPlayTimeChart = (collectionItem) => {
  const minTime = collectionItem.minPlayTime;
  const maxTime = collectionItem.maxPlayTime;
  const avgTime = collectionItem.playTime;
  const minMaxTimeFlag =
    collectionItem.playTime != collectionItem.minPlayTime ||
    collectionItem.playTime != collectionItem.maxPlayTime;

  svgId = "#boardgame-play-time-svg";

  const svgWidth = parseInt($("#boardgame-play-time-svg").css("width"));
  const svgHeight = parseInt($("#weight-p").css("height"));

  // Create X Axis Scale
  const xAxisScale = d3.scaleLinear().domain([0, 1]).range([0, svgWidth]);

  // Get SVG Element
  const svg = d3.select(svgId).attr("height", svgHeight);

  let lineGroup = svg
    .selectAll(".time-line")
    .data([{ minPlayTime: minTime, maxPlayTime: maxTime, playTime: avgTime }]);

  let minTimeGroup = svg
    .selectAll("g.min-time-group")
    .data([{ minPlayTime: minTime, maxPlayTime: maxTime, playTime: avgTime }]);

  let maxTimeGroup = svg
    .selectAll("g.max-time-group")
    .data([{ minPlayTime: minTime, maxPlayTime: maxTime, playTime: avgTime }]);

  minTimeGroup.exit().remove();
  maxTimeGroup.exit().remove();
  lineGroup.exit().remove();

  const lineGroupEnter = lineGroup
    .enter()
    .append("path")
    .classed("time-line", true);

  const minTimeGroupEnter = minTimeGroup
    .enter()
    .append("g")
    .classed("min-time-group", true);
  const maxTimeGroupEnter = maxTimeGroup
    .enter()
    .append("g")
    .classed("max-time-group", true);

  lineGroup = lineGroup.merge(lineGroupEnter);
  minTimeGroupEnter.append("rect").classed("min-time-rect", true);
  minTimeGroupEnter.append("text").classed("min-time-text", true);
  minTimeGroup = minTimeGroup.merge(minTimeGroupEnter);
  maxTimeGroupEnter.append("rect").classed("max-time-rect", true);
  maxTimeGroupEnter.append("text").classed("max-time-text", true);
  maxTimeGroup = maxTimeGroup.merge(maxTimeGroupEnter);

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
  minTimeGroup
    .select("text")
    .text((d) => d.minPlayTime)
    .style("fill", (d) => checkMapRange(d.minPlayTime, PLAY_TIME_MAP))
    .style("alignment-baseline", "middle")
    .style("cursor", "default");

  maxTimeGroup
    .select("text")
    .text((d) => d.maxPlayTime)
    .style("fill", (d) => checkMapRange(d.maxPlayTime, PLAY_TIME_MAP))
    .style("alignment-baseline", "middle")
    .style("cursor", "default");

  // Get Text Dims
  minTextWidth = minTimeGroup.select("text").node().getBBox().width;
  minTextHeight = minTimeGroup.select("text").node().getBBox().height;
  maxTextWidth = maxTimeGroup.select("text").node().getBBox().width;
  maxTextHeight = maxTimeGroup.select("text").node().getBBox().height;

  // Draw Rects
  const xPad = parseInt($(".misc-stat-span").css("padding-left"));
  const yPad = parseInt($(".misc-stat-span").css("padding-top"));
  minTimeGroup
    .select("rect")
    .attr("width", minTextWidth + xPad * 2)
    .attr("height", svgHeight - 2)
    .attr("transform", `translate(${-xPad + 1},${-(svgHeight - 2) / 2})`)
    .attr("rx", "15px")
    .attr("ry", "20px");
    
  maxTimeGroup
    .select("rect")
    .attr("width", maxTextWidth + xPad * 2)
    .attr("height", svgHeight - 2)
    .attr("transform", `translate(${-xPad + 1},${-(svgHeight - 2) / 2})`)
    .attr("rx", "15px")
    .attr("ry", "20px");

  // Translate Groups
  minTimeGroup
    .transition()
    .duration(500)
    .ease(d3.easePoly)
    .attr("transform", `translate(${xAxisScale(0) + xPad},${svgHeight / 2})`)
    .style("opacity", (d) => (minMaxTimeFlag != d.playTime ? 1 : 0));

  maxTimeGroup
    .transition()
    .duration(500)
    .ease(d3.easePoly)
    .attr(
      "transform",
      (d) =>
        `translate(${
          d.minPlayTime == d.maxPlayTime
            ? xAxisScale(0) + xPad
            : xAxisScale(1) - maxTextWidth - xPad - 1
        },${svgHeight / 2})`
    );

  // Add Tooltips
  if (minMaxTimeFlag) {
    $("#play-time-p svg g")
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("data-original-title");
    $(".min-time-group")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "top")
      .attr("data-original-title", "Minimum Play Time (Minutes)");
    $(".max-time-group")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "top")
      .attr("data-original-title", "Maximum Play Time (Minutes)");

    // $("#play-time-icon")
    //   .attr("data-toggle", "tooltip")
    //   .attr("data-placement", "left")
    //   .attr("data-original-title", "Play Time");
    $('[data-toggle="tooltip"]').tooltip();
  } else {
    $(".min-time-group")
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("data-original-title");
    $(".max-time-group")
      .removeAttr("data-toggle")
      .removeAttr("data-placement")
      .removeAttr("data-original-title");
    // $("#play-time-icon")
    //   .removeAttr("data-toggle")
    //   .removeAttr("data-placement")
    //   .removeAttr("data-original-title");
    $("#play-time-p svg g")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "left")
      .attr("data-original-title", "Play Time (Minutes)");
    $('[data-toggle="tooltip"]').tooltip();
  }
};
