import React, { useState } from 'react';
import apiCall from '../../utils/apiService';
import { SignupResponse } from '../../app/TypeInterfaces';
import { TextInput, Button, PasswordInput, LoadingOverlay } from '@mantine/core';
import style from '../Signup/Signup.module.scss';
import logo from "../../assets/happy.gif";
import { useNavigate, Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

export const Signup = () => { 
  const [userData, setUser] = useState({
    fullName: '',
    email: '',
    password: '',  
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = async () => { 
    setLoading(true);
    try { 
      const { email, password, fullName } = userData;
      const { data: userCred, error } = await apiCall<SignupResponse>('POST', '/auth/signup', {
        useremail: email,
        userpassword: password,
        userName: fullName,
      });

      if (error || !userCred) {
        notifications.show({
          title: 'Error detected',
          message: error || 'Failed to signup',
          autoClose: 2000,
        });
        setLoading(false);
        return;
      }

      notifications.show({
        title: 'User created succesfully',
        message: 'You can login now',
        autoClose: 2000,
      }); 
      navigate("/auth/login");
      setLoading(false);
    } catch (err: any) {
      notifications.show({
        title: 'Error detected',
        message: err.message,
        autoClose: 2000,
      }); 
      setLoading(false);
    }
  }; 
// This will return back
// const handleLogin=useGoogleLogin({ 
//  onSuccess: async(tokenResponse) =>{
//    console.log(tokenResponse);
//    const userInfo:any = await axios.get(
//       'https://www.googleapis.com/oauth2/v3/userinfo',
//       { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
//     );
//     console.log(userInfo);
//     // const userCred=await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`,{useremail:userInfo.data.email,userpassword:password,userName:fullName});
//     //  dispatch(setAuthDetails({useremail:userInfo.data.email,fullName:userInfo.data.name,profileImage:userInfo.data.picture,uid:userInfo.data.sub,token:userInfo.data.sub}));
      
//      localStorage.setItem("uid",userInfo.data.sub);
//    navigate(`/user/${localStorage.getItem("uid")}`);
//  } 
// });
  return (
    <div className={style['formWrapper']}>
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
      error={userData.fullName==="" && "Enter full name"}
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
       <Link to={"/auth/login"} replace style={{fontWeight:'600',fontSize:'1.0rem'}}>Click here</Link>
       </p>
      {/* <Divider 
      my="md" 
      label="OR" 
      labelPosition="center"
      style={{margin:'0px'}}
      /> */}
      {/* 
       Google login functionality will be fixed soon
      <Button 
      variant="filled" 
      color="violet" 
      className={style["buttonStyle"]}
      leftSection={<Googleicon />}
      type='button'
      onClick={()=>handleLogin()}
      >
      Login
      </Button> */}
      </div>
      <div className={style['imgWrapper']}>
      <img src={logo} alt="Not Found" />
      </div>
      </div>
      </div>
      
  );
}
