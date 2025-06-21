import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preivew/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/categories/categories.reducer';


const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryArray = await getCategoriesAndDocuments();
            console.log(categoryArray);
            dispatch(setCategories(categoryArray));
        }

        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default Shop;