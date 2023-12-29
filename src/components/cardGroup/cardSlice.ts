import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface cardState
{
    income:number;
    expenses:number;
    savings:number;
}
const cardInitialState:cardState=
{ 
  income:0,
  expenses:0,
  savings:0,
}
export const cardSlice=createSlice({
    name:'CardInfo',
    initialState:cardInitialState,
    reducers:
    {
        setSavings:(state,action:PayloadAction<number>)=>
        {
          state.savings=action.payload;
        },
        setIncome:(state,action:PayloadAction<number>)=>
        {
            state.income=action.payload;
        },
        setExpense(state,action:PayloadAction<number>)
        {
            state.expenses+=action.payload;
        },
       clearData(state)
       {
         state.expenses=0;
         state.income=0;
         state.savings=0;
       } 
    }
})
export const {setSavings,setIncome,setExpense,clearData}=cardSlice.actions;
export const cardReducer=cardSlice.reducer;
