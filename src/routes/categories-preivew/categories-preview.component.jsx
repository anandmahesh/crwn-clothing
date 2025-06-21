import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectorCategoriesMap } from '../../store/categories/categories.selectore';
import Spinner from '../../components/spinner/spinner.component';


const CategoriesPreview = () => {

    const categoriesMap = useSelector(selectorCategoriesMap);

    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {
                isLoading ? <Spinner /> : (
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
                )
            }
        </Fragment>
    );

}

export default CategoriesPreview;