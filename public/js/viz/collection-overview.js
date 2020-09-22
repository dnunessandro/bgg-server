const drawCollectionOverview = (collectionItems) => {
  // Change Chart Dimensions
  $("#collection-overview-chart").height(
    (collectionItems.length > COLLECTION_OVERVIEW_NUM_NODES / 2 ? 800 : 400) /
      (checkIfMobile() ? SVG_HEIGHT_MOBILE_FACTOR : 1)
  );

  // Get Chart Dimensions
  const chartWidth = $("#collection-overview-chart").width();
  const chartHeight = $("#collection-overview-chart").height();

  // Get SVG Element
  const svg = d3
    .select("#collection-overview-chart")
    .select("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  // Create Scales
  const radiusScale = createRadiusScale(
    NODE_SIZE_SCALE_DOMAIN_MAP[ACTIVE_NODE_SIZE_FIELD],
    [
      MIN_NODE_RADIUS_FACTOR * chartHeight,
      Math.min(MAX_NODE_RADIUS_FACTOR * chartHeight, MAX_NODE_RADIUS_ABS),
    ]
  );
  const nodeXAxisScale = createNodeAxisScale(
    collectionItems.length > COLLECTION_OVERVIEW_NUM_NODES / 2
      ? collectionItems.length / 2 + 1
      : collectionItems.length,
    chartWidth
  );

  // Create Random Color Array
  const colorsArray = collectionItems.map(
    (d) =>
      COLLECTION_OVERVIEW_PALETTE[
        Math.floor(Math.random() * COLLECTION_OVERVIEW_PALETTE.length)
      ]
  );

  // Add node radius to data
  collectionItems.forEach((d) => {
    d.x = chartWidth / 2;
    d.y = chartHeight / 2;
    d.radius = getNodeRadius(
      d[ACTIVE_NODE_SIZE_FIELD],
      radiusScale,
      radiusScale(NODE_SIZE_SCALE_DOMAIN_MAP[ACTIVE_NODE_SIZE_FIELD][0])
    );
  });

  // Comput label positions for linearized configuration
  const labelsPositions = computeNodeLabelsPositions(collectionItems);

  // Create Node Groups, Shapes and Labels
  let nodeGroups = svg.selectAll("g.node-group").data(collectionItems);
  nodeGroups.exit().remove();
  const nodeGroupsEnter = nodeGroups
    .enter()
    .append("g")
    .classed("node-group", true);

  nodeGroupsEnter.append("path").classed("node-line", true);
  nodeGroupsEnter
    .append("circle")
    .classed("node-circle", true)
    .style("fill", BASE_COLOR);
  nodeGroupsEnter.append("rect").classed("node-rect", true);
  nodeGroupsEnter.append("text").classed("node-text", true);
  nodeGroups = nodeGroups.merge(nodeGroupsEnter);

  nodeGroups
    .style("opacity", 0)
    .transition()
    .delay((_, i) => parseInt(i * 5))
    .style("opacity", 1);

  // Draw Lines
  const line = d3.line();
  nodeGroups
    .select(".node-line")
    .attr(
      "d",
      line([
        [0, 0],
        [0, 0],
      ])
    )
    .transition()
    .duration(1000)
    .ease(d3.easePoly)
    // .style("stroke", (_,i)=>colorsArray[i])
    .attr("d", function (d, i) {
      const yPos = NODE_LINEAR_BOOL ? labelsPositions[i].y : 0;
      return line([
        [0, 0],
        [0, yPos],
      ]);
    })
    .style("stroke", (_, i) => colorsArray[i]);

  nodeGroups
    .select("circle")
    .transition()
    .duration(1000)
    .style(
      "fill",
      // (d) => d3.schemeTableau10.slice(0, 9)[Math.floor(Math.random() * 7) + 1]
      (_, i) => colorsArray[i]
    )
    .ease(d3.easePoly)
    .attr("r", (d) =>
      getNodeRadius(
        d[ACTIVE_NODE_SIZE_FIELD],
        radiusScale,
        radiusScale(NODE_SIZE_SCALE_DOMAIN_MAP[ACTIVE_NODE_SIZE_FIELD][0])
      )
    );
  nodeGroups
    .select("text")
    .text((d) =>
      d.name.length < MAX_NODE_LABEL_CHARACTERS
        ? d.name
        : d.name.slice(0, MAX_NODE_LABEL_CHARACTERS - 3) + "..."
    )
    .attr("transform", function (d, i) {
      const rect = d3.select(this.parentNode).select("rect").nodes()[0];

      // Adjust labels going outside bounds because of label size
      // Get node position
      const nodeX =
        i <= collectionItems.length / 2
          ? nodeXAxisScale(i)
          : nodeXAxisScale(i - collectionItems.length / 2);

      // Get translation values
      let leftEdgeLabelTranslation = NODE_LINEAR_BOOL
        ? rect.getBBox().width / 2 > nodeX
          ? (rect.getBBox().width / 2 - nodeX) * 1.5
          : 0
        : 0;
      let rightEdgeLabelTranslation = NODE_LINEAR_BOOL
        ? rect.getBBox().width / 2 > chartWidth - nodeX
          ? (rect.getBBox().width / 2 - (chartWidth - nodeX)) * 1.5
          : 0
        : 0;

      return `translate(${
        leftEdgeLabelTranslation - rightEdgeLabelTranslation
      },${NODE_LINEAR_BOOL ? labelsPositions[i].y : 0})`;
    });

  // Adjust Rect Width and Height
  const textWidthArray = getNodeTextWidthArray(d3.selectAll(".node-text"));
  const textHeightArray = getNodeTextHeightArray(d3.selectAll(".node-text"));

  nodeGroups
    .select("rect")
    .attr("width", (_, i) => textWidthArray[i] + 12)
    .attr("height", (_, i) => textHeightArray[i] + 4)
    .attr("rx", 4)
    .attr("transform", function (d, i) {
      // Adjust labels going outside bounds because of label size
      // Get node position
      const nodeX =
        i <= collectionItems.length / 2
          ? nodeXAxisScale(i)
          : nodeXAxisScale(i - collectionItems.length / 2);

      // Get translation values
      let leftEdgeLabelTranslation = NODE_LINEAR_BOOL
        ? this.getBBox().width / 2 > nodeX
          ? (this.getBBox().width / 2 - nodeX) * 1.5
          : 0
        : 0;
      let rightEdgeLabelTranslation = NODE_LINEAR_BOOL
        ? this.getBBox().width / 2 > chartWidth - nodeX
          ? (this.getBBox().width / 2 - (chartWidth - nodeX)) * 1.5
          : 0
        : 0;

      return (
        "translate(" +
        ((-textWidthArray[i] - 12) / 2 +
          leftEdgeLabelTranslation -
          rightEdgeLabelTranslation) +
        "," +
        ((-textHeightArray[i] - 6) / 2 +
          (NODE_LINEAR_BOOL ? labelsPositions[i].y : 0)) +
        ")"
      );
    })
    .style("fill", (_, i) => colorsArray[i]);

  return nodeGroups;
};

const createSidepanelELs = (collectionItems) => {
  Object.keys(OVERVIEW_SP_BTN_TO_FIELD_MAP).forEach((k) => {
    createSidepanelBtnEL(
      k,
      collectionItems,
      OVERVIEW_SP_BTN_TO_FIELD_MAP[k],
      NODE_FORCE
    );
  });
};

const createSidepanelBtnEL = (btnId, collectionItems, nodeField) => {
  $("#" + btnId).on("click", (_) => {
    // Set Active Node Size Field
    ACTIVE_NODE_SIZE_FIELD = nodeField;

    // Change Linear Configuration Bool
    NODE_LINEAR_BOOL = $("#" + btnId).hasClass("btn-primary") ? false : true;

    // Filter Collection Items
    let filtererdCollectionItems = sortCollectionItems(
      collectionItems,
      NODE_SORT_BOOL ? ACTIVE_NODE_SIZE_FIELD : "name"
    );

    if (NODE_SORT_BOOL) {
      d3.selectAll(".node-group").remove();
      const nodeGroups = drawCollectionOverview(filtererdCollectionItems);
      createNodeGroupELs();
      NODE_FORCE = createNodesForce(filtererdCollectionItems, nodeGroups);
      NODE_FORCE.alpha(1);
    } else {
      drawCollectionOverview(filtererdCollectionItems);
    }

    updateNodesForce(filtererdCollectionItems);
    enableDisableSidepanelButtons(btnId);
  });
};

const enableDisableSidepanelButtons = (btnId) => {
  const btnField = OVERVIEW_SP_BTN_TO_FIELD_MAP[$("#" + btnId).prop("id")];

  if (
    !(
      $("#" + btnId).hasClass("dropdown-toggle") ||
      $("#" + btnId).hasClass("dropdown-item")
    )
  ) {
    $("#collection-overview-sidepanel " + ":button")
      .not("#" + btnId)
      .not("#" + "btnSort")
      .removeClass("btn-primary")
      .addClass("btn-dark");

    $("#" + btnId)
      .toggleClass("btn-dark")
      .toggleClass("btn-primary");
  }

  if ($("#" + btnId).hasClass("dropdown-item")) {
    const btnClass = $("#" + btnId)
      .prop("class")
      .split(" ")
      .slice(0, 1);

    $("#collection-overview-sidepanel " + ":button")
      .not("#" + btnId)
      .not("#" + "btnSort")
      .removeClass("btn-primary")
      .addClass("btn-dark");

    $("#" + btnId)
      .toggleClass("btn-dark")
      .toggleClass("btn-primary");

    if ($("." + btnClass + ".btn-primary")[0]) {
      $("#" + btnClass)
        .removeClass("btn-dark")
        .addClass("btn-primary");
    } else {
      $("#" + btnClass)
        .removeClass("btn-primary")
        .addClass("btn-dark");
    }
  }
};

const createSortSidepanelBtnEL = (collectionItems) => {
  $("#btnSort").on("click", (_) => {
    // Change Sort Bool
    NODE_SORT_BOOL = !NODE_SORT_BOOL;

    // Filter Collection Items
    let filtererdCollectionItems = sortCollectionItems(
      collectionItems,
      NODE_SORT_BOOL ? ACTIVE_NODE_SIZE_FIELD : "name"
    );
    $("#btnSort").toggleClass("btn-dark").toggleClass("btn-primary");

    d3.selectAll(".node-group").remove();
    const nodeGroups = drawCollectionOverview(filtererdCollectionItems);
    NODE_FORCE = createNodesForce(filtererdCollectionItems, nodeGroups);
    updateNodesForce(filtererdCollectionItems);
    createNodeGroupELs();
  });
};

// const createWindowResizeEL = (collectionItems) => {
//   $(window).resize(
//     debounce((_) => {
//       nodeGroups = drawCollectionOverview(collectionItems);
//       updateNodesForce(collectionItems);
//     })
//   );
// };

const createOverviewSvgEL = () => {
  $("#collection-overview-svg").on("click", function (e) {
    if (e.target == this) {
      NODE_CLICKED_BOOL = false;
      d3.selectAll(".node-circle").classed("clicked", false);
      d3.selectAll(".node-rect").classed("clicked", false);
      $("#boardgame-info").removeClass("show").addClass("hide");
      BOARDGAME_INFO_VAR =
        $("#boardgame-info").length == 0
          ? BOARDGAME_INFO_VAR
          : $("#boardgame-info").slideUp("slow", function () {
              $("#boardgame-info").detach();
              Waypoint.refreshAll();
            });
    }
  });
};

const createIncompleteCollectionWarning = (nItems) => {
  const nodesLimit = getOverviewNumNodes();

  if (nItems > nodesLimit) {
    $("#bgg-explorer-btn-group")
      .after(`<div id="huge-collection-warning-wrapper"><div id="huge-collection-warning" class="slide-top alert alert-warning 
      alert-dismissible fade show mx-auto mt-3 mb-5" style="border: 2px solid ${DARK_COLOR}" role="alert">
        <h5 class="text-center my-3"><i class="fas fa-exclamation-circle"></i> <strong>Limited Screen Size</strong></h5><p class="text-justify">
         Due to the limited screen size, only the <strong>${nodesLimit}</strong> games you rated the highest are shown in the <em>Free
          Exploration</em> view. ${
            checkIfMobile()
              ? "Try accessing through a desktop device to view your entire collection."
              : ""
          }</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div></div>`);
  }
};
