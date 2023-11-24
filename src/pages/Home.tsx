import React, { useEffect, useState } from 'react';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
import style from "../pages/home.module.scss";
import { getAuth,onAuthStateChanged,signOut,updateProfile} from 'firebase/auth';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { auth } from '../Auth/firebaseAuth';
import { Login } from '../components/Login/Login';
import { useLocation } from 'react-router-dom';
import { UserData } from '../app/TypeInterfaces';
import { Navbar } from '../components/Navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { Transactions } from '../components/Transactions/Transactions';
import { clearAuthDetails, setAuthDetails, setError } from '../Auth/authSlice';
import { Cardgroup } from '../components/cardGroup/Cardgroup';
import { Button, Card,List,ColorSwatch } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const store=useSelector((state:any)=>state.authReducer);
  const[isLoggedin,setLoggedin]=useState(false);
  const userEmail=useSelector((state:any)=>state.authReducer.email);
  const userfullName=useSelector((state:any)=>state.authReducer.fullName);
  const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  useEffect(()=>
  {
      onAuthStateChanged(auth,(user:any) => {
      if (user) 
      { 
        console.log(user);
        dispatch(setAuthDetails({fullName:user?.displayName,useremail:user?.email}));
       updateProfile(user,{displayName:userfullName}); 
      } else {
        dispatch(clearAuthDetails());
        navigate("/login");
      }
    });
  });
  
  console.log(location.state);
  const handleLogout=()=>
  {
    const auth=getAuth();
    signOut(auth);
    dispatch(clearAuthDetails());
    navigate("/login");
  } 
  return (
    <div className={style["mainWrapper"]}>
    <Navbar signout={handleLogout} />
    <div className={style['subWrapper']}>
    <div className={style['userBanner']}>
     Welcome,{userfullName}
     <p>Our Expense tracker is AI based</p> 
    </div>
    <div className={style['leftWrapper']}>
    <div className={style['leftWrap']}>
    <Cardgroup/>
    <Transactions/>
    </div>
    <div className={style['rightWrap']}>
    <div className={style['expense-graph']}>
     <div className={style['textHeading']}>Expense Analysis</div>
     <ResponsiveContainer>
     <PieChart width={600} height={400}
     >
        <Pie
          data={data2}
          cx={80}
          cy={80}
          innerRadius={67}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={3}
          cornerRadius={100}
          dataKey="value"
          isAnimationActive={true}
          >
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
          ))}
        </Pie> 
      </PieChart>
          </ResponsiveContainer>
    <List>
     <List.Item>
     <ColorSwatch color="#009790" />
      </List.Item> 
    </List>
    </div> 
    </div>
    </div>
    </div>
    </div>
  )
}
