const { getBoardgameRanks } = require("./get-thing");

const getCollection = (response, options) => {
  let collection = {};

  if (!Object.keys(response.items).includes("item")) return { error: "empty" };

  collection.totalItems = response.items.$.totalitems;
  collection.pubDate = response.items.$.pubdate;
  collection.items = response.items.item
    .map((e) => getCollectionItemFields(e, options))
    .filter((e) => e.numOwned >= process.env.NUM_OWNED_THRESH);
  collection.ignoredItems = response.items.item
  .map((e) => getCollectionItemFields(e, options))
  .filter((e) => e.numOwned < process.env.NUM_OWNED_THRESH);

  return collection;
};

const getCollectionItemFields = (item, options) => {
  let collectionItem = {};

  collectionItem.objectType = item.$.objecttype;
  collectionItem.id = item.$.objectid;
  collectionItem.subtype = item.$.subtype;
  collectionItem.collId = item.$.collid;
  collectionItem.name = item.name[0]._;
  collectionItem.yearPublished =
    "yearPublished" in item ? item.yearpublished[0] : null;
  collectionItem.image =
    "image" in item
      ? item.image[0]
      : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
  collectionItem.thumbnail =
    "thumbnail" in item
      ? item.thumbnail[0]
      : "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
  collectionItem.own = parseInt(item.status[0].$.own);
  collectionItem.prevowned = parseInt(item.status[0].$.prevowned);
  collectionItem.fortrade = parseInt(item.status[0].$.fortrade);
  collectionItem.want = parseInt(item.status[0].$.want);
  collectionItem.wanttoplay = parseInt(item.status[0].$.wanttoplay);
  collectionItem.wanttobuy = parseInt(item.status[0].$.wanttobuy);
  collectionItem.wishlist = parseInt(item.status[0].$.wishlist);
  collectionItem.preordered = parseInt(item.status[0].$.preordered);
  collectionItem.lastmodified = item.status[0].$.lastmodified;
  collectionItem.numPlays = parseInt(item.numplays[0]);

  // Get Stats
  collectionItem = Object.assign(
    collectionItem,
    options.get("stats") ? getCollectionItemStats(item) : {}
  );

  return collectionItem;
};

const getCollectionItemStats = (item) => {
  let collectionItemStats = {};

  collectionItemStats.minPlayers = parseInt(item.stats[0].$.minplayers);
  collectionItemStats.maxPlayers = parseInt(item.stats[0].$.maxplayers);
  collectionItemStats.minPlayTime = parseInt(item.stats[0].$.minplaytime);
  collectionItemStats.maxPlayTime = parseInt(item.stats[0].$.maxplaytime);
  collectionItemStats.playTime = parseInt(item.stats[0].$.playingtime);
  collectionItemStats.numOwned = parseInt(item.stats[0].$.numowned);
  collectionItemStats.userRating = isNaN(
    parseFloat(item.stats[0].rating[0].$.value)
  )
    ? null
    : parseFloat(item.stats[0].rating[0].$.value);
  collectionItemStats.usersRated = parseInt(
    item.stats[0].rating[0].usersrated[0].$.value
  );
  collectionItemStats.averageRating = parseFloat(
    item.stats[0].rating[0].average[0].$.value
  );
  collectionItemStats.bayesAverageRating = parseFloat(
    item.stats[0].rating[0].bayesaverage[0].$.value
  );
  collectionItemStats.stdRating = parseFloat(
    item.stats[0].rating[0].stddev[0].$.value
  );
  collectionItemStats.medianRating = parseFloat(
    item.stats[0].rating[0].median[0].$.value
  );
  collectionItemStats.subtypeRatings = getBoardgameRanks(
    item.stats[0].rating[0].ranks[0].rank,
    "subtype"
  );
  collectionItemStats.familyRatings = getBoardgameRanks(
    item.stats[0].rating[0].ranks[0].rank,
    "family"
  );

  return collectionItemStats;
};

module.exports = { getCollection };
