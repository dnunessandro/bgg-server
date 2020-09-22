const runGlobalStats = async () => {
  // Read Global Community Stats
  let response = await axios(`${API_URL}/statistics/collections`);
  const collectionStats = response.data.stats;

  // Read Global Boardgame Stats
  response = await axios(`${API_URL}/statistics/boardgames`);
  const boardgameStats = response.data.stats;

  // Add Boardgame Golde Age Subtitle
  $("#global-stats").append(
    '<h2 id="golden-age-title" class="text-center mt-5">The Golden Age</h2>'
  );

  // Add Boardgame Golden Age Description
  $("#global-stats").append(
    `<p id="golden-age-title" class="description text-center">Go through the transformations that shaped the boardgame universe and 
  brought us to the current <strong>Golden Age</strong>.</p>`
  );

  // Draw Release Year Histogram
  let rowId = "release-year-hist";
  let title = "Boardgames Popularity over the Years";
  let p = `Looking at the release year of the boardgames owned by the <em>BGG Explorer</em> users, 
  it's easy to see how much the hobby has grown in the last few decades. The growth has been exponential and 
  it shows no signs of slowing down as the number of boardgames released each year is still on the rise.`;
  createGlobalStatsRow(rowId, title, p);
  // drawGlobalStatsHistChart(
  //   rowId + "-canvas",
  //   processYearHist(boardgameStats.yearHist),
  //   "Year",
  //   "Released Boardgames",
  //   { color: BASE_COLOR, xMin: 1950, xMax: new Date().getFullYear() - 1 }
  // );
  drawGlobalStatsTrendChart(
    rowId + "-canvas",
    { boardgamesReleased: processYearHist(boardgameStats.yearHist) },
    "Year",
    "Boardgames Released",
    { xMin: 1950, xMax: new Date().getFullYear() - 1, legendFlag: false }
  );

  // Draw Year Registered Histogram
  rowId = "year-registered-hist";
  title = "Users Registered over the Years";
  p = `More and more boardgamers have been joining the community as suggested by the registration year of the 
  BGG users: while a good chunk of the <em>BGG Explorer</em> users
  `;
  createGlobalStatsRow(rowId, title, p);
  // drawGlobalStatsHistChart(
  //   rowId + "-canvas",
  //   processYearHist(collectionStats.yearRegisterdHist),
  //   "Year",
  //   "Users Registered",
  //   { color: BASE_COLOR, xMin: 2000, xMax: 2019 }
  // );
  drawGlobalStatsTrendChart(
    rowId + "-canvas",
    { usersRegistered: processYearHist(collectionStats.yearRegisterdHist) },
    "Year",
    "Users Registered",
    { xMin: 2000, xMax: new Date().getFullYear() - 1, legendFlag: false }
  );

  // Draw Artists, Designers and Publishers Trend

  rowId = "people-involved-trend";
  title = "Growing Community";
  const uniqueMagicArtists = await getBoardgameUniquePeople(463, "artists");
  p = `This growth is equally apparent by the increasing number of people involved in this industry: 
  this chart shows the number of people involved in the publishing, design and illustration of boardgames 
  released each year since 1950. <br><br>Oh, wondering what is that artistic spike in 1993? 
  That is mainly driven by the release of a certain card game you have might have heard about: 
  <a href="https://boardgamegeek.com/boardgame/463/magic-gathering">Magic: The Gathering</a>, whose cards have
  been illustrated by a whooping <strong>${uniqueMagicArtists}</strong> different artists!`;
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
    { xMin: 1950, xMax: new Date().getFullYear() - 1 }
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
    { xMin: 2000, xMax: new Date().getFullYear() - 1, legendFlag: false }
  );

  // Draw User Rating vs Year Published
  let boardgameSample = await getBucketedBoardgameSample(
    BOARDGAME_SAMPLE_SIZE,
    BOARDGAME_SAMPLE_YEARS_SPLITS,
    BOARDGAME_SAMPLE_OWNED_THRESHOLD,
    "yearPublished"
  );
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
    {
      xMin: 1950,
      xMax: new Date().getFullYear() - 1,
      yMin: 2,
      yMax: 10,
      color: BASE_COLOR,
    }
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
  drawGlobalStatsSpiderChart(rowId + "-canvas", statsSeries, {replaceLabels: FIELD_LABEL_REPLACE_MAP['category']});

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
  drawGlobalStatsSpiderChart(rowId + "-canvas", statsSeries, {replaceLabels: FIELD_LABEL_REPLACE_MAP['mechanic']});

  // Add User Trends Subtitle
  $("#global-stats").append(
    '<h2 id="user-rating-trends-title" class="text-center my-5">Trends in User Ratings</h2>'
  );

  // Draw User Rating vs Weight
  boardgameSample = await getBucketedBoardgameSample(
    BOARDGAME_SAMPLE_SIZE,
    [2000, new Date().getFullYear()],
    BOARDGAME_SAMPLE_OWNED_THRESHOLD,
    "yearPublished"
  );
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
