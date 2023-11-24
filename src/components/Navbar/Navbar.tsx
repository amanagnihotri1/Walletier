import React from 'react';
import { Drawer,List,Badge, NavLink,Button,Divider,ActionIcon } from '@mantine/core';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles/Divider.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/ActionIcon.css'
import '@mantine/core/styles/NavLink.css';
import style from "../../components/Navbar/navbar.module.scss";
import exitImage from "../../assets/logout.png"
import { UserData } from '../../app/TypeInterfaces';
import { clearAuthDetails,setError } from '../../Auth/authSlice';
import reportImage from "../../assets/report.png";
import savingsImage from "../../assets/savings.png";
import { useDisclosure } from '@mantine/hooks';
import newsImage from "../../assets/news.png";
import homeImage from "../../assets/home.png";
import brandLogo from "../../assets/wallet.png";
import { useDispatch,useSelector } from 'react-redux';
export const Navbar = ({signout}:{signout:()=>void}) => {
  const[opened,{open,close}]=useDisclosure(false);
  const dispatch=useDispatch();
  const userName=useSelector((state:any)=>state.authReducer.fullName);
  const userprofile=useSelector((state:any)=>state.authReducer.profileImage);
    return (
      <div className={style["menuList"]}>
      <div className={style["roundedButton"]}>
      <div className={style["group"]}>
      <div className={style["usericon"]}>
    <img src={userprofile} alt="not_found" />
    </div>
    <h3>{userName}</h3>
      </div>
    <ActionIcon size={32} variant="default" onClick={signout}>
    <img src={exitImage} alt="" width={"16px"} height={'16px'}/>
    </ActionIcon>
    </div>
     <NavLink label="Default" className={style["menuItem"]} leftSection={<img src={homeImage} alt="not found" width={"30px"} height={"30px"}
     />} /> 
     <NavLink label="Goal Generator" className={style["menuItem"]} leftSection={<img src={savingsImage} width={"30px"} height={"30px"} alt="not found"/>} /> 
     <NavLink label="Generate reports" className={style["menuItem"]} leftSection={<img src={reportImage} width={"30px"} height={"30px"} alt="not found"/>} /> 
     <NavLink label="Learn more" className={style["menuItem"]} leftSection={<img src={newsImage} width={"30px"} height={"30px"} alt="not found"/>} /> 
      <div className={style["logoWrapper"]}>
        <p style={{
        fontWeight:'500',
        fontSize:'12px',  
        }}>Powered by</p>
        <div className={style["logoimgwrapper"]}>
        <img src={brandLogo} alt="not_found" />
        </div>
        <h4
        style={{fontWeight:'600'}}
        >Walletier</h4>
        </div>
     </div> 
  )
}
