import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/error';
import Main from './pages/main';

import MainLayout from './layouts/main';

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
]);
