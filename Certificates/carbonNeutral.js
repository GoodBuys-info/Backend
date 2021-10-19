const puppeteer = require("puppeteer");

const carbonNeutral = new Promise(async (resolve, reject) => {
  try {
    const url="http://www.verus-co2.com/clientlist.html"
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
        name: "CarbonNeutral",
        link: "http://www.verus-co2.com/index.html",
        logo: "http://www.verus-co2.com/about.html",
        desc:
        "Our logo means the organization offset their entire carbon footprint from their product considering them Carbon Neutral.",
        companies:[],
      };
      CompanyArray.push(certificate);

      var companyList = document.querySelectorAll('#container td a');
      for (var i = 0; i < companyList.length; i++) {
        if(companyList[i].innerText.trim()!=''){
          certificate.companies.push( {
            companyName: companyList[i].innerText.trim(),
          });
        }
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

 module.exports = carbonNeutral;