"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

const stockData = [
  { name: "MAZDCK", price: "Rs. 235" },
  { name: "COCHSHIP", price: "Rs. 235" },
  { name: "TATAMTRS", price: "Rs. 235" },
  { name: "MAZDCK", price: "Rs. 235" },
  { name: "COCHSHIP", price: "Rs. 235" },
  { name: "TATAMTRS", price: "Rs. 235" },
  { name: "MAZDCK", price: "Rs. 235" },
  { name: "COCHSHIP", price: "Rs. 235" },
  { name: "TATAMTRS", price: "Rs. 235" },
  { name: "MAZDCK", price: "Rs. 235" },
  { name: "COCHSHIP", price: "Rs. 235" },
  { name: "TATAMTRS", price: "Rs. 235" },
  { name: "EXTRASTK", price: "Rs. 300" },
];

const ITEMS_PER_PAGE = 12;

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stockData.length / ITEMS_PER_PAGE);
  const currentItems = stockData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="px-4">
      <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((stock, index) => (
          <div key={index} className="space-y-3">
            <Card className="mx-auto max-w-sm">
              <div className="flex items-center justify-start space-x-5">
                <div className="flex items-center space-x-5 p-4">
                  <CardContent className="py-4 flex-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-200">
                      {stock.name.slice(0, 2)}
                    </div>
                  </CardContent>
                  <div>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {stock.name}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      {stock.price}
                    </p>
                  </div>
                </div>
                <div className="">
                  <button className="w-full py-2 px-4 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 font-medium transition duration-300">
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
