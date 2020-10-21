const drawRatingsBreakdown = (ratingsBreakdown) => {
  const canvas = $("#ratings-breakdown-canvas").get(0);

  const resto = parseInt($("#boardgame-ratings").css("height")) - canvas.height;
  canvas.height =
    (parseInt($("#boardgame-tooltip").css("height")) - resto) * 1.58;

  const ctx = canvas.getContext("2d");

  const ratingsBreakdownChart = new Chart(ctx, {
    options: {
      responsive: false,
      maintainAspectRatio: false,
    },
    type: "bar",
    data: {
      labels: Object.keys(ratingsBreakdown),
      datasets: [
        {
          // label: '# of Votes',
          data: Object.values(ratingsBreakdown),
          backgroundColor: [
            "rgba(67, 170, 139, 0.2)",
            "rgba(144, 190, 109, 0.2)",
            "rgba(144, 190, 109, 0.2)",
            "rgba(249, 199, 79, 0.2)",
            "rgba(249, 199, 79, 0.2)",
            "rgba(248, 150, 30, 0.2)",
            "rgba(248, 150, 30, 0.2)",
            "rgba(248, 150, 30, 0.2)",
            "rgba(248, 150, 30, 0.2)",
            "rgba(249, 65, 68, 0.2)",
          ].reverse(),
          borderColor: [
            "rgba(67, 170, 139, 1)",
            "rgba(144, 190, 109, 1)",
            "rgba(144, 190, 109, 1)",
            "rgba(249, 199, 79, 1)",
            "rgba(249, 199, 79, 1)",
            "rgba(248, 150, 30, 1)",
            "rgba(248, 150, 30, 1)",
            "rgba(248, 150, 30, 1)",
            "rgba(248, 150, 30, 1)",
            "rgba(249, 65, 68, 1)",
          ].reverse(),
          borderWidth: 1,
        },
      ],
    },
    options: {
      tooltips: {
        titleFontSize: 14,
        bodyFontSize: 13,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              drawTicks: false,
              drawBorder: false,
              drawOnChartArea: true,
              display: true,
            },
            ticks: {
              fontSize: 11,
              maxTicksLimit: 4,
              beginAtZero: true,
              callback: function (tick) {
                return formatRatingsThousands(tick) + " ";
              },
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontSize: 11,
              minRotation: 0,
              maxRotation: 0,
            },

            gridLines: {
              drawOnChartArea: false,
              display: false,
            },
          },
        ],
      },
    },
  });

  return ratingsBreakdownChart;
};

const createRatingsBreakdownChartIfAvailable = (ratingsBreakdown) => {
  let chart = null;

  if (ratingsBreakdown) {
    d3.select("#ratings-breakdown-canvas")
      .transition()
      .duration(200)
      .style("opacity", 1);
    chart = drawRatingsBreakdown(ratingsBreakdown);
    $("#ratings-breakdown-not-available").css("opacity", 0);
    $("#ratings-breakdown-not-available").css("pointer-events", "none");
  } else {
    $("#ratings-breakdown-canvas").attr(
      "height",
      RATINGS_BREAKDOWN_CANVAS_HEIGHT * (checkIfMobile() ? 0.35 : 0.96)
    );

    d3.select("#ratings-breakdown-canvas")
      .transition()
      .duration(200)
      .style("opacity", 0);

    $("#ratings-breakdown-not-available").css("pointer-events", "auto");
    $("#ratings-breakdown-not-available").css("opacity", 1);
  }

  return chart;
};
