import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";

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
    const body = await req.json();
    const userData = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        coins: true,
        PurchasedStock: true,
        games: true,
      },
    });
    if (!userData) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    // highest stock number
    const top5stocksBought = await prisma.purchasedStock.findMany({
      where: {
        userId: session.user.id,
      },
      take: 5,
      orderBy: {
        quantity: "desc",
      },
    });
    const top5stocks = top5stocksBought.map((stock) => {
      return {
        stockId: stock.stockId,
        quantity: stock.quantity,
      };
    });
    const TestsDataAndQuestion = await prisma.game.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        questions: true,
      },
    });
    const TestData = TestsDataAndQuestion.map((game) => {
      const questionsObject = game.questions.map((question) => {
        return {
          question: question.question,
          isCorrect: question.isCorrect,
          selectedAnswer: question.userAnswer,
          correctAnswer: question.answer,
        };
      });
      return {
        id: game.id,
        questions: questionsObject,
      };
    });
    return NextResponse.json({
      userData,
      top5stocks,
      TestData,
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
