import React from 'react';
import "@mantine/core/styles/global.css";
import './App.css';
import '@mantine/charts/styles.css';
import { Login } from './components/Login/Login';
import { Home } from './pages/Home';
import { store } from './app/store';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {Provider} from 'react-redux';
import {ForgetPassword} from './components/forgetPassword/ForgetPassword';
import { Signup } from './components/Signup/Signup';
import { ErrorComponent } from "./components/Errorcomponent/ErrorComponent";
import { Welcome } from "./pages/Welcome";
function App() 
{
  const router=createBrowserRouter([
  {
    path:"/auth/login",
    element:<Login/>,
  },
    {
    path: "/",
    element: <Navigate to="/welcome" />
  },
  {
   path:"/auth/forgetPassword",
   element:<ForgetPassword/>,
  },
  {
    path:'/user/:uid',
    element:<Home/>,
  },
  {
    path:"/auth/signup",
    element:<Signup/>,
  },
  {
    path:"*",
    element:<ErrorComponent/>
  },
  {
    path:"/welcome",
    element:<Welcome/>
  }
  ]);
  return (
    <Provider store={store}>
    <RouterProvider router={router}/>     
    </Provider>
  );
}
export default App;
