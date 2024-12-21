"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import { getAuthSession } from "@/lib/nextauth";

const Navbar = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getAuthSession();
      setSession(sessionData);
    };

    fetchSession().catch(console.error);
  }, []);

  return (
    <div>
      <nav className="md:block text-black dark:text-white hidden bg-white dark:bg-black">
        <div className="z-[30] md:mx-10 mx-2 flex flex-wrap items-center justify-between p-2">
          <a
            href="/"
            className="flex items-center space-x-3 text-white rtl:space-x-reverse"
          >
            {/* <Image
              src="/growfolio-darkmode.png"
              className="rounded-md dark:block hidden"
              height={25}
              width={50}
              alt="logo"
            /> */}
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
                style={{ lineHeight: "32px", fontWeight: "600" }}
              >
                GrowFolio
              </span>
            </div>
          </a>
          <div>
            <div className="md:mx-8 bg-white dark:bg-black" id="navbar-default">
              <div className="flex gap-5">
                <ThemeToggle />
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <Button
                    onClick={() => {
                      signIn("google").catch(console.error);
                    }}
                    className="md:block hidden"
                  >
                    Login
                  </Button>
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
