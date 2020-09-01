const {
  average,
  median,
  standardDeviation,
  convertCurrency,
} = require("../utils/math");

const getBoardgame = async (response, options) => {
  if (!Object.keys(response.items).includes("item")) return undefined;
  let boardgame = {};

  boardgame.id = response.items.item[0].$.id;
  boardgame.type = response.items.item[0].$.type;
  boardgame.thumbnail =
    "thumbnail" in response.items.item[0]
      ? response.items.item[0].thumbnail[0]
      : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
  boardgame.image =
    "image" in response.items.item[0]
      ? response.items.item[0].image[0]
      : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
  boardgame.name = response.items.item[0].name[0].$.value;
  boardgame.description = response.items.item[0].description[0];
  boardgame.yearPublished =
    response.items.item[0].yearpublished[0].$.value > 0
      ? parseInt(response.items.item[0].yearpublished[0].$.value)
      : null;
  boardgame.minPlayers = parseInt(response.items.item[0].minplayers[0].$.value);
  boardgame.maxPlayers = parseInt(response.items.item[0].maxplayers[0].$.value);

  boardgame.numPlayersStats = getNumPlayersPollResults(
    response.items.item[0].poll[0]
  );
  boardgame.recommendedPlayers = getRecommendedPlayers(
    boardgame.numPlayersStats.playerCount
  );
  boardgame.playerAgeStats = getPlayerAgePollResults(
    response.items.item[0].poll[1]
  );
  boardgame.langDependenceStats = getLangDependenceResults(
    response.items.item[0].poll[2]
  );
  boardgame.playTime = parseInt(response.items.item[0].playingtime[0].$.value);
  boardgame.minPlayTime = parseInt(
    response.items.item[0].minplaytime[0].$.value
  );
  boardgame.maxPlayTime = parseInt(
    response.items.item[0].maxplaytime[0].$.value
  );
  boardgame.minAge = parseInt(response.items.item[0].minage[0].$.value);
  boardgame.categories = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgamecategory"
  );
  boardgame.mechanics = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgamemechanic"
  );
  boardgame.families = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgamefamily"
  );
  boardgame.expansions = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgameexpansion"
  );
  boardgame.implementations = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgameimplementation"
  );
  boardgame.designers = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgamedesigner"
  );
  boardgame.artists = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgameartist"
  );
  boardgame.publishers = getBoardgameLinkElements(
    response.items.item[0].link,
    "boardgamepublisher"
  );

  // Get Stats
  boardgame = Object.assign(
    boardgame,
    options.get("stats") ? getBoardgameStats(response) : {}
  );

  // Get User Ratings
  boardgame = Object.assign(
    boardgame,
    options.get("ratingcomments") ? getBoardgameUserRatings(response) : {}
  );

  // Get Marketplace Data
  boardgame = Object.assign(
    boardgame,
    options.get("marketplace") ? await getMarketplaceData(response) : {}
  );

  return boardgame;
};

const getBoardgameStats = (response) => {
  let boardgameStats = {};
  boardgameStats.usersRated = parseInt(
    response.items.item[0].statistics[0].ratings[0].usersrated[0].$.value
  );
  boardgameStats.averageRating = parseFloat(
    response.items.item[0].statistics[0].ratings[0].average[0].$.value
  ).toFixed(
    2
  );
  boardgameStats.bayesAverageRating = parseFloat(
    response.items.item[0].statistics[0].ratings[0].bayesaverage[0].$.value
  ).toFixed(
    2
  );
  boardgameStats.subtypeRatings = getBoardgameRanks(
    response.items.item[0].statistics[0].ratings[0].ranks[0].rank,
    "subtype"
  );
  boardgameStats.familyRatings = getBoardgameRanks(
    response.items.item[0].statistics[0].ratings[0].ranks[0].rank,
    "family"
  );

  boardgameStats.owned = parseInt(
    response.items.item[0].statistics[0].ratings[0].owned[0].$.value
  );

  boardgameStats.trading = parseInt(
    response.items.item[0].statistics[0].ratings[0].trading[0].$.value
  );

  boardgameStats.wanting = parseInt(
    response.items.item[0].statistics[0].ratings[0].wanting[0].$.value
  );

  boardgameStats.wishing = parseInt(
    response.items.item[0].statistics[0].ratings[0].wishing[0].$.value
  );

  boardgameStats.numComments = parseInt(
    response.items.item[0].statistics[0].ratings[0].numcomments[0].$.value
  );

  boardgameStats.numWeights = parseInt(
    response.items.item[0].statistics[0].ratings[0].numweights[0].$.value
  );

  boardgameStats.averageWeight =
    response.items.item[0].statistics[0].ratings[0].averageweight[0].$.value !=
    0
      ? parseFloat(
          response.items.item[0].statistics[0].ratings[0].averageweight[0].$.value
        ).toFixed(
          2
        )
      : null;

  return boardgameStats;
};

