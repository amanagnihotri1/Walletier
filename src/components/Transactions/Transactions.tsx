/* eslint-disable react-hooks/exhaustive-deps */
import '@mantine/dates/styles.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Table.css';
import React,{useState,useEffect} from 'react';
import { DatePickerInput } from '@mantine/dates';
import axios from "axios";
import dayjs from "dayjs";
import {expenseCategories,incomeCategories} from '../../utils/data';
import style from "../Transactions/transaction.module.scss";
import { useDispatch,useSelector } from 'react-redux';
import addImage from "../../assets/plus.png";
import {sub,format} from "date-fns";
import { useDisclosure } from '@mantine/hooks';
import {setTableData } from './transactionSlice';
import {setIncome } from '../cardGroup/cardSlice';
import {Table,Button,SegmentedControl,Modal,Select,Tabs,NumberInput,Transition,ActionIcon,Badge} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { TableData } from '../../app/TypeInterfaces';
export const Transactions = () => {
  const dispatch=useDispatch();
  const tableVal:TableData[]=useSelector((state:any)=>state.transReducer.expenseList);
  const authuid=useSelector((state:any)=>state.authReducer.uid);
  const[type,setType]=useState<string>("");
  const[editAmount,setEditAmount]=useState(0);
  const[amount,setAmount]=useState<number>(0);
  const[category,setCategory]=useState<string | null>("");
  const[editTid,setEditTid]=useState<string>();
  const [opened, { open, close }] = useDisclosure(false);
  const[editModal,setEditModal]=useState(false);
  const[editCategory,seteditCategory]=useState<string | null | undefined>();
  const [datevalue, setDateValue] = useState<Date | null>(new Date());
  const[editEntryBox,seteditEntryBox]=useState();
  const handleDateChange=(e:any)=>
  {
     setDateValue(e);
  }
  console.log(Date().toString());
  const handleSubmit=async(e:any)=>
 { 
   try
   {     
    if(!amount && !category)
    {
      notifications.show({title:"Error",message:"Missing field,amount or category"});
    return new Error(`Error filed missing`);
    } 
      e.preventDefault();
      console.log(Date);
      const res:any=await axios.post(`${process.env.REACT_APP_BASE_URL}/addentry`,{
      userId:authuid,
      amount,
      category,
      entryType:type,
      date:dayjs(datevalue?.toISOString()),
      });
      close();
      console.log(res);
      const resu=await getData("1D");
      dispatch(setTableData(resu));
      const result:any=await axios.get(`${process.env.REACT_APP_BASE_URL}/getdailydata?uid=${localStorage.getItem("uid")}`);
     category==="Income"?dispatch(setIncome(result?.data[1]?.totalSum)):dispatch(setIncome(result?.data[0]?.totalSum))
      notifications.show({title:"Success",message:"Entry created successfully",autoClose:2000}); 
    }catch(err:any)
    {
      notifications.show({title:"Error",message:err.message});
    }
 }
 const handleEditForm=async(e:any)=>
  {
    try{
      e.preventDefault();
      const results=await axios.patch(`${process.env.REACT_APP_BASE_URL}/editEntry`,{
        entryId:editTid,
        entryCat:editCategory,
        entryAmt:editAmount
      });
      console.log(results);
      notifications.show({title:'Success',message:'Entry updated successfully'});
      setEditModal(!editModal);
    }catch(err:any){
     notifications.show({title:'Failed',message:err.message});
     setEditModal(!editModal); 
    }

  }
 const handleDelete=async(e:any)=>{
  console.log(e.currentTarget.value);
  console.log(e);
   const data=await axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteEntry?entryId=${e.currentTarget.value}`);
   console.log(data);
   const result=await getData("1D"); 
    dispatch(setTableData(result));
 } 
 const getData=async(timeVal:string)=>
{  
 if(timeVal==="1D")
 {
  let queryData=await axios.get(`${process.env.REACT_APP_BASE_URL}/currdayentries?userid=${localStorage.getItem('uid')}`);
  console.log(typeof queryData);
  dispatch(setTableData(queryData?.data));
  return queryData.data;
 } 
 else if(timeVal==="1M")
  { 
    let prevMonth=sub(new Date(),{months:1}).toString();
    let dateString=format(prevMonth,'MM/dd/yyyy');
    let querData:any=await axios.get(`${process.env.REACT_APP_BASE_URL}/lastMonthData?dateVal=${dateString}&uid=${authuid}`);
    dispatch(setTableData(querData?.data));
    return querData.data;
} 
else if(timeVal==="1Y")
{
  let res:any=await axios.get(`${process.env.REACT_APP_BASE_URL}/lastYearData?userid=${localStorage.getItem("uid")}`);
  console.log(res?.data);
  dispatch(setTableData(res?.data));
  return res.data;
}
}
const handleEditSlider=(e:any)=>{
 seteditEntryBox(e);
 console.log(e);
 console.log(editEntryBox);
  seteditCategory(null);
}
const handleChange=async(e:any)=>
{
  const response:any=await getData(e);
  console.log(response);
  dispatch(setTableData(response));
}
useEffect(()=>
{
  const call=async()=>{
  const result:any=await getData("1D");
   dispatch(setTableData(result));
  };
 call();
},[]);
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
          <Table.Th>Category</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
    <Table.Tbody>
    {Array.isArray(tableVal) && tableVal.map((element:TableData)=> (
    <Table.Tr>
      <Table.Td>#{element._id.slice(0,4)}...</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{format(element.date,'dd-MM-yyyy')}</Table.Td>
      <Table.Td>{element.entryType}</Table.Td>
      <Table.Td style={{color:element.entryType==="Expense"?'red':'magenta'}}>{element.entryType==="Expense"?`- ₹ ${element.amount}`:`+₹ ${element.amount}`}</Table.Td>
      <Table.Td style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
      <ActionIcon variant="outline" aria-label='Delete' value={element._id} onClick={handleDelete}>
      <i className="uil uil-trash-alt"></i>   
        </ActionIcon>
      <ActionIcon variant='outline' value={element._id} aria-label="Edit" mx={10} onClick={(e)=>{setEditModal(true); setEditTid(e.currentTarget.value)}}>
      <i className="uil uil-pen"></i>
      </ActionIcon>
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
    <Tabs defaultValue="Income" >
      <Tabs.List>
        <Tabs.Tab value="Income">
          Income
        </Tabs.Tab>
        <Tabs.Tab value="Expense">
          Expense
        </Tabs.Tab>
      </Tabs.List>
    <Tabs.Panel value="Expense" onClick={()=>setType("Expense")}>
    <form onSubmit={handleSubmit}>
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
      type="text"
      allowNegative={false}
      placeholder="Enter value"
      value={amount}
      onChange={(e:any)=>setAmount(e)}
      />
      <DatePickerInput
      label="Pick Date"
      clearable
      placeholder="pick date"
      value={datevalue}
      leftSection={<i className="uil uil-calender"></i>}
      onChange={setDateValue}
    />
      <Button variant="filled" type='submit' className={style['submitButton']}>Submit</Button>
      </form>
     </Tabs.Panel>
     <Tabs.Panel value='Income' onClick={()=>setType("Income")}>
     <form  onSubmit={handleSubmit}>
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
      <DatePickerInput
      label="Pick Date"
      clearable
      placeholder="pick date"
      value={datevalue}
      leftSection={<i className="uil uil-calender"></i>}
      onChange={handleDateChange}
    />
      <Button variant="filled" type='submit'className={style['submitButton']}>Submit</Button>
      </form>
      </Tabs.Panel>
      </Tabs>
      </Modal>
    }
    </Transition>
    <Modal opened={editModal} onClose={()=>setEditModal(!editModal)} title="Edit Entry" centered>
    <form onSubmit={handleEditForm}>
      <div style={{margin:'10px 0px',fontWeight:'600'}}>Transaction Id:<Badge color='#8338ec'>{editTid}</Badge></div>
    <SegmentedControl color={'magenta'}defaultValue={'Expense'} onChange={handleEditSlider} data={['Expense','Income']} 
    />
    <Select
     withAsterisk
     label="Category"
     placeholder="Select Category"
     data={editEntryBox==="Expense"?expenseCategories:incomeCategories}
     value={editCategory}
     onChange={(e:any)=>{seteditCategory(e);}}
     />
     <NumberInput 
     withAsterisk
     label="Amount"
     type="text"
     allowNegative={false}
     placeholder="Type Value"
     value={editAmount}
     onChange={(e:any)=>setEditAmount(e)}
     />
     <Button variant="outline" type='submit'className={style['submitButton']}>Submit</Button>
    </form>
    </Modal>
    </div>
  )
}
