import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
interface entrySlice
{
    entry_name:string,
    description:string,
    file?:string[],
    date?:Date,
};
const initialState:entrySlice=
{
    entry_name:'',
    description:'',
    file:[],
    date:new Date(),
}
const entryslice=createSlice({
    name:'entrySlice',
    initialState,
    reducers:{
      edit:(state:any,action:PayloadAction<entrySlice>)=>
      {
        state.entry_name=action.payload.entry_name;
        state.description=action.payload.description;
        state.file=action.payload.file;
        state.date=action.payload.date;
      },    
    } 
})
export const{edit}=entryslice.actions;
export default entryslice.reducer;
