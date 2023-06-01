const puppeteer = require("puppeteer");

/*  scrape all of the companies certified  of listed under Certified Vegan*/

/* Scarpes the website at http://vegan.org/companies-using-our-logo/
    returns a Promise */
const veganCertificateScraper = new Promise(async (resolve, reject) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://vegan.org/companies-using-our-logo/");
    let companies = [];
    let newCompanies = await page.evaluate(() => {
      var results = [];
      var certificate = {
        name: "Certified vegan",
        link: "http://vegan.org/",
        logo: "http://vegan.org/wp-content/uploads/2017/07/img_0440.png",
        desc: "Our logo is a registered trademark for products that do not contain animal products or by-products and that have not been tested on animals.",
        companies: [],
      };
      results.push(certificate);

      let items = document.querySelectorAll(
        "div.col-sm-12.article__body.post-content > article > h1"
      );
      certificate.companies.push({
        companyName: items.querySelector("strong").innerText,
      });
      // for (let i = 0; i < items.length; i++) {
      //   certificate.companies.push({
      //     companyName: items[i].innerText,
      //     companyLinks:
      //       items[i].querySelector("a") != null
      //         ? items[i].querySelector("a").innerText
      //         : " ",
      //   });
      // }

      // items = document.querySelectorAll(
      //   "div.col-sm-12.article__body.post-content > article > p"
      // );
      // for (let i = 0; i < items.length; i++) {
      //   certificate.companies.push({
      //     companyName: items[i].innerText,
      //     companyLinks:
      //       items[i].querySelector("a") != null
      //         ? items[i].querySelector("a").innerText
      //         : " ",
      //   });
      // }

      return results;
    });

    companies = companies.concat(newCompanies);
    browser.close();

    return resolve(companies);
  } catch (err) {
    return reject(err);
  }
});

veganCertificateScraper
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));

module.exports = veganCertificateScraper;
