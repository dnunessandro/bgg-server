const axios = require("axios").default;
const xml2js = require("xml2js").parseStringPromise;
const { getBoardgame } = require("./get-thing");
const { getCollection } = require("./get-collection");
const { getUser } = require("./get-user");
const { getPlays } = require("./get-plays");
const { getHot } = require("./get-hot");
const { getSearch } = require("./get-search");

const getQueryUrl = (id, itemType, options) => {
  switch (itemType) {
    case "collection":
      return getCollectionUrl(id, options);
    case "boardgame":
      return getThingUrl(id, options);
    case "user":
      return getUserUrl(id, options);
    case "plays":
      return getPlaysUrl(id, options);
    case "hot":
      return getHotUrl(id, options);
    case "search":
      return getSearchUrl(id, options);
    default:
      return getThingUrl(options.get("type"));
  }
};

const getThingUrl = (thingId, options) => {
  let queryUrl = `${process.env.BGG_API_ROOT_URL}/thing?id=${thingId}`;
  return addOptions(queryUrl, options);
};

const getCollectionUrl = (username, options) => {
  let queryUrl = `${process.env.BGG_API_ROOT_URL}/collection?username=${username}`;
  return addOptions(queryUrl, options);
};

const getUserUrl = (name, options) => {
  let queryUrl = `${process.env.BGG_API_ROOT_URL}/user?name=${name}`;
  return options ? addOptions(queryUrl, options) : queryUrl;
};

const getPlaysUrl = (username, options) => {
  Object.assign(
    options,
    Object.keys(options).includes("type") ? { type: "thing" } : {}
  );
  let queryUrl = `${process.env.BGG_API_ROOT_URL}/plays?username=${username}`;
  return addOptions(queryUrl, options);
};

const getHotUrl = (type) => {
  type = type ? type : "boardagme";
  let queryUrl = `${process.env.BGG_API_ROOT_URL}/hot?type=${type}`;
  return queryUrl;
};

const getSearchUrl = (query, options) => {
  let queryUrl = `${process.env.BGG_API_ROOT_URL}/search?query=${query}`;
  return addOptions(queryUrl, options);
};

const addOptions = (url, options) => {
  const keys = Object.keys(options);
  let modifiedUrl = url;
  keys.forEach((k) => (modifiedUrl += `&${k}=${options[k]}`));
  return modifiedUrl;
};

const processResponse = (response, itemType, options) => {
  if (Object.keys(response).includes("errors")) {
    return undefined;
  }
  switch (itemType) {
    case "thing":
      return getBoardgame(response, options);
    case "collection":
      if (Object.keys(response).includes("message")) return { error: "queued" };
      return getCollection(response, options);
    case "user":
      return getUser(response, options);
    case "plays":
      return getPlays(response, options);
    case "hot":
      return getHot(response);
    case "search":
      return getSearch(response);
  }
};

const getResponse = async (queryUrl) => {
  try {
    const urlObj = new URL(queryUrl);
    const options = urlObj.searchParams;
    const itemType = urlObj.pathname.split("/").slice(-1)[0];
    const xmlResponse = await axios(queryUrl);
    const jsonResponse = await xml2js(xmlResponse.data);

    processedResponse = processResponse(jsonResponse, itemType, options);

    if (processedResponse==undefined) return undefined

    if (
      Object.keys(processedResponse).includes("error") 
      && processedResponse["error"] == "queued"
    ) {
      await setTimeout((_) => _, 50);
      return await getResponse(queryUrl);
    } else if (true){}

    return processedResponse;
  } catch (error) {
    if (error.response.data.includes('Rate limit exceeded')){
      await setTimeout(_=>_, 1000)
      return await getResponse(queryUrl);
    }
  }
};

module.exports = { getQueryUrl, getResponse };
