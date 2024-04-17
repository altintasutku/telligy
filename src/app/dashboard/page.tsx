import Banner from "@/components/dashboard/Banner";
import DetailsModal from "@/components/dashboard/Book/DetailsModal";
import List from "@/components/dashboard/Book/List";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase-server";
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

      <List title="Kitaplığım"/>

      <List title="Öne Çıkanlar"/>

      <DetailsModal/>
    </section>
  );
};

export default DashboardPage;
