import { useContext } from 'react';
import './checkout.styles.jsx';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';


const Checkout = () => {

    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock className='header-block'>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock className='header-block'>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock className='header-block'>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock className='header-block'>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem
                            key={cartItem.id}
                            cartItem={cartItem}
                        />
                    )
                })
            }
            <Total>Total: ${totalPrice}</Total>
        </CheckoutContainer>
    );

}

export default Checkout;