import { createContext, useState } from "react";


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

export const CartContext = createContext({
    isCartOpen: false,
    toggleCart: () => { },
    cartItems: [],
    addItemToCart: () => null,
    itemCount: 0,
    setItemCount: () => null
});

export const CartProvider = ({ children }) => {

    const [isCartOpen, toggleCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const [itemCount, setItemCount] = useState(20);

    const value = {
        isCartOpen,
        cartItems,
        itemCount,
        toggleCart,
        setItemCount,
        addItemToCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}