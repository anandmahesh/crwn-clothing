import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';


const CartIcon = () => {

    const { isCartOpen, cartItemCount, toggleCart } = useContext(CartContext);

    const handleClick = () => {
        toggleCart(!isCartOpen);
    }

    return (
        <CartIconContainer
            onClick={handleClick}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;