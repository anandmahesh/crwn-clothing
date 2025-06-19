import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({ cartItem }) => {

    const { removeItemFromCart, clearItemFromCart, addItemToCart} = useContext(CartContext);


    let { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
    }

    const addItem = () => addItemToCart(cartItem);

    const removeItem = () => removeItemFromCart(cartItem);

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