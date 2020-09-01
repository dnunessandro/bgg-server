const express = require("express");
const chalk = require("chalk");
const Plays = require("../models/plays");
const { getAllPlaysPages } = require("../utils/plays.js");

const router = new express.Router();

router.get("/plays/:username", async (req, res) => {
  try {
    const date = new Date();
    const today = date.getTime();
    const plays = await Plays.findOne({ username: req.params.username });
    const diffDays =
      (today - (plays ? plays.lastUpdated : 0)) / (1000 * 60 * 60 * 24);

    if (!plays || diffDays > process.env.PLAYS_UPDATE_PERIOD) {
      const rawPlays = await getAllPlaysPages(req.params.username);

      if (rawPlays.totalItems == 0) {
        console.log(
          chalk.red.bgWhite("404") +
            " " +
            chalk.magenta(
              "User " +
                chalk.yellow(req.params.username) +
                chalk.magenta(" has no plays recorded.")
            )
        );
        return res.status(404).send();
      }

      const plays = new Plays({
        username: req.params.username,
        ...rawPlays,
        lastUpdated: date.getTime(),
      });
      await Plays.deleteOne({ username: req.params.username });
      await plays.save();
      res.status(201).send(plays);
      console.log(
        chalk.green.bgWhite("201") +
          chalk.green(" Plays for user ") +
          chalk.yellow(plays.username) +
          chalk.green(" with ID ") +
          chalk.yellow(plays.userId) +
          chalk.green(" created.")
      );
      return;
    }
    res.send(plays);
    console.log(
      chalk.green.bgWhite("200") +
        chalk.green(" Plays for user ") +
        chalk.yellow(plays.username) +
        chalk.green(" with ID ") +
        chalk.yellow(plays.userId) +
        chalk.green(" retrieved.")
    );
  } catch (error) {
    res.status(500).send(error);
    console.log(chalk.red.bgWhite("500") + " " + chalk.red(error));
  }
});

module.exports = router;
