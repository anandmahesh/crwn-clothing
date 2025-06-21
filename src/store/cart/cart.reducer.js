import { createSlice } from "@reduxjs/toolkit";

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

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {

        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload)
        },

        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload)
        },

        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload)
        },

        toggleCart(state, action) {
            state.isCartOpen = action.payload;
        }

    }
})

export const { addItemToCart, removeItemFromCart, clearItemFromCart, toggleCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
// export const cartReducer = (state = CART_INITIAL_STATE, action) => {
//     const { type, payload } = action;

//     switch (type) {
//         case CART_ACTIONS_TYPES.TOGGLE_CART:
//             return {
//                 ...state,
//                 isCartOpen: payload
//             }
//         case CART_ACTIONS_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 cartItems: payload
//             }
//         default:
//             return state;
//     }
// }