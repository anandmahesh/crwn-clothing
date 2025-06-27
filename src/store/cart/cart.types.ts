import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTIONS_TYPES {
  TOGGLE_CART = "cart/TOGGLE_CART",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
