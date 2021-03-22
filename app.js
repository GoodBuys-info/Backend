const express = require("express");
const app = express();
const port = 3000;
const veganCertificateScaper = require("./vegan");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/JSON");

  veganCertificateScaper
    .then((companies) => {
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
