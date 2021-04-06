const puppeteer = require("puppeteer");

//
//This code will scrape all of the names of the USDA listed in the USDAS
// and output to console
var usdaCertificateScraper = new Promise(async (resolve, reject) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://organic.ams.usda.gov/integrity/");
    let companies = [];
    let results = [];
    var certificate = {
      name: "USDA Organic ",
      link: "https://www.usda.gov/",
      logo: "https://www.usda.gov/themes/usda/img/usda-symbol.svg",
      desc:
        "We provide leadership on food, agriculture, natural resources, rural development, nutrition, and related issues based on public policy, the best available science, and effective management.",
      companies: [],
    };
    results.push(certificate);
    let companiesInPage = [];
    for (let i = 0; i < 4561; i++) {
      console.log("Scraping page " + (i + 1));

      let newCompanies = await page.evaluate(() => {
        let companies = [];
        let items = document.querySelectorAll(
          "#ctl00_MainContent_RadGrid1_ctl00 > tbody > tr "
        );

        for (let i = 0; i < items.length; i++) {
          companies.push({
            text: items[i].querySelector("td").innerText,
            certifier: items[i].querySelector("td:nth-child(2)").innerText,
            country: items[i].querySelector("td:nth-child(7)").innerText,
          });
        }
        return companies;
      });

      companiesInPage = companiesInPage.concat(newCompanies);
      await page.focus(
        "#ctl00_MainContent_RadGrid1_ctl00 > tfoot > tr.rgPager > td > table > tbody > tr > td > div.rgWrap.rgArrPart2 > input.rgPageNext"
      );

      await page.keyboard.type("\n");
    }

    certificate.companies = certificate.companies.concat(companiesInPage);
    browser.close();
    return resolve(certificate);
  } catch (e) {
    return reject(e);
  }
});

module.exports = usdaCertificateScraper;
