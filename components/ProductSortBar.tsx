"use client";

import { useContext } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopPageDispatchContext } from "@/providers/ShopProvider";

const sortOptions = ["default", "date", "price"];

const ProductSortBar = () => {
  const dispatch = useContext(ShopPageDispatchContext);

  // TODO: useCallback to optimize???
  const selectHandler = (value: string) => {
    dispatch({
      type: "changeSort",
      sort: value === "default" ? null : value,
    });
  };

  return (
    <Select onValueChange={selectHandler}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="sort" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((value, index) => (
          <SelectItem key={index} value={value}>
            Sort by {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductSortBar;
