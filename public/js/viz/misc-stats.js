const createMiscStats = (collectionItem) => {
  
  $("#price-p .misc-stat-span")
    .html((collectionItem.medianPriceNew ? collectionItem.medianPriceNew.toFixed(0) : 'N/A') + '<small>&nbsp;USD</small>')
    .css(
      "color",
      checkMapRange(collectionItem.medianPriceNew, PRICE_MAP)
    ).css('cursor', 'default');
  $("#weight-p .misc-stat-span").text( collectionItem.averageWeight ? collectionItem.averageWeight.toFixed(1) : 'N/A').css(
    "color",
    checkMapRange(collectionItem.averageWeight, WEIGHT_MAP)
  ).css('cursor', 'default');
  $("#owners-p .misc-stat-span").text(formatRatingsThousands(collectionItem.owned)).css(
    "color",
    checkMapRange(collectionItem.owned, OWNERS_MAP)
  ).css('cursor', 'default');

};
