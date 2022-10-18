const express = require("express");
const chalk = require("chalk");
const puppeteer = require("puppeteer");
const { getQueryUrl, getResponse } = require("../bgg-api-parse/get-item");
const { Boardgame } = require("../models/boardgame");
const { getBoardgameRatingsBreakdown } = require("../bgg-scraping/boardgame");
const { getRandomInt } = require("../utils/math");

const router = new express.Router();

// Gets Boardgame from the DB
router.get("/boardgames/:id", async (req, res) => {
  try {
    const id = req.params.id.replace(/\D/g, "");
    const date = new Date();
    const today = date.getTime();
    const boardgame = await Boardgame.findOne({ id });
    const diffDays =
      (today - (boardgame ? boardgame.lastUpdated : 0)) / (1000 * 60 * 60 * 24);

    if (
      boardgame == null ||
      diffDays >
        getRandomInt(
          process.env.BOARDGAME_UPDATE_PERIOD -
            process.env.BOARDGAME_UPDATE_PERIOD_VAR,
          process.env.BOARDGAME_UPDATE_PERIOD +
            process.env.BOARDGAME_UPDATE_PERIOD_VAR
        )
    ) {
      const queryUrl = getQueryUrl(id, "boardgame", {
        stats: 1,
        marketplace: 1,
      });
      await setTimeout((_) => _, 50);
      const rawBoardgame = await getResponse(queryUrl);

      if (rawBoardgame == undefined) return res.status(404).send();
      const boardgame = new Boardgame({
        ...rawBoardgame,
        lastUpdated: date.getTime(),
      });
      await Boardgame.findOne({ id }).deleteOne();
      await boardgame.save();
      res.status(201).send(boardgame);
      console.log(
        chalk.green.bgWhite("201") +
          chalk.green(" Boardgame ") +
          chalk.yellow(boardgame.name) +
          chalk.green(" with ID ") +
          chalk.yellow(req.params.id) +
          chalk.green(" created.")
      );
      return;
    }
    res.send(boardgame);
    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Boardgame ") +
        chalk.yellow(boardgame.name) +
        chalk.green(" with ID ") +
        chalk.yellow(req.params.id) +
        chalk.green(" retrieved.")
    );
  } catch (error) {
    // res.status(500).send(error);
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
  }
});

// Updates Boardgames with Ratings Breakdown
router.post("/boardgames/ratings", async (req, res) => {
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

  // let cancelRequest=false
  // req.on("close", function (err) {
  //   cancelRequest = true;
  // });
  try {
    let boardgameUpdatedN = 0;

    res.status(202).send();

    await Boardgame.find({})
      .cursor()
      .eachAsync(async (boardgame) => {
        if (
          boardgame.ratingsBreakdown["1"] == undefined ||
          req.params.force == 1
        ) {
          const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
          const page = await browser.newPage();
          boardgame.ratingsBreakdown = await getBoardgameRatingsBreakdown(
            boardgame.id,
            300,
            browser,
            page
          );
          await boardgame.save();
          boardgameUpdatedN++;
          console.log(
            chalk.bgWhite.green("UPDATED:") +
              chalk.green(" Boardgame ") +
              chalk.yellow(boardgame.name) +
              chalk.green(" with ID ") +
              chalk.yellow(boardgame.id) +
              chalk.green(" updated with success.")
          );
        } else {
          console.log(
            chalk.yellow("SKIPPING: ") +
              chalk.green("Boardgame ") +
              chalk.yellow(boardgame.name) +
              chalk.green(" with ID ") +
              chalk.yellow(boardgame.id) +
              chalk.green(" already updated.")
          );
        }
      });

    // cursor.on('data', async boardgames => {
    //   for (const boardgame of boardgames) {
    //     // TEMP: This needs to be done properly
    //     // if (cancelRequest) {
    //     //   throw { type: "cancelledByClient" };
    //     // }
    //     if (
    //       boardgame.ratingsBreakdown["1"] == undefined ||
    //       req.params.force == 1
    //     ) {
    //       const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    //       const page = await browser.newPage();
    //       boardgame.ratingsBreakdown = await getBoardgameRatingsBreakdown(
    //         boardgame.id,
    //         300,
    //         browser,
    //         page
    //       );
    //       await boardgame.save();
    //       boardgameUpdatedN++;
    //       console.log(
    //         chalk.bgWhite.green("UPDATED:") +
    //           chalk.green(" Boardgame ") +
    //           chalk.yellow(boardgame.name) +
    //           chalk.green(" with ID ") +
    //           chalk.yellow(boardgame.id) +
    //           chalk.green(" updated with success.")
    //       );
    //     } else {
    //       console.log(
    //         chalk.yellow("SKIPPING: ") +
    //           chalk.green("Boardgame ") +
    //           chalk.yellow(boardgame.name) +
    //           chalk.green(" with ID ") +
    //           chalk.yellow(boardgame.id) +
    //           chalk.green(" already updated.")
    //       );
    //     }
    //   }

    //   console.log(chalk.bgWhite.green("UPDATE FINISHED."));
    // });
  } catch (error) {
    res.status(500).send(error);
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
  }
});

router.get("/boardgames/sample/:n", async (req, res) => {
  try {
    const n = parseInt(req.params.n);
    filter = {};
    if (Object.keys(req.query).length != 0) {
      Object.keys(req.query).forEach((k) => {
        const gte = parseInt(req.query[k].trim().split(",")[0]);
        const lte = parseInt(req.query[k].trim().split(",")[1]);
        filter[k] = lte ? { $gte: gte, $lte: lte } : { $gte: gte };
      });
    }
    const sample = await Boardgame.aggregate([
      { $match: filter },
      { $sample: { size: n } },
    ]);
    console.log(
      chalk.green("Retrieved boardgame sample of size ") +
        chalk.yellow(sample.length) +
        chalk.green(". Requested size: ") +
        chalk.yellow(n) +
        chalk.green(".")
    );
    res.send(sample);
  } catch (error) {
    console.log(error);
  }
});

// // Creates New Boardgame in the DB
// router.post("/boardgames/:id", async (req, res) => {
//   const queryUrl = getQueryUrl(req.params.id, "boardgame", { stats: 1 });
//   const rawBoardgame = await getResponse(queryUrl);
//   const date = new Date();

//   const boardgame = new Boardgame({
//     ...rawBoardgame,
//     lastUpdated: date.getTime(),
//   });

//   try {
//     await boardgame.save();
//     res.status(201).send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Deletes Boardgame from the DB
// router.delete("/boardgames/:id", async (req, res) => {
//   try {
//     const boardgame = await Boardgame.findOne({ id: req.params.id });
//     if (!boardgame) {
//       return res.status(404).send();
//     }
//     boardgame.remove();
//     res.send(boardgame);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Gets Boardgame from the DB
// router.get("/boardgames/:id", async (req, res) => {
//   try {
//     const boardgame = await Boardgame.findOne({ id: req.params.id });
//     if (!boardgame) {
//       return res.status(404).send();
//     }
//     res.send(boardgame);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
