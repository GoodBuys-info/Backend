const express = require("express");
//const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  getAllCertificateScrapers.then((certificates) => {
    res.send(certificates);
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
