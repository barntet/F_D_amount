import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import router from './router/index';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        {router.map((route: any) => (
          <Route
            key={route.path}
            path={`${route.path}`}
            element={<route.component />}
            errorElement={route ? <route.errorElement /> : null}
          />
        ))}
      </Routes>

      <BrowserRouter>
        <NavBar showNav={true} />
      </BrowserRouter>
    </ConfigProvider>
  );
}
