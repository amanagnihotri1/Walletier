import React,{useState} from 'react';
import '@mantine/core/styles.css';
import '@mantine/core/styles/LoadingOverlay.css';
import { TextInput,Button,Divider,PasswordInput,Loader,FileInput,LoadingOverlay} from '@mantine/core';
import { createUserWithEmailAndPassword, getAuth,GoogleAuthProvider, signInWithPopup, updateProfile} from 'firebase/auth';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/Overlay.css';
import style from '../Signup/Signup.module.scss';
import {doc,collection} from "firebase/firestore";
import { Database } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import {ReactComponent as Googleicon} from "../../assets/googleicon.svg";
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles/PasswordInput.css';
import '@mantine/core/styles/Divider.css'
import '@mantine/core/styles/Input.css';
import logo from "../../assets/happy.gif";
import {auth} from "../../Auth/firebaseAuth";
import brandLogo from "../../assets/wallet.png";
import { useLocation, useNavigate,Link} from 'react-router-dom';
import {UserData} from "../../app/TypeInterfaces";
import {addDoc} from "firebase/firestore";
import { notifications } from '@mantine/notifications';
import {useSelector,useDispatch} from "react-redux";
import { setAuthDetails,clearAuthDetails } from '../../Auth/authSlice';
export const Signup = () => { 
  const[userData,setUser]=useState({
  fullName:'',
  email:'',
  password:'',  
  });
  const[isLoading,setLoading]=useState<boolean>(false);
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [opened,setOpened] = useState(false);
  const store=useSelector((state:any)=>state.userinfo);
const handleClick=async(e:any)=>
{ 
  setLoading(true);
  const db=getDatabase();
  try
  {
    const auth=getAuth();
    const{email,password,fullName}=userData;
    const userCred=await createUserWithEmailAndPassword(auth,email,password);
    const user=userCred.user;
    console.log(user);
    dispatch(setAuthDetails({useremail:user.email,fullName:fullName}));
    console.log(email,password,fullName);
    user && notifications.show({
      title: 'Logged in Successfully',
      message: 'Welcome to the heaven of finance knowledge',
      autoClose:2000
    }); 
    user && navigate("/");
    setLoading(!isLoading);
  }
  catch(err:any)
  {
    notifications.show({
      title: 'Error detected',
      message: err.message,
      autoClose:4000,
    }); 
    setLoading(false);
  }
}  
let googleProvider=new GoogleAuthProvider();
const handleLogin=async()=>
{
  signInWithPopup(auth,googleProvider).then((response)=>
  {
    console.log(response.user);
  }).catch((err)=>
  {
    notifications.show({
    title: 'Error,Cannot process request at the moment',
    message: err.message,
  }); 
  })
}
  return (
    <div className={style['formWrapper']}>
    <div className={style['brandWrapper']}>
    <div className={style['brandInfo']}>
      <img src={brandLogo} alt="not_found" />
    </div>
    <h2>Walletier</h2>
      </div>
     <div className={style['formContainer']}>
     <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
     <div className={style['leftSide']}>
     <div className={style['titleMain']}>Welcome,</div>
     <TextInput
      label=" Full Name"
      type='text'
      withAsterisk
      placeholder="Enter full name"
      error={userData.fullName==="" && "Enter Full Name"}
      value={userData.fullName}
      onChange={(e)=>setUser({...userData,[e.target.name]:e.target.value})}
      name="fullName"
    />
     <TextInput
      label="Email ID"
      withAsterisk
      placeholder="Enter email ID"
      error={userData.email==="" && "Enter email ID"}
      value={userData.email}
      name="email"
      onChange={(e)=>setUser({...userData,[e.target.name]:e.target.value})}
      />
     <PasswordInput     
      label="Password"
      withAsterisk
      placeholder="Create password"
      name='password'
      error={userData.password==="" && "Please provide password"}
      value={userData.password}
      onChange={(e)=>setUser({...userData,[e.target.name]:e.target.value})}
      />
      <Button variant="filled" color="violet" className={style["buttonStyle"]}
       onClick={handleClick} disabled={!userData.email && !userData.password && !userData.fullName}
       >Submit</Button>
       <p 
       style={{padding:'0',margin:'0'}}
       >Already a user,
       <Link to={"/login"} replace>Click here</Link>
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
      onClick={handleClick}
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
