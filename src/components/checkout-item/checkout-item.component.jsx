import { useDispatch } from 'react-redux';
import './checkout-item.styles.scss';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.reducer';


const CheckoutItem = ({ cartItem }) => {

    const dispatch = useDispatch();

    
    let { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem))

    const addItem = () => dispatch(addItemToCart(cartItem));

    const removeItem = () => dispatch(removeItemFromCart(cartItem));

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