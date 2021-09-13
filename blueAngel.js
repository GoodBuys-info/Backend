const puppeteer = require("puppeteer");

const certificate = {
  name: "Blue Angel",
  link: "https://bcorporation.net/",
  logo: "https://www.blauer-engel.de/en/products/company",
  desc:
    "Blue Angel is an environmental label organised by the federal government of Germany for the protection of people and the environment",
};


const blueAngel = new Promise(async (resolve, reject) => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.blauer-engel.de/en/products/company`);
    let companies = [];

    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.manufacturers-list .col-1 a');
      var CompanyArray = [];
      for (var i = 0; i < companyList.length; i++) {
        CompanyArray[i] = {
          companyName: companyList[i].innerText.trim(),
        };
      }
      return CompanyArray;
    });
    var company1 = await page.evaluate(() => {
      var companyList1 = document.querySelectorAll('.manufacturers-list .col-2 a');
      var CompanyArray1 = [];
      for (var i = 0; i < companyList1.length; i++) {
        CompanyArray1[i] = {
          companyName: companyList1[i].innerText.trim(),
        };
      }
      return CompanyArray1;
    });
    companies = companies.concat(company);
    companies = companies.concat(company1);
    //console.dir(company);
    await browser.close();
    return resolve(companies);

    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

blueAngel
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));


module.exports = blueAngel;