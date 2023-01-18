import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import CSS from './index.module.less';

const NavBar = ({ showNav }: { showNav: boolean }) => {
  const location = useLocation();
  console.log(location);
  const [activeKey, setActiveKey] = useState(location.pathname || '/');
  const navigateTo = useNavigate();

  const changeTab = (path: any) => {
    setActiveKey(path);
    navigateTo(path);
  };
  return (
    <TabBar className={CSS.tab} activeKey={activeKey} onChange={changeTab}>
      <TabBar.Item key="/" title="账单" />
      <TabBar.Item key="/data" title="统计" />
      <TabBar.Item key="/user" title="我的" />
    </TabBar>
  );
};

NavBar.propTypes = {
  showNav: PropTypes.bool,
};

export default NavBar;
