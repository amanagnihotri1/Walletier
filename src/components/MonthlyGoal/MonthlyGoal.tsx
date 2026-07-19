/* eslint-disable react-hooks/exhaustive-deps */
import '@mantine/core/styles/Tooltip.css';
import React,{useEffect, useState } from "react";
import axios from "axios";
import CountUp from 'react-countup';
import styles from "../MonthlyGoal/monthlyGoal.module.scss";
import { format,subMonths } from 'date-fns';
import { MonthPickerInput } from '@mantine/dates';
import {setMonthlyData } from "./monthlyDataSlice";
import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { useSelector,useDispatch } from "react-redux";
import {ReactComponent as ArrowRightUp} from "../../assets/arrowRightUp.svg";
import {ReactComponent as ArrowRightDown} from "../../assets/arrowRightDown.svg";
const MonthlyGoal=({uid}:{uid:String})=>{
  const dispatch=useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[dateVal,setDateVal]=useState<Date | null | undefined>();
const incomeVal=useSelector((state:any)=>state.monthlyDataReducer.income);
const expenseVal=useSelector((state:any)=>state.monthlyDataReducer.expense);
const savingsVal=useSelector((state:any)=>state.monthlyDataReducer.moneySaved);
const incomComp=useSelector((state:any)=>state.monthlyDataReducer.prevMonthIncomeComp);
const expenseComp=useSelector((state:any)=>state.monthlyDataReducer.prevMonthExpenseComp);
const savingComp=useSelector((state:any)=>state.monthlyDataReducer.prevMonthSavingComp);
const data = [
  { title: 'Income', value: incomeVal, diff:incomComp,icon:incomComp>0?'up':'down' },
  { title: 'Expense', value:expenseVal, diff: expenseComp,icon:expenseComp>0?'up':'down' },
  { title: 'Savings', value: savingsVal, diff: savingComp,icon:savingComp>0?'up':'down'},
];
const calcDiff=(currMonth:number,lastMonthData:number):number=>
{
  let newVal:number=currMonth-lastMonthData;
  let dataValue:number=parseInt(((newVal/lastMonthData)*100).toFixed(2));
  dataValue<0 && (dataValue=0)
  return dataValue;
}
const handleChange=async(e:any)=>
{
  const dateString=format(e,"MM/dd/yyyy");
  const resultData=await axios.get(`${process.env.REACT_APP_BASE_URL}/particularMonthData?dateVal=${dateString}&useremail=${localStorage.getItem("useremail")}`);
  console.log(resultData);
  const lastDateString=subMonths(dateString,1);
  const lastMonthDateString=format(lastDateString,'MM/dd/yyyy');
  const prevMonthResult=await axios.get(`${process.env.REACT_APP_BASE_URL}/particularMonthData?dateVal=${lastMonthDateString}&useremail=${localStorage.getItem("useremail")}`);
  let expenseVal:number=parseInt(resultData?.data.Expense);
  let incomeVal:number=parseInt(resultData?.data.Income);
  let currSavings:number=incomeVal-expenseVal;
  currSavings<0 && (currSavings=0)
  let prevMonthExpense=calcDiff(parseInt(resultData?.data.Expense),parseInt(prevMonthResult?.data.Expense));
  let prevMonthIncome=calcDiff(parseInt(resultData?.data.Income),parseInt(prevMonthResult?.data.Income));
  let prevMonthSavingNumber:number=prevMonthIncome-prevMonthExpense;
  prevMonthSavingNumber<0 &&(prevMonthSavingNumber=0)
  let prevMonthSavingComp=calcDiff(currSavings,prevMonthSavingNumber);
  dispatch(setMonthlyData({
    expense:expenseVal,
    income:incomeVal,
    savingVal:currSavings,
    prevMonthExpense:Number(prevMonthExpense.toFixed(2)),
    prevMonthIncome:Number(prevMonthIncome.toFixed(2)),
    prevMonthSaving:Number(prevMonthSavingComp.toFixed(2)),
  }));
}
useEffect(()=>
{
const call=async()=>
{
  const dateString=format(new Date(),"MM/dd/yyyy");
  const currMonthData:any=await axios.get(`${process.env.REACT_APP_BASE_URL}/particularMonthData?dateVal=${dateString}&useremail=${localStorage.getItem("useremail")}`);
  const prevMonthDateString=format(subMonths(dateString,1),"MM/dd/yyyy");
  const prevMonthData=await axios.get(`${process.env.REACT_APP_BASE_URL}/particularMonthData?dateVal=${prevMonthDateString}&useremail=${localStorage.getItem("useremail")}`);
  const savingVal:number=parseInt(currMonthData?.data?.Income)-parseInt(currMonthData?.data.Expense);
  const incomeVal:number=parseInt(currMonthData?.data?.Income);
  const expenseVal:number=parseInt(currMonthData?.data.Expense);
  const incomeComp=calcDiff(parseInt(currMonthData?.data.Income),parseInt(prevMonthData?.data.Income));
  const expenseComp=calcDiff(parseInt(currMonthData?.data.Expense),parseInt(prevMonthData?.data.Expense));
  const prevSavingVal:number=parseInt(prevMonthData?.data.Income)-parseInt(prevMonthData?.data.Expense);
  const savingValComp:number=calcDiff(savingVal,prevSavingVal);
  dispatch(setMonthlyData({ 
    expense:expenseVal,
    income:incomeVal,
    savingVal,
    prevMonthExpense:parseInt(expenseComp.toFixed(2)),
    prevMonthIncome:parseInt(incomeComp.toFixed(2)),
    prevMonthSaving:parseInt(savingValComp.toFixed(2))}));
  }    
call();
},[dispatch]);
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ?ArrowRightUp:ArrowRightDown;
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
      <Group justify="apart">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={styles.label}>
            {stat.title}
          </Text>
          <Text fw={700} fz="5xl" size={"5xl"} c={"#000"}>
          ₹ <CountUp start={0} end={stat.value} duration={1}/>
          </Text>
        </div>
        <ThemeIcon
            color="slate"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={38}
            radius="md"
            pt={"8"}
          >
            <DiffIcon  stroke={'1.5'} />
          </ThemeIcon>
      </Group>
        <Text c="dimmed" fz="sm" mt="md">
        <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
          {isNaN(stat.diff)?'N/A':`${stat.diff}%`}
        </Text>{' '}
        {isNaN(stat.diff)?'Data not available':(stat.diff > 0 ? 'increase compared to last month' : 'decrease compared to last month')}
      </Text>
    </Paper>
    );
  });
  return (
   <>
    <div className={styles['subHeading']}>
    <div style={{fontWeight:'600',fontSize:'1.2rem',margin:'0',letterSpacing:'0.2px'}}>
     Monthly Stats 
    </div>
  <MonthPickerInput
     placeholder="Pick Month"
     clearable
     className={styles.pickerWrapper}
     leftSection={<i className="uil uil-calender" style={{color:'#000',fontSize:'16px'}}></i>}
     value={dateVal}
     onChange={handleChange}
     defaultValue={new Date()}
     /> 
     </div>
  <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
     </>
)};
export default React.memo(MonthlyGoal);