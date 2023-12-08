import React,{useState} from 'react';
import { NavLink,Divider,ActionIcon} from '@mantine/core';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles/Divider.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/ActionIcon.css'
import '@mantine/core/styles/NavLink.css';
import style from "../../components/Navbar/navbar.module.scss";
import exitImage from "../../assets/logout.png"
import {ReactComponent as GenReports} from "../../assets/genreports.svg";
import {ReactComponent as GoalGenerator} from "../../assets/creategoal.svg";
import {ReactComponent as HomeImage} from "../../assets/house.svg";
import brandLogo from "../../assets/wallet.png";
import {ReactComponent as LearnMore} from "../../assets/learnmore.svg";
import {useSelector } from 'react-redux';
export const Navbar = ({signout}:{signout:()=>void}) => {
  const [active, setActive] = useState<number>(0);
  const userName=useSelector((state:any)=>state.authReducer.fullName);
  const userprofile=useSelector((state:any)=>state.authReducer.profileImage);
  const data:{icon:any,label:string; leftSection?:JSX.Element | undefined, size?:string; stroke?:number}[]=[
  { icon: HomeImage, label: 'Default'},
  {
    icon:GoalGenerator,
    label: 'Create Goal',
  },
  { icon:GenReports, 
    label:"Generate Report",
  },
  {
    icon:LearnMore,
    label: 'Learn more',
  },
];
  return (
      <div className={style["menuList"]}>
        <div className={style['linkWrapper']}>
        <div className={style["logoWrapper"]}>
        <div className={style["logoimgwrapper"]}>
        <img src={brandLogo} alt="not_found" />
        </div>
        <h4
        style={{fontWeight:'600'}}
        >Walletier</h4>
        </div>
    <Divider  w={"100%"}/>
     {data?.map((item:any,index:number)=>(
      <NavLink label={item.label} 
       className={style["menuItem"]} 
       leftSection={<item.icon size={"0.6rem"} stroke={1.8}/>}
       active={index===active} 
       onClick={()=>setActive(index)}
        /> 
      ))
      } 
     </div>
      <Divider  w={"100%"} mb={"40px"}/>
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
     </div> 
  )
}
