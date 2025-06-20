import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EpmtyMessage } from './cart-dropdown.styles';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';


const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
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