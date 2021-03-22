const express = require("express");
const app = express();
const port = 3000;
const veganCertificateScaper = require("./vegan");

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/JSON");

  veganCertificateScaper
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
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
