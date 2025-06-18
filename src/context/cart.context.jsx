import { createContext, useState } from "react";


export const CartContext = createContext({
    isCartOpen: false,
    toggleCart: () => { },
    itemCount: 0,
    setItemCount: () => null
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, toggleCart] = useState(false);
    const [itemCount, setItemCount] = useState(20);

    const value = {
        isCartOpen,
        itemCount,
        toggleCart,
        setItemCount
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}