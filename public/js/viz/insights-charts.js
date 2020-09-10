const drawInsightsBarChart = (canvasId, stat, hist, title, xLabel, options) => {
  // Default Colors
  const hexBarColor = "#6d6875";
  const hexHighlightColor = "#e5989b";

  // Fix Canvas Resolution
  const dpi = window.devicePixelRatio;

  const canvas = $(`#${canvasId}`).get(0);
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  const style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);

  const style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);

  canvas.setAttribute("height", style_height * dpi);
  canvas.setAttribute("width", style_width * dpi);

  let labels = [];
  if ("labelsInThousands" in options) {
    labels = Object.keys(hist)
      .map((e) => transformLabelInThousands(e))
      .map((e) => e.replace("|", "-"));
  } else {
    labels = Object.keys(hist).map((e) => e.replace("|", "-"));
  }

  const barColor =
    "barColor" in options ? hexToRgb(options.barColor) : hexToRgb(hexBarColor);
  const highlightColor =
    "highlightColor" in options
      ? hexToRgb(options.highlightColor)
      : hexToRgb(hexHighlightColor);
  const statHistIndex = getStatHistIndex(stat, hist);

  const borderColors = labels.map((_, i) =>
    i != statHistIndex
      ? `rgb(${barColor.r},${barColor.g},${barColor.b}, 1)`
      : `rgb(${highlightColor.r},${highlightColor.g},${highlightColor.b}, 1)`
  );
  const backgroundColors = labels.map((_, i) =>
    i != statHistIndex
      ? `rgb(${barColor.r},${barColor.g},${barColor.b}, 0.2)`
      : `rgb(${highlightColor.r},${highlightColor.g},${highlightColor.b}, 0.2)`
  );

  const barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: Object.values(hist),
          borderColor: borderColors,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: { display: false },
      tooltips: {
        backgroundColor: "#191919",
        displayColors: false,
        callbacks: {
          title: function (tooltipItem) {
            // return `Number of collections on the range ${tooltipItem[0].label}:`;
            return `Number of Collections:`;
          },
          label: function (tooltipItem, data) {
            return statHistIndex == tooltipItem.index
              ? `${tooltipItem.value} — Your collection falls on this range.`
              : tooltipItem.value;
          },
          labelTextColor: function (tooltipItem) {
            return statHistIndex == tooltipItem.index
              ? `rgb(${highlightColor.r},${highlightColor.g},${highlightColor.b}, 1)`
              : `white`;
          },
        },
        mode: "single",
        intersect: true,
        titleFontSize: 18,
        bodyFontSize: 16,
      },
      title: {
        display: true,
        text: title,
        fontSize: 18,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              drawBorder: false,
              display: false,
            },
            ticks: {
              fontSize: 14,
              minRotation: 90,
            },
            scaleLabel: {
              display: true,
              labelString: xLabel,
              fontSize: 16,
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Number of Collections",
              fontSize: 16,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 14,
            },
          },
        ],
      },
    },
  });
  $("#" + canvasId + "-legend").remove();
  return barChart;
};

