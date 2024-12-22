import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { z } from "zod";

const sellStocksSchema = z.object({
  stockId: z.string(),
  price: z.number(),
});

export async function POST(req: Request, res: Response) {
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
    const body = await req.json();
    const { stockId, price } = sellStocksSchema.parse(body);
    const stock = await prisma.purchasedStock.findFirst({
      where: {
        stockId: stockId,
        userId: session.user.id,
      },
    });
    if (!stock) {
      return NextResponse.json(
        {
          message: "Stock not found in your account",
        },
        {
          status: 404,
        }
      );
    }

    // If stock is found, sell the stock
    // decrease the amount of stock in the stock table by 1
    // increase the coins of the user by the price of the stock
    const user = await prisma.user.findUnique({
      where: {
        id: stock.userId,
      },
    });

    // If the user is not found, return an error
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    // Adding the amount of stock to the user's coins
    if (stock.quantity < 1) {
      return NextResponse.json(
        {
          message: "Stock not found in your account",
        },
        {
          status: 404,
        }
      );
    }
    await prisma.user.update({
      where: {
        id: stock.userId,
      },
      data: {
        coins: user.coins + price,
      },
    });
    await prisma.purchasedStock.update({
      where: {
        id: stock.id,
        userId: stock.userId,
      },
      data: {
        quantity: stock.quantity - 1,
      },
    });
    return NextResponse.json(
      {
        message: "Stocks sold successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: error.issues,
        },
        {
          status: 400,
        }
      );
    } else {
      console.error("Error in selling stocks:", error);
      return NextResponse.json(
        {
          message: "Internal server error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
