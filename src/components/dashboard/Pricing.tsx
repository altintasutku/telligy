import React from "react";
import { Input } from "../ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";

type Props = Readonly<{
  infos: {
    name: string;
    description: string;
    tags: string[];
    price: number;
    discount: number;
  };
  setInfos: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      tags: string[];
      price: number;
      discount: number;
    }>
  >;
}>;

const Pricing = ({ infos, setInfos }: Props) => {
  return (
    <div className="flex-1 flex gap-5 h-full">
      <div className="basis-2/3">
        <span>Price</span>
        <Input
          value={infos.price}
          type="number"
          onChange={(e) =>
            setInfos({ ...infos, price: parseInt(e.target.value) })
          }
        />
        <span>Discount</span>
        <Input
          value={infos.discount}
          type="number"
          onChange={(e) =>
            setInfos({ ...infos, discount: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="basis-1/3 flex flex-col border-l border-l-white px-5 h-full">
        <h1 className="text-lg">ORDER SUMMARY</h1>

        <div className="flex justify-between">
          <span>Price</span>
          <span>TRY {infos.price}</span>
        </div>
        <div className="flex justify-between">
          <span>KDV (8%)</span>
          <span>-TRY {infos.price * 0.08}</span>
        </div>
        <div className="flex justify-between">
          <span>Telligy Price (6%)</span>
          <span>-TRY {infos.price * 0.06}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount ({infos.discount}%)</span>
          <span>-TRY {infos.price * (infos.discount / 100)}</span>
        </div>

        <div className="flex justify-between">
          <span>You&apos;ll Get</span>
          <span className="font-bold">
            TRY{" "}
            {infos.price -
              infos.price * 0.08 -
              infos.price * 0.06 -
              infos.price * (infos.discount / 100)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
