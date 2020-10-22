const API_URL =
  (window.location.hostname == "localhost" ? "http://" : "https://") +
  (window.location.hostname == "localhost"
    ? window.location.host
    : "sn-bgg-server.herokuapp.com");

// COLORS ///////////////////////////
const BASE_COLOR = "#e5989b";
const SECONDARY_COLOR = "#ffb4a2";
const LIGHT_COLOR = "#ffcdb2";
const LIGHT_COLOR_02 = "#ffcdb233";
const DARK_COLOR = "#b5838d";
const NEUTRAL_COLOR = "#6d6875";
const BACKGROUND_COLOR = "#eee";

const GREEN_COLOR = "#81b29a";
const YELLOW_COLOR = "#ffbf69";
const RED_COLOR = "#e07a5f";
const GRAY_COLOR = "#c7ccdb";
const DEFAULT_COLOR = "#118ab2";

//f6bd60

const COLLECTION_OVERVIEW_PALETTE = [
  "#9c89b8",
  "#f0a6ca",
  "#efc3e6",
  "#b8bedd",
];

const CONTAINER_FLUID_BREAKPOINT = 1200;

// LOGIN ///////////////
const LOAD_TIME_MAP = {
  0: [1, 2],
  300: [2, 3],
  500: [3, 5],
  700: [5, 8],
};

// COLLECTION OVERVIEW ///////////////
const CHART_HEIGHT = checkIfMobile() ? 220 : 350;
const MIN_NODE_RADIUS_FACTOR = 0.03;
const MAX_NODE_RADIUS_FACTOR = checkIfMobile() ? 0.15 : 0.1;
const MAX_NODE_RADIUS_ABS = 50;
const DEFAULT_NODE_RADIUS_FACTOR = 0.04;
const NON_LINEAR_NODE_RADIUS_FACTOR = 0.08;
const MAX_NODE_LABEL_CHARACTERS = checkIfMobile() ? 15 : 20;
const SVG_HEIGHT_MOBILE_FACTOR = 1.1;
const LABEL_X_PAD_FACTOR = 0.05;

const NODE_SIZE_DEFAULT_FIELD = "averageRating";
const NODE_SORT_DEFAULT_FIELD = "name";

const OVERVIEW_SP_BTN_TO_FIELD_MAP = {
  btnRatingUser: "userRating",
  btnRatingAvg: "averageRating",
  btnRatingBgg: "bayesAverageRating",
  btnReleaseYear: "yearPublished",
  btnUsersOwned: "numOwned",
  btnPlayersRecom: "recommendedPlayers",
  btnPlayersMin: "minPlayers",
  btnPlayersMax: "maxPlayers",
  btnPlayTimeAvg: "playTime",
  btnPlayTimeMin: "minPlayTime",
  btnPlayTimeMax: "maxPlayTime",
  btnPlays: "numPlays",
  btnWeight: "averageWeight",
  btnPrice: "averagePrice",
};

const NODE_SIZE_SCALE_DOMAIN_MAP = {
  userRating: [4, 9],
  averageRating: [6, 8],
  bayesAverageRating: [6, 8],
  yearPublished: [2000, 2018],
  numOwned: [5000, 80000],
  recommendedPlayers: [1, 7],
  minPlayers: [1, 5],
  maxPlayers: [2, 10],
  playTime: [15, 180],
  minPlayTime: [15, 180],
  maxPlayTime: [15, 180],
  numPlays: [0, 50],
  name: [0, 1],
  averageWeight: [1, 4],
  averagePrice: [10, 120],
};

const NUM_NODES_BREAKPOINT_MAP = {
  0: 50,
  576: 70,
  768: 100,
  992: 120,
  1200: 150,
  1600: 200,
  2000: 250,
  2400: 300,
  3000: 400,
};

const RATING_CLASSES_MAP = {
  [GRAY_COLOR]: [0, 0],
  [RED_COLOR]: [0.1, 5.999],
  [YELLOW_COLOR]: [6, 7.999],
  [GREEN_COLOR]: [8.0, 10],
};

const PLAYER_COUNT_RECOMMENDATION_MAP = {
  Great: [0.9, 1],
  Ok: [0.4, 0.8999],
  Bad: [0, 0.3999],
};

const PLAYER_COUNT_COLOR_MAP = {
  Best: GREEN_COLOR,
  Great: GREEN_COLOR,
  Ok: YELLOW_COLOR,
  Bad: RED_COLOR,
  "Not Supported": GRAY_COLOR,
};

const WEIGHT_MAP = {
  [GREEN_COLOR]: [0, 1.999],
  [YELLOW_COLOR]: [2, 3.499],
  [RED_COLOR]: [3.5, 5],
};

const PRICE_MAP = {
  [GREEN_COLOR]: [0, 19.999],
  [YELLOW_COLOR]: [20, 49.999],
  [RED_COLOR]: [50, 10000],
};

const OWNERS_MAP = {
  [GREEN_COLOR]: [0, 9999],
  [YELLOW_COLOR]: [10000, 99999],
  [RED_COLOR]: [100000, 1000000],
};

const PLAY_TIME_MAP = {
  [GREEN_COLOR]: [0, 30],
  [YELLOW_COLOR]: [31, 120],
  [RED_COLOR]: [121, 10000],
};

const PLAYER_COUNT_MAP = {
  [GREEN_COLOR]: [0, 2],
  [YELLOW_COLOR]: [3, 6],
  [RED_COLOR]: [7, 10000],
};

const CATEGORY_COLOR_MAP = {
  category: DARK_COLOR,
  family: SECONDARY_COLOR,
  mechanic: BASE_COLOR,
};

const PLAYS_COLOR_MAP = {
  0: NEUTRAL_COLOR,
  1: DARK_COLOR,
};

