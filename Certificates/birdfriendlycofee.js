const puppeteer = require("puppeteer");

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

      var CompanyArray = [];
      var certificate = {
        name: "Bird Friendly Coffee",
        link: "https://nationalzoo.si.edu/migratory-birds/certified-coffee-importers",
        logo: "https://nationalzoo.si.edu/migratory-birds/about-bird-friendly-coffee",
        desc: "Our logo means Bird Friendly organic, shade-grown coffee supports bird conservation, a healthy environment and the livelihood of small-scale farm owners.",
        companies:[],
      };
      CompanyArray.push(certificate);

      var companyList = document.querySelectorAll('.views-field.views-field-title');
      for (var i = 0; i < companyList.length; i++) {
        certificate.companies.push( {
          companyName: companyList[i].innerText.trim(),
        });
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


module.exports = birdfriendly;