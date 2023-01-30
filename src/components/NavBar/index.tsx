import { useState } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { AppOutline, PieOutline, UserOutline } from 'antd-mobile-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import CSS from './index.module.less';

const tabs = [
  {
    key: '/',
    icon: AppOutline,
    title: '账单',
  },
  {
    key: '/data',
    icon: PieOutline,
    title: '统计',
  },
  {
    key: '/user',
    icon: UserOutline,
    title: '我的',
  },
];

const NavBar = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname || '/');
  const navigateTo = useNavigate();

  const changeTab = (path: any) => {
    setActiveKey(path);
    navigateTo(path);
  };
  return (
    <TabBar className={CSS.tab} activeKey={activeKey} onChange={changeTab}>
      {tabs.map(tab => (
        <TabBar.Item key={tab.key} icon={<tab.icon />} title={tab.title} />
      ))}
    </TabBar>
  );
};

NavBar.propTypes = {
  showNav: PropTypes.bool,
};

export default NavBar;
