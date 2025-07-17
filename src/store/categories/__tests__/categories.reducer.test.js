import { screen } from 'react-redux';
import {
    categoriesReducer,
    CATEGORYS_INITIAL_STATE
} from '../categories.reducer';
import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailed
} from '../categories.action';

describe("Categories Reducer Tests", () => {

    test("Test fetchCategoriesStart", () => {
        const expectedState = {
            ...CATEGORYS_INITIAL_STATE,
            isLoading: true,
        };

        expect(categoriesReducer(CATEGORYS_INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedState);
    });

    test("Test fetchCategoriesSuccess", () => {
        const mockCategories = [
            {
                title: 'mens',
                imageUrl: 'test',
                items: [
                    { id: 1, name: 'Product 1' },
                    { id: 1, name: 'Product 2' }
                ]
            },
            {
                title: 'Womens',
                imageUrl: 'test',
                items: [
                    { id: 1, name: 'Product 3' },
                    { id: 1, name: 'Product 4' }
                ]
            }
        ];
        const expectedState = {
            ...CATEGORYS_INITIAL_STATE,
            categories: mockCategories,
            error: null,
            isLoading: false,
        };

        expect(categoriesReducer(CATEGORYS_INITIAL_STATE, fetchCategoriesSuccess(mockCategories))).toEqual(expectedState);
    });

    test("Test fetchCategoriesFailed", () => {
        const mockError = new Error('Test Error');
        const expectedState = {
            ...CATEGORYS_INITIAL_STATE,
            isLoading: false,
            error: mockError,
        };

        expect(categoriesReducer(CATEGORYS_INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState);
    });

})