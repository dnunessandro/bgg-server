const getNodeTextWidthArray = (nodeTextSelection) => {
  let textWidthArray = [];
  nodeTextSelection.nodes().forEach((e) => {
    const textBBox = e.getBBox();
    textWidthArray.push(textBBox.width);
  });
  return textWidthArray;
};

const getNodeTextHeightArray = (nodeTextSelection) => {
  let textHeightArray = [];
  nodeTextSelection.nodes().forEach((e) => {
    const textBBox = e.getBBox();
    textHeightArray.push(textBBox.height);
  });
  return textHeightArray;
};

const getNodeRadius = (value, radiusScale, defaultValue) => {
  return (typeof value == "number") & !isNaN(value)
    ? checkIfMobile()
      ? radiusScale(value) / 2
      : radiusScale(value)
    : defaultValue;
};

const getPyth = (width, height) => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
};

const getOverviewNumNodes = () => {
  const chartWidth = $("#collection-overview-chart").width();

  const mapKeys = Object.keys(NUM_NODES_BREAKPOINT_MAP).reverse();

  for (let i = 0; i < mapKeys.length; i++) {
    if (chartWidth > parseInt(mapKeys[i]))
      return NUM_NODES_BREAKPOINT_MAP[mapKeys[i]];
  }
};

const getLoadTimes = (n) => {
  const mapKeys = Object.keys(LOAD_TIME_MAP).reverse();
  for (let i = 0; i < mapKeys.length; i++) {
    if (n > parseInt(mapKeys[i])) return LOAD_TIME_MAP[mapKeys[i]];
  }
};

const getNodeYPosition = (index, numItems) => {
  if (numItems <= COLLECTION_OVERVIEW_NUM_NODES / 2) {
    return $("#collection-overview-chart").height() / 2;
  } else if (index < numItems / 2) {
    return $("#collection-overview-chart").height() * 0.25;
  } else {
    return $("#collection-overview-chart").height() * 0.75;
  }
};

const filterCollectionItems = (collectionItems, numNodes) => {
  if (collectionItems.length > COLLECTION_OVERVIEW_NUM_NODES) {
    collectionItems.sort((a, b) =>
      a["userRating"] < b["userRating"] ? 1 : -1
    );
  }
  collectionItems = collectionItems.slice(0, numNodes);
  return collectionItems;
};

const sortCollectionItems = (collectionItems, nodeField) => {
  collectionItems.sort((a, b) => (a[nodeField] > b[nodeField] ? 1 : -1));
  return collectionItems;
};

const getActiveNodeSizeField = () => {
  const activeButtonId = $(
    "#collection-overview-sidepanel " + ".btn-primary"
  ).prop("id");
  return activeButtonId
    ? OVERVIEW_SP_BTN_TO_FIELD_MAP[activeButtonId]
    : undefined;
};

function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 200, event);
  };
}

const createAltArray = (n) => {
  const loopArray = new Array(n).fill(0);
  let altArray = [1];
  loopArray.forEach((_, i) => {
    altArray.push(altArray[i] * -1);
  });

  altArray.pop();

  return altArray;
};

const computeNodeLabelsPositions = (collectionItems) => {
  const chartHeight = $("#collection-overview-chart").height();

  const offsetArray = [0, 0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1, 1];
  const replicatedOffsetArray = replicateArray(offsetArray, 50);

  const altArray = createAltArray(collectionItems.length);
  let labelsPositions = [];
  const maxRadius = Math.max(...collectionItems.map((d) => d.radius));
  collectionItems.forEach((d, i) => {
    labelsPositions.push({
      nameLength: d.name.length,
      x: 0,
      y:
        (maxRadius +
          15 +
          replicatedOffsetArray[i] * (checkIfMobile() ? 70 : 100)) *
        altArray[i],
      // y:
      //   ((maxRadius + chartHeight / 2) / 2 +
      //     (replicatedOffsetArray[i] * (chartHeight / 2 - d.radius - 20)) / 2) *
      //   altArray[i],
    });
  });

  return labelsPositions;
};

const replicateArray = (array, nReplications) => {
  const loopArray = new Array(nReplications).fill(0);
  let concatArray = [];

  loopArray.forEach((d) => {
    concatArray = concatArray.concat(array);
  });

  return concatArray;
};

