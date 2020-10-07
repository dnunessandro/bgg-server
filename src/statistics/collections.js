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
  // Get Total Collections
  statistics.stats.set("nCollections", await getNCollections());

  // Get Total Items
  statistics.stats.set("nItems", await getNItems());

  // Get Average Collection Items
  statistics.stats.set("avgTotalItems", await getCollectionAvgTotalItems());

  // Get Average Total Plays
  statistics.stats.set("avgPlays", await getCollectionAvgPlays());

  // Get Average Played Time
  statistics.stats.set("avgTimePlayed", await getCollectionAvgTimePlayed());

  // Get Average Played Time
  const avgNotPlayedArray = await getCollectionAvgNotPlayed();
  statistics.stats.set("avgNotPlayed", avgNotPlayedArray[0]);
  statistics.stats.set("avgPrctNotPlayed", avgNotPlayedArray[1]);

  // Get Average Value
  statistics.stats.set("avgValue", await getCollectionAvgValue());

  // Get Average Weight
  statistics.stats.set("avgWeight", await getCollectionAvgWeight());

  // Get Average Rating
  statistics.stats.set("avgRating", await getCollectionAvgRating());

  // Get Average BGG Rating
  statistics.stats.set("avgBggRating", await getCollectionAvgBggRating());

  // Get Average Avg Rating
  statistics.stats.set("avgAvgRating", await getCollectionAvgAvgRating());

  // Get Average Rating Diff
  statistics.stats.set("avgRatingDiff", await getCollectionAvgRatingDiff());

  // Get Rating Average Rating Corr
  statistics.stats.set(
    "ratingAvgRatingCorr",
    await getCollectionRatingAvgRatingCorr()
  );

  // Get Rating Weight Corr
  statistics.stats.set(
    "ratingWeightCorr",
    await getCollectionRatingWeightCorr()
  );

  // Get Rating Recommended Players Corr
  statistics.stats.set(
    "ratingRecommendedPlayersCorr",
    await getCollectionRatingRecommendedPlayersCorr()
  );

  // Get Rating Play Time Corr
  statistics.stats.set(
    "ratingPlayTimeCorr",
    await getCollectionRatingPlayTimeCorr()
  );

  // Get Rating Max Players Corr
  statistics.stats.set(
    "ratingMaxPlayersCorr",
    await getCollectionRatingMaxPlayersCorr()
  );

  // Get Rating Plays Corr
  statistics.stats.set("ratingPlaysCorr", await getCollectionRatingPlaysCorr());

  // Get Rating Time Played Corr
  statistics.stats.set(
    "ratingTimePlayedCorr",
    await getCollectionRatingTimePlayedCorr()
  );

  // Get Rating Price Corr
  statistics.stats.set("ratingPriceCorr", await getCollectionRatingPriceCorr());

  // Get Rating Year Published Corr
  statistics.stats.set("ratingYearCorr", await getCollectionRatingYearCorr());

  // Get Plays Weight Corr
  statistics.stats.set("playsWeightCorr", await getCollectionPlaysWeightCorr());

  // Get Plays Play Time Corr
  statistics.stats.set(
    "playsPlayTimeCorr",
    await getCollectionPlaysPlayTimeCorr()
  );

  // Get Plays Recommended Players Corr
  statistics.stats.set(
    "playsRecommendedPlayersCorr",
    await getCollectionPlaysRecommendedPlayersCorr()
  );

  // Get Plays Max Players Corr
  statistics.stats.set(
    "playsMaxPlayersCorr",
    await getCollectionPlaysMaxPlayersCorr()
  );

  // Get Plays Price Corr
  statistics.stats.set("playsPriceCorr", await getCollectionPlaysPriceCorr());

  // Get Avg Publish Year
  statistics.stats.set("avgYear", await getCollectionAvgYear());

  // Get Most Common Publish Year
  statistics.stats.set("mostCommonYear", await getCollectionMostCommonYear());

  // Get Avg Recommended Players
  statistics.stats.set(
    "avgRecommendedPlayers",
    await getCollectionAvgRecommendedPlayers()
  );

  // Get Avg Max Players
  statistics.stats.set("avgMaxPlayers", await getCollectionAvgMaxPlayers());

  // Get Median Max Players
  statistics.stats.set(
    "medianMaxPlayers",
    await getCollectionMedianMaxPlayers()
  );

  // Get Avg Min Players
  statistics.stats.set("avgMinPlayers", await getCollectionAvgMinPlayers());

  // Get Avg Price
  statistics.stats.set("avgPrice", await getCollectionAvgPrice());

  // Get Median Price
  statistics.stats.set("medianPrice", await getCollectionMedianPrice());

  // Get Average Total Price
  statistics.stats.set("avgTotalPrice", await getCollectionAvgTotalPrice());

  // Get Average Top 100
  const top100Array = await getCollectionAvgTop100();
  statistics.stats.set("avgTop100", top100Array[0]);
  statistics.stats.set("avgPrctTop100", top100Array[1]);

  // Get Average Kickstrater
  const kickstarterArray = await getCollectionAvgKickstarter();
  statistics.stats.set("avgKickstarter", kickstarterArray[0]);
  statistics.stats.set("avgPrctKickstarter", kickstarterArray[1]);

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
  statistics.stats.set("avgPlaysHist", await getCollectionAvgPlaysHist());

  // Get Avg Time Played Histogram
  statistics.stats.set(
    "avgTimePlayedHist",
    await getCollectionAvgTimePlayedHist()
  );

  // Get Prct Not Played Histogram
  statistics.stats.set(
    "prctNotPlayedHist",
    await getCollectionPrctNotPlayedHist()
  );

  // Get Average Value Histogram
  statistics.stats.set("avgValueHist", await getCollectionAvgValueHist());

  // Get Average Weight Histogram
  statistics.stats.set("avgWeightHist", await getCollectionAvgWeightHist());

  // Get Average User Rating Histogram
  statistics.stats.set("avgRatingHist", await getCollectionAvgRatingHist());

  // Get Average Average Rating Histogram
  statistics.stats.set(
    "avgAvgRatingHist",
    await getCollectionAvgAvgRatingHist()
  );

  // Get Average Bgg Rating Histogram
  statistics.stats.set(
    "avgBggRatingHist",
    await getCollectionAvgBggRatingHist()
  );

  // Get Rating Diff Histogram
  statistics.stats.set(
    "avgRatingDiffHist",
    await getCollectionAvgRatingDiffHist()
  );

  // Get Average Publish Year Histogram
  statistics.stats.set("avgYearHist", await getCollectionAvgYearHist());

  // Get Average Most Common Year Histogram
  statistics.stats.set(
    "mostCommonYearHist",
    await getCollectionMostCommonYearHist()
  );

  // Get Average Recommended Players Histogram
  statistics.stats.set(
    "avgRecommendedPlayersHist",
    await getCollectionAvgRecommendedPlayersHist()
  );

  // Get Average Max Players Histogram
  statistics.stats.set(
    "avgMaxPlayersHist",
    await getCollectionAvgMaxPlayersHist()
  );

  // Get Median Max Players Histogram
  statistics.stats.set(
    "medianMaxPlayersHist",
    await getCollectionMedianMaxPlayersHist()
  );

  // Get Average Min Players Histogram
  statistics.stats.set(
    "avgMinPlayersHist",
    await getCollectionAvgMinPlayersHist()
  );

  // Get Average Price Histogram
  statistics.stats.set("avgPriceHist", await getCollectionAvgPriceHist());

  // Get Median Price Histogram
  statistics.stats.set("medianPriceHist", await getCollectionMedianPriceHist());

  // Get Total Price Histogram
  statistics.stats.set("totalPriceHist", await getCollectionTotalPriceHist());

  // Get Top 100 Histogram
  statistics.stats.set("top100Hist", await getCollectionPrctTop100Hist());

  // Get Kickstarter Histogram
  statistics.stats.set(
    "kickstarterHist",
    await getCollectionPrctKickstarterHist()
  );

  // Get Year Registered Histogram
  statistics.stats.set("yearRegisterdHist", await getYearRegisteredHist());

  // Get Category Histogram
  statistics.stats.set("categoryHist", await getStatHist("category"));

  // Get Mechanic Histogram
  statistics.stats.set("mechanicHist", await getStatHist("mechanic"));

  // Get Family Histogram
  statistics.stats.set("familyHist", await getStatHist("family"));

  // Get Publisher Histogram
  statistics.stats.set("publisherHist", await getStatHist("publisher"));

  // Get Designer Histogram
  statistics.stats.set("designerHist", await getStatHist("designer"));

  // Get Artist Histogram
  statistics.stats.set("artistHist", await getStatHist("artist"));

  return statistics;
};

