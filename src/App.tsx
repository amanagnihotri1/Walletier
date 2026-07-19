import "@mantine/core/styles/global.css";
import React from 'react';
import './App.css';
import '@mantine/charts/styles.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Login } from './components/Login/Login';
import { Home } from './pages/Home';
import { store } from './app/store';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {Provider} from 'react-redux';
import {Forgetpassword} from './components/forgetPassword/Forgetpassword';
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
   element:<Forgetpassword/>,
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
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ""}>
    <RouterProvider router={router}/> 
    </GoogleOAuthProvider>
    </Provider>
  );
}
export default App;
