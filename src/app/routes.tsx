import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { View, Subjects, SubjectExams, ViewResult } from 'app/pages/exam';
import { SignUp, SignIn, ForgotPassword, ResetPassword } from 'app/pages/auth';

import BlogLayout from 'app/layouts/blog';
import { NoRequireAuth } from 'app/layouts/auth';

export const arrRoutes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/tests',
    element: <BlogLayout />,
    children: [
      {
        path: '/tests',
        element: <Subjects />,
      },
      {
        path: '/tests/:subject',
        element: <SubjectExams />,
        children: [
          {
            path: '/tests/:subject/results/:id',
            element: <ViewResult />,
          },
          {
            path: '/tests/:subject/:id',
            element: <View />,
          },
        ],
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
    ],
  },
];

export const router = createBrowserRouter(arrRoutes);
