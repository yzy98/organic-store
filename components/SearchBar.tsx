"use client";

import { useContext, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShopPageDispatchContext } from "@/providers/ShopProvider";

const SearchBar = () => {
  const inputRef = useRef(null);
  const dispatch = useContext(ShopPageDispatchContext);

  const handleClick = () => {
    const searchStr = inputRef?.current?.value;

    dispatch({
      type: "changeSearch",
      searchStr,
    });
  };

  return (
    <div className="flex w-[300px] max-w-sm items-center space-x-2">
      <Input type="search" ref={inputRef} placeholder="Search products..." />
      <Button onClick={handleClick}>Search</Button>
    </div>
  );
};

export default SearchBar;
