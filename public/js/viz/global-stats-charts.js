const drawGlobalStatsHistChart = (
  canvasId,
  histogram,
  xLabel,
  yLabel,
  options
) => {
  // Create Canvas
  const canvas = $(`#${canvasId}`).get(0);
  canvas.style.width = "100%";
  canvas.style.height =
    "canvasHeight" in options
      ? options.canvasHeight
      : checkIfMobile()
      ? "400px"
      : "500px";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Get Options
  options = options ? options : {};
  const color =
    "color" in options ? hexToRgb(options.color) : { r: 62, g: 149, b: 205 };
  const xMin =
    "xMin" in options
      ? options.xMin
      : Math.floor(Math.min(...Object.values(histogram)));
  const xMax =
    "xMax" in options
      ? options.xMax
      : Math.ceil(Math.max(...Object.values(histogram)));

  // Filter Histogram
  let hist = Object.fromEntries(
    Object.entries(histogram).filter(
      ([k, _]) => parseInt(k) >= xMin && parseInt(k) <= xMax
    )
  );

  const ctx = canvas.getContext("2d");

  const histChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(hist),
      datasets: [
        {
          data: Object.values(hist),
          borderColor: `rgb(${color.r},${color.g},${color.b}, 1)`,
          backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.6)`,
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
        labels: {
          fontSize: 14,
        },
      },
      title: {
        display: false,
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
              maxRotation: 0,
              min: xMin,
              max: xMax,
              maxTicksLimit: 6,
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
            ticks: {
              beginAtZero: true,
              fontSize: 14,
            },
            scaleLabel: {
              display: true,
              labelString: yLabel,
              fontSize: 16,
            },
          },
        ],
      },
    },
  });
  return histChart;
};

const drawGlobalStatsCorrChart = (
  canvasId,
  sample,
  trend,
  xField,
  yField,
  options
) => {
  options = options ? options : {};
  const canvas = $(`#${canvasId}`).get(0);

  const color =
    "color" in options ? hexToRgb(options.color) : { r: 62, g: 149, b: 205 };

  canvas.style.width = "100%";
  canvas.style.height =
    "canvasHeight" in options
      ? options.canvasHeight
      : (checkIfMobile()
      ? "400px"
      : "500px");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext("2d");

  const globalStatsChart = new Chart(ctx, {
    data: {
      datasets: [
        {
          type: "scatter",
          fill: false,
          data: trend,
          showLine: true,
          label: "Trend Line",
          borderColor: `rgb(${color.r},${color.g},${color.b}, 0.6)`,
          backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0)`,
          pointRadius: 0,
          pointStyle: "line",
        },
        {
          type: "scatter",
          fill: "+1",
          data: trend.map((e) => ({ x: e.x, y: e.errorLower })),
          showLine: true,
          label: "95% Confidence Interval",
          backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.4)`,
          borderColor: `rgb(${color.r},${color.g},${color.b}, 0)`,
          pointRadius: 0,
          pointStyle: "rect",
        },
        {
          type: "scatter",
          fill: false,
          data: trend.map((e) => ({ x: e.x, y: e.errorUpper })),
          showLine: true,
          label: "None",
          borderColor: `rgb(${color.r},${color.g},${color.b}, 0)`,
          pointRadius: 0,
          pointStyle: "rect",
        },
        {
          type: "scatter",
          data: sample.map((e) => ({
            x: e[xField],
            y: e[yField],
            label: e.name,
          })),
          label: "Boardgames",
          borderColor: `rgb(${color.r},${color.g},${color.b}, 0.8)`,
          backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.4)`,
          pointRadius: 4,
          pointHoverRadius: 10,
          pointStyle: "circle",
        },
      ],
    },
    options: {
      legend: {
        labels: {
          fontSize: 14,
          usePointStyle: true,
          filter: function (label) {
            if (label.text === "None") {
              return false;
            } else {
              return true;
            }
          },
        },
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          title: function () {},
          label: function (tooltipItem, data) {
            if (tooltipItem.datasetIndex == 0) {
              return [
                `${FIELD_LABEL_MAP[xField]} : ${tooltipItem.xLabel.toFixed(2)}`,
                `${FIELD_LABEL_MAP[yField]} : ${tooltipItem.yLabel.toFixed(2)}`,
              ];
            } else {
              return [
                `Name: ${data.datasets[3].data[tooltipItem.index].label}`,
                `${FIELD_LABEL_MAP[xField]}: ${tooltipItem.xLabel}`,
                `${FIELD_LABEL_MAP[yField]}: ${tooltipItem.yLabel}`,
              ];
            }
          },
        },
        mode: "single",
        intersect: true,
        titleFontSize: 16,
        bodyFontSize: 16,
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: FIELD_LABEL_MAP[xField],
              fontSize: 16,
            },
            type: "linear",
            position: "bottom",
            ticks: {
              maxTicksLimit: 6,
              fontSize: 14,
              min:
                "xMin" in options
                  ? options.xMin
                  : Math.floor(Math.min(...trend.map((e) => e.x))),
              max:
                "xMax" in options
                  ? options.xMax
                  : Math.ceil(Math.max(...trend.map((e) => e.x))),
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: FIELD_LABEL_MAP[yField],
              fontSize: 16,
            },
            ticks: {
              fontSize: 14,
              min:
                "yMin" in options
                  ? options.yMin
                  : Math.floor(Math.min(...trend.map((e) => e.y))),
              max:
                "yMax" in options
                  ? options.yMax
                  : Math.ceil(Math.max(...trend.map((e) => e.y))),
            },
          },
        ],
      },
    },
  });

  return globalStatsChart;
};

const drawGlobalStatsTrendChart = (
  canvasId,
  statsSeries,
  xLabel,
  yLabel,
  options
) => {
  // Get Stats
  const stats = Object.keys(statsSeries);

  // Get Options
  options = options ? options : {};

  const xMin =
    "xMin" in options
      ? options.xMin
      : Math.floor(Math.min(...Object.values(statsSeries[stats[0]])));
  const xMax =
    "xMax" in options
      ? options.xMax
      : Math.ceil(Math.max(...Object.values(statsSeries[stats[0]])));
  const legendFlag = "legendFlag" in options ? options.legendFlag : true;

  // Create Canvas
  const canvas = $(`#${canvasId}`).get(0);
  canvas.style.width = "100%";
  canvas.style.height =
    "canvasHeight" in options
      ? options.canvasHeight
      : checkIfMobile()
      ? "400px"
      : "500px";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Create Years Labels
  let yearLabels = [];
  for (var i = xMin; i <= xMax; i++) {
    yearLabels.push(String(i));
  }

  // Filter Datasets
  let filtStatsSeries = {};
  stats.forEach((s) => {
    filtStatsSeries[s] = {};
    const yearsInSeries = Object.keys(statsSeries[s]);

    yearLabels.forEach((y) => {
      if (
        parseInt(y) >= xMin &&
        parseInt(y) <= xMax &&
        yearsInSeries.includes(y)
      ) {
        filtStatsSeries[s][y] = statsSeries[s][y];
      } else if (
        parseInt(y) >= xMin &&
        parseInt(y) <= xMax &&
        !yearsInSeries.includes(y)
      )
        filtStatsSeries[s][y] = 0;
    });
  });

  // stats.forEach((s) => {
  //   filtStatsSeries[s] = Object.fromEntries(
  //     Object.entries(statsSeries[s]).filter(
  //       ([k, _]) => parseInt(k) >= xMin && parseInt(k) <= xMax
  //     )
  //   );
  // });

  const ctx = canvas.getContext("2d");

  const trendChart = new Chart(ctx, {
    data: {
      labels: yearLabels,
      datasets: [],
    },
    options: {
      legend: {
        display: legendFlag,
        labels: {
          fontSize: 14,
        },
      },
      tooltips: {
        displayColors: false,
        mode: "x",
        titleFontSize: 16,
        bodyFontSize: 16,
      },
      title: {
        display: false,
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
              maxRotation: 0,
              min: xMin,
              max: xMax,
              maxTicksLimit: 6,
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
            ticks: {
              beginAtZero: true,
              fontSize: 14,
            },
            scaleLabel: {
              display: true,
              labelString: yLabel,
              fontSize: 16,
            },
          },
        ],
      },
    },
  });

  stats.forEach((s) => {
    const color = hexToRgb(STAT_COLOR_MAP[s]);

    const datasetConfig = {
      type: "line",
      data: Object.values(filtStatsSeries[s]),
      borderColor: `rgb(${color.r},${color.g},${color.b}, 1)`,
      backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.2)`,
      borderWidth: 2,
      pointBackgroundColor: `rgb(0,0,0,0)`,
      pointBorderColor: `rgb(0,0,0,0)`,
      pointRadius: 1,
      label: FIELD_LABEL_MAP[s],

      // type: "scatter",
      // data: Object.values(filtStatsSeries[s]),
      // showLine: true,
      // borderColor: `rgb(${color.r},${color.g},${color.b}, 1)`,
      // borderWidth: 2,
      // fill: "-1",
      // pointBackgroundColor: `rgb(0,0,0,0)`,
      // pointBorderColor: `rgb(0,0,0,0)`,
      // pointRadius: 8,
      // pointBorderWidth: 1,
      // pointStyle: "line",
      // label: FIELD_LABEL_MAP[s],
    };
    trendChart.data.datasets.push(datasetConfig);
  });

  trendChart.update();
  return trendChart;
};

const drawGlobalStatsSpiderChart = (canvasId, statsSeries, options) => {
  // Get Years
  const years = Object.keys(statsSeries);

  // Get Options
  options = options ? options : {};

  // Replace Labels
  if ("replaceLabels" in options) {
    years.forEach((y) => {
      statsSeries[y] = replaceKeys(statsSeries[y], options.replaceLabels);
    });
  }

  // Get Stats
  const stats = Object.keys(statsSeries[years[0]]);

  // stats.forEach((e) => {
  //   console.log(e, statsSeries[2021][e] / statsSeries[2010][e]);
  // });

  // Create Canvas
  const canvas = $(`#${canvasId}`).get(0);
  canvas.style.width = "100%";
  canvas.style.height =
    "canvasHeight" in options
      ? options.canvasHeight
      : checkIfMobile()
      ? "400px"
      : "500px";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext("2d");

  const spiderChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: stats.map((s) => longStrToArray(s)),
      datasets: [],
    },
    options: {
      legend: {
        display: true,
        labels: {
          fontSize: 14,
        },
      },
      tooltips: {
        titleFontSize: 16,
        bodyFontSize: 16,
        callbacks: {
          title: function () {},
        },
      },
      scale: {
        pointLabels: {
          fontSize: 14,
        },
      },
      title: {
        display: false,
      },
    },
  });

  years.forEach((y, i) => {
    const color = hexToRgb(SPIDER_CHART_COLORS[i]);

    const datasetConfig = {
      data: stats.map((s) => statsSeries[y][s]),
      borderColor: `rgb(${color.r},${color.g},${color.b}, 1)`,
      backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.1)`,
      borderWidth: 2,
      pointBackgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.7)`,
      pointBorderColor: `rgb(${color.r},${color.g},${color.b}, 0.7)`,
      pointRadius: 3,
      label: y,
    };
    spiderChart.data.datasets.push(datasetConfig);
  });

  spiderChart.update();
  return spiderChart;
};

