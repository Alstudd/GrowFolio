const cheerio = require("cheerio");
const fs = require("fs");
const { default: axios } = require("axios");

const extractStocks = async (req, res) => {
  try {
    // Read stocks from JSON file
    const stocksData = JSON.parse(fs.readFileSync("stocks.json", "utf8"));
    const stocks = stocksData.stocks;

    // Check if stockName query parameter is provided
    const queryStock = req.query.stockName;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is provided

    if (queryStock) {
      // Find the stock symbol matching the query
      const matchingStock = stocks.find((stock) =>
        stock.startsWith(queryStock.toUpperCase())
      );

      if (!matchingStock) {
        return res
          .status(404)
          .json({ error: `Stock ${queryStock} not found in stocks.json` });
      }

      try {
        // Fetch and return data for the specific stock
        const response = await axios.get(
          `https://www.google.com/finance/quote/${matchingStock}`
        );
        const data = response.data;

        // Parse data using Cheerio
        const $ = cheerio.load(data);
        const stockPrice = $("div.YMlKec.fxKbKc").text().trim();
        const stockName = $("div.zzDege").text().trim();

        return res.json({
          stockSymbol: matchingStock,
          stockName,
          stockPrice,
        });
      } catch (err) {
        console.error(`Error fetching data for ${queryStock}: ${err.message}`);
        return res.status(500).json({
          error: `Failed to fetch data for ${queryStock}`,
        });
      }
    }

    // Calculate the starting index for pagination (first 9 stocks for page 1)
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;

    // Slice the stocks array to get only the appropriate range
    const selectedStocks = stocks.slice(startIndex, endIndex);

    // Fetch data for the selected stocks
    const results = [];
    for (const stock of selectedStocks) {
      try {
        const response = await axios.get(
          `https://www.google.com/finance/quote/${stock}`
        );
        const data = response.data;

        // Parse data using Cheerio
        const $ = cheerio.load(data);
        const stockPrice = $("div.YMlKec.fxKbKc").text().trim();
        const stockName = $("div.zzDege").text().trim();

        results.push({
          stockSymbol: stock,
          stockName,
          stockPrice,
        });
      } catch (err) {
        console.error(`Error fetching data for ${stock}: ${err.message}`);
        results.push({
          stockSymbol: stock,
          error: `Failed to fetch data`,
        });
      }
    }

    // Respond with the selected data array
    res.json({ stocks: results });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Failed to fetch stock data");
  }
};

module.exports = { extractStocks };
