const express = require("express");
//const puppeteer = require("puppeteer");
const app = express();
const port = 3000;
const veganCertificateScraper = require("./vegan");
const betterCottonScraper = require("./betterCotton");
const birdFriendlyScraper=require("./birdfriendlycofee");
const blueAngelScraper=require("./blueAngel");
const cornucopiaScraper=require("./cornucopiaScore");
const audubonScraper=require("./audubon");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/JSON");
  //   const browser = puppeteer.launch(
  //     { headless: true },
  //     { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  //     //{ ignoreDefaultArgs: ["--disable-extensions"] }
  //   );
  veganCertificateScraper
    .then((companies) => {
      /*Convert from array to string to return as a JSON */
      var companiesString = JSON.stringify(companies);
      res.send(JSON.parse(companiesString));
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });

  betterCottonScraper
    .then((companies) => {
      /*Convert from array to string to return as a JSON */
      // console.log(companies);
      var companiesString = JSON.stringify(companies);
      res.send(JSON.parse(companiesString));
      //res.end();
      //browser.close();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });

  birdFriendlyScraper
  .then((companies) => {
    /*Convert from array to string to return as a JSON */
    var companiesString = JSON.stringify(companies);
    res.send(JSON.parse(companiesString));
  })
  .catch((err) => {
    res.send(err);
    res.end();
  });

  blueAngelScraper
  .then((companies) => {
    /*Convert from array to string to return as a JSON */
    // console.log(companies);
    var companiesString = JSON.stringify(companies);
    res.send(JSON.parse(companiesString));
    //res.end();
    //browser.close();
  })
  .catch((err) => {
    res.send(err);
    res.end();
  });

  cornucopiaScraper
  .then((companies) => {
    /*Convert from array to string to return as a JSON */
    var companiesString = JSON.stringify(companies);
    res.send(JSON.parse(companiesString));
  })
  .catch((err) => {
    res.send(err);
    res.end();
  });

  audubonScraper
  .then((companies) => {
    /*Convert from array to string to return as a JSON */
    var companiesString = JSON.stringify(companies);
    res.send(JSON.parse(companiesString));
  })
  .catch((err) => {
    res.send(err);
    res.end();
  });



});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
