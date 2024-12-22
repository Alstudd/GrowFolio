import { prisma } from "@/lib/db";
import { endGameSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { gameId } = endGameSchema.parse(body);

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (!game) {
      return NextResponse.json(
        {
          message: "Game not found",
        },
        {
          status: 404,
        }
      );
    }
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    });
    const gameData = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        questions: true,
      },
    });
    console.log("Game data", gameData);
    const totalCorrectAnswers =
      gameData?.questions.filter((question) => question.isCorrect).length ?? 0;
    const coinsReward = totalCorrectAnswers * 50;
    const user = await prisma.user.findUnique({
      where: {
        id: gameData?.userId,
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
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        coins: user.coins + coinsReward,
      },
    });
    return NextResponse.json({
      message: "Game ended",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
