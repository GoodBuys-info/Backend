//const express = require("express");
const puppeteer = require("puppeteer");
// const app = express();
// const port = 3000;

/* Code for mysql*/
//const mysql = require("mysql");
//const Certificate = require("./models/certificates.model.js");

/*  scrape all of the companies certified  of  listed under Certified Vegan*/

const certificate = {
  name: "Certified vegan",
  link: "http://vegan.org/",
  logo: "http://vegan.org/wp-content/uploads/2017/07/img_0440.png",
  desc:
    "Our logo is a registered trademark for products that do not contain animal products or by-products and that have not been tested on animals.",
};

/*Scarpes the website at http://vegan.org/companies-using-our-logo/
    returns a Promise */
const veganCertificateScaper = new Promise(async (resolve, reject) => {
  try {
    const browser = await puppeteer.launch(
      { headless: true },
      { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
      //{ ignoreDefaultArgs: ["--disable-extensions"] }
    );
    const page = await browser.newPage();
    await page.goto(certificate.link + "/companies-using-our-logo/");
    let companies = [];
    let newCompanies = await page.evaluate(() => {
      var results = [];

      let items = document.querySelectorAll(
        "body > div.main-container > section.switchable.space--xxs.text-center > div > div > div.col-sm-8.col-md-7 > div > p "
      );
      for (let i = 0; i < items.length; i++) {
        results.push({
          companyName: items[i].innerText,
          companyLinks:
            items[i].querySelector("a") != null
              ? items[i].querySelector("a").innerText
              : " ",
        });
      }

      items = document.querySelectorAll(
        "body > div.main-container > section.switchable.space--xxs.text-center > div > div > div.col-sm-8.col-md-7 > div > div > div > p"
      );
      for (let i = 0; i < items.length; i++) {
        results.push({
          companyName: items[i].innerText,
          companyLinks:
            items[i].querySelector("a") != null
              ? items[i].querySelector("a").innerText
              : " ",
        });
      }

      return results;
    });

    companies = companies.concat(newCompanies);
    browser.close();

    return resolve(companies);
    //return companies;
  } catch (e) {
    return reject(e);
    //return e;
  }
});
// console.log(Scraper);
// const veganCertificate = Scraper.then((companies) =>
//   console.log(companies)
// ).catch((err) => console.error(err));
veganCertificateScaper
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));

// app.get("/", (req, res) => {
//   res.setHeader("Content-Type", "application/JSON");
//   veganCertificateScaper
//     .then((companies) => {
//       /*Convert from array to string to return as a JSON */
//       var companiesString = JSON.stringify(companies);
//       res.send(JSON.parse(companiesString));
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.listen(process.env.PORT || port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = veganCertificateScaper;
