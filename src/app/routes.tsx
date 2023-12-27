import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/error';
import Main from './pages/main';

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
        path: '/blog/1',
        element: <h1>Este es el blog 1</h1>,
      },
    ],
  },
]);
