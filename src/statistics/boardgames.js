const axios = require("axios");
const {Boardgame} = require("../models/boardgame");
const { getBoardgameTop100 } = require("../bgg-scraping/boardgame");
const {
  average,
  getPearsonCorrelation,
  getElementsFrequency
} = require("../utils/math");
const Spearman = require("spearman-rho");

const updateBoardgameStatistics = async (statistics) => {
  const boardgameArray = await Boardgame.find({});

  const FIELD_FIT_LIMITS_MAP = {
    averageWeight: [1, 4.5],
    recommendedPlayers: [1, 7],
    playTime: [10, 300],
    maxPlayers: [1, 7],
    minPlayers: [1, 7],
    medianPriceNew: [10, 300],
    yearPublished: [1980, 2020],
    owned: [500, 100000],
    averageRating: [3, 9],
  };

  // User Rating Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get User Rating and Weight Corr
  statistics.stats.set(
    "userRatingWeightCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageWeight",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1]
    )
  );

  // Get User Rating and Recommended Players Corr
  statistics.stats.set(
    "userRatingRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get User Rating and Play Times Corr
  statistics.stats.set(
    "userRatingPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "playTime",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get User Rating and Max Players Corr
  statistics.stats.set(
    "userRatingMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "maxPlayers",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1]
    )
  );

  // Get User Rating and Min Players Corr
  statistics.stats.set(
    "userRatingMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get User Rating and Price Corr
  statistics.stats.set(
    "userRatingPriceCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "medianPriceNew",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get User Rating and Year Published Corr
  statistics.stats.set(
    "userRatingYearCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "yearPublished",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get User Rating and Owners Corr
  statistics.stats.set(
    "userRatingOwnersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "owned",
      "averageRating",
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // Weight Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Weight and User Rating Corr
  statistics.stats.set(
    "weightUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageRating",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Weight and Recommended Players Corr
  statistics.stats.set(
    "weightRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Weight and Play Times Corr
  statistics.stats.set(
    "weightPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "playTime",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Weight and Max Players Corr
  statistics.stats.set(
    "weightMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "maxPlayers",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1]
    )
  );

  // Get Weight and Min Players Corr
  statistics.stats.set(
    "weightMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Weight and Price Corr
  statistics.stats.set(
    "weightPriceCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "medianPriceNew",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Weight and Year Published Corr
  statistics.stats.set(
    "weightYearCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "yearPublished",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Weight and Owners Corr
  statistics.stats.set(
    "weightOwnersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "owned",
      "averageWeight",
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // Player Count Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Max Players and User Rating Corr
  statistics.stats.set(
    "maxPlayersUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageRating",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Max Players and Weight Corr
  statistics.stats.set(
    "maxPlayersWeightCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageWeight",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Max Players and Recommended Players Corr
  statistics.stats.set(
    "maxPlayersRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Max Players and Play Times Corr
  statistics.stats.set(
    "maxPlayersPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "playTime",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Max Players and Min Players Corr
  statistics.stats.set(
    "maxPlayersMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Max Players and Price Corr
  statistics.stats.set(
    "maxPlayersPriceCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "medianPriceNew",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Max Players and Year Published Corr
  statistics.stats.set(
    "maxPlayersYearCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "yearPublished",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Max Players and Owners Corr
  statistics.stats.set(
    "maxPlayersOwnersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "owned",
      "maxPlayers",
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // Play Time Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Play Time and User Rating Corr
  statistics.stats.set(
    "playTimeUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageRating",
      "playTime",
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Play Time and Weight Corr
  statistics.stats.set(
    "playTimeWeightCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageWeight",
      "playTime",
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Play Time and Recommended Players Corr
  statistics.stats.set(
    "playTimeRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "playTime",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Play Time and Max Players Corr
  statistics.stats.set(
    "playTimeMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "maxPlayers",
      "playTime",
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Play Time and Min Players Corr
  statistics.stats.set(
    "playTimeMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "playTime",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Play Time and Price Corr
  statistics.stats.set(
    "playTimePriceCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "medianPriceNew",
      "playTime",
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Play Time and Year Published Corr
  statistics.stats.set(
    "playTimeYearCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "yearPublished",
      "playTime",
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Play Time and Owners Corr
  statistics.stats.set(
    "playTimeOwnersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "owned",
      "playTime",
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // Price Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Price and User Rating Corr
  statistics.stats.set(
    "priceUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageRating",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Weight Corr
  statistics.stats.set(
    "priceWeightCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageWeight",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Recommended Players Corr
  statistics.stats.set(
    "priceRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Play Time Corr
  statistics.stats.set(
    "pricePlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "playTime",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Price and Max Players Corr
  statistics.stats.set(
    "priceMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "maxPlayers",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Min Players Corr
  statistics.stats.set(
    "priceMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Price and Year Published Corr
  statistics.stats.set(
    "priceYearCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "yearPublished",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Price and Owners Corr
  statistics.stats.set(
    "priceOwnersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "owned",
      "medianPriceNew",
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // Year Published Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Year Published and User Rating Corr
  statistics.stats.set(
    "yearUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageRating",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Weight Corr
  statistics.stats.set(
    "yearWeightCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageWeight",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Recommended Players Corr
  statistics.stats.set(
    "yearRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Year Published and Max Players Corr
  statistics.stats.set(
    "yearMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "maxPlayers",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Min Players Corr
  statistics.stats.set(
    "yearMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Year Published and Price Corr
  statistics.stats.set(
    "yearPriceCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "medianPriceNew",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Play Time Corr
  statistics.stats.set(
    "yearPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "playTime",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Owners Corr
  statistics.stats.set(
    "yearOwnersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "owned",
      "yearPublished",
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Owners Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Owners and User Rating Corr
  statistics.stats.set(
    "ownersUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageRating",
      "owned",
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Owners and Weight Corr
  statistics.stats.set(
    "ownersWeightCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "averageWeight",
      "owned",
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1]
    )
  );

  // Get Owners and Recommended Players Corr
  statistics.stats.set(
    "ownersRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "recommendedPlayers",
      "owned",
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Owners and Max Players Corr
  statistics.stats.set(
    "ownersMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "maxPlayers",
      "owned",
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1]
    )
  );

  // Get Owners and Min Players Corr
  statistics.stats.set(
    "ownersMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "minPlayers",
      "owned",
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Owners and Price Corr
  statistics.stats.set(
    "ownersPriceCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "medianPriceNew",
      "owned",
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Owners and Play Time Corr
  statistics.stats.set(
    "ownersPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "playTime",
      "owned",
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Owners and Owners Corr
  statistics.stats.set(
    "ownersYearCorr",
    await getBoardgameStatPairwiseFit(
      boardgameArray,
      "yearPublished",
      "owned",
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Other /////////////////////////////////////////////////////////////////

  // Get Number of items
  statistics.stats.set("nItems", await Boardgame.countDocuments({}));

  // Get Average User and BGG Rating Diff
  statistics.stats.set(
    "avgUserBggRatingDiff",
    parseFloat(getBoardgameAvgUserBggRatingDiff(boardgameArray).toFixed(2))
  );

  // Get Year Distribution
  statistics.stats.set("yearHist", getYearHist(boardgameArray));

  // Get Top 100
  const top100 = await getBoardgameTop100();
  statistics.stats.set("top100", top100);

  // Get Top Category Distribution
  const categoryDist = getStatDist(boardgameArray, "categories", 1000);
  statistics.stats.set("categoryDist", categoryDist);

  // Get Top Category Distribution per Year
  const categoryDistPerYear = getStatDistPerYear(
    boardgameArray,
    "categories",
    Object.keys(statistics.stats.get("categoryDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("categoryDistPerYear", categoryDistPerYear);

  // Get Unique Category Distribution per Year
  const categoryUniqueDistPerYear = getStatUniqueDistPerYear(
    boardgameArray,
    "categories"
  );
  statistics.stats.set("categoryUniqueDistPerYear", categoryUniqueDistPerYear);

  // Get Top Mechanic Distribution
  const mechanicDist = getStatDist(boardgameArray, "mechanics", 1000);
  statistics.stats.set("mechanicDist", mechanicDist);

  // Get Top Mechanic Distribution per Year
  const mechanicDistPerYear = getStatDistPerYear(
    boardgameArray,
    "mechanics",
    Object.keys(statistics.stats.get("mechanicDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("mechanicDistPerYear", mechanicDistPerYear);

  // Get Unique Mechanic Distribution per Year
  const mechanicUniqueDistPerYear = getStatUniqueDistPerYear(
    boardgameArray,
    "mechanics"
  );
  statistics.stats.set("mechanicUniqueDistPerYear", mechanicUniqueDistPerYear);

  // Get Top Families Distribution
  const familyDist = getStatDist(boardgameArray, "families", 1000);
  statistics.stats.set("familyDist", familyDist);

  // Get Top Family Distribution per Year
  const familyDistPerYear = getStatDistPerYear(
    boardgameArray,
    "families",
    Object.keys(statistics.stats.get("familyDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("familyDistPerYear", familyDistPerYear);

  // Get Top Unique Family Distribution per Year
  const familyUniqueDistPerYear = getStatUniqueDistPerYear(
    boardgameArray,
    "families"
  );
  statistics.stats.set("familyUniqueDistPerYear", familyUniqueDistPerYear);

  // Get Top Designers Distribution
  const designerDist = getStatDist(boardgameArray, "designers", 100);
  statistics.stats.set("designerDist", designerDist);

  // Get Top Designer Distribution per Year
  const designerDistPerYear = getStatDistPerYear(
    boardgameArray,
    "designers",
    Object.keys(statistics.stats.get("designerDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("designerDistPerYear", designerDistPerYear);

  // Get Top Unique Designer Distribution per Year
  const designerUniqueDistPerYear = getStatUniqueDistPerYear(
    boardgameArray,
    "designers"
  );
  statistics.stats.set("designerUniqueDistPerYear", designerUniqueDistPerYear);

  // Get Top Artists Distribution
  const artistDist = getStatDist(boardgameArray, "artists", 100);
  statistics.stats.set("artistDist", artistDist);

  // Get Top Artist Distribution per Year
  const artistDistPerYear = getStatDistPerYear(
    boardgameArray,
    "artists",
    Object.keys(statistics.stats.get("artistDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("artistDistPerYear", artistDistPerYear);

  // Get Top Unique Artist Distribution per Year
  const artistUniqueDistPerYear = getStatUniqueDistPerYear(
    boardgameArray,
    "artists"
  );
  statistics.stats.set("artistUniqueDistPerYear", artistUniqueDistPerYear);

  // Get Top Publishers Distribution
  const publisherDist = getStatDist(boardgameArray, "publishers", 1000);
  statistics.stats.set("publisherDist", publisherDist);

  // Get Top Publisher Distribution per Year
  const publisherDistPerYear = getStatDistPerYear(
    boardgameArray,
    "publishers",
    Object.keys(statistics.stats.get("publisherDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("publisherDistPerYear", publisherDistPerYear);

  // Get Top Unique Publisher Distribution per Year
  const publisherUniqueDistPerYear = getStatUniqueDistPerYear(
    boardgameArray,
    "publishers"
  );
  statistics.stats.set(
    "publisherUniqueDistPerYear",
    publisherUniqueDistPerYear
  );

  await statistics.save();
  return statistics;
};

const getBoardgameStatPairwiseFit = async (
  boardgameArray,
  xField,
  yField,
  xMin,
  xMax,
  polyParams
) => {
  try {
    const xRawArray = boardgameArray.map((b) => b[xField]);
    const yRawArray = boardgameArray.map((b) => b[yField]);

    let xArray = [];
    let yArray = [];

    xRawArray.forEach((_, i) => {
      if ((xRawArray[i] != null) & (yRawArray[i] != null)) {
        xArray.push(xRawArray[i]);
        yArray.push(yRawArray[i]);
      }
    });

    const response = await axios.post(
      polyParams
        ? `${process.env.INSIGHTS_API_ROOT_URL}/utils/fit?min=${xMin}&max=${xMax}&polyparams=${polyParams}`
        : `${process.env.INSIGHTS_API_ROOT_URL}/utils/bestfit?min=${xMin}&max=${xMax}`,
      { x: xArray, y: yArray }
    );

    const spearman = await new Spearman(xArray, yArray).calc();

    return {
      trend: response.data,
      pearson: parseFloat(getPearsonCorrelation(xArray, yArray).toFixed(2)),
      spearman: parseFloat(spearman.toFixed(2)),
    };
  } catch (error) {
    console.log(error);
  }
};

const getYearHist = (boardgameArray) => {
  const years = boardgameArray.map((b) => b.yearPublished);
  return getElementsFrequency(years);
};

const getAvgUserBggRatingDiff = (boardgame) => {
  return boardgame.averageRating - boardgame.bayesAverageRating;
};

const getBoardgameAvgUserBggRatingDiff = (boardgameArray) => {
  return average(boardgameArray.map((b) => getAvgUserBggRatingDiff(b)));
};

const getStatDist = (boardgameArray, stat, n) => {
  n = n ? n : 0;
  let statArray = [];

  boardgameArray.forEach((e) => {
    e[stat].forEach((d) =>
      statArray.push(d.value.replace("Player Count: ", "Players: "))
    );
  });

  let distribution = getElementsFrequency(statArray);

  // Filter out erroneus entries
  distribution = Object.fromEntries(
    Object.entries(distribution).filter(
      ([k, _]) => k != "" && k != "(Uncredited)"
    )
  );

  //Get top n entries
  const items = Object.keys(distribution).map(function (key) {
    return [key, distribution[key]];
  });
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  let filteredDistribution = {};

  items.slice(0, n).forEach((e) => {
    filteredDistribution[e[0]] = e[1];
  });

  return filteredDistribution;
};

// const getStatDistAtYear = (boardgameArray, stat, limitYear, statEntries) => {
//   let statArray = [];

//   boardgameArray
//     .filter((b) => b.yearPublished <= limitYear)
//     .forEach((b) => b[stat].forEach((s) => statArray.push(s.value)));
//   statArray = statArray.filter((v) => statEntries.includes(v));

//   const statDist = getElementsFrequency(statArray);

//   return statDist;
// };

const getStatDistPerYear = (boardgameArray, stat, statEntries) => {
  let statDistPerYear = {};

  statEntries.forEach((s) => {
    statDistPerYear[s] = {};

    boardgameArray.forEach((b) => {
      const year = b.yearPublished;

      const statArray = b[stat].map((c) => c.value).filter((v) => v == s);

      if (statArray.length != 0 && year != null) {
        statDistPerYear[s][year] = statDistPerYear[s][year]
          ? statDistPerYear[s][year] + statArray.length
          : 1;
      }
    });
  });

  return statDistPerYear;
};

const getStatUniqueDistPerYear = (boardgameArray, stat) => {
  let statUniqueDistPerYear = {};

  boardgameArray.forEach((b) => {
    const year = b.yearPublished;

    if (year != null) {
      if (!statUniqueDistPerYear[year]) {
        statUniqueDistPerYear[year] = [];
      }

      b[stat].forEach((c) => statUniqueDistPerYear[year].push(c.value));
    }
  });

  Object.keys(statUniqueDistPerYear).forEach((k) => {
    statUniqueDistPerYear[k] = new Set(statUniqueDistPerYear[k]).size;
  });

  return statUniqueDistPerYear;
};

module.exports = { updateBoardgameStatistics };
