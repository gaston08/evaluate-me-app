import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { router } from './routes';
import { ExercisesContext } from './contexts/Exercises';
import { AuthContext } from './contexts/Auth';
import { ExamContext, defaultCurrentExam } from './contexts/Exam';
import { exerciseType } from 'app/shared/interfaces/exercise';
import { contextExam } from 'app/shared/interfaces/exam';

import ThemeWrapper from 'app/components/ThemeWrapper';

export default function App() {
  const [exercises, setExercises] = useState<Array<exerciseType>>([]);
  const [selectedOptions, setSelectedOptions] = useState<Array<Array<string>>>(
    [],
  );

  const [auth, setAuth] = useState({
    isLogged: false,
    user: {},
  });

  const [exam, setExam] = useState<contextExam>(defaultCurrentExam);

  const access_token: string = localStorage.getItem('access_token');
  if (access_token !== '') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      <ExamContext.Provider value={{ exam, setExam }}>
        <ExercisesContext.Provider
          value={{
            exercises,
            setExercises,
            selectedOptions,
            setSelectedOptions,
          }}
        >
          <ThemeWrapper>
            <RouterProvider router={router} />
          </ThemeWrapper>
        </ExercisesContext.Provider>
      </ExamContext.Provider>
    </AuthContext.Provider>
  );
}
