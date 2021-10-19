const puppeteer = require("puppeteer");

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
      var CompanyArray = [];
      const certificate = {
        name: "Blue Angel",
        link: "https://bcorporation.net/",
        logo: "https://www.blauer-engel.de/en/products/company",
        desc:
          "Blue Angel is an environmental label organised by the federal government of Germany for the protection of people and the environment",
        companies:[],
      };
      CompanyArray.push(certificate);
      var companyList = document.querySelectorAll('.manufacturers-list .col-1 a');
      var companyList1 = document.querySelectorAll('.manufacturers-list .col-2 a');
  
      for (var i = 0; i < companyList.length; i++) {
        certificate.companies.push( {
          companyName: companyList[i].innerText.trim(),
        });
      }
      for (var i = 0; i < companyList1.length; i++) {
        certificate.companies.push( {
          companyName: companyList1[i].innerText.trim(),
        });
      } 
      return CompanyArray;
    });
    companies = companies.concat(company);
    await browser.close();
    return resolve(companies);

  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

module.exports = blueAngel;