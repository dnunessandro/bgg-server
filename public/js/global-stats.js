const runGlobalStats = async () => {
  // Read Global Community Stats
  let response = await axios(`${API_URL}/statistics/collections`);
  const collectionStats = response.data.stats;

  // Read Global Boardgame Stats
  response = await axios(`${API_URL}/statistics/boardgames`);
  const boardgameStats = response.data.stats;

  // Get Boardgame Sample
  response = await axios(
    `${API_URL}/boardgames/sample/${BOARDGAME_SAMPLE_SIZE}?owned=${BOARDAGEM_SAMPLE_OWNED_THRESHOLD}`
  );
  let boardgameSample = response.data;

  // Add Boardgame Growth Subtitle
  $("#global-stats").append(
    '<h2 id="boardgames-popularity-trends-title" class="text-center my-5">The Golden Age</h2>'
  );

  // Draw Release Year Histogram
  let rowId = "release-year-hist";
  let title = "Boardgames Popularity over the Years";
  let p = `Looking at the data, it's undeniable how much the hobby has grown in the last few decades. The growth has been exponential and it shows 
  no signs of slowing down as the number of boardgames released each year is still on the rise.`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsHistChart(
    rowId + "-canvas",
    processYearHist(boardgameStats.yearHist),
    "Year",
    "Released Boardgames",
    { color: BASE_COLOR, xMin: 1950, xMax: 2019 }
  );

  // Draw Year Registered Histogram
  rowId = "year-registered-hist";
  title = "Users Registered over the Years";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores 
  labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsHistChart(
    rowId + "-canvas",
    processYearHist(collectionStats.yearRegisterdHist),
    "Year",
    "Users Registered",
    { color: BASE_COLOR, xMin: 2000, xMax: 2019 }
  );

  // Draw Artists, Designers and Publishers Trend
  rowId = "people-involved-trend";
  title = "Growing Community";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores 
    labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsTrendChart(
    rowId + "-canvas",
    processStatUniqueDist(
      boardgameStats,
      ["publishers", "designers", "artists"],
      1950,
      2019
    ),
    "Year",
    "Count",
    { xMin: 1950, xMax: 2019 }
  );

  // Draw Relevant Familues Trends
  rowId = "families-trend";
  title = "Families Trends";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores 
    labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsTrendChart(
    rowId + "-canvas",
    processStatUniqueDist(
      boardgameStats["familyDistPerYear"],
      ["kickstarter"],
      2000,
      2019
    ),
    "Year",
    "Kickstarter Releases",
    { xMin: 2000, xMax: 2019, legendFlag: false }
  );

  // Draw User Rating vs Year Published
  rowId = "user-rating-year-corr";
  title = "Growth in Quality";
  p = `This rapid growth is expressed not only through the sheer amount of new releases but also in terms of the overall quality of newer games. 
    When observing the relationship between the <em>Average User Rating</em> by the <em>BoardGameGeek</em> community and the <em>Release Year</em> of the 
    boardgames in the database, a clear pattern of correlation emerges: on average, a boardgame released last year is rated almost 1 point higher 
    than a boardgame released 30 years ago!`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsCorrChart(
    rowId + "-canvas",
    boardgameSample,
    boardgameStats.userRatingYearCorr.trend,
    "yearPublished",
    "averageRating",
    { xMin: 1980, xMax: 2020, yMin: 6, yMax: 8, color: BASE_COLOR }
  );

  // Draw Category Trend
  rowId = "category-spider";
  title = "Category Trends";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores 
  labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  let statsSeries = {};
  statsSeries[STAT_REF_YEAR] = getStatDistAtYear(
    boardgameStats["categoryDistPerYear"],
    STAT_REF_YEAR
  );
  statsSeries[new Date().getFullYear()] = getStatDistAtYear(
    boardgameStats["categoryDistPerYear"],
    new Date().getFullYear()
  );
  drawGlobalStatsSpiderChart(rowId + "-canvas", statsSeries);

  // Draw Mechanic Trend
  rowId = "mechanic-spider";
  title = "Mechanics Trends";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit 
  maiores labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  statsSeries = {};
  statsSeries[STAT_REF_YEAR] = getStatDistAtYear(
    boardgameStats["mechanicDistPerYear"],
    STAT_REF_YEAR
  );
  statsSeries[new Date().getFullYear()] = getStatDistAtYear(
    boardgameStats["mechanicDistPerYear"],
    new Date().getFullYear()
  );
  drawGlobalStatsSpiderChart(rowId + "-canvas", statsSeries);

  // Add User Trends Subtitle
  $("#global-stats").append(
    '<h2 id="user-rating-trends-title" class="text-center my-5">Trends in User Ratings</h2>'
  );

  // Draw User Rating vs Weight
  rowId = "user-rating-weight-corr";
  title = "Weight";
  p = `(R<sup>2</sup>: ${boardgameStats.userRatingWeightCorr.spearman}). Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsCorrChart(
    rowId + "-canvas",
    boardgameSample,
    boardgameStats.userRatingWeightCorr.trend,
    "averageWeight",
    "averageRating",
    { xMin: 1, xMax: 4, yMin: 5, yMax: 9, color: BASE_COLOR }
  );

  // Draw User Rating vs Play Time
  rowId = "user-rating-play-time-corr";
  title = "Play Time";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsCorrChart(
    rowId + "-canvas",
    boardgameSample,
    boardgameStats.userRatingPlayTimeCorr.trend,
    "playTime",
    "averageRating",
    { xMin: 20, xMax: 200, yMin: 6, yMax: 8, color: BASE_COLOR }
  );

  // Draw User Rating vs Price
  rowId = "user-rating-price-corr";
  title = "Price";
  p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores labore cumque rerum eum temporibus?`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsCorrChart(
    rowId + "-canvas",
    boardgameSample,
    boardgameStats.userRatingPriceCorr.trend,
    "medianPriceNew",
    "averageRating",
    { xMin: 10, xMax: 100, yMin: 6.5, yMax: 8, color: BASE_COLOR }
  );

  // Add Modal Button
  createModalButton(
    "global-stats-method-button",
    "global-stats-method-modal-body"
  );

  // Activate Popovers
  $('[data-toggle="popover"]').popover();
};
