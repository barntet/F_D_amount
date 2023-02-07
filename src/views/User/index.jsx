import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Button } from 'zarm';
import CSS from './index.module.less';
import { getInfo } from '../../services/user/user';
const tabs = [
    {
        title: '用户信息修改',
        path: '/userinfo',
        icon: '//s.yezgea02.com/1615974766264/gxqm.png',
    },
    {
        title: '重置密码',
        path: '/account',
        icon: '//s.yezgea02.com/1615974766264/zhaq.png',
    },
    {
        title: '关于',
        path: '/about',
        icon: '//s.yezgea02.com/1615975178434/lianxi.png',
    },
];
const User = () => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');
    const navigateTo = useNavigate();
    useEffect(() => {
        getUserInfo();
    }, []);
    const getUserInfo = async () => {
        const userInfo = await getInfo();
        console.log(userInfo);
        setUser(userInfo);
        setAvatar(userInfo.avatar);
    };
    const logout = async () => {
        localStorage.removeItem('X-Access-Token');
        navigateTo('/login');
    };
    return (<div className={CSS.user}>
      <div className={CSS.head}>
        <div className={CSS.info}>
          <span>昵称：{user.username || '=='}</span>
          <span>
            <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt=""/>
            <b> {user.signature || '暂无个性签名'} </b>
          </span>
        </div>
        <img className={CSS.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={user.avatar || '//s.yezgea02.com/1624959897466/avatar.jpeg'} alt=""/>
      </div>
      <div className={CSS.content}>
        {tabs.map((tab) => (<Cell key={tab.path} hasArrow title={tab.title} icon={<img style={{ width: 20, verticalAlign: '-7px' }} src={tab.icon || '//s.yezgea02.com/1615974766264/gxqm.png'} alt=""/>} onClick={() => navigateTo(tab.path)}/>))}
      </div>
      <Button className={CSS.logout} block theme="danger" onClick={logout}>
        退出登录
      </Button>
    </div>);
};
export default User;
//# sourceMappingURL=index.jsx.map