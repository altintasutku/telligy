import Banner from "@/components/home/Banner";
import List from "@/components/home/List/List";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
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

export default HomePage;
