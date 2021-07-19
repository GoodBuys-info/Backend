const puppeteer = require("puppeteer");


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
    return reject(e);
  }
});

betterCotton
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


module.exports = betterCotton;