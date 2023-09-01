import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from "./componenets/sceneTheme";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom"
        }}
        maxSnack={2}
        preventDuplicate
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);


