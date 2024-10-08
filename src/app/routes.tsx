import { createBrowserRouter } from 'react-router-dom';
import Error from 'app/pages/error';
import { View, Subjects, Trainer, TrainerLobby } from 'app/pages/exam';
import { Store, Success, Pending, Failure } from 'app/pages/store';
import {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  ActivateAccount,
  MyProfile,
} from 'app/pages/auth';

import GetParams from 'app/components/GetParams';

import BlogLayout from 'app/layouts/blog';
import { NoRequireAuth } from 'app/layouts/auth';

export const arrRoutes = [
  {
    path: '/',
    element: <GetParams />,
  },
  {
    path: '/tests',
    element: <BlogLayout showSidebar={true} requireAuth={true} />,
    children: [
      {
        path: '/tests',
        element: <Subjects />,
      },
      {
        path: `/tests/:subject/:id`,
        element: <View />,
      },
    ],
  },
  {
    path: '/entrenamiento',
    element: (
      <BlogLayout showSidebar={false} requireAuth={true} showTokens={true} />
    ),
    children: [
      {
        path: '/entrenamiento/:subject',
        element: <TrainerLobby />,
      },
      {
        path: '/entrenamiento/:subject/:type/:department',
        element: <Trainer />,
      },
    ],
  },
  {
    path: '/profile',
    element: <BlogLayout showSidebar={false} requireAuth={true} />,
    children: [
      {
        path: '/profile/me',
        element: <MyProfile />,
      },
    ],
  },
  {
    path: '/tienda',
    element: (
      <BlogLayout showSidebar={false} requireAuth={true} showTokens={true} />
    ),
    children: [
      {
        path: '/tienda/cafecitos',
        element: <Store />,
      },
      {
        path: '/tienda/success',
        element: <Success />,
      },
      {
        path: '/tienda/pending',
        element: <Pending />,
      },
      {
        path: '/tienda/failure',
        element: <Failure />,
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <Error />,
    element: <NoRequireAuth />,
    children: [
      {
        path: '/auth/signup',
        element: <SignUp />,
      },
      {
        path: '/auth/login',
        element: <SignIn />,
      },
      {
        path: '/auth/forgot/password',
        element: <ForgotPassword />,
      },
      {
        path: '/auth/reset/password/:token',
        element: <ResetPassword />,
      },
      {
        path: '/auth/activate/account/:token',
        element: <ActivateAccount />,
      },
    ],
  },
];

export const router = createBrowserRouter(arrRoutes);
