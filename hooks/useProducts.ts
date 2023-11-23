import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useProducts = (category: string, page: number) => {
  const { data, error, isLoading } = useSWR(
    `/api/products/${category}?page=${page}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useProducts;