const createTextBlock = (rowId, title, p, classes) => {
  $(`#global-stats #${rowId}`).append(
    `<div id="${rowId}-text-block" class="col-12 col-md-6 text-center my-auto block text-block ${classes}"></div>`
  );

  $(`#global-stats #${rowId} .text-block`).append(
    `<h3 class="mt-3 mb-4">${title}</h3>`
  );
  $(`#global-stats #${rowId} .text-block`).append(
    `<p class="text-justify">${p}</p>`
  );
};

const createPlotBlock = (rowId, classes) => {
  $(`#global-stats #${rowId}`).append(
    `<div class="col-12 col-md-6 block chart-block ${classes}"><canvas id="${rowId}-canvas" class="mt-3 mb-2"></canvas></div>`
  );
};

const createGlobalStatsRow = (rowId, title, p) => {
  $(`#global-stats`).append(
    `<div id="${rowId}-wrapper" class="row-wrapper my-4"><div id="${rowId}" class="row chart-row mx-0 py-2"></div></div>`
  );

  if (
    $("#global-stats .row-wrapper .row").children().get().length == 0 ||
    $("#global-stats .row-wrapper .row .block")
      .slice(-1)
      .attr("class")
      .includes("text-block") ||
    checkIfMobile()
  ) {
    createTextBlock(rowId, title, p, "pl-4");
    createPlotBlock(rowId, "pr-2");
  } else {
    createPlotBlock(rowId, "pl-2");
    createTextBlock(rowId, title, p, "pr-4");
  }
};