const getNCollections = async () => {
  const nCollections = await Collection.countDocuments({});
  return nCollections;
};

const getNItems = async () => {
  const statArray = await Collection.find({}).select("totalItems -_id");
  return sum(statArray.map((c) => c.totalItems));
};

const getCollectionAvgTotalItems = async () => {
  const statArray = await Collection.find({}).select("totalItems -_id");
  return parseInt(average(statArray.map((c) => c.totalItems)));
};

const getCollectionAvgPlays = async () => {
  let statArray = await Collection.find({}).select("insights.avgPlays -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return parseInt(
    average(
      statArray
        .filter((c) => c.insights.get("avgPlays") != undefined)
        .map((c) => c.insights.get("avgPlays").avgPlays)
    )
  );
};

const getCollectionAvgTimePlayed = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgTimePlayed -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return parseInt(
    average(
      statArray
        .filter((c) => c.insights.get("avgTimePlayed") != undefined)
        .map((c) => c.insights.get("avgTimePlayed").avgTimePlayed)
    )
  );
};

const getCollectionAvgNotPlayed = async () => {
  let statArray = await Collection.find({}).select("insights.notPlayed -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  avgNotPlayed = parseInt(
    average(
      statArray
        .filter((c) => c.insights.get("notPlayed") != undefined)
        .map((c) => c.insights.get("notPlayed").nNotPlayed)
    )
  );
  avgPrctNotPlayed = average(
    statArray
      .filter((c) => c.insights.get("notPlayed") != undefined)
      .map((c) => c.insights.get("notPlayed").prctNotPlayed)
  );
  return [avgNotPlayed, avgPrctNotPlayed];
};

