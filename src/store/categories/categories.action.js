import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_TYPE } from "./categories.types";

export const setCategories = (categories) =>
    createAction(CATEGORIES_TYPE.SET_CATEGORIES, categories)