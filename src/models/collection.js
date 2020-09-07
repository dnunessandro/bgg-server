const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  yearRegistered: Number,
  avatar: String,
  firstName: String,
  lastName: String,
  stateOrProvince: String,
  country: String,
  totalItems: Number,
  totalPlays: Number,
  lastLoggedPlay: Date,
  lastLogin: Date,
  pubDate: Date,
  tradeRating: Number,
  marketRating: Number,
  items: [
    {
      id: String,
      subtype: String,
      collId: String,
      name: String,
      own: Number,
      prevowned: Number,
      fortrade: Number,
      want: Number,
      wanttoplay: Number,
      wanttobuy: Number,
      wishlist: Number,
      preordered: Number,
      lastModified: Date,
      numPlays: Number,
      numOwned: Number,
      userRating: Number,
    },
  ],
  ignoredItems: [
    {
      id: String,
      name: String,
    },
  ],

  insights: Map,
  lastUpdated: { type: Date, expires: process.env.COLLECTION_TTL * 3600 * 24, default: Date.now },
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
