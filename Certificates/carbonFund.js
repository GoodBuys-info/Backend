const puppeteer = require("puppeteer");

const certificate = {
  name: "Carbonfund",
  link: "https://carbonfund.org/",
  logo: "https://carbonfund.org/take-action/businesses/carbonfree-programs/large-business-partner/",
  desc:
    "Our logo means that the product are carbonfee certified which means providing provide environmentally-friendly, carbon neutral products to our customers",
};


const carbonFund = new Promise(async (resolve, reject) => {
  try {
    const url="https://carbonfund.org/partner/page/"
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // enter url in page
    let companies = [];
    for(let i=1;i<39;i++){
    await page.goto(url+i);

    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.post-partner__title a');
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

  carbonFund
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


 module.exports = carbonFund;