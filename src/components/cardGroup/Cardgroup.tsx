import style from "../cardGroup/cardgroup.module.scss";
import '@mantine/core/styles/Badge.css';
import '@mantine/core/styles/Tooltip.css';
import React from "react";
import CountUp from 'react-countup';
import axios from "axios";
import coinImage from "../../assets/coin.png";
import {ReactComponent as ExpenseImage} from "../../assets/expense_svg.svg"; 
import {Badge,Tooltip } from '@mantine/core';
import savingBag from "../../assets/savings1.png";
import { useSelector } from 'react-redux';
import { Sparkline } from '@mantine/charts';
import { Expensegraph } from '../ExpenseGraph/Expensegraph';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIncome,setExpense,setSavings,setExpenseGraph} from "./cardSlice";
const Cardgroup = () => {
  const dispatch=useDispatch();
  const expenseGraph=useSelector((state:any)=>state.cardSlice.expenseGraph);
  const incomeGraph=useSelector((state:any)=>state.cardSlice.incomeGraph);
  const expenseValue=useSelector((state:any)=>state.cardSlice.expenses);
  const incomeValue=useSelector((state:any)=>state.cardSlice.income);
  const getData=async()=>
  {
    const data:any=await axios.get(`/getdailydata?uid=${localStorage.getItem("uid")}`);
    const graphdata=await axios.get(`/getGraphData?uid=${localStorage.getItem("uid")}`); 
    console.log(graphdata.data);
    console.log(data?.data);
    dispatch(setIncome(data?.data[0]?.totalSum));
    dispatch(setExpense(data?.data[1]?.totalSum));
  }
  useEffect(()=>
  {
    async function call(){
     await getData();
    }
    call();
  },[]);
  return (
    <div className={style["cardWrapper"]}>
    <div className={style['incomeTile']}>
    <div className={style['expandimg']}>
    </div>
    <div className={style['tileIcon']}><img src={coinImage} alt="not_found" />
    </div>  
     <div className={style['saveinfo']}>
     <div style={{color:'#868e96',fontWeight:'600'}}>Total Income  
     <Tooltip label="Today's total income">
     <i className="uil uil-info-circle" style={{fontSize:'20px',color:'#000',marginLeft:'4px'}}></i>
     </Tooltip>
     </div>
     </div> 
     <div style={{fontWeight:'700',fontSize:'26px'}}>₹ <CountUp end={incomeValue}/></div>
     <Sparkline
      w={"100%"}
      h={120}
      data={[10, 20, 40, 20, 40, 10, 50]}
      curveType="linear"
      color="magenta"
      fillOpacity={0.6}
      strokeWidth={1.9}
    />
    </div>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><ExpenseImage  />
    </div>   
     <div style={{color:'#868e96',fontWeight:'600'}}>Total Expenses
     <Tooltip label="Today's total expenses">
     <i className="uil uil-info-circle" style={{fontSize:'20px',color:'#000',marginLeft:'4px'}}></i>
     </Tooltip>
     </div>
     <div style={{fontWeight:'700',fontSize:'26px'}}>₹ <CountUp end={expenseValue}/></div>
       <Sparkline
      w={"100%"}
      h={120}
      data={[10, 200, 40, 20, 40, 10, 50]}
      curveType="linear"
      color="magenta"
      fillOpacity={0.6}
      strokeWidth={1.9}
    />
    </div>
    <div className={`${style.incomeTile} ${style.savingTile}`}>
    <div className={style['tileIcon']}><img src={savingBag} alt="not_found" />
    </div>   
     <div className={style['saveinfo']}>
     <div style={{color:'#868e96',fontWeight:'600'}}>Savings
     <Tooltip label="Today's total savings">
     <i className="uil uil-info-circle" style={{fontSize:'20px',color:'#000',marginLeft:'4px'}}></i>
     </Tooltip>
     </div>
     <Badge color="magenta">{new Date().toDateString().slice(3)}</Badge>
     </div>
     <div style={{
       fontWeight:'700',
     fontSize:'26px',
     display:'flex'
     }}>
      ₹ <CountUp end={incomeValue-expenseValue}/>
      </div>
      <div className={style['piggyBank']}>
     <img src='https://static.vecteezy.com/system/resources/thumbnails/013/083/708/small/piggy-bank-and-glasses-with-gold-coins-money-saving-money-concept-3d-illustration-or-3d-render-png.png' alt="" />
      </div>
    </div>
    <div className={`${style.incomeTile} ${style.analysisTile}`}> 
     <div className={style['analysisText']} style={{color:'#868e96',fontWeight:'600',fontSize:'16px'}}>
     Expense Analysis
     <Tooltip label="This tile displays current month expense data categorywise">
     <i className="uil uil-info-circle" style={{fontSize:'20px',color:'#000',marginLeft:'4px'}}></i>
     </Tooltip>
       <Badge color="magenta">Monthly</Badge>
     </div>
      <Expensegraph/>
    </div>
    </div>
  )
}
export default React.memo(Cardgroup);