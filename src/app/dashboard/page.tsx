import Banner from "@/components/dashboard/Banner";
import BookModal from "@/components/dashboard/BookModal";
import BookRow from "@/components/dashboard/BookRow";
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

      <BookRow title="Kitaplığım"/>

      <BookRow title="Öne Çıkanlar"/>

      <BookModal/>
    </section>
  );
};

export default DashboardPage;
