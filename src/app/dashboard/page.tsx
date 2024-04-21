import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <Link href={"/dashboard/upload"}>Upload</Link>
    </div>
  );
};

export default DashboardPage;