const createModalButton = (buttonId, modalBodyId) => {
  $(`#global-stats-description`)
    .after(`<div class="row"><div class="col d-flex justify-content-center"><button
  id="${buttonId}"
  type="button"
  class="btn btn-sm btn-dark mb-3 mb-md-5"
  data-toggle="modal"
  data-target="#global-stats-method-modal"
>
  Notes on Methodology
</button></div></div>`);

  $(`body`).append(
    `<div
class="modal fade"
id="global-stats-method-modal"
tabindex="-1"
role="dialog"
>
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="global-stats-method-modal-title">Notes on Methodology</h5>
            <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="global-stats-method-modal-body" class="modal-body mr-3"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
</div>`
  );
  $(`#${modalBodyId}`).html(`<ol>
    <li class="text-justify">The numbers shown on these charts are based on the <em>BGG Dicector</em> users only, thus 
they do not reflect the entire reality of the boardgame community or even that of the BoardGameGeek community.</li>
<li class="text-justify">If a boardgame is not owned by any <em>BGG Dicector</em> user, it will not 
be accounted for in these statistics.</li>
<li class="text-justify">A sample of boardgames is presented in <em>Quality, Not Just Quantity</em> chart 
to serve as an example of the trend depicted, however the trend line presented is still computed using the 
entire boardgame database available.</li>
<li><em>BoardGameGeek</em> classifies games into genres and categories based on the most proeminet (and not all) 
traits of a game. This means that for, example 
<a class="badge-pill badge-secondary py-1" href="https://boardgamegeek.com/boardgame/84876/castles-burgundy" target="_blank">Castles&nbspof&nbspBurgundy</a> is considered a 
<em>Dice Game</em> since dice are a core component of the game, however 
<a class="badge-pill badge-secondary py-1" href="https://boardgamegeek.com/boardgame/150376/dead-winter-crossroads-game target="_blank">Dead&nbspof&nbspWinter</a> is not, since,
while it does use dice, they do not play a key role in its mechanics. This is important aspect to have in mind 
when interpreting the <em>An Assymetrical Growth</em> and <em>Boom in Cooperative Games</em> charts.
</ol>`);
};

