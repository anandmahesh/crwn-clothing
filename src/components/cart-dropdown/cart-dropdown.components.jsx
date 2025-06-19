import { useContext } from 'react';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {

    const { cartItems, toggleCart } = useContext(CartContext);

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
        toggleCart(false);
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map(cartItem => (
                        <CartItem
                            key={cartItem.id}
                            cartItem={cartItem} />
                    ))
                }
            </div>
            <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>
        </div>
    );

}

export default CartDropdown;