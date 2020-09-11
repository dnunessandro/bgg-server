const drawPlaysChart = (plays) => {
  // Define Time Formats
  const timeParse = d3.timeParse("%Y-%m-%d");
  const timeFormat = d3.timeFormat("%-d %b %y");

  // Get Total Plays
  const nPlays = plays
    .map((e) => e.quantity)
    .reduce(function (sum, value) {
      return sum + value;
    }, 0);

  // Add Parsed Dates
  plays.forEach((d, i) => {
    plays[i].parsedDate = timeParse(d.date.slice(0, 10));
  });

  plays.sort((a, b) => (a.parsedDate > b.parsedDate ? 1 : -1));

  // Compute Comulative Plays
  const cumulativePlays = plays
    .map((d) => d.quantity)
    .reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
  plays.forEach((d, i) => {
    plays[i].cumulativePlays = cumulativePlays[i];
  });

  // Adjust SVG Element Dimensions
  const svgId = "#boardgame-plays-svg";
  const svgLeftXPad = 30;
  const svgRightXPad = 20;
  const svgTopYPad = 10;
  const svgBottomYPad = 20;
  const svg = d3
    .select(svgId)
    .attr("width", "100%")
    .attr("height", "100%")
    .style("min-height", "300px")
    .style("opacity", 1);
  const svgWidth = parseInt($(svgId).css("width"));
  const svgHeight = parseInt($(svgId).css("height"));

  // Create Time Scale
  const dateMin = Math.min(...plays.map((d) => d.parsedDate));
  const dateMax = Math.max(...plays.map((d) => d.parsedDate));

  const xScale = d3
    .scaleTime()
    .domain([dateMin, dateMax])
    .range([svgLeftXPad, svgWidth - svgRightXPad])
    .clamp(true);

  const yScale = d3
    .scaleLinear()
    .domain([0, nPlays])
    .range([svgHeight - svgBottomYPad, svgTopYPad]);

  // Create Radius Scale
  const radiusScale = d3
    .scaleSqrt()
    .domain([1, 5])
    .range([
      getPyth(svgWidth, svgHeight) * 0.01,
      getPyth(svgWidth, svgHeight) * 0.03,
    ])
    .clamp(true);

  // Create Axes
  const xNTicks = 4;
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(xNTicks)
    .tickFormat(timeFormat)
    .tickSize(0)
    .tickPadding(10);
  const YNTicks = 3;
  const yAxis = d3.axisLeft(yScale).ticks(YNTicks).tickSize(0);

  // Append X Axis
  if (svg.select("#x-axis").empty()) {
    svg
      .append("g")
      .attr("id", "x-axis")
      .style(
        "transform",
        "translate(0," +
          parseInt(parseInt($(svgId).css("height")) - svgBottomYPad) +
          "px)"
      );
  }

  // Add the X gridlines
  svg
    .append("g")
    .attr("id", "x-grid")
    .attr("class", "grid")
    .attr(
      "transform",
      "translate(0," +
        parseInt(parseInt($(svgId).css("height")) - svgBottomYPad) +
        ")"
    );

  // Update X Axis
  svg
    .select("#x-axis")
    .transition()
    .duration(1000)
    .ease(d3.easePoly)
    .call(xAxis)
    .style("fill", "black");

  // Update X Grid
  svg
    .select("#x-grid")
    .transition()
    .duration(1000)
    .ease(d3.easePoly)
    .call(xAxis)
    .call(xAxis.tickSize(-svgHeight).tickFormat("").tickSizeOuter(0));

  // Append Y Axis
  if (svg.select("#y-axis").empty()) {
    svg
      .append("g")
      .attr("id", "y-axis")
      .style("transform", "translate(" + parseInt(svgLeftXPad) + "px,0)");
  }

  // Add the Y gridlines
  svg
    .append("g")
    .attr("id", "y-grid")
    .attr("class", "grid")
    .attr("transform", "translate(" + svgLeftXPad + ",0)");

  // Update Y Axis
  svg
    .select("#y-axis")
    .transition()
    .duration(1000)
    .ease(d3.easePoly)
    .call(yAxis)

    .style("fill", "black");

  // Update Y Grid
  svg
    .select("#y-grid")
    .transition()
    .duration(1000)
    .ease(d3.easePoly)
    .call(yAxis)
    .call(
      yAxis
        .tickSize(-(svgWidth - svgLeftXPad - svgRightXPad))
        .tickFormat("")
        .tickSizeOuter(0)
    );

  // Create Line
  const line = d3
    .line()
    .x((d) => xScale(d.parsedDate))
    .y((d) => yScale(d.cumulativePlays))
    .curve(d3.curveBasis);
  const lines = svg.selectAll(".line").data([plays]);

  lines.exit().remove();

  lines
    .enter()
    .append("path")
    .classed("line", true)
    .attr("id", "reg-line")
    .merge(lines)
    .style("fill", "none")
    .attr("d", line)
    .attr("id", (_, i) => "line" + i)
    .style("stroke-linecap", "round");

  animatelines();

  // Create Circles
  const circles = svg.selectAll(".plays-circle").data(plays);

  circles.exit().remove();

  circles
    .enter()
    .append("circle")
    .classed("plays-circle", true)
    .merge(circles)
    .transition()
    .duration(1000)
    .ease(d3.easePoly)
    .attr("r", (d) => radiusScale(d.quantity))
    .style("fill", (d) => PLAYS_COLOR_MAP[String(d.incomplete)])
    .style("stroke", (d) => PLAYS_COLOR_MAP[String(d.incomplete)])
    .attr("cx", (d) => xScale(d.parsedDate))
    .attr("cy", (d) => yScale(d.cumulativePlays));

  // Create Legengd
  d3.select("#plays-legend").remove();

  const legend = svg.append("g").attr("id", "plays-legend");

  // const legendBg = legend.append("rect").attr("id", "plays-legend-bg");

  const legendSize = legend.append("g").attr("id", "plays-legend-size");

  const legendSizeText = legendSize
    .append("text")
    .attr("id", "plays-legend-size-text")
    .text("#Plays");

  const legendSizeTextWidth = $("#plays-legend-size-text").get(0).getBBox()
    .width;
  const legendSizeTextHeight = $("#plays-legend-size-text").get(0).getBBox()
    .height;

  legendSize
    .append("circle")
    .attr("id", "plays-legend-size-circle-size-1")
    .classed("plays-legend-size-circle", true)
    .attr("r", getPyth(svgWidth, svgHeight) * 0.02)
    .style("fill", LIGHT_COLOR)
    .style("opacity", 0.7)
    .style("stroke", "#2b2d42");

  legendSize
    .append("circle")
    .attr("id", "plays-legend-size-circle-size-2")
    .classed("plays-legend-size-circle", true)
    .attr("r", getPyth(svgWidth, svgHeight) * 0.015)
    .attr("transform", `translate(${getPyth(svgWidth, svgHeight) * 0.01},0)`)
    .style("fill", LIGHT_COLOR)
    .style("opacity", 0.5)
    .style("stroke", "#2b2d42");

  legendSize
    .append("circle")
    .attr("id", "plays-legend-size-circle-size-3")
    .classed("plays-legend-size-circle", true)
    .attr("r", getPyth(svgWidth, svgHeight) * 0.01)
    .attr(
      "transform",
      `translate(${getPyth(svgWidth, svgHeight) * (0.01 + 0.007)},0)`
    )
    .style("fill", LIGHT_COLOR)
    .style("opacity", 0.5)
    .style("stroke", "#2b2d42");

  const legendColor = legend.append("g").attr("id", "plays-legend-color");
  const legendColorIncomplete = legendColor
    .append("g")
    .classed("plays-legend-color-incomplete", true);

  const legendColorComplete = legendColor
    .append("g")
    .classed("plays-legend-color-complete", true);

  const legendColorIncompleteText = legendColorIncomplete
    .append("text")
    .text("Incomplete")
    .attr("id", "plays-legend-color-text-incomplete");
  const legendColorCompleteText = legendColorComplete
    .append("text")
    .text("Complete")
    .attr("id", "plays-legend-color-text-complete");

  const legendColorTextIncompleteWidth = $(
    "#plays-legend-color-text-incomplete"
  )
    .get(0)
    .getBBox().width;
  const legendColorTextIncompleteHeight = $(
    "#plays-legend-color-text-incomplete"
  )
    .get(0)
    .getBBox().height;
  const legendColorTextCompleteWidth = $("#plays-legend-color-text-complete")
    .get(0)
    .getBBox().width;
  const legendColorTextCompleteHeight = $("#plays-legend-color-text-complete")
    .get(0)
    .getBBox().height;

  legendColorIncomplete
    .append("circle")
    .attr("id", "plays-legend-color-circle-incomplete")
    .classed("plays-legend-color-circle-incomplete", true)
    .attr("r", getPyth(svgWidth, svgHeight) * 0.012)
    .style("fill", PLAYS_COLOR_MAP["1"])
    .style("fill-opacity", 0.5)
    .style("stroke", PLAYS_COLOR_MAP["1"]);
  legendColorComplete
    .append("circle")
    .attr("id", "plays-legend-color-circle-complete")
    .classed("plays-legend-color-circle-complete", true)
    .attr("r", getPyth(svgWidth, svgHeight) * 0.012)
    .style("fill", PLAYS_COLOR_MAP["0"])
    .style("fill-opacity", 0.5)
    .style("stroke", PLAYS_COLOR_MAP["0"]);

  legendColorIncompleteText.attr(
    "transform",
    `translate(${getPyth(svgWidth, svgHeight) * 0.01 * 2},0)`
  );

  legendColorCompleteText.attr(
    "transform",
    `translate(${getPyth(svgWidth, svgHeight) * 0.01 * 2},0)`
  );

  legendColorComplete.attr(
    "transform",
    `translate(${
      getPyth(svgWidth, svgHeight) * 0.01 * 2 +
      legendColorTextIncompleteWidth +
      10
    },0)`
  );

  legendSizeText.attr(
    "transform",
    `translate(${getPyth(svgWidth, svgHeight) * (0.01 + 0.007) + 10},0)`
  );
  legendSize.attr(
    "transform",
    `translate(${
      legendColorTextCompleteWidth +
      legendColorTextIncompleteWidth +
      getPyth(svgWidth, svgHeight) * 0.01 * 4 -
      getPyth(svgWidth, svgHeight) * (0.01 + 0.007) -
      legendSizeTextWidth
    },${-legendColorTextCompleteHeight - 15})`
  );
  legend.attr(
    "transform",
    `translate(${
      svgWidth -
      svgRightXPad -
      legendColorTextCompleteWidth -
      legendColorTextIncompleteWidth -
      getPyth(svgWidth, svgHeight) * 0.01 * 2 -
      20
    }, ${svgHeight - svgBottomYPad - 20})`
  );

  // legendBg
  //   .attr("width", legend.node().getBBox().width + 20)
  //   .attr("height", legend.node().getBBox().height + 20)
  //   .attr('transform', `translate(-${getPyth(svgWidth, svgHeight) * 0.01+10},${-legendColorTextCompleteHeight-legendSizeTextHeight-15})`)

  // Create Tooltips
  const tip = d3
    .tip()
    .direction(function (d, i) {
      return parseInt($(this).attr('cx')) < svgWidth / 2 ? "e" : "w";
    })
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html((d) => createToolTipHtml(d));

  svg.call(tip);
  d3.selectAll(".plays-circle")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);
};

