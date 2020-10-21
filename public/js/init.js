let COLLECTION_OVERVIEW_NUM_NODES = getOverviewNumNodes();
let ACTIVE_NODE_SIZE_FIELD = getActiveNodeSizeField()
  ? getActiveNodeSizeField()
  : NODE_SIZE_DEFAULT_FIELD;
let NODE_SORT_BOOL = false;
let NODE_LINEAR_BOOL = false;
let NODE_FORCE = null;
let NODE_LABEL_FORCE = null;
let NODE_CLICKED_BOOL = false;
let RATINGS_BREAKDOWN = null;
let RATINGS_BREAKDOWN_CANVAS_HEIGHT =
  parseInt($("#boardgame-tooltip").css("height")) * (checkIfMobile() ? 0.295 : 0.306);

let BOARDGAME_INFO_VAR = $("#boardgame-info");
let SPIDER_CHARTS = {};

// HTML Fixes
$(".link-automated-insights").css(
  "line-height",
  parseInt($(".link-automated-insights").css("height")) -
    parseInt($(".link-automated-insights").css("padding-top")) -
    parseInt($(".link-automated-insights").css("padding-bottom")) +
    "px"
);
if (!checkIfMobile()) {
  $(".link-free-exploration").css(
    "line-height",
    parseInt($(".link-free-exploration").css("height")) -
      parseInt($(".link-free-exploration").css("padding-top")) -
      parseInt($(".link-free-exploration").css("padding-bottom")) +
      "px"
  );
  $(".link-community-stats").css(
    "line-height",
    parseInt($(".link-community-stats").css("height")) -
      parseInt($(".link-community-stats").css("padding-top")) -
      parseInt($(".link-community-stats").css("padding-bottom")) +
      "px"
  );
}

// Change Categories Buttons Background Color
$("#btnCategory").css("background-color", CATEGORY_COLOR_MAP["category"]);
$("#btnMechanic").css("background-color", CATEGORY_COLOR_MAP["mechanic"]);
$("#btnFamily").css("background-color", CATEGORY_COLOR_MAP["family"]);

// Change Bootstrap Classes
if (checkIfMobile()) {
  $("#user-profile-btn-group").removeClass("btn-group-lg");
  $("#user-profile-btn-group").addClass("btn-group-md");
  $(".btn-group-sm .btn").removeClass("mx-1");
  $(".btn-group-sm .btn").css("margin-left", "2px");
  $(".btn-group-sm .btn").css("margin-right", "2px");
  $("#global-stats-method-button").addClass("btn-sm");
  $("#ignored-boardgames-button").addClass("btn-sm");
  $(".modal-footer .btn").addClass("btn-sm");
}
