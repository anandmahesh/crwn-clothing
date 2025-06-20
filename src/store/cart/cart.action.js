import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTIONS_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    let findCartItem = cartItems.find((cartItem) => (cartItem.id === productToAdd.id));
    let modifiedCartItems = [...cartItems];

    if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
    } else {
        modifiedCartItems.push(
            Object.assign({}, { ...productToAdd, quantity: 1 })
        )
    }
    return modifiedCartItems;
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    let findCartItem = cartItems.find((cartItem) => (cartItem.id === cartItemToRemove.id));

    if (findCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    } else {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id ?
                { ...cartItem, quantity: cartItem.quantity - 1 } :
                cartItem
        );
    }

}

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const toggleCart = (data) =>
    createAction(CART_ACTIONS_TYPES.TOGGLE_CART, data)

export const addItemToCart = (cartItems, productToAdd) =>
    createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd))

export const removeItemFromCart = (cartItems, cartItemToRemove) =>
    createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, cartItemToRemove));

export const clearItemFromCart = (cartItems, cartItemToClear) =>
    createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, clearCartItem(cartItems, cartItemToClear))