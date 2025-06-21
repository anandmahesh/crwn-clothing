import { toggleCart } from '../../store/cart/cart.reducer';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';


const CartIcon = () => {

    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemCount = useSelector(selectCartCount);

    const handleClick = () => {
        dispatch(toggleCart(!isCartOpen));
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