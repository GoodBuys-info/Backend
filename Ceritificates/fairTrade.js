const puppeteer = require("puppeteer");

const certificate = {
  name: "FairTrade",
  link: "https://www.fairtradeamerica.org/",
  logo: "https://www.fairtradeamerica.org/about/",
  desc:
    "Fairtrade International sets Standards in accordance with the ISEAL Code of Good Practice on Standard Setting.ISEAL check that a certification scheme is credible and doing what it says it does.",
};


const fairTrade = new Promise(async (resolve, reject) => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.fairtradeamerica.org/shop-fairtrade/fairtrade-products/`);
    let companies = [];

    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.brand-grid-item.js-link-event a');
      var CompanyArray = [];
      for (var i = 0; i < companyList.length; i++) {
        CompanyArray[i] = {
          companyName: companyList[i].innerText.trim(),
        };
      }
      return CompanyArray;
    });
    companies = companies.concat(company);
    await browser.close();
    return resolve(companies);

  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

fairTrade
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


module.exports = fairTrade;