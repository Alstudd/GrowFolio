import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import axios from "axios";
import { NextResponse } from "next/server";

const combineStocksValuation = async (stocksData: any) => {
  let totalValuation = 0;
  for (const stock of stocksData) {
    const stockName = stock.stockId;
    const stockCurrentFetch = await axios.get(
      `http://localhost:3001/stocks?stockName=${stockName}`
    );
    const stockPrice = stockCurrentFetch.data.stockPrice;
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
    const stocksData: any = user?.PurchasedStock.map((stock) => {
      return {
        stockId: stock.stockId,
        quantity: stock.quantity,
      };
    });
    if (stocksData?.length > 0) {
      const totalStocksValuation = await combineStocksValuation(stocksData);
      const usercoins = user?.coins ?? 0;
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
