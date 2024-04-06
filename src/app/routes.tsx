import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { View, Subjects, SubjectExams, ViewResult } from 'app/pages/exam';
import {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  MyProfile,
  MyExams,
} from 'app/pages/auth';

import BlogLayout from 'app/layouts/blog';
import { NoRequireAuth } from 'app/layouts/auth';

export const arrRoutes = [
  {
    path: '/',
    element: <Navigate to="/tests" replace />,
  },
  {
    path: '/tests',
    element: <BlogLayout showSidebar={true} requireAuth={false} />,
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
    path: '/profile',
    element: <BlogLayout showSidebar={false} requireAuth={true} />,
    children: [
      {
        path: '/profile/me',
        element: <MyProfile />,
      },
      {
        path: '/profile/exams',
        element: <MyExams />,
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