const processYearHist = (histogram, yearMin, yearMax) => {
  // Filter Histogram
  let hist = Object.fromEntries(
    Object.entries(histogram).filter(([k, _]) => k != "null")
  );

  const keys = Object.keys(hist);

  const minYear = yearMin ? yearMin : Math.min(...keys);
  const maxYear = yearMax ? yearMax : Math.max(...keys);

  let yearArray = [];
  for (var i = minYear; i <= maxYear; i++) {
    yearArray.push(String(i));
  }

  yearArray.forEach((k) => {
    if (!keys.includes(k)) {
      hist[k] = 0;
    }
  });

  return hist;
};

const processStatUniqueDist = (boardgameStats, stats, yearMin, yearMax) => {
  processedStatsSeries = {};

  stats.forEach((s) => {
    processedStatsSeries[s] = processYearHist(
      boardgameStats[STAT_UNIQUE_MAP[s]],
      yearMin,
      yearMax
    );
  });

  return processedStatsSeries;
};

const getStatAtYear = (statDist, year) => {
  let count = 0;

  Object.keys(statDist).forEach((k) => {
    count = parseInt(k) <= year ? count + statDist[k] : count;
  });

  return count;
};

const getStatDistAtYear = (statDist, year) => {
  let statDistAtYear = {};

  Object.keys(statDist).forEach((k) => {
    statDistAtYear[k] = getStatAtYear(statDist[k], year);
  });

  return statDistAtYear;
};

