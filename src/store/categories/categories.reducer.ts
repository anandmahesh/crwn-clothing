import { Category } from "./categories.types";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./categories.action";
import { UnknownAction } from "redux";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORYS_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORYS_INITIAL_STATE,
  action: UnknownAction
  //action = {} as CategoryAction //Descriminating union// only these action only our reducer respondes to
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      error: null,
      isLoading: false,
    };
  }

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;

  //   switch (action.type) {
  //     case CATEGORIES_TYPE.FETCH_CATEGORIES_START:
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     case CATEGORIES_TYPE.FETCH_CATEGORIES_SUCCESS:
  //       return {
  //         ...state,
  //         categories: action.payload,
  //         error: null,
  //         isLoading: false,
  //       };
  //     case CATEGORIES_TYPE.FETCH_CATEGORIES_ERROR:
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
};
