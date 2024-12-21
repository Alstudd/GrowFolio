const express = require("express");

const { extractStocks } = require("./controller/extractStocks");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/stocks", async (req, res) => {
  await extractStocks(req, res);
});
