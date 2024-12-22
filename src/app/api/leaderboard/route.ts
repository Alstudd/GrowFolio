import { prisma } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

const combineStocksValuation = async (stocksData: any) => {
  let totalValuation = 0;
  for (const stock of stocksData) {
    const stockName = stock.stockId;
    const stockCurrentFetch = await axios.get(
      `http://localhost:3001/stocks?stockName=${stockName}`
    );
    const stockPrice = parseFloat(
      stockCurrentFetch.data.stockPrice.replace(/[^0-9.-]+/g, "")
    );
    totalValuation += stockPrice * stock.quantity;
    totalValuation = Math.ceil(totalValuation);
  }
  return totalValuation;
};

export async function GET(req: Request, res: Response) {
  try {
    const Allusers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        coins: true,
        PurchasedStock: true,
      },
    });

    // Resolve all promises in the leaderboard data
    const leaderboardData = await Promise.all(
      Allusers.map(async (user) => {
        const stocksData = user?.PurchasedStock.map((stock) => ({
          stockId: stock.stockId,
          quantity: stock.quantity,
        }));

        if (stocksData?.length > 0) {
          const totalStocksValuation = await combineStocksValuation(stocksData);
          const userCoins = user?.coins ?? 0;

          return {
            name: user.name,
            totalStocksValuation,
            coins: userCoins,
            completeValuation: totalStocksValuation + userCoins,
          };
        }

        return {
          name: user.name,
          totalStocksValuation: 0,
          coins: user?.coins ?? 0,
          completeValuation: user?.coins ?? 0,
        };
      })
    );

    // Sort leaderboard data by completeValuation
    leaderboardData.sort((a, b) => b.completeValuation - a.completeValuation);

    return NextResponse.json({
      leaderboardData,
    });
  } catch (error) {
    console.error("Error in getting stocks:", error);
    return NextResponse.json(
      {
        message: "Error in getting stocks",
      },
      { status: 500 }
    );
  }
}
