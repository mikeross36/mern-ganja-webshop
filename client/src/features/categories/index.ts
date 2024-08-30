import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ICategoryResponse, CategoryType } from "../../types";
import { getAllCategories, getCategory } from "../../api/categories";

export function useGetAllCategories() {
  const memoizedSelect = useCallback(
    (data: ICategoryResponse) => data.data.categories,
    []
  );
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    select: memoizedSelect,
  });
}

export function useGetCategory(id: string) {
  const memoizedSelect = useCallback((data: CategoryType) => data.ganjas, []);
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id) as Promise<CategoryType>,
    select: memoizedSelect,
  });
}
