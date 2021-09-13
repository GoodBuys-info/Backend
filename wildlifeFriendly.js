const puppeteer = require("puppeteer");

const certificate = {
  name: "Wild Life Friendly",
  link: "https://wildlifefriendly.org/",
  logo: "https://wildlifefriendly.org/who-we-are/",
  desc:
    "Wildlife Friendly Enterprise Network conserves threatened wildlife while contributing to the economic vitality of rural communities",
};


const wildlifefriendly = new Promise(async (resolve, reject) => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://wildlifefriendly.org/buy-wild/`);
    let companies = [];

    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.blurb.unNumBlurb');
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

    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

wildlifefriendly
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


//module.exports = wildlifefriendly;