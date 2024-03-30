import React,{ useEffect,useState} from 'react';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/carousel/styles.css';
import style from "../pages/home.module.scss";
import '@mantine/dates/styles.css';
import '@mantine/core/styles/Text.css';
import { Navbar } from '../components/Navbar/Navbar';
import MonthlyGoal from '../components/MonthlyGoal/MonthlyGoal';
import { useSelector,useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { clearAuthDetails, setAuthDetails} from '../Auth/authSlice';
import { Transactions } from '../components/Transactions/Transactions';
import Cardgroup  from '../components/cardGroup/Cardgroup';
export const Home = () => {
const dispatch=useDispatch();
 useEffect(()=>
 {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) 
    dispatch(setAuthDetails({useremail:user?.email,fullName:user?.displayName,uid:user?.uid,profileImage:user?.photoURL}));
    else{
      dispatch(clearAuthDetails());
    }
  });
 },[]);
  const userfullName=useSelector((state:any)=>state.authReducer.fullName);
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
