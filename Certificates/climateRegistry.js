const puppeteer = require("puppeteer");

const certificate = {
  name: "ClimateRegistry",
  link: "https://www.theclimateregistry.org/",
  logo: "https://www.theclimateregistry.org/programs-services/voluntary-reporting/climate-registered/",
  desc:
    "Our logo means the organization is empowered by climate registry to reduce carbon footprint.",
};


const climateRegistry = new Promise(async (resolve, reject) => {
  try {
    const url="https://www.theclimateregistry.org/our-members/list-of-members-profiles/"
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // enter url in page
    let companies = [];
    await page.goto(url);

    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.fl a');
      var CompanyArray = [];
      for (var i = 0; i < companyList.length; i++) {
        CompanyArray[i] = {
          companyName: companyList[i].innerText.trim(),
        };
      }
      return CompanyArray;
    });
    companies = companies.concat(company);
    return resolve(companies);

  }
    catch (err) {
      // Catch and display errors
      return reject(err);
    }
  });

climateRegistry
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


 module.exports = climateRegistry;