const getCollectionAvgValue = async () => {
  let statArray = await Collection.find({}).select("insights.avgValue -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgValue") != undefined)
      .map((c) => c.insights.get("avgValue").avgValue)
  );
};

const getCollectionAvgWeight = async () => {
  let statArray = await Collection.find({}).select("insights.avgWeight -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgWeight") != undefined)
      .map((c) => c.insights.get("avgWeight").avgWeight)
  );
};

const getCollectionAvgRating = async () => {
  let statArray = await Collection.find({}).select("insights.avgRating -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgRating") != undefined)
      .map((c) => c.insights.get("avgRating").avgUserRating)
  );
};

const getCollectionAvgBggRating = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgBggRating -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgBggRating") != undefined)
      .map((c) => c.insights.get("avgBggRating").avgBggRating)
  );
};

const getCollectionAvgAvgRating = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgAvgRating -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgAvgRating") != undefined)
      .map((c) => c.insights.get("avgAvgRating").avgAvgRating)
  );
};

const getCollectionAvgRatingDiff = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgRatingDiff -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgRatingDiff") != undefined)
      .map((c) => c.insights.get("avgRatingDiff").avgRatingDiff)
  );
};

const getCollectionRatingAvgRatingCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingAvgRatingCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingAvgRatingCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingAvgRatingCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingAvgRatingCorr").spearmanr)
    ),
  };
};

const getCollectionRatingWeightCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingWeightCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingWeightCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingWeightCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingWeightCorr").spearmanr)
    ),
  };
};

const getCollectionRatingRecommendedPlayersCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingRecommendedPlayersCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingRecommendedPlayersCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map(
        (c) => c.insights.get("ratingRecommendedPlayersCorr").pearsonr
      )
    ),
    spearmanr: average(
      statArray.map(
        (c) => c.insights.get("ratingRecommendedPlayersCorr").spearmanr
      )
    ),
  };
};

const getCollectionRatingPlayTimeCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingPlayTimeCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingPlayTimeCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingPlayTimeCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingPlayTimeCorr").spearmanr)
    ),
  };
};

const getCollectionRatingMaxPlayersCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingMaxPlayersCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingMaxPlayersCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingMaxPlayersCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingMaxPlayersCorr").spearmanr)
    ),
  };
};

const getCollectionRatingPlaysCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingPlaysCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingPlaysCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingPlaysCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingPlaysCorr").spearmanr)
    ),
  };
};

const getCollectionRatingTimePlayedCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingTimePlayedCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingTimePlayedCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingTimePlayedCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingTimePlayedCorr").spearmanr)
    ),
  };
};

const getCollectionRatingPriceCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingPriceCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingPriceCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingPriceCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingPriceCorr").spearmanr)
    ),
  };
};

const getCollectionRatingYearCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.ratingYearCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("ratingYearCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("ratingYearCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("ratingYearCorr").spearmanr)
    ),
  };
};

const getCollectionPlaysWeightCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.playsWeightCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("playsWeightCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("playsWeightCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("playsWeightCorr").spearmanr)
    ),
  };
};

const getCollectionPlaysPlayTimeCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.playsPlayTimeCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("playsPlayTimeCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("playsPlayTimeCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("playsPlayTimeCorr").spearmanr)
    ),
  };
};

const getCollectionPlaysRecommendedPlayersCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.playsRecommendedPlayersCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("playsRecommendedPlayersCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map(
        (c) => c.insights.get("playsRecommendedPlayersCorr").pearsonr
      )
    ),
    spearmanr: average(
      statArray.map(
        (c) => c.insights.get("playsRecommendedPlayersCorr").spearmanr
      )
    ),
  };
};

const getCollectionPlaysMaxPlayersCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.playsMaxPlayersCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("playsMaxPlayersCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("playsMaxPlayersCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("playsMaxPlayersCorr").spearmanr)
    ),
  };
};

const getCollectionPlaysPriceCorr = async () => {
  let statArray = await Collection.find({}).select(
    "insights.playsPriceCorr -_id"
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
    .filter((c) => c.insights.get("playsPriceCorr") != undefined);

  return {
    pearsonr: average(
      statArray.map((c) => c.insights.get("playsPriceCorr").pearsonr)
    ),
    spearmanr: average(
      statArray.map((c) => c.insights.get("playsPriceCorr").spearmanr)
    ),
  };
};

const getCollectionAvgYear = async () => {
  let statArray = await Collection.find({}).select("insights.avgYear -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return parseInt(
    average(
      statArray
        .filter((c) => c.insights.get("avgYear") != undefined)
        .map((c) => c.insights.get("avgYear").avgYear)
    )
  );
};

const getCollectionMostCommonYear = async () => {
  let statArray = await Collection.find({}).select(
    "insights.mostCommonYears -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return mode(
    ...statArray
      .filter((c) => c.insights.get("mostCommonYears") != undefined)
      .map((c) => c.insights.get("mostCommonYears").mostCommonYears)
  );
};

const getCollectionAvgRecommendedPlayers = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgRecommendedPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgRecommendedPlayers") != undefined)
      .map((c) => c.insights.get("avgRecommendedPlayers").avgRecommendedPlayers)
  );
};

const getCollectionAvgMaxPlayers = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgMaxPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgMaxPlayers") != undefined)
      .map((c) => c.insights.get("avgMaxPlayers").avgMaxPlayers)
  );
};

const getCollectionMedianMaxPlayers = async () => {
  let statArray = await Collection.find({}).select(
    "insights.medianMaxPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("medianMaxPlayers") != undefined)
      .map((c) => c.insights.get("medianMaxPlayers").medianMaxPlayers)
  );
};

const getCollectionAvgMinPlayers = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgMinPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgMinPlayers") != undefined)
      .map((c) => c.insights.get("avgMinPlayers").avgMinPlayers)
  );
};

const getCollectionAvgPrice = async () => {
  let statArray = await Collection.find({}).select("insights.avgPrice -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("avgPrice") != undefined)
      .map((c) => c.insights.get("avgPrice").avgPrice)
  );
};

const getCollectionMedianPrice = async () => {
  let statArray = await Collection.find({}).select("insights.medianPrice -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("medianPrice") != undefined)
      .map((c) => c.insights.get("medianPrice").medianPrice)
  );
};

const getCollectionAvgTotalPrice = async () => {
  let statArray = await Collection.find({}).select("insights.totalPrice -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  return average(
    statArray
      .filter((c) => c.insights.get("totalPrice") != undefined)
      .map((c) => c.insights.get("totalPrice").totalPrice)
  );
};

