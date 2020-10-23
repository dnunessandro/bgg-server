const express = require("express");
const chalk = require("chalk");
const EnrichedCollection = require("../models/enriched-collection");

const router = new express.Router();

router.get("/enriched-collections/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();
  try {
    const enrichedCollection = await EnrichedCollection.findOne({
      username,
    });

    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Enriched Collection for user ") +
        chalk.yellow(username) +
        chalk.green(" retrieved.")
    );

    return res.send(enrichedCollection);
  } catch (error) {
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
    return res.status(500).send(error);
  }
});

// Check if Enriched Collection Exists
router.get("/enriched-collections/:username/check", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();

    let collection = await EnrichedCollection.findOne({
      username,
    });

    // If not in DB send 102
    if (collection == null) {
      console.log(
        chalk.red.bgWhite("202") +
          chalk.magenta(" Collection ") +
          chalk.yellow(username) +
          chalk.magenta(" still processing.")
      );
      return res.status(202).send();
    }
    return res.status(200).send();
  } catch (error) {
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
    return res.status(500).send(error);
  }
});

module.exports = router;
