import { useDispatch, useSelector } from 'react-redux';
import './checkout-item.styles.scss';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';


const CheckoutItem = ({ cartItem }) => {

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    let { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

    const addItem = () => dispatch(addItemToCart(cartItems, cartItem));

    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`Checkout Item ${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow"
                    onClick={removeItem}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className="arrow"
                    onClick={addItem}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove'
                onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    );
}
export default CheckoutItem