const getCollectionAvgTop100 = async () => {
  let statArray = await Collection.find({}).select("insights.top100 -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgTop100 = parseInt(
    average(
      statArray
        .filter((c) => c.insights.get("top100") != undefined)
        .map((c) => c.insights.get("top100").nTop100)
    )
  );
  const avgPrctTop100 = average(
    statArray
      .filter((c) => c.insights.get("top100") != undefined)
      .map((c) => c.insights.get("top100").prctTop100)
  );
  return [avgTop100, avgPrctTop100];
};

const getCollectionAvgKickstarter = async () => {
  let statArray = await Collection.find({}).select("insights.kickstarter -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgKickstarter = parseInt(
    average(
      statArray
        .filter((c) => c.insights.get("kickstarter") != undefined)
        .map((c) => c.insights.get("kickstarter").nKickstarter)
    )
  );
  const avgPrctKickstarter = average(
    statArray
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

const getCollectionAvgPlaysHist = async () => {
  let statArray = await Collection.find({}).select("insights.avgPlays -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgPlays = statArray
    .filter((c) => c.insights.get("avgPlays") != undefined)
    .map((c) => c.insights.get("avgPlays").avgPlays);

  return getHistogram(avgPlays, [0, 2, 4, 6, 8, 10, 20, 100]);
};

const getCollectionAvgTimePlayedHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgTimePlayed -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgTimePlayed = statArray
    .filter((c) => c.insights.get("avgTimePlayed") != undefined)
    .map((c) => c.insights.get("avgTimePlayed").avgTimePlayed);

  return getHistogram(avgTimePlayed, [0, 2, 4, 6, 8, 10, 20, 100]);
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

const getCollectionPrctNotPlayedHist = async () => {
  let statArray = await Collection.find({}).select("insights.notPlayed -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const prctNotPlayed = statArray
    .filter((c) => c.insights.get("notPlayed") != undefined)
    .map((c) => c.insights.get("notPlayed").prctNotPlayed * 100);

  return getHistogram(prctNotPlayed, [0, 20, 40, 60, 80, 100]);
};

const getCollectionAvgValueHist = async () => {
  let statArray = await Collection.find({}).select("insights.avgValue -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgValues = statArray
    .filter((c) => c.insights.get("avgValue") != undefined)
    .map((c) => 1 / c.insights.get("avgValue").avgValue);

  return getHistogram(avgValues, [0, 2, 4, 6, 8, 10, 20, 100]);
};

const getCollectionAvgWeightHist = async () => {
  let statArray = await Collection.find({}).select("insights.avgWeight -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgWeights = statArray
    .filter((c) => c.insights.get("avgWeight") != undefined)
    .map((c) => c.insights.get("avgWeight").avgWeight);

  return getHistogram(avgWeights, [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
};

const getCollectionAvgRatingHist = async () => {
  let statArray = await Collection.find({}).select("insights.avgRating -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgRatings = statArray
    .filter((c) => c.insights.get("avgRating") != undefined)
    .map((c) => c.insights.get("avgRating").avgUserRating);

  return getHistogram(avgRatings, [0, 5, 6, 7, 8, 9, 10]);
};

const getCollectionAvgAvgRatingHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgAvgRating -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgAvgRatings = statArray
    .filter((c) => c.insights.get("avgAvgRating") != undefined)
    .map((c) => c.insights.get("avgAvgRating").avgAvgRating);

  return getHistogram(avgAvgRatings, [0, 5, 6, 7, 8, 9, 10]);
};

const getCollectionAvgBggRatingHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgBggRating -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgBggRatings = statArray
    .filter((c) => c.insights.get("avgBggRating") != undefined)
    .map((c) => c.insights.get("avgBggRating").avgBggRating);

  return getHistogram(avgBggRatings, [0, 5, 6, 7, 8, 9, 10]);
};

const getCollectionAvgRatingDiffHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgRatingDiff -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgRatingsDiffs = statArray
    .filter((c) => c.insights.get("avgRatingDiff") != undefined)
    .map((c) => c.insights.get("avgRatingDiff").avgRatingDiff);

  return getHistogram(avgRatingsDiffs, [-5, -2, -1, 0, 1, 2, 5]);
};

const getCollectionAvgYearHist = async () => {
  let statArray = await Collection.find({}).select("insights.avgYear -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgYears = statArray
    .filter((c) => c.insights.get("avgYear") != undefined)
    .map((c) => c.insights.get("avgYear").avgYear);

  return getHistogram(avgYears, [
    1500,
    2000,
    2005,
    2010,
    2012,
    2014,
    2016,
    2018,
    2020,
    new Date().getFullYear() + 1
  ]);
};

const getCollectionMostCommonYearHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.mostCommonYears -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const mostCommonYears = statArray
    .filter((c) => c.insights.get("mostCommonYears") != undefined)
    .map((c) => c.insights.get("mostCommonYears").mostCommonYears);

  return getHistogram(mostCommonYears, [
    1500,
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

const getCollectionAvgRecommendedPlayersHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgRecommendedPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const recommendedPlayers = statArray
    .filter((c) => c.insights.get("avgRecommendedPlayers") != undefined)
    .map((c) => c.insights.get("avgRecommendedPlayers").avgRecommendedPlayers);

  return getHistogram(recommendedPlayers, [1, 2, 3, 4, 5, 6, 7, 20]);
};

const getCollectionAvgMaxPlayersHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgMaxPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const maxPlayers = statArray
    .filter((c) => c.insights.get("avgMaxPlayers") != undefined)
    .map((c) => c.insights.get("avgMaxPlayers").avgMaxPlayers);

  return getHistogram(maxPlayers, [1, 2, 3, 4, 5, 6, 7, 20]);
};

const getCollectionMedianMaxPlayersHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.medianMaxPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const maxPlayers = statArray
    .filter((c) => c.insights.get("medianMaxPlayers") != undefined)
    .map((c) => c.insights.get("medianMaxPlayers").medianMaxPlayers);

  return getHistogram(maxPlayers, [1, 2, 3, 4, 5, 6, 7, 20]);
};

const getCollectionAvgMinPlayersHist = async () => {
  let statArray = await Collection.find({}).select(
    "insights.avgMinPlayers -_id"
  );
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const minPlayers = statArray
    .filter((c) => c.insights.get("avgMinPlayers") != undefined)
    .map((c) => c.insights.get("avgMinPlayers").avgMinPlayers);

  return getHistogram(minPlayers, [1, 2, 3, 4, 5, 10]);
};

const getCollectionAvgPriceHist = async () => {
  let statArray = await Collection.find({}).select("insights.avgPrice -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const avgPrices = statArray
    .filter((c) => c.insights.get("avgPrice") != undefined)
    .map((c) => c.insights.get("avgPrice").avgPrice);

  return getHistogram(avgPrices, [
    0,
    20,
    40,
    60,
    80,
    100,
    200,
    500,
  ]);
};

const getCollectionMedianPriceHist = async () => {
  let statArray = await Collection.find({}).select("insights.medianPrice -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const medianPrices = statArray
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

const getCollectionTotalPriceHist = async () => {
  let statArray = await Collection.find({}).select("insights.totalPrice -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const totalPrices = statArray
    .filter((c) => c.insights.get("totalPrice") != undefined)
    .map((c) => c.insights.get("totalPrice").totalPrice);

  return getHistogram(totalPrices, [
    0,
    100,
    500,
    1000,
    5000,
    10000,
    100000,
  ]);
};

const getCollectionPrctTop100Hist = async () => {
  let statArray = await Collection.find({}).select("insights.top100 -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const prctTop100 = statArray
    .filter((c) => c.insights.get("top100") != undefined)
    .map((c) => c.insights.get("top100").prctTop100 * 100);

  return getHistogram(prctTop100, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
};

const getCollectionPrctKickstarterHist = async () => {
  let statArray = await Collection.find({}).select("insights.kickstarter -_id");
  statArray = statArray.filter((c) =>
    Object.keys(c.toObject()).includes("insights")
  );

  const prctKickstarter = statArray
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

const getYearRegisteredHist = async () => {
  let statArray = await Collection.find({}).select(
    "yearRegistered -_id"
  );

  const yearRegisteredArray = statArray.map((b) => b.yearRegistered);
  return getElementsFrequency(yearRegisteredArray);
};

const getStatHist = async (stat) => {
  const statCapitalized = stat.charAt(0).toUpperCase() + stat.slice(1);

  let statArray = await Collection.find({}).select(
    `insights.mostCommon${statCapitalized} -_id`
  );
  statArray = statArray
    .filter((c) => Object.keys(c.toObject()).includes("insights"))
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
