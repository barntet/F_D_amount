import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/components/error-page';
import Home from '@/views/Home/index';
import Data from '@/views/Data/index';
import User from '@/views/User/index';

const router = [
  {
    path: '/',
    // element: <Home />,
    component: Home,
    errorElement: ErrorPage,
  },
  {
    path: '/data',
    // element: <Data />,
    component: Data,
    errorElement: ErrorPage,
  },
  {
    path: '/user',
    component: User,
    // element: <User />,
  },
];

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     // component: Home,
//     errorElement: ErrorPage,
//   },
//   {
//     path: '/data',
//     element: <Data />,
//     // component: Data,
//     errorElement: ErrorPage,
//   },
//   {
//     path: '/user',
//     // component: User,
//     element: <User />,
//   },
// ]);

export default router;

/** 
 *  {
    path: '/about/*',
    element: <About />,
    errorElement: <ErrorPage />,
  },
 */
