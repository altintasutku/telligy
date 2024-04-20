import Banner from "@/components/dashboard/Banner";
import List from "@/components/dashboard/List/List";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <section>
      <Navbar />

      <Banner />

      <List />
      <List />
    </section>
  );
};

export default DashboardPage;
