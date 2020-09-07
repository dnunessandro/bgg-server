const mongoose = require("mongoose");

const playerCountChildSchema = new mongoose.Schema({
  Best: Number,
  Recommended: Number,
  "Not Recommended": Number,
});

const boardgameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: String,
  thumbnail: String,
  image: String,
  name: String,
  description: String,
  yearPublished: Number,
  minPlayers: Number,
  maxPlayers: Number,
  recommendedPlayers: Number,
  numPlayersStats: {
    totalVotes: Number,
    playerCount: {
      type: Map,
      of: playerCountChildSchema,
    },
  },
  playerAgeStats: {
    totalVotes: Number,
    playerAge: {
      type: Map,
      of: Number,
    },
  },
  langDependenceStats: {
    totalVotes: Number,
    langDependenceLevels: [
      {
        value: String,
        numVotes: Number,
      },
    ],
  },
  playTime: Number,
  minPlayTime: Number,
  maxPlayTime: Number,
  minAge: Number,
  categories: [{ id: String, value: String }],
  mechanics: [{ id: String, value: String }],
  families: [{ id: String, value: String }],
  expansions: [{ id: String, value: String }],
  implementations: [{ id: String, value: String }],
  designers: [{ id: String, value: String }],
  artists: [{ id: String, value: String }],
  publishers: [{ id: String, value: String }],
  usersRated: Number,
  averageRating: Number,
  bayesAverageRating: Number,
  owned: Number,
  trading: Number,
  wanting: Number,
  wishing: Number,
  numComments: Number,
  numWeights: Number,
  averageWeight: Number,
  subtypeRatings: [
    {
      id: String,
      value: Number,
      name: String,
      friendlyName: String,
      bayesAverage: Number,
    },
  ],
  familyRatings: [
    {
      id: String,
      value: Number,
      name: String,
      friendlyName: String,
      bayesAverage: Number,
    },
  ],
  ratingsBreakdown: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    6: Number,
    7: Number,
    8: Number,
    9: Number,
    10: Number,
  },
  listings: [{
    price: Number,
    currency: String,
    condition: String,
    date: Date,
    pricesUsd: Number,
  }],
  numListings: Number,
  numListingsNew: Number,
  numListingsUsed: Number,
  averagePriceNew: Number,
  medianPriceNew: Number,
  maxPriceNew: Number,
  minPriceNew: Number,
  averagePriceUsed: Number,
  medianPriceUsed: Number,
  maxPriceUsed: Number,
  minPriceUsed: Number,
  stdPriceNew: Number,
  stdPriceUsed: Number,
  lastUpdated: { type: Date, expires: process.env.BOARDGAME_TTL * 3600 * 24, default: Date.now },
});

const Boardgame = mongoose.model("Boardgame", boardgameSchema);
module.exports = {Boardgame, playerCountChildSchema}