const getRatingColor = (rating) => {
  const ratingRangesKeys = Object.keys(RATING_CLASSES_MAP);
  const ratingRangesValues = Object.values(RATING_CLASSES_MAP);

  let ratingColor = "";
  ratingRangesValues.forEach((d, i) => {
    ratingColor =
      rating >= d[0] && rating <= d[1] ? ratingRangesKeys[i] : ratingColor;
  });

  return ratingColor;
};

const getPlayerCountData = (collectionItem) => {
  const playerCountLabels = ["1", "2", "3", "4", "5", "6", "7", "8+"];
  let playerCountData = {};

  playerCountLabels.forEach((e) => {
    const key = parseInt(e);

    playerCountData[key] = {};
    playerCountData[key].label = e;
    if (key == collectionItem.recommendedPlayers) {
      playerCountData[key].recommendation = "Best";
    } else if (
      !between(key, collectionItem.minPlayers, collectionItem.maxPlayers)
    ) {
      playerCountData[key].recommendation = "Not Supported";
    } else {
      playerCountData[key].recommendation = getPlayerCountRecommendation(
        key,
        collectionItem.numPlayersStats.playerCount
      );
    }
  });

  return playerCountData;
};

const getPlayerCountRecommendation = (playerCount, playerCountPoll) => {
  const data = playerCountPoll[String(playerCount)];
  const bestOrRecommendedCount = data["Best"] + data["Recommended"];
  const all = data["Best"] + data["Recommended"] + data["Not Recommended"];
  const ratio = bestOrRecommendedCount / all;

  return checkMapRange(ratio, PLAYER_COUNT_RECOMMENDATION_MAP);
};

const createArrayBetween = (start, end) => {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
};

function between(x, min, max) {
  return x >= min && x <= max;
}

const checkMapRange = (ratio, map) => {
  for (const key of Object.keys(map)) {
    if (between(ratio, map[key][0], map[key][1])) return key;
  }
};

const formatRatingsThousands = (tick) => {
  const formattedTick = tick >= 1000 ? Math.round(tick / 1000) + "K" : tick;
  return formattedTick;
};

const getItemCategories = (collectionItem) => {
  let collectionMechanicsArray = [];

  collectionItem.categories.forEach((e) => {
    collectionMechanicsArray.push({
      id: e.id,
      value: e.value,
      type: "category",
    });
  });
  collectionItem.families.forEach((e) => {
    collectionMechanicsArray.push({ id: e.id, value: e.value, type: "family" });
  });
  collectionItem.mechanics.forEach((e) => {
    collectionMechanicsArray.push({
      id: e.id,
      value: e.value,
      type: "mechanic",
    });
  });

  return collectionMechanicsArray;
};

