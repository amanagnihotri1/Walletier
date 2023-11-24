import React from 'react';
import { Signup } from '../components/Signup/Signup';
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export const Signuppage = () => {
 return (
    <>
    <Signup/>
    </>
  )
}
