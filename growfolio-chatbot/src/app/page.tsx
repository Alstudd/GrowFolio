import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src="/growfolio-lightmode.png" className="rounded-xl" alt="logo" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          GrowFolio ChatBot
        </span>
      </div>
      <p className="max-w-prose text-center">
        Hey, I&apos;m Mr. Folio, your GrowFolio AI Assistant. I can help you with your notes and queries related to finance. Click the button below to get started.
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}