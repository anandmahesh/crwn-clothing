import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preivew/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { fetchCategoriesAsync, fetchCategoriesStart, setCategories } from '../../store/categories/categories.action';
import { useDispatch } from 'react-redux';


const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        //Using redux-saga
        dispatch(fetchCategoriesStart());

        //Using thunk
        //dispatch(fetchCategoriesAsync());
        // const getCategoriesMap = async () => {
        //     const categoryArray = await getCategoriesAndDocuments();
        //     console.log(categoryArray);
        //     dispatch(setCategories(categoryArray));
        // }

        // getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default Shop;