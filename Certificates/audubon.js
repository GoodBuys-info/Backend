const puppeteer = require("puppeteer");

const certificate = {
  name: "Audubon International",
  link: "https://auduboninternational.org/",
  logo: "https://auduboninternational.org/about-us/",
  desc: "Audubon International mission is to create environmentally sustainable environments where people live, work, and play",
};

const audubon = new Promise(async (resolve, reject) => {
  try {
    const url =
      "https://directory.auduboninternational.org/directory?memberCategory=&city=&state=&country=&zipcode=&current_page=";
    // open the headless browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const browserPath = await puppeteer.executablePath();
    console.log("Chromium location:", browserPath);
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // await page.goto(url);
    // page.on("error", (err) => {
    //   console.error("Error occurred:", err);
    // });

    // await browser.disconnect();
    // enter url in page
    let companies = [];
    for (let i = 1; i < 38; i++) {
      await page.goto(url + `${i}`);

      var company = await page.evaluate(() => {
        var companyList = document.querySelectorAll(
          'div[class="directory-card"]> h5'
        );
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
  } catch (err) {
    // Catch and display errors
    return reject(err);
  }
});

audubon
  .then((companies) => console.log(companies))
  .catch((err) => console.error(err));

module.exports = audubon;
