const puppeteer = require("puppeteer");

const blueAngel = new Promise(async (resolve, reject) => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({
      headless: false,
      executablePath: "/opt/homebrew/bin/chromium",
    });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.blauer-engel.de/en/products/companies`);

    let companies = [];
    var company = await page.evaluate(() => {
      var CompanyArray = [];
      const certificate = {
        name: "Blue Angel",
        link: "https://bcorporation.net/",
        logo: "https://www.blauer-engel.de/en/products/company",
        desc: "Blue Angel is an environmental label organised by the federal government of Germany for the protection of people and the environment",
        companies: [],
      };
      // ul.m-bep_az-list__items li a
      CompanyArray.push(certificate);
      var companyList = document.querySelectorAll(
        "ul.m-bep_az-list__items li a"
      );

      for (var i = 0; i < companyList.length; i++) {
        // console.log(companyList[i].innerText.trim());
        certificate.companies.push({
          companyName: companyList[i].innerText.trim(),
        });
      }
      console.log(CompanyArray);
      return CompanyArray;
    });
    companies = companies.concat(company);
    console.log(companies);
    await browser.disconnect();
    // await browser.close();
    return resolve(companies);
  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

module.exports = blueAngel;
