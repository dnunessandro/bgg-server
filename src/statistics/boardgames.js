const axios = require("axios");
const { Boardgame } = require("../models/boardgame");
const { getBoardgameTop100 } = require("../bgg-scraping/boardgame");
const {
  average,
  getPearsonCorrelation,
  getElementsFrequency,
} = require("../utils/math");
const Spearman = require("spearman-rho");

const updateBoardgameStatistics = async (statistics) => {

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
  let statsArrayX = await Boardgame.find({}).select('averageWeight -_id');
  let statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingWeightCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageWeight),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1]
    )
  );

  // Get User Rating and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get User Rating and Play Times Corr
  statsArrayX = await Boardgame.find({}).select('playTime -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.playTime),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get User Rating and Max Players Corr
  statsArrayX = await Boardgame.find({}).select('maxPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.maxPlayers),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1]
    )
  );

  // Get User Rating and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get User Rating and Price Corr
  statsArrayX = await Boardgame.find({}).select('medianPriceNew -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingPriceCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.medianPriceNew),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get User Rating and Year Published Corr
  statsArrayX = await Boardgame.find({}).select('yearPublished -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingYearCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.yearPublished),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get User Rating and Owners Corr
  statsArrayX = await Boardgame.find({}).select('owned -_id');
  statsArrayY = await Boardgame.find({}).select('averageRating -_id');
  statistics.stats.set(
    "userRatingOwnersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.owned),
      statsArrayY.map(e=>e.averageRating),
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // // Weight Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Weight and User Rating Corr
  statsArrayX = await Boardgame.find({}).select('averageRating -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageRating),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Weight and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Weight and Play Times Corr
  statsArrayX = await Boardgame.find({}).select('playTime -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.playTime),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // // Get Weight and Max Players Corr
  statsArrayX = await Boardgame.find({}).select('maxPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.maxPlayers),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1]
    )
  );

  // Get Weight and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Weight and Price Corr
  statsArrayX = await Boardgame.find({}).select('medianPriceNew -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightPriceCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.medianPriceNew),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Weight and Year Published Corr
  statsArrayX = await Boardgame.find({}).select('yearPublished -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightYearCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.yearPublished),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Weight and Owners Corr
  statsArrayX = await Boardgame.find({}).select('owned -_id');
  statsArrayY = await Boardgame.find({}).select('averageWeight -_id');
  statistics.stats.set(
    "weightOwnersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.owned),
      statsArrayY.map(e=>e.averageWeight),
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // // Player Count Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Max Players and User Rating Corr
  statsArrayX = await Boardgame.find({}).select('averageRating -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageRating),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Max Players and Weight Corr
  statsArrayX = await Boardgame.find({}).select('averageWeight -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersWeightCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageWeight),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Max Players and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Max Players and Play Times Corr
  statsArrayX = await Boardgame.find({}).select('playTime -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.playTime),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Max Players and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Max Players and Price Corr
  statsArrayX = await Boardgame.find({}).select('medianPriceNew -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersPriceCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.medianPriceNew),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Max Players and Year Published Corr
  statsArrayX = await Boardgame.find({}).select('yearPublished -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersYearCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.yearPublished),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Max Players and Owners Corr
  statsArrayX = await Boardgame.find({}).select('owned -_id');
  statsArrayY = await Boardgame.find({}).select('maxPlayers -_id');
  statistics.stats.set(
    "maxPlayersOwnersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.owned),
      statsArrayY.map(e=>e.maxPlayers),
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // // Play Time Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Play Time and User Rating Corr
  statsArrayX = await Boardgame.find({}).select('averageRating -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageRating),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Play Time and Weight Corr
  statsArrayX = await Boardgame.find({}).select('averageWeight -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeWeightCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageWeight),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Play Time and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Play Time and Max Players Corr
  statsArrayX = await Boardgame.find({}).select('maxPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.maxPlayers),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Play Time and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Play Time and Price Corr
  statsArrayX = await Boardgame.find({}).select('medianPriceNew -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimePriceCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.medianPriceNew),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Play Time and Year Published Corr
  statsArrayX = await Boardgame.find({}).select('yearPublished -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeYearCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.yearPublished),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Play Time and Owners Corr
  statsArrayX = await Boardgame.find({}).select('owned -_id');
  statsArrayY = await Boardgame.find({}).select('playTime -_id');
  statistics.stats.set(
    "playTimeOwnersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.owned),
      statsArrayY.map(e=>e.playTime),
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // // Price Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Price and User Rating Corr
  statsArrayX = await Boardgame.find({}).select('averageRating -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageRating),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Weight Corr
  statsArrayX = await Boardgame.find({}).select('averageWeight -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceWeightCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageWeight),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Play Time Corr
  statsArrayX = await Boardgame.find({}).select('playTime -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "pricePlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.playTime),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Price and Max Players Corr
  statsArrayX = await Boardgame.find({}).select('maxPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.maxPlayers),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Price and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Price and Year Published Corr
  statsArrayX = await Boardgame.find({}).select('yearPublished -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceYearCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.yearPublished),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // Get Price and Owners Corr
  statsArrayX = await Boardgame.find({}).select('owned -_id');
  statsArrayY = await Boardgame.find({}).select('medianPriceNew -_id');
  statistics.stats.set(
    "priceOwnersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.owned),
      statsArrayY.map(e=>e.medianPriceNew),
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1]
    )
  );

  // // Year Published Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Year Published and User Rating Corr
  statsArrayX = await Boardgame.find({}).select('averageRating -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');

  statistics.stats.set(
    "yearUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageRating),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Weight Corr
  statsArrayX = await Boardgame.find({}).select('averageWeight -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearWeightCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageWeight),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Year Published and Max Players Corr
  statsArrayX = await Boardgame.find({}).select('maxPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.maxPlayers),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Year Published and Price Corr
  statsArrayX = await Boardgame.find({}).select('medianPriceNew -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearPriceCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.medianPriceNew),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Play Time Corr
  statsArrayX = await Boardgame.find({}).select('playTime -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.playTime),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Year Published and Owners Corr
  statsArrayX = await Boardgame.find({}).select('owned -_id');
  statsArrayY = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set(
    "yearOwnersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.owned),
      statsArrayY.map(e=>e.yearPublished),
      FIELD_FIT_LIMITS_MAP["owned"][0],
      FIELD_FIT_LIMITS_MAP["owned"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // // Owners Fit & Correlations ///////////////////////////////////////////////////////////////////////////

  // Get Owners and User Rating Corr
  statsArrayX = await Boardgame.find({}).select('averageRating -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersUserRatingCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageRating),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["averageRating"][0],
      FIELD_FIT_LIMITS_MAP["averageRating"][1],
      (1, 1, 1, 0, 0)
    )
  );

  // Get Owners and Weight Corr
  statsArrayX = await Boardgame.find({}).select('averageWeight -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersWeightCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.averageWeight),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["averageWeight"][0],
      FIELD_FIT_LIMITS_MAP["averageWeight"][1]
    )
  );

  // Get Owners and Recommended Players Corr
  statsArrayX = await Boardgame.find({}).select('recommendedPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersRecommendedPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.recommendedPlayers),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][0],
      FIELD_FIT_LIMITS_MAP["recommendedPlayers"][1]
    )
  );

  // Get Owners and Max Players Corr
  statsArrayX = await Boardgame.find({}).select('maxPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersMaxPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.maxPlayers),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["maxPlayers"][0],
      FIELD_FIT_LIMITS_MAP["maxPlayers"][1]
    )
  );

  // Get Owners and Min Players Corr
  statsArrayX = await Boardgame.find({}).select('minPlayers -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersMinPlayersCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.minPlayers),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["minPlayers"][0],
      FIELD_FIT_LIMITS_MAP["minPlayers"][1]
    )
  );

  // Get Owners and Price Corr
  statsArrayX = await Boardgame.find({}).select('medianPriceNew -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersPriceCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.medianPriceNew),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][0],
      FIELD_FIT_LIMITS_MAP["medianPriceNew"][1]
    )
  );

  // Get Owners and Play Time Corr
  statsArrayX = await Boardgame.find({}).select('playTime -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersPlayTimeCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.playTime),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["playTime"][0],
      FIELD_FIT_LIMITS_MAP["playTime"][1]
    )
  );

  // Get Owners and Owners Corr
  statsArrayX = await Boardgame.find({}).select('yearPublished -_id');
  statsArrayY = await Boardgame.find({}).select('owned -_id');
  statistics.stats.set(
    "ownersYearCorr",
    await getBoardgameStatPairwiseFit(
      statsArrayX.map(e=>e.yearPublished),
      statsArrayY.map(e=>e.owned),
      FIELD_FIT_LIMITS_MAP["yearPublished"][0],
      FIELD_FIT_LIMITS_MAP["yearPublished"][1]
    )
  );

  // // Other /////////////////////////////////////////////////////////////////

  // Get Number of items
  statistics.stats.set("nItems", await Boardgame.countDocuments({}));

  // Get Average User and BGG Rating Diff
  statsArray = await Boardgame.find({}).select('averageRating bayesAverageRating -_id')
  statistics.stats.set(
    "avgUserBggRatingDiff",
    parseFloat(getBoardgameAvgUserBggRatingDiff(statsArray).toFixed(2))
  );

  // Get Year Distribution
  statsArray = await Boardgame.find({}).select('yearPublished -_id');
  statistics.stats.set("yearHist", getElementsFrequency(statsArray.map(e=>e.yearPublished)));

  // Get Top 100
  const top100 = await getBoardgameTop100();
  statistics.stats.set("top100", top100);

  // Get Top Category Distribution
  statsArray = await Boardgame.find({}).select('categories -_id')
  const categoryDist = getStatDist(statsArray, "categories", 1000);
  statistics.stats.set("categoryDist", categoryDist);

  // Get Top Category Distribution per Year
  statsArray = await Boardgame.find({}).select('categories yearPublished -_id')
  const categoryDistPerYear = getStatDistPerYear(
    statsArray,
    "categories",
    Object.keys(statistics.stats.get("categoryDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("categoryDistPerYear", categoryDistPerYear);

  // Get Unique Category Distribution per Year
  statsArray = await Boardgame.find({}).select('categories yearPublished -_id')
  const categoryUniqueDistPerYear = getStatUniqueDistPerYear(
    statsArray,
    "categories"
  );
  statistics.stats.set("categoryUniqueDistPerYear", categoryUniqueDistPerYear);

  // Get Top Mechanic Distribution
  statsArray = await Boardgame.find({}).select('mechanics -_id')
  const mechanicDist = getStatDist(statsArray, "mechanics", 1000);
  statistics.stats.set("mechanicDist", mechanicDist);

  // Get Top Mechanic Distribution per Year
  statsArray = await Boardgame.find({}).select('mechanics yearPublished -_id')
  const mechanicDistPerYear = getStatDistPerYear(
    statsArray,
    "mechanics",
    Object.keys(statistics.stats.get("mechanicDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("mechanicDistPerYear", mechanicDistPerYear);

  // Get Unique Mechanic Distribution per Year
  statsArray = await Boardgame.find({}).select('mechanics yearPublished -_id')
  const mechanicUniqueDistPerYear = getStatUniqueDistPerYear(
    statsArray,
    "mechanics"
  );
  statistics.stats.set("mechanicUniqueDistPerYear", mechanicUniqueDistPerYear);

  // Get Top Families Distribution
  statsArray = await Boardgame.find({}).select('families yearPublished -_id')
  const familyDist = getStatDist(statsArray, "families", 1000);
  statistics.stats.set("familyDist", familyDist);

  // Get Top Family Distribution per Year
  statsArray = await Boardgame.find({}).select('families yearPublished -_id')
  const familyDistPerYear = getStatDistPerYear(
    statsArray,
    "families",
    Object.keys(statistics.stats.get("familyDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("familyDistPerYear", familyDistPerYear);

  // Get Top Unique Family Distribution per Year
  statsArray = await Boardgame.find({}).select('families yearPublished -_id')
  const familyUniqueDistPerYear = getStatUniqueDistPerYear(
    statsArray,
    "families"
  );
  statistics.stats.set("familyUniqueDistPerYear", familyUniqueDistPerYear);

  // Get Top Designers Distribution
  statsArray = await Boardgame.find({}).select('designers -_id')
  const designerDist = getStatDist(statsArray, "designers", 100);
  statistics.stats.set("designerDist", designerDist);

  // Get Top Designer Distribution per Year
  statsArray = await Boardgame.find({}).select('designers yearPublished -_id')
  const designerDistPerYear = getStatDistPerYear(
    statsArray,
    "designers",
    Object.keys(statistics.stats.get("designerDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("designerDistPerYear", designerDistPerYear);

  // Get Top Unique Designer Distribution per Year
  statsArray = await Boardgame.find({}).select('designers yearPublished -_id')
  const designerUniqueDistPerYear = getStatUniqueDistPerYear(
    statsArray,
    "designers"
  );
  statistics.stats.set("designerUniqueDistPerYear", designerUniqueDistPerYear);

  // Get Top Artists Distribution
  statsArray = await Boardgame.find({}).select('artists -_id')
  const artistDist = getStatDist(statsArray, "artists", 100);
  statistics.stats.set("artistDist", artistDist);

  // // Get Top Artist Distribution per Year
  statsArray = await Boardgame.find({}).select('artists yearPublished -_id')
  const artistDistPerYear = getStatDistPerYear(
    statsArray,
    "artists",
    Object.keys(statistics.stats.get("artistDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("artistDistPerYear", artistDistPerYear);

  // Get Top Unique Artist Distribution per Year
  statsArray = await Boardgame.find({}).select('artists yearPublished -_id')
  const artistUniqueDistPerYear = getStatUniqueDistPerYear(
    statsArray,
    "artists"
  );
  statistics.stats.set("artistUniqueDistPerYear", artistUniqueDistPerYear);

  // Get Top Publishers Distribution
  statsArray = await Boardgame.find({}).select('publishers -_id')
  const publisherDist = getStatDist(statsArray, "publishers", 1000);
  statistics.stats.set("publisherDist", publisherDist);

  // Get Top Publisher Distribution per Year
  statsArray = await Boardgame.find({}).select('publishers yearPublished -_id')
  const publisherDistPerYear = getStatDistPerYear(
    statsArray,
    "publishers",
    Object.keys(statistics.stats.get("publisherDist")).slice(
      0,
      process.env.TOP_STAT_N
    )
  );
  statistics.stats.set("publisherDistPerYear", publisherDistPerYear);

  // Get Top Unique Publisher Distribution per Year
  statsArray = await Boardgame.find({}).select('publishers yearPublished -_id')
  const publisherUniqueDistPerYear = getStatUniqueDistPerYear(
    statsArray,
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
  statsArrayX,
  statsArrayY,
  xMin,
  xMax,
  polyParams
) => {
  try {
    const xRawArray = statsArrayX
    const yRawArray = statsArrayY

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


const getAvgUserBggRatingDiff = (stat) => {
  return stat.averageRating - stat.bayesAverageRating;
};

const getBoardgameAvgUserBggRatingDiff = (statsArray) => {
  return average(statsArray.map((b) => getAvgUserBggRatingDiff(b)));
};

const getStatDist = (statsArray, stat, n) => {
  n = n ? n : 0;
  let statArray = [];

  statsArray.forEach((e) => {
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

const getStatDistPerYear = (statsArray, stat, statEntries) => {
  let statDistPerYear = {};

  statEntries.forEach((s) => {
    statDistPerYear[s] = {};

    statsArray.forEach((b) => {
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

const getStatUniqueDistPerYear = (statsArray, stat) => {
  let statUniqueDistPerYear = {};

  statsArray.forEach((b) => {
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
