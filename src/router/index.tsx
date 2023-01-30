import ErrorPage from '@/components/error-page';
import Home from '@/views/Home/index';
import Data from '@/views/Data/index';
import User from '@/views/User/index';
import Login from '@/views/Login/index';

const router = [
  {
    path: '/',
    component: Home,
    errorElement: ErrorPage,
  },
  {
    path: '/data',
    component: Data,
    errorElement: ErrorPage,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/login',
    component: Login,
  },
];

export default router;

/** 
 *  {
    path: '/about/*',
    element: <About />,
    errorElement: <ErrorPage />,
  },
 */
