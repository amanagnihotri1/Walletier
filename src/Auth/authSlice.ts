import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface authDetails {
  fullName?: string | null;
  useremail?: string | null;
  profileImage?: string | null;
  uid?: string | null;
  token?: string | null;
  monthlyGoal?: number | null;
  error?: string | null;
}

export const initialState: authDetails = {
  fullName: localStorage.getItem("fullName") || null,
  useremail: localStorage.getItem("useremail") || null,
  profileImage: localStorage.getItem("profileImage") || null,
  error: null,
  uid: localStorage.getItem("uid"),
  token: localStorage.getItem("tknum"),
  monthlyGoal: null,
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
     state.profileImage=action.payload.profileImage || 'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/800w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-pHw7WC6fd-0.jpg';
    state.token=action.payload.token || "";
    state.uid=action.payload.uid || "";
    state.monthlyGoal=action.payload.monthlyGoal || 0;
    },
   clearAuthDetails:(state)=>
   {
    state.fullName="";
    state.useremail="";
    state.error = null;
    state.uid = "";
    state.profileImage = "";
    state.token = "";
    state.monthlyGoal = 0;
  },
  setError: (state, action: PayloadAction<string | null>) => {
    state.error = action.payload;
  },
},
});
export const { setAuthDetails, clearAuthDetails, setError } = authSlice.actions;
export default authSlice.reducer;