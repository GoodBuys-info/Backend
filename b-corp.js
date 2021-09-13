const puppeteer = require("puppeteer");

const certificate = {
  name: "B Corp",
  link: "https://bcorporation.net/",
  logo: "https://en.wikipedia.org/wiki/B_Corporation_(certification)#/media/File:Runa_B_Corp_Label.jpg",
  desc:
    "Our logo means that you’re buying a majority cotton product, from a retailer or brand that is committed to sourcing Better Cotton and investing in BCI Farmers",
};


const bcorp = new Promise(async (resolve, reject) => {
  try {
    const url="https://bcorporation.net/directory?page="
    // open the headless browser
    var browser = await puppeteer.launch({ headless: false });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // enter url in page
    let companies = [];
    for(let i=30;i<238;i++){
    await page.goto(url+i);

    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('div[class="card__text"]> h3');
      var CompanyArray = [];
      for (var i = 0; i < companyList.length; i++) {
        CompanyArray[i] = {
          companyName: companyList[i].innerText.trim(),
        };
      }
      return CompanyArray;
    });
    companies = companies.concat(company);
    }
    return resolve(companies);

  }
    catch (err) {
      // Catch and display errors
      return reject(err);
    }
  });

bcorp
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


module.exports = bcorp;