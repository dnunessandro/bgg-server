const getUser = (response, options) => {
  let user = {};

  user.id = response.user.$.id;
  user.name = response.user.$.name;
  user.firstName = response.user.firstname[0].$.value;
  user.lastName = response.user.lastname[0].$.value;
  user.avatar = response.user.avatarlink[0].$.value;
  user.yearRegistered = parseInt(response.user.yearregistered[0].$.value);
  user.lastLogin = response.user.lastlogin[0].$.value;
  user.stateOrProvince = response.user.stateorprovince[0].$.value;
  user.country = response.user.country[0].$.value;
  user.webAddress = response.user.webaddress[0].$.value;
  user.tradeRating = parseFloat(response.user.traderating[0].$.value);
  user.marketRating = parseFloat(response.user.marketrating[0].$.value);

  // Get Hot List
  user = Object.assign(
    user,
    options.get("hot") ? getUserList(response, "hot") : {}
  );

  // Get Top List
  user = Object.assign(
    user,
    options.get("top") ? getUserList(response, "top") : {}
  );

  return user;
};

const getUserList = (response, type) => {
  list = [];

  response.user[type][0].item.forEach((e) => {
    const listItem = {
      rank: parseInt(e.$.rank),
      type: e.$.type,
      id: e.$.id,
      name: e.$.name,
    };
    list.push(listItem);
  });

  let listObj = {};
  listObj[type + "List"] = list;

  return listObj;
};

module.exports = { getUser };
