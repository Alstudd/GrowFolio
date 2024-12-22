import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import MCQCounter from "./MCQCounter";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className="space-y-8">
      {games.map((game) => {
        return (
          <Link
            className="w-full text-base font-medium leading-none"
            href={`/statistics/${game.id}`}
            key={game.id}
          >
            <div className="group rounded-md bg-white dark:bg-black w-full flex items-center justify-between">
              <div className="group-hover:bg-gray-100 dark:group-hover:bg-gray-700 w-full p-3 rounded-md flex items-center">
                {game.gameType === "mcq" ? (
                  <CopyCheck className="mr-3" />
                ) : (
                  <Edit2 className="mr-3" />
                )}

                <div className="ml-4">
                  <div className="flex justify-between gap-10 w-full">
                    <div>
                      <div className="font-bold text-lg">{game.topic}</div>
                      <p className="text-sm text-muted-foreground">
                        {game.gameType === "mcq"
                          ? "Multiple Choice"
                          : "Open-Ended"}
                      </p>
                    </div>
                    <p className="flex my-auto items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(game.timeStarted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
