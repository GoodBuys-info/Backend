/* resolves promise and returns results if all the websites are scraped successfully otherwise returns */

const veganScraper = require("./vegan");
const betterCottonScraper = require("./betterCotton");
const birdFriendlyScraper = require("./birdfriendlycofee");
const blueAngelScraper = require("./blueAngel");
const cornucopiaScraper = require("./cornucopiaScore");
const audubonScraper = require("./audubon");
const ecolabelScraper = require("./ecolabel");
//const usdaCertificateScraper = require("./Certificates/usda");

var answer = (function allScraper() {
  var scrapers = [];
  scrapers.push(
    veganScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );
  scrapers.push(
    ecolabelScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  scrapers.push(
    betterCottonScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  scrapers.push(
    birdFriendlyScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  scrapers.push(
    blueAngelScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  scrapers.push(
    cornucopiaScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  scrapers.push(
    audubonScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  // scrapers.push(
  //   usdaCertificateScraper
  //     .then((companies) => {
  //       return companies;
  //     })
  //     .catch((err) => {
  //       return err;
  //     })
  // );

  return Promise.all(scrapers);
})();

module.exports = answer;
