import React,{useState} from 'react';
import styles from "./password.module.scss";
import { auth } from '../../Auth/firebaseAuth';
import { Button, Input } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {useNavigate,useSearchParams} from "react-router-dom";
import { notifications } from '@mantine/notifications';
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { PasswordInput } from "@mantine/core";
export const PasswordReset = () => {
  const navigate=useNavigate();
  const [searchParams]=useSearchParams();
  const [visible, { toggle }] = useDisclosure(false);
  const defaultValues={
    firstPass:'',
    confirmPass:'',
  };
  const[userpassword,setPassword]=useState({
   firstPass:'',
   confirmPass:'' 
  });
  let oobCode:string= " "|| searchParams.get('oobCode');
  const resetFormFields = () => {
    return (
      setPassword(defaultValues)
    )
  }
  const handleSubmit=async()=>{
    if ((userpassword.firstPass !== userpassword.confirmPass) || (!oobCode && !auth)) {
      notifications.show({title:"field not matching",message:"values of both fields need to be matched",autoClose:2000})
      return;
    }
    try{
      if(oobCode && userpassword.confirmPass){
        await confirmPasswordReset(auth,oobCode,userpassword.confirmPass);
        resetFormFields();
      }
      else
      {
        notifications.show({title:'Missing oobCode',message:'Enter correct oobCode',autoClose:2000});
      }
  } catch(err:any){
    notifications.show({title:"Error",message:err.message,autoClose:2000})  
  }  
  }
  return (
    <section className={styles.mainBkg}>
      <h1 style={{textAlign:'center'}}>Reset Password</h1>
    <div className={styles.smallWrapper}>
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
    <PasswordInput placeholder="Enter password" m={30}
    onVisibilityChange={toggle}
     visible={visible} 
     leftSection={<i className="uil uil-asterisk"></i>} 
     onChange={(e)=>setPassword({...userpassword,[e.target.name]:e.target.value})}
     />
    <Input placeholder="Confirm password" m={30}  leftSection={<i className="uil uil-asterisk"></i>} 
    onChange={(e)=>setPassword({...userpassword,[e.target.name]:e.target.value})}
    />
    <Button variant="gradient" color={'magenta'} type="submit" mt={10} mx={30}>Submit</Button>
    <Button variant="light" onClick={()=>navigate("/login")} mt={10}>Cancel</Button>
    </form>
    </div>
    </section>
  )
}
