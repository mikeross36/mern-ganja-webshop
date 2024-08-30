import { CartItemType } from "../../types";
import { formatCurrency } from "../../utils";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useShoppingCartDispatch } from "../../hooks";
import {
  decreaseQuantityAction,
  increaseQuantityAction,
  removeItemFromCartAction,
} from "../../shopping-cart-state/actions";
import { ShoppingCartActionType } from "../../shopping-cart-state/action-types";

export default function CartItem({ item }: { item: CartItemType }) {
  const itemImage = new URL(
    `../../assets/ganjas/${item.image}`,
    import.meta.url
  ).href;

  const dispatch = useShoppingCartDispatch();
  const subtotal = item.price * item.quantity;

  return (
    <li className="cart__item">
      <img src={itemImage} alt="cart item image" />
      <p className="cart__item-name">{item.name}</p>
      <p className="cart__item-name">{item.category}</p>
      <p>{formatCurrency(item.price)}</p>
      <div className="cart__item-quantity-btns">
        <button
          onClick={() =>
            dispatch(
              decreaseQuantityAction(
                item as CartItemType
              ) as unknown as ShoppingCartActionType
            )
          }
          className="quantity__button"
        >
          <FaMinusCircle size={20} />
        </button>
        <span className="cart__item-quantity">{item.quantity}</span>
        <button
          onClick={() =>
            dispatch(
              increaseQuantityAction(
                item as CartItemType
              ) as unknown as ShoppingCartActionType
            )
          }
          className="quantity__button"
        >
          <FaPlusCircle size={20} />
        </button>
        <p>total: {formatCurrency(subtotal)}</p>
        <button
          onClick={() =>
            dispatch(
              removeItemFromCartAction(
                item as CartItemType
              ) as unknown as ShoppingCartActionType
            )
          }
          className="cart__item-remove"
        >
          ❌
        </button>
      </div>
    </li>
  );
}
