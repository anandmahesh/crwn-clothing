import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './product-card.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';


const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;

    const disptach = useDispatch();

    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => {
        disptach(addItemToCart(cartItems, product));
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`Product-${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='inverted' onClick={addProductToCart}>Add to card</Button>
        </div>
    );
}

export default ProductCard;