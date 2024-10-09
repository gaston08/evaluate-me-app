import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';

import AuthProvider from 'app/providers/AuthProvider';
import UiProvider from 'app/providers/UiProvider';
import ExamProvider from 'app/providers/ExamProvider';
import SetupProvider from 'app/providers/SetupProvider';

import ThemeWrapper from 'app/components/ThemeWrapper';

export default function App() {
  return (
    <HelmetProvider>
      <SetupProvider>
        <UiProvider>
          <AuthProvider>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
            >
              <ExamProvider>
                <ThemeWrapper>
                  <RouterProvider router={router} />
                </ThemeWrapper>
              </ExamProvider>
            </GoogleOAuthProvider>
          </AuthProvider>
        </UiProvider>
      </SetupProvider>
    </HelmetProvider>
  );
}
