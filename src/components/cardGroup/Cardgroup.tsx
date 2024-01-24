import style from "../cardGroup/cardgroup.module.scss";
import '@mantine/core/styles/Badge.css';
import CountUp from 'react-countup';
import coinImage from "../../assets/coin.png";
import {ReactComponent as ExpenseImage} from "../../assets/expense_svg.svg"; 
import {Badge } from '@mantine/core';
import savingBag from "../../assets/savings1.png";
import { useSelector } from 'react-redux';
import { Sparkline } from '@mantine/charts';
import { Expensegraph } from '../ExpenseGraph/Expensegraph';
export const Cardgroup = () => {
  const expenseValue=useSelector((state:any)=>state.cardSlice.expenses);
  const incomeValue=useSelector((state:any)=>state.cardSlice.income);
    return (
    <div className={style["cardWrapper"]}>
    <div className={style['incomeTile']}>
    <div className={style['expandimg']}>
    </div>
    <div className={style['tileIcon']}><img src={coinImage} alt="not_found" />
    </div>  
     <div className={style['saveinfo']}>
     <div style={{color:'#868e96',fontWeight:'600'}}>Total Income</div>
     </div> 
     <div style={{fontWeight:'700',fontSize:'26px'}}>$ <CountUp end={incomeValue}/></div>
     <Sparkline
      w={"100%"}
      h={120}
      data={[10, 20, 40, 20, 40, 10, 50]}
      curveType="linear"
      color="blue"
      fillOpacity={0.6}
      strokeWidth={1.9}
    />
    </div>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><ExpenseImage  />
    </div>   
     <div style={{color:'#868e96',fontWeight:'600'}}>Total Expenses</div>
     <div style={{fontWeight:'700',fontSize:'26px'}}>$ <CountUp end={expenseValue}/></div>
       <Sparkline
      w={"100%"}
      h={120}
      data={[10, 20, 40, 20, 40, 10, 50]}
      curveType="linear"
      color="blue"
      fillOpacity={0.6}
      strokeWidth={1.9}
    />
    </div>
    <div className={`${style.incomeTile} ${style.savingTile}`}>
    <div className={style['tileIcon']}><img src={savingBag} alt="not_found" />
    </div>   
     <div className={style['saveinfo']}>
     <div style={{color:'#868e96',fontWeight:'600'}}>Saving</div>
     <Badge color="magenta">Till now</Badge>
     </div>
     <div style={{
       fontWeight:'700',
     fontSize:'26px',
     display:'flex'
     }}>
      $ <CountUp end={incomeValue-expenseValue}/>
      </div>
      <div className={style['piggyBank']}>
     <img src='https://static.vecteezy.com/system/resources/thumbnails/013/083/708/small/piggy-bank-and-glasses-with-gold-coins-money-saving-money-concept-3d-illustration-or-3d-render-png.png' alt="" />
      </div>
    </div>
    <div className={`${style.incomeTile} ${style.analysisTile}`}> 
      <i className='bx bx-credit-card-front bx-sm cardIcon'></i> 
     <div className={style['analysisText']} style={{color:'#868e96',fontWeight:'600',fontSize:'16px'}}>
     Expense Analysis</div>
      <Expensegraph/>
    </div>
    </div>
  )
}