// const drawPlayerCountChart = (
//     canvasId,
//     trends,
//     options
//   ) => {
//     options = options ? options : {};
//     const canvas = $(`#${canvasId}`).get(0);

//     // canvas.width = '100%'
//     // canvas.height = '200px'
//     canvas.style.width = "100%";
//     canvas.style.height =
//       "canvasHeight" in options ? options.canvasHeight : (checkIfMobile() ? "400px" : "500px");
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     const ctx = canvas.getContext("2d");

//     const globalStatsChart = new Chart(ctx, {
//       data: {
//         datasets: [
//           {
//             type: "scatter",
//             fill: false,
//             data: trends['minPlayers'],
//             showLine: true,
//             label: "Trend Line",
//             borderColor: "rgb(42, 157, 143, 0)",
//             backgroundColor: "rgb(42, 157, 143, 0)",
//             pointRadius: 6,
//           },
//           {
//             type: "scatter",
//             fill: "+1",
//             data: trends['minPlayers'].map((e) => ({ x: e.x, y: e.errorLower })),
//             showLine: true,
//             label: "95% Confidence Interval",
//             backgroundColor: "rgb(42, 157, 143, .4)",
//             borderColor: "rgb(42, 157, 143, 0)",
//             pointRadius: 0,
//           },
//           {
//             type: "scatter",
//             fill: false,
//             data: trends['minPlayers'].map((e) => ({ x: e.x, y: e.errorUpper })),
//             showLine: true,
//             label: FIELD_LABEL_MAP['minPlayers'],
//             borderColor: "rgb(42, 157, 143, 0)",
//             pointRadius: 0,
//           },

//           {
//             type: "scatter",
//             fill: false,
//             data: trends['recommendedPlayers'],
//             showLine: true,
//             label: "Trend Line",
//             borderColor: "rgb(62,149,205, 0)",
//             backgroundColor: "rgb(62,149,205, 0)",
//             pointRadius: 6,
//           },
//           {
//             type: "scatter",
//             fill: "+1",
//             data: trends['recommendedPlayers'].map((e) => ({ x: e.x, y: e.errorLower })),
//             showLine: true,
//             label: "95% Confidence Interval",
//             backgroundColor: "rgb(62,149,205, .4)",
//             borderColor: "rgb(62,149,205, 0)",
//             pointRadius: 0,
//           },
//           {
//             type: "scatter",
//             fill: false,
//             data: trends['recommendedPlayers'].map((e) => ({ x: e.x, y: e.errorUpper })),
//             showLine: true,
//             label: FIELD_LABEL_MAP['recommendedPlayers'],
//             borderColor: "rgb(62,149,205, 0)",
//             pointRadius: 0,
//           },

