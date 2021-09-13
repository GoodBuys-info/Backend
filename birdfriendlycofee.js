const puppeteer = require("puppeteer");

const certificate = {
  name: "Bird Friendly Coffee",
  link: "https://nationalzoo.si.edu/migratory-birds/certified-coffee-importers",
  logo: "https://nationalzoo.si.edu/migratory-birds/about-bird-friendly-coffee",
  desc: "Our logo means Bird Friendly organic, shade-grown coffee supports bird conservation, a healthy environment and the livelihood of small-scale farm owners.",
};


const birdfriendly = new Promise(async (resolve, reject) => {
  try {
    // open the headless browsers
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://nationalzoo.si.edu/migratory-birds/certified-coffee-importers`);
    let companies = [];
    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.views-field.views-field-title');
      var CompanyArray = [];
      for (var i = 0; i < companyList.length; i++) {
        CompanyArray[i] = {
          companyName: companyList[i].innerText.trim(),
        };
      }
      return CompanyArray;
    });
    companies = companies.concat(company);
    //console.dir(company);
    await browser.close();
    return resolve(companies);

    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

birdfriendly
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));

module.exports = birdfriendly;