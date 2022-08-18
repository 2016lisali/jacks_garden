import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer.js";
import cartReducer from "./cartReducer.js";

const reducers = combineReducers({ cart: cartReducer, user: userReducer });
export const store = configureStore({
    reducer: reducers,
});
