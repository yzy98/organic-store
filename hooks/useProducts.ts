import fetcher from "@/lib/fetcher";
import useSWR from "swr";

interface useProductsParams {
  category: string;
  page: number;
  sort?: string;
  order?: string;
  minPrice?: number;
  maxPrice?: number;
}

const useProducts = ({
  category,
  page,
  sort,
  order,
  minPrice,
  maxPrice,
}: useProductsParams) => {
  const url = `/api/products/${category}?page=${page}`;

  const orderUrl = `&order=${order || "asc"}`; // default order by asc
  const sortUrl = sort ? `&sort=${sort}` + orderUrl : "";

  const minPriceUrl = minPrice ? `&min_price=${minPrice}` : "";
  const maxPriceUrl = maxPrice ? `&max_price=${maxPrice}` : "";
  const priceUrl = minPriceUrl + maxPriceUrl;

  const { data, error, isLoading } = useSWR(url + sortUrl + priceUrl, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default useProducts;
