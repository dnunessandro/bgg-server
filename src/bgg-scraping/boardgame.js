const cheerio = require("cheerio");
const chalk = require("chalk");
const puppeteer = require("puppeteer");

const getBggBoardgameStatsUrl = (id) => {
  return `https://boardgamegeek.com/boardgame/${id}`;
};

const getRatingsBreakdownTable = async (url, page, waitTime) => {
  await page.goto(url);
  await page.waitFor(10);
  await page.goto(page.url() + "/stats");
  await page.waitFor(waitTime);
  const pageText = await page.evaluate(() => document.body.innerHTML);

  const matchIndex = pageText.search(
    "A tabular representation of the data in the chart."
  );

  if (matchIndex == -1) {
    RETRIES++;
    console.log(
      chalk.bgRed("Error: ") +
        chalk.red("Failed retrieving ratings breakdown. Retry number: ") +
        chalk.yellow(RETRIES)
    );
    if (RETRIES > 5) throw Error("Too many retries.");
    return await getRatingsBreakdownTable(url, page, RETRIES * 200);
  }

  const rawStr = pageText.substring(matchIndex, matchIndex + 1000);

  const startIndex = rawStr.search("<table>");
  const endIndex = rawStr.search("</table>") + 8;

  const tableHtml = rawStr.substring(startIndex, endIndex);

  RETRIES = 0;

  return tableHtml;
};

const getRatingsBreakdownDict = (tableHtml) => {
  const ratingIndexes = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28];
  const $ = cheerio.load(tableHtml);

  const tdElements = $("tbody td");

  let ratingsBreakdown = {};
  let ratingValue = 1;

  tdElements.each(function (i) {
    if (ratingIndexes.includes(i)) {
      ratingsBreakdown[ratingValue] = parseInt($(this).text().replace(",", ""));
      ratingValue++;
    }
  });
  return ratingsBreakdown;
};

const getBoardgameRatingsBreakdown = async (id, waitTime, browser, page) => {
  RETRIES = 0;

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  const url = getBggBoardgameStatsUrl(id);

  const tableHtml = await getRatingsBreakdownTable(url, page, waitTime);
  const ratingsBreakdown = getRatingsBreakdownDict(tableHtml);

  await browser.close();

  return ratingsBreakdown;
};

const getBoardgameTop100 = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://boardgamegeek.com/browse/boardgame");
    const pageText = await page.evaluate(() => document.body.innerHTML);

    const matches = [
      ...pageText.matchAll(
        /<a href="\/boardgame\/([0-9]+)\/[a-z0-9-]+?">([a-zA-Z0-9& .!?'ñçé():;-]+?)<\/a>/g
      ),
    ];
    const topTenList = [];
    matches.forEach((d, i) => {
      d[2] = d[2].replace("&amp;", "&");
      topTenList.push({ rank: i + 1, id: d[1], name: d[2] });
    });
    await browser.close();
    return topTenList;
  } catch (error) {
    console.log("There was a problem fetching the top 100 list.");
  }
};

module.exports = { getBoardgameRatingsBreakdown, getBoardgameTop100 };
