import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Auth/authSlice";
import {cardReducer} from "../components/cardGroup/cardSlice";
import { tableReducer } from "../components/Transactions/transactionSlice";
export const store=configureStore({
reducer:{
    authReducer:authSlice,
    transReducer:tableReducer,
    cardSlice:cardReducer
},   
});
export type RootState=typeof store;
export type AppDispatch = typeof store.dispatch;
export default store;