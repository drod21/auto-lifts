"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import NavItems from "./nav-items";

export default function Header() {
  return (
    <header className="mb-4 flex w-screen justify-between border-solid bg-secondary px-6 py-4">
      <Link className="dark text-2xl font-bold" href="/">
        AutoLifts
      </Link>

      <nav className="dark flex grow justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavItems />
            <NavigationMenuItem className="px-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
              <UserButton afterSignOutUrl="/" />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
