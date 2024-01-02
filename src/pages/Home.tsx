import React,{ useEffect } from 'react';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/carousel/styles.css';
import style from "../pages/home.module.scss";
import '@mantine/core/styles/Text.css';
import { Navbar } from '../components/Navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { clearAuthDetails, setAuthDetails} from '../Auth/authSlice';
import { Transactions } from '../components/Transactions/Transactions';
import { Cardgroup } from '../components/cardGroup/Cardgroup';
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
  return (
    <div className={style["mainWrapper"]}>
    <Navbar />
    <div className={style['mainText']}>
    <p style={{display:'inline-block',fontWeight:'500',fontSize:'1.2rem',margin:'0'}}>
    Welcome,
    </p>
    {userfullName}
     <p
      style={{
        margin:'0px',
        fontWeight:'400',
        fontSize:'12px',
      }}
     >Now handle your expenses at ease</p>  
    </div>
    <div className={style['subWrapper']}>
    <div className={style['leftWrap']}>
    <Cardgroup />
     </div>
     <div className={style['rightWrap']}>
     <Transactions/> 
    </div>
    </div>
    </div>
  )
}
