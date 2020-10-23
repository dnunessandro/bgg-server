const express = require("express");
const chalk = require("chalk");
const path = require("path")
const cors = require("cors")
const boardgameRouter = require("./routers/boardgame");
const collectionRouter = require("./routers/collection");
const enrichedCollectionRouter = require("./routers/enriched-collection");
const playsRouter = require("./routers/plays");
const statisticsRouter = require('./routers/statistics')
require("./db/mongoose.js");

// Create App
const publicDirectoryPath = path.join(__dirname, "../public");
const app = express();
app.use(express.static(publicDirectoryPath, {extensions: ['html', 'htm']}))
app.use(express.json());
app.use(cors())
app.use(boardgameRouter);
app.use(collectionRouter);
app.use(enrichedCollectionRouter);
app.use(playsRouter);
app.use(statisticsRouter);

app.listen(process.env.PORT, () => {
  console.log(
    chalk.blue.bold("Server running on port ") +
      chalk.yellow.bold(process.env.PORT) +
      chalk.blue.bold(".")
  );
});
