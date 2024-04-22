import Banner from "@/components/home/Banner";
import List from "@/components/home/List/List";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import React from "react";
import axios from "axios";
import { cookies } from "next/headers";

const HomePage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  try {
    const headers = {
      Authorization: JSON.parse(cookies().get(`sb-mprijckxtmpmgedyhhaj-auth-token`)?.value!).access_token,
    };
    const res = await axios.get("http://localhost:5555/", {
      headers,
    });
    console.log(res.data)
  } catch (error) {
    console.error(error)
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
