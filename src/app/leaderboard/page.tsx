import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import Leaderboard from "@/components/Leaderboard";

const Page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <Leaderboard />;
};

export default Page;
