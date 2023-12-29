
import '@mantine/core/styles/Notification.css';
import React,{useState} from 'react';
import '@mantine/core/styles/Loader.css';
import brandLogo from "../../assets/wallet.png";
import '@mantine/core/styles/LoadingOverlay.css';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { TextInput,PasswordInput,Button,LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from "../Login/login.module.scss";
import { notifications } from '@mantine/notifications';
import { setAuthDetails } from '../../Auth/authSlice';
export const Login= () => {
 const navigate=useNavigate();
 const dispatch=useDispatch();
 const[visible,{toggle}]=useDisclosure(false);
 const[isLoading,setLoading]=useState<boolean>(false);
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
       dispatch(setAuthDetails({useremail:usermain?.email,fullName:usermain?.displayName,uid:usermain.uid}));
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
    <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
    <div className={style['brandCover']}>
      <img src={brandLogo} alt="not_found" width={50} height={50}/>
      </div>
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
      <p style={{letterSpacing:'0.34px',fontSize:'12px'}}>Visiting first time,<Link style={{fontWeight:'bold',color:'#00A',fontSize:'14px'}} to={"/signup"}>Signup Here</Link></p>
      </div>
    </div>
    </div>  
  )
};
