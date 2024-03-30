import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface cardState
{
    income:number;
    expenses:number;
    savings:number;
    incomeGraph:[],
    expenseGraph:[],
}
const cardInitialState:cardState=
{ 
  income:0,
  expenses:0,
  savings:0,
  incomeGraph:[],
  expenseGraph:[],
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
            state.expenses=action.payload;
        },
        setIncomeGraph(state,action:PayloadAction<[]>){
          state.incomeGraph=action.payload;
        },
        setExpenseGraph(state,action:PayloadAction<[]>){
          state.expenseGraph=action.payload;
        },
       clearData(state)
       {
         state.expenses=0;
         state.income=0;
         state.savings=0;
         state.expenseGraph=[];
         state.incomeGraph=[];
       } 
    }
})
export const {setSavings,setIncome,setExpense,clearData,setIncomeGraph,setExpenseGraph}=cardSlice.actions;
export const cardReducer=cardSlice.reducer;
