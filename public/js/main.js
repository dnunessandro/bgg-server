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
  drawPlayTimeChart(collectionItems[0]);
  checkIfMobile()
    ? drawPlayerCountChartMobile(collectionItems[0])
    : drawPlayerCountChart(getPlayerCountData(collectionItems[0]));

  RATINGS_BREAKDOWN = createRatingsBreakdownChartIfAvailable(
    collectionItems[0].ratingsBreakdown
  );
  createWordCloud(getItemCategories(collectionItems[0]));
  createPlaysChartIfAvailable(collectionItems[0].plays);

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
