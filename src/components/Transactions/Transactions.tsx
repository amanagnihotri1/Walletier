import React,{useState} from 'react';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Table.css';
import type * as CSS from 'csstype';
import { Category,IncomeCategory } from '../../utils/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import style from "../Transactions/transaction.module.scss";
import delImage from "../../assets/trash.png";
import editImage from "../../assets/edit.png";
import addImage from "../../assets/plus.png";
import { useDisclosure } from '@mantine/hooks';
import { Table,ActionIcon,Button,SegmentedControl,Fieldset,TextInput,Modal,Select,Tabs, NumberInput,Transition } from '@mantine/core';
export const Transactions = () => {
  const [activeTab, setActiveTab] = useState<string | null>('Income');
  const handleSubmit=()=>
 {
  console.log("Hellew");
 }
  const [opened, { open, close }] = useDisclosure(false);
  const elements = [
    { position: 445423, mass: '12/10/2023', symbol: 'C', name: 'Shopping',amount:2500},
    { position: 32425, mass:'12/10/2023', symbol: 'N', name: 'Misclleneous',amount:22500 },
    { position: 3242, mass: '12/10/2023', symbol: 'Y', name: 'Grocery',amount:5500 },
    { position: 343242, mass: '02/10/2023', symbol: 'Ba', name: 'Daily Needs',amount:12500 },
    { position: 32424, mass: '12/06/2023', symbol: 'Ce', name: 'Rent',amount:4500 },
  ];
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}
    >
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>₹{element.amount}</Table.Td>
      <Table.Td>
        <ActionIcon variant="default" aria-label="Settings" onClick={open}
        style={{marginRight:'10px'}}
        >
      <img src={delImage} alt="" width={"15px"} height={"15px"}/>
    </ActionIcon>
        <ActionIcon variant="default" aria-label="Settings">
      <img src={editImage} alt="" width={"15px"} height={"15px"}/>
    </ActionIcon>
    </Table.Td>
    </Table.Tr>
  ));
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
      <SegmentedControl color="blue" data={['1D', '1Y', '1M']} />
       </div>
      </div>
      <Table className={style['tableMain']}
       highlightOnHover
      >
      <Table.Thead>
        <Table.Tr>
          <Table.Th >Transcation ID</Table.Th>
          <Table.Th>Category Name</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
    <Table.Tbody>
      {rows}
    </Table.Tbody>
    </Table>
    {opened && 
    <Modal opened={opened} onClose={close} title="Add Transaction" centered>
    <Tabs defaultValue="Expense">
      <Tabs.List>
        <Tabs.Tab value="Income" >
          Income
        </Tabs.Tab>
        <Tabs.Tab value="Expense" >
          Expense
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='Expense'>
      <form action="post" onSubmit={handleSubmit}>
      <TextInput
      label="Name"
      placeholder="Entry Name"
      />
      <TextInput
      withAsterisk
      label="Description"
      placeholder="Entry Name"
    />
     <Select
     withAsterisk
     label="Category"
     placeholder="Select expense type"
     data={Category}
     />
      <Button variant="filled" className={style['submitButton']}>Submit</Button>
      </form>
     </Tabs.Panel>
     <Tabs.Panel value='Income'>
     <form action="post" onSubmit={handleSubmit}>
       <Select
       withAsterisk
       label="Source of income"
       placeholder="Select expense type"
       data={IncomeCategory}
       />
      <NumberInput
      withAsterisk
      label="Amount"
      allowNegative={false}
      placeholder="Enter value"
      />
    <Button variant="filled" type='submit' className={style['submitButton']}>Submit</Button>
      </form>
      </Tabs.Panel>
      </Tabs>
      </Modal>
      }   
    </div>
  )
}
