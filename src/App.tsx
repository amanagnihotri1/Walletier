import React from 'react';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Login } from './components/Login/Login';
import { Home } from './pages/Home';
import { ForgetPassword } from './components/forgetPassword/Forgetpassword';
import { ResetPassword } from './components/resetPassword/ResetPassword';
import { Signup } from './components/Signup/Signup';
import { ErrorComponent } from './components/Errorcomponent/ErrorComponent';
import { Welcome } from './pages/Welcome';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/welcome" replace />,
    },
    {
      path: '/user/:uid',
      element: <Home />,
    },
    {
      path: 'auth',
      children:[{
        path: 'signup',
        element: <Signup />,
      },
      {
         path: 'forgetPassword',
      element: <ForgetPassword />,
      },
      {
        path: 'passwordreset/:id/:token',
        element: <ResetPassword />,
      },
      {
        path: 'login',
        element: <Login/>,
      }
    ]
    },
    {
      path: '*',
      element: <ErrorComponent />,
    },
    {
      path: '/welcome',
      element: <Welcome />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
