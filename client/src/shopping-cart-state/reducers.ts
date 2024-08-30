import { CartItemType, ShippingAddressType } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCartActionTypes } from "./action-types";

export type ShoppingCartStateType = {
  cartItems: CartItemType[];
  cartTotal: number;
  itemsTotal: number;
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

export type ActionType = {
  type: string;
  payload?: CartItemType;
};

const initialState = {
  cartItems: [],
  cartTotal: 0,
  itemsTotal: 0,
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const EMPTY_CART: CartItemType[] = [];

export function shoppingCartReducer(
  state = initialState as unknown as ShoppingCartStateType,
  // action is not ShoppingCartActionType 'cause we use it to get payload
  action: PayloadAction<CartItemType>
) {
  switch (action.type) {
    case ShoppingCartActionTypes.ADD_ITEM_TO_CART: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      let cartItemsCopy: CartItemType[] = [...state.cartItems];

      const currItemIdx = cartItemsCopy.findIndex(
        (item) => item._id === action.payload._id
      );
      if (currItemIdx < 0) {
        cartItemsCopy = [...cartItemsCopy, action.payload];
      } else {
        const currItemCopy = cartItemsCopy[currItemIdx];
        cartItemsCopy[currItemIdx] = {
          ...currItemCopy,
          quantity: currItemCopy.quantity + 1,
        };
      }
      return { ...state, cartItems: cartItemsCopy };
    }
    case ShoppingCartActionTypes.REMOVE_ITEM_FROM_CART: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }
    case ShoppingCartActionTypes.INCREASE_QUANTITY: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      const updatedCartItems: CartItemType[] = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }
    case ShoppingCartActionTypes.DECREASE_QUANTITY: {
      if (!action.payload || !action.payload._id) {
        return state;
      }
      const MIN_QUANTITY = 0;
      const updatedCartItems: CartItemType[] = state.cartItems
        .map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > MIN_QUANTITY);

      return { ...state, cartItems: updatedCartItems };
    }
    case ShoppingCartActionTypes.GET_TOTALS: {
      let {
        cartTotal,
        itemsTotal,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPrice,
      } = state.cartItems.reduce(
        (acc, { price, quantity }) => {
          const currItemTotal = price * quantity;
          acc.cartTotal += currItemTotal;
          acc.itemsTotal += quantity;
          return acc;
        },
        {
          cartTotal: 0,
          itemsTotal: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
          itemsPrice: 0,
        }
      );
      if (isNaN(cartTotal) || isNaN(itemsTotal)) {
        console.error("Invalid calculation result");
        return state;
      }
      cartTotal = Number(cartTotal);
      itemsTotal = Number(itemsTotal);
      shippingPrice = cartTotal * 0.1;
      taxPrice = shippingPrice * 0.15;
      totalPrice = cartTotal + shippingPrice + taxPrice;
      itemsPrice = cartTotal;

      return {
        ...state,
        cartTotal,
        itemsTotal,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPrice,
      };
    }
    case ShoppingCartActionTypes.CLEAR_SHOPPING_CART: {
      let cartItemsCopy: CartItemType[] = [...state.cartItems];
      cartItemsCopy = EMPTY_CART;
      // const confirmed = window.confirm("Are you sure you want to clear cart?");
      // if (confirmed) cartItemsCopy = EMPTY_CART;
      return { ...state, cartItems: cartItemsCopy };
    }
    case ShoppingCartActionTypes.CLEAR_SHIPPING_ADDRESS: {
      return { ...state, shippingAddress: {} };
    }
    case ShoppingCartActionTypes.SAVE_SHIPPING_ADDRESS: {
      return { ...state, shippingAddress: action.payload };
    }
    case ShoppingCartActionTypes.SAVE_PAYMENT_METHOD: {
      return { ...state, paymentMethod: action.payload };
    }
    default:
      return state;
  }
}
