const puppeteer = require("puppeteer");

const climateRegistry = new Promise(async (resolve, reject) => {
  try {
    const url = "https://theclimateregistry.org/our-members/?pg=";
    // open the headless browser
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    let companies = [];
    await page.goto(url);

    var company = await page.evaluate(() => {
      let isButtonDisabled = False;
      while (!isButtonDisabled) {}

      var CompanyArray = [];
      var certificate = {
        name: "ClimateRegistry",
        link: "https://www.theclimateregistry.org/",
        logo: "https://www.theclimateregistry.org/programs-services/voluntary-reporting/climate-registered/",
        desc: "Our logo means the organization is empowered by climate registry to reduce carbon footprint.",
        companies: [],
      };
      CompanyArray.push(certificate);

      var companyList = document.querySelectorAll(".fl a");
      for (var i = 0; i < companyList.length; i++) {
        certificate.companies.push({
          companyName: companyList[i].innerText.trim(),
        });
      }
      return CompanyArray;
    });
    companies = companies.concat(company);
    return resolve(companies);
  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

module.exports = climateRegistry;
