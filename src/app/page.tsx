import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import { HeroScrollDemo } from "@/components/HeroDemoScroll";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <HeroScrollDemo/>
  );
}