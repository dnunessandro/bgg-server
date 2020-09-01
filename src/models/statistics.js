const mongoose = require("mongoose");

const statisticsSchema = mongoose.Schema({
  id: String,
  stats: Map,
  lastUpdated: Date,
});

const Statistics = mongoose.model("Statistics", statisticsSchema);
module.exports = Statistics;