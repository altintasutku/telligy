import Banner from "@/components/home/Banner";
import MarketInfo from "@/components/market-profile/marketInfo";
import Navbar from "@/components/Navbar";

import React from "react";

const SellerProfile = () => {
  return (
    <section>
      <Navbar />
      <Banner />

      <MarketInfo />
    </section>
  );
};

export default SellerProfile;
