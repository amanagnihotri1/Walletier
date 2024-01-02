import React from 'react';
import {Button} from '@mantine/core';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles/Divider.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/ActionIcon.css'
import '@mantine/core/styles/NavLink.css';
import style from "../../components/Navbar/navbar.module.scss";
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { clearAuthDetails } from '../../Auth/authSlice';
import brandLogo from "../../assets/wallet.png";
import {useDispatch, useSelector } from 'react-redux';
import { clearData } from '../cardGroup/cardSlice';
export const Navbar = () => {
const dispatch=useDispatch();
const navigate=useNavigate();
const HandleLogout=async()=>
  {
    let authUser=getAuth();
    await authUser.signOut();
    dispatch(clearAuthDetails());
    dispatch(clearData());
    navigate("/login");
  
  } 
  const userName=useSelector((state:any)=>state.authReducer.fullName);
  const userprofile=useSelector((state:any)=>state.authReducer.profileImage);
  console.log(userprofile); 
  return (
      <div className={style["menuList"]}>
        <div className={style['linkWrapper']}>
        <div className={style["logoWrapper"]}>
        <div className={style["logoimgwrapper"]}>
        <img src={brandLogo} alt="not_found" />
        </div>
        <h4
        style={{fontWeight:'600',textOverflow:"clip",overflow:'hidden'}}
        >Walletier</h4>
        </div>
     </div>
     <div className={style["roundedButton"]}>
      <div className={style["group"]}>
      <div className={style["usericon"]}>
    <img src={userprofile} alt="not_found" />
    </div>
    <h3>{userName}</h3>
    </div>
    <Button variant="filled" color={"#ffffff"} onClick={HandleLogout}>Logout</Button>
    </div>
     </div> 
  )
}
