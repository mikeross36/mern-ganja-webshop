import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addReview, getAllReviews } from "../../api/reviews";
import { toast } from "react-toastify";
import { IReviewResponse } from "../../types";

export function useAddReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      addReview(id, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useGetAllReviews() {
  const memoizedSelect = useCallback(
    (data: IReviewResponse) => data.data.reviews,
    []
  );
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllReviews(),
    select: memoizedSelect,
  });
}
