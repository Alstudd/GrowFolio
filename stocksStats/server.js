const express = require("express");

const { extractStocks } = require("./controller/extractStocks");
const app = express();
const cors = require("cors");

// Custom CORS configuration example
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/stocks", async (req, res) => {
  await extractStocks(req, res);
});
