import { createContext, useEffect, useState } from "react";


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

export const CartProvider = ({ children }) => {

    const [isCartOpen, toggleCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let cartItemCount = cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
        setCartItemCount(cartItemCount);

        let totalP = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setTotalPrice(totalP);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(
            cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
        )
    }

    const value = {
        isCartOpen,
        cartItems,
        cartItemCount,
        toggleCart,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        totalPrice
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}