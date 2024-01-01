import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/error';
import Main from './pages/main';
import { View, Create } from './pages/exam';
import { SignUp, SignIn } from './pages/auth';

import MainLayout from './layouts/main';
import BlogLayout from './layouts/blog';

export const router = createBrowserRouter([
  {
    path: '/main',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/main/index',
        element: <h1>Hola mundo</h1>,
      },
    ],
  },
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
    path: '/exam/create',
    element: <Create />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
]);
