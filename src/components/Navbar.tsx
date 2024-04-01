import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between">
      <h1 className="font-bold text-2xl uppercase">telligy</h1>

      <div>
        <Link href="/login" className={buttonVariants({ variant: "link" })}>
          Login
        </Link>
        <Link href="/register" className={buttonVariants({ variant: "link" })}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
