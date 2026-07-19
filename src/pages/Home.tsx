import React from 'react';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/carousel/styles.css';
import style from "../pages/home.module.scss";
import '@mantine/dates/styles.css';
import '@mantine/core/styles/Text.css';
import { Navbar } from '../components/Navbar/Navbar';
import MonthlyGoal from '../components/MonthlyGoal/MonthlyGoal';
import { useSelector} from 'react-redux';
import { Transactions } from '../components/Transactions/Transactions';
import Cardgroup  from '../components/cardGroup/Cardgroup';
export const Home = () => {
const authid:any=useSelector((state:any)=>state.authReducer.authuid);
  return (
    <div className={style["mainWrapper"]}>
    <Navbar />
    <div className={style['mainText']}>
    <MonthlyGoal uid={authid || localStorage.getItem("uid")}/>
    </div>
    <div className={style['subWrapper']}>
    <div className={style['leftWrap']}>
    <Cardgroup />
    </div> 
     <div className={style['rightWrap']}>
     <Transactions/>
    </div>
    </div>
    <div className={style['bottomText']}>Made With ❣ by Aman Agnihotri</div>
    </div>
  )
}