const getBoardgameUserRatings = (response) => {
  let boardgameUserRatings = {};
  boardgameUserRatings.userRatings = response.items.item[0].comments[0].comment.map(
    (e) => parseFloat(e.$.rating)
  );
  return boardgameUserRatings;
};

const getNumPlayersPollResults = (numPlayersPollElement) => {
  let boardgameNumPlayersStats = {};

  boardgameNumPlayersStats.totalVotes = parseInt(
    numPlayersPollElement.$.totalvotes
  );

  boardgameNumPlayersStats.playerCount = {};
  if (boardgameNumPlayersStats.totalVotes != 0) {
    numPlayersPollElement.results.forEach((e) => {
      boardgameNumPlayersStats.playerCount[e.$.numplayers] = {
        Best: parseInt(e.result[0].$.numvotes),
        Recommended: parseInt(e.result[1].$.numvotes),
        "Not Recommended": parseInt(e.result[2].$.numvotes),
      };
    });
  }

  return boardgameNumPlayersStats;
};

const getPlayerAgePollResults = (playerAgePollElement) => {
  let boardgamePlayerAgeStats = {};

  boardgamePlayerAgeStats.totalVotes = parseInt(
    playerAgePollElement.$.totalvotes
  );
  boardgamePlayerAgeStats.playerAge = {};
  if (boardgamePlayerAgeStats.totalVotes != 0) {
    if (!Object.keys(playerAgePollElement).includes("result"))
      return boardgamePlayerAgeStats;
    playerAgePollElement.results[0].result.forEach((e) => {
      boardgamePlayerAgeStats.playerAge[e.$.value] = parseInt(e.$.numvotes);
    });
  }

  return boardgamePlayerAgeStats;
};

const getLangDependenceResults = (langDependenceElement) => {
  let boardgameLangDependenceStats = {};

  boardgameLangDependenceStats.totalVotes = parseInt(
    langDependenceElement.$.totalvotes
  );
  if (!Object.keys(langDependenceElement).includes("results")) {
    boardgameLangDependenceStats.langDependenceLevels = [];
  } else {
    boardgameLangDependenceStats.langDependenceLevels = langDependenceElement.results[0].result.map(
      (e) => ({
        value: e.$.value,
        numVotes: parseInt(e.$.numvotes),
      })
    );
  }

  return boardgameLangDependenceStats;
};

const getBoardgameLinkElements = (linkElement, type) => {
  const filteredLinkElement = linkElement.filter((e) => e.$.type === type);
  return filteredLinkElement.map((e) => ({ id: e.$.id, value: e.$.value }));
};

const getBoardgameRanks = (ranksElement, type) => {
  const filteredRanksElement = ranksElement.filter((e) => e.$.type === type);
  return filteredRanksElement.map((e) => ({
    id: e.$.id,
    value: isNaN(parseInt(e.$.value)) ? null : parseInt(e.$.value),
    name: e.$.name,
    friendlyName: e.$.friendlyname,
    bayesAverage:
      e.$.bayesaverage == "Not Ranked" ? null : parseFloat(e.$.bayesaverage),
  }));
};

