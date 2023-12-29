import React,{useState,useEffect} from 'react'
import { PieChart,Pie,Cell,Tooltip,Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { collectionRef } from '../Transactions/Transactions';
import { query,where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
export const Expensegraph = () => {
const expenseValue=useSelector((state:any)=>state.cardSlice.expenses);
const[bills,setBills]=useState<number>();
const[travel,setTravel]=useState<number>();
const[food,setFood]=useState<number>();
const[shopping,setShopping]=useState<number>();
const[other_data,setOtherData]=useState<number>();
const[daily_needs,setDailyNeeds]=useState<number>();
const[entertainment,setEntertainment]=useState<number>();
const authuid=useSelector((state:any)=>state.authReducer.uid);
const getExpenseData=async()=>
{    
    let info:any=[];
    let qDef=query(collectionRef,where("uid","==",authuid),where("type","==","Expense"));
    let snapdata=await getDocs(qDef);
    await snapdata.forEach((doc)=>
    {
      info.push(doc.data());
    })
   console.log(info);
return info;   
}
const getBillsData=async(categ:string)=>
{
    let billsData:number=0;
    const data:any=await getExpenseData();
    await data.forEach((item:any)=>
    {
        if(item.category===categ)
        {
            billsData+=parseInt(item.amount);
         if(categ==="Bills")setBills(billsData);
         if(categ==="Shopping")setShopping(billsData);
         if(categ==="Travel")setTravel(billsData);
         if(categ==="Food")setFood(billsData);
         if(categ==="Entertainment")setEntertainment(billsData);
         if(categ==="others")setOtherData(billsData);
         if(categ==="Daily Needs")setDailyNeeds(billsData);
        }
    })
    console.log(billsData);
return billsData;
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
authuid && (async()=>
{
  await getBillsData("Bills");
  await getBillsData("Shopping");
  await getBillsData("Travel");
  await getBillsData("Food");
  await getBillsData("Others");
  await getBillsData("Daily Needs");
  await getBillsData("Entertainment");
})();
},[bills,daily_needs,other_data,shopping,travel,food,expenseValue]);
return (
  <ResponsiveContainer width="100%" height="100%">
  <PieChart width={100} height={100}>
  <Pie data={data02} dataKey="value" nameKey="name" cx="140" cy="80" innerRadius={80} outerRadius={120} fill="#82ca9d">
   {
      data02.map((entry, index)=><Cell fill={data02[index].fill}/>)
    }
    </Pie>
    <Legend/>
    <Tooltip separator='='/>
</PieChart>  
    </ResponsiveContainer>
  )
}
