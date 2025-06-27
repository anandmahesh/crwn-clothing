import { Middleware } from "redux";
import { RootState } from "../store";

//Our own custom logger
export const loggMiddleWare: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("Prev State: ", store.getState());

    next(action);

    console.log("Next State: ", store.getState());
  };
