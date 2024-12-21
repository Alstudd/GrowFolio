const fs = require("fs");

// Load the JSON file
const jsonFilePath = "./sitemap.json"; // Replace with your file path
const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

// Extract the URLs that match the criteria
const result = {
  stocks: data.urls
    .filter((url) => url.endsWith(":NSE")) // Filter URLs ending with ':NSE'
    .map((url) => url.split("/quote/")[1]), // Extract the part after '/quote/'
};

// Log the result
console.log(result);

// Optionally, save the result to a file
const outputFilePath = "./output.json"; // Replace with desired output file path
fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2), "utf-8");
console.log(`Result saved to ${outputFilePath}`);
