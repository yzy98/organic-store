import prismadb from "@/lib/prismadb";
import { getCategoryNameById } from "@/lib/utils";
import ProductCard from "./ProductCard";

const ShopSideBar = async () => {
  const allCategories: any[] = await prismadb.category.findMany({
    include: {
      products: true,
    },
  });

  // TODO: get all sale products
  const saleProducts = await prismadb.product.findMany();
  const product = saleProducts[0];

  return (
    <div className="flex flex-col h-full w-[250px]">
      <div>SEARCH BOX</div>
      <div>PRICE FILTER</div>
      {allCategories.map((categoryObj, index) => (
        <p key={index}>
          {categoryObj.name} {categoryObj?.products?.length || 0}
        </p>
      ))}
      {/* TODO: */}
      <ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        image={product.image}
        category={getCategoryNameById(product.categoryId, allCategories || [])}
        size="sm"
      />
    </div>
  );
};

export default ShopSideBar;
