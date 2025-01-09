import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import axios from "axios";
import { NextResponse } from "next/server";

const combineStocksValuation = async (stocksData: any) => {
  let totalValuation = 0;
  for (const stock of stocksData) {
    console.log(stock);

    const stockName = stock.stockId;
    console.log("StockQuantity:", stock.quantity);
    console.log("Stock complete name:", stockName);
    const stockCurrentFetch = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks?stockName=${stockName}`
    );

    console.log("stock Price", stockCurrentFetch.data);
    console.log("Compleete the process till here");
    const stockPrice = stockCurrentFetch.data.stockPrice.slice(1);
    console.log("StockPriceComplete", stockPrice);
    totalValuation += stockPrice * stock.quantity;
    totalValuation = Math.ceil(totalValuation);
  }

  return totalValuation;
};
export async function GET(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You are not authenticated." },
        {
          status: 401,
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        PurchasedStock: true,
      },
    });

    console.log("User", user);
    const stocksData: any = user?.PurchasedStock.map((stock) => {
      return {
        stockId: stock.stockId,
        quantity: stock.quantity,
      };
    });
    console.log("Stocks COmplete:", stocksData);

    if (stocksData?.length > 0) {
      const totalStocksValuation = await combineStocksValuation(stocksData);
      const usercoins = user?.coins ?? 0;
      console.log("Logging the main data:", {
        totalStocksValuation,
        stocksData,
      });
      const valuation = totalStocksValuation + usercoins;
      console.log("Valuation complete:", valuation);
      return NextResponse.json({
        totalStocksValuation,
        stocksData: stocksData,
        coins: user?.coins,
        completeValuation: totalStocksValuation + usercoins,
      });
    }
    return NextResponse.json({
      totalStocksValuation: 0,
      stocksData: [],
      coins: user?.coins,
      completeValuation: user?.coins,
    });
  } catch (error) {
    console.log("Error in getting stocks", error);
    return NextResponse.json(
      {
        message: "Error in getting stocks",
      },
      {
        status: 500,
      }
    );
  }
}
