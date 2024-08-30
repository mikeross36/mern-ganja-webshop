import { useCallback } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CartItemType, IOrderResponse, ShippingAddressType } from "../../types";
import {
  createOrder,
  deliverOrder,
  getOrder,
  getPaypalClient,
  getUserOrders,
  payOrder,
} from "../../api/orders";
import { toast } from "react-toastify";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: {
      orderItems: CartItemType[];
      shippingAddress: ShippingAddressType;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) => createOrder(order),
    onMutate: () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      queryClient.cancelQueries({ queryKey: ["orders"] });
    },
    onError: (err, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(["orders"], context);
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", { id }],
    queryFn: () => getOrder(id),
  });
};

export const usePayOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentDetails: { orderId: string }) =>
      payOrder(paymentDetails),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetPaypalClientId = () => {
  return useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: () => getPaypalClient(),
  });
};

export const useDeliverOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => deliverOrder(orderId),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetUserOrders = () => {
  const memoizedSelect = useCallback(
    (data: IOrderResponse) => data.data.orders,
    []
  );
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: () => getUserOrders(),
    select: memoizedSelect,
  });
};

// export function useGetAllCategories() {
//   const memoizedSelect = useCallback(
//     (data: ICategoryResponse) => data.data.categories,
//     []
//   );
//   return useQuery({
//     queryKey: ["categories"],
//     queryFn: () => getAllCategories(),
//     select: memoizedSelect,
//   });
// }
