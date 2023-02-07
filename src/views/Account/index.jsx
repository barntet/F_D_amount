import { createForm } from 'rc-form';
import { Toast, Cell, Input, Button } from 'zarm';
import CSS from './index.module.less';
import { modifyPass } from '../../services/user/user';
import Header from '../../components/Header';
const Account = (props) => {
    console.log(props);
    // Account 通过createForm 高阶组件包裹之后，可以在props中获取到form属性
    const { getFieldProps, getFieldError } = props.form;
    const submit = () => {
        // validateFields 获取表单属性元素
        props.form.validateFields(async (error, value) => {
            // error 表单验证全部通过为false 否则为true
            if (!error) {
                console.log(value);
                if (value.newPass != value.newPassT) {
                    Toast.show('新密码输入不一致');
                    return;
                }
                await modifyPass({
                    oldPass: value.oldPass,
                    newPass: value.newPass,
                    newPassT: value.newPassT,
                });
                Toast.show('修改成功');
            }
        });
    };
    return (<>
      <Header title="重置密码"/>
      <div className={CSS.account}>
        <div className={CSS.form}>
          <Cell title="原密码">
            <Input clearable type="text" placeholder="请输入原密码" {...getFieldProps('oldPass', { rules: [{ required: true }] })}/>
            <span className={CSS.error}>{getFieldError('oldPass')}</span>
          </Cell>
          <Cell title="新密码">
            <Input clearable type="text" placeholder="请输入新密码" {...getFieldProps('newPass', { rules: [{ required: true }] })}/>
            <span className={CSS.error}>{getFieldError('newPass')}</span>
          </Cell>
          <Cell title="确认密码">
            <Input clearable type="text" placeholder="请再次输入新密码确认" {...getFieldProps('newPassT', { rules: [{ required: true }] })}/>
            <span className={CSS.error}>{getFieldError('newPassT')}</span>
          </Cell>
        </div>
        <Button className={CSS.btn} block theme="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </>);
};
export default createForm()(Account);
//# sourceMappingURL=index.jsx.map