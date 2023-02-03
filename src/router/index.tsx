import ErrorPage from '@/components/error-page';
import Home from '@/views/Home/index';
import Data from '@/views/Data/index';
import User from '@/views/User/index';
import Login from '@/views/Login/index';
import Detail from '@/views/Detail';

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
  {
    path: '/detail',
    component: Detail,
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
