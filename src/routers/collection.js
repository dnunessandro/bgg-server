const express = require("express");
const chalk = require("chalk");
const { getQueryUrl, getResponse } = require("../bgg-api-parse/get-item");
const Collection = require("../models/collection");
const EnrichedCollection = require("../models/enriched-collection");
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

      // If collection not found, send 404 and break
      if (rawCollection == undefined || "error" in rawCollection) {
        console.log(
          chalk.red.bgWhite("404") +
            chalk.red(" Collection ") +
            chalk.yellow(username) +
            chalk.red(" not found.")
        );
        return res.status(404).send();
      }

      // If user not found, send 404 and break
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
      const existsFlag = await Collection.exists({ username });
      if (existsFlag) {
        await Collection.updateOne(
          { username },
          {
            ...rawCollection,
            lastUpdated: date.getTime(),
          }
        );
      } else {
        await collection.save();
      }

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
router.post("/collections/:username/enrich", async (req, res) => {
  try {
    const date = new Date();
    const username = req.params.username.toLowerCase();
    const collection = await Collection.findOne({
      username,
    });
    if (collection == null) return res.status(404).send();

    res.status(200).send();
    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Collection for user ") +
        chalk.yellow(collection.username) +
        chalk.green(" will be enriched shortly.")
    );

    let collectionObj = collection.toObject();

    // Check filter parameter to determine what to enrich
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

    collectionObj.lastUpdated = date.getTime();

    // Save Insights to original collection
    await Collection.updateOne(
      { username },
      {
        insights: collectionObj.insights,
        totalPlays: collectionObj.totalPlays,
        lastLoggedPlay: collectionObj.lastLoggedPlay,
        lastUpdated: date.getTime(),
      }
    );

    // Create enriched collection object
    const insights = collectionObj.insights;
    delete collectionObj["insights"];
    const enrichedCollection = new EnrichedCollection(collectionObj);

    // Save enriched collection to temporary DB
    await EnrichedCollection.findOne({ username }).deleteOne();
    await enrichedCollection.save();
    await EnrichedCollection.updateOne({ username }, { insights });
  } catch (error) {
    // res.status(500).send(error);
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
  }
});

module.exports = router;
