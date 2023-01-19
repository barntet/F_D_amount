import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CSS from './App.module.less';
import router from './router/index';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <div className={CSS.App}>
          <Routes>
            {router.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          <NavBar showNav={true} />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}
