const Collection = require("../models/collection");
const {
  sum,
  average,
  median,
  mode,
  getElementsFrequency,
  getHistogram,
} = require("../utils/math");

const updateCollectionStatistics = async (statistics) => {
  let collectionArray = await Collection.find({});
  collectionArray = collectionArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  // Get Total Collections
  statistics.stats.set("nCollections", getNCollections(collectionArray));

  // Get Total Items
  statistics.stats.set("nItems", getNItems(collectionArray));
  getNItems;

  // Get Average Collection Items
  statistics.stats.set(
    "avgTotalItems",
    getCollectionAvgTotalItems(collectionArray)
  );

  // Get Average Total Plays
  statistics.stats.set("avgPlays", getCollectionAvgPlays(collectionArray));

  // Get Average Played Time
  statistics.stats.set(
    "avgTimePlayed",
    parseFloat(getCollectionAvgTimePlayed(collectionArray).toFixed(2))
  );

  // Get Average Played Time
  statistics.stats.set(
    "avgNotPlayed",
    getCollectionAvgNotPlayed(collectionArray)[0]
  );
  statistics.stats.set(
    "avgPrctNotPlayed",
    getCollectionAvgNotPlayed(collectionArray)[1]
  );

  // Get Average Value
  statistics.stats.set("avgValue", getCollectionAvgValue(collectionArray));

  // Get Average Weight
  statistics.stats.set("avgWeight", getCollectionAvgWeight(collectionArray));

  // Get Average Rating
  statistics.stats.set("avgRating", getCollectionAvgRating(collectionArray));

  // Get Average BGG Rating
  statistics.stats.set(
    "avgBggRating",
    getCollectionAvgBggRating(collectionArray)
  );

  // Get Average Avg Rating
  statistics.stats.set(
    "avgAvgRating",
    getCollectionAvgAvgRating(collectionArray)
  );

  // Get Average Rating Diff
  statistics.stats.set(
    "avgRatingDiff",
    getCollectionAvgRatingDiff(collectionArray)
  );

  // Get Rating Average Rating Corr
  statistics.stats.set(
    "ratingAvgRatingCorr",
    getCollectionRatingAvgRatingCorr(collectionArray)
  );

  // Get Rating Weight Corr
  statistics.stats.set(
    "ratingWeightCorr",
    getCollectionRatingWeightCorr(collectionArray)
  );

  // Get Rating Recommended Players Corr
  statistics.stats.set(
    "ratingRecommendedPlayersCorr",
    getCollectionRatingRecommendedPlayersCorr(collectionArray)
  );

  // Get Rating Play Time Corr
  statistics.stats.set(
    "ratingPlayTimeCorr",
    getCollectionRatingPlayTimeCorr(collectionArray)
  );

  // Get Rating Max Players Corr
  statistics.stats.set(
    "ratingMaxPlayersCorr",
    getCollectionRatingMaxPlayersCorr(collectionArray)
  );

  // Get Rating Plays Corr
  statistics.stats.set(
    "ratingPlaysCorr",
    getCollectionRatingPlaysCorr(collectionArray)
  );

  // Get Rating Time Played Corr
  statistics.stats.set(
    "ratingTimePlayedCorr",
    getCollectionRatingTimePlayedCorr(collectionArray)
  );

  // Get Rating Price Corr
  statistics.stats.set(
    "ratingPriceCorr",
    getCollectionRatingPriceCorr(collectionArray)
  );

  // Get Rating Year Published Corr
  statistics.stats.set(
    "ratingYearCorr",
    getCollectionRatingYearCorr(collectionArray)
  );

  // Get Plays Weight Corr
  statistics.stats.set(
    "playsWeightCorr",
    getCollectionPlaysWeightCorr(collectionArray)
  );

  // Get Plays Play Time Corr
  statistics.stats.set(
    "playsPlayTimeCorr",
    getCollectionPlaysPlayTimeCorr(collectionArray)
  );

  // Get Plays Recommended Players Corr
  statistics.stats.set(
    "playsRecommendedPlayersCorr",
    getCollectionPlaysRecommendedPlayersCorr(collectionArray)
  );

  // Get Plays Max Players Corr
  statistics.stats.set(
    "playsMaxPlayersCorr",
    getCollectionPlaysMaxPlayersCorr(collectionArray)
  );

  // Get Plays Price Corr
  statistics.stats.set(
    "playsPriceCorr",
    getCollectionPlaysPriceCorr(collectionArray)
  );

  // Get Avg Publish Year
  statistics.stats.set("avgYear", getCollectionAvgYear(collectionArray));

  // Get Most Common Publish Year
  statistics.stats.set(
    "mostCommonYear",
    getCollectionMostCommonYear(collectionArray)
  );

  // Get Avg Recommended Players
  statistics.stats.set(
    "avgRecommendedPlayers",
    getCollectionAvgRecommendedPlayers(collectionArray)
  );

  // Get Avg Max Players
  statistics.stats.set(
    "avgMaxPlayers",
    getCollectionAvgMaxPlayers(collectionArray)
  );

  // Get Median Max Players
  statistics.stats.set(
    "medianMaxPlayers",
    getCollectionMedianMaxPlayers(collectionArray)
  );

  // Get Avg Min Players
  statistics.stats.set(
    "avgMinPlayers",
    getCollectionAvgMinPlayers(collectionArray)
  );

  // Get Avg Price
  statistics.stats.set("avgPrice", getCollectionAvgPrice(collectionArray));

  // Get Median Price
  statistics.stats.set(
    "medianPrice",
    getCollectionMedianPrice(collectionArray)
  );

  // Get Average Total Price
  statistics.stats.set(
    "avgTotalPrice",
    getCollectionAvgTotalPrice(collectionArray)
  );

  // Get Average Top 100
  statistics.stats.set("avgTop100", getCollectionAvgTop100(collectionArray)[0]);
  statistics.stats.set(
    "avgPrctTop100",
    getCollectionAvgTop100(collectionArray)[1]
  );

  // Get Average Kickstrater
  statistics.stats.set(
    "avgKickstarter",
    getCollectionAvgKickstarter(collectionArray)[0]
  );
  statistics.stats.set(
    "avgPrctKickstarter",
    getCollectionAvgKickstarter(collectionArray)[1]
  );

  // // Get Most Played Histogram
  // statistics.stats.set(
  //   "mostPlayedHist",
  //   getCollectionMostPlayedHist(collectionArray)
  // );

  // // Get Most Time Played Histogram
  // statistics.stats.set(
  //   "mostTimePlayedHist",
  //   getCollectionMostTimePlayedHist(collectionArray)
  // );

  // // Get Least Played Histogram
  // statistics.stats.set(
  //   "leastPlayedHist",
  //   getCollectionLeastPlayedHist(collectionArray)
  // );

  // // Get Least Time Played Histogram
  // statistics.stats.set(
  //   "leastTimePlayedHist",
  //   getCollectionLeastTimePlayedHist(collectionArray)
  // );

  // Get Avg Plays Histogram
  statistics.stats.set(
    "avgPlaysHist",
    getCollectionAvgPlaysHist(collectionArray)
  );

  // Get Avg Time Played Histogram
  statistics.stats.set(
    "avgTimePlayedHist",
    getCollectionAvgTimePlayedHist(collectionArray)
  );

  // Get Prct Not Played Histogram
  statistics.stats.set(
    "prctNotPlayedHist",
    getCollectionPrctNotPlayedHist(collectionArray)
  );

  // Get Average Value Histogram
  statistics.stats.set(
    "avgValueHist",
    getCollectionAvgValueHist(collectionArray)
  );

  // Get Average Weight Histogram
  statistics.stats.set(
    "avgWeightHist",
    getCollectionAvgWeightHist(collectionArray)
  );

  // Get Average User Rating Histogram
  statistics.stats.set(
    "avgRatingHist",
    getCollectionAvgRatingHist(collectionArray)
  );

  // Get Average Average Rating Histogram
  statistics.stats.set(
    "avgAvgRatingHist",
    getCollectionAvgAvgRatingHist(collectionArray)
  );

  // Get Average Bgg Rating Histogram
  statistics.stats.set(
    "avgBggRatingHist",
    getCollectionAvgBggRatingHist(collectionArray)
  );

  // Get Rating Diff Histogram
  statistics.stats.set(
    "avgRatingDiffHist",
    getCollectionAvgRatingDiffHist(collectionArray)
  );

  // Get Average Publish Year Histogram
  statistics.stats.set(
    "avgYearHist",
    getCollectionAvgYearHist(collectionArray)
  );

  // Get Average Most Common Year Histogram
  statistics.stats.set(
    "mostCommonYearHist",
    getCollectionMostCommonYearHist(collectionArray)
  );

  // Get Average Recommended Players Histogram
  statistics.stats.set(
    "avgRecommendedPlayersHist",
    getCollectionAvgRecommendedPlayersHist(collectionArray)
  );

  // Get Average Max Players Histogram
  statistics.stats.set(
    "avgMaxPlayersHist",
    getCollectionAvgMaxPlayersHist(collectionArray)
  );

  // Get Median Max Players Histogram
  statistics.stats.set(
    "medianMaxPlayersHist",
    getCollectionMedianMaxPlayersHist(collectionArray)
  );

  // Get Average Min Players Histogram
  statistics.stats.set(
    "avgMinPlayersHist",
    getCollectionAvgMinPlayersHist(collectionArray)
  );

  // Get Average Price Histogram
  statistics.stats.set(
    "avgPriceHist",
    getCollectionAvgPriceHist(collectionArray)
  );

  // Get Median Price Histogram
  statistics.stats.set(
    "medianPriceHist",
    getCollectionMedianPriceHist(collectionArray)
  );

  // Get Total Price Histogram
  statistics.stats.set(
    "totalPriceHist",
    getCollectionTotalPriceHist(collectionArray)
  );

  // Get Top 100 Histogram
  statistics.stats.set(
    "top100Hist",
    getCollectionPrctTop100Hist(collectionArray)
  );

  // Get Kickstarter Histogram
  statistics.stats.set(
    "kickstarterHist",
    getCollectionPrctKickstarterHist(collectionArray)
  );

  // Get Year Registered Histogram
  statistics.stats.set(
    "yearRegisterdHist",
    getYearRegisteredHist(collectionArray)
  );

  // Get Category Histogram
  statistics.stats.set(
    "categoryHist",
    getStatHist(collectionArray, "category")
  );

  // Get Mechanic Histogram
  statistics.stats.set(
    "mechanicHist",
    getStatHist(collectionArray, "mechanic")
  );

  // Get Family Histogram
  statistics.stats.set("familyHist", getStatHist(collectionArray, "family"));

  // Get Publisher Histogram
  statistics.stats.set(
    "publisherHist",
    getStatHist(collectionArray, "publisher")
  );

  // Get Designer Histogram
  statistics.stats.set(
    "designerHist",
    getStatHist(collectionArray, "designer")
  );

  // Get Artist Histogram
  statistics.stats.set("artistHist", getStatHist(collectionArray, "artist"));

  return statistics;
};

