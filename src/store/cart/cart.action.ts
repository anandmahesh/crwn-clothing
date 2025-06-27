import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";
import { CART_ACTIONS_TYPES, CartItem } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  let findCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  let modifiedCartItems = [...cartItems];

  if (findCartItem) {
    findCartItem.quantity = findCartItem.quantity + 1;
  } else {
    modifiedCartItems.push(Object.assign({}, { ...productToAdd, quantity: 1 }));
  }
  return modifiedCartItems;
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  let findCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (findCartItem && findCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type ToggleCart = ActionWithPayload<
  CART_ACTIONS_TYPES.TOGGLE_CART,
  boolean
>;

export type SetCartItem = ActionWithPayload<
  CART_ACTIONS_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const toggleCart = withMatcher(
  (data: boolean): ToggleCart =>
    createAction(CART_ACTIONS_TYPES.TOGGLE_CART, data)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItem =>
    createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => setCartItems(addCartItem(cartItems, productToAdd));

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => setCartItems(removeCartItem(cartItems, cartItemToRemove));

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => setCartItems(clearCartItem(cartItems, cartItemToClear));
