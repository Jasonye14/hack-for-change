import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// MUI Themes
import { ThemeProvider } from '@mui/material';

// Left-to-Right Text (Default)
import theme from "./assets/theme";
import themeDark from "./assets/theme-dark";

// Right-to-Left Text (Hindu, Arabic, etc)
import themeRTL from "./assets/theme/theme-rtl";
import themeDarkRTL from "./assets/theme-dark/theme-rtl";

// Context Provider
import { MaterialUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MaterialUIControllerProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MaterialUIControllerProvider>

  </React.StrictMode>
);
