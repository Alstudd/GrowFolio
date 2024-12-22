import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { z } from "zod";

const buyStocksSchema = z.object({
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
    const { stockId, price } = buyStocksSchema.parse(body);
    const stock = await prisma.purchasedStock.findFirst({
      where: {
        stockId: stockId,
        userId: session.user.id,
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
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
    if (user.coins < price) {
      return NextResponse.json(
        {
          message: "Insufficient funds to buy the stock",
        },
        {
          status: 400,
        }
      );
    }
    if (!stock) {
      await prisma.purchasedStock.create({
        data: {
          stockId,
          quantity: 1,
          userId: session.user.id,
        },
      });
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          coins: {
            decrement: price,
          },
        },
      });
      return NextResponse.json(
        {
          message: "Stock bought successfully",
        },
        {
          status: 200,
        }
      );
    }
    await prisma.purchasedStock.update({
      where: {
        id: stock.id,
      },
      data: {
        quantity: stock.quantity + 1,
      },
    });
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        coins: {
          decrement: price,
        },
      },
    });
    return NextResponse.json(
      {
        message: "Stock bought successfully",
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
      console.error("Something went wrong while buying stock", error);
      return NextResponse.json(
        {
          message: "Something went wrong while buying stock",
        },
        {
          status: 500,
        }
      );
    }
  }
}
