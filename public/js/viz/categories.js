// Encapsulate the word cloud functionality
function createWordCloud(itemCategories) {
  // Change D3 Version
  setD3Version(3);

  const svgId = "#boardgame-categories-svg";

  // Remove SVG Contents
  d3.select(svgId).selectAll("*").remove();

  //Construct the word cloud's SVG element
  const svg = d3
    .select(svgId)
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr(
      "transform",
      `translate(${parseInt($(svgId).css("width")) / 2},${
        parseInt($(svgId).css("height")) / 2
      })`
    );

  // Add Random Size
  let words = [];
  itemCategories.forEach((e) => {

    const size = 20 +
    Math.random() *
      getPyth(
        parseInt($(svgId).css("width")),
        parseInt($(svgId).css("height"))
      ) *
      0.03

    e["size"] = checkIfMobile() ? size / 1.5 : size
      ;
    e["text"] = e.value;
    words.push(e);
  });

  //Draw the word cloud
  function draw(words) {
    var cloud = svg.selectAll("g text").data(words);

    //Entering words
    cloud
      .enter()
      .append("text")
      .style("font-family", "Impact")
      .style("fill", (d) => CATEGORY_COLOR_MAP[d.type])
      .attr("text-anchor", "middle")
      .attr("font-size", 1)
      .text((d) => d.value);

    //Entering and existing words
    cloud
      .transition()
      .duration(600)
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .style("fill-opacity", 1);

    //Exiting words
    cloud
      .exit()
      .transition()
      .duration(200)
      .style("fill-opacity", 1e-6)
      .attr("font-size", 1)
      .remove();
  }

  d3.layout
    .cloud()
    .size([parseInt($(svgId).css("width")), parseInt($(svgId).css("height"))])
    .words(words)
    .padding(5)
    .rotate(function () {
      return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", draw)
    .start();
  setD3Version(5);
}

const createCategoryBtnELs = () => {
  $(".btnCategory").on("click", function (e) {
    const category = $(this).data()["category"];

    $(".btnCategory").css("background-color", "#eee");
    $(this).css("background-color", CATEGORY_COLOR_MAP[category]);

    d3.selectAll("#boardgame-categories-svg text").style("fill", (d) =>
      d.type == category ? CATEGORY_COLOR_MAP[category] : "#eee"
    );
  });
  $("#boardgame-categories-svg").on("click", function (e) {
    if (e.target == this) {
      d3.selectAll("#boardgame-categories-svg text").style(
        "fill",
        (d) => CATEGORY_COLOR_MAP[d.type]
      );
      $(".btnCategory").each(function (_, e) {
        $(e).css(
          "background-color",
          CATEGORY_COLOR_MAP[$(e).data()["category"]]
        );
      });
    }
  });
};
