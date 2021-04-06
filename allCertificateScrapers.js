/* resolves promise and returns results if all the websites are scraped successfully otherwise returns */
const veganCertificateScraper = require("./Certificates/vegan");
const ecolabelCertificateScarper = require("./Certificates/ecolabelCertificate");
const usdaCertificateScraper = require("./Certificates/usda");

var answer = (function allScraper() {
  var scrapers = [];
  scrapers.push(
    veganCertificateScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );
  scrapers.push(
    ecolabelCertificateScarper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  scrapers.push(
    usdaCertificateScraper
      .then((companies) => {
        return companies;
      })
      .catch((err) => {
        return err;
      })
  );

  return Promise.all(scrapers);
})();

module.exports = answer;
