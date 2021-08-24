const puppeteer = require("puppeteer");

const certificate = {
  name: "The Cornucopia Institute",
  link: "https://www.cornucopia.org/",
  logo: "https://www.cornucopia.org/scorecards/",
  desc:
    "The Cornucopia Institute provides needed information to family farmers, consumers, and other stakeholders in the good food movement",
};


const cornucopiaScore = new Promise(async (resolve, reject) => {
  try {
    const url="https://www.cornucopia.org/scorecards/page/"
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // enter url in page
    let allUrls = [];
    for(let i=1;i<3;i++){
    await page.goto(url+i);
    //Fetch all urls and store it in urlArray
    var urls = await page.evaluate(() => {
      var urlList = document.querySelectorAll('.grid-piece .section-content .btn-wrap.center a ');
      var urlArray = [];
      
      for (var i = 0; i < urlList.length; i++) {
        urlArray.push(urlList[i].href);
      }
      return urlArray;
    });
    allUrls = allUrls.concat(urls);
    }
    await browser.close()
    let companies = [];
    for(let j=0;j<allUrls.length;j++){
    const url=allUrls[j];
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // enter url in page


    await page.goto(url);
    await page.setDefaultNavigationTimeout(0);  
    var company = await page.evaluate(() => {
      var companyList = document.querySelectorAll('.tablesaw-swipe-cellpersist a');
      var CompanyArray = [];
      for (var i = 0; i < companyList.length; i++) {
        CompanyArray[i] = {
          companyName: companyList[i].innerText.trim(),
        };
      }
      return CompanyArray;
    });
    await browser.close()
    companies = companies.concat(company);
    }
    return resolve(companies);

  }
    catch (err) {
      // Catch and display errors
      return reject(err);
    }
  });

  
  cornucopiaScore
    .then((companies) => console.log(companies))
    .catch((err) => console.error(err));
  
  module.exports = cornucopiaScore;