import { createSlice } from "@reduxjs/toolkit";


export const CATEGORYS_INITIAL_STATE = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'category',
    initialState: CATEGORYS_INITIAL_STATE,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        }
    }
})

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

// export const categoriesReducer = (state = CATEGORYS_INITIAL_STATE, action) => {
//     const { type, payload } = action;

//     switch (type) {
//         case CATEGORIES_TYPE.SET_CATEGORIES:
//             return {
//                 ...state,
//                 categories: payload
//             }
//         default:
//             return state;
//     }

// }