const setD3Version = (d3Version) => {
  window.d3 = d3Version == 3 ? d3version3 : d3version5;
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const populateUserCard = (collection) => {
  const helloId = "#hello-title";
  const usernameId = "#user-profile-username";
  const nameId = "#user-profile-name";
  const imageId = "#user-profile-image";
  const itemsId = "#user-profile-items";
  const playsId = "#user-profile-plays";
  const yearId = "#user-profile-year";
  const countryId = "#user-profile-country";
  const loginId = "#user-profile-login";
  const updatedId = "#user-profile-updated";

  $(helloId).html(
    `Hey ${
      collection.firstName
        ? jsUcfirst(collection.firstName)
        : jsUcfirst(collection.username)
    }`
  );
  $(usernameId).text(collection.username);
  $(nameId).text(collection.firstName + " " + collection.lastName);
  $(imageId).attr(
    "src",
    collection.avatar == "N/A" ? "img/user-solid.png" : collection.avatar
  );

  $(yearId).text(collection.yearRegistered);
  $(countryId).text(collection.country ? collection.country : "N/A");
  $(itemsId).text(collection.totalItems);
  $(playsId).text(collection.totalPlays ? collection.totalPlays : "N/A");
  $(loginId).text(
    collection.lastLogin ? collection.lastLogin.split("T")[0] : "N/A"
  );
  $(updatedId).text(
    collection.lastUpdated ? collection.lastUpdated.split("T")[0] : "N/A"
  );
  $(updatedId).append(
    `<span id="updated-icon" class="fas fa-sync-alt p-1 ml-2"></span>`
  );

  createUpdateBtnEL(collection);
};

// WAYPOINTS
const addAllWaypoints = (elementIdList) => {
  elementIdList.forEach((e) => addWaypoint(e));
};
const addWaypoint = (elementId) => {
  $(elementId).waypoint({
    handler: (_) => {
      $(elementId).css("opacity", 1);
      $(elementId).addClass("slide-top");
    },
    offset: "80%",
  });
};

const getWaypointList = (waypointList) => {
  $("#insights")
    .children()
    .each(function () {
      waypointList.push("#" + $(this).attr("id"));
    });
  $(".card-columns")
    .children()
    .each(function () {
      waypointList.push("#" + $(this).attr("id"));
    });

  $("#global-stats")
    .children()
    .each(function () {
      waypointList.push("#" + $(this).attr("id"));
    });

  return waypointList;
};

const longStrToArray = (str) => {
  if (str.length > 25) {
    return longStrToArray(str.slice(0, 15) + "...");
  } else if (str.indexOf(" ") >= 0) {
    return [str.slice(0, str.indexOf(" ")), str.slice(str.indexOf(" ") + 1)];
  } else {
    return str;
  }
};

const processLabel = (label) => {
  const returnLabel = Array.isArray(label) ? label.join(" ") : label;

  return returnLabel.replace(" Game", "");
};

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

const replaceKeys = (dict, keysToReplace) => {
  Object.keys(keysToReplace).forEach((k) => {
    const oldKey = k;
    const newKey = keysToReplace[k];

    if (oldKey in dict) {
      Object.defineProperty(
        dict,
        newKey,
        Object.getOwnPropertyDescriptor(dict, oldKey)
      );
      delete dict[oldKey];
    }
  });

  return dict;
};

const replaceEntries = (array, entriesToReplace) => {
  let newArray = [];
  const oldEntries = Object.keys(entriesToReplace);
  array.forEach((e) => {
    if (!oldEntries.includes(e)) {
      newArray.push(e);
    } else {
      newArray.push(entriesToReplace[e]);
    }
  });

  return newArray;
};

const limitStrSize = (string, size) => {
  return string.length > size ? string.slice(0, size) + "..." : string;
};

const dictValuesToPrct = (dict, total) => {
  return Object.fromEntries(
    Object.entries(dict).map(([k, v]) => [
      k,
      parseFloat(((v / total) * 100).toFixed(1)),
    ])
  );
};

const getStringBetween = (string, startString, endString) => {
  stringInBetween = string.substring(
    string.lastIndexOf(startString) + startString.length,
    string.lastIndexOf(endString)
  );

  return stringInBetween;
};

var getParams = function (url) {
  var params = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

function memorySizeOf(obj) {
  var bytes = 0;

  function sizeOf(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case "number":
          bytes += 8;
          break;
        case "string":
          bytes += obj.length * 2;
          break;
        case "boolean":
          bytes += 4;
          break;
        case "object":
          var objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === "Object" || objClass === "Array") {
            for (var key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else bytes += obj.toString().length * 2;
          break;
      }
    }
    return bytes;
  }

  function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
  }

  return formatByteSize(sizeOf(obj));
}

const getExcludedBoardgameGameNames = (collectionsItems, threshold) => {
  return collectionsItems.filter((d) => d.owned < threshold).map((d) => d);
};

const checkIfMobile = () => {
  var isMobile = false;
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }

  return isMobile;
};

const genBoardgameNamesHtml = (items, classes) => {
  let namesHtml = "";

  items.forEach((e) => {
    namesHtml = namesHtml.concat(
      `<a href="https://boardgamegeek.com/boardgame/${
        e.id
      }" target="_blank" class="${classes}">${e.name.replace(
        / /g,
        "&nbsp"
      )}</a>, `
    );
  });
  namesHtml = namesHtml.substring(0, namesHtml.length - 2);

  return namesHtml;
};

const showIgnoredBoardgamesModal = (ignoredItems) => {
  const newHtml = `<p class="text-justify">In order to avoid extensive computation times and 
  preserve the statistical accuracy of the data presented, boardgames with less than 
  <em>200</em> owners are not considered in the data presented here. This includes <em>${ignoredItems.length}</em>
  boargames in your collection.</p>`;

  $("#ignored-boardgames-modal-body").prepend(newHtml);

  $("#ignored-boardgames-text").html(
    genBoardgameNamesHtml(ignoredItems, "badge-pill badge-secondary py-1")
  );

  $(`#ignored-boardgames-button`).on("click", function () {
    if ($(this).attr("class").includes("collapsed")) {
      $(this).html($(this).html().replace("Show", "Hide"));
    } else {
      $(this).html($(this).html().replace("Hide", "Show"));
    }
  });

  $("#ignored-boardgames-modal").modal({ show: false });
  $("#ignored-boardgames-modal").modal("show");
};

