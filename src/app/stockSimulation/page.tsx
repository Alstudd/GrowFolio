"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Stock {
  stockSymbol: string;
  stockName: string;
  stockPrice: string;
}

interface ApiResponse {
  stocks: Stock[];
}

const ITEMS_PER_PAGE = 12;

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksData, setStocksData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1); // Add state for total pages

  const handleBuy = async (stockId: string, price: string) => {
    console.log("Buying stock:", stockId, price);
    const pricewithoutruppee = parseInt(price.slice(1));
    console.log(pricewithoutruppee);
    try {
      const response = await axios.post("/api/buyStocks", {
        stockId,
        price: pricewithoutruppee,
      });
      console.log(response.data);
    } catch (err) {
      console.error("Error buying stock:", err);
    }
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `http://localhost:3001/stocks?page=${currentPage}`
        );
        setStocksData(response.data.stocks);
        // Assuming the API returns total pages, adjust this based on your API
        setTotalPages(5); // Set this to the actual total pages from your API
        setError(null);
      } catch (err) {
        setError("Failed to fetch stock data");
        console.error("Error fetching stocks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [currentPage]); // This will re-fetch when currentPage changes

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="px-4">
      <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stocksData.map((stock, index) => (
          <div key={index} className="space-y-3">
            <Card className="mx-auto max-w-sm">
              <div className="flex items-center justify-start space-x-5">
                <div className="flex items-center space-x-5 p-4">
                  <CardContent className="py-4 flex-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-200">
                      {stock.stockSymbol.slice(0, 2)}
                    </div>
                  </CardContent>
                  <div>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {stock.stockSymbol}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stock.stockName}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      {stock.stockPrice}
                    </p>
                  </div>
                </div>
                <div className="pr-4">
                  <button
                    onClick={() =>
                      handleBuy(stock.stockSymbol, stock.stockPrice)
                    }
                    className="w-full py-2 px-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 font-medium transition duration-300"
                  >
                    BUY
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6 mx-8">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === 1
              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          }`}
        >
          Previous
        </button>
        <p className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
