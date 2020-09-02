const createNodeGroupELs = () => {
  d3.selectAll(".node-group").on("click", function (d) {
    NODE_CLICKED_BOOL = true;

    // Change Circle and Rect Class
    d3.selectAll(".node-circle").classed("clicked", false);
    d3.selectAll(".node-rect").classed("clicked", false);
    d3.select(this).select(".node-circle").classed("clicked", true);
    d3.select(this).select(".node-rect").classed("clicked", true);

    // Show Tooltip
    BOARDGAME_INFO_VAR.insertAfter("#collection-overview");
    BOARDGAME_INFO_VAR.slideDown("slow");
    $("#boardgame-info").removeClass("hide").addClass("show");
    Waypoint.refreshAll()

    // Populate Tooltip Elements
    populateTooltip(d.id, d.name, d.yearPublished, d.image, d.description);

    // Populate Info Elements ////////////
    // Populate Ratings
    populateRatings(d.userRating, d.averageRating, d.bayesAverageRating);

    // Populate Ratings Breakdown
    RATINGS_BREAKDOWN != null ? RATINGS_BREAKDOWN.destroy() : null;
    RATINGS_BREAKDOWN = createRatingsBreakdownChartIfAvailable(
      d.ratingsBreakdown
    );

    // Create Player Count Chart
    checkIfMobile()? drawPlayerCountChartMobile(d) : drawPlayerCountChart(getPlayerCountData(d));

    // Create Misc Stats
    createMiscStats(d);

    // Create Play Time Chart
    drawPlayTimeChart(d);

    // Create Categories Chart
    createWordCloud(getItemCategories(d));

    // Create Plays History
    createPlaysChartIfAvailable(d.plays);
  });
};

const populateTooltip = (id, name, yearPublished, image, description) => {
  $("#boardgame-tooltip img").addClass("hide").removeClass("show");
  $("#boardgame-tooltip img")
    .attr("src", image)
    .css("height", $("#boardgame-tooltip img").width());
  $("#boardgame-tooltip img").addClass("show").removeClass("hide");
  $("#boardgame-tooltip h5").text(name);
  $("#boardgame-tooltip h6").text(yearPublished);
  $("#boardgame-tooltip a").attr(
    "href",
    "https://boardgamegeek.com/boardgame/" + id
  );
  $("#boardgame-tooltip #tooltip-description").html(description);
};

const populateRatings = (userRating, averageRating, bayesAverageRating) => {
  $("#user-rating-odometer").text(userRating == null ? 0 : userRating);

  $("#user-rating-odometer").css(
    "background-color",
    getRatingColor(userRating)
  );
  $("#average-rating-odometer").text(averageRating);
  $("#average-rating-odometer").css(
    "background-color",
    getRatingColor(averageRating)
  );
  $("#bgg-rating-odometer").text(bayesAverageRating);
  $("#bgg-rating-odometer").css(
    "background-color",
    getRatingColor(bayesAverageRating)
  );
};

const boardgameInfoFluidContainerToggle = (threshold) => {
  $("#collection-overview-chart").width() > threshold
  ? $("#boardgame-info").removeClass("container-fluid").addClass("container")
  : undefined;
}
