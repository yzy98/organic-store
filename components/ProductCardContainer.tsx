"use client";

import { useContext } from "react";
import useProducts from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";
import { getCategoryNameById } from "@/lib/utils";
import { ShopPageContext } from "@/providers/ShopProvider";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductCardContainerProps {
  category: string;
}
const ProductCardContainer = ({ category }: ProductCardContainerProps) => {
  const { pageNum } = useContext(ShopPageContext);
  const { data, isLoading } = useProducts(category, pageNum);
  const { data: categories } = useCategories();

  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-10">
      {data &&
        data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            category={getCategoryNameById(product.categoryId, categories || [])}
            size="md"
          />
        ))}
      {isLoading &&
        Array.from(Array(9).keys()).map((num) => (
          <ProductCardSkeleton key={num} />
        ))}
    </div>
  );
};

export default ProductCardContainer;