//           {
//             type: "scatter",
//             fill: false,
//             data: trends['maxPlayers'],
//             showLine: true,
//             label: "Trend Line",
//             borderColor: "rgb(231, 111, 81, 0)",
//             backgroundColor: "rgb(231, 111, 81, 0)",
//             pointRadius: 6,
//           },
//           {
//             type: "scatter",
//             fill: "+1",
//             data: trends['maxPlayers'].map((e) => ({ x: e.x, y: e.errorLower })),
//             showLine: true,
//             label: "95% Confidence Interval",
//             backgroundColor: "rgb(231, 111, 81, .4)",
//             borderColor: "rgb(231, 111, 81, 0)",
//             pointRadius: 0,
//           },
//           {
//             type: "scatter",
//             fill: false,
//             data: trends['maxPlayers'].map((e) => ({ x: e.x, y: e.errorUpper })),
//             showLine: true,
//             label: FIELD_LABEL_MAP['maxPlayers'],
//             borderColor: "rgb(231, 111, 81, 0)",
//             pointRadius: 0,
//           }
//         ],
//       },
//       options: {
//         //   legend: {
//         //     labels: {
//         //       filter: function (label) {
//         //         if (label.text === "None") {
//         //           return false;
//         //         } else {
//         //           return true;
//         //         }
//         //       },
//         //     },
//         //   },
//         legend: false,
//         // tooltips: {
//         //   displayColors: false,
//         //   callbacks: {
//         //     title: function () {},
//         //     label: function (tooltipItem, data) {
//         //       if (tooltipItem.datasetIndex == 0) {
//         //         return [
//         //           `Curve Fit ${
//         //             FIELD_LABEL_MAP[xField]
//         //           } : ${tooltipItem.xLabel.toFixed(2)}`,
//         //           `Curve Fit ${
//         //             FIELD_LABEL_MAP[yField]
//         //           } : ${tooltipItem.yLabel.toFixed(2)}`,
//         //         ];
//         //       } else {
//         //         return [
//         //           `Name: ${data.datasets[3].data[tooltipItem.index].label}`,
//         //           `${FIELD_LABEL_MAP[xField]}: ${tooltipItem.xLabel.toFixed(2)}`,
//         //           `${FIELD_LABEL_MAP[yField]}: ${tooltipItem.yLabel.toFixed(2)}`,
//         //         ];
//         //       }
//         //     },
//         //   },
//         //   mode: "nearest",
//         //   intersect: true,
//           // filter: function (tooltipItem, data) {

//           //     console.log()

//           //   if (tooltipItem.datasetIndex==1) {
//           //     return false;
//           //   } else {
//           //     return true;
//           //   }
//           // },
//         // },
//         //   hover: {
//         //     mode: "average",
//         //     position: 'nearest'

//         //   },
//         scales: {
//           xAxes: [
//             {
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Player Count',
//                 fontSize: 18,
//               },
//               type: "linear",
//               position: "bottom",
//               ticks: {
//                 min:
//                   "xMin" in options
//                     ? options.xMin
//                     : Math.floor(Math.min(...trend.map((e) => e.x))),
//                 max:
//                   "xMax" in options
//                     ? options.xMax
//                     : Math.ceil(Math.max(...trend.map((e) => e.x))),
//               },
//             },
//           ],
//           yAxes: [
//             {
//               scaleLabel: {
//                 display: true,
//                 labelString: 'User Rating',
//                 fontSize: 18,
//               },
//               ticks: {
//                 //   suggestedMin: Math.min(...trend.map((e) => e.y)),
//                 //   suggestedMax: Math.max(...trend.map((e) => e.y)),
//                 min:
//                   "yMin" in options
//                     ? options.yMin
//                     : Math.floor(Math.min(...trend.map((e) => e.y))),
//                 max:
//                   "yMax" in options
//                     ? options.yMax
//                     : Math.ceil(Math.max(...trend.map((e) => e.y))),
//               },
//             },
//           ],
//         },
//       },
//     });

//     return globalStatsChart;
//   };
