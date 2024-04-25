import Navbar from "@/components/Navbar";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const HomeLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
