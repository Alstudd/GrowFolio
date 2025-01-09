const express = require("express");

const { extractStocks } = require("./controller/extractStocks");

require("dotenv").config();

const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;

// Custom CORS configuration example
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/stocks", async (req, res) => {
  await extractStocks(req, res);
});
