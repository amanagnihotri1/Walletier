/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { DatePickerInput } from '@mantine/dates';
import dayjs from "dayjs";
import { expenseCategories, incomeCategories } from '../../utils/data';
import style from "../Transactions/transaction.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import addImage from "../../assets/plus.png";
import { sub, format } from "date-fns";
import { useDisclosure } from '@mantine/hooks';
import { setTableData } from './transactionSlice';
import { setIncome, setExpense } from '../cardGroup/cardSlice';
import { Table, Button, SegmentedControl, Modal, Select, Tabs, NumberInput, ActionIcon, Badge } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { TableData } from '../../app/TypeInterfaces';
import apiCall from '../../utils/apiService';

export const Transactions = () => {
  const dispatch = useDispatch();
  const tableVal: TableData[] = useSelector((state: any) => state.transReducer.expenseList);
  const useremail: String = useSelector((state: any) => state.authReducer.useremail);
  const [type, setType] = useState<string>("Income");
  const [editAmount, setEditAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string | null>("");
  const [editTid, setEditTid] = useState<string>();
  const [opened, { open, close }] = useDisclosure(false);
  const [editModal, setEditModal] = useState(false);
  const [editCategory, seteditCategory] = useState<string | null | undefined>();
  const [datevalue, setDateValue] = useState<Date | null>(new Date());
  const [editEntryBox, seteditEntryBox] = useState<string>("Expense");

  const handleDateChange = (e: any) => {
    setDateValue(e);
  };

  const handleSubmit = async (e: any) => { 
    e.preventDefault();
    try {     
      if (!amount || !category || !useremail) {
        notifications.show({ title: "Error", message: "Enter all mandatory fields" });
        return;
      } 

      const { error } = await apiCall('POST', '/addentry', {
        userId: localStorage.getItem("uid"),
        useremail: localStorage.getItem("useremail"),
        amount,
        category,
        entryType: type || "Income",
        date: dayjs(datevalue?.toISOString()),
      });

      if (error) {
        notifications.show({ title: "Error", message: error });
        return;
      }

      close();
      const resu = await getData("1D");
      dispatch(setTableData(resu));

      const { data: result } = await apiCall<{ Expense?: number; Income?: number }>('GET', '/getdailydata', undefined, {
        useremail: localStorage.getItem('useremail'),
        userId: localStorage.getItem('uid'),
      });

      if (result) {
        dispatch(setIncome(result.Income || 0));
        dispatch(setExpense(result.Expense || 0));
      }

      notifications.show({ title: "Success", message: "Entry created successfully", color: "teal", autoClose: 2000 }); 
    } catch (err: any) {
      notifications.show({ title: "Error", message: err.message, color: "red" });
    }
  };

  const handleEditForm = async (e: any) => {
    e.preventDefault();
    try {
      const { error } = await apiCall('PATCH', '/editEntry', {
        entryId: editTid,
        entryCat: editCategory,
        entryAmt: editAmount,
        entryType: editEntryBox,
        userId: localStorage.getItem("uid"),
      });

      if (error) {
        notifications.show({ title: 'Failed', message: error, color: 'red' });
      } else {
        notifications.show({ title: 'Success', message: 'Entry updated successfully', color: 'teal' });
        const result = await getData("1D");
        dispatch(setTableData(result));
        const { data: resultDaily } = await apiCall<{ Expense?: number; Income?: number }>('GET', '/getdailydata', undefined, {
          useremail: localStorage.getItem('useremail'),
          userId: localStorage.getItem('uid'),
        });
        if (resultDaily) {
          dispatch(setIncome(resultDaily.Income || 0));
          dispatch(setExpense(resultDaily.Expense || 0));
        }
      }
      setEditModal(false);
    } catch (err: any) {
      notifications.show({ title: 'Failed', message: err.message, color: 'red' });
      setEditModal(false); 
    }
  };

  const handleDelete = async (tid: string) => {
    const { error } = await apiCall('DELETE', '/deleteEntry', undefined, {
      entryId: tid,
      userId: localStorage.getItem("uid"),
    });
    if (error) {
      notifications.show({ title: 'Failed', message: error, color: 'red' });
      return;
    }
    notifications.show({ title: 'Success', message: 'Entry deleted successfully', color: 'teal', autoClose: 2000 });
    const result = await getData("1D"); 
    dispatch(setTableData(result));
    const { data: resultDaily } = await apiCall<{ Expense?: number; Income?: number }>('GET', '/getdailydata', undefined, {
      useremail: localStorage.getItem('useremail'),
      userId: localStorage.getItem('uid'),
    });
    if (resultDaily) {
      dispatch(setIncome(resultDaily.Income || 0));
      dispatch(setExpense(resultDaily.Expense || 0));
    }
  };

  const getData = async (timeVal: string) => {
    if (timeVal === "1D") {
      const { data: queryData } = await apiCall<TableData[]>('GET', '/currdayentries', undefined, {
        useremail: localStorage.getItem('useremail'),
        userId: localStorage.getItem('uid'),
      });
      dispatch(setTableData(queryData || []));
      return queryData || [];
    } 
    if (timeVal === "1M") { 
      let prevMonth = sub(new Date(), { months: 1 }).toString();
      let dateString = format(prevMonth, 'MM/dd/yyyy');
      const { data: querData } = await apiCall<TableData[]>('GET', '/lastMonthData', undefined, {
        dateVal: dateString,
        useremail: localStorage.getItem('useremail'),
        userId: localStorage.getItem('uid'),
      });
      dispatch(setTableData(querData || []));
      return querData || [];
    } 
    if (timeVal === "1Y") {
      const { data: res } = await apiCall<TableData[]>('GET', '/lastYearData', undefined, {
        useremail: localStorage.getItem("useremail"),
        userId: localStorage.getItem('uid'),
      });
      dispatch(setTableData(res || []));
      return res || [];
    }
  };

  const handleEditSlider = (val: string) => {
    seteditEntryBox(val);
    seteditCategory(null);
  };

  const handleChange = async (e: any) => {
    const response: any = await getData(e);
    dispatch(setTableData(response));
  };

  useEffect(() => {
    const call = async () => {
      const result: any = await getData("1D");
      dispatch(setTableData(result));
    };
    call();
  }, [dispatch]);

  return (
    <div className={style["tableWrapper"]}>
      <div className={style['tableName']}>
        <div className={style['textInner']}>
          Recent Transactions
        </div>
        <div className={style['buttonGroup']}>
          <Button size="xs" leftSection={<img src={addImage} alt='Add' width={"10px"} height={"10px"}/>} onClick={open} variant="default">
            Add
          </Button>
          <SegmentedControl size="xs" color="magenta" data={["1D", "1M", "1Y"]} onChange={handleChange} />
        </div>
      </div>

      <Table.ScrollContainer minWidth={500} type="native">
        <Table striped withTableBorder className={style['tableMain']} stickyHeader withRowBorders={true} stickyHeaderOffset={0}>
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
            {Array.isArray(tableVal) && tableVal.map((element: TableData) => (
              <Table.Tr key={element._id}>
                <Table.Td>#{element._id.slice(0, 4)}...</Table.Td>
                <Table.Td>{element.category}</Table.Td>
                <Table.Td>{format(new Date(element.date), 'dd-MM-yyyy')}</Table.Td>
                <Table.Td>{element.entryType}</Table.Td>
                <Table.Td style={{ color: element.entryType === "Expense" ? 'red' : 'magenta' }}>
                  {element.entryType === "Expense" ? `- ₹ ${element.amount}` : `+₹ ${element.amount}`}
                </Table.Td>
                <Table.Td style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                  <ActionIcon variant="outline" aria-label='Delete' value={element._id} onClick={(e) => handleDelete(e.currentTarget.value)}>
                    <i className="uil uil-trash-alt"></i>   
                  </ActionIcon>
                  <ActionIcon variant='outline' value={element._id} aria-label="Edit" mx={10} onClick={(e) => { setEditModal(true); setEditTid(e.currentTarget.value); }}>
                    <i className="uil uil-pen"></i>
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>   
      </Table.ScrollContainer>

      {/* Add Transaction Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Add Transaction"
        transitionProps={{ transition: 'fade', duration: 400 }}
        centered
      >
        <Tabs defaultValue="Income" onChange={(val) => setType(val || "Income")}>
          <Tabs.List>
            <Tabs.Tab value="Income">Income</Tabs.Tab>
            <Tabs.Tab value="Expense">Expense</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Expense">
            <form onSubmit={handleSubmit}>
              <Select
                withAsterisk
                label="Category"
                placeholder="Select expense type"
                data={expenseCategories}
                value={category}
                onChange={(e: any) => setCategory(e)}
              />   
              <NumberInput
                withAsterisk
                label="Amount"
                allowNegative={false}
                placeholder="Enter value"
                value={amount}
                onChange={(e: any) => setAmount(Number(e) || 0)}
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

          <Tabs.Panel value='Income'>
            <form onSubmit={handleSubmit}>
              <Select
                withAsterisk
                label="Source of income"
                placeholder="Select type"
                data={incomeCategories}
                name="incomeType"
                value={category}
                onChange={(e: any) => setCategory(e)}
              />
              <NumberInput
                withAsterisk
                label="Amount"
                allowNegative={false}
                placeholder="Enter value"
                value={amount}
                onChange={(e: any) => setAmount(Number(e) || 0)}
              />
              <DatePickerInput
                label="Pick Date"
                clearable
                placeholder="pick date"
                value={datevalue}
                leftSection={<i className="uil uil-calender"></i>}
                onChange={handleDateChange}
              />
              <Button variant="filled" type='submit' className={style['submitButton']}>Submit</Button>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal opened={editModal} onClose={() => setEditModal(false)} title="Edit Entry" centered>
        <form onSubmit={handleEditForm}>
          <div style={{ margin: '10px 0px', fontWeight: '600' }}>
            Transaction Id: <Badge color='#8338ec'>{editTid}</Badge>
          </div>
          <SegmentedControl 
            color={'magenta'} 
            value={editEntryBox}
            onChange={handleEditSlider} 
            data={["Expense", "Income"]} 
          />
          <Select
            withAsterisk
            label="Category"
            placeholder="Select Category"
            data={editEntryBox === "Expense" ? expenseCategories : incomeCategories}
            value={editCategory}
            onChange={(e: any) => seteditCategory(e)}
          />
          <NumberInput 
            withAsterisk
            label="Amount"
            allowNegative={false}
            placeholder="Type Value"
            value={editAmount}
            onChange={(e: any) => setEditAmount(Number(e) || 0)}
          />
          <Button variant="outline" type='submit' className={style['submitButton']}>Submit</Button>
        </form>
      </Modal>
    </div>
  );
};