import React from 'react';
import style from "../cardGroup/cardgroup.module.scss";
import '@mantine/core/styles/Badge.css';
import { LineChart, Line, Tooltip,ResponsiveContainer,PieChart,Pie } from 'recharts';
import coinImage from "../../assets/coin.png";
import { useData } from '../../customHook/useData';
import { RingProgress,ColorSwatch,Text,Badge } from '@mantine/core';
import {getColor } from '../../utils/data';
import savingBag from "../../assets/savings1.png";
import { expenseCategories} from '../../utils/data';
import {ReactComponent as ExpandImg} from "../../assets/expand.svg";
import { useSelector } from 'react-redux';
export const Cardgroup = () => {
  const expenseValue=useSelector((state:any)=>state.cardSlice.expenses);
  const incomeValue=useSelector((state:any)=>state.cardSlice.income);
  const expenseData1=useData();
// const getGraphData=async()=>
// {
//   let qDef= await query(collectionRef,where("uid","==",authuid));
//   let snapdata=await getDocs(qDef);
//   snapdata.forEach((doc:any)=>
//     graphArray?.push(doc.data())
//   )  
// }
const data =[
        {
          name: 'Grocery',
          uv: 2220,
          amount: 2400,
          amt: 2400,
        },
        {
          name: 'Shopping',
          uv: 3000,
          amount: 1398,
          amt: 2210,
        },
        {
          name: 'Daily Essentials',
          uv: 2000,
          amount: 9800,
          amt: 2290,
        },
        {
          name: 'Pag',
          uv: 2780,
          amount: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          amount: 4800,
          amt: 2181,
        },
      ]; 
    return (
    <div className={style["cardWrapper"]}>
    <div className={style['incomeTile']}>
    <div className={style['expandimg']}>
      <ExpandImg width={"100%"} height={"100%"} fill="#000"/>
    </div>
    <div className={style['tileIcon']}><img src={coinImage} alt="not_found" />
    </div>  
     <div className={style['saveinfo']}>
     <div>Total Income</div>
     <Badge color="blue">Monthly</Badge>
     </div> 
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ {incomeValue}</div>
     <ResponsiveContainer width="100%" height="40%">
        <LineChart width={250} height={60} data={data}>
          <Line type="monotone" dataKey="amount" stroke="#4361ee" strokeWidth={3} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><img src={coinImage} alt="" />
    </div>   
     <div>Total Expenses</div>
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ {expenseValue}</div>
     <ResponsiveContainer width="100%" height="40%" className={style["graphwrap"]}>
        <LineChart width={250} height={60} data={data}>
          <Line type="monotone" dataKey="amount" stroke="#fb8b24" strokeWidth={3} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={`${style.incomeTile} ${style.savingTile}`}>
    <div className={style['tileIcon']}><img src={savingBag} alt="not_found" />
    </div>   
     <div className={style['saveinfo']}>
     <div>Saving Goal</div>
     <Badge color="blue">Monthly</Badge>
     </div>
     <div style={{
     fontWeight:'600',
     fontSize:'24px',
     display:'flex'
     }}>
      $ {incomeValue-expenseValue}
      </div>
     <RingProgress
     style={{
        margin:'0px 40%',
      }}
      label={
        <Text c="blue" fw={700} size="xl" ta="center">
          55%
        </Text>
      }
      sections={[
        { value: 55, color: 'blue' },
      ]}
    />
    </div>
  <div className={style['expense-graph']}>
  <div className={style['textHeading']}>Expense Analysis</div>
  <div className={style['saveinfomin']}>  
  <PieChart width={130} height={150}>
  <Pie data={expenseData1} dataKey="value" nameKey="name" fill="#fff" cx="50%" cy="60%" outerRadius={50} />
  <Tooltip/>
  </PieChart>
      <div className={style['catelist']}>
    <ul style={{listStyle:'none',margin:'0'}}>
    { 
    expenseCategories.map((item)=>
    (
    <li style={{display:'inline-flex',margin:'2px 8px',gap:'5px'}}><ColorSwatch color={getColor(item)} size={"20px"} />{item}</li>
    ))}  
    </ul>
    </div>
    </div>
    </div>
    </div>
  )
}
