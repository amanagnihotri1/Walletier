/* eslint-disable @typescript-eslint/no-unused-vars */

import '@mantine/core/styles/Notification.css';
import React,{useState} from 'react';
import '@mantine/core/styles/Loader.css';
import brandLogo from "../../assets/wallet.png";
import '@mantine/core/styles/LoadingOverlay.css';
import { auth } from '../../Auth/firebaseAuth';
import { getAuth,signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import { TextInput,PasswordInput,Button,LoadingOverlay,Checkbox,Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from "../Login/login.module.scss";
import { notifications } from '@mantine/notifications';
import { setAuthDetails } from '../../Auth/authSlice';
export const Login= () => {
 const navigate=useNavigate();
 const dispatch=useDispatch();
 const[doesExist,setExist]=useState<Boolean>(false);
 const[visible,{toggle}]=useDisclosure(false);
 const[isLoading,setLoading]=useState(false);
 const[agreeVal,setAgreeValue]=useState('');
 const[userinfo,setUserInfo]=useState<{email:string; password:string}>({
  email:'',
  password:'',
});
const handleReset=async()=>
{
   console.log(auth);
  const data:any= await sendPasswordResetEmail(auth,userinfo.email);
  console.log(data);
  if(!data)
  {
    notifications.show({title:"Success",message:'Password Reset link sent successfully',autoClose:2000});
    setExist(true);
  }
  else{
    notifications.show({title:"error",message:"error found !!"});
   setExist(false);
  }
}
const handleClick=async()=>
{   
  try
  {    
       const auth=getAuth();
       const{email,password}=userinfo;
       const userCred=await signInWithEmailAndPassword(auth,email,password);
       const usermain = userCred.user;
       localStorage.setItem("uid",usermain.uid);
       console.log(usermain);
       dispatch(setAuthDetails({useremail:usermain?.email,fullName:usermain?.displayName,uid:usermain?.uid}));
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
    <Text className={style['headingTitle']} fw={700} variant={'gradient'}
     gradient={{ from: 'violet', to: 'rgba(56, 55, 55, 1)', deg: 147 }}
    >Login</Text>
    <TextInput
      label="Email ID"
      withAsterisk
      color='#FFF'
      required
      leftSection={<i className="uil uil-envelope-check"></i>}
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
        leftSection={<i className="uil uil-keyhole-circle"></i>}
        name='password'
        onChange={(e)=>setUserInfo({...userinfo,[e.target.name]:e.target.value})}
        />
       <div className={style.extraButtons}>
       <div>
       <Checkbox
      label="Remember me"
      variant="outline"
      onChange={()=>setAgreeValue(userinfo.email)}
      />
      </div>
      <Link to={doesExist?"/auth/action":'/login'} 
      onClick={handleReset}
      className={style.resetPass} 
      style={{
        fontWeight:'400',
        color:'#00A',
        fontSize:'14px',
        textAlign:'right',
        display:userinfo.email?'block':'none',
        }}
        >
        Reset Password
         </Link>
       </div>
      <Button variant="Outline"
      className={style.logButton}
      onClick={handleClick}
      disabled={!userinfo.email && !userinfo.password}
      >Login</Button>
      <p style={{letterSpacing:'0.34px',fontSize:'12px'}}>Visiting first time,<Link style={{fontWeight:'bold',color:'#00A',fontSize:'14px'}} to={"/signup"}>Signup Here</Link></p>
      </div>
    </div>
    </div>  
  )
};
