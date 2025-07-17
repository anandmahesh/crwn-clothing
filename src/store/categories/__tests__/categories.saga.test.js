import { testSaga, expectSaga } from "redux-saga-test-plan";
import {
  fetchCategoriesAsync,
  onFetchCategories,
  categoriesSaga,
} from "../categories.saga";
import { call } from "redux-saga/effects";
import { CATEGORIES_TYPE } from "../categories.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "../categories.action";
import { throwError } from "redux-saga-test-plan/providers";

describe("categories Saga", () => {
  test("categoriesSage", () => {
    //testSaga here is bheave as expect
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone()
  });

  test("onFetchCategories", () => {
    //testSaga here is bheave as expect
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_TYPE.FETCH_CATEGORIES_START,
        fetchCategoriesAsync)
      .next()
      .isDone()
  });

  //explorer second way to write saga test case excpectSaga
  test("fetchCategoriesAsync success", async () => {
    const mockCategoiesArray = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' }
    ]
    //it return us the promise
    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCategoriesAndDocuments), mockCategoiesArray]
      ])
      .put(fetchCategoriesSuccess(mockCategoiesArray))
      .run();
  });

  test("fetchCategoriesAsync failure", () => {
    const mockerError = Error('Test Error');
    //it return us the promise
    //
    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCategoriesAndDocuments), throwError(mockerError)]
      ])
      .put(fetchCategoriesFailed(mockerError))
      .run();
  });
});
