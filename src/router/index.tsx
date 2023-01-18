import React from 'react';
import Index from '@/container/Index/index';
import About from '@/container/About/index';
import TT from '@/container/About/tt';
import ErrorPage from '@/components/error-page';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about/*',
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'tt',
    element: <TT />,
  },
]);

export default router;
