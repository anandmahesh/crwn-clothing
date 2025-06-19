import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';


const CartIcon = () => {

    const { isCartOpen, cartItemCount, toggleCart } = useContext(CartContext);

    const handleClick = () => {
        toggleCart(!isCartOpen);
    }

    return (
        <div className="cart-icon-container"
            onClick={handleClick}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartItemCount}</span>
        </div>
    );
}

export default CartIcon;