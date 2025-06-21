import { createStore, compose, applyMiddleware } from 'redux';
//import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'

const loggMiddleWare = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("Prev State: ", store.getState());

    next(action);

    console.log("Next State: ", store.getState());

}

const presistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

//const middleWares = [logger];
const middleWares = [loggMiddleWare];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(presistConfig, rootReducer);

//export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);