import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePicker, Button, Toast, Input } from 'zarm';

import CSS from './index.module.less';
import { getInfo, editInfo } from '@/services/user/user';
import { upload } from '@/services/upload/upload';
import Header from '@/components/Header';
import { imgUrlTrans } from '../../utils';

const UserInfo = () => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState('');
  const [signature, setSignature] = useState('');
  const token = localStorage.getItem('X-Access-Token');

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userinfo = await getInfo();
    setUser(userinfo);
    setAvatar(imgUrlTrans(userinfo.avatar));
    setSignature(userinfo.signature);
  };

  const handleSelect = async (file: any) => {
    console.log(file);
    if (file && file.file.size > 200 * 1024) {
      Toast.show('上传头像不得超过200KB！');
      return;
    }
    const data = await upload(file);
    console.log(data);
    setAvatar(imgUrlTrans(data));
  };

  const save = async () => {
    const { data } = await editInfo({ signature, avatar });
    console.log(data);
    Toast.show('修改成功');
    navigateTo(-1);
  };
  return (
    <>
      <Header title="用户信息" />
      <div className={CSS.userinfo}>
        <h1>用户资料</h1>
        <div className={CSS.item}>
          <div className={CSS.title}>头像</div>
          <div className={CSS.avatar}>
            <img className={CSS.avatarUrl} src={avatar} alt="" />
            <div className={CSS.desc}>
              <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
              <FilePicker accept="image/*" onChange={handleSelect}>
                <Button size="xs" theme="primary">
                  点击上传
                </Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={CSS.item}>
          <div className={CSS.title}>个性签名</div>
          <div className={CSS.signature}>
            <Input
              clearable
              type="text"
              value={signature}
              placeholder="请输入个性签名"
              onChange={(value: any) => setSignature(value)}
            />
          </div>
        </div>
        <Button style={{ marginTop: 50 }} block theme="primary" onClick={save}>
          保存
        </Button>
      </div>
    </>
  );
};

export default UserInfo;
