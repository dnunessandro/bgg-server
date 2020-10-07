const runGlobalStats = async () => {
  // Read Global Community Stats
  let response = await axios(`${API_URL}/statistics/collections`);
  const collectionStats = response.data.stats;

  // Read Global Boardgame Stats
  response = await axios(`${API_URL}/statistics/boardgames`);
  const boardgameStats = response.data.stats;

  // // Add Boardgame Golde Age Subtitle
  // $("#global-stats").append(
  //   '<h2 id="golden-age-title" class="text-center mt-5">The Golden Age</h2>'
  // );

  // // Add Boardgame Golden Age Description
  // $("#global-stats").append(
  //   `<p id="golden-age-title" class="description text-center">Go through the transformations that shaped the boardgame universe and
  // brought us to the current <strong>Golden Age</strong>.</p>`
  // );

  // Draw Release Year Histogram
  const allBoardgames = getStatAtYear(
    processYearHist(boardgameStats.yearHist),
    10000
  );
  const oldBoardgames = getStatAtYear(
    processYearHist(boardgameStats.yearHist),
    STAT_REF_YEAR
  );
  const newBoardgames = allBoardgames - oldBoardgames;
  const proportion = Math.round(newBoardgames / oldBoardgames * 100) ;
  let rowId = "release-year-hist";
  let title = "Rise in Popularity";
  let p = `Looking at the release year of the boardgames owned by the <em>BGG Explorer</em> users, 
  it's easy to see how much the hobby has grown in the last few decades. The growth has been exponential and 
  it shows no signs of slowing down as the number of boardgames released each year is still on the rise.<br><br>
  In fact, in the last 10 years alone, the number of released boardgames is <span class="badge-pill badge-primary py-1">${proportion}%</span> times 
  larger than in the entire period before that!`;
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
    { xMin: 1950, xMax: new Date().getFullYear(), legendFlag: false }
  );

  // Draw User Rating vs Year Published
  let boardgameSample = await getBucketedBoardgameSample(
    BOARDGAME_SAMPLE_SIZE,
    BOARDGAME_SAMPLE_YEARS_SPLITS,
    BOARDGAME_SAMPLE_OWNED_THRESHOLD,
    "yearPublished"
  );
  rowId = "user-rating-year-corr";
  title = "Quality, Not Just Quantity";
  p = `This rapid growth is expressed not only through the sheer amount of new releases but also in terms of the overall quality of newer games. 
      When observing the relationship between a boardgame <em>Average Rating</em> and its <em>Release Year</em>, it is clear that more recent
      games have been consistently rated higher by <em>BoardGameGeek</em> users.`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsCorrChart(
    rowId + "-canvas",
    boardgameSample,
    boardgameStats.userRatingYearCorr.trend,
    "yearPublished",
    "averageRating",
    {
      xMin: 1950,
      xMax: new Date().getFullYear(),
      yMin: 0,
      yMax: 10,
      color: BASE_COLOR,
    }
  );

  // Draw Year Registered Histogram
  const allBoardgamers = getStatAtYear(
    processYearHist(collectionStats.yearRegisterdHist),
    10000
  );
  const oldBoardgamers = getStatAtYear(
    processYearHist(collectionStats.yearRegisterdHist),
    STAT_REF_YEAR
  );
  const newBoardgamers = allBoardgamers - oldBoardgamers;
  const oldBoardgamersPrct = Math.round(
    (oldBoardgamers / allBoardgamers) * 100
  );
  const newBoardgamersPrct = Math.round(
    (newBoardgamers / allBoardgamers) * 100
  );

  rowId = "year-registered-hist";
  title = "New Players";
  p = `More and more boardgamers have been joining the community as suggested by the registration year of the 
  <em>BoardGameGeek</em> users: while a good chunk of the community is made of old guard boardgamers, a signficant fraction 
  of new boardgamers is now also part of it (<span class="badge-pill badge-primary py-1">${newBoardgamersPrct}%</span> of the <em>BGG Explorer</em> 
  users registered their account on <em>BoardGameGeek</em> after ${STAT_REF_YEAR}).
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
    { xMin: 2000, xMax: new Date().getFullYear(), legendFlag: false }
  );

  // Draw Artists, Designers and Publishers Trend
  const uniqueMagicArtists = await getBoardgameUniquePeople(463, "artists");

  rowId = "people-involved-trend";
  title = "Growing Industry";
  p = `This growth is equally apparent by the increasing number of people involved in this industry: 
  this chart shows the number of people involved in the publishing, design and illustration of boardgames 
  released each year since 1950. <br><br>Oh, wondering what is that artistic spike in 1993? 
  That is mainly driven by the release of a certain card game you have might have heard about: 
  <a class="badge-pill badge-secondary py-1" href="https://boardgamegeek.com/boardgame/463/magic-gathering">Magic:&nbspThe&nbspGathering</a>, 
  probably the most most popular <em>Collectible Card Game</em> in history, whose cards have
  been illustrated by a whooping <span class="badge-pill badge-primary py-1">${uniqueMagicArtists}</span> different artists!`;
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
  title = "The Arrival of Kickstarter";
  p = `Love it or hate it, <a class="badge-pill badge-secondary py-1" href="https://www.kickstarter.com/" target="_blank">Kickstarter</a> has played a pivotal role in the
  boardgame industry, with an increasing number of games being released through this platform, either as a means of
  funding independent new designers or as a way of gauging interest and marketing by already established publishers.<br><br>
  Kickstarter releases have been closely associated with high production values and lots of miniatures. A great example -
  and one that pioneered the <em>Kickstarter</em> entry in the industry - is 
  <a class="badge-pill badge-secondary py-1" href="https://boardgamegeek.com/boardgame/113924/zombicide">Zombicide</a>, released in 2012, around the time
  the <em>Kickstarter</em> curve really starts to take off. Looking at both curves, a correlation between the two 
  is indisputable, however it seems that this association has been a bit overblown as the total number of <em>Kickstarter</em> releases still far exceeds the relases of miniatures boardgames.`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsTrendChart(
    rowId + "-canvas",
    processStatUniqueDist(
      boardgameStats["familyDistPerYear"],
      ["kickstarter", "miniatures"],
      2000,
      2019
    ),
    "Year",
    "Kickstarter Releases",
    { xMin: 2000, xMax: new Date().getFullYear() - 1 }
  );

  // Draw Category Trend
  let statsSeries = {};
  statsSeries[STAT_REF_YEAR] = getStatDistAtYear(
    boardgameStats["categoryDistPerYear"],
    STAT_REF_YEAR
  );
  statsSeries[new Date().getFullYear()] = getStatDistAtYear(
    boardgameStats["categoryDistPerYear"],
    new Date().getFullYear()
  );

  const cardGamesRatio = parseFloat(
    (
      statsSeries[new Date().getFullYear()]["Card Game"] /
      statsSeries[STAT_REF_YEAR]["Card Game"]
    ).toFixed(1)
  );
  const wargamesRatio = parseFloat(
    (
      statsSeries[new Date().getFullYear()]["Wargame"] /
      statsSeries[STAT_REF_YEAR]["Wargame"]
    ).toFixed(1)
  );
  const numExpansionsRef = statsSeries[STAT_REF_YEAR]["Expansion for Base-game"];
  const numExpansionsCurrent =
    statsSeries[new Date().getFullYear()]["Expansion for Base-game"];
  rowId = "category-spider";
  title = "An Assymetrical Growth";
  p = `This growth has, however, not been homogenous across the different boardgames genres. Comparing the most 
  common categories up until 2010 and 2020, we've seen a massive increase (<span class="badge-pill badge-primary py-1">${cardGamesRatio}x</span>)
  in the number of <em>Card Games</em> released, while, for example, <em>Wargames</em> have growth at a much more 
  steady rate (<span class="badge-pill badge-primary py-1">${wargamesRatio}x</span>) in comparison.<br><br>It is also interesting to see that 
  <em>Expansions</em> make up for a huge part of the total releases (currently, 
    <span class="badge-pill badge-primary py-1">${numExpansionsCurrent}</span> games tagged as <em>Expansions</em> can be found in the 
  <em>BGG Explorer</em> database), a tendency that was not as accentuated 10 years ago 
  (<span class="badge-pill badge-primary py-1">${numExpansionsRef}</span> games). `;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsSpiderChart(rowId + "-canvas", statsSeries, {
    replaceLabels: FIELD_LABEL_REPLACE_MAP["category"],
  });

  // Draw Mechanic Trend
  statsSeries = {};
  statsSeries[STAT_REF_YEAR] = getStatDistAtYear(
    boardgameStats["mechanicDistPerYear"],
    STAT_REF_YEAR
  );
  statsSeries[new Date().getFullYear()] = getStatDistAtYear(
    boardgameStats["mechanicDistPerYear"],
    new Date().getFullYear()
  );

  const coopGamesRatio = parseFloat(
    (
      statsSeries[new Date().getFullYear()]["Cooperative Game"] /
      statsSeries[STAT_REF_YEAR]["Cooperative Game"]
    ).toFixed(1)
  );
  const tileGamesRatio = parseFloat(
    (
      statsSeries[new Date().getFullYear()]["Tile Placement"] /
      statsSeries[STAT_REF_YEAR]["Tile Placement"]
    ).toFixed(1)
  );
  const setGamesRatio = parseFloat(
    (
      statsSeries[new Date().getFullYear()]["Set Collection"] /
      statsSeries[STAT_REF_YEAR]["Set Collection"]
    ).toFixed(1)
  );

  // const keys = Object.keys(statsSeries[STAT_REF_YEAR])
  // keys.forEach(k=>{
  //   console.log(k, (statsSeries[new Date().getFullYear()][k] / statsSeries[STAT_REF_YEAR][k]).toFixed(1))
  // })

  rowId = "mechanic-spider";
  title = "Boom in Cooperative Games";
  p = `The assymetry in the type of games that have thrived the most is also seen in the game mechanics.
  A rather surprising finding is how much the <em>Cooperative</em> games have grown, registering a
  <span class="badge-pill badge-primary py-1">${coopGamesRatio}x</span> in the last 10 years. At the
  other end of the spectrum are <em>Tile Placement</em> and <em>Set Collection</em> games, which have grown by
  <span class="badge-pill badge-primary py-1">${tileGamesRatio}x</span> and  
  <span class="badge-pill badge-primary py-1">${setGamesRatio}x</span> respectively, a significantly more modest increase.`;
  createGlobalStatsRow(rowId, title, p);
  drawGlobalStatsSpiderChart(rowId + "-canvas", statsSeries, {
    replaceLabels: FIELD_LABEL_REPLACE_MAP["mechanic"], 
  });

  // // Add User Trends Subtitle
  // $("#global-stats").append(
  //   '<h2 id="user-rating-trends-title" class="text-center my-5">Trends in User Ratings</h2>'
  // );

  // // Draw User Rating vs Weight
  // boardgameSample = await getBucketedBoardgameSample(
  //   BOARDGAME_SAMPLE_SIZE,
  //   [2000, new Date().getFullYear()],
  //   BOARDGAME_SAMPLE_OWNED_THRESHOLD,
  //   "yearPublished"
  // );
  // rowId = "user-rating-weight-corr";
  // title = "Weight";
  // p = `(R<sup>2</sup>: ${boardgameStats.userRatingWeightCorr.spearman}). Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores labore cumque rerum eum temporibus?`;
  // createGlobalStatsRow(rowId, title, p);
  // drawGlobalStatsCorrChart(
  //   rowId + "-canvas",
  //   boardgameSample,
  //   boardgameStats.userRatingWeightCorr.trend,
  //   "averageWeight",
  //   "averageRating",
  //   { xMin: 1, xMax: 4, yMin: 5, yMax: 9, color: BASE_COLOR }
  // );

  // // Draw User Rating vs Play Time
  // rowId = "user-rating-play-time-corr";
  // title = "Play Time";
  // p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores labore cumque rerum eum temporibus?`;
  // createGlobalStatsRow(rowId, title, p);
  // drawGlobalStatsCorrChart(
  //   rowId + "-canvas",
  //   boardgameSample,
  //   boardgameStats.userRatingPlayTimeCorr.trend,
  //   "playTime",
  //   "averageRating",
  //   { xMin: 20, xMax: 200, yMin: 6, yMax: 8, color: BASE_COLOR }
  // );

  // // Draw User Rating vs Price
  // rowId = "user-rating-price-corr";
  // title = "Price";
  // p = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit laudantium voluptatem minus accusantium odit maiores labore cumque rerum eum temporibus?`;
  // createGlobalStatsRow(rowId, title, p);
  // drawGlobalStatsCorrChart(
  //   rowId + "-canvas",
  //   boardgameSample,
  //   boardgameStats.userRatingPriceCorr.trend,
  //   "medianPriceNew",
  //   "averageRating",
  //   { xMin: 10, xMax: 100, yMin: 6.5, yMax: 8, color: BASE_COLOR }
  // );

  // Add Modal Button
  createModalButton(
    "global-stats-method-button",
    "global-stats-method-modal-body"
  );

  // Activate Popovers
  $('[data-toggle="popover"]').popover();
};
