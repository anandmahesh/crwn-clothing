import { Middleware, UnknownAction } from "redux";
import { RootState } from "../store";

//Our own custom logger
export const loggMiddleWare: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const typedAction = action as UnknownAction;
    if (!typedAction.type) {
      return next(action);
    }

    console.log("type: ", typedAction.type);
    console.log("payload: ", typedAction.payload);
    console.log("Prev State: ", store.getState());

    next(action);

    console.log("Next State: ", store.getState());
  };
