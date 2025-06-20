import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectorCategoriesMap } from '../../store/categories/categories.selectore';


const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectorCategoriesMap);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    let products = categoriesMap[title];
                    return (
                        <CategoryPreview
                            key={title}
                            title={title}
                            products={products}
                        />
                    );
                })
            }
        </Fragment>
    );

}

export default CategoriesPreview;