import { Loader2Icon } from "lucide-react";
import React from "react";

const LoadingBasket = () => {
  return <div className="h-screen w-screen flex items-center justify-center">
    <span className="flex items-center gap-2 bg-white p-4 rounded-md text-black">
        <Loader2Icon className="animate-spin" />
        <span>Loading...</span>
    </span>
  </div>;
};

export default LoadingBasket;
