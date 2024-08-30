import { useQuery } from "@tanstack/react-query";
import { getAllGanjas, getGanja } from "../../api/ganjas";
import { useCallback } from "react";
import { IGanjasResponse } from "../../types";

export function useGetAllGanjas() {
  const memoizedSelect = useCallback(
    (data: IGanjasResponse) => data.data.ganjas,
    []
  );
  return useQuery({
    queryKey: ["ganjas"],
    queryFn: () => {
      return getAllGanjas();
    },
    select: memoizedSelect,
  });
}

export function useGetGanja(id: string) {
  const memoizedSelect = useCallback(
    (data: IGanjasResponse) => data.data.ganja,
    []
  );
  return useQuery({
    queryKey: ["ganjas", id],
    queryFn: () => getGanja(id),
    select: memoizedSelect,
  });
}
