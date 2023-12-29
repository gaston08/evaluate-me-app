import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { router } from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      background: {
        light: string;
        main: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      background?: {
        light?: string;
        main?: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      paper: '#eeeeee',
      default: '#bbbbbb',
    },
  },
  custom: {
    background: {
      light: '#eeeeee',
      main: '#bbbbbb',
    },
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
