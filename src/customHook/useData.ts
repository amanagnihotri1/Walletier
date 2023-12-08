import { useEffect,useState } from "react"
import { useSelector } from "react-redux";
import { getDocs } from "firebase/firestore";
import { collectionRef } from "../components/Transactions/Transactions";
import { where,query } from "firebase/firestore";
import {getColor} from "../utils/data";
export const useData=():any[]=>
{
  const[details,setDetails]=useState({
  bills:0,
  entertainment:0,
  food:0,
  travel:0,
  others:0,
  shopping:0,
  daily_needs:0,
  })
  const authuid=useSelector((state:any)=>state.authReducer.uid);
 const getExpenseAnalysis=async(type:string,user:string)=>
{
  let val:number=0;
  let qState=await query(collectionRef,where("uid","==",user),where("category","==",type));
  let qDocs=await getDocs(qState);
  qDocs.forEach((doc:any)=>
  {
    val+=parseInt(doc.data().amount);
  })
return val;
}
 const getBillsData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Bills",authuid).then((data)=>setDetails((prev)=>({...prev,bills:data})));
      console.log(numVal);
    }
     const getEntertainmentData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Entertainment",authuid).then((data)=>setDetails((prev)=>({...prev,entertainment:data})));
      console.log(numVal); 
    }
     const getFoodData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Food",authuid).then((data)=>setDetails((prev)=>({...prev,food:data})));

      console.log(numVal);
    }
     const getneedsData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Daily Needs",authuid).then((data)=>setDetails((prev)=>({...prev,daily_needs:data})));
      console.log(numVal);
    }
     const getShoppingData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Shopping",authuid).then((data)=>setDetails((prev)=>({...prev,shopping:data})));
      console.log(numVal);
    }
     const getTravelData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Travel",authuid).then((data)=>setDetails((prev)=>({...prev,travel:data})));
      console.log(numVal);
    }
     const getMiscData=()=>
    {
      let numVal:number=0;
      getExpenseAnalysis("Others",authuid).then((data)=>setDetails((prev)=>({...prev,others:data})));
      console.log(numVal);
    }
  const[expenseGraph,setGraph]=useState<{name:string;value:number; fill:string;}[]>();
 const expenseData1:any[]=[
    {
      name:"Shopping",
      value:details.shopping,
      fill:getColor("Shopping"),
     }, 
    {
      name:"Travel",
      value:details.travel,
      fill:getColor("Travel"),
     }, 
    {
      name:"Entertainment",
      value:details.entertainment,
      fill:getColor("Entertainment"),
     }, 
    {
      name:"Food",
      value:details.food,
      fill:getColor("Food"),
     }, 
    {
      name:"Daily Needs",
      value:details.daily_needs,
      fill:getColor("Daily Needs"),
     }, 

    {
      name:"Bills",
      value:details.bills,
      fill:getColor("Bills"),
     }, 
    {
      name:"Others",
      value:details.others,
      fill:getColor("Others"),
     }];  
    console.log(expenseData1); 
  useEffect(()=>
  {   
     getBillsData();
     getEntertainmentData();
     getFoodData();
     getMiscData();
     getShoppingData();
     getTravelData();
     getneedsData();
     setGraph(expenseData1);
  },[expenseData1]);
  console.log(expenseData1);
return expenseData1;
}