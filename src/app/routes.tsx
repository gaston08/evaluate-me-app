import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/error';
import { View, Create } from './pages/exam';
import { SignUp, SignIn } from './pages/auth';

import BlogLayout from './layouts/blog';
import { RequireAuth, NoRequireAuth } from './layouts/auth';

export const router = createBrowserRouter([
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
    ],
  },
]);
