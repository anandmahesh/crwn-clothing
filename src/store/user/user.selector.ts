import { createSelector } from "reselect";
import { UserIntialState } from "./user.reducer";
import { RootState } from "../store";

export const selectUserReducer = (state: RootState): UserIntialState =>
  state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userReducer) => userReducer.currentUser
);
