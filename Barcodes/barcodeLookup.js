const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

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

// module.exports.scraper = (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://barcode-database.com/UPC/" + req.params.barcode);

//   //wait for required DOM to be rendered
//   await page.waitForSelector(
//     "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(1) > td"
//   );
//   // let items = await page.$$eval(
//   //   "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr > td",
//   //   // (rows) => {
//   //   //   rows = rows.map((el) => el.querySelectorAll("tbody > tr ").innerText);
//   //   //   return rows;
//   //   (table) => table.textContext
//   // );

//   var newItems = await page.evaluate(() => {
//     // var list = document.querySelectorAll(
//     //   "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr"
//     // );

//     var productCategory = document.querySelector(
//       "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(1) > td"
//     ).innerHTML;

//     var productBrand = document.querySelector(
//       "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(3) > td"
//     ).innerHTML;

//     var productManufacturer = document.querySelector(
//       "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(4) > td"
//     ).innerHTML;

//     results = {
//       category: productCategory,
//       brand: productBrand,
//       Manufacturer: productManufacturer,
//     };

//     // for (var i = 0; i < list.length; i++) {
//     //   results[i] = list[i].querySelector("td").innerText;
//     // }

//     // list.forEach((element) => {
//     //   element = {
//     //     text: element.innerText.trim(),
//     //   };
//     // });

//     // list.push(results);
//     return results;
//   });
//   // await page.screenshot({ path: "example.png" });

//   //await browser.close();
//   // console.log(newItems);
//   // items.concat(newItems);
//   console.log("Items " + JSON.stringify(newItems));
// })();

/********************************Using upcitemdb and node-fetch ***********************************  */
// const fetch = require("node-fetch");

// var barcodeLookupScraper = async function fetchUrl(params) {
//   var url =
//     "https://api.upcitemdb.com/prod/trial/lookup?upc=" + params.barcodes;
//   console.log(url);
//   return await fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Inside Fetch");
//       // return data;
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
/****************************************************************************************************************** */
// const https = require("https");
// function barcodeLookupScraper() {
//   var opts = {
//     hostname: "api.upcitemdb.com",
//     path: "/prod/trial/lookup",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   var req = https.request(opts, function (res) {
//     console.log("statusCode: ", res.statusCode);
//     //console.log("headers: ", res.headers);
//     var result = {};
//     res.on("data", function (d) {
//       result = d;
//       console.log("BODY: " + typeof d);
//     });
//   });
//   req.on("error", function (e) {
//     console.log("problem with request: " + e.message);
//   });
//   req.write('{ "upc": "044000033279" }');
//   req.end();
// }

// module.exports = barcodeLookupScraper;
// var newItems = await page.evaluate(() => {
//   var productCategory = document.querySelectorAll(
//     "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(1) > td"
//   ).innerText;

//   var productBrand = document.querySelectorAll(
//     "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > table > tbody > tr:nth-child(3) > td"
//   ).innerText;

//   // var productManufacturer = document.querySelectorAll(
//   //   "body > div.is-fullwidth > div > div > div > div:nth-child(1) > div.column.is-8 > div > div.column.is-12 > .table > tbody:nth-child(2) > tr:nth-child(4) > th:nth-child(1)"
//   // ).innerText;

//   results = {
//     category: productCategory.innerText,
//     brand: productBrand,
//     // manufacturer: productManufacturer,
//   };
//   return results;
// });
