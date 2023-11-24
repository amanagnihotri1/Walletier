import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Auth/authSlice";
export const store=configureStore({
reducer:{
    authReducer:authSlice,
},   
});
export type AppDispatch = typeof store.dispatch;
export default store;