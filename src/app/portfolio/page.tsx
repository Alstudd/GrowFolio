import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import Portfolio from "@/components/Portfolio";

const Page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <Portfolio user={session?.user} />;
};

export default Page;
