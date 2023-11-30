"use client";

import { useContext } from "react";
import { ShopPageContext } from "@/providers/ShopProvider";

interface ProductTitleProps {
  category: string;
}

const ProductTitle = ({ category }: ProductTitleProps) => {
  const shopState = useContext(ShopPageContext);
  const searchStr = shopState?.searchStr;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">Shop/{category}</p>
      {searchStr && (
        <p className="text-xl font-bold text-green-700">
          Search results: "{searchStr}"
        </p>
      )}
    </div>
  );
};

export default ProductTitle;
