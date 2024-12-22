import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "./SignInButton";

const Navbar = async () => {
  const session = await getAuthSession();

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
              height={20}
              width={40}
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
              <div className="flex items-center gap-5">
                <ThemeToggle />
                {session?.user ? (
                  <UserAccountNav user={session?.user} />
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
