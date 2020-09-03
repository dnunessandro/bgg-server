const axios = require("axios");

d3 = require("d3-array");
function getPearsonCorrelation(x, y) {
  var shortestArrayLength = 0;

  if (x.length == y.length) {
    shortestArrayLength = x.length;
  } else if (x.length > y.length) {
    shortestArrayLength = y.length;
    console.error(
      "x has more items in it, the last " +
        (x.length - shortestArrayLength) +
        " item(s) will be ignored"
    );
  } else {
    shortestArrayLength = x.length;
    console.error(
      "y has more items in it, the last " +
        (y.length - shortestArrayLength) +
        " item(s) will be ignored"
    );
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for (var i = 0; i < shortestArrayLength; i++) {
    xy.push(x[i] * y[i]);
    x2.push(x[i] * x[i]);
    y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for (var i = 0; i < shortestArrayLength; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += xy[i];
    sum_x2 += x2[i];
    sum_y2 += y2[i];
  }

  var step1 = shortestArrayLength * sum_xy - sum_x * sum_y;
  var step2 = shortestArrayLength * sum_x2 - sum_x * sum_x;
  var step3 = shortestArrayLength * sum_y2 - sum_y * sum_y;
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}

const getElementsFrequency = (array) => {
  let frenquencies = {};
  for (let i = 0; i < array.length; i++) {
    let num = array[i];
    frenquencies[num] = frenquencies[num] ? frenquencies[num] + 1 : 1;
  }
  return frenquencies;
};

const getHistogram = (array, binThresholds) => {
  const binGen = d3.bin().thresholds(binThresholds);
  const bins = binGen(array);

  histogram = {};
  bins.forEach((b, i) => {
    histogram[
      "[" +
        (i == 0 ? Math.min(...binThresholds) : b["x0"]) +
        " | " +
        (i == bins.length - 1 ? Math.max(...binThresholds) : b["x1"]) +
        "" +
        "["
    ] = b.length;
  });

  return histogram;
};

function standardDeviation(values) {
  var avg = average(values);

  var squareDiffs = values.map(function (value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return parseFloat(stdDev.toFixed(2));
}

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

function average(data) {
  var sum = data.reduce(function (sum, value) {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return parseFloat(avg.toFixed(2));
}

const median = (data) => {
  const sortedData = data.slice();
  sortedData.sort();
  const mid = Math.ceil(sortedData.length / 2);
  return sortedData.length % 2 == 0
    ? (sortedData[mid] + sortedData[mid - 1]) / 2
    : sortedData[mid - 1];
};

function mode(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

const convertCurrency = async (price, srcCurrency, dstCurrency) => {
  try {
    await setTimeout((_) => _, 20);
    srcCurrency = srcCurrency.trim().toUpperCase();
    dstCurrency = dstCurrency.trim().toUpperCase();
    const response = await axios(
      `https://api.exchangeratesapi.io/latest?base=${dstCurrency}&symbols=${srcCurrency}`
    );

    const exchangeRate = response.data.rates[srcCurrency];

    const priceUsd = price / exchangeRate;

    return parseFloat(priceUsd.toFixed(2)) != NaN
      ? parseFloat(priceUsd.toFixed(2))
      : null;
  } catch (error) {
    console.log(error);
  }
};

function largestTriangleThreeBuckets(data, threshold) {
  var floor = Math.floor,
    abs = Math.abs;

  var data_length = data.length;
  if (threshold >= data_length || threshold === 0) {
    return data; // Nothing to do
  }

  var sampled = [],
    sampled_index = 0;

  // Bucket size. Leave room for start and end data points
  var every = (data_length - 2) / (threshold - 2);

  var a = 0, // Initially a is the first point in the triangle
    max_area_point,
    max_area,
    area,
    next_a;

  sampled[sampled_index++] = data[a]; // Always add the first point

  for (var i = 0; i < threshold - 2; i++) {
    // Calculate point average for next bucket (containing c)
    var avg_x = 0,
      avg_y = 0,
      avg_range_start = floor((i + 1) * every) + 1,
      avg_range_end = floor((i + 2) * every) + 1;
    avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;

    var avg_range_length = avg_range_end - avg_range_start;

    for (; avg_range_start < avg_range_end; avg_range_start++) {
      avg_x += data[avg_range_start][0] * 1; // * 1 enforces Number (value may be Date)
      avg_y += data[avg_range_start][1] * 1;
    }
    avg_x /= avg_range_length;
    avg_y /= avg_range_length;

    // Get the range for this bucket
    var range_offs = floor((i + 0) * every) + 1,
      range_to = floor((i + 1) * every) + 1;

    // Point a
    var point_a_x = data[a][0] * 1, // enforce Number (value may be Date)
      point_a_y = data[a][1] * 1;

    max_area = area = -1;

    for (; range_offs < range_to; range_offs++) {
      // Calculate triangle area over three buckets
      area =
        abs(
          (point_a_x - avg_x) * (data[range_offs][1] - point_a_y) -
            (point_a_x - data[range_offs][0]) * (avg_y - point_a_y)
        ) * 0.5;
      if (area > max_area) {
        max_area = area;
        max_area_point = data[range_offs];
        next_a = range_offs; // Next a is this b
      }
    }

    sampled[sampled_index++] = max_area_point; // Pick this point from the bucket
    a = next_a; // This a is the next a (chosen b)
  }

  sampled[sampled_index++] = data[data_length - 1]; // Always add last

  return sampled;
}

function linearRegression(x, y) {
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += x[i] * y[i];
    sum_xx += x[i] * x[i];
    sum_yy += y[i] * y[i];
  }

  lr["slope"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  lr["intercept"] = (sum_y - lr.slope * sum_x) / n;
  lr["r2"] = Math.pow(
    (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
    2
  );

  return lr;
}

function sortIndex(toSort) {
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function (left, right) {
    return left[0] < right[0] ? -1 : 1;
  });
  toSort.sortIndices = [];
  for (var j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort.sortIndices;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  getElementsFrequency,
  getPearsonCorrelation,
  getHistogram,
  sum,
  average,
  median,
  mode,
  standardDeviation,
  convertCurrency,
  largestTriangleThreeBuckets,
  linearRegression,
  sortIndex,
  getRandomInt,
};
