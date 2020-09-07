const express = require("express");
const chalk = require("chalk");
const Statistics = require("../models/statistics");
const { updateCollectionStatistics } = require("../statistics/collections");
const { updateBoardgameStatistics } = require("../statistics/boardgames");
const { initializeStatistics } = require("../utils/statistics");

const router = new express.Router();

// Get Global Collection Statistics
router.get("/statistics/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const statistics = await Statistics.findOne({ id });
    if (statistics == undefined) return res.status(404).send();

    res.send(statistics);
    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Statistics for ") +
        chalk.yellow(id) +
        chalk.green(" retrieved.")
    );
  } catch (error) {
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
    return res.status(500).send(error);
    
  }
});

// Update Global Collection Statistics (TO DO: Auth)
router.post("/statistics/:id", async (req, res) => {
  try {
    const allowedIds = ["collections", "boardgames"];
    const id = req.params.id;

    // Check if user is trying to update boardgames or collections
    if (!allowedIds.includes(id)) {
      console.log(chalk.red.bgWhite("500") + " " + chalk.red("Invalid ID"));
      return res.status(500).send();
    }

    // Check if API key was provided
    if (
      req.query.api_key == undefined ||
      req.query.api_key != process.env.API_KEY
    ) {
      console.log(
        chalk.red.bgWhite("500") + " " + chalk.red("Invalid or missing API Key.")
      );
      return res.status(500).send();
    }

    res.send(202);

    let statistics = (await Statistics.findOne({ id }))
      ? await Statistics.findOne({ id })
      : await initializeStatistics(id);

    statistics = await (id == "boardgames"
      ? updateBoardgameStatistics(statistics)
      : updateCollectionStatistics(statistics));

    await Statistics.updateOne({ id }, { stats: statistics.stats });

    
    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Statistics for ") +
        chalk.yellow(id) +
        chalk.green(" were updated.")
    );
  } catch (error) {
    res.status(500).send(error);
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
    console.log(error);
  }
});

module.exports = router;
