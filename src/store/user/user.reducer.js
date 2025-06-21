import { createSlice } from "@reduxjs/toolkit";
// import { USER_ACTION_TYPE } from "./user.types";


const INITIAL_STATE = {
    currentUser: null
}

//combinatione of action types and reducers
export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) {
            //we are writing here the mutation but under the hood redux toolkit use the immutability through the package immer third party
            state.currentUser = action.payload;
        }
    }
})

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

// export const userReducerold = (state = INITIAL_STATE, action) => {
//     const { type, payload } = action;

//     switch (type) {
//         case USER_ACTION_TYPE.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser: payload
//             }
//         default:
//             return state;
//     }
// }

