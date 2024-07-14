import React,{useState} from 'react';
import '@mantine/core/styles.css';
import '@mantine/core/styles/LoadingOverlay.css';
import { TextInput,Button,Divider,PasswordInput,LoadingOverlay} from '@mantine/core';
import { createUserWithEmailAndPassword, getAuth,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/Overlay.css';
import style from '../Signup/Signup.module.scss';
import {ReactComponent as Googleicon} from "../../assets/googleicon.svg";
import '@mantine/core/styles/PasswordInput.css';
import '@mantine/core/styles/Divider.css'
import '@mantine/core/styles/Input.css';
import logo from "../../assets/happy.gif";
import {auth} from "../../Auth/firebaseAuth";
import brandLogo from "../../assets/wallet.png";
import { useNavigate,Link} from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import {useDispatch} from "react-redux";
import { setAuthDetails } from '../../Auth/authSlice';
import { updateProfile } from 'firebase/auth';
export const Signup = () => { 
  const[userData,setUser]=useState({
  fullName:'',
  email:'',
  password:'',  
  });
  const[isLoading,setLoading]=useState<boolean>(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
const handleClick=async(e:any)=>
{ 
  setLoading(true);
  try
  {
    const auth=getAuth();
    const{email,password,fullName}=userData;
    const userCred=await createUserWithEmailAndPassword(auth,email,password);
    const user=userCred.user;
    updateProfile(userCred.user,{displayName:fullName});
    user && notifications.show({
      title: 'User created succesfully',
      message: 'You can login now',
      autoClose:2000
    }); 
    user && navigate("/login");
    setLoading(!isLoading);
  }catch(err:any)
  {
    notifications.show({
      title: 'Error detected',
      message: err.message,
      autoClose:2000
    }); 
    setLoading(false);
  }
}  
const handleLogin=async()=>
{
  try
  {
    let googleProvider=new GoogleAuthProvider();
    const response=await signInWithPopup(auth,googleProvider);
    dispatch(setAuthDetails({useremail:response?.user?.email,fullName:response?.user?.displayName,uid:response?.user?.uid,profileImage:response?.user?.photoURL}))
    navigate("/");
    notifications.show({
    title:"Success",
    message:"Logged in successfully.",  
  })
  }catch(err:any)
  {
    notifications.show({
    title: 'Error',
    message: err.message
  });
}
}
  return (
    <div className={style['formWrapper']}>
    <div className={style['brandWrapper']}>
    <div className={style['brandInfo']}>
      <img src={brandLogo} alt="not_found" />
    </div>
    <h1>Walletier</h1>
      </div>
     <div className={style['formContainer']}>
     <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
     <div className={style['leftSide']}>
     <div className={style['titleMain']}>Signup</div>
     <TextInput
      type='text'
      leftSection={<i className="uil uil-user"></i>}
      withAsterisk
      placeholder="Enter full name"
      error={userData.fullName==="" && "Enter Full Name"}
      value={userData.fullName}
      onChange={(e)=>setUser({...userData,[e.target.name]:e.target.value})}
      name="fullName"
    />
     <TextInput
      withAsterisk
      placeholder="Enter email ID"
      leftSection={<i className="uil uil-at"></i>}
      error={userData.email==="" && "Enter email ID"}
      value={userData.email}
      name="email"
      onChange={(e)=>setUser({...userData,[e.target.name]:e.target.value})}
      />
     <PasswordInput     
      withAsterisk
      placeholder="Create password"
      leftSection={<i className="uil uil-asterisk"></i>}
      name='password'
      error={userData.password==="" && "Please provide password"}
      value={userData.password}
      onChange={(e)=>setUser({...userData,[e.target.name]:e.target.value})}
      />
      <Button variant="filled" fullWidth color="violet" className={style["buttonStyle"]}
       onClick={handleClick} disabled={!userData.email && !userData.password && !userData.fullName}
       >Submit</Button>
       <p 
       style={{padding:'0',margin:'0',fontSize:'0.8rem'}}
       >Already a user,
       <Link to={"/login"} replace style={{fontWeight:'600',fontSize:'1.0rem'}}>Click here</Link>
       </p>
      <Divider 
      my="md" 
      label="OR" 
      labelPosition="center"
      style={{margin:'0px'}}
      />
      <Button 
      variant="filled" 
      color="violet" 
      className={style["buttonStyle"]}
      leftSection={<Googleicon />}
      type='button'
      onClick={handleLogin}
      >
      Login
      </Button>
      </div>
      <div className={style['imgWrapper']}>
      <img src={logo} alt="Not Found" />
      </div>
      </div>
      </div>
      
  );
}
