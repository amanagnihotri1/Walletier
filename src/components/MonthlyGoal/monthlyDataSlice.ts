import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface monthlyData
{
    income:number;
    expense:number;
    moneySaved:number;
    prevMonthSavingComp:number;
    prevMonthIncomeComp:number;
    prevMonthExpenseComp:number;
}
const monthlyDataState:monthlyData=
{
    income:0,
    expense:0,
    moneySaved:0,
    prevMonthSavingComp:0,
    prevMonthIncomeComp:0,
    prevMonthExpenseComp:0
}
const monthlySlice=createSlice({
name:'MonthlyCardInfo',
initialState:monthlyDataState,
reducers:
{
    setMonthlyData(state,action:PayloadAction<{expense:number,income:number,savingVal:number,prevMonthSaving:number,prevMonthIncome:number,prevMonthExpense:number}>)
    {
      state.expense=action.payload.expense;
      state.income=action.payload.income;
      state.moneySaved=action.payload.savingVal;
      state.prevMonthExpenseComp=action.payload.prevMonthExpense;
      state.prevMonthIncomeComp=action.payload.prevMonthIncome;
      state.prevMonthSavingComp=action.payload.prevMonthSaving;
    },
}
});
export const{setMonthlyData}=monthlySlice.actions;
export const monthlyDataReducer=monthlySlice.reducer;