const drawInsightsCorrChart = (
  canvasId,
  userTrend,
  communityTrend,
  collectionItems,
  xField,
  yField,
  title,
  options
) => {
  // Default Colors
  const hexCommunityColor = "#6d6875";
  const hexUserColor = "#e5989b";

  // Fix Canvas Resolution
  const dpi = window.devicePixelRatio;
  const canvas = $(`#${canvasId}`).get(0);
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  const style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  const style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);
  canvas.setAttribute("height", style_height * dpi);
  canvas.setAttribute("width", style_width * dpi);

  const userColor =
    "userColor" in options
      ? hexToRgb(options.userColor)
      : hexToRgb(hexUserColor);
  const communityColor =
    "communityColor" in options
      ? hexToRgb(options.communityColor)
      : hexToRgb(hexCommunityColor);

  const yConcatArray = communityTrend
    ? userTrend.map((e) => e.y).concat(communityTrend.map((e) => e.y))
    : userTrend.map((e) => e.y);

  const chartConfig = {
    data: {
      datasets: [
        {
          type: "scatter",
          data: collectionItems.map((e) => ({
            x: e[xField],
            y: e[yField],
            label: e.name,
          })),
          label: "Your Boardgames",
          borderColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.8)`,
          backgroundColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.4)`,
          pointRadius: 6,
          pointHoverRadius: 12,
          pointStyle: "circle",
        },
        {
          type: "scatter",
          fill: false,
          data: userTrend,
          showLine: true,
          label: "Your Trend Line",
          borderColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.6)`,
          pointBackgroundColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.0)`,
          pointBorderColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.6)`,
          // pointHoverBackgroundColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.2)`,
          // pointHoverBorderColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.6)`,
          pointRadius: 0,
          // pointHoverRadius: 12,
          borderWidth: 6,
          pointBorderWidth: 2,
          pointStyle: "line",
        },
      ],
    },
    options: {
      legend: {
        labels: {
          usePointStyle: true,
          fontSize: 14,
        },
      },
      tooltips: {
        backgroundColor: "#191919",
        displayColors: false,
        callbacks: {
          title: function (tooltipItem, data) {
            if (tooltipItem[0].datasetIndex == 0)
              return data.datasets[0].data[tooltipItem[0].index].label;
            if (tooltipItem[0].datasetIndex == 1) return `Your Trend Line`;
            if (tooltipItem[0].datasetIndex == 2) return `Community Trend Line`;
          },
          label: function (tooltipItem, data) {
            if (tooltipItem.datasetIndex == 0) {
              return [
                `${FIELD_LABEL_MAP[xField]}: ${tooltipItem.xLabel}`,
                `${FIELD_LABEL_MAP[yField]}: ${tooltipItem.yLabel}`,
              ];
            }
            if (tooltipItem.datasetIndex == 1) {
              return [
                `${FIELD_LABEL_MAP[xField]}: ${tooltipItem.xLabel.toFixed(2)}`,
                `${FIELD_LABEL_MAP[yField]}: ${tooltipItem.yLabel.toFixed(2)}`,
              ];
            }
            if (tooltipItem.datasetIndex == 2) {
              return [
                `${FIELD_LABEL_MAP[xField]}: ${tooltipItem.xLabel.toFixed(2)}`,
                `${FIELD_LABEL_MAP[yField]}: ${tooltipItem.yLabel.toFixed(2)}`,
              ];
            }
          },
        },
        mode: "single",
        intersect: true,
        titleFontSize: 16,
        bodyFontSize: 16,
      },
      title: {
        display: true,
        text: title,
        fontSize: 18,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              drawBorder: false,
              display: false,
            },
            ticks: {
              fontSize: 14,
              min:
                "xMin" in options
                  ? options.xMin
                  : Math.round(Math.min(...userTrend.map((e) => e.x))),
              max:
                "xMax" in options
                  ? options.xMax
                  : Math.round(Math.max(...userTrend.map((e) => e.x))),
            },
            scaleLabel: {
              display: true,
              labelString: FIELD_LABEL_MAP[xField],
              fontSize: 16,
            },
            type: "linear",
            position: "bottom",
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: FIELD_LABEL_MAP[yField],
              fontSize: 16,
            },
            ticks: {
              min:
                "yMin" in options
                  ? options.yMin
                  : Math.floor(Math.min(...yConcatArray)),
              max:
                "yMax" in options
                  ? options.yMax
                  : Math.ceil(Math.max(...yConcatArray)),
            },
          },
        ],
      },
    },
  };

  if (communityTrend) {
    chartConfig.data.datasets.push({
      type: "scatter",
      fill: false,
      data: communityTrend,
      showLine: true,
      label: "Community Trend Line",
      borderColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 0.6)`,
      pointBackgroundColor: `rgb(0,0,0,0)`,
      pointBorderColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 0.6)`,
      pointHoverBackgroundColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 0.2)`,
      pointHoverBorderColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 0.6)`,
      pointRadius: 0,
      pointHoverRadius: 12,
      borderWidth: 6,
      pointBorderWidth: 2,
      pointStyle: "line",
    });
    $("#" + canvasId + "-legend").remove();
  }

  const corrChart = new Chart(ctx, chartConfig);

  if (communityTrend == undefined) {
    chartConfig.options.legendCallback = function (chart) {
      return `<i class="fas fa-exclamation-circle"></i>
      <span>  Community Trend Line not available.</span>`;
    };
    const legendContainer = document.getElementById(canvasId + "-legend");
    legendContainer.innerHTML = corrChart.generateLegend();
  }

  return corrChart;
};

