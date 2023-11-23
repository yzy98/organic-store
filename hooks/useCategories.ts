import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCategories = () => {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default useCategories;