const createToolTipHtml = (play) => {
  let html = `<strong>Date:</strong> <span style="color:${BASE_COLOR}">${play.date.substring(
    0,
    10
  )}</span><br>`;
  html =
    html +
    `<strong>#Plays:</strong> <span style="color:${BASE_COLOR}">${play.quantity}</span><br>`;

  if (play.length != 0) {
    html =
      html +
      `<strong>#Session Duration:</strong> <span style="color:${BASE_COLOR}">${play.length}m</span><br>`;
  }

  if (play.location != "") {
    html =
      html +
      `<strong>Location:</strong> <span style="color:${BASE_COLOR}">${play.location}</span><br>`;
  }

  if (play.players.length != 0) {
    html =
      html +
      `<strong>Players:</strong> <span style="color:${BASE_COLOR}">${createPlayersHtml(
        play.players
      )}</span><br>`;
  }

  return html.substring(0, html.length - 4);
};

const createPlayersHtml = (players) => {
  let playersHtml = "";

  players.forEach((d) => {
    playersHtml =
      playersHtml +
      `<span style="color:${BASE_COLOR}">${d.name}</span>${
        d.username != 0
          ? ` (<span style="color:${LIGHT_COLOR}">` + d.username + "</span>)"
          : ""
      }, `;
  });

  return playersHtml.substring(0, playersHtml.length - 2);
};
function animatelines() {
  d3.selectAll(".line");

  //Select All of the lines and process them one by one
  d3.selectAll(".line").each(function (d, i) {
    // Get the length of each line in turn
    var totalLength = d3
      .select("#line" + i)
      .node()
      .getTotalLength();

    d3.selectAll("#line" + i)
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition("j")
      .duration(2000)
      .ease(d3.easeExp)
      .attr("stroke-dashoffset", 0)
      .style("stroke-width", 3);
  });
}

const createPlaysChartIfAvailable = (plays) => {
  if (plays && "quantity" in plays) {
    drawPlaysChart(plays);
    $("#plays-not-available").css("opacity", 0);
  } else {
    d3.select("#boardgame-plays-svg")
      .transition()
      .duration(200)
      .style("opacity", 0);
    $("#plays-not-available").css("opacity", 1);
  }
};
