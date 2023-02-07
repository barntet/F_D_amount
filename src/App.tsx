import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

import router from './router/index';
import NavBar from './components/NavBar';

const App = () => {
  let location = useLocation();
  const { pathname } = location; // 获取当前路径
  const needNav = ['/', '/data', '/user']; // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false); // 是否展示 Nav

  useEffect(() => {
    setShowNav(needNav.includes(pathname));
  }, [pathname]); // [] 内的参数若是变化，便会执行上述回调函数=

  return (
    <ConfigProvider>
      <>
        <Routes>
          {router.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
        <NavBar showNav={showNav} />
      </>
    </ConfigProvider>
  );
};

export default App;
