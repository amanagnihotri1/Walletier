/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import brandLogo from "../../assets/wallet.png";
import { TextInput, PasswordInput, Button, LoadingOverlay, Checkbox, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from "../Login/login.module.scss";
import { notifications } from '@mantine/notifications';
import { setAuthDetails } from '../../Auth/authSlice';
import apiCall from '../../utils/apiService';
import { LoginResponse } from '../../app/TypeInterfaces';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useremail = useSelector((state: any) => state.authReducer.useremail);
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setLoading] = useState(false);
  const [agreeVal, setAgreeValue] = useState('');
  const [userinfo, setUserInfo] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleClick = async () => {
    try {
      setLoading(true);
      const { email, password } = userinfo;
      const { data, error } = await apiCall<LoginResponse>('POST', '/auth/login', {
        userEmail: email,
        userPass: password,
      });

      if (error || !data) {
        notifications.show({ title: "Error, try again", message: error || "Login failed" });
        setLoading(false);
        return;
      }

      localStorage.setItem("tknum", data.token);
      localStorage.setItem("uid", data.userDetails._id);
      localStorage.setItem("useremail", data.userDetails.email);
      localStorage.setItem("fullName", data.userDetails.fullName);
      localStorage.setItem("profileImage", data.userDetails.profileImage || "");

      dispatch(
        setAuthDetails({
          useremail: data.userDetails.email,
          fullName: data.userDetails.fullName,
          uid: data.userDetails._id,
          token: data.token,
          profileImage: data.userDetails.profileImage,
          monthlyGoal: data.userDetails.monthlyGoal,
          error: '',
        })
      );

      data.userDetails && navigate(`/user/${data.userDetails._id}`);
      notifications.show({ title: "Success", message: "User logged in successfully" });
    } catch (err: any) {
      notifications.show({ title: "Error, try again", message: err.message });
    } finally {
      setLoading(false);
    }
  };
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
    <Text className={style['headingTitle']} fw={700} variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
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
      <Link to={"/auth/forgetPassword"} 
      className={style.resetPass} 
      style={{
        fontWeight:'400',
        color:'#00A',
        fontSize:'14px',
        textAlign:'right',
        display:'block'
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
      <p style={{letterSpacing:'0.34px',fontSize:'12px'}}>Visiting first time,<Link style={{fontWeight:'bold',color:'#00A',fontSize:'14px'}} to={"/auth/signup"}>Signup Here</Link></p>
      </div>
    </div>
    </div>  
  )
};
