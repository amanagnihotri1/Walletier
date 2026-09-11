import React from 'react';
import style from "../pages/home.module.scss";
import { Navbar } from '../components/Navbar/Navbar';
import MonthlyGoal from '../components/MonthlyGoal/MonthlyGoal';
import { useSelector } from 'react-redux';
import { Transactions } from '../components/Transactions/Transactions';
import Cardgroup from '../components/cardGroup/Cardgroup';
import { RootState } from '../app/store';

export const Home = () => {
  const authid = useSelector((state: RootState) => state.authReducer.uid);
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
