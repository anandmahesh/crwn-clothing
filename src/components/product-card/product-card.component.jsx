import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './product-card.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.reducer';


const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;

    const disptach = useDispatch();

    const addProductToCart = () => {
        disptach(addItemToCart(product));
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