const getNCollections = (collectionArray) => {
  return collectionArray.length;
};

const getNItems = (collectionArray) => {
  return sum(collectionArray.map((c) => c.totalItems));
};

const getCollectionAvgTotalItems = (collectionsArray) => {
  return parseInt(average(collectionsArray.map((c) => c.totalItems)));
};

const getCollectionAvgPlays = (collectionsArray) => {
  return parseInt(
    average(
      collectionsArray
        .filter((c) => c.insights.get("avgPlays") != undefined)
        .map((c) => c.insights.get("avgPlays").avgPlays)
    )
  );
};

const getCollectionAvgTimePlayed = (collectionsArray) => {
  return parseInt(
    average(
      collectionsArray
        .filter((c) => c.insights.get("avgTimePlayed") != undefined)
        .map((c) => c.insights.get("avgTimePlayed").avgTimePlayed)
    )
  );
};

const getCollectionAvgNotPlayed = (collectionsArray) => {
  avgNotPlayed = parseInt(
    average(
      collectionsArray
        .filter((c) => c.insights.get("notPlayed") != undefined)
        .map((c) => c.insights.get("notPlayed").nNotPlayed)
    )
  );
  avgPrctNotPlayed = average(
    collectionsArray
      .filter((c) => c.insights.get("notPlayed") != undefined)
      .map((c) => c.insights.get("notPlayed").prctNotPlayed)
  );
  return [avgNotPlayed, avgPrctNotPlayed];
};

