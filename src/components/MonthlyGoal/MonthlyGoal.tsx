/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CountUp from 'react-countup';
import styles from "../MonthlyGoal/monthlyGoal.module.scss";
import { format, subMonths } from 'date-fns';
import { MonthPickerInput } from '@mantine/dates';
import { setMonthlyData } from "./monthlyDataSlice";
import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ArrowRightUp } from "../../assets/arrowRightUp.svg";
import { ReactComponent as ArrowRightDown } from "../../assets/arrowRightDown.svg";
import apiCall from '../../utils/apiService';
import { MonthData } from '../../app/TypeInterfaces';

const MonthlyGoal = ({ uid }: { uid: String }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateVal, setDateVal] = useState<Date | null | undefined>();
  const incomeVal = useSelector((state: any) => state.monthlyDataReducer.income);
  const expenseVal = useSelector((state: any) => state.monthlyDataReducer.expense);
  const savingsVal = useSelector((state: any) => state.monthlyDataReducer.moneySaved);
  const incomComp = useSelector((state: any) => state.monthlyDataReducer.prevMonthIncomeComp);
  const expenseComp = useSelector((state: any) => state.monthlyDataReducer.prevMonthExpenseComp);
  const savingComp = useSelector((state: any) => state.monthlyDataReducer.prevMonthSavingComp);

  const data = [
    { title: 'Income', value: incomeVal, diff: incomComp, icon: incomComp > 0 ? 'up' : 'down' },
    { title: 'Expense', value: expenseVal, diff: expenseComp, icon: expenseComp > 0 ? 'up' : 'down' },
    { title: 'Savings', value: savingsVal, diff: savingComp, icon: savingComp > 0 ? 'up' : 'down' },
  ];

  const calcDiff = (currMonth: number, lastMonthData: number): number => {
    let newVal: number =currMonth - lastMonthData;
    console.log("currMonth", currMonth);
    console.log("lastMonthData", lastMonthData);
    let dataValue:number =parseInt(String((newVal / lastMonthData) * 100));
    console.log("dataValue", dataValue);
    dataValue < 0 && (dataValue = 0);
    return dataValue;
  };

  const handleChange = async (e: any) => {
    const selectedDate = new Date(e);
    console.log(selectedDate);
    const dateString = format(selectedDate, "MM/dd/yyyy");
    const { data: resultData } = await apiCall<MonthData>('GET', '/particularMonthData', undefined, {
      dateVal: dateString,
      useremail: localStorage.getItem("useremail"),
      userId: localStorage.getItem("uid"),
    });
    console.log("currentMonthResult", resultData);
    const prevMonthDate = subMonths(selectedDate, 1);
    console.log("prevMonthDate", prevMonthDate);
    const lastMonthDateString = format(prevMonthDate, 'MM/dd/yyyy');
    console.log(lastMonthDateString,"*****54*****");
    const { data: prevMonthResult } = await apiCall<MonthData>('GET', '/particularMonthData', undefined, {
      dateVal: lastMonthDateString,
      useremail: localStorage.getItem("useremail"),
      userId: localStorage.getItem("uid"),
    });
    console.log("prevMonthResult", prevMonthResult);
    let expenseVal: number = parseInt(String(resultData?.Expense || 0));
    let incomeVal: number = parseInt(String(resultData?.Income || 0));
    let currSavings: number = incomeVal - expenseVal;
    currSavings < 0 && (currSavings = 0);
    let prevMonthExpense:number = parseInt(String(prevMonthResult?.Expense || 0));
    let prevMonthIncome:number = parseInt(String(prevMonthResult?.Income || 0));
    let prevMonthSavingNumber: number = prevMonthIncome - prevMonthExpense;
    console.log("prevMonthSavingNumber", prevMonthSavingNumber);
    prevMonthSavingNumber < 0 && (prevMonthSavingNumber = 0);
    let prevMonthSavingComp: number = parseFloat(calcDiff(currSavings, prevMonthSavingNumber).toFixed(2));
    console.log("prevMonthSavingNumber", prevMonthSavingNumber);
    console.log("currentSavingNumber", currSavings);


    dispatch(
      setMonthlyData({
        expense: expenseVal,
        income: incomeVal,
        savingVal: currSavings,
        prevMonthExpense: Number(Math.floor(prevMonthExpense)),
        prevMonthIncome: Number(Math.floor(prevMonthIncome)),
        prevMonthSaving: Number(prevMonthSavingComp),
      })
    );
  };

  useEffect(() => {
    const call = async () => {
      const dateString = format(new Date(), "MM/dd/yyyy");
      const { data: currMonthData } = await apiCall<MonthData>('GET', '/particularMonthData', undefined, {
        dateVal: dateString,
        useremail: localStorage.getItem("useremail"),
        userId: localStorage.getItem("uid"),
      });
      const prevMonthDateString = format(subMonths(new Date(), 1), "MM/dd/yyyy");
      const { data: prevMonthData } = await apiCall<MonthData>('GET', '/particularMonthData', undefined, {
        dateVal: prevMonthDateString,
        userId: localStorage.getItem("uid"),
      });
      const savingValue: number = parseInt(String(currMonthData?.Income || 0)) - parseInt(String(currMonthData?.Expense || 0));
      const incomeVal: number = parseInt(String(currMonthData?.Income || 0));
      const expenseVal: number = parseInt(String(currMonthData?.Expense || 0));
      const incomeComp = calcDiff(parseInt(String(currMonthData?.Income || 0)), parseInt(String(prevMonthData?.Income || 0)));
      const expenseComp = calcDiff(parseInt(String(currMonthData?.Expense || 0)), parseInt(String(prevMonthData?.Expense || 0)));
      const prevSavingVal: number = parseInt(String(prevMonthData?.Income || 0)) - parseInt(String(prevMonthData?.Expense || 0));
      const savingValComp: number = parseFloat(String(calcDiff(savingValue, prevSavingVal)));
      console.log("savingValComp", savingValComp);

      dispatch(
        setMonthlyData({
          expense: expenseVal,
          income: incomeVal,
          savingVal: savingValue,
          prevMonthExpense: parseInt(expenseComp.toFixed(2)),
          prevMonthIncome: parseInt(incomeComp.toFixed(2)),
          prevMonthSaving: Number(savingValComp.toFixed(2)),
        })
      );
    };
    call();
  }, [dispatch]);
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowRightUp : ArrowRightDown;
    return (
      <Paper withBorder p={{ base: 'sm', sm: 'md' }} radius="md" key={stat.title} className={styles.statCard}>
        <Group justify="apart" wrap="nowrap">
          <div style={{ minWidth: 0, flex: 1 }}>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={styles.label}>
              {stat.title}
            </Text>
            <Text className={styles.statValue} fw={700} c={"dark"}>
              ₹ <CountUp start={0} end={stat.value} duration={1} separator="," />
            </Text>
          </div>
          <ThemeIcon
            color="slate"
            variant="light"
            size={"lg"}
            radius="md"
          >
            <DiffIcon stroke={'2.6'} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="xs" mt="sm">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {isNaN(stat.diff) ? null : `${stat.diff}%`}
          </Text>{' '}
          {isNaN(stat.diff) ? 'Data not available' : (stat.diff > 0 ? 'increase vs last month' : 'decrease vs last month')}
        </Text>
      </Paper>
    );
  });

  return (
    <>
      <div className={styles['subHeading']}>
        <div className={styles['headingTitle']}>
          Monthly Stats
        </div>
        <MonthPickerInput
          placeholder="Pick Month"
          clearable
          className={styles.pickerWrapper}
          leftSection={<i className="uil uil-calender" style={{ color: '#000', fontSize: '16px' }}></i>}
          value={dateVal}
          onChange={handleChange}
          defaultValue={new Date()}
        />
      </div>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 'sm', sm: 'md' }}>
        {stats}
      </SimpleGrid>
    </>
  )};
export default React.memo(MonthlyGoal);