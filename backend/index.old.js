const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  console.log(`path: ${req.path}`);
  res.send("Hi");
});

app.get("/crash", (req, res) => {
  console.log(`path: ${req.path}`);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