const getCollectionAvgValue = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgValue") != undefined)
      .map((c) => c.insights.get("avgValue").avgValue)
  );
};

const getCollectionAvgWeight = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgWeight") != undefined)
      .map((c) => c.insights.get("avgWeight").avgWeight)
  );
};

const getCollectionAvgRating = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgRating") != undefined)
      .map((c) => c.insights.get("avgRating").avgUserRating)
  );
};

const getCollectionAvgBggRating = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgBggRating") != undefined)
      .map((c) => c.insights.get("avgBggRating").avgBggRating)
  );
};

const getCollectionAvgAvgRating = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgAvgRating") != undefined)
      .map((c) => c.insights.get("avgAvgRating").avgAvgRating)
  );
};

const getCollectionAvgRatingDiff = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgRatingDiff") != undefined)
      .map((c) => c.insights.get("avgRatingDiff").avgRatingDiff)
  );
};

const getCollectionRatingAvgRatingCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingAvgRatingCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingAvgRatingCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingAvgRatingCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingWeightCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingWeightCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingWeightCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingWeightCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingRecommendedPlayersCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingRecommendedPlayersCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingRecommendedPlayersCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingRecommendedPlayersCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingPlayTimeCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingPlayTimeCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingPlayTimeCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingPlayTimeCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingMaxPlayersCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingMaxPlayersCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingMaxPlayersCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingMaxPlayersCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingPlaysCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingPlaysCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingPlaysCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingPlaysCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingTimePlayedCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingTimePlayedCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingTimePlayedCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingTimePlayedCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingPriceCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingPriceCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingPriceCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingPriceCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingYearCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("ratingYearCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingYearCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("ratingYearCorr").spearmanr
      )
    ),
  };
};

const getCollectionPlaysWeightCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("playsWeightCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsWeightCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsWeightCorr").spearmanr
      )
    ),
  };
};

const getCollectionPlaysPlayTimeCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("playsPlayTimeCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsPlayTimeCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsPlayTimeCorr").spearmanr
      )
    ),
  };
};

const getCollectionPlaysRecommendedPlayersCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("playsRecommendedPlayersCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsRecommendedPlayersCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsRecommendedPlayersCorr").spearmanr
      )
    ),
  };
};

const getCollectionPlaysMaxPlayersCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("playsMaxPlayersCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsMaxPlayersCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsMaxPlayersCorr").spearmanr
      )
    ),
  };
};

const getCollectionPlaysPriceCorr = (collectionsArray) => {
  const filteredCollectionsArray = collectionsArray.filter(
    (c) => c.insights.get("playsPriceCorr") != undefined
  );
  return {
    pearsonr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsPriceCorr").pearsonr
      )
    ),
    spearmanr: average(
      filteredCollectionsArray.map(
        (c) => c.insights.get("playsPriceCorr").spearmanr
      )
    ),
  };
};

const getCollectionAvgYear = (collectionsArray) => {
  return parseInt(
    average(
      collectionsArray
        .filter((c) => c.insights.get("avgYear") != undefined)
        .map((c) => c.insights.get("avgYear").avgYear)
    )
  );
};

const getCollectionMostCommonYear = (collectionsArray) => {
  return mode(
    ...collectionsArray
      .filter((c) => c.insights.get("mostCommonYears") != undefined)
      .map((c) => c.insights.get("mostCommonYears").mostCommonYears)
  );
};

const getCollectionAvgRecommendedPlayers = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgRecommendedPlayers") != undefined)
      .map((c) => c.insights.get("avgRecommendedPlayers").avgRecommendedPlayers)
  );
};

const getCollectionAvgMaxPlayers = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgMaxPlayers") != undefined)
      .map((c) => c.insights.get("avgMaxPlayers").avgMaxPlayers)
  );
};

