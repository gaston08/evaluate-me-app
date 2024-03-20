import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { View, Create, Subjects, SubjectExams } from 'app/pages/exam';
import { SignUp, SignIn, ForgotPassword, ResetPassword } from 'app/pages/auth';

import BlogLayout from 'app/layouts/blog';
import { RequireAuth, NoRequireAuth } from 'app/layouts/auth';

export const arrRoutes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/test',
    element: <BlogLayout />,
    children: [
      {
        path: '/test/subjects',
        element: <Subjects />,
      },
      {
        path: '/test/:subject',
        element: <SubjectExams />,
        children: [
          {
            path: '/test/:subject/:id',
            element: <View />,
          },
        ],
      },
    ],
  },
  {
    path: '/admin/',
    errorElement: <Error />,
    element: <RequireAuth />,
    children: [
      {
        path: '/admin/exam/create',
        element: <Create />,
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
