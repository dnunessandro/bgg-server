const getPlays = (response, options) => {
  if (Object.keys(response).includes("div")) return undefined;
  let plays = {};
  plays.username = response.plays.$.username;
  plays.userId = response.plays.$.userid;
  plays.total = parseInt(response.plays.$.total);
  plays.items = response.plays.play
    ? response.plays.play.map((e) => processPlay(e)).filter(e=>Object.keys(e).length != 0)
    : [];
  return plays;
  //return response.plays.play[0].players[0].player
  //return response.plays.play
};

const processPlay = (play) => {
  if (new Date(play.$.date) == "Invalid Date") {
    return {};
  } else {
    
    return {
      id: play.$.id,
      date: play.$.date,
      quantity: parseInt(play.$.quantity),
      length: parseInt(play.$.length),
      incomplete: parseInt(play.$.incomplete),
      location: play.$.location,
      objectName: play.item[0].$.name,
      itemId: play.item[0].$.objectid,
      objectType: play.item[0].subtypes[0].subtype[0].$.value,
      comments: Object.keys(play).includes("comments") ? play.comments[0] : "",
      players: Object.keys(play).includes("players")
        ? play.players[0].player.map((e) => processPlayer(e))
        : [],
    };
  }
};

const processPlayer = (player) => {
  return {
    username: player.$.username,
    userId: player.$.userid,
    name: player.$.name,
    startPosition: player.$.startposition,
    color: player.$.color,
    score: player.$.score,
    new: parseInt(player.$.new),
    rating: parseFloat(player.$.rating),
    win: parseInt(player.$.new),
  };
};

module.exports = { getPlays };
