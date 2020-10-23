const run = async () => {
  // Get Collection from Local Storage
  // const collection = JSON.parse(
  //   LZUTF8.decompress(window.localStorage.getItem("collection"), {
  //     inputEncoding: "StorageBinaryString",
  //   })
  // );
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  let collection = {};
  try {
    response = await axios.get(`${API_URL}/enriched-collections/${username}`, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    collection = response.data;
  } catch (error) {
    window.open(window.location.host, "_self");
  }

  // Show Excluded Boardgames Modal
  collection.ignoredItems.length != 0
    ? showIgnoredBoardgamesModal(collection.ignoredItems)
    : undefined;

  // Populate User Card
  populateUserCard(collection);

  // Remove Expansions
  FILTERED_COLLECTION_ITEMS = removeExpansions(collection.items);

  // Filter Collection Items
  FILTERED_COLLECTION_ITEMS = filterCollectionItems(
    FILTERED_COLLECTION_ITEMS,
    COLLECTION_OVERVIEW_NUM_NODES
  );

  // Sort Collection Items
  FILTERED_COLLECTION_ITEMS = sortCollectionItems(
    FILTERED_COLLECTION_ITEMS,
    NODE_SORT_DEFAULT_FIELD
  );

  // Draw Collection Overview
  const nodeGroups = drawCollectionOverview(FILTERED_COLLECTION_ITEMS);

  // Create "Collection Too Large" Warning
  createIncompleteCollectionWarning(collection.items.length);

  // Create Forces
  NODE_FORCE = createNodesForce(FILTERED_COLLECTION_ITEMS, nodeGroups);

  // createWindowResizeEL(collectionItems);
  createSidepanelELs();
  createSortSidepanelBtnEL();
  createExpansionsSidepanelBtnEl(collection.items);
  createNodeGroupELs();
  createOverviewSvgEL();
  createCategoryBtnELs();

  // Populate Tooltip
  boardgameInfoFluidContainerToggle(CONTAINER_FLUID_BREAKPOINT);

  populateTooltip(
    FILTERED_COLLECTION_ITEMS[0].id,
    FILTERED_COLLECTION_ITEMS[0].name,
    FILTERED_COLLECTION_ITEMS[0].yearPublished,
    FILTERED_COLLECTION_ITEMS[0].image,
    FILTERED_COLLECTION_ITEMS[0].description
  );

  populateRatings(
    FILTERED_COLLECTION_ITEMS[0].userRating,
    FILTERED_COLLECTION_ITEMS[0].averageRating,
    FILTERED_COLLECTION_ITEMS[0].bayesAverageRating
  );

  createMiscStats(FILTERED_COLLECTION_ITEMS[0]);
  drawPlayTimeChart(FILTERED_COLLECTION_ITEMS[0]);
  checkIfMobile()
    ? drawPlayerCountChartMobile(FILTERED_COLLECTION_ITEMS[0])
    : drawPlayerCountChart(getPlayerCountData(FILTERED_COLLECTION_ITEMS[0]));

  RATINGS_BREAKDOWN = createRatingsBreakdownChartIfAvailable(
    FILTERED_COLLECTION_ITEMS[0].ratingsBreakdown
  );
  createWordCloud(getItemCategories(FILTERED_COLLECTION_ITEMS[0]));
  createPlaysChartIfAvailable(FILTERED_COLLECTION_ITEMS[0].plays);

  // Draw Insights
  runInsights(collection);

  // Draw Global Stats
  await runGlobalStats();

  // Create Waypoints
  await addAllWaypoints(
    getWaypointList(["#insights-header", "#global-stats-header"])
  );

  // Create Scroll Animations
  $(document).ready(function () {
    $(".btn-group").localScroll({ duration: 800 });
  });

  // Turn on tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // HTML Fixes
  $(".row-wrapper")
    .last()
    .removeClass("my-4")
    .addClass("mt-4")
    .addClass("mb-10");
  $("#insights .card-columns").last().addClass("mb-10");
};

run();
