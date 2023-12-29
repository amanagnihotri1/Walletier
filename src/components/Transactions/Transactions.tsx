
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
import { collection,addDoc,getDocs,deleteDoc} from 'firebase/firestore';
import { query,where } from 'firebase/firestore';
import { useDispatch,useSelector } from 'react-redux';
import addImage from "../../assets/plus.png";
import { useDisclosure } from '@mantine/hooks';
import formatDate from '../../utils/formatDate';
import {setTableData } from './transactionSlice';
import {setExpense, setIncome, setSavings } from '../cardGroup/cardSlice';
import {Table,Button,SegmentedControl,Modal,Select,Tabs, NumberInput,Transition} from '@mantine/core';
export const collectionRef=collection(database,"Bill_list");
export const Transactions = () => {
  const dispatch=useDispatch();
  const incomeData=useSelector((state:any)=>state.cardSlice.income);
  const expenseData=useSelector((state:any)=>state.cardSlice.expenses);
  const tableVal=useSelector((state:any)=>state.transReducer.expenseList);
  const authuid=useSelector((state:any)=>state.authReducer.uid);
  const collectionRef=collection(database,"Bill_list");
  const[type,setType]=useState<string |null>("Expense");
  const[amount,setAmount]=useState<string | number>(0);
  const[category,setCategory]=useState<string>("");
  const[tid,setTid]=useState(uuidv4());
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
       date:new Date().toDateString(),
       category:category,
       uid:auth?.currentUser?.uid,
       tid:tid
      });
      const value=Number(amount);
      type==="Income"?dispatch(setIncome(incomeData+value))&&dispatch(setSavings(incomeData+value)):dispatch(setExpense(value));
       await getData("1D");
      close();
    }catch(err)
    {
      console.log(err);
    }
 }
 const getSavings=()=>
 {
  if(expenseData>=incomeData)  
  {  
    dispatch(setSavings(incomeData-expenseData)); 
  } 
   if(incomeData>expenseData)
    dispatch(setSavings(incomeData-expenseData));
 }
 const handleDelete=async(_id:string)=>{
  const docRef =await query(collectionRef,where("_id","==",_id));
  const docSnap=await getDocs(docRef);
 await docSnap.forEach((doc)=>
  { 
    if(doc.data().type==="Expense")
    {
        dispatch(setExpense(expenseData-parseInt(doc.data().amount)));
        deleteDoc(doc.ref);
        dispatch(setSavings(incomeData-expenseData));
    }
    if(doc.data().type==="Income")
    {
      dispatch(setIncome(incomeData-parseInt(doc.data().amount)));
      deleteDoc(doc.ref);
    }
    console.log("deleted doc with id:",_id);
  });
  await getData("1D");
  console.log("expense got Called Here also at 95");
}
 const getData=async(timeVal:string)=>
{  
  if(timeVal==="1D")
  {
       let info:TableData[]=[];
       let qDef=query(collectionRef,where("uid","==",authuid),where("date","==",new Date().toDateString()));
       let snapdata=await getDocs(qDef);
       await snapdata.forEach((doc:any)=>
       {
         info.push({...doc.data()});
        }); 
        dispatch(setTableData(info));
      return info;
      }
 if(timeVal==="1M")
  { 
    let mainData:TableData[]=[];
    let priorDate = new Date(new Date().setDate(new Date().getDate()-30)).toDateString();
    let qData = query(collectionRef,where("uid","==",authuid),where("date",">=",priorDate.split(" ")[2]));
    let querData=await getDocs(qData);
    await querData.forEach((doc:any)=>
    {
      mainData.push({...doc.data()});
    });
    dispatch(setTableData(mainData));
    return mainData;
} 
if(timeVal==='1Y')
{
  let prevValues:TableData[]=[];
  let prevYear=new Date(new Date().setFullYear(new Date().getFullYear()-1)).toDateString();
  let qStatement=await query(collectionRef,where("uid","==",authuid),where("date",">=",prevYear.split(" ")[3]));
  let queData=await getDocs(qStatement);
  await queData.forEach((doc:any)=>
  {
    prevValues.push({...doc.data()});
  })
  dispatch(setTableData(prevValues));
  return prevValues;
}
}
const handleChange=async(e:any)=>
{
const data:any=await getData(e);
dispatch(setTableData(data));
}
const getTotalIncome=async()=>
{
  let data:number=0;
  const qData=await query(collectionRef,where("uid","==",authuid),where("type",'==',"Income")); 
  const inqueryData=await getDocs(qData);
  await inqueryData.forEach((doc:any) => {
   data+=parseInt(doc.data().amount);
});
console.log(data);
dispatch(setIncome(data));
console.log(incomeData);
};
const getTotalExpenses=async()=>
{
  let qData=await query(collectionRef,where("uid","==",authuid),where("type","==","Expense")); 
  const inqueryData=await getDocs(qData);
  inqueryData.forEach((doc:any) => {
  console.log(doc.data());
  dispatch(setExpense(parseInt(doc.data().amount)));
});
}
useEffect(()=>
{
  const callrightNow=async()=>
  { 
    await getTotalExpenses();
    await getData("1D");
    await getTotalIncome();
    console.log(incomeData,expenseData);
     getSavings();
    };
authuid && callrightNow();
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
      <SegmentedControl color="magenta" data={['1D', '1M', '1Y']} onChange={handleChange} />
      </div>
      </div>
      <Table.ScrollContainer minWidth={500}>
      <Table className={style['tableMain']} stickyHeader withRowBorders={true} stickyHeaderOffset={0}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Transaction ID</Table.Th>
          <Table.Th>Category name</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
    <Table.Tbody>
    {tableVal?.map((element:any)=> (
    <Table.Tr key={element.name}>
      <Table.Td>#{element.tid.slice(0,6)}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{formatDate(element.date)}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td style={{color:element.type==="Expense"?'violet':'green'}}>{element.type==="Expense"?`- ₹${element.amount}`:`+₹${element.amount}`}</Table.Td>
      <Table.Td>
      <Button rightSection={<img src={delImage} width="15px" height={"15px"} alt="not_found"/>} 
      variant="default" 
      value={element._id} 
      onClick={(e)=>{handleDelete(e.currentTarget.value);  
      }}
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
    <Tabs defaultValue="Expense" onChange={()=>{setCategory("");}}>
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
     onChange={(e:any)=>{setCategory(e);}}
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
       onChange={(e:any)=>setCategory(e)}
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
