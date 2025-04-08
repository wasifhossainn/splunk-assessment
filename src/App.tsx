import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';

// Define the Material-UI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

/**
 * App Component
 * 
 * The root component of the application. It wraps the `ConfigurationForm`
 * component with a Material-UI theme provider and baseline styles.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfigurationForm />
    </ThemeProvider>
  );
}

export default App;
