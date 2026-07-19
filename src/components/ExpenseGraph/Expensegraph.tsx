/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { PieChart,Pie,Cell,Tooltip,Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
export const Expensegraph = () => {
const[expenseData,setExpenseData]=useState();
const dispatch=useDispatch();
const[bills,setBills]=useState<number>();
const[travel,setTravel]=useState<number>();
const[food,setFood]=useState<number>();
const[shopping,setShopping]=useState<number>();
const[other_data,setOtherData]=useState<number>();
const[daily_needs,setDailyNeeds]=useState<number>();
const[entertainment,setEntertainment]=useState<number>();
const getExpenseData=async()=>
{  
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/getGraphData?useremail=${localStorage.getItem('useremail')}`);
    setExpenseData(res?.data);
    console.log(res.data);
    return res.data;
}
const getBillsData=async()=>
{
    const data:any=await getExpenseData();
    setExpenseData(data);
    Array.isArray(data) && data?.forEach((item:any)=>{
         if(item._id==="Bills")setBills(item.totalSum);
         if(item._id==="Shopping")setShopping(item.totalSum);
         if(item._id==="Travel")setTravel(item.totalSum);
         if(item._id==="Food")setFood(item.totalSum);
         if(item._id==="Entertainment")setEntertainment(item.totalSum);
         if(item._id==="others")setOtherData(item.totalSum);
         if(item._id==="Daily Needs")setDailyNeeds(item.totalSum);
    })
}
const data02 = [
        {
          "name": "Bills",
          "value":bills,
          "fill":'#9b2226',
        },
        {
          "name": "Shopping",
          "value": shopping,
          "fill":'#003049',
        },
        {
          "name": "Travel",
          "value": travel,
          "fill":'#ffd60a',
        },
        {
          "name": "Food",
          "value": food,
          "fill":'#4361ee',
        },
        {
          "name": "Entertainment",
          "value":entertainment,
          "fill":'#708d81',
        },
        {
          "name": "Daily Needs",
          "value": daily_needs,
          "fill":'#a0c4ff',
        },
        {
          "name": "Others",
          "value": other_data,
          "fill":'#f35b04',
        }
      ];
useEffect(()=>
{
(async()=>
{
  getBillsData();
})();
},[dispatch]);
return (
  <>
 {expenseData?(<ResponsiveContainer width="100%" height="100%">
  <PieChart width={100} height={100}>
  <Pie data={data02} dataKey="value" nameKey="name" cx="140" cy="80" innerRadius={80} outerRadius={120} fill="#82ca9d">
   {
      data02?.map((entry, index)=><Cell fill={data02[index].fill}/>)
    }
    </Pie>
    <Legend/>
    <Tooltip separator=':'/>
    </PieChart>  
    </ResponsiveContainer>
    ):<h1 style={{textAlign:'center',marginTop:'60px'}}>No Data available</h1>}
    </>
  )
}