const getBucketedBoardgameSample = async (n, splits, ownersTresh, field) => {
  let sample = [];
  const splitN = Math.round(n / (splits.length - 1));
  const baseUrl = `${API_URL}/boardgames/sample/${splitN}?`;

  for (let i = 0; i < splits.length - 1; i++) {
    const gte = splits[i];
    const lte = splits[i + 1];

    const response = await axios(
      `${baseUrl}${field}=${gte},${lte}&owned=${ownersTresh}`
    );
    response.data.forEach((d) => sample.push(d));
  }

  return sample;
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getBoardgameUniquePeople = async (id, peopleType) => {
  const boardgameResponse = await axios.get(`${API_URL}/boardgames/${id}`);
  return boardgameResponse.data[peopleType].length;
};

const getDateDiffInHours = (date) => {
  const currentDate = new Date();

  const inputDate = new Date(date);

  const dateDiff = currentDate - inputDate;

  return dateDiff / 1000 / 60 / 60;
};

const createUpdateBtnEL = (collection) => {
  if (
    getDateDiffInHours(collection.lastUpdated) < COLLECTION_MANUAL_UPDATE_TRESH
  ) {
    $("#updated-icon").css("color", BACKGROUND_COLOR);
    $("#updated-icon").css("background-color", "transparent");
    $("#updated-icon").css("cursor", "default");
    $("#updated-icon").attr("data-toggle", "tooltip");
    $("#updated-icon").attr(
      "title",
      `Collections can only be updated once every ${COLLECTION_MANUAL_UPDATE_TRESH} hours.`
    );
  } else {
    $("#updated-icon").on("click", async function () {
      $(
        "#user-profile-updated"
      ).html(`<div><span class="spinner-border spinner-border" role="status" aria-hidden="true"></span>
      Updating</div>`);
      $("#user-profile-updated").attr("data-toggle", "tooltip");
      $("#user-profile-updated").attr(
        "title",
        "This page will automatically be refreshed once the update is finished."
      );

      await axios.post(`${API_URL}/collections/${collection.username}/enrich`);

      // Periodically check if collection was enriched
      const intervalID = setInterval(async function () {
        response = await axios.get(
          `${API_URL}/collections/${collection.username}/enrich`
        );

        if (
          response.status == 200 &&
          getDateDiffInHours(response.data.lastUpdated) <
            COLLECTION_MANUAL_UPDATE_TRESH
        ) {
          await clearInterval(intervalID);
          const collection = response.data;
          const compressedCollection = LZUTF8.compress(
            JSON.stringify(collection),
            {
              outputEncoding: "StorageBinaryString",
            }
          );

          window.localStorage.clear();
          window.localStorage.setItem("collection", compressedCollection);

          location.reload();
        }
      }, 10000);
    });
  }
};

// const storeCollectionItemsToLocalStorage = (items, splitSize) => {
//   if (items.length < 100)
//     window.localStorage.setItem("items", JSON.stringify(items));

//   let splitItems = [];
//   for (var i = 0; i < items.length; i += splitSize) {
//     splitItems.push(items.slice(i, i + splitSize));
//   }

//   splitItems.forEach((d, i) => {
//     window.localStorage.setItem("collectionItems" + i, JSON.stringify(d));
//   });
// };

// const storeCollectionToLocalStorage = (collection, splitSize) => {
//   window.localStorage.clear();
//   const items = collection.items;
//   collection["items"] = undefined;
//   window.localStorage.setItem("collection", JSON.stringify(collection));

//   storeCollectionItemsToLocalStorage(items, splitSize);
//   console.log(window.localStorage);
// };

// const restoreCollectionFromLocalStorage = () => {
//   let collection = JSON.parse(window.localStorage.getItem("collection"));

//   console.log(collection)
//   let items = [];
//   Object.keys(window.localStorage)
//     .filter((k) => k.startsWith("collectionItems"))
//     .forEach((d) => items.push(JSON.parse(d)));
//   collection["items"] = items;
//   return collection;
// };
