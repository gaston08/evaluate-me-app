import { useEffect, useState } from 'react';
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
import ReactGA from 'react-ga4';
import { mongo_id_regex } from 'app/utils/common';

ReactGA.initialize('G-R63LDGFFTW');

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

import ThemeWrapper from 'app/components/ThemeWrapper';

function cleanExams() {
  for (let i = 0, len = localStorage.length; i < len; ++i) {
    const key = localStorage.key(i);
    if (mongo_id_regex.test(key)) {
      localStorage.removeItem(key);
    }
  }
  localStorage.setItem('last-clean-exams', new Date());
}

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

  const [exams, setExams] = useState<contextExam>([]);
  const access_token: string = localStorage.getItem('access_token');

  if (access_token !== '') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  }

  useEffect(() => {
    const last_clean_exams = localStorage.getItem('last-clean-exams');

    if (last_clean_exams === null) {
      cleanExams();
    } else {
      const last_clean = new Date(last_clean_exams);
      const now = new Date();

      // check for a week
      if (now - last_clean >= 604800000) {
        cleanExams();
      }
    }
  }, []);

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
                exams,
                setExams,
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
