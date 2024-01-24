import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface monthlyData
{
    incomeGoal:number;
    savingGoal:number;
    expenseGoal:number;
}
const monthlyDataState:monthlyData=
{
    incomeGoal:0,
    expenseGoal:0,
    savingGoal:0
}
const monthlySlice=createSlice({
name:'MonthlyCardInfo',
initialState:monthlyDataState,
reducers:
{
    setMonthlyexpenseData(state,action:PayloadAction<number>)
    {
      state.expenseGoal=action.payload;
    },
    setMonthlyincomeData(state,action:PayloadAction<number>){
      state.incomeGoal=action.payload;  
    },
    setMonthlysavingData(state,action:PayloadAction<number>){
      state.savingGoal=action.payload;  
    },

}
});

