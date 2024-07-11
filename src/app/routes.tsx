import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { View, Subjects, Trainer, TrainerForm } from 'app/pages/exam';
import {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  MyProfile,
  MyExams,
} from 'app/pages/auth';
import { subjects } from 'app/shared/exams/ubaxxi';
import {
  IpcSeoWrapper,
  IcseSeoWrapper,
  DDHHSeoWrapper,
  DerechoPrivado,
  TrabajoYSociedad,
} from 'app/pages/exam/components/SeoWrappers';

import BlogLayout from 'app/layouts/blog';
import { NoRequireAuth } from 'app/layouts/auth';

const ipc_path = subjects.find((subject) => subject.short === 'IPC').value;
const icse_path = subjects.find((subject) => subject.short === 'ICSE').value;
const ddhh_path = subjects.find(
  (subject) => subject.short === 'DDHH y Derecho Constitucional',
).value;
const der_pri_path = subjects.find(
  (subject) => subject.short === 'Derecho Privado',
).value;
const tra_soc_path = subjects.find(
  (subject) => subject.short === 'Trabajo y Sociedad',
).value;

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
        path: '/tests/' + ipc_path,
        element: <IpcSeoWrapper subjectId={ipc_path} />,
      },
      {
        path: '/tests/' + ipc_path + '/:id',
        element: <View />,
      },
      {
        path: '/tests/' + icse_path,
        element: <IcseSeoWrapper subjectId={icse_path} />,
      },
      {
        path: '/tests/' + icse_path + '/:id',
        element: <View />,
      },
      //ddhh
      {
        path: '/tests/' + ddhh_path,
        element: <DDHHSeoWrapper subjectId={ddhh_path} />,
      },
      {
        path: '/tests/' + ddhh_path + '/:id',
        element: <View />,
      },
      //der_pri_path
      {
        path: '/tests/' + der_pri_path,
        element: <DerechoPrivado subjectId={der_pri_path} />,
      },
      {
        path: '/tests/' + der_pri_path + '/:id',
        element: <View />,
      },
      //Trabajo y Sociedad
      {
        path: '/tests/' + tra_soc_path,
        element: <TrabajoYSociedad subjectId={tra_soc_path} />,
      },
      {
        path: '/tests/' + tra_soc_path + '/:id',
        element: <View />,
      },
    ],
  },
  {
    path: '/entrenamiento',
    element: <BlogLayout showSidebar={false} requireAuth={false} />,
    children: [
      {
        path: '/entrenamiento/:subject',
        element: <TrainerForm />,
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
