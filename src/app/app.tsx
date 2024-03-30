import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { router } from './routes';
import { AuthContext, defaultAuth } from 'app/contexts/Auth';
import { ExamContext, defaultCurrentExam } from 'app/contexts/Exam';
import { UiContext, defaultExamsUi } from 'app/contexts/Ui';
import { contextExam, exerciseFeedback } from 'app/shared/interfaces/exam';
import { contextUi } from 'app/shared/interfaces/ui';
import { contextAuth } from 'app/shared/interfaces/auth';

import ThemeWrapper from 'app/components/ThemeWrapper';

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState<Array<Array<string>>>(
    [],
  );
  const [exercisesFeedback, setExercisesFeedback] = useState<
    Array<exerciseFeedback>
  >([]);
  const [auth, setAuth] = useState<contextAuth>(defaultAuth);
  const [examsUi, setExamsUi] = useState<contextUi>(defaultExamsUi);

  const [exam, setExam] = useState<contextExam>(defaultCurrentExam);

  const access_token: string = localStorage.getItem('access_token');

  if (access_token !== '') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  }

  return (
    <UiContext.Provider value={{ examsUi, setExamsUi }}>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
        }}
      >
        <ExamContext.Provider
          value={{
            exam,
            setExam,
            selectedOptions,
            setSelectedOptions,
            exercisesFeedback,
            setExercisesFeedback,
          }}
        >
          <ThemeWrapper>
            <RouterProvider router={router} />
          </ThemeWrapper>
        </ExamContext.Provider>
      </AuthContext.Provider>
    </UiContext.Provider>
  );
}
