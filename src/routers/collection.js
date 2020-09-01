const express = require("express");
const chalk = require("chalk");
const { getQueryUrl, getResponse } = require("../bgg-api-parse/get-item");
const Collection = require("../models/collection");
const {
  enrichCollectionWithBoardgames,
  enrichCollectionWithPlays,
  enrichCollectionWithInsights,
  addUserInfoToCollection,
} = require("../utils/collection");

const router = new express.Router();

// Gets Collection from the DB
router.get("/collections/:username", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const date = new Date();
    const today = date.getTime();
    let collection = await Collection.findOne({
      username,
    });

    // Compute time since last updated
    const diffDays =
      (today - (collection ? collection.lastUpdated : 0)) /
      (1000 * 60 * 60 * 24);

    // If not in DB or not updated recently then proceed
    if (collection == null || diffDays > process.env.COLLECTION_UPDATE_PERIOD) {
      const collectionQueryUrl = getQueryUrl(username, "collection", {
        own: 1,
        stats: 1,
        subtype: "boardgame",
      });

      const userQueryUrl = getQueryUrl(username, "user");

      // Get Collection from BGG
      let rawCollection = await getResponse(collectionQueryUrl);

      // Get User from BGG
      const rawUser = await getResponse(userQueryUrl);

      // If not found, send 404 and break
      if (rawCollection == undefined || "error" in rawCollection) {
        console.log(
          chalk.red.bgWhite("404") +
            chalk.red(" Collection ") +
            chalk.yellow(username) +
            chalk.red(" not found.")
        );
        return res.status(404).send();
      }

      if (rawUser == undefined || "error" in rawCollection) {
        console.log(
          chalk.red.bgWhite("404") +
            chalk.red(" User ") +
            chalk.yellow(username) +
            chalk.red(" not found.")
        );
        return res.status(404).send();
      }

      // Add Raw User Data to Raw Collection
      rawCollection = addUserInfoToCollection(rawCollection, rawUser, [
        "yearRegistered",
        "avatar",
        "firstName",
        "lastName",
        "lastLogin",
        "stateOrProvince",
        "country",
        "tradeRating",
        "marketRating",
      ]);

      // Build new collection object
      collection = new Collection({
        username,
        ...rawCollection,
        lastUpdated: date.getTime(),
      });

      // Update record
      await Collection.findOne({ username }).deleteOne();
      await collection.save();

      console.log(
        chalk.green.bgWhite("201") +
          chalk.green(" Collection for user ") +
          chalk.yellow(username) +
          chalk.green(" created.")
      );
      return res.status(201).send(collection);
    }

    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Collection for user ") +
        chalk.yellow(username) +
        chalk.green(" retrieved.")
    );
    return res.send(collection);
  } catch (error) {
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
    return res.status(500).send(error);
  }
});

// Enriches Collection
router.get("/collections/:username/enrich", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const collection = await Collection.findOne({
      username,
    });
    if (collection == null) return res.status(404).send();

    let collectionObj = collection.toObject();

    const filter =
      "filter" in req.query
        ? req.query.filter.split(",").map((d) => d.trim().toLowerCase())
        : [];

    if (filter.length == 0) {
      collectionObj = await enrichCollectionWithBoardgames(collectionObj);
      collectionObj = await enrichCollectionWithPlays(collectionObj);
      collectionObj = await enrichCollectionWithInsights(collectionObj);
    }
    collectionObj = filter.includes("boardgames")
      ? await enrichCollectionWithBoardgames(collectionObj)
      : collectionObj;
    collectionObj = filter.includes("plays")
      ? await enrichCollectionWithPlays(collectionObj)
      : collectionObj;

    // Save Insights to original collection
    await Collection.updateOne(
      { username },
      {
        insights: collectionObj.insights,
        totalPlays: collectionObj.totalPlays,
        lastLoggedPlay: collectionObj.lastLoggedPlay,
      }
    );

    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Collection for user ") +
        chalk.yellow(collection.username) +
        chalk.green(" enriched successfully.")
    );
    res.send(collectionObj);
  } catch (error) {
    res.status(500).send(error);
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
    console.log(error);
  }
});

// router.patch("/collections/:username", async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).send(error);
//     console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
//   }
// });

module.exports = router;
