
import './directory-item.styles.scss';


const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <div className="directory-item-container">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className="body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );

}

export default DirectoryItem;