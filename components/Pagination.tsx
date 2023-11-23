"use client";

import { useContext } from "react";
import { ShopPageContext } from "@/providers/ShopProvider";

import { Button } from "./ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

interface PaginationProps {
  pageCount: number;
}

const Pagination = ({ pageCount }: PaginationProps) => {
  const { pageNum, setPageNum } = useContext(ShopPageContext);

  const nextHandler = () => {
    setPageNum((currentPageNum) => currentPageNum + 1);
  };
  const previousHandler = () => {
    setPageNum((currentPageNum) => currentPageNum - 1);
  };

  return (
    <div className="flex justify-center gap-5 items-center text-sm font-bold ">
      <Button
        className="text-green-700"
        variant="ghost"
        disabled={pageNum === 1}
        onClick={previousHandler}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </Button>
      <div>
        {pageNum} of {pageCount}
      </div>
      <Button
        className="text-green-700"
        variant="ghost"
        disabled={pageNum === pageCount}
        onClick={nextHandler}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