const getCollectionMedianMaxPlayers = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("medianMaxPlayers") != undefined)
      .map((c) => c.insights.get("medianMaxPlayers").medianMaxPlayers)
  );
};

const getCollectionAvgMinPlayers = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgMinPlayers") != undefined)
      .map((c) => c.insights.get("avgMinPlayers").avgMinPlayers)
  );
};

const getCollectionAvgPrice = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("avgPrice") != undefined)
      .map((c) => c.insights.get("avgPrice").avgPrice)
  );
};

const getCollectionMedianPrice = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("medianPrice") != undefined)
      .map((c) => c.insights.get("medianPrice").medianPrice)
  );
};

const getCollectionAvgTotalPrice = (collectionsArray) => {
  return average(
    collectionsArray
      .filter((c) => c.insights.get("totalPrice") != undefined)
      .map((c) => c.insights.get("totalPrice").totalPrice)
  );
};

const getCollectionAvgTop100 = (collectionsArray) => {
  const avgTop100 = parseInt(
    average(
      collectionsArray
        .filter((c) => c.insights.get("top100") != undefined)
        .map((c) => c.insights.get("top100").nTop100)
    )
  );
  const avgPrctTop100 = average(
    collectionsArray
      .filter((c) => c.insights.get("top100") != undefined)
      .map((c) => c.insights.get("top100").prctTop100)
  );
  return [avgTop100, avgPrctTop100];
};

const getCollectionAvgKickstarter = (collectionsArray) => {
  const avgKickstarter = parseInt(
    average(
      collectionsArray
        .filter((c) => c.insights.get("kickstarter") != undefined)
        .map((c) => c.insights.get("kickstarter").nKickstarter)
    )
  );
  const avgPrctKickstarter = average(
    collectionsArray
      .filter((c) => c.insights.get("kickstarter") != undefined)
      .map((c) => c.insights.get("kickstarter").prctKickstarter)
  );
  return [avgKickstarter, avgPrctKickstarter];
};

const getCollectionMostPlayedHist = (collectionsArray) => {
  const mostPlayedItemsNested = collectionsArray
    .filter((c) => c.insights.get("mostPlayed") != undefined)
    .map((c) => c.insights.get("mostPlayed").items.map((i) => i.id));
  const mostPlayedItems = [];
  mostPlayedItemsNested.forEach((e) =>
    e.forEach((i) => mostPlayedItems.push(i))
  );

  return getElementsFrequency(mostPlayedItems);
};

const getCollectionMostTimePlayedHist = (collectionsArray) => {
  const mostPlayedItemsNested = collectionsArray
    .filter((c) => c.insights.get("mostTimePlayed") != undefined)
    .map((c) => c.insights.get("mostTimePlayed").items.map((i) => i.id));
  const mostPlayedItems = [];
  mostPlayedItemsNested.forEach((e) =>
    e.forEach((i) => mostPlayedItems.push(i))
  );

  return getElementsFrequency(mostPlayedItems);
};

const getCollectionLeastPlayedHist = (collectionsArray) => {
  const leastPlayedItemsNested = collectionsArray
    .filter((c) => c.insights.get("leastPlayed") != undefined)
    .map((c) => c.insights.get("leastPlayed").items.map((i) => i.id));
  const leastPlayedItems = [];
  leastPlayedItemsNested.forEach((e) =>
    e.forEach((i) => leastPlayedItems.push(i))
  );

  return getElementsFrequency(leastPlayedItems);
};

const getCollectionLeastTimePlayedHist = (collectionsArray) => {
  const leastPlayedItemsNested = collectionsArray
    .filter((c) => c.insights.get("leastTimePlayed") != undefined)
    .map((c) => c.insights.get("leastTimePlayed").items.map((i) => i.id));
  const leastPlayedItems = [];
  leastPlayedItemsNested.forEach((e) =>
    e.forEach((i) => leastPlayedItems.push(i))
  );

  return getElementsFrequency(leastPlayedItems);
};

const getCollectionAvgPlaysHist = (collectionsArray) => {
  const avgPlays = collectionsArray
    .filter((c) => c.insights.get("avgPlays") != undefined)
    .map((c) => c.insights.get("avgPlays").avgPlays);

  return getHistogram(avgPlays, [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ]);
};

