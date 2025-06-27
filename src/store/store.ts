import { createStore, compose, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
//import { loggMiddleWare } from './middleware/logger';
//import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPresistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const presistConfig: ExtendedPresistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  //blacklist: ["user", "categories"],
};

const sagaMiddleware = createSagaMiddleware();

// control on the logger according to the enviorments
//process.env.NODE_ENV === "development"
//process.env.NODE_ENV === "production"
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
  //  thunk
].filter((middleware): middleware is Middleware => Boolean(middleware));
//const middleWares = [loggMiddleWare];

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(presistConfig, rootReducer);

//export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
