import Publish from "@/components/dashboard/Publish";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UserIcon from "@/components/UserIcon";
import { DialogContent } from "@radix-ui/react-dialog";
import { BarChartIcon, BookIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <nav className="flex justify-between p-6 border-b border-b-white">
        <span className="flex items-end font-bold gap-2">
          <Link href={"/home"}>
            <h2 className="text-lg">TELLIGY</h2>
          </Link>
          <h1 className="text-[#A98FCB] text-3xl">DASHBOARD</h1>
        </span>
        <div className="flex items-center gap-6">
          <Publish />
          <UserIcon />
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="w-56 hidden md:flex flex-col items-center border-r border-r-white p-4">
          <UserIcon size={128} />
          <span>Your Marketplace</span>
          <span className="font-light text-sm opacity-60">John Doe</span>
          <br />
          <Link href={"/dashboard/books"} className="w-full">
            <Button
              className="w-full flex items-center gap-4 justify-start"
              variant={"ghost"}
            >
              <BookIcon size={24} />
              Books
            </Button>
          </Link>
          <Link href={"/dashboard/analytics"} className="w-full">
            <Button
              className="w-full flex items-center gap-4 justify-start"
              variant={"ghost"}
            >
              <BarChartIcon size={24} />
              Analytics
            </Button>
          </Link>
        </aside>
        <section className="flex-1 overflow-y-auto">{children}</section>
      </div>
    </div>
  );
};

export default DashboardLayout;
