import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { router } from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ExercisesContext } from './contexts/Exercises';

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
  const [selected, setSelected] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({});

  return (
    <ExercisesContext.Provider
      value={{
        selected,
        setSelected,
        exercises,
        setExercises,
        currentExercise,
        setCurrentExercise,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ExercisesContext.Provider>
  );
}
