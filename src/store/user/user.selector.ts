import { createSelector } from "reselect";
import { UserIntialState } from "./user.reducer";

export const selectUserReducer = (state): UserIntialState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userReducer) => userReducer.currentUser
);
