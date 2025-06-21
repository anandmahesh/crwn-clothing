import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'
//import { loggMiddleWare } from './middleware/logger';
import { thunk } from "redux-thunk";



const presistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'categories']
}

// control on the logger according to the enviorments
//process.env.NODE_ENV === "development"
//process.env.NODE_ENV === "production"
const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    thunk
].filter(Boolean);
//const middleWares = [loggMiddleWare];

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(presistConfig, rootReducer);

//export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);