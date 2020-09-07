const mongoose = require("mongoose");

const playSchema = new mongoose.Schema({
  id: String,
  date: Date,
  quantity: Number,
  length: Number,
  incomplete: Number,
  location: {
    type: String,
    trim: true,
  },
  objectName: String,
  itemId: String,
  objectType: String,
  comments: {
    type: String,
    trim: true,
  },
  players: [
    {
      username: String,
      userId: String,
      name: String,
      startPosition: String,
      color: String,
      score: String,
      new: Number,
      rating: Number,
      win: Number,
    },
  ],
});

const playsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: String,
  totalPlays: Number,
  totalItems: Number,
  lastLoggedPlay: Date,
  items: {
    type: Map,
    of: [playSchema],
  },
  lastUpdated: {
    type: Date,
    expires: process.env.PLAYS_TTL * 3600 * 24,
    default: Date.now,
  },
});

const Plays = mongoose.model("Plays", playsSchema);
module.exports = Plays;
