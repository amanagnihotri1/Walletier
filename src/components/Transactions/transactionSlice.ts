import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { TableData } from "../../app/TypeInterfaces";
export type tableObj=
{
expenseList:TableData[],
}
const initialState:tableObj={
    expenseList:[],  
};
export const transactionSlice=createSlice({
name:"transactionList",
initialState,
reducers:
{
   setTableData(state,action:PayloadAction<TableData[]>)
   {
     state.expenseList=action.payload;
   },
} 
});
export const {setTableData}=transactionSlice.actions;
export const tableReducer = transactionSlice.reducer;