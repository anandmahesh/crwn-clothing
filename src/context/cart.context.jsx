import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


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

export const CartContext = createContext({
    isCartOpen: false,
    toggleCart: () => { },
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    totalPrice: 0,
    cartItemCount: 0
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalPrice: 0,
    cartItemCount: 0
};

const CART_ACTIONS_TYPES = {
    TOGGLE_CART: 'TOGGLE_CART',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS_TYPES.TOGGLE_CART:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTIONS_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { isCartOpen, cartItems, cartItemCount, totalPrice } = state;

    const toggleCart = (status) => {
        dispatch(createAction(CART_ACTIONS_TYPES.TOGGLE_CART, status))
    }

    const updatCartItemsReducer = (newCartItems) => {
        let newCartCount = newCartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        let newCartTotal = newCartItems
            .reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(
            createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                totalPrice: newCartTotal,
                cartItemCount: newCartCount
            })
        );
    }

    const addItemToCart = (productToAdd) => {
        updatCartItemsReducer(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        updatCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        updatCartItemsReducer(
            cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
        )
    }

    const value = {
        isCartOpen,
        cartItems,
        cartItemCount,
        totalPrice,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        toggleCart,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}