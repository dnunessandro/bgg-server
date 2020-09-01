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
    "canvasHeight" in options ? options.canvasHeight : "400px";
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
              maxTicksLimit: 10,
            },
            scaleLabel: {
              display: true,
              labelString: xLabel,
              fontSize: 18,
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
              fontSize: 18,
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
    "canvasHeight" in options ? options.canvasHeight : "400px";
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
          borderColor: `rgb(${color.r},${color.g},${color.b}, 1)`,
          pointRadius: 4,
          pointHoverRadius: 10,
          pointStyle: "circle",
        },
      ],
    },
    options: {
      legend: {
        labels: {
          labels: {
            fontSize: 14,
          },
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
        bodyFontSize: 16,
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: FIELD_LABEL_MAP[xField],
              fontSize: 18,
            },
            type: "linear",
            position: "bottom",
            ticks: {
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
              fontSize: 18,
            },
            ticks: {
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
    "canvasHeight" in options ? options.canvasHeight : "400px";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Filter Datasets
  let filtStatsSeries = {};
  stats.forEach((s) => {
    filtStatsSeries[s] = Object.fromEntries(
      Object.entries(statsSeries[s]).filter(
        ([k, _]) => parseInt(k) >= xMin && parseInt(k) <= xMax
      )
    );
  });

  // Create Years Labels
  let yearLabels = [];
  for (var i = xMin; i <= xMax; i++) {
    yearLabels.push(String(i));
  }

  const ctx = canvas.getContext("2d");

  const trendChart = new Chart(ctx, {
    type: "line",
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
        mode: "x",
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
              maxTicksLimit: 10,
            },
            scaleLabel: {
              display: true,
              labelString: xLabel,
              fontSize: 18,
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
              fontSize: 18,
            },
          },
        ],
      },
    },
  });

  stats.forEach((s) => {
    const color = hexToRgb(STAT_COLOR_MAP[s]);

    const datasetConfig = {
      data: Object.values(filtStatsSeries[s]),
      borderColor: `rgb(${color.r},${color.g},${color.b}, 1)`,
      backgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.2)`,
      borderWidth: 1,
      pointBackgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.6)`,
      pointBorderColor: `rgb(0,0,0,0)`,
      pointRadius: 0,
      borderWidth: 2,
      label: FIELD_LABEL_MAP[s],
    };
    trendChart.data.datasets.push(datasetConfig);
  });

  trendChart.update();
  return trendChart;
};

const drawGlobalStatsSpiderChart = (canvasId, statsSeries, options) => {
  // Get Years
  const years = Object.keys(statsSeries);

  // Get Stats
  const stats = Object.keys(statsSeries[years[0]]);

  // Get Options
  options = options ? options : {};

  // stats.forEach((e) => {
  //   console.log(e, statsSeries[2020][e] / statsSeries[2010][e]);
  // });

  // Create Canvas
  const canvas = $(`#${canvasId}`).get(0);
  canvas.style.width = "100%";
  canvas.style.height =
    "canvasHeight" in options ? options.canvasHeight : "400px";
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
        }
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
      borderWidth: 1,
      pointBackgroundColor: `rgb(${color.r},${color.g},${color.b}, 0.7)`,
      pointBorderColor: `rgb(${color.r},${color.g},${color.b}, 0.7)`,
      pointRadius: 2,
      borderWidth: 2,
      label: y,
    };
    spiderChart.data.datasets.push(datasetConfig);
  });

  spiderChart.update();
  return spiderChart;
};

const createTextBlock = (rowId, title, p) => {
  $(`#global-stats #${rowId}`).append(
    `<div id="${rowId}-text-block" class="col-6 text-center my-auto text-block"></div>`
  );

  $(`#global-stats #${rowId} .text-block`).append(
    `<h3 class="mb-3">${title}</h3>`
  );
  $(`#global-stats #${rowId} .text-block`).append(`<p>${p}</p>`);
};

const createPlotBlock = (rowId) => {
  $(`#global-stats #${rowId}`).append(
    `<div class="col-6 chart-block p-3 my-3"><canvas id="${rowId}-canvas"></canvas></div>`
  );
};

const createGlobalStatsRow = (rowId, title, p) => {
  $(`#global-stats`).append(
    `<div id="${rowId}-wrapper" class="row-wrapper" style="background-color: white"><div id="${rowId}" class="row chart-row my-3 px-3" style="background-color: #ffcdb233"></div></div>`
  );

  if (
    $("#global-stats .row").children().get().length == 0 ||
    $("#global-stats .row .col-6")
      .slice(-1)
      .attr("class")
      .includes("text-block")
  ) {
    createTextBlock(rowId, title, p);
    createPlotBlock(rowId);
  } else {
    createPlotBlock(rowId);
    createTextBlock(rowId, title, p);
  }
};

const createModalButton = (buttonId, modalBodyId) => {
  $(`#global-stats-btn-group`)
    .after(`<div class="row"><div class="col d-flex justify-content-center"><button
  id="${buttonId}"
  type="button"
  class="btn btn-primary"
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
        <div id="global-stats-method-modal-body" class="modal-body"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
</div>`
  );
  $(`#${modalBodyId}`)
    .html(`The numbers shown on these charts are based on the collections of TEMP!!! users only, thus 
they do not reflect the entire reality of the boardgame community - or even that of the BGG community since only a fraction of BGG 
users is also a user of TEMP!!!. A large number of more casual boardgamers who make up a significant part of the community 
are not registered on BGG and, as a result, can not be represented here.`);
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
//       "canvasHeight" in options ? options.canvasHeight : "400px";
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