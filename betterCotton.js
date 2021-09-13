const puppeteer = require("puppeteer");

const certificate = {
  name: "Better Cotton Initiative",
  link: "https://bettercotton.org/",
  logo: "https://en.wikipedia.org/wiki/Better_Cotton_Initiative#/media/File:BCI-Logo.svg",
  desc:
    "Our logo means that you’re buying a majority cotton product, from a retailer or brand that is committed to sourcing Better Cotton and investing in BCI Farmers",
};


const betterCotton = new Promise(async (resolve, reject) => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://bettercotton.org/find-members/`);
    let companies = [];
    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('div[class="box"]> h2');
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

betterCotton
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


module.exports = betterCotton;