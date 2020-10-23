const axios = require("axios");
const enrichCollection = async (collection) => {
  let enrichedCollection = {};

  enrichedCollection = await enrichCollectionWithBoardgames(collection);
  enrichedCollection = await enrichCollectionWithPlays(enrichedCollection);

  return enrichedCollection;
};

const enrichCollectionWithBoardgames = async (collection) => {
  for (const [i, item] of collection.items.entries()) {
    const boardgame = await getBoardgame(item.id);
    if (boardgame == undefined) {
      await setTimeout((_) => _, 200);
    }
    collection.items[i] = Object.assign(item, boardgame);
  }
  return collection;
};

const enrichCollectionWithPlays = async (collection) => {
  const plays = await getPlays(collection.username);
  if (plays == undefined) return collection;

  collection.totalPlays = plays.totalPlays;
  collection.lastLoggedPlay = plays.lastLoggedPlay;

  collection.items.forEach((d, i) => {
    collection.items[i].plays = plays.items[d.id];
  });
  return collection;
};

const enrichCollectionWithInsights = async (collection) => {
  const insightType = "all";
  const queryUrl = `${process.env.INSIGHTS_API_ROOT_URL}/insights/${insightType}`;
  const response = await axios.post(queryUrl, collection, {
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  collection.insights = response.data;
  return collection;
};

const getBoardgame = async (id) => {
  try {
    const queryUrl = `${process.env.API_ROOT_URL}/boardgames/${id}`;
    const response = await axios(queryUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPlays = async (username) => {
  try {
    const queryUrl = `${process.env.API_ROOT_URL}/plays/${username}`;
    const response = await axios(queryUrl);
    return response.data;
  } catch (error) {}
};

const addUserInfoToCollection = (collection, user, fields) => {
  fields.forEach((f) => {
    collection[f] = user[f];
  });

  return collection;
};

module.exports = {
  enrichCollection,
  enrichCollectionWithBoardgames,
  enrichCollectionWithPlays,
  enrichCollectionWithInsights,
  addUserInfoToCollection,
};
