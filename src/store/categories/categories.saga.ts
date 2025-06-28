// import { takeLatest, all, call, put } from "redux-saga/effects";
import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action";
import { CATEGORIES_TYPE } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    const categoryArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoryArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
