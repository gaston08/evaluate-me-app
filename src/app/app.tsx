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
import { GoogleOAuthProvider } from '@react-oauth/google';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import { HelmetProvider } from 'react-helmet-async';

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

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
    <HelmetProvider>
      <UiContext.Provider value={{ examsUi, setExamsUi }}>
        <AuthContext.Provider
          value={{
            auth,
            setAuth,
          }}
        >
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
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
          </GoogleOAuthProvider>
        </AuthContext.Provider>
      </UiContext.Provider>
    </HelmetProvider>
  );
}
