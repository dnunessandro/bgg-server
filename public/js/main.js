const run = async () => {
  // Get Collection from Local Storage
  const collection = JSON.parse(
    LZUTF8.decompress(window.localStorage.getItem("collection"), {
      inputEncoding: "StorageBinaryString",
    })
  );

  // Show Excluded Boardgames Modal
  collection.ignoredItems.length != 0
    ? showIgnoredBoardgamesModal(collection.ignoredItems)
    : undefined;

  // Populate User Card
  populateUserCard(collection);

  // Filter Collection Items
  let collectionItems = filterCollectionItems(
    collection.items,
    COLLECTION_OVERVIEW_NUM_NODES
  );
  collectionItems = sortCollectionItems(
    collectionItems,
    NODE_SORT_DEFAULT_FIELD
  );

  // Draw Collection Overview
  const nodeGroups = drawCollectionOverview(collectionItems);

  // Create "Collection Too Large" Warning
  createIncompleteCollectionWarning(collection.items.length);

  // Create Forces
  NODE_FORCE = createNodesForce(collectionItems, nodeGroups);

  // createWindowResizeEL(collectionItems);
  createSidepanelELs(collectionItems);
  createSortSidepanelBtnEL(collectionItems);
  createNodeGroupELs();
  createOverviewSvgEL();
  createCategoryBtnELs();

  // Populate Tooltip
  boardgameInfoFluidContainerToggle(CONTAINER_FLUID_BREAKPOINT);

  populateTooltip(
    collectionItems[0].id,
    collectionItems[0].name,
    collectionItems[0].yearPublished,
    collectionItems[0].image,
    collectionItems[0].description
  );

  populateRatings(
    collectionItems[0].userRating,
    collectionItems[0].averageRating,
    collectionItems[0].bayesAverageRating
  );

  createMiscStats(collectionItems[0]);
  checkIfMobile()? drawPlayerCountChartMobile(collectionItems[0]) : drawPlayerCountChart(getPlayerCountData(collectionItems[0]));
  drawPlayTimeChart(collectionItems[0]);
  createWordCloud(getItemCategories(collectionItems[0]));
  createWordCloud(getItemCategories(collectionItems[0]));
  createPlaysChartIfAvailable(collectionItems[0].plays);
  createPlaysChartIfAvailable(collectionItems[0].plays);
  RATINGS_BREAKDOWN = createRatingsBreakdownChartIfAvailable(
    collectionItems[0].ratingsBreakdown
  );

  // Draw Insights
  runInsights(collection);

  // Draw Global Stats
  await runGlobalStats();

  // Create Waypoints
  await addAllWaypoints(
    getWaypointList([
      "#insights-header",
      "#global-stats-header",
      "#insights-bg",
      "#global-stats-bg",
    ])
  );

  // Create Scroll Animations
  $(document).ready(function () {
    $(".btn-group").localScroll({ duration: 800 });
  });

  // Change Bootstrap Classes based on screen size
  changeBootstrapClasses()

  // Turn on tooltips
  $('[data-toggle="tooltip"]').tooltip();

};

run();