window.odometerOptions = {
  format: "(d).d", // Change how digit groups are formatted, and how many digits are shown after the decimal point
  duration: 1000, // Change how long the javascript expects the CSS animation to take
};

// GLOBAL STATS
const BOARDGAME_SAMPLE_SIZE = 300;
const BOARDGAME_SAMPLE_OWNED_THRESHOLD = 10000;
const BOARDGAME_SAMPLE_YEARS_SPLITS = [
  1950,
  1975,
  1980,
  1990,
  2000,
  2010,
  new Date().getFullYear(),
];
const STAT_REF_YEAR = 2010;

const FIELD_LABEL_MAP = {
  averageWeight: "Weight",
  averageRating: "User Rating",
  bayesAverageRating: "BGG Rating",
  recommendedPlayers: "Recommended Player Count",
  minPlayers: "Minimum Player Count",
  maxPlayers: "Player Limit",
  playTime: "Play Time",
  medianPrice: "Price (USD)",
  yearPublished: "Release Year",
  owned: "Owners",
  weight: "Weight",
  userRating: "User Rating",
  playTime: "Play Time (Minutes)",
  nPlays: "#Plays",
  price: "Price (USD)",
  timePlayed: "Time Played (Hours)",
  designers: "Designers",
  publishers: "Publishers",
  artists: "Artists",
  families: "Families",
  mechanics: "Mechanics",
  categories: "Categories",
  kickstarter: "Kickstarter",
  miniatures: "Games with Miniatures",
};

const STAT_COLOR_MAP = {
  designers: DARK_COLOR,
  publishers: NEUTRAL_COLOR,
  artists: SECONDARY_COLOR,
  families: DARK_COLOR,
  mechanics: BASE_COLOR,
  categories: LIGHT_COLOR,
  kickstarter: BASE_COLOR,
  solitaire: GREEN_COLOR,
  miniatures: DARK_COLOR,
  boardgamesReleased: BASE_COLOR,
  usersRegistered: BASE_COLOR,
};

const STAT_UNIQUE_MAP = {
  categories: "categoryUniqueDistPerYear",
  mechanics: "mechanicUniqueDistPerYear",
  families: "familyUniqueDistPerYear",
  designers: "designerUniqueDistPerYear",
  artists: "artistUniqueDistPerYear",
  publishers: "publisherUniqueDistPerYear",
  kickstarter: "Crowdfunding: Kickstarter",
  solitaire: "Players: Games with Solitaire Rules",
  miniatures: "Components: Miniatures",
};

const SPIDER_CHART_COLORS = [DARK_COLOR, BASE_COLOR, NEUTRAL_COLOR];

// INSIGHTS
const DEFAULT_INSIGHTS_IMG = "img/user-solid.png";

const RATING_WEIGHT_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_RECOMMENDED_PLAYERS_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_PLAY_TIME_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_MAX_PLAYERS_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_PLAYS_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_TIME_PLAYED_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_PRICE_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const RATING_YEAR_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const PLAYS_WEIGHT_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const PLAYS_PLAY_TIME_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const PLAYS_RECOMMENDED_PLAYERS_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const PLAYS_MAX_PLAYERS_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const PLAYS_PRICE_CORR_MAP = {
  None: [0, 0.09999999],
  Low: [0.1, 0.199999],
  Moderate: [0.2, 0.499999],
  High: [0.5, 1],
};

const FIELD_TITLE_MAP = {
  category: "Categories",
  mechanic: "Mechanics",
  publisher: "Publishers",
  designer: "Designers",
  artist: "Artists",
};

const FIELD_LABEL_REPLACE_MAP = {
  category: { "Expansion for Base-game": "Expansion", Dice: "Dice Game" },
  mechanic: {
    "Area Majority / Influence": "Area Majority",
    "Simultaneous Action Selection": "Simultaneous Action",
  },
  publisher: {
    "Rebel Sp. z o.o.": "Rebel",
    "Korea Boardgames co., Ltd.": "Korea Boardgames",
    "Swan Panasia Co., Ltd.": "Swan Panasia",
    "テンデイズゲームズ (Ten Days Games)": "Ten Days Games",
    "Games Factory Publishing": "Games Factory",
    "Out of the Box Publishing": "Out of the Box",
    "Compaya.hu - Gamer Café Kft": "Gamer Café Kft",
    "Wm F. Drueke & Sons, Inc.": "Wm F. Drueke & Sons",
    "Bello Games New York, Inc.": "Bello Games New York",
    "Challenge Master Game Co Ltd": "Challenge Master Game",
    "Copp Clark Publishing Company": "Copp Clark",
    "פרש משחקים - Game Knight": "Game Knight",
    "Berwick's Toy Co. Ltd.": "Berwick's Toy",
    "Land of Beautiful Mind (سرزمین ذهن زیبا)": "Land of Beautiful Mind",
    "Winning Moves International Ltd": "Winning Moves International",
    "CEFA (Celulosa Fabril S. A.)": "Celulosa Fabril",
    "Kaissa Chess & Games": "Kaissa Chess",
  },
  designer: { "(Uncredited)": "Uncredited" },
  artist: {
    "(Uncredited)": "Uncredited",
    "Lee Brimmicombe-Wood": "Lee B. Wood",
  },
};

const FIELD_TOOLTIP_SUFFIX_MAP = {
  category: "Games (%)",
  mechanic: "Games (%)",
  publisher: "",
  designer: "",
  artist: "",
};

const SPIDER_CHART_ENTRIES = 10;
const INSIGHTS_HIGHLIGHT_COLOR = YELLOW_COLOR;

// USER INFO
const COLLECTION_MANUAL_UPDATE_TRESH = 3;