const getCollectionAvgTimePlayedHist = (collectionsArray) => {
  const avgTimePlayed = collectionsArray
    .filter((c) => c.insights.get("avgTimePlayed") != undefined)
    .map((c) => c.insights.get("avgTimePlayed").avgTimePlayed);

  return getHistogram(avgTimePlayed, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // return getHistogram(avgTimePlayed, [
  //   0,
  //   30,
  //   60,
  //   90,
  //   120,
  //   150,
  //   180,
  //   210,
  //   240,
  //   270,
  //   300,
  //   330,
  //   360,
  //   390,
  //   420,
  //   450,
  //   480,
  //   510,
  //   540,
  //   570,
  //   600,
  // ]);
};

const getCollectionPrctNotPlayedHist = (collectionsArray) => {
  const prctNotPlayed = collectionsArray
    .filter((c) => c.insights.get("notPlayed") != undefined)
    .map((c) => c.insights.get("notPlayed").prctNotPlayed * 100);

  return getHistogram(prctNotPlayed, [0, 20, 40, 60, 80, 100]);
};

const getCollectionAvgValueHist = (collectionsArray) => {
  const avgValues = collectionsArray
    .filter((c) => c.insights.get("avgValue") != undefined)
    .map((c) => 1 / c.insights.get("avgValue").avgValue);

  return getHistogram(avgValues, [0, 1, 2, 3, 4, 5, 10, 20, 30, 40, 50]);
};

const getCollectionAvgWeightHist = (collectionsArray) => {
  const avgWeights = collectionsArray
    .filter((c) => c.insights.get("avgWeight") != undefined)
    .map((c) => c.insights.get("avgWeight").avgWeight);

  return getHistogram(avgWeights, [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
};

const getCollectionAvgRatingHist = (collectionsArray) => {
  const avgRatings = collectionsArray
    .filter((c) => c.insights.get("avgRating") != undefined)
    .map((c) => c.insights.get("avgRating").avgUserRating);

  return getHistogram(avgRatings, [0, 5, 6, 7, 8, 9, 10]);
};

const getCollectionAvgAvgRatingHist = (collectionsArray) => {
  const avgAvgRatings = collectionsArray
    .filter((c) => c.insights.get("avgAvgRating") != undefined)
    .map((c) => c.insights.get("avgAvgRating").avgAvgRating);

  return getHistogram(avgAvgRatings, [0, 5, 6, 7, 8, 9, 10]);
};

const getCollectionAvgBggRatingHist = (collectionsArray) => {
  const avgBggRatings = collectionsArray
    .filter((c) => c.insights.get("avgBggRating") != undefined)
    .map((c) => c.insights.get("avgBggRating").avgBggRating);

  return getHistogram(avgBggRatings, [0, 5, 6, 7, 8, 9, 10]);
};

const getCollectionAvgRatingDiffHist = (collectionsArray) => {
  const avgRatingsDiffs = collectionsArray
    .filter((c) => c.insights.get("avgRatingDiff") != undefined)
    .map((c) => c.insights.get("avgRatingDiff").avgRatingDiff);

  return getHistogram(avgRatingsDiffs, [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]);
};

const getCollectionAvgYearHist = (collectionsArray) => {
  const avgYears = collectionsArray
    .filter((c) => c.insights.get("avgYear") != undefined)
    .map((c) => c.insights.get("avgYear").avgYear);

  return getHistogram(avgYears, [
    1500,
    1900,
    1950,
    1975,
    1990,
    1995,
    2000,
    2005,
    2010,
    2012,
    2014,
    2016,
    2018,
    2020,
  ]);
};

const getCollectionMostCommonYearHist = (collectionsArray) => {
  const mostCommonYears = collectionsArray
    .filter((c) => c.insights.get("mostCommonYears") != undefined)
    .map((c) => c.insights.get("mostCommonYears").mostCommonYears);

  return getHistogram(mostCommonYears, [
    1500,
    1900,
    1950,
    1975,
    1990,
    1995,
    2000,
    2005,
    2010,
    2012,
    2014,
    2016,
    2018,
    2020,
  ]);
};

const getCollectionAvgRecommendedPlayersHist = (collectionsArray) => {
  const recommendedPlayers = collectionsArray
    .filter((c) => c.insights.get("avgRecommendedPlayers") != undefined)
    .map((c) => c.insights.get("avgRecommendedPlayers").avgRecommendedPlayers);

  return getHistogram(recommendedPlayers, [1, 2, 3, 4, 5, 6, 7, 20]);
};

const getCollectionAvgMaxPlayersHist = (collectionsArray) => {
  const maxPlayers = collectionsArray
    .filter((c) => c.insights.get("avgMaxPlayers") != undefined)
    .map((c) => c.insights.get("avgMaxPlayers").avgMaxPlayers);

  return getHistogram(maxPlayers, [1, 2, 3, 4, 5, 6, 7, 20]);
};

const getCollectionMedianMaxPlayersHist = (collectionsArray) => {
  const maxPlayers = collectionsArray
    .filter((c) => c.insights.get("medianMaxPlayers") != undefined)
    .map((c) => c.insights.get("medianMaxPlayers").medianMaxPlayers);

  return getHistogram(maxPlayers, [1, 2, 3, 4, 5, 6, 7, 20]);
};

const getCollectionAvgMinPlayersHist = (collectionsArray) => {
  const minPlayers = collectionsArray
    .filter((c) => c.insights.get("avgMinPlayers") != undefined)
    .map((c) => c.insights.get("avgMinPlayers").avgMinPlayers);

  return getHistogram(minPlayers, [1, 1.5, 2, 2.5, 3, 3.5, 4]);
};

const getCollectionAvgPriceHist = (collectionsArray) => {
  const avgPrices = collectionsArray
    .filter((c) => c.insights.get("avgPrice") != undefined)
    .map((c) => c.insights.get("avgPrice").avgPrice);

  return getHistogram(avgPrices, [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    150,
    200,
    300,
    400,
    500,
  ]);
};

const getCollectionMedianPriceHist = (collectionsArray) => {
  const medianPrices = collectionsArray
    .filter((c) => c.insights.get("medianPrice") != undefined)
    .map((c) => c.insights.get("medianPrice").medianPrice);

  return getHistogram(medianPrices, [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    150,
    200,
    300,
    400,
    500,
  ]);
};

const getCollectionTotalPriceHist = (collectionsArray) => {
  const totalPrices = collectionsArray
    .filter((c) => c.insights.get("totalPrice") != undefined)
    .map((c) => c.insights.get("totalPrice").totalPrice);

  return getHistogram(totalPrices, [
    0,
    100,
    200,
    300,
    400,
    500,
    1000,
    2000,
    5000,
    10000,
    100000,
  ]);
};

const getCollectionPrctTop100Hist = (collectionsArray) => {
  const prctTop100 = collectionsArray
    .filter((c) => c.insights.get("top100") != undefined)
    .map((c) => c.insights.get("top100").prctTop100 * 100);

  return getHistogram(prctTop100, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
};

const getCollectionPrctKickstarterHist = (collectionsArray) => {
  const prctKickstarter = collectionsArray
    .filter((c) => c.insights.get("kickstarter") != undefined)
    .map((c) => c.insights.get("kickstarter").prctKickstarter * 100);

  return getHistogram(prctKickstarter, [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
  ]);
};

const getYearRegisteredHist = (collectionsArray) => {
  const yearRegisteredArray = collectionsArray.map((b) => b.yearRegistered);
  return getElementsFrequency(yearRegisteredArray);
};

const getStatHist = (collectionsArray, stat) => {
  const statCapitalized = stat.charAt(0).toUpperCase() + stat.slice(1);
  const statArray = collectionsArray
    .filter((e) => e.insights.get("mostCommon" + statCapitalized) != undefined)
    .map((e) => e.insights.get("mostCommon" + statCapitalized)[stat + "Hist"]);
  return mergeDicts(statArray);
};

const mergeDicts = (dictArray) => {
  const result = {};
  dictArray.forEach((basket) => {
    for (let [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    }
  });
  return result;
};

module.exports = { updateCollectionStatistics };
