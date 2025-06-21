import './cart-item.styles.scss';
import { memo } from 'react';

const CartItem = ({ cartItem }) => {

    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`Cart Item ${name}`} />
            <span className="name">{name}</span>
            <div className='item-details'>
                <span className="price">
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );

};

export default memo(CartItem);