"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-[200px] w-[200px]" />
      <Skeleton className="h-4 w-10" />
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-10" />
    </div>
  );
};

export default ProductCardSkeleton;
