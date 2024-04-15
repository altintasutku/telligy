import Banner from "@/components/dashboard/Banner";
import Navbar from "@/components/Navbar";
import InfoCards from "@/components/pricing/infoCards";
import React from "react";
import SubscripeCard from "@/components/pricing/subscripeCard";

const PricingPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <InfoCards />
      <SubscripeCard />
    </div>
  );
};

export default PricingPage;
