import { CartItemType, GanjaType, ShippingAddressType } from "../types";
import { Dispatch } from "redux";
import {
  ShoppingCartActionType,
  ShoppingCartActionTypes,
} from "./action-types";

export function addItemToCartAction(
  ganja: GanjaType & { _id: string },
  quantity: number
) {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      if (!ganja._id) {
        throw new Error("Ganja item must have an _id");
      }
      const cartItem: CartItemType = {
        _id: ganja._id,
        name: ganja.name,
        image: ganja.coverImage,
        category: ganja.category,
        price: ganja.price,
        quantity: Number(quantity),
      };
      dispatch({
        type: ShoppingCartActionTypes.ADD_ITEM_TO_CART,
        payload: cartItem,
      });
    } catch (err) {
      throw new Error(`Error adding item to cart: ${err}`);
    }
  };
}

export function removeItemFromCartAction(cartItem: CartItemType) {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({
        type: ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART,
        payload: cartItem,
      });
    } catch (err) {
      throw new Error(`Error removig item from cart: ${err}`);
    }
  };
}

export function increaseQuantityAction(cartItem: CartItemType) {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({
        type: ShoppingCartActionTypes.INCREASE_QUANTITY,
        payload: cartItem,
      });
    } catch (err) {
      throw new Error(`Error increasing item quantity to cart: ${err}`);
    }
  };
}

export function decreaseQuantityAction(cartItem: CartItemType) {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({
        type: ShoppingCartActionTypes.DECREASE_QUANTITY,
        payload: cartItem,
      });
    } catch (err) {
      throw new Error(`Error decreasing item quantity to cart: ${err}`);
    }
  };
}

export function getTotalsAction() {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({ type: ShoppingCartActionTypes.GET_TOTALS });
    } catch (err) {
      throw new Error(`Error getting cart's total: ${err}`);
    }
  };
}

export function clearShoppingCartAction() {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({ type: ShoppingCartActionTypes.CLEAR_SHOPPING_CART });
    } catch (err) {
      throw new Error(`Error clearing shopping cart: ${err}`);
    }
  };
}

export function saveShippingAddressAction(data: ShippingAddressType) {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({
        type: ShoppingCartActionTypes.SAVE_SHIPPING_ADDRESS,
        payload: data,
      });
    } catch (err) {
      throw new Error(`Error saving shipping address: ${err}`);
    }
  };
}

export function clearShippingAddressAction() {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({ type: ShoppingCartActionTypes.CLEAR_SHIPPING_ADDRESS });
    } catch (err) {
      throw new Error(`Error clearing shipping address: ${err}`);
    }
  };
}

export function savePaymentMethodAction(data: string) {
  return function (dispatch: Dispatch<ShoppingCartActionType>) {
    try {
      dispatch({
        type: ShoppingCartActionTypes.SAVE_PAYMENT_METHOD,
        payload: data,
      });
    } catch (err) {
      throw new Error(`Error saving payment method: ${err}`);
    }
  };
}
