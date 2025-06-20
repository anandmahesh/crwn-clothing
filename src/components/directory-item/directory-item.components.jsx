
import './directory-item.styles.jsx';
import { BackgroundImage, BodyContainer, DirectoryItemContainer } from './directory-item.styles.jsx';


const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
            <BodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </BodyContainer>
        </DirectoryItemContainer>
    );

}

export default DirectoryItem;