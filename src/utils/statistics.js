const Statistics = require("../models/statistics");

const initializeStatistics = async (id) => {
  const date = new Date();
  const today = date.getTime();
  const statistics = new Statistics({
    id,
    stats: {},
    lastUpdated: today,
  });
  await statistics.save();
  return statistics;
};

module.exports = {
  initializeStatistics,
};
