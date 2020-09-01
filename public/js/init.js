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
let BOARDGAME_INFO_VAR = $("#boardgame-info");
let SPIDER_CHARTS = {}

// Change Categories Buttons Background Color
$("#btnCategory").css("background-color", CATEGORY_COLOR_MAP["category"]);
$("#btnMechanic").css("background-color", CATEGORY_COLOR_MAP["mechanic"]);
$("#btnFamily").css("background-color", CATEGORY_COLOR_MAP["family"]);

