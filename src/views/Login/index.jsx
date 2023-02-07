import { useState, useCallback, useRef, useEffect } from 'react';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import Captcha from 'react-captcha-code';
import cx from 'classnames';
import CSS from './index.module.less';
import { register, login } from '../../services/user/user';
import CustomIcon from '../../components/icon/index';
const Login = () => {
    const captchaRef = useRef();
    const [type, setType] = useState('login'); // 登录注册类型
    const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [verify, setVerify] = useState(''); // 验证码
    //  验证码变化，回调方法
    const handleChange = useCallback((captcha) => {
        setCaptcha(captcha);
    }, []);
    const onSubmit = async () => {
        if (!username) {
            Toast.show('请输入账号');
            return;
        }
        if (!password) {
            Toast.show('请输入密码');
            return;
        }
        try {
            if (type == 'login') {
                const { token } = await login({
                    username,
                    password,
                });
                localStorage.setItem('X-Access-Token', token);
                window.location.href = '/'; // 如果只是用navigateTo 跳转页面的话，页面不会被刷新
            }
            else {
                if (!verify) {
                    Toast.show('请输入验证码');
                    return;
                }
                if (verify != captcha) {
                    Toast.show('验证码错误');
                    return;
                }
                await register({
                    username,
                    password,
                });
                Toast.show('注册成功');
                setType('login');
            }
        }
        catch (err) {
            Toast.show(err.msg);
        }
    };
    useEffect(() => {
        document.title = type == 'login' ? '登录' : '注册';
    }, [type]);
    return (<div className={CSS.auth}>
      <div className={CSS.head}/>
      <div className={CSS.tab}>
        <span className={cx({ [CSS.active]: type === 'login' })} onClick={() => setType('login')}>
          登录
        </span>
        <span className={cx({ [CSS.active]: type === 'register' })} onClick={() => setType('register')}>
          注册
        </span>
      </div>
      <div className={CSS.form}>
        <Cell icon={<CustomIcon type="zhanghao"/>}>
          <Input clearable type="text" placeholder="请输入账号" onChange={(value) => setUsername(value)}/>
        </Cell>
        <Cell icon={<CustomIcon type="mima"/>}>
          <Input clearable type="password" placeholder="请输入密码" onChange={(value) => setPassword(value)}/>
        </Cell>
        {type == 'register' ? (<Cell icon={<CustomIcon type="mima"/>}>
            <Input clearable type="text" placeholder="请输入验证码" onChange={(value) => setVerify(value)}/>
            <Captcha ref={captchaRef} charNum={4} onChange={handleChange}/>
          </Cell>) : null}
      </div>
      <div className={CSS.operation}>
        {type == 'register' ? (<div className={CSS.agree}>
            <Checkbox />
            <label className="text-light">
              阅读并同意<a>《掘掘手札条款》</a>
            </label>
          </div>) : null}
        <Button onClick={onSubmit} block theme="primary">
          {type === 'login' ? '登录' : '注册'}
        </Button>
      </div>
    </div>);
};
export default Login;
//# sourceMappingURL=index.jsx.map