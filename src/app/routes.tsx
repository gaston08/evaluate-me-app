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
  MyExams,
} from 'app/pages/auth';
import { subjects } from 'app/shared/exams/ubaxxi';

import GetParams from 'app/components/GetParams';

import BlogLayout from 'app/layouts/blog';
import { NoRequireAuth } from 'app/layouts/auth';

const ipc_path = subjects.find((subject) => subject.short === 'IPC').value;
const icse_path = subjects.find((subject) => subject.short === 'ICSE').value;
/*const ddhh_path = subjects.find(
  (subject) => subject.short === 'DDHH y Derecho Constitucional',
).value;*/
const der_pri_path = subjects.find(
  (subject) => subject.short === 'Derecho Privado',
).value;
const tra_soc_path = subjects.find(
  (subject) => subject.short === 'Trabajo y Sociedad',
).value;

const antropologia_path = subjects.find(
  (subject) => subject.short === 'Antropología',
).value;

const sociologia_path = subjects.find(
  (subject) => subject.short === 'Sociología',
).value;

const pensa_compu_path = subjects.find(
  (subject) => subject.short === 'Pensamiento Computacional',
).value;

const biologia_54 = subjects.find(
  (subject) => subject.short === 'Biología (54)',
).value;

const biologia_91 = subjects.find(
  (subject) => subject.short === 'Biología (91)',
).value;

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
        path: '/tests/' + ipc_path + '/:id',
        element: <View />,
      },
      {
        path: '/tests/' + icse_path + '/:id',
        element: <View />,
      },
      /*
      //ddhh
      {
        path: '/tests/' + ddhh_path + '/:id',
        element: <View />,
      },
      */
      //der_pri_path
      {
        path: '/tests/' + der_pri_path + '/:id',
        element: <View />,
      },
      //Trabajo y Sociedad
      {
        path: '/tests/' + tra_soc_path + '/:id',
        element: <View />,
      },

      //Antropologia
      {
        path: '/tests/' + antropologia_path + '/:id',
        element: <View />,
      },

      //Sociologia
      {
        path: '/tests/' + sociologia_path + '/:id',
        element: <View />,
      },

      //Pensamiento computacional
      {
        path: '/tests/' + pensa_compu_path + '/:id',
        element: <View />,
      },

      // Biologia 54
      {
        path: '/tests/' + biologia_54 + '/:id',
        element: <View />,
      },

      // Biologia 91
      {
        path: '/tests/' + biologia_91 + '/:id',
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
      {
        path: '/profile/exams',
        element: <MyExams />,
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
