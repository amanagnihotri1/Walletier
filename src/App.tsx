import "@mantine/core/styles/global.css";
import React from 'react';
import './App.css';
import { Login } from './components/Login/Login';
import { Home } from './pages/Home';
import { store } from './app/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Provider} from 'react-redux';
import { Signup } from './components/Signup/Signup';
import { GenReports } from "./pages/GenReports";
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
  },
  {
    path:'/reports',
    element:<GenReports/>
  }
  ]);
  return (
    <Provider store={store}>
    <RouterProvider router={router}/> 
    </Provider>
  );
}
export default App;
