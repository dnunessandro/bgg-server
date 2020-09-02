const drawRatingsBreakdown = (ratingsBreakdown) => {
  const canvas = $("#ratings-breakdown-canvas").get(0);

  canvas.height = $("#ratings-breakdown-wrapper").css("height");

  const ctx = canvas.getContext("2d");

  const ratingsBreakdownChart = new Chart(ctx, {
    options: {
      maintainAspectRatio: false,
    },
    type: "horizontalBar",
    data: {
      labels: Object.keys(ratingsBreakdown).reverse(),
      datasets: [
        {
          // label: '# of Votes',
          data: Object.values(ratingsBreakdown).reverse(),
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
          ],
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
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      tooltips: {
        titleFontSize: 16,
        bodyFontSize: 14,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (tick) {
                return formatRatingsThousands(tick);
              },
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              drawBorder: false,
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
    d3.select("#ratings-breakdown-canvas")
      .transition()
      .duration(200)
      .style("opacity", 0);
    $("#ratings-breakdown-not-available").css("pointer-events", "auto");
    $("#ratings-breakdown-not-available").css("opacity", 1);
  }

  return chart
};
