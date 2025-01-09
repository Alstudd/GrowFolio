"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Portfolio = ({ user }: any) => {
  const [portfolioData, setPortfolioData] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const response = await axios.get("/api/portfolio");
      const data = await response.data;
      setPortfolioData(data);
    };
    fetchPortfolioData();
  }, []);

  const handleSell = async (stockId: string, price: string) => {
    console.log("Selling stock:", stockId, price);
    // const pricewithoutruppee = parseInt(price.slice(1));
    // console.log(pricewithoutruppee);
    const priceOfStock = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks?stockName=${stockId}`
    );
    console.log(priceOfStock.data);
    const pricewithRuppee = priceOfStock.data.stockPrice;
    let pricewithoutruppee = pricewithRuppee.slice(1);
    console.log(pricewithoutruppee);
    pricewithoutruppee = Math.round(pricewithoutruppee);
    console.log(pricewithoutruppee);
    try {
      const response = await fetch("/api/sellStocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stockId,
          price: pricewithoutruppee,
        }),
      });
      console.log(response);
    } catch (err) {
      console.error("Error selling stock:", err);
    }
  };

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[60%] bg-emerald-500 text-gray-900 dark:text-white my-5 rounded-lg shadow-lg">
      <header className="p-4 border-b border-gray-200 dark:border-green-700">
        <h1 className="text-2xl font-bold text-center text-black">Portfolio</h1>
      </header>
      <main className="p-4">
        <div className="bg-gray-100 dark:bg-emerald-800 p-4 rounded-lg shadow-md flex items-center mb-6">
          <img
            src={user?.image}
            alt={user?.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p>Total Stocks Valuation: ${portfolioData.totalStocksValuation}</p>
            <p>Coins: {portfolioData.coins}</p>
            <p>Complete Valuation: ${portfolioData.completeValuation}</p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-emerald-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Stocks Data</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-green-700">
                <th className="py-2 px-4">Sr.</th>
                <th className="py-2 px-4">Stock Symbol</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.stocksData.map((stock: any, index: number) => (
                stock.quantity > 0 && (
                  <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-green-700"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{stock.stockId}</td>
                  <td className="py-2 px-4">{stock.quantity}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleSell(stock.stockId, stock.quantity)}
                      className="w-full py-2 px-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 font-medium transition duration-300"
                    >
                      SELL
                    </button>
                  </td>
                </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
