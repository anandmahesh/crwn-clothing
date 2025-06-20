import { createStore, compose, applyMiddleware } from 'redux';
//import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

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

//const middleWares = [logger];
const middleWares = [loggMiddleWare];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);