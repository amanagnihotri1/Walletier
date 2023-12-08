import React,{ useEffect,useState } from 'react';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
import style from "../pages/home.module.scss";
import '@mantine/core/styles/Text.css';
import { getAuth,onAuthStateChanged,signOut,updateProfile} from 'firebase/auth';
import { auth } from '../Auth/firebaseAuth';
import  OpenAIApi from "openai";
import { ActionIcon } from '@mantine/core';
import upImage from "../assets/upload.png";
import { Navbar } from '../components/Navbar/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { Transactions } from '../components/Transactions/Transactions';
import botimages from "../assets/chatbotimages.png";
import { clearAuthDetails, setAuthDetails } from '../Auth/authSlice';
import { Cardgroup } from '../components/cardGroup/Cardgroup';
import { TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const[uid,setUid]=useState<string>();
  const userfullName=useSelector((state:any)=>state.authReducer.fullName);
const openai = new OpenAIApi({
  apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
  dangerouslyAllowBrowser:true 
});
  const handleSubmit = async (e:any) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content:e.target.value}],
        model: "gpt-3.5-turbo",
      });
      console.log(completion);
    }catch (error: any) {
            console.error(error);
    }
  };
  useEffect(()=>
  {  
    onAuthStateChanged(auth,(user:any) => {
      if (user) 
      { 
        console.log(user);
        dispatch(setAuthDetails({fullName:user?.displayName,useremail:user?.email,uid:user.uid}));
       updateProfile(user,{displayName:userfullName}); 
       setUid(user.uid);
      } else {
        dispatch(clearAuthDetails());
        navigate("/login");
      }
    });
  },[]);
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
     <p
      style={{
        margin:'0px',
        fontWeight:'500',
        fontSize:'12px',
      }}
     >Now handle your expenses at ease</p>
    </div>
    <div className={style['leftWrapper']}>
    <div className={style['leftWrap']}>
    <Cardgroup/>
    <div className={style['tableWrapper2']}>
    <Transactions useid={uid?.toString()}/>
    <div className={style['chatbotBox']}>
    <img src={botimages} alt="not_found" />
     <h4 style={{color:'#FFF',textAlign:'center'}}>Hii,How can i help you?</h4>
    <form className={style["chatWrapper"]} onSubmit={handleSubmit}>
    <TextInput
      placeholder="Start Chat"
      rightSection={
        <ActionIcon size={34} variant="default" aria-label="ActionIcon with size as a number" type="submit">
      <img src={upImage} alt='not_found'/>
    </ActionIcon>
     }
     />
    </form>
    </div> 
    </div>
     </div>
    </div>
    </div>
    </div>
  )
}
