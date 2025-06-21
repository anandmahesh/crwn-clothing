import { configureStore } from "@reduxjs/toolkit";
// import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer } from 'redux-persist'
// //import { loggMiddleWare } from './middleware/logger';



// const presistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user']
// }

// // control on the logger according to the enviorments
// //process.env.NODE_ENV === "development"
// //process.env.NODE_ENV === "production"
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);
// //const middleWares = [loggMiddleWare];

// const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// const persistedReducer = persistReducer(presistConfig, rootReducer);

// //export const store = createStore(rootReducer, undefined, composedEnhancers);
// export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleWares)
})

// export const persistor = persistStore(store);