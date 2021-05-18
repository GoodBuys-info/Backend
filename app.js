const express = require("express");
const app = express();
const port = 3000;
const getAllCertificateScrapers = require("./allCertificateScrapers.js");

const puppeteer = require("puppeteer");

const barcodeLookup = require("./Barcodes/barcodeLookup");
app.get("/", (req, res) => {
  getAllCertificateScrapers.then((certificates) => {
    res.send(certificates);
  });
});

app.get("/:barcode", function (req, res, next) {
  console.log(req.params.barcode);

  // barcodeLookup.scraper;
  // var barcode = req.params;
  // next(barcode);

  res.json(req.barcode);
  console.log("Request barcode is", req.barcode);
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.param("barcode", function (req, res, next, barcode) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://barcode-database.com/UPC/" + barcode);

    //wait for required DOM to be rendered
    await page.waitForSelector(
      "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(1) > td"
    );
    // let items = await page.$$eval(
    //   "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr > td",
    //   // (rows) => {
    //   //   rows = rows.map((el) => el.querySelectorAll("tbody > tr ").innerText);
    //   //   return rows;
    //   (table) => table.textContext
    // );

    req.barcode = await page.evaluate(() => {
      // var list = document.querySelectorAll(
      //   "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr"
      // );

      var productCategory = document.querySelector(
        "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(1) > td"
      ).innerHTML;

      var productBrand = document.querySelector(
        "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(3) > td"
      ).innerHTML;

      var productManufacturer = document.querySelector(
        "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(4) > td"
      ).innerHTML;

      results = {
        category: productCategory,
        brand: productBrand,
        Manufacturer: productManufacturer,
      };

      // for (var i = 0; i < list.length; i++) {
      //   results[i] = list[i].querySelector("td").innerText;
      // }

      // list.forEach((element) => {
      //   element = {
      //     text: element.innerText.trim(),
      //   };
      // });

      // list.push(results);
      return results;
    });
    // await page.screenshot({ path: "example.png" });

    //await browser.close();
    // console.log(newItems);
    // items.concat(newItems);
    next();
    console.log("Items " + JSON.stringify(req.barcode));
  })();
});