const getRecommendedPlayers = (playerCount) => {
  const playerCounts = Object.keys(playerCount);
  let recommendedPlayerCount = 0;
  let bestCount = "";

  Object.values(playerCount).forEach((d, i) => {
    if (d.Best > bestCount) {
      bestCount = d.Best;
      recommendedPlayerCount = playerCounts[i];
    }
  });

  return parseInt(recommendedPlayerCount);
};

const getMarketplaceData = async (response) => {
  let marketplaceData = {};

  if (!Object.keys(response.items.item[0]).includes("marketplacelistings"))
    return {
      numListings: 0,
      numListingsNew: 0,
      numListingsUsed: 0,
      averagePriceNew: null,
      medianPriceNew: null,
      maxPriceNew: null,
      minPriceNew: null,
      averagePriceUsed: null,
      medianPriceUsed: null,
      maxPriceUsed: null,
      minPriceUsed: null,
      stdPriceNew: null,
      stdPriceUsed: null,
    };
  marketplaceData.listings = await Promise.all(
    response.items.item[0].marketplacelistings[0].listing.map((e) =>
      getMarketplaceListingData(e)
    )
  );

  marketplaceData.numListings = marketplaceData.listings.length;
  marketplaceData.numListingsNew = marketplaceData.listings.filter(
    (e) => e.condition == "new"
  ).length;
  marketplaceData.numListingsUsed = marketplaceData.listings.filter(
    (e) => e.condition != "new"
  ).length;

  marketplaceData.averagePriceNew =
    marketplaceData.numListingsNew > 0
      ? average(
          marketplaceData.listings
            .filter((e) => e.condition == "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.medianPriceNew =
    marketplaceData.numListingsNew > 0
      ? median(
          marketplaceData.listings
            .filter((e) => e.condition == "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.maxPriceNew =
    marketplaceData.numListingsNew > 0
      ? Math.max(
          ...marketplaceData.listings
            .filter((e) => e.condition == "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.minPriceNew =
    marketplaceData.numListingsNew > 0
      ? Math.min(
          ...marketplaceData.listings
            .filter((e) => e.condition == "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.averagePriceUsed =
    marketplaceData.numListingsUsed > 0
      ? average(
          marketplaceData.listings
            .filter((e) => e.condition != "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.medianPriceUsed =
    marketplaceData.numListingsUsed > 0
      ? median(
          marketplaceData.listings
            .filter((e) => e.condition != "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.maxPriceUsed =
    marketplaceData.numListingsUsed > 0
      ? Math.max(
          ...marketplaceData.listings
            .filter((e) => e.condition != "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.minPriceUsed =
    marketplaceData.numListingsUsed > 0
      ? Math.min(
          ...marketplaceData.listings
            .filter((e) => e.condition != "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.stdPriceNew =
    marketplaceData.numListingsNew > 0
      ? standardDeviation(
          marketplaceData.listings
            .filter((e) => e.condition == "new")
            .map((e) => e.priceUsd)
        )
      : null;
  marketplaceData.stdPriceUsed =
    marketplaceData.numListingsUsed > 0
      ? standardDeviation(
          marketplaceData.listings
            .filter((e) => e.condition != "new")
            .map((e) => e.priceUsd)
        )
      : null;

  return marketplaceData;
};

const getMarketplaceListingData = async (listing) => {
  let listingData = {};

  listingData.price = parseFloat(listing.price[0].$.value).toFixed(2);
  listingData.currency = listing.price[0].$.currency;
  listingData.condition = listing.condition[0].$.value;
  listingData.date = listing.listdate[0].$.value;
  listingData.priceUsd = await convertCurrency(
    listingData.price,
    listingData.currency,
    "USD"
  );
  return listingData;
};

module.exports = {
  getBoardgame,
  getBoardgameRanks,
};
