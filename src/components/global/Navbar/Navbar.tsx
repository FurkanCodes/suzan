import { UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar: React.FC<any> = async () => {
  const user = true;
  return (
    <header className="fixed right-0 left-0 top-0 z-50 w-full h-18 border-b border-gray-300  dark:border-neutral-700">
      <div className="flex items-center justify-between w-full h-full px-4 py-2 text-sm">
        <div className="flex items-center">
          <aside className="flex items-center gap-1">
            <p className="font-bold">Su</p>
            <Image
              src="/fuzzieLogo.png"
              width={15}
              height={15}
              alt="logo"
            ></Image>

            <p className="font-bold">an</p>
          </aside>
        </div>
        <nav className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <ul className="flex items-center gap-3 list-none">
            <li className="flex items-center gap-1">
              <Link href={""} className="font-bold">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <Link href={""} className="font-bold">
                About
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <Link href={""} className="font-bold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <aside className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              {user ? "Dashboard" : "Get Started"}
            </span>
          </Link>

          {true ? <UserButton afterSignOutUrl="/" /> : null}
          <MenuIcon className="md:hidden" />
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
