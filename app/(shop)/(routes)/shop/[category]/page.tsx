import prismadb from "@/lib/prismadb";
import ShopProvider from "@/providers/ShopProvider";

import Pagination from "@/components/Pagination";
import ProductCardContainer from "@/components/ProductCardContainer";
import ProductFilterBar from "@/components/ProductFilterBar";
import ProductSortBar from "@/components/ProductSortBar";
import SearchBar from "@/components/SearchBar";
import ProductTitle from "@/components/ProductTitle";

interface ShopPageProps {
  params: {
    category: string;
  };
}

const ShopPage = async ({ params }: ShopPageProps) => {
  const juiceProducts = await prismadb.category.findUnique({
    where: {
      name: "juice",
    },
    include: {
      products: true,
    },
  });

  const groceryProducts = await prismadb.category.findUnique({
    where: {
      name: "groceries",
    },
    include: {
      products: true,
    },
  });

  const juiceCount = juiceProducts?.products?.length || 0;
  const groceriesCount = groceryProducts?.products?.length || 0;
  const allProductsCount = juiceCount + groceriesCount;

  let pageCount = Math.ceil(allProductsCount / 9);
  if (params.category === "juice") {
    pageCount = Math.ceil(juiceCount / 9);
  } else if (params.category === "groceries") {
    pageCount = Math.ceil(groceriesCount / 9);
  }

  return (
    <div className="flex flex-col gap-10 ml-5 h-[1200px] border-l border-gray-400 pl-[80px]">
      <ShopProvider>
        <ProductTitle category={params.category} />
        <SearchBar />
        <ProductFilterBar minValue={1} maxValue={100} />
        <ProductSortBar />
        <ProductCardContainer category={params.category} />
        <Pagination pageCount={pageCount} />
      </ShopProvider>
    </div>
  );
};

export default ShopPage;
