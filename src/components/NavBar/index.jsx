import { useState } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'zarm';
import CustomIcon from '../icon';
import { useNavigate, useLocation } from 'react-router-dom';
import CSS from './index.module.less';
const tabs = [
    {
        key: '/',
        icon: 'zhangdan',
        title: '账单',
    },
    {
        key: '/data',
        icon: 'tongji',
        title: '统计',
    },
    {
        key: '/user',
        icon: 'wode',
        title: '我的',
    },
];
const NavBar = ({ showNav }) => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname || '/');
    const navigateTo = useNavigate();
    const changeTab = (path) => {
        console.log(path);
        setActiveKey(path);
        navigateTo(path);
    };
    return (<TabBar className={CSS.tab} visible={showNav} activeKey={activeKey} onChange={changeTab}>
      {tabs.map(tab => (<TabBar.Item key={tab.key} itemKey={tab.key} icon={<CustomIcon type={tab.icon}/>} title={tab.title}/>))}
    </TabBar>);
};
NavBar.propTypes = {
    showNav: PropTypes.bool,
};
export default NavBar;
//# sourceMappingURL=index.jsx.map