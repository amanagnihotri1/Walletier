import React from 'react';
import ReactDOM from 'react-dom/client';
import "@mantine/core/styles/global.css";
import '@mantine/notifications/styles.css';
import './index.css';
import App from './App';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

root.render(
   <MantineProvider defaultColorScheme='light' theme={theme}>
   <Notifications/>
    <App />
    </MantineProvider> 
);
