import style from "../cardGroup/cardgroup.module.scss";
import '@mantine/core/styles/Badge.css';
import CountUp from 'react-countup';
import { LineChart, Line, Tooltip,ResponsiveContainer } from 'recharts';
import coinImage from "../../assets/coin.png";
import {ReactComponent as ExpenseImage} from "../../assets/expense_svg.svg"; 
import { RingProgress,Text,Badge } from '@mantine/core';
import savingBag from "../../assets/savings1.png";
import { useSelector } from 'react-redux';
import { Expensegraph } from '../ExpenseGraph/Expensegraph';
export const Cardgroup = () => {
  const savingValue=useSelector((state:any)=>state.cardSlice.savings);
  const expenseValue=useSelector((state:any)=>state.cardSlice.expenses);
  const incomeValue=useSelector((state:any)=>state.cardSlice.income);
  console.log(savingValue);
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
    </div>
    <div className={style['tileIcon']}><img src={coinImage} alt="not_found" />
    </div>  
     <div className={style['saveinfo']}>
     <div>Total Income</div>
     </div> 
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ <CountUp end={incomeValue}/></div>
     <ResponsiveContainer width="100%" height="40%">
        <LineChart width={250} height={60} data={data}>
          <Line type="monotone" dataKey="amount" stroke="#4361ee" strokeWidth={3} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><ExpenseImage  />
    </div>   
     <div>Total Expenses</div>
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ <CountUp end={expenseValue}/></div>
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
     <div>Saving</div>
     <Badge color="magenta">Till now</Badge>
     </div>
     <div style={{
       fontWeight:'600',
     fontSize:'24px',
     display:'flex'
     }}>
      $ <CountUp end={incomeValue-expenseValue}/>
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
    <div className={`${style.incomeTile} ${style.savingTile} ${style.analysisTile}`}> 
      <i className='bx bx-credit-card-front bx-sm cardIcon'></i> 
     <div className={style['analysisText']}>
     Expense Analysis</div>
      <Expensegraph/>
    </div>
    </div>
  )
}
