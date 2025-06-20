import './checkout.styles.jsx';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector.js';


const Checkout = () => {

    const cartItems = useSelector(selectCartItems);

    const totalPrice = useSelector(selectCartTotal);

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