const puppeteer = require("puppeteer");

// This code will scrape all of the names of the EcoLabels listed in the EcoLabel Index
// and output to console

const ecolabelCertificateScarper = new Promise(async (resolve, reject) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://www.ecolabelindex.com/ecolabels/?st=country,us", {
      timeout: 0,
    });

    let companies = [];
    let newCompanies = await page.evaluate(() => {
      let results = [];
      const certificate = {
        name: "Ecolabel Index",
        link: "http://www.ecolabelindex.com/",
        logo: "http://www.ecolabelindex.com/styles/EI.png",
        desc: "",
        companies: [],
      };

      results.push(certificate);
      let items = document.querySelectorAll(".cuddle");
      // use inspect element -> "copy selector" to get this element's path
      let logos = document.querySelectorAll(
        "#contents > div > div.masthead > div.part > div.alpha.grid_8 > div > table > tbody > tr > td > a > img"
      );
      // let descriptions = document.querySelectorAll('#contents > div > div.masthead > div.part > div.alpha.grid_8 > div > table > tbody > tr > td > p');
      let descriptions = document.querySelectorAll(
        "#contents > div > div.masthead > div.part > div.alpha.grid_8 > div > table > tbody > tr > td:nth-child(2)"
      );

      for (let i = 0; i < items.length; i++) {
        certificate.companies.push({
          companyName: items[i].innerText,
          companyLogo:
            "http://www.ecolabelindex.com" + logos[i].getAttribute("src"),
          companyDescription: descriptions[i].innerText.replace(
            /(\r\n|\n|\r)/gm,
            ""
          ), //.replace(/\\n/g, '')
        });
      }
      return results;
    });

    companies = companies.concat(newCompanies);

    browser.close();

    return resolve(companies);
  } catch (e) {
    return reject(e);
  }
});

module.exports = ecolabelCertificateScarper;
