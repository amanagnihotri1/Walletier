
import '@mantine/core/styles/Notification.css';
import React,{useEffect, useState} from 'react';
import '@mantine/core/styles/Loader.css';
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged,updateProfile } from 'firebase/auth';
import { TextInput,PasswordInput,Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate,Link, useNavigate } from 'react-router-dom';
import style from "../Login/login.module.scss";
import rocketImage from "../../assets/business-startup.png";
import { notifications } from '@mantine/notifications';
import { setAuthDetails } from '../../Auth/authSlice';
export const Login= () => {
 const navigate=useNavigate();
 const dispatch=useDispatch();
 const store=useSelector((state:any)=>state.authReducer);
 const[visible,{toggle}]=useDisclosure(false);
 const[userinfo,setUserInfo]=useState<{email:string; password:string}>({
  email:'',
  password:'',
});
const handleClick=async()=>
{   
  try
  {    
       const auth=getAuth();
       const{email,password}=userinfo;
       const userCred=await signInWithEmailAndPassword(auth,email,password);
       const usermain = userCred.user;
       console.log(auth.currentUser);
       dispatch(setAuthDetails({useremail:usermain?.email,fullName:usermain?.displayName}));
       usermain && navigate("/");
       notifications.show({title:"Success",message:"User loggedin successfully"});
      }
      catch(err:any)
      {
        notifications.show({title:"Error,try again",message:err.message});
      }
  }
 return (
   <div className={style['loginbackground']}>
    <div className={style['loginWrapper']}>
    <div className={style['leftForm']}>
    <h1 className={style['headingTitle']}>Login</h1>
    <TextInput
      label="Email ID"
      withAsterisk
      color='#FFF'
      required
      name='email'
      placeholder="Enter Email ID"
      onChange={(e)=>setUserInfo({...userinfo,[e.target.name]:e.target.value})}
      />
      <PasswordInput
        label="Password"
        visible={visible}
        onVisibilityChange={toggle}
        placeholder="Enter password"
        required
        name='password'
        onChange={(e)=>setUserInfo({...userinfo,[e.target.name]:e.target.value})}
        />
      <Button variant="filled"
      className='logButton'
      onClick={handleClick} 
      disabled={!userinfo.email && !userinfo.password}
      >Login</Button>
      <p style={{color:'#FFF'}}>Visiting first time,<Link style={{fontWeight:'bold',color:'#00A'}} to={"/signup"}>Signup Here</Link></p>
      </div>
      <div className={style['rightSVG']}>
      <img src={rocketImage} alt=""/>
      </div>
    </div>
    </div>  
  )
};
