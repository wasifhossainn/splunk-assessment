import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfigurationForm />
    </ThemeProvider>
  );
}

export default App;
