import { cn } from "@/lib/utils";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { baseNavClassName } from "./nav-utils";

const navList = [
  {
    name: "Exercises",
    href: "/exercises",
  },
  {
    name: "Workouts",
    href: "/workouts",
  },
];

export const navClassName = cn(navigationMenuTriggerStyle(), baseNavClassName);
export const NavItem = ({ item }: { item: (typeof navList)[0] }) => {
  return (
    <Link href={item.href} legacyBehavior passHref>
      <NavigationMenuLink className={navClassName}>
        {item.name}
      </NavigationMenuLink>
    </Link>
  );
};
export default function NavItems() {
  return navList.map((item) => (
    <NavigationMenuItem key={item.name}>
      <NavItem item={item} />
    </NavigationMenuItem>
  ));
}
