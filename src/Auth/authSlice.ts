import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface authDetails
{
  fullName?:string | null;
  useremail?:string | null;
  profileImage?:string;
  error?:string;
  uid?:string
};
export const initialState:authDetails=
{
fullName:null,
useremail:'',
profileImage:'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/800w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-pHw7WC6fd-0.jpg',
error:'',
uid:'',
};
export const authSlice=createSlice({
    name:'userinfo',
    initialState,
    reducers:
  {
   setAuthDetails:(state,action:PayloadAction<authDetails>)=>
   { 
     state.fullName=action.payload.fullName;
     state.useremail=action.payload.useremail;
     state.error=action.payload.error;
     state.uid=action.payload.uid;
   },
   clearAuthDetails:(state)=>
   {
    state.fullName="";
    state.useremail="";
    state.error="";
    state.uid="";
    },
  setError:(state,action:PayloadAction<string>)=>
  {
    state.error=action.payload;
  },
}
});
export const {setAuthDetails,clearAuthDetails,setError}=authSlice.actions;
export default authSlice.reducer;