
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Table.css';
import React,{useState,useEffect} from 'react';
import { uuidv4 } from '@firebase/util';
import {expenseCategories,incomeCategories} from '../../utils/data';
import style from "../Transactions/transaction.module.scss";
import delImage from "../../assets/trash.png";
import { TableData } from '../../app/TypeInterfaces';
import {database,auth} from "../../Auth/firebaseAuth";
import { collection,addDoc,getDocs } from 'firebase/firestore';
import { query,where } from 'firebase/firestore';
import { useDispatch,useSelector } from 'react-redux';
import addImage from "../../assets/plus.png";
import { useDisclosure } from '@mantine/hooks';
import formatDate from '../../utils/formatDate';
import {setTableData } from './transactionSlice';
import { handleDelete } from '../../utils/data';
import {setExpense, setIncome, setSavings } from '../cardGroup/cardSlice';
import {Table,Button,SegmentedControl,Modal,Select,Tabs, NumberInput,Transition} from '@mantine/core';
export const collectionRef=collection(database,"Bill_list");
export const Transactions = ({useid}:{useid:any}) => {
  const dispatch=useDispatch();
  const incomeData=useSelector((state:any)=>state.cardSlice.income);
  const expenseData=useSelector((state:any)=>state.cardSlice.expenses);
  const authuid=useSelector((state:any)=>state.authReducer.uid);
  const collectionRef=collection(database,"Bill_list");
  const[type,setType]=useState<string | null>("Expense");
  const[amount,setAmount]=useState<string | number>(0);
  const[category,setCategory]=useState<string | null>('');
  const[tid,setTid]=useState(uuidv4());
  const[backDate,setBackDate]=useState();
  const tableVal=useSelector((state:any)=>state.transReducer.expenseList);
  const [opened, { open, close }] = useDisclosure(false);
  const handleSubmit=async(e:any)=>
 { 
   try
   {
       e.preventDefault();
       await addDoc(collectionRef,{
       _id:uuidv4(),
        type:type,
       amount:amount,
       date:new Date().toLocaleDateString(),
       category:category,
       uid:auth?.currentUser?.uid,
       tid:tid
      });
      const value=Number(amount);
      console.log(typeof value);
      type==="Income"?dispatch(setIncome(value)):dispatch(setExpense(value))
      dispatch(setSavings(incomeData-expenseData));
      getData("1D");
      close();
    }catch(err)
    {
      console.log(err);
    }
 }
 console.log(backDate);
  const getData=async(timespan:string)=>
{  
  if(timespan==="1D")
  {
      let info:TableData[]=[];
      console.log(new Date().toLocaleDateString().split('/')[0]);
       let qDef= query(collectionRef,where("uid","==",authuid),where("date","==",new Date().toLocaleDateString()));
       let snapdata=await getDocs(qDef);
       snapdata.forEach((doc:any)=>
       {
         info.push({...doc.data()})
         console.log(info);
        }
       ) 
       dispatch(setTableData(info));
       return info;
      }
  if(timespan==="1M")
  { 
    let today = new Date();
    let mainData:TableData[]=[];
    let priorDate = new Date(new Date().setDate(today.getDate() - 30)); 
    console.log(priorDate.toLocaleDateString().split("T")[0]);
    let qData = query(collectionRef,where("uid","==",authuid),where("date",">=",priorDate.toLocaleDateString().split("/")[0]));
    let querData=await getDocs(qData);
    querData.forEach((doc:any)=>
    {
      mainData.push({...doc.data()});
      console.log(doc.data());
    })
  dispatch(setTableData(mainData));
  return mainData;
} 
if(timespan==='1Y')
{
  let prevValues:TableData[]=[];
  let prevYear=new Date(new Date().setFullYear(new Date().getFullYear()-1));
  console.log(prevYear.toLocaleDateString());
  let qStatement=await query(collectionRef,where("uid","==",authuid),where("date",">=",prevYear.toLocaleDateString()));
  let queData=await getDocs(qStatement);
  queData.forEach((doc:any)=>
  {
    prevValues.push(doc.data());
  })
  dispatch(setTableData(prevValues));
  return prevValues;
}
}
console.log(new Date().toLocaleDateString());
const handleChange=async(e:any)=>
{
  setBackDate(e);
  console.log(e);
}
const getTotalIncome=async(authuid:string)=>
{
  let incomeOrExpense:number=0;
  console.log(new Date().setDate(1));
  const qData=await query(collectionRef,where("uid","==",authuid),where("type",'==',"Income")); 
  const inqueryData=await getDocs(qData);
  inqueryData.forEach((doc:any) => {
    incomeOrExpense+=parseInt(doc.data().amount)
});
console.log(incomeOrExpense);
dispatch(setIncome(incomeOrExpense));
};
const getSavings=()=>
{ 
  let saving=incomeData-expenseData;
  dispatch(setSavings(saving));
  console.log(incomeData-expenseData);
}
const getTotalExpenses=async()=>
{
  let expenseval=0;
  const qData=await query(collectionRef,where("uid","==",authuid),where("type",'==',"Expense")); 
  const inqueryData=await getDocs(qData);
  inqueryData.forEach((doc:any) => {
    expenseval+=parseInt(doc.data().amount)
});
dispatch(setExpense(expenseval));
}
useEffect(()=>
{
  (async function()
  {
    console.log(authuid);
    const elem:any=await getData("1D");
    setTableData(elem);
    console.log(elem);
    dispatch(setTableData(elem));
    getTotalIncome(authuid);
    getTotalExpenses();
    getSavings();
  })()
},[authuid]);
  return (
    <div className={style["tableWrapper"]}>
      <div className={style['tableName']}>
       <div className={style['textInner']}>
       Recent Transactions
       </div>
       <div className={style['buttonGroup']}>
       <Button leftSection={<img src={addImage} alt='Not Found' width={"10px"} height={"10px"}/>} onClick={open} variant="default">
        Add
      </Button>
      <SegmentedControl color="blue" data={['1D', '1M', '1Y']} onChange={handleChange} />
      </div>
      </div>
      <Table.ScrollContainer minWidth={500}>
      <Table className={style['tableMain']} stickyHeader withRowBorders={true} stickyHeaderOffset={0}>
      <Table.Thead>
        <Table.Tr >
          <Table.Th style={{fontWeight:'600'}} >Transaction ID</Table.Th>
          <Table.Th>Category name</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
    <Table.Tbody>
    {tableVal?.map((element:any) => (
    <Table.Tr key={element.name}>
      <Table.Td>#{element.tid.slice(0,6)}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{formatDate(element.date)}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td style={{color:element.type==="Expense"?'violet':'green'}}>{element.type==="Expense"?`- ₹${element.amount}`:`+₹${element.amount}`}</Table.Td>
      <Table.Td>
      <Button rightSection={<img src={delImage} width="15px" height={"15px"} alt="not_found"/>} 
      variant="default" 
      value={element.tid} 
      onClick={(e)=>{handleDelete(e.currentTarget.value); getData("1D"); }}
      >
      Delete
      </Button>
    </Table.Td>
    </Table.Tr>
  ))}
    </Table.Tbody>
    </Table>   
  </Table.ScrollContainer>
    <Transition
    keepMounted
     mounted={opened}
     transition="fade"
     duration={400}
     timingFunction="ease"
    >
    {(styles:any)=>
     <Modal
    opened={opened}
    onClose={close}
    title="Add Transaction"
    style={styles}
    centered
    >
    <Tabs defaultValue="Expense" onChange={()=>{setCategory(null);}}>
      <Tabs.List>
        <Tabs.Tab value="Income">
          Income
        </Tabs.Tab>
        <Tabs.Tab value="Expense">
          Expense
        </Tabs.Tab>
      </Tabs.List>
    <Tabs.Panel value="Expense" onClick={()=>setType("Expense")}>
    <form onSubmit={handleSubmit} method="post">
     <Select
     withAsterisk
     label="Category"
     placeholder="Select expense type"
     data={expenseCategories}
     value={category}
     onChange={(e)=>setCategory(e)}
     />   
      <NumberInput
      withAsterisk
      label="Amount"
      type='text'
      allowNegative={false}
      placeholder="Enter value"
      value={amount}
      onChange={(e:any)=>setAmount(e)}
      />
      <Button variant="filled" type='submit' className={style['submitButton']}>Submit</Button>
      </form>
     </Tabs.Panel>
     <Tabs.Panel value='Income' onClick={()=>setType("Income")}>
     <form method="post" onSubmit={handleSubmit}>
       <Select
       withAsterisk
       label="Source of income"
       placeholder="Select type"
       data={incomeCategories}
       name="incomeType"
       value={category}
       onChange={(e)=>setCategory(e)}
       />
      <NumberInput
      withAsterisk
      label="Amount"
      allowNegative={false}
      type="tel"
      placeholder="Enter value"
      value={amount}
      onChange={(e:any)=>setAmount(e)}/>
      <Button variant="filled" type='submit'className={style['submitButton']}>Submit</Button>
      </form>
      </Tabs.Panel>
      </Tabs>
      </Modal>
    }
    </Transition>
    </div>
  )
}
