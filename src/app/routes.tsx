import { createBrowserRouter } from 'react-router-dom';
import Error from 'app/pages/error';
import { View, Create } from 'app/pages/exam';
import { SignUp, SignIn, ForgotPassword } from 'app/pages/auth';

import BlogLayout from 'app/layouts/blog';
import { RequireAuth, NoRequireAuth } from 'app/layouts/auth';

export const arrRoutes = [
  {
    path: '/blog',
    element: <BlogLayout />,
    children: [
      {
        path: '/blog/exam',
        element: <View />,
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
    ],
  },
];

export const router = createBrowserRouter(arrRoutes);
