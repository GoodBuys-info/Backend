const puppeteer = require("puppeteer");

const bpiWorld = new Promise(async (resolve, reject) => {
  try {
    const url="https://products.bpiworld.org/?s=1&search=&category=0&type=2"
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // enter url in page
    let companies = [];
    await page.goto(url);

    var company = await page.evaluate(() => {
      var CompanyArray = [];
      var certificate = {
        name: "BpiWorld",
        link: "https://products.bpiworld.org/",
        logo: "https://bpiworld.org/membership",
        desc:
          "Our logo ensures that products and packaging displaying the BPI logo have been independently tested and verified according to scientifically based standards.",
        companies:[],
      };
      CompanyArray.push(certificate);

      var companyList = document.querySelectorAll('div[class="main-company-left"]> div:first-of-type');
      for (var i = 0; i < companyList.length; i++) {
        certificate.companies.push( {
          companyName: companyList[i].innerText.trim(),
        });
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

 module.exports = bpiWorld;