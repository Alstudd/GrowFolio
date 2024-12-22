"use client";
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      setLeaderboardData(data.leaderboardData);
    };
    fetchLeaderboardData();
  }, []);

  if (!leaderboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[50%] bg-emerald-500 text-gray-900 dark:text-white my-5 rounded-lg shadow-lg">
      <header className="p-4 border-b border-gray-200 dark:border-green-700">
        <h1 className="text-2xl font-bold text-center text-black">Leaderboard</h1>
      </header>
      <main className="p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          {leaderboardData.map((user: any, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-emerald-800 p-4 rounded-lg shadow-md flex items-center relative"
            >
              {/* Stylish number */}
              <div className="absolute -left-20 w-10 h-10 bg-emerald-700 text-white dark:bg-gray-900 flex items-center justify-center rounded-full text-lg font-bold">
                {index + 1}
              </div>
              <img
                src={user.image}
                alt={user.username}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.username}</h2>
                <p>Total Stocks Valuation: ${user.totalStocksValuation}</p>
                <p>Coins: {user.coins}</p>
                <p>Complete Valuation: ${user.completeValuation}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
