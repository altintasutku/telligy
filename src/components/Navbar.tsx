"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LucideShoppingBag, MenuIcon, SearchIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import UserIcon from "./UserIcon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/supabase-client";
import { signOut } from "@/actions/auth";
import { Kreon } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function MySheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="inline-block lg:hidden">
        <MenuIcon size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function MyNavigationMenu() {

  const [categories, setCategories] = useState<SelectCategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const auth = await createClient().auth.getSession();

      const allCategories = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
          headers: {
            Authorization: auth.data.session?.access_token,
          },
        })
        .then((res) => {
          return res.data as SelectCategory[];
        });
      setCategories(allCategories.slice(0, 6));
    };
    getCategories();
  }, []);

  return (
    <NavigationMenu className="hidden lg:inline-block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Anasayfa
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/purchased" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Satın Aldıklarım
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/list" legacyBehavior passHref>
              Listem
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`}>
                  <ListItem
                    key={category.id}
                    title={category.name}
                    href={category.id.toString()}
                  >
                    {category.name}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const kreon = Kreon({
  subsets: ["latin"],
});

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center py-5 px-10 absolute top-0 inset-x-0 z-50">
      <MySheetMenu />
      <div className="block md:hidden"></div>
      <div className="flex col-span-6 gap-4 justify-center md:justify-normal lg:gap-10 items-center">
        <Link href={"/home"}>
          <h1 className={cn("font-bold text-xl md:text-3xl", kreon.className)}>
            TELLIGY
          </h1>
        </Link>
        <MyNavigationMenu />
      </div>
      <div className="flex items-center gap-5">
        <Link
          href={"/search"}
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          <SearchIcon />
        </Link>
        <Link
          href={"/basket"}
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          <LucideShoppingBag />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>For Writers</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={"/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
