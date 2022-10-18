const { getQueryUrl, getResponse } = require('../bgg-api-parse/get-item');

const getAllPlaysPages = async (username) => {
  let plays = {};
  plays.items = {};

  let page = 1;
  while (true) {
    const queryUrl = getQueryUrl(username, 'plays', { page });
    await setTimeout((_) => _, 200);
    const rawPlays = await getResponse(queryUrl);
    if (rawPlays == undefined) return undefined;
    if (rawPlays.items.length == 0) break;

    plays.username = rawPlays.username;
    plays.userId = rawPlays.userId;
    plays.totalPlays = rawPlays.total;
    const playsByItem = splitPlaysByItem(rawPlays.items);

    plays.items = mergePlays(plays.items, playsByItem);
    page++;
  }

  plays.totalItems = Object.keys(plays.items).length;

  playsItems = Object.keys(plays.items);
  playsDates = [];
  playsItems.forEach((i) => {
    plays.items[i].forEach((p) => playsDates.push(new Date(p.date)));
  });
  plays.lastLoggedPlay = Math.max(...playsDates);

  return plays;
};

const mergePlays = (plays, newPlays) => {
  const playsKeys = Object.keys(plays);
  const newPlaysKeys = Object.keys(newPlays);

  newPlaysKeys.forEach((k) => {
    if (playsKeys.includes(k)) {
      plays[k].push(...newPlays[k]);
    } else {
      plays[k] = newPlays[k];
    }
  });

  return plays;
};

const splitPlaysByItem = (rawPlays) => {
  let playsByItem = {};
  rawPlays.forEach((e) => {
    const playsByItemKeys = Object.keys(playsByItem);

    if (!playsByItemKeys.includes(e.itemId)) {
      playsByItem[e.itemId] = [];
    }

    playsByItem[e.itemId].push(e);
  });

  return playsByItem;
};

module.exports = {
  getAllPlaysPages,
  mergePlays,
  splitPlaysByItem,
};
