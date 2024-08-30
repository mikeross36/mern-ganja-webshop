import { CartItemType } from "../types";
import { formatCurrency } from "../utils";

export default function ShippingItem({ item }: { item: CartItemType }) {
  const itemImage = new URL(`../assets/ganjas/${item.image}`, import.meta.url)
    .href;

  return (
    <li className="shipping__item">
      <p>{item.name}</p>
      <img src={itemImage} alt="shipping item image" />
      <span>quantity: {item.quantity}</span>
      <span>price: {formatCurrency(item.price)}</span>
      <span>subtotal: {formatCurrency(item.price * item.quantity)}</span>
    </li>
  );
}
