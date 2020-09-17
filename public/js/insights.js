const runInsights = async (collection) => {
  const insights = collection.insights;

  const getCollectionStatsUrl = `${API_URL}/statistics/collections`;
  response = await axios.get(getCollectionStatsUrl);
  const communityStats = response.data.stats;

  const getBoardgameStatsUrl = `${API_URL}/statistics/boardgames`;
  response = await axios.get(getBoardgameStatsUrl);
  const boardgameStats = response.data.stats;

  // Toggle Container Fluid
  insightsFluidContainerToggle(CONTAINER_FLUID_BREAKPOINT);

  if ("mostPlayed" in insights) {
    const mostPlayedInsightCardData = genMostPlayedInsightCard(
      insights.mostPlayed
    );
    createInsightCard(
      mostPlayedInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("leastPlayed" in insights) {
    const leastPlayedInsightCardData = genLeastPlayedInsightCard(
      insights.leastPlayed
    );
    createInsightCard(
      leastPlayedInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("mostTimePlayed" in insights) {
    const mostTimePlayedInsightCardData = genMostTimePlayedInsightCard(
      insights.mostTimePlayed
    );
    createInsightCard(
      mostTimePlayedInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("leastTimePlayed" in insights) {
    const leastTimePlayedInsightCardData = genLeastTimePlayedInsightCard(
      insights.leastTimePlayed
    );
    createInsightCard(
      leastTimePlayedInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("avgPlays" in insights) {
    const avgPlaysInsightCardData = genAvgPlaysInsightCard(
      insights.avgPlays,
      communityStats
    );
    createInsightCard(
      avgPlaysInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("avgTimePlayed" in insights) {
    const avgTimePlayedInsightCardData = genAvgTimePlayedInsightCard(
      insights.avgTimePlayed,
      communityStats
    );
    createInsightCard(
      avgTimePlayedInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("notPlayed" in insights) {
    const notPlayedInsightCardData = genNotPlayedInsightCard(
      insights.notPlayed,
      communityStats
    );
    createInsightCard(
      notPlayedInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("bestValue" in insights) {
    const bestValueInsightCardData = genBestValueInsightCard(
      insights.bestValue
    );
    createInsightCard(
      bestValueInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("worstValue" in insights) {
    const worstValueInsightCardData = genWorstValueInsightCard(
      insights.worstValue
    );
    createInsightCard(
      worstValueInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("avgValue" in insights) {
    const avgValueInsightCardData = genAvgValueInsightCard(
      insights.avgValue,
      communityStats
    );
    createInsightCard(
      avgValueInsightCardData,
      communityStats,
      undefined,
      "#plays-insights-grid"
    );
  }

  if ("maxWeight" in insights) {
    const maxWeightInsightCardData = genMaxWeightInsightCard(
      insights.maxWeight
    );
    createInsightCard(
      maxWeightInsightCardData,
      communityStats,
      undefined,
      "#weight-insights-grid"
    );
  }

  if ("minWeight" in insights) {
    const minWeightInsightCardData = genMinWeightInsightCard(
      insights.minWeight
    );
    createInsightCard(
      minWeightInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("avgWeight" in insights) {
    const avgWeightInsightCardData = genAvgWeightInsightCard(
      insights.avgWeight,
      communityStats
    );
    createInsightCard(
      avgWeightInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("highestRated" in insights) {
    const highestRatedInsightCardData = genHighestRatedInsightCard(
      insights.highestRated
    );
    createInsightCard(
      highestRatedInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("lowestRated" in insights) {
    const lowestRatedInsightCardData = genLowestRatedInsightCard(
      insights.lowestRated
    );
    createInsightCard(
      lowestRatedInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("avgRating" in insights) {
    const avgRatingInsightCardData = genAvgRatingInsightCard(
      insights.avgRating,
      communityStats
    );
    createInsightCard(
      avgRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("highestBggRating" in insights) {
    const highestBggRatingInsightCardData = genHighestBggRatingInsightCard(
      insights.highestBggRating
    );
    createInsightCard(
      highestBggRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("lowestBggRating" in insights) {
    const lowestBggRatingInsightCardData = genLowestBggRatingInsightCard(
      insights.lowestBggRating
    );
    createInsightCard(
      lowestBggRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("avgBggRating" in insights) {
    const avgBggRatingInsightCardData = genAvgBggRatingInsightCard(
      insights.avgBggRating,
      communityStats
    );
    createInsightCard(
      avgBggRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("highestAvgRating" in insights) {
    const highestAvgRatingInsightCardData = genHighestAvgRatingInsightCard(
      insights.highestAvgRating
    );
    createInsightCard(
      highestAvgRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("lowestAvgRating" in insights) {
    const lowestAvgRatingInsightCardData = genLowestAvgRatingInsightCard(
      insights.lowestAvgRating
    );
    createInsightCard(
      lowestAvgRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("avgAvgRating" in insights) {
    const avgAvgRatingInsightCardData = genAvgAvgRatingInsightCard(
      insights.avgAvgRating,
      communityStats
    );
    createInsightCard(
      avgAvgRatingInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("largestPosRatingDiff" in insights) {
    const largestPosRatingDiffInsightCardData = genLargestPosRatingInsightCard(
      insights.largestPosRatingDiff
    );
    createInsightCard(
      largestPosRatingDiffInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("largestNegRatingDiff" in insights) {
    const largestNegRatingDiffInsightCardData = genLargestNegRatingInsightCard(
      insights.largestNegRatingDiff
    );
    createInsightCard(
      largestNegRatingDiffInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("avgRatingDiff" in insights) {
    const avgRatingDiffInsightCardData = genAvgRatingDiffInsightCard(
      insights.avgRatingDiff
    );
    createInsightCard(
      avgRatingDiffInsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("avgYear" in insights) {
    const avgYearInsightCardData = genAvgYearInsightCard(
      insights.avgYear,
      communityStats
    );
    createInsightCard(
      avgYearInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("mostCommonYears" in insights) {
    const mostCommonYearsInsightCardData = genMostCommonYearsInsightCard(
      insights.mostCommonYears,
      communityStats
    );
    createInsightCard(
      mostCommonYearsInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("avgRecommendedPlayers" in insights) {
    const avgRecommendedPlayersInsightCardData = genAvgRecommendedPlayersInsightCard(
      insights.avgRecommendedPlayers,
      communityStats
    );
    createInsightCard(
      avgRecommendedPlayersInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  // if ("avgMaxPlayers" in insights) {
  //   const avgMaxPlayersInsightCardData = genAvgMaxPlayersInsightCard(
  //     insights.avgMaxPlayers,
  //     communityStats
  //   );
  //   createInsightCard(
  //     avgMaxPlayersInsightCardData,
  //     communityStats,
  //     undefined,
  //     "#features-insights-grid"
  //   );
  // }

  if ("medianMaxPlayers" in insights) {
    const medianMaxPlayersInsightCardData = genMedianMaxPlayersInsightCard(
      insights.medianMaxPlayers,
      communityStats
    );
    createInsightCard(
      medianMaxPlayersInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("avgMinPlayers" in insights) {
    const avgMinPlayersInsightCardData = genAvgMinPlayersInsightCard(
      insights.avgMinPlayers,
      communityStats
    );
    createInsightCard(
      avgMinPlayersInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("avgPrice" in insights) {
    const avgPriceInsightCardData = genAvgPriceInsightCard(
      insights.avgPrice,
      communityStats
    );
    createInsightCard(
      avgPriceInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("totalPrice" in insights) {
    const totalPriceInsightCardData = genTotalPriceInsightCard(
      insights.totalPrice,
      communityStats
    );
    createInsightCard(
      totalPriceInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("top100" in insights) {
    const top100InsightCardData = genTop100InsightCard(
      insights.top100,
      communityStats
    );
    createInsightCard(
      top100InsightCardData,
      communityStats,
      undefined,
      "#ratings-insights-grid"
    );
  }

  if ("kickstarter" in insights) {
    const kickstarterInsightCardData = genKickstarterInsightCard(
      insights.kickstarter,
      communityStats
    );
    createInsightCard(
      kickstarterInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("mostCommonCategory" in insights) {
    const mostCommonCategoryInsightCardData = genMostCommonCategoryInsightCard(
      insights.mostCommonCategory,
      communityStats
    );
    createInsightCard(
      mostCommonCategoryInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("mostCommonMechanic" in insights) {
    const mostCommonMechanicInsightCardData = genMostCommonMechanicInsightCard(
      insights.mostCommonMechanic,
      communityStats
    );
    createInsightCard(
      mostCommonMechanicInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("mostCommonPublisher" in insights) {
    const mostCommonPublisherInsightCardData = genMostCommonPublisherInsightCard(
      insights.mostCommonPublisher,
      communityStats
    );
    createInsightCard(
      mostCommonPublisherInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("mostCommonDesigner" in insights) {
    const mostCommonDesignerInsightCardData = genMostCommonDesignerInsightCard(
      insights.mostCommonDesigner,
      communityStats
    );
    createInsightCard(
      mostCommonDesignerInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("mostCommonArtist" in insights) {
    const mostCommonArtistInsightCardData = genMostCommonArtistInsightCard(
      insights.mostCommonArtist,
      communityStats
    );
    createInsightCard(
      mostCommonArtistInsightCardData,
      communityStats,
      undefined,
      "#features-insights-grid"
    );
  }

  if ("ratingWeightCorr" in insights) {
    const ratingWeightCorrInsightCardData = genRatingWeightCorrInsightCard(
      insights.ratingWeightCorr,
      communityStats
    );
    createInsightCard(
      ratingWeightCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("ratingPlayTimeCorr" in insights) {
    const ratingPlayTimeCorrInsightCardData = genRatingPlayTimeCorrInsightCard(
      insights.ratingPlayTimeCorr,
      communityStats
    );
    createInsightCard(
      ratingPlayTimeCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("ratingRecommendedPlayersCorr" in insights) {
    const ratingRecommendedPlayersCorrInsightCardData = genRatingRecommendedPlayersCorrInsightCard(
      insights.ratingRecommendedPlayersCorr,
      communityStats
    );
    createInsightCard(
      ratingRecommendedPlayersCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("ratingMaxPlayersCorr" in insights) {
    const ratingMaxPlayersCorrInsightCardData = genRatingMaxPlayersCorrInsightCard(
      insights.ratingMaxPlayersCorr,
      communityStats
    );
    createInsightCard(
      ratingMaxPlayersCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("ratingPlaysCorr" in insights) {
    const ratingPlaysCorrInsightCardData = genRatingPlaysCorrInsightCard(
      insights.ratingPlaysCorr,
      communityStats
    );
    createInsightCard(
      ratingPlaysCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("ratingTimePlayedCorr" in insights) {
    const ratingTimePlayedCorrInsightCardData = genRatingTimePlayedCorrInsightCard(
      insights.ratingTimePlayedCorr,
      communityStats
    );
    createInsightCard(
      ratingTimePlayedCorrInsightCardData,
      communityStats,
      undefined,
      "#relationships-insights-grid"
    );
  }

  if ("ratingPriceCorr" in insights) {
    const ratingPriceCorrInsightCardData = genRatingPriceCorrInsightCard(
      insights.ratingPriceCorr,
      communityStats
    );
    createInsightCard(
      ratingPriceCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("ratingYearCorr" in insights) {
    const ratingYearCorrInsightCardData = genRatingYearCorrInsightCard(
      insights.ratingYearCorr,
      communityStats
    );
    createInsightCard(
      ratingYearCorrInsightCardData,
      communityStats,
      boardgameStats,
      "#relationships-insights-grid"
    );
  }

  if ("playsWeightCorr" in insights) {
    const playsWeightCorrInsightCardData = genPlaysWeightCorrInsightCard(
      insights.playsWeightCorr,
      communityStats
    );
    createInsightCard(
      playsWeightCorrInsightCardData,
      communityStats,
      undefined,
      "#relationships-insights-grid"
    );
  }

  if ("playsPlayTimeCorr" in insights) {
    const playsPlayTimeCorrInsightCardData = genPlaysPlayTimeCorrInsightCard(
      insights.playsPlayTimeCorr,
      communityStats
    );
    createInsightCard(
      playsPlayTimeCorrInsightCardData,
      communityStats,
      undefined,
      "#relationships-insights-grid"
    );
  }

  if ("playsRecommendedPlayersCorr" in insights) {
    const playsRecommendedPlayersCorrInsightCardData = genPlaysRecommendedPlayersCorrInsightCard(
      insights.playsRecommendedPlayersCorr,
      communityStats
    );
    createInsightCard(
      playsRecommendedPlayersCorrInsightCardData,
      communityStats,
      undefined,
      "#relationships-insights-grid"
    );
  }

  if ("playsMaxPlayersCorr" in insights) {
    const playsMaxPlayersCorrInsightCardData = genPlaysMaxPlayersCorrInsightCard(
      insights.playsMaxPlayersCorr,
      communityStats
    );
    createInsightCard(
      playsMaxPlayersCorrInsightCardData,
      communityStats,
      undefined,
      "#relationships-insights-grid"
    );
  }

  if ("playsPriceCorr" in insights) {
    const playsPriceCorrInsightCardData = genPlaysPriceCorrInsightCard(
      insights.playsPriceCorr,
      communityStats
    );
    createInsightCard(
      playsPriceCorrInsightCardData,
      communityStats,
      undefined,
      "#relationships-insights-grid"
    );
  }

  // Remove Unused Titles
  removeUnusedInsightsTitles([
    "plays",
    "ratings",
    "relationships",
    "features",
  ]);

  // Enable Bootstrap Tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
};

const genMostPlayedInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "most-played-card";
  cardData.title = "Most Played";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `Your most played boardgame is ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} with a total of ${genStatHtml(
    insight.nPlays,
    "badge-pill badge-dark py-1"
  )} logged ${insight.nPlays == 1 ? "play" : `plays`}.`;

  return cardData;
};

const genLeastPlayedInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "least-played-card";
  cardData.title = "Least Played";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `Your least played ${
    insight.items.length == 1 ? "boardgame" : "boardgames"
  } ${insight.items.length == 1 ? "is" : "are"} ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} with a total of ${genStatHtml(
    insight.nPlays,
    "badge-pill badge-dark py-1"
  )} logged ${insight.nPlays == 1 ? "play" : `plays`}.`;
  cardData.note = `Unplayed boardgames are not considered towards this statistic.`;

  return cardData;
};

const genMostTimePlayedInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "most-time-played-card";
  cardData.title = "Most Time Played";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `The ${
    insight.items.length == 1 ? "boardgame" : "boardgames"
  } you have spent the most time playing ${
    insight.items.length == 1 ? "is" : "are"
  } ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )}, which you have played for approximately ${genStatHtml(
    parseInt(insight.timePlayed / 60),
    "badge-pill badge-dark py-1",
    "hours"
  )}.`;
  cardData.note =
    "<em>Time Played</em> is estimated based on the average play time stated in the game box and your number of logged plays.";

  return cardData;
};

const genLeastTimePlayedInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "least-time-played-card";
  cardData.title = "Least Time Played";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `The ${
    insight.items.length == 1 ? "boardgame" : "boardgames"
  } you have spent the least time playing ${
    insight.items.length == 1 ? "is" : "are"
  } ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )}, which you have played for approximately ${genStatHtml(
    insight.timePlayed < 60
      ? insight.timePlayed
      : parseInt(insight.timePlayed / 60),
    "badge-pill badge-dark py-1",
    insight.timePlayed < 60 ? "minutes" : "hours"
  )}.`;
  cardData.note = `<em>Time Played</em> is estimated based on the average play time stated in the game box and your number of logged plays. Unplayed boardgames are not considered towards this statistic.`;

  return cardData;
};

const genAvgPlaysInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgPlays;
  const rawCommunityStat = communityStats.avgPlays;
  let cardData = {};
  cardData.id = "avg-plays-card";
  cardData.title = "Average Plays";
  cardData.image = "avg-plays-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = rawStat.toFixed(0) + " Plays";
  cardData.description = `On average, you have played each boardgame in your collection ${genStatHtml(
    rawStat.toFixed(0),
    "badge-pill badge-dark py-1"
  )} times, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    rawCommunityStat.toFixed(0),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genAvgTimePlayedInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgTimePlayed;
  const stat = rawStat > 2 ? rawStat.toFixed() : Math.round(rawStat * 60);
  const rawCommunityStat = communityStats.avgTimePlayed;
  const communityStat =
    rawCommunityStat > 2
      ? rawCommunityStat.toFixed(0)
      : Math.round(rawCommunityStat * 60);
  let cardData = {};
  cardData.id = "avg-time-played-card";
  cardData.title = "Average Time Played";
  cardData.image = "avg-time-played-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat =
    rawStat > 2
      ? rawStat.toFixed(0) + " Hours"
      : Math.round(rawStat * 60) + " Minutes";
  cardData.description = `On average, you have spent approximately ${genStatHtml(
    stat,
    "badge-pill badge-dark py-1",
    rawStat > 2 ? "hours" : "minutes"
  )} playing each boardgame in your collection, which is ${compareUserVsCommunityStat(
    stat,
    communityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    communityStat,
    "badge-pill badge-info py-1",
    rawCommunityStat > 2 ? "hours" : "minutes"
  )}.`;
  cardData.note = `<em>Time Played</em> is estimated based on the average play time stated in the game box and your number of logged plays.`;

  return cardData;
};

const genNotPlayedInsightCard = (insight, communityStats) => {
  const rawStat = insight.prctNotPlayed;
  const rawCommunityStat = communityStats.avgPrctNotPlayed;
  let cardData = {};
  cardData.id = "not-played-card";
  cardData.title = "Not Played";
  cardData.image = "not-played-canvas";
  cardData.rawStat = rawStat * 100;
  cardData.mainStat = Math.round(rawStat * 100) + "%";
  cardData.description = `You have no logged plays for ${genStatHtml(
    Math.round(rawStat * 100) + "%",
    "badge-pill badge-dark py-1"
  )} of your collection, corresponding, in total, to ${genStatHtml(
    insight.nNotPlayed,
    "badge-pill badge-dark py-1"
  )} boardgames. This value is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat * 100) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );

  return cardData;
};

const genBestValueInsightCard = (insight) => {
  const rawStat = insight.bestValue;
  const stat = 1 / rawStat;
  let cardData = {};
  cardData.id = "best-value-card";
  cardData.title = "Best Value";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `Each play of ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} has cost you an estimated ${genStatHtml(
    stat.toFixed(2) + "&nbsp;USD",
    "badge-pill badge-dark py-1"
  )}.`;
  cardData.note =
    "The cost of a boardgame is estimated using the current boardgame's median price (new) on the BGG Marketplace.";

  return cardData;
};

const genWorstValueInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "worst-value-card";
  cardData.title = "Worst Value";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description =
    insight.worstValue != 0
      ? `Each play of ${genBoardgameNamesHtml(
          insight.items,
          "badge-pill badge-secondary py-1"
        )} has cost you an estimated ${genStatHtml(
          (1 / insight.worstValue).toFixed(2) + "&nbsp;USD",
          "badge-pill badge-dark py-1"
        )}.`
      : `${genBoardgameNamesHtml(
          insight.items,
          "badge-pill badge-secondary py-1"
        )} is your worst value boardgame as it is the most expensive - ${genStatHtml(
          insight.items[0].price.toFixed(2) + "&nbsp;USD",
          "badge-pill badge-dark py-1"
        )} - among your unplayed boardgames.`;
  cardData.note =
    "The cost of each play is estimated using the current boardgame's median price (new) on the BGG Marketplace.";

  return cardData;
};

const genAvgValueInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgValue;
  const stat = 1 / rawStat;
  const rawCommunityStat = communityStats.avgValue;
  const communityStat = 1 / rawCommunityStat;
  let cardData = {};
  cardData.id = "avg-value-card";
  cardData.title = "Average Price per Play";
  cardData.image = "avg-value-canvas";
  cardData.rawStat = 1 / rawStat;
  cardData.mainStat = stat.toFixed(2) + "&nbsp;USD";
  cardData.description = `On average, you have spent an estimated ${genStatHtml(
    stat.toFixed(2) + "USD",
    "badge-pill badge-dark py-1"
  )} per play, which is ${compareUserVsCommunityStat(
    stat,
    communityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    communityStat.toFixed(2),
    "badge-pill badge-info py-1",
    "&nbsp;USD"
  )}.`;

  cardData.note =
    "The cost of each play is estimated using the current boardgame's median price (new) on the BGG Marketplace.";

  return cardData;
};

const genMaxWeightInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "max-weight-card";
  cardData.title = "Heaviest";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `The heaviest boardgame in your collection is ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} with a weight of  ${genStatHtml(
    insight.maxWeight.toFixed(1),
    "badge-pill badge-dark py-1"
  )}.`;

  return cardData;
};

const genMinWeightInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "min-weight-card";
  cardData.title = "Lighest";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `The lighest boardgame in your collection is ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} with a weight of  ${genStatHtml(
    insight.minWeight.toFixed(1),
    "badge-pill badge-dark py-1"
  )}.`;

  return cardData;
};

const genAvgWeightInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgWeight;
  const rawCommunityStat = communityStats.avgWeight;
  let cardData = {};
  cardData.id = "avg-weight-card";
  cardData.title = "Average Weight";
  cardData.image = "avg-weight-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = rawStat.toFixed(1);
  cardData.description = `The average weight of your collection is ${genStatHtml(
    rawStat.toFixed(1),
    "badge-pill badge-dark py-1"
  )}, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    rawCommunityStat.toFixed(1),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genHighestRatedInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "highest-rated-card";
  cardData.title = "Favourite" + (insight.items.length == 1 ? "" : "s");
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${insight.items.length == 1 ? "is" : "are"} the boardgame${
    insight.items.length == 1 ? "" : "s"
  } you have rated the highest with a rating of ${genStatHtml(
    insight.highestUserRating.toFixed(1),
    "badge-pill badge-dark py-1"
  )}.`;

  return cardData;
};

const genLowestRatedInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "lowest-rated-card";
  cardData.title = "Least Favourite";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${insight.items.length == 1 ? "is" : "are"} the boardgame${
    insight.items.length == 1 ? "" : "s"
  } you have rated the lowest with a rating of ${genStatHtml(
    insight.lowestUserRating.toFixed(1),
    "badge-pill badge-dark py-1"
  )}.`;

  return cardData;
};

const genAvgRatingInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgUserRating;
  const rawCommunityStat = communityStats.avgRating;
  let cardData = {};
  cardData.id = "avg-user-rating-card";
  cardData.title = "Your Average Rating";
  cardData.image = "avg-user-rating-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = rawStat.toFixed(1);
  cardData.description = `You have rated your boardgames ${genStatHtml(
    rawStat.toFixed(1),
    "badge-pill badge-dark py-1"
  )} on average, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    rawCommunityStat.toFixed(1),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genHighestBggRatingInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "highest-bgg-rating-card";
  cardData.title = "Highest Geek Rating";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${
    insight.items.length == 1 ? "is" : "are"
  } the boardgame with highest <em>Geek Rating</em> - ${genStatHtml(
    insight.highestBggRating.toFixed(1),
    "badge-pill badge-dark py-1"
  )} - in your collection.`;

  return cardData;
};

const genLowestBggRatingInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "lowest-bgg-rating-card";
  cardData.title = "Lowest Geek Rating";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${
    insight.items.length == 1 ? "is" : "are"
  } the boardgame with lowest <em>Geek Rating</em> - ${genStatHtml(
    insight.lowestBggRating.toFixed(1),
    "badge-pill badge-dark py-1"
  )} - in your collection.`;

  return cardData;
};

const genAvgBggRatingInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgBggRating;
  const rawCommunityStat = communityStats.avgBggRating;
  let cardData = {};
  cardData.id = "avg-bgg-rating-card";
  cardData.title = "Average Geek Rating";
  cardData.image = "avg-bgg-rating-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = rawStat.toFixed(1);
  cardData.description = `Your boardgames have an average <em>Geek Rating</em> of ${genStatHtml(
    rawStat.toFixed(1),
    "badge-pill badge-dark py-1"
  )}, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    rawCommunityStat.toFixed(1),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genHighestAvgRatingInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "highest-avg-rating-card";
  cardData.title = "Highest Community Rating";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${
    insight.items.length == 1 ? "is" : "are"
  } the boardgame with highest <em>Community Average Rating</em> - ${genStatHtml(
    insight.highestAvgRating.toFixed(1),
    "badge-pill badge-dark py-1"
  )} - in your collection.`;

  return cardData;
};

const genLowestAvgRatingInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "lowest-avg-rating-card";
  cardData.title = "Lowest Community Rating";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${
    insight.items.length == 1 ? "is" : "are"
  } the boardgame with lowest <em>Community Average Rating</em> - ${genStatHtml(
    insight.lowestAvgRating.toFixed(1),
    "badge-pill badge-dark py-1"
  )} - in your collection.`;

  return cardData;
};

const genAvgAvgRatingInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgAvgRating;
  const rawCommunityStat = communityStats.avgAvgRating;
  let cardData = {};
  cardData.id = "avg-avg-rating-card";
  cardData.title = "Average Community Rating";
  cardData.image = "avg-avg-rating-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = rawStat.toFixed(1);
  cardData.description = `Your boardgames have an average <em>Community Average Rating</em> of ${genStatHtml(
    rawStat.toFixed(1),
    "badge-pill badge-dark py-1"
  )}, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    rawCommunityStat.toFixed(1),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genLargestPosRatingInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "largest-pos-rating-diff-card";
  cardData.title = "Most Underrated";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `You have rated ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${genStatHtml(
    insight.largestPosRatingDiff.toFixed(1),
    "badge-pill badge-dark py-1"
  )} points higher than the <em>BGG</em> community.`;

  return cardData;
};

const genLargestNegRatingInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "largest-neg-rating-diff-card";
  cardData.title = "Most Overrated";
  cardData.image = insight.items[0].image;
  cardData.mainStat = insight.items[0].name;
  cardData.description = `You have rated ${genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  )} ${genStatHtml(
    insight.largestNegRatingDiff.toFixed(1),
    "badge-pill badge-dark py-1"
  )} points lower than the <em>BGG</em> community.`;

  return cardData;
};

const genAvgRatingDiffInsightCard = (insight) => {
  let cardData = {};
  cardData.id = "avg-rating-diff-card";
  cardData.title = "Average Rating Difference";
  cardData.image = "avg-rating-diff-canvas";
  cardData.rawStat = insight.avgRatingDiff;
  cardData.mainStat =
    (insight.avgRatingDiff >= 0 ? "+" : "") + insight.avgRatingDiff.toFixed(1);
  cardData.description = `On average, you have rated your boardgames ${genStatHtml(
    Math.abs(insight.avgRatingDiff.toFixed(1)),
    "badge-pill badge-dark py-1"
  )} points ${
    insight.avgRatingDiff >= 0 ? "higher" : "lower"
  } than the <em>BGG</em> community.`;

  return cardData;
};

const genAvgYearInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgYear;
  const rawCommunityStat = communityStats.avgYear;
  let cardData = {};
  cardData.id = "avg-year-card";
  cardData.title = "Average Release Year";
  cardData.image = "avg-year-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = Math.round(rawStat);
  cardData.description = `The average <em>Release Year</em> of your boardgames is ${genStatHtml(
    Math.round(rawStat),
    "badge-pill badge-dark py-1"
  )}, which is ${compareUserVsCommunityStat(
    Math.round(rawStat),
    Math.round(rawCommunityStat),
    1,
    5
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genMostCommonYearsInsightCard = (insight, communityStats) => {
  const rawStat = insight.mostCommonYears;
  const rawCommunityStat = communityStats.mostCommonYear;
  let cardData = {};
  cardData.id = "most-common-years-card";
  cardData.title =
    rawStat.length == 1
      ? "Most Common Release Year"
      : "Most Common Release Years";
  cardData.image = "most-common-years-canvas";
  cardData.rawStat = rawStat[0];
  cardData.mainStat = rawStat[0] + (rawStat.length == 1 ? "" : "...");
  cardData.description = `${genStatHtml(
    insight.mostCommonYears,
    "badge-pill badge-dark py-1"
  )} ${rawStat.length == 1 ? "is" : "are"} is the ${
    rawStat.length == 1 ? "year" : "years"
  } when the largest number of your boardgames were released, which is ${compareUserVsCommunityStat(
    Math.round(rawStat),
    Math.round(rawCommunityStat),
    1,
    5
  )} the community - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );

  return cardData;
};

const genAvgRecommendedPlayersInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgRecommendedPlayers;
  const rawCommunityStat = communityStats.avgRecommendedPlayers;
  let cardData = {};
  cardData.id = "avg-recommended-players-card";
  cardData.title = "Average Recommended Players";
  cardData.image = "avg-recommended-players-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = Math.round(rawStat);
  cardData.description = `On average, your boardgames are best played with ${genStatHtml(
    rawStat.toFixed(0),
    "badge-pill badge-dark py-1"
  )} players, which is ${compareUserVsCommunityStat(
    Math.round(rawStat),
    Math.round(rawCommunityStat),
    1,
    2
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genAvgMaxPlayersInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgMaxPlayers;
  const rawCommunityStat = communityStats.avgMaxPlayers;
  let cardData = {};
  cardData.id = "avg-max-players-card";
  cardData.title = "Average Player Limit";
  cardData.image = "avg-max-players-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = Math.round(rawStat);
  cardData.description = `On average, your boardgames have a player limit of ${genStatHtml(
    rawStat.toFixed(0),
    "badge-pill badge-dark py-1"
  )} players, which is ${compareUserVsCommunityStat(
    Math.round(rawStat),
    Math.round(rawCommunityStat),
    1,
    3
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genMedianMaxPlayersInsightCard = (insight, communityStats) => {
  const rawStat = insight.medianMaxPlayers;
  const rawCommunityStat = communityStats.medianMaxPlayers;
  let cardData = {};
  cardData.id = "median-max-players-card";
  cardData.title = "Median Player Limit";
  cardData.image = "median-max-players-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = Math.round(rawStat);

  cardData.description = `The median player limit of your boardagames is ${genStatHtml(
    rawStat.toFixed(0),
    "badge-pill badge-dark py-1"
  )}, which is ${compareUserVsCommunityStat(
    Math.round(rawStat),
    Math.round(rawCommunityStat),
    1,
    3
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1"
  )}.`;
  cardData.note = `The median player limit is used instead of the average to avoid polluting this metric with games that have
    very high or unlimited player counts.`;

  return cardData;
};

const genAvgMinPlayersInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgMinPlayers;
  const rawCommunityStat = communityStats.avgMinPlayers;
  let cardData = {};
  cardData.id = "avg-min-players-card";
  cardData.title = "Average Minimum Player Count";
  cardData.image = "avg-min-players-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = Math.round(rawStat);
  cardData.description = `On average, your boardgames have a minimum player count of ${genStatHtml(
    rawStat.toFixed(0),
    "badge-pill badge-dark py-1"
  )} players, which is ${compareUserVsCommunityStat(
    Math.round(rawStat),
    Math.round(rawCommunityStat),
    1,
    3
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1"
  )}.`;

  return cardData;
};

const genAvgPriceInsightCard = (insight, communityStats) => {
  const rawStat = insight.avgPrice;
  const rawCommunityStat = communityStats.avgPrice;
  let cardData = {};
  cardData.id = "avg-price-card";
  cardData.title = "Average Price";
  cardData.image = "avg-price-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = rawStat.toFixed(2) + "&nbsp;USD";
  cardData.description = `On average, your boardgames cost ${genStatHtml(
    rawStat.toFixed(2),
    "badge-pill badge-dark py-1",
    "USD"
  )}, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    rawCommunityStat.toFixed(2),
    "badge-pill badge-info py-1",
    "USD"
  )}.`;
  cardData.note =
    "The cost of a boardgame is estimated using the current boardgame's median price (new) on the BGG Marketplace.";

  return cardData;
};

const genTotalPriceInsightCard = (insight, communityStats) => {
  const rawStat = insight.totalPrice;
  const rawCommunityStat = communityStats.avgTotalPrice;
  let cardData = {};
  cardData.id = "total-price-card";
  cardData.title = "Collection Value";
  cardData.image = "total-price-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = formatRatingsThousands(rawStat) + "&nbsp;USD";
  cardData.description = `Your collection has an estimated value of ${genStatHtml(
    Math.round(insight.totalPrice),
    "badge-pill badge-dark py-1",
    "USD"
  )}, which is ${compareUserVsCommunityStat(
    rawStat,
    rawCommunityStat,
    0.05,
    0.4
  )} the community average - ${genStatHtml(
    Math.round(rawCommunityStat),
    "badge-pill badge-info py-1",
    "USD"
  )}.`;
  cardData.note =
    "The cost of a boardgame is estimated using the current boardgame's median price (new) on the BGG Marketplace.";

  return cardData;
};

const genTop100InsightCard = (insight, communityStats) => {
  const rawStat = insight.prctTop100;
  const stat = rawStat * 100;
  const rawCommunityStat = communityStats.avgPrctTop100;
  const communityStat = rawCommunityStat * 100;
  let cardData = {};
  cardData.id = "top100-card";
  cardData.title = "On BGG's Top 100";
  cardData.image = "top100-canvas";
  cardData.rawStat = stat;
  cardData.mainStat = stat.toFixed(0) + "%";
  cardData.description = `${genStatHtml(
    stat.toFixed(0) + "%",
    "badge-pill badge-dark py-1"
  )} of your boardgames are on BGG's Top 100, corresponding, in total, to ${genStatHtml(
    insight.nTop100,
    "badge-pill badge-dark py-1"
  )} boardgames. This value is ${compareUserVsCommunityStat(
    stat,
    communityStat,
    3,
    15
  )} the community average - ${genStatHtml(
    communityStat.toFixed(0) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );

  return cardData;
};

const genKickstarterInsightCard = (insight, communityStats) => {
  const rawStat = insight.prctKickstarter;
  const stat = rawStat * 100;
  const rawCommunityStat = communityStats.avgPrctKickstarter;
  const communityStat = rawCommunityStat * 100;
  let cardData = {};
  cardData.id = "kickstarter-card";
  cardData.title = "Published on Kickstarter";
  cardData.image = "kickstarter-canvas";
  cardData.rawStat = stat;
  cardData.mainStat = stat.toFixed(0) + "%";
  cardData.description = `${genStatHtml(
    stat.toFixed(0) + "%",
    "badge-pill badge-dark py-1"
  )} of your boardgames were first published through Kickstarter, corresponding, in total, to ${genStatHtml(
    insight.nKickstarter,
    "badge-pill badge-dark py-1"
  )} boardgames. This value is ${compareUserVsCommunityStat(
    stat,
    communityStat,
    3,
    10
  )} the community average - ${genStatHtml(
    communityStat.toFixed(0) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );

  return cardData;
};

const genMostCommonCategoryInsightCard = (insight, communityStats) => {
  const nCollectionItems =
    insight.nMostCommonCategory / insight.prctMostCommonCategory;
  const rawStat = dictValuesToPrct(insight.categoryHist, nCollectionItems);
  const stat = insight.mostCommonCategory[0];
  const rawCommunityStat = dictValuesToPrct(
    communityStats.categoryHist,
    communityStats.nItems
  );
  const communityStat =
    communityStats.categoryHist[insight.mostCommonCategory[0]];
  let cardData = {};
  cardData.id = "most-common-category-card";
  cardData.title = "Most Common Category";
  cardData.image = "most-common-category-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = stat;
  cardData.rawCommunityStat = rawCommunityStat;
  cardData.communityStat = communityStat;
  cardData.description = `${genStatHtml(
    insight.mostCommonCategory,
    "badge-pill badge-secondary py-1"
  )} ${insight.mostCommonCategory.length == 1 ? "is" : "are"} the most common ${
    insight.mostCommonCategory.length == 1 ? "category" : "categories"
  } among the boardgames in you collection as ${
    insight.mostCommonCategory.length == 1 ? "it" : "each"
  } is associated with ${genStatHtml(
    insight.categoryHist[insight.mostCommonCategory[0]],
    "badge-pill badge-dark py-1"
  )} boardgames - ${genStatHtml(
    (insight.prctMostCommonCategory * 100).toFixed(1) + "%",
    "badge-pill badge-dark py-1"
  )} of your collection. This value is ${compareUserVsCommunityStat(
    insight.prctMostCommonCategory * 100,
    (communityStats.categoryHist[insight.mostCommonCategory[0]] /
      communityStats.nItems) *
      100,
    3,
    10
  )} the community average - ${genStatHtml(
    (
      (communityStats.categoryHist[insight.mostCommonCategory[0]] /
        communityStats.nItems) *
      100
    ).toFixed(1) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );
  cardData.dataSelectionButtonTitles = ["Your Top 10", "Community Top 10"];

  return cardData;
};

const genMostCommonMechanicInsightCard = (insight, communityStats) => {
  const nCollectionItems =
    insight.nMostCommonMechanic / insight.prctMostCommonMechanic;
  const rawStat = dictValuesToPrct(insight.mechanicHist, nCollectionItems);
  const stat = insight.mostCommonMechanic[0];
  const rawCommunityStat = dictValuesToPrct(
    communityStats.mechanicHist,
    communityStats.nItems
  );
  const communityStat =
    communityStats.mechanicHist[insight.mostCommonMechanic[0]];

  let cardData = {};
  cardData.id = "most-common-mechanic-card";
  cardData.title = "Most Common Mechanic";
  cardData.image = "most-common-mechanic-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = stat;
  cardData.rawCommunityStat = rawCommunityStat;
  cardData.communityStat = communityStat;
  cardData.description = `${genStatHtml(
    insight.mostCommonMechanic,
    "badge-pill badge-secondary py-1"
  )} ${insight.mostCommonMechanic.length == 1 ? "is" : "are"} the most common ${
    insight.mostCommonMechanic.length == 1 ? "mechanic" : "mechanics"
  } among the boardgames in you collection as ${
    insight.mostCommonMechanic.length == 1 ? "it" : "each"
  } is associated with ${genStatHtml(
    insight.mechanicHist[insight.mostCommonMechanic[0]],
    "badge-pill badge-dark py-1"
  )} boardgames - ${genStatHtml(
    (insight.prctMostCommonMechanic * 100).toFixed(1) + "%",
    "badge-pill badge-dark py-1"
  )} of your collection. This value is ${compareUserVsCommunityStat(
    insight.prctMostCommonMechanic * 100,
    (communityStats.mechanicHist[insight.mostCommonMechanic[0]] /
      communityStats.nItems) *
      100,
    3,
    10
  )} the community average - ${genStatHtml(
    (
      (communityStats.mechanicHist[insight.mostCommonMechanic[0]] /
        communityStats.nItems) *
      100
    ).toFixed(1) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );
  cardData.dataSelectionButtonTitles = ["Your Top 10", "Community Top 10"];

  return cardData;
};

const genMostCommonPublisherInsightCard = (insight, communityStats) => {
  const nCollectionItems =
    insight.nMostCommonPublisher / insight.prctMostCommonPublisher;
  const rawStat = dictValuesToPrct(insight.publisherHist, nCollectionItems);
  const stat = insight.mostCommonPublisher[0];
  const rawCommunityStat = dictValuesToPrct(
    communityStats.publisherHist,
    communityStats.nItems
  );
  const communityStat =
    communityStats.publisherHist[insight.mostCommonPublisher[0]];

  let cardData = {};
  cardData.id = "most-common-publisher-card";
  cardData.title = "Most Common Publisher";
  cardData.image = "most-common-publisher-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = stat;
  cardData.rawCommunityStat = rawCommunityStat;
  cardData.communityStat = communityStat;
  cardData.description = `${genStatHtml(
    insight.mostCommonPublisher,
    "badge-pill badge-secondary py-1"
  )} ${
    insight.mostCommonPublisher.length == 1 ? "is" : "are"
  } the most common ${
    insight.mostCommonPublisher.length == 1 ? "publisher" : "publishers"
  } among the boardgames in you collection as ${
    insight.mostCommonPublisher.length == 1 ? "it" : "each"
  } has published ${genStatHtml(
    insight.publisherHist[insight.mostCommonPublisher[0]],
    "badge-pill badge-dark py-1"
  )} boardgames - ${genStatHtml(
    (insight.prctMostCommonPublisher * 100).toFixed(1) + "%",
    "badge-pill badge-dark py-1"
  )} of your collection. This value is ${compareUserVsCommunityStat(
    insight.prctMostCommonPublisher * 100,
    (communityStats.publisherHist[insight.mostCommonPublisher[0]] /
      communityStats.nItems) *
      100,
    3,
    10
  )} the community average - ${genStatHtml(
    (
      (communityStats.publisherHist[insight.mostCommonPublisher[0]] /
        communityStats.nItems) *
      100
    ).toFixed(1) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.dataSelectionButtonTitles = ["Your Top 10", "Community Top 10"];

  return cardData;
};

const genMostCommonDesignerInsightCard = (insight, communityStats) => {
  const nCollectionItems =
    insight.nMostCommonDesigner / insight.prctMostCommonDesigner;
  const rawStat = dictValuesToPrct(insight.designerHist, nCollectionItems);
  const stat = insight.mostCommonDesigner[0];
  const rawCommunityStat = dictValuesToPrct(
    communityStats.designerHist,
    communityStats.nItems
  );
  const communityStat =
    communityStats.designerHist[insight.mostCommonDesigner[0]];

  let cardData = {};
  cardData.id = "most-common-designer-card";
  cardData.title = "Most Common Designer";
  cardData.image = "most-common-designer-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = stat;
  cardData.rawCommunityStat = rawCommunityStat;
  cardData.communityStat = communityStat;
  cardData.description = `${genStatHtml(
    insight.designerHist[insight.mostCommonDesigner[0]],
    "badge-pill badge-dark py-1"
  )} of your boardgames - ${genStatHtml(
    (insight.prctMostCommonDesigner * 100).toFixed(1) + "%",
    "badge-pill badge-dark py-1"
  )} of your collection - were designed by ${
    insight.mostCommonDesigner.length == 1 ? "" : "one of"
  } ${genStatHtml(
    insight.mostCommonDesigner,
    "badge-pill badge-secondary py-1"
  )}. This value is ${compareUserVsCommunityStat(
    insight.prctMostCommonDesigner * 100,
    (communityStats.designerHist[insight.mostCommonDesigner[0]] /
      communityStats.nItems) *
      100,
    1,
    10
  )} the community average - ${genStatHtml(
    (
      (communityStats.designerHist[insight.mostCommonDesigner[0]] /
        communityStats.nItems) *
      100
    ).toFixed(1) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.showMoreButtonTitle = "Show Boardgames";
  cardData.showMoreButtonText = genBoardgameNamesHtml(
    insight.items,
    "badge-pill badge-secondary py-1"
  );
  cardData.dataSelectionButtonTitles = ["Your Top 10", "Community Top 10"];

  return cardData;
};

const genMostCommonArtistInsightCard = (insight, communityStats) => {
  const nCollectionItems =
    insight.nMostCommonArtist / insight.prctMostCommonArtist;
  const rawStat = dictValuesToPrct(insight.artistHist, nCollectionItems);
  const stat = insight.mostCommonArtist[0];
  const rawCommunityStat = dictValuesToPrct(
    communityStats.artistHist,
    communityStats.nItems
  );
  const communityStat = communityStats.artistHist[insight.mostCommonArtist[0]];

  let cardData = {};
  cardData.id = "most-common-artist-card";
  cardData.title = "Most Common Artist";
  cardData.image = "most-common-artist-canvas";
  cardData.rawStat = rawStat;
  cardData.mainStat = stat;
  cardData.rawCommunityStat = rawCommunityStat;
  cardData.communityStat = communityStat;
  cardData.description = `${genStatHtml(
    insight.artistHist[insight.mostCommonArtist[0]],
    "badge-pill badge-dark py-1"
  )} of your boardgames - ${genStatHtml(
    (insight.prctMostCommonArtist * 100).toFixed(1) + "%",
    "badge-pill badge-dark py-1"
  )} of your collection - were illustrated by ${
    insight.mostCommonArtist.length == 1 ? "" : "one of"
  } ${genStatHtml(
    insight.mostCommonArtist,
    "badge-pill badge-secondary py-1"
  )}. This value is ${compareUserVsCommunityStat(
    insight.prctMostCommonArtist * 100,
    (communityStats.artistHist[insight.mostCommonArtist[0]] /
      communityStats.nItems) *
      100,
    1,
    10
  )} the community average - ${genStatHtml(
    (
      (communityStats.artistHist[insight.mostCommonArtist[0]] /
        communityStats.nItems) *
      100
    ).toFixed(1) + "%",
    "badge-pill badge-info py-1"
  )}.`;
  cardData.dataSelectionButtonTitles = ["Your Top 10", "Community Top 10"];

  return cardData;
};

const genRatingWeightCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingWeightCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_WEIGHT_CORR_MAP
  );

  let cardData = {};
  cardData.id = "rating-weight-corr-card";
  cardData.title = "Weight Impact on Your Rating";
  cardData.image = "rating-weight-corr-canvas";
  cardData.mainStat = checkMapRange(Math.abs(rawStat), RATING_WEIGHT_CORR_MAP);
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Weight</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          "<em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Weight</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          "<em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>higher</em> the <em>Weight</em> of a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingPlayTimeCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingPlayTimeCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_PLAY_TIME_CORR_MAP
  );
  let cardData = {};
  cardData.id = "rating-play-time-corr-card";
  cardData.title = "Play Time Impact on Your Rating";
  cardData.image = "rating-play-time-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    RATING_PLAY_TIME_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Play Time</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Play Time</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>higher</em> the <em>Play Time</em> of a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingRecommendedPlayersCorrInsightCard = (
  insight,
  communityStats
) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingRecommendedPlayersCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_RECOMMENDED_PLAYERS_CORR_MAP
  );
  let cardData = {};
  cardData.id = "rating-recommended-players-corr-card";
  cardData.title = "Recommended Player Count Impact on Your Rating";
  cardData.image = "rating-recommended-players-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    RATING_RECOMMENDED_PLAYERS_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Recommended Player Count</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Recommended Player Count</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>higher</em> the <em>Recommended Player Count</em> of a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingMaxPlayersCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingMaxPlayersCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_MAX_PLAYERS_CORR_MAP
  );
  let cardData = {};
  cardData.id = "rating-max-players-corr-card";
  cardData.title = "Player Limit Impact on Your Rating";
  cardData.image = "rating-max-players-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    RATING_MAX_PLAYERS_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Player Limit</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Player Limit</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>higher</em> the <em>Player Limit</em> of a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingPlaysCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingPlaysCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_PLAYS_CORR_MAP
  );
  let cardData = {};
  cardData.id = "rating-plays-corr-card";
  cardData.title = "#Plays Impact on Your Rating";
  cardData.image = "rating-plays-corr-canvas";
  cardData.mainStat = checkMapRange(Math.abs(rawStat), RATING_PLAYS_CORR_MAP);
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Number of Plays</em> you have logged for a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Number of Plays</em> you have logged for a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>more</em> you play a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingTimePlayedCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingTimePlayedCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_TIME_PLAYED_CORR_MAP
  );
  let cardData = {};
  cardData.id = "rating-time-played-corr-card";
  cardData.title = "Time Played Impact on Your Rating";
  cardData.image = "rating-time-played-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    RATING_TIME_PLAYED_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Time Played</em> you have logged for a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Time Played</em> you have logged for a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>more</em> time you play a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingPriceCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingPriceCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_PRICE_CORR_MAP
  );

  let cardData = {};
  cardData.id = "rating-price-corr-card";
  cardData.title = "Price Impact on Your Rating";
  cardData.image = "rating-price-corr-canvas";
  cardData.mainStat = checkMapRange(Math.abs(rawStat), RATING_PRICE_CORR_MAP);
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Price</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Price</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>higher</em> the <em>Price</em> of a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genRatingYearCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.ratingYearCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_YEAR_CORR_MAP
  );
  let cardData = {};
  cardData.id = "rating-year-corr-card";
  cardData.title = "Release Year Impact on Your Rating";
  cardData.image = "rating-year-corr-canvas";
  cardData.mainStat = checkMapRange(Math.abs(rawStat), RATING_YEAR_CORR_MAP);
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Release Year</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it.`
      : `The <em>Release Year</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how you rate it. In general, the <em>more recently</em> a boardgame has been released, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> you enjoy it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genPlaysWeightCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.playsWeightCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_WEIGHT_CORR_MAP
  );
  let cardData = {};
  cardData.id = "plays-weight-corr-card";
  cardData.title = "Weight Impact on Your Play History";
  cardData.image = "plays-weight-corr-canvas";
  cardData.mainStat = checkMapRange(Math.abs(rawStat), PLAYS_WEIGHT_CORR_MAP);
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Weight</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it.`
      : `The <em>Weight</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it. In general, the <em>more complex</em> a boardgame is, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> frequently you play it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genPlaysPlayTimeCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.playsPlayTimeCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    PLAYS_PLAY_TIME_CORR_MAP
  );

  let cardData = {};
  cardData.id = "plays-play-time-corr-card";
  cardData.title = "Play Time Impact on Your Play History";
  cardData.image = "plays-play-time-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    PLAYS_PLAY_TIME_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Play Time</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it.`
      : `The <em>Play Time</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it. In general, the <em>lengthier</em> a boardgame is, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> frequently you play it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genPlaysRecommendedPlayersCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.playsRecommendedPlayersCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_WEIGHT_CORR_MAP
  );
  let cardData = {};
  cardData.id = "plays-recommended-players-corr-card";
  cardData.title = "Recommended Player Count Impact on Your Play History";
  cardData.image = "plays-recommended-players-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    PLAYS_RECOMMENDED_PLAYERS_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Recommended Player Count</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it.`
      : `The <em>Recommended Player Count</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it. In general, the <em>higher</em> the <em>Recommended Player Count</em> for a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> frequently you play it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genPlaysMaxPlayersCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.playsMaxPlayersCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    RATING_WEIGHT_CORR_MAP
  );
  let cardData = {};
  cardData.id = "plays-max-players-corr-card";
  cardData.title = "Player Limit Impact on Your Play History";
  cardData.image = "plays-max-players-corr-canvas";
  cardData.mainStat = checkMapRange(
    Math.abs(rawStat),
    PLAYS_MAX_PLAYERS_CORR_MAP
  );
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Player Limit</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it.`
      : `The <em>Player Limit</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it. In general, the <em>higher</em> the <em>Player Limit</em> a boardgame has, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> frequently you play it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const genPlaysPriceCorrInsightCard = (insight, communityStats) => {
  const rawStat = insight.pearsonr;
  const rawCommunityStat = communityStats.playsPriceCorr.pearsonr;
  const communityStat = checkMapRange(
    Math.abs(rawCommunityStat),
    PLAYS_PRICE_CORR_MAP
  );
  let cardData = {};
  cardData.id = "plays-price-corr-card";
  cardData.title = "Price Impact on Your Play History";
  cardData.image = "plays-price-corr-canvas";
  cardData.mainStat = checkMapRange(Math.abs(rawStat), PLAYS_PRICE_CORR_MAP);
  cardData.description =
    cardData.mainStat == "None"
      ? `The <em>Price</em> of a boardgame does not seem to significantly correlate - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it.`
      : `The <em>Price</em> of a boardgame has a ${genStatHtml(
          cardData.mainStat,
          "badge-pill badge-primary py-1"
        )} correlation -  ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawStat.toFixed(2),
          "badge-pill badge-primary py-1",
          undefined,
          genPearsonRLink()
        )} - with how frequently you play it. In general, the <em>higher</em> the <em>Price</em> of a boardgame, the <em>${
          rawStat > 0 ? "more" : "less"
        }</em> frequently you play it.`;
  cardData.description = cardData.description.concat(
    communityStat == "None"
      ? ` This correlation seems to be non-existent for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
      : ` This correlation is ${genStatHtml(
          communityStat,
          "badge-pill badge-info py-1"
        )} for the community in general - ${genStatHtml(
          " <em>R</em>:&nbsp;" + rawCommunityStat.toFixed(2),
          "badge-pill badge-info py-1",
          undefined,
          genPearsonRLink()
        )}.`
  );
  cardData.items = insight.items;
  cardData.trend = insight.trend;
  return cardData;
};

const createInsightCard = (
  insightCardData,
  communityStats,
  boardgameStats,
  gridId
) => {
  const card = $(`<div id="${insightCardData.id}" class="card shadow"></div>`);

  card.append('<div class="card-body pt-2"></div>');
  card
    .find(".card-body")
    .append(`<h2 class="card-title mb-3">${insightCardData.title}</h2>`);
  card
    .find(".card-body h2")
    .append(
      `  <span class="badge badge-primary align-middle">${insightCardData.mainStat}</span>`
    );
  card
    .find(".card-body")
    .append(`<p class="card-text">${insightCardData.description}</p>`);

  card.appendTo(gridId);

  // Create Modal Button if Boardgame list is large
  createAllEntriesModal(`${insightCardData.id}`);
  createAllEntriesModalButton(`#${insightCardData.id} .card-text`, 5);

  if ("note" in insightCardData) {
    card
      .find(".card-body")
      .append(
        `<a class="btn btn-primary mb-2 mx-5 d-flex justify-content-center" data-toggle="collapse" href="#${insightCardData.id}-note" role="button"><span class="fas fa-exclamation-circle pr-1"></span>Note</a>`
      );
    card
      .find(".card-body")
      .append(
        `<p class="collapse card-text text-muted p-2 show-note-btn"' id="${insightCardData.id}-note">${insightCardData.note}</p>`
      );
  }

  if ("showMoreButtonTitle" in insightCardData) {
    card
      .find(".card-body")
      .append(
        `<a id=${insightCardData.id}-show-more-button class="btn btn-primary d-flex justify-content-center mx-5 mb-2 collapsed show-more-btn" data-toggle="collapse" href="#${insightCardData.id}-show-more-text" role="button">${insightCardData.showMoreButtonTitle}</a>`
      );
    card
      .find(".card-body")
      .append(
        `<p class="collapse card-text show-more-text" style='font-size: 0.8rem; line-height: 1.7rem; text-align: center' id="${insightCardData.id}-show-more-text">${insightCardData.showMoreButtonText}</p>`
      );

    $(`#${insightCardData.id}-show-more-button`).on("click", function () {
      if ($(this).attr("class").includes("collapsed")) {
        $(this).html($(this).html().replace("Show", "Hide"));
      } else {
        $(this).html($(this).html().replace("Hide", "Show"));
      }
    });
  }

  // Add Image
  insightCardData.image.substring(0, 4) == "http"
    ? card.prepend(
        `<img class="card-img-top p-2" src=${insightCardData.image}>`
      )
    : card.append(
        `<canvas id="${insightCardData.image}" class="card-img-top"></canvas>`
      );

  if (
    insightCardData.image.substring(0, 4) != "http" &&
    !("dataSelectionButtonTitles" in insightCardData)
  ) {
    card.append(
      `<div id="${insightCardData.image}-legend" class="canvas-legend text-center" data-toggle="tooltip" data-placement="top" title="Due to API limitations, the Community Trend Line can not be computed for this relationship."></div>`
    );
    // card.append(`<div class="clearfix"></div>`);
  }

  if ("dataSelectionButtonTitles" in insightCardData) {
    // Get Field
    const field = getStringBetween(insightCardData.id, "most-common-", "-card");
    let buttonGroup = `<div class="d-flex justify-content-center"><div id=${insightCardData.id}-data-selector class="data-selector btn-group btn-group-sm pb-2 text-center" role="group">`;

    insightCardData.dataSelectionButtonTitles.forEach((t) => {
      buttonGroup = buttonGroup.concat(
        ` <button type="button" class="btn btn-primary mx-1">${t}</button>`
      );
    });
    buttonGroup.concat(`</div></div>`);
    $(buttonGroup).insertAfter(card.find(`#${insightCardData.image}`));

    $(`#${insightCardData.id}-data-selector`)
      .find(".btn")
      .eq(0)
      .on("click", function () {
        SPIDER_CHARTS[field].destroy();
        $(`#${insightCardData.image}`);
        SPIDER_CHARTS[field] = drawInsightsSpiderChart(
          insightCardData.image,
          insightCardData.rawStat,
          insightCardData.rawCommunityStat,
          {
            numEntries: SPIDER_CHART_ENTRIES,
            title: `Your Top 10 Game ${FIELD_TITLE_MAP[field]} (%)`,
            tooltipSuffix: FIELD_TOOLTIP_SUFFIX_MAP[field],
            replaceLabels: FIELD_LABEL_REPLACE_MAP[field],
          }
        );
      });

    $(`#${insightCardData.id}-data-selector`)
      .find(".btn")
      .eq(1)
      .on("click", function () {
        SPIDER_CHARTS[field].destroy();
        $(`#${insightCardData.image}`);
        SPIDER_CHARTS[field] = drawInsightsSpiderChart(
          insightCardData.image,
          insightCardData.rawStat,
          insightCardData.rawCommunityStat,
          {
            numEntries: SPIDER_CHART_ENTRIES,
            title: `Community Top 10 Game ${FIELD_TITLE_MAP[field]}`,
            tooltipSuffix: FIELD_TOOLTIP_SUFFIX_MAP[field],
            replaceLabels: FIELD_LABEL_REPLACE_MAP[field],
            topEntries: "community",
          }
        );
      });
  }

  if (insightCardData.image.substring(0, 4) != "http") {
    drawInsightCanvas(insightCardData, communityStats, boardgameStats);
  }

  return card;
};

const drawInsightCanvas = (insightCardData, communityStats, boardgameStats) => {
  if (insightCardData.id == "avg-plays-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgPlaysHist,
      "How You Compare to the Community",
      "Average Plays",
      {}
    );
  }

  if (insightCardData.id == "avg-time-played-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgTimePlayedHist,
      "Community Distribution",
      "Average Time Played (Hours)",
      {}
    );
  }

  if (insightCardData.id == "not-played-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.prctNotPlayedHist,
      "Community Distribution",
      "Average Not Played Games (%)",
      {}
    );
  }

  if (insightCardData.id == "avg-value-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgValueHist,
      "Community Distribution",
      "Average Price per Play (USD)",
      {}
    );
  }

  if (insightCardData.id == "avg-weight-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgWeightHist,
      "Community Distribution",
      "Average Weight",
      {}
    );
  }

  if (insightCardData.id == "avg-user-rating-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgRatingHist,
      "Community Distribution",
      "Average User Rating",
      {}
    );
  }

  if (insightCardData.id == "avg-bgg-rating-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgBggRatingHist,
      "Community Distribution",
      "Average Geek Rating",
      {}
    );
  }

  if (insightCardData.id == "avg-avg-rating-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgAvgRatingHist,
      "Community Distribution",
      "Average Community Rating",
      {}
    );
  }

  if (insightCardData.id == "avg-rating-diff-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgRatingDiffHist,
      "Community Distribution",
      "Average Rating Difference",
      {}
    );
  }

  if (insightCardData.id == "avg-year-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgYearHist,
      "Community Distribution",
      "Average Release Year",
      {}
    );
  }

  if (insightCardData.id == "most-common-years-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.mostCommonYearHist,
      "Community Distribution",
      "Most Common Release Year",
      {}
    );
  }

  if (insightCardData.id == "avg-recommended-players-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgRecommendedPlayersHist,
      "Community Distribution",
      "Average Recommended Players",
      {}
    );
  }

  // if (insightCardData.id == "avg-max-players-card") {
  //   drawInsightsBarChart(
  //     insightCardData.image,
  //     insightCardData.rawStat,
  //     communityStats.avgMaxPlayersHist,
  //     "Community Distribution",
  //     "Average Player Limit",
  //     {}
  //   );
  // }

  if (insightCardData.id == "median-max-players-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.medianMaxPlayersHist,
      "Community Distribution",
      "Median Player Limit",
      {}
    );
  }

  if (insightCardData.id == "avg-min-players-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgMinPlayersHist,
      "Community Distribution",
      "Average Minimum Player Count",
      {}
    );
  }

  if (insightCardData.id == "avg-price-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.avgPriceHist,
      "Community Distribution",
      "Average Boardgame Price (USD)",
      {}
    );
  }

  if (insightCardData.id == "total-price-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.totalPriceHist,
      "Community Distribution",
      "Collection Value (USD)",
      { labelsInThousands: true }
    );
  }

  if (insightCardData.id == "top100-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.top100Hist,
      "Community Distribution",
      "On BGG's Top 100 (%)",
      {}
    );
  }

  if (insightCardData.id == "kickstarter-card") {
    drawInsightsBarChart(
      insightCardData.image,
      insightCardData.rawStat,
      communityStats.kickstarterHist,
      "Community Distribution",
      "Boardgames on Kickstarter (%)",
      {}
    );
  }

  if (insightCardData.id == "rating-weight-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      boardgameStats.userRatingWeightCorr.trend,
      insightCardData.items,
      "weight",
      "userRating",
      "User Rating Vs Weight",
      {}
    );
  }

  if (insightCardData.id == "rating-play-time-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      boardgameStats.userRatingPlayTimeCorr.trend,
      insightCardData.items,
      "playTime",
      "userRating",
      "User Rating Vs Play Time",
      {}
    );
  }

  if (insightCardData.id == "rating-recommended-players-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      boardgameStats.userRatingRecommendedPlayersCorr.trend,
      insightCardData.items,
      "recommendedPlayers",
      "userRating",
      "User Rating Vs Recommended Players",
      {}
    );
  }

  if (insightCardData.id == "rating-max-players-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      boardgameStats.userRatingMaxPlayersCorr.trend,
      insightCardData.items,
      "maxPlayers",
      "userRating",
      "User Rating Vs Player Limit",
      {}
    );
  }

  if (insightCardData.id == "rating-plays-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "nPlays",
      "userRating",
      "User Rating Vs #Plays",
      {}
    );
  }

  if (insightCardData.id == "rating-time-played-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "timePlayed",
      "userRating",
      "User Rating Vs Time Played",
      {}
    );
  }

  if (insightCardData.id == "rating-price-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      boardgameStats.userRatingPriceCorr.trend,
      insightCardData.items,
      "price",
      "userRating",
      "User Rating Vs Price",
      {}
    );
  }

  if (insightCardData.id == "rating-year-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      boardgameStats.userRatingYearCorr.trend,
      insightCardData.items,
      "yearPublished",
      "userRating",
      "User Rating Vs Release Year",
      {}
    );
  }

  if (insightCardData.id == "plays-weight-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "weight",
      "nPlays",
      "#Plays Vs Weight",
      {}
    );
  }

  if (insightCardData.id == "plays-play-time-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "playTime",
      "nPlays",
      "#Plays Vs Play Time",
      { yMin: 0 }
    );
  }

  if (insightCardData.id == "plays-recommended-players-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "recommendedPlayers",
      "nPlays",
      "#Plays Vs Recommended Players",
      {}
    );
  }

  if (insightCardData.id == "plays-max-players-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "maxPlayers",
      "nPlays",
      "#Plays Vs Player Limit",
      {}
    );
  }

  if (insightCardData.id == "plays-price-corr-card") {
    drawInsightsCorrChart(
      insightCardData.image,
      insightCardData.trend,
      undefined,
      insightCardData.items,
      "price",
      "nPlays",
      "#Plays Vs Price",
      {}
    );
  }

  if (
    Object.keys(FIELD_TITLE_MAP).includes(
      getStringBetween(insightCardData.id, "most-common-", "-card")
    )
  ) {
    const field = getStringBetween(insightCardData.id, "most-common-", "-card");
    const chart = drawInsightsSpiderChart(
      insightCardData.image,
      insightCardData.rawStat,
      insightCardData.rawCommunityStat,
      {
        numEntries: SPIDER_CHART_ENTRIES,
        title: `Your Top 10 Game ${FIELD_TITLE_MAP[field]}`,
        tooltipSuffix: FIELD_TOOLTIP_SUFFIX_MAP[field],
        replaceLabels: FIELD_LABEL_REPLACE_MAP[field],
      }
    );
    SPIDER_CHARTS[field] = chart;
  }
};

const createAllEntriesModal = (elementId) => {
  $("body").append(`<div
      class="modal fade in"
      id=${elementId}-all-entries-modal
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
  >
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">All Entries</h5>
                  <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                  >
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body text-center">
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
  </div>`);
};

const createAllEntriesModalButton = (elementId, threshold) => {
  const modalId =
    elementId.substr(0, elementId.indexOf(" ")) + "-all-entries-modal";

  $(`${modalId} .modal-dialog .modal-content .modal-body`).empty();
  const aElementArray = $(elementId).find(".badge-secondary");
  let modalBody = "";
  aElementArray.each(function (_, e) {
    modalBody = modalBody.concat(e.outerHTML).concat(", ");
  });
  modalBody = modalBody.slice(0, -2);
  $(`${modalId} .modal-dialog .modal-content .modal-body`).html(modalBody);

  if (aElementArray.length > threshold) {
    aElementArray.each((i, d) => {
      if (i > threshold) {
        d.remove();
      }
    });

    $(elementId).html($(elementId).html().replace(/, ,+/g, ""));
    $(elementId).html(
      $(elementId)
        .html()
        .replace(
          /  +/,
          `, <a class="badge-pill badge-secondary py-1 btn-show-all" data-toggle="modal" data-target="${modalId}">...</a> `
        )
    );
    $(elementId).html($(elementId).html().replace(/> *,+/g, ">,"));
    $(elementId).html($(elementId).html().replace("...</a>,", "...</a>"));
  }
};

const genStatHtml = (stats, classes, unit, tooltipText) => {
  stats = Array.isArray(stats) ? stats : [stats];
  let statsHtml = "";

  stats.forEach((e) => {
    statsHtml = statsHtml.concat(
      unit
        ? `<span class="${classes}">${String(e).replace(
            / /g,
            "&nbsp"
          )}&nbsp${unit}</span>>,`
        : `<span class="${classes}">${String(e)
            .replace(/ /g, "&nbsp")
            .replace(/-/g, "&#8209;")}</span>, `
    );
  });

  if (tooltipText) {
    statsHtml =
      statsHtml.slice(0, 6) +
      ` data-toggle="tooltip" data-placement="top" data-html="true" + title="${tooltipText}" ` +
      statsHtml.slice(6);
  }
  statsHtml = statsHtml.substring(0, statsHtml.length - 2);

  return statsHtml;
};

const compareUserVsCommunityStat = (
  userStat,
  communityStat,
  thresholdLvl1,
  thresholdLvl2
) => {
  if (
    userStat >=
    communityStat +
      (thresholdLvl2 >= 1 ? thresholdLvl2 : communityStat * thresholdLvl2)
  ) {
    return "considerably above";
  } else if (
    userStat >=
    communityStat +
      (thresholdLvl1 >= 1 ? thresholdLvl1 : communityStat * thresholdLvl1)
  ) {
    return "above";
  } else if (
    userStat <=
    communityStat -
      (thresholdLvl2 >= 1 ? thresholdLvl2 : communityStat * thresholdLvl2)
  ) {
    return "considerably below";
  } else if (
    userStat <=
    communityStat -
      (thresholdLvl1 >= 1 ? thresholdLvl1 : communityStat * thresholdLvl1)
  ) {
    return "below";
  } else {
    return "in line with";
  }
};

const genPearsonRLink = () => {
  return `<em>R</em>, or <em>Pearson's r</em></a> is a statistic that measures linear correlation between two variables, ranging between 1 (total correlation) and -1 (total anti-correlation).`;
};

const genSpearmanRhoLink = () => {
  return `<em>R</em>, or <em>Pearson's rank correlation coefficient</em></a> is a statistic that assesses the monotonical correlation between two variables, ranging between 1 (total correlation) and -1 (total anti-correlation).`;
};

const getTopNKeys = (dict, n) => {
  var pairs = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  pairs.sort(function (a, b) {
    return a[1] - b[1];
  });

  return pairs.slice(-n).reduce(function (obj, pair) {
    obj[pair[0]] = pair[1];
    return obj;
  }, {});
};

const insightsFluidContainerToggle = (threshold) => {
  $("#insights").width() > threshold
    ? $("#insights").removeClass("container-fluid").addClass("container")
    : undefined;
};

const removeUnusedInsightsTitles = (prefixList) => {
  prefixList.forEach((e) => {
    if ($(`#${e}-insights-grid`).is(":empty")) {
      $(`#${e}-insights-grid`).remove();
      $(`#${e}-insights-grid-title`).remove();
      $(`#${e}-insights-btn-group`).remove();
    }
  });
};
