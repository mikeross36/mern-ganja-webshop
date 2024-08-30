import {
  CartItemType,
  IOrderResponse,
  OrderType,
  ShippingAddressType,
} from "../../types";
import { apiClient } from "../apiClient";

export async function createOrder(order: {
  orderItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}) {
  return (
    await apiClient.post<{ message: string; order: OrderType }>("orders", order)
  ).data;
}

export async function getOrder(id: string) {
  return (await apiClient.get<OrderType>(`orders/${id}`)).data;
}

export async function payOrder(paymentDetails: { orderId: string }) {
  return (
    await apiClient.put<{ message: string; order: OrderType }>(
      `orders/${paymentDetails.orderId}/pay-order`,
      paymentDetails
    )
  ).data;
}

export async function getPaypalClient() {
  return (await apiClient.get<{ clientId: string }>("keys/paypal")).data;
}

export async function deliverOrder(orderId: string) {
  return (
    await apiClient.put<{
      status: string;
      message: string;
      order: OrderType;
    }>(`orders/${orderId}/deliver-order`)
  ).data;
}

export async function getUserOrders() {
  return (await apiClient.get<IOrderResponse>("orders/user-orders")).data;
}
