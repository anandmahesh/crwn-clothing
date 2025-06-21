import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'
//import { loggMiddleWare } from './middleware/logger';
//import { thunk } from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';


const presistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'categories']
}

const sagaMiddleware = createSagaMiddleware();

// control on the logger according to the enviorments
//process.env.NODE_ENV === "development"
//process.env.NODE_ENV === "production"
const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleware
    //  thunk
].filter(Boolean);
//const middleWares = [loggMiddleWare];

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(presistConfig, rootReducer);

//export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);