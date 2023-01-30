import { useState, useCallback, useRef } from 'react';
import { Input, Button, Checkbox, Form, Toast } from 'antd-mobile';
import Captcha from 'react-captcha-code';
import CX from 'classnames';

import CSS from './index.module.less';
import { register, login } from '@/services/user/user';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [type, setType] = useState('login'); // 用于区分登录注册类型

  const changeType = (type: string) => {
    setUsername('');
    setPassword('');
    setVerify('');
    handleClickVerify();
    setType(type);
  };

  // 验证码变化，回调
  const handleChange = useCallback((captcha: any) => {
    console.log(captcha);
    setCaptcha(captcha);
  }, []);

  const handleClickVerify = () => {
    // 刷新验证码
    (captchaRef as any).current.refresh();
  };

  const captchaRef = useRef<HTMLCanvasElement>();

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号');
      return;
    }
    if (!password) {
      Toast.show('请输入密码');
      return;
    }

    if (!verify) {
      Toast.show('请输入验证码');
      return;
    }
    if (verify !== captcha) {
      Toast.show('验证码错误');
      return;
    }

    // 判断登录还是注册
    if (type === 'login') {
      const { token } = await login({ username, password });
      localStorage.setItem('X-Access-Token', token);
      console.log(localStorage);
    } else {
      await register({ username, password });
      Toast.show('注册成功');
      setType('login');
    }
  };

  return (
    <div className={CSS.auth}>
      <div className={CSS.head}></div>
      <div className={CSS.tab}>
        <span
          className={CX({ [CSS.active]: type === 'login' })}
          onClick={() => changeType('login')}
        >
          登录
        </span>
        <span
          className={CX({ [CSS.active]: type === 'register' })}
          onClick={() => changeType('register')}
        >
          注册
        </span>
      </div>
      <Form layout="horizontal" className={CSS.form}>
        <Form.Item label="用户名">
          <Input
            placeholder="请输入账号"
            clearable
            onChange={value => setUsername(value)}
          />
        </Form.Item>
        <Form.Item label="密码">
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
            onChange={value => setPassword(value)}
          />
        </Form.Item>
        <Form.Item label="验证码" className={CSS.verify}>
          <Input
            placeholder="请输入验证码"
            clearable
            onChange={value => setVerify(value)}
          />
          <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
        </Form.Item>
      </Form>
      <div className={CSS.operation}>
        {type === 'register' ? (
          <div className={CSS.agree}>
            <Checkbox>
              <label className="text-light">
                阅读并同意 <a>link</a>
              </label>
            </Checkbox>
          </div>
        ) : null}
        <Button block onClick={onSubmit}>
          {type === 'login' ? '登录' : '注册'}
        </Button>
      </div>
    </div>
  );
}
