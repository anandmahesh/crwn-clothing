import { CATEGORIES_TYPE } from "./categories.types";


export const CATEGORYS_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORYS_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_TYPE.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORIES_TYPE.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                error: null,
                isLoading: false
            }
        case CATEGORIES_TYPE.FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    }

}