import Banner from "@/components/home/Banner";
import MarketInfo from "@/components/market-profile/marketInfo";
import { createClient } from "@/lib/supabase/supabase-server";
import axios from "axios";
import { redirect } from "next/navigation";

import React from "react";

const SellerProfile = async ({ params }: { params: { userId: number } }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const auth = await supabase.auth.getSession();

  const seller = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.userId}`, {
      headers: {
        Authorization: auth.data.session?.access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return (
    <section>
      <Banner />

      <MarketInfo item={seller} />
    </section>
  );
};

export default SellerProfile;