const drawInsightsSpiderChart = (
  canvasId,
  userHist,
  communityHist,
  options
) => {
  // Default Colors
  const hexCommunityColor = "#6d6875";
  const hexUserColor = "#e5989b";

  // Fix Canvas Resolution
  const dpi = window.devicePixelRatio;
  const canvas = $(`#${canvasId}`).get(0);
  canvas.height = 400;
  canvas.width = 400;
  const ctx = canvas.getContext("2d");
  const style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  const style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);
  canvas.setAttribute("height", style_height * dpi);
  canvas.setAttribute("width", style_width * dpi);

  // Get Colors
  const userColor =
    "userColor" in options
      ? hexToRgb(options.userColor)
      : hexToRgb(hexUserColor);
  const communityColor =
    "communityColor" in options
      ? hexToRgb(options.communityColor)
      : hexToRgb(hexCommunityColor);

  // Replace Labels
  userHist =
    "replaceLabels" in options
      ? replaceKeys(userHist, options.replaceLabels)
      : userHist;
  communityHist =
    "replaceLabels" in options
      ? replaceKeys(communityHist, options.replaceLabels)
      : communityHist;

  // Get Top Entries
  const numEntries = "numEntries" in options ? options.numEntries : undefined;
  let labels = [];

  if ("topEntries" in options && options.topEntries == "community") {
    communityHist = numEntries
      ? getTopNKeys(communityHist, numEntries)
      : communityHist;
    userHist = numEntries
      ? Object.fromEntries(
          Object.entries(userHist).filter(([k, _]) => k in communityHist)
        )
      : userHist;
    labels = Object.keys(communityHist);
  } else {
    userHist = numEntries ? getTopNKeys(userHist, numEntries) : userHist;
    communityHist = numEntries
      ? Object.fromEntries(
          Object.entries(communityHist).filter(([k, _]) => k in userHist)
        )
      : communityHist;

    labels = Object.keys(userHist);
  }

  const spiderChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels.map((l) => longStrToArray(l)),
      datasets: [
        {
          data: labels.map((l) => (userHist[l] ? userHist[l] : 0)),
          backgroundColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.2)`,
          borderColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 1)`,
          borderWidth: 1,
          pointBackgroundColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 0.4)`,
          pointBorderColor: `rgb(${userColor.r},${userColor.g},${userColor.b}, 1)`,
          pointRadius: 2,
          pointHoverRadius: 8,
          borderWidth: 2,
          label: "You",
        },
        {
          data: labels.map((l) => (communityHist[l] ? communityHist[l] : 0)),
          backgroundColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 0.2)`,
          borderColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 1)`,
          borderWidth: 1,
          pointBackgroundColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 0.4)`,
          pointBorderColor: `rgb(${communityColor.r},${communityColor.g},${communityColor.b}, 1)`,
          pointRadius: 2,
          pointHoverRadius: 8,
          borderWidth: 2,
          label: "Community",
        },
      ],
    },
    options: {
      title: {
        display: "title" in options ? true : false,
        text: "title" in options ? options.title : "",
        fontSize: 18,
      },
      scale: {
        pointLabels: {
          fontSize: 12,
        },
        ticks: {
          min: 0,
        },
      },
      tooltips: {
        //   backgroundColor: "#191919",
        //   displayColors: false,
        callbacks: {
          title: function (tooltipItem, data) {
            const dataIndex = tooltipItem[0].index;
            return `${processLabel(data.labels[dataIndex])}${
              "tooltipSuffix" in options ? " " + options.tooltipSuffix : ""
            }`;
          },
        },
        mode: "index",
        intersect: true,
        titleFontSize: 16,
        bodyFontSize: 14,
      },
    },
  });

  return spiderChart;
};

const getStatHistIndex = (stat, hist) => {
  let index = 0;

  for (const key of Object.keys(hist)) {
    const rangeMin = parseFloat(key.split("|")[0].replace("[", ""));
    const rangeMax = parseFloat(key.split("|")[1].replace("[", ""));

    if (stat >= rangeMin && stat < rangeMax) return index;
    index++;
  }

  return index;
};

const transformLabelInThousands = (label) => {
  const rangeMin = parseFloat(label.split("|")[0].replace("[", ""));
  const rangeMax = parseFloat(label.split("|")[1].replace("[", ""));
  return `[${
    rangeMin == 0 ? 0 : (rangeMin >= 1000 ? Math.round(rangeMin / 1000) + "k" : rangeMin )
  }, ${rangeMax >= 1000 ? Math.round(rangeMax / 1000) + "k" : rangeMax}[`;
};
