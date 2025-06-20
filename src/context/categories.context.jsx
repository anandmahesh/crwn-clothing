import { createContext, useEffect, useState } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase.utils";
import SHOP_DATA from "../shop-data";


export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    //To store the products in firestore database single time
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
        //addCollectionAndDocuments("categories", SHOP_DATA);
    }, []);

    const value = {
        categoriesMap
    }

    return (
        <CategoriesContext.Provider
            value={value}
        >
            {children}
        </CategoriesContext.Provider>
    );
}