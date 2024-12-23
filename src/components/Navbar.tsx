import React from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "./SignInButton";
import { prisma } from "@/lib/db";
import { Coins } from "lucide-react";

const Navbar = async () => {
  const session = await getAuthSession();

  // Fetch user data only if session exists
  const userData = session?.user?.id
    ? await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      })
    : null;

  return (
    <div>
      <nav className="md:block text-black dark:text-white hidden bg-white dark:bg-black">
        <div className="z-[30] md:mx-10 mx-2 flex flex-wrap items-center justify-between p-2">
          <a
            href="/"
            className="flex items-center space-x-3 text-white rtl:space-x-reverse"
          >
            <Image
              src="/growfolio-lightmode.png"
              className="rounded-md"
              height={25}
              width={50}
              alt="logo"
            />
            <div className="py-auto">
              <span
                className="text-[22px] text-black md:text-[24px] dark:text-white"
                style={{ lineHeight: "32px", fontWeight: "700" }}
              >
                GrowFolio
              </span>
            </div>
          </a>
          <div>
            <div className="md:mx-8 bg-white dark:bg-black" id="navbar-default">
              <div className="flex items-center gap-5">
                {session?.user && (
                  <div className="flex items-center gap-2">
                    <Coins className="text-emerald-500" />
                    <span className="text-black dark:text-white">
                      <span className="font-semibold">FolioCoins:</span>{" "}
                      {userData?.coins || 0}
                    </span>
                  </div>
                )}
                <ThemeToggle />
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
