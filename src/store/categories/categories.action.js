import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_TYPE } from "./categories.types";

export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_TYPE.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categories) =>
    createAction(CATEGORIES_TYPE.FETCH_CATEGORIES_SUCCESS, categories)

export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORIES_TYPE.FETCH_CATEGORIES_SUCCESS, error)

export const fetchCategoriesAsync = () => async(dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoryArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}