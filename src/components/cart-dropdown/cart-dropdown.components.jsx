import { useContext } from 'react';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EpmtyMessage } from './cart-dropdown.styles';


const CartDropdown = () => {

    const { cartItems, toggleCart } = useContext(CartContext);

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
        toggleCart(false);
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    (cartItems.length) ? (
                        cartItems.map(cartItem => (
                            <CartItem
                                key={cartItem.id}
                                cartItem={cartItem} />
                        ))
                    ) : (
                        <EpmtyMessage>Your cart is empty</EpmtyMessage>
                    )
                }
            </CartItems>
            <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );

}

export default CartDropdown;