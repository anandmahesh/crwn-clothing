
import { useNavigate } from 'react-router-dom';
import './directory-item.styles.jsx';
import { BackgroundImage, BodyContainer, DirectoryItemContainer } from './directory-item.styles.jsx';


const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const handler = () => {
        navigate(route);
    }

    return (
        <DirectoryItemContainer
            onClick={handler}>
            <BackgroundImage imageUrl={imageUrl} />
            <BodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </BodyContainer>
        </DirectoryItemContainer>
    );

}

export default DirectoryItem;