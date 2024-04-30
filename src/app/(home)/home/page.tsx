import Banner from "@/components/home/Banner";
import List from "@/components/home/List/List";
import { createClient } from "@/lib/supabase/supabase-server";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const auth = await supabase.auth.getSession();

  const allBooks = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book`,{
    headers: {
      Authorization: auth.data.session?.access_token
    }
  }).then(res => {
    return res.data as SelectBook[]
  }).catch(err => {
    console.log(err)
    return []
  })

  return (
    <section>
      <Banner />

      <List title="All Books" list={allBooks}/>
      <List title="All Books" list={allBooks}/>
      <List title="All Books" list={allBooks}/>
      <List title="All Books" list={allBooks}/>
      <List title="All Books" list={allBooks}/>
    </section>
  );
};

export default HomePage;
