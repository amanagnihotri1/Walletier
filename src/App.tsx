import "@mantine/core/styles/global.css";
import React,{useEffect} from 'react';
import './App.css';
import { Login } from './components/Login/Login';
import { Home } from './pages/Home';
import { store } from './app/store';
import { UserData } from './app/TypeInterfaces';
import { getAuth } from 'firebase/auth';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Link,
} from "react-router-dom";
import {Provider} from 'react-redux';
import { Signup } from './components/Signup/Signup';
import { authSlice, clearAuthDetails, setAuthDetails } from './Auth/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth";
function App() 
{
  const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:'/',
    element:<Home/>,
  },
  {
    path:"/signup",
    element:<Signup/>,
  }
  ]);
  return (
    <Provider store={store}>
    <RouterProvider router={router}/> 
    </Provider>
  );
}
export default App;
