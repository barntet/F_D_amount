import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'zarm';
import cx from 'classnames';
import { getType } from '../../services/type/type';
import CSS from './index.module.less';
const PopupType = forwardRef(({ onSelect }, ref) => {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState('all');
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);
    useEffect(() => {
        (async () => {
            const list = await getType();
            console.log(list);
            setExpense(list.filter((i) => i.type === 2));
            setIncome(list.filter((i) => i.type === 1));
        })();
    }, []);
    if (ref) {
        ref.current = {
            show: () => {
                setShow(true);
            },
            close: () => {
                setShow(false);
            },
        };
    }
    const choseType = (item) => {
        setActive(item.id);
        setShow(false);
        // 父组件传入的onSelect，为了获取类型
        onSelect(item);
    };
    return (<Popup visible={show} direction="bottom" onMaskClick={() => setShow(false)} destroy={false} mountContainer={() => document.body}>
      <div className={CSS.popupType}>
        <div className={CSS.header}>
          请选择类型
          <Icon className={CSS.cross} type="wrong" onClick={() => setShow(false)}/>
        </div>
        <div className={CSS.content}>
          <div className={cx({ [CSS.all]: true, [CSS.active]: active === 'all' })} onClick={() => choseType({ id: 'all' })}>
            全部类型
          </div>
          <div className={CSS.title}>支出</div>
          <div className={CSS.expenseWrap}>
            {expense.map((item, index) => (<p className={cx({ [CSS.active]: active === item.id })} key={index} onClick={() => choseType(item)}>
                {item.name}
              </p>))}
          </div>
          <div className={CSS.title}>收入</div>
          <div className={CSS.incomeWrap}>
            {income.map((item, index) => (<p className={cx({ [CSS.active]: active === item.id })} key={index} onClick={() => choseType(item)}>
                {item.name}
              </p>))}
          </div>
        </div>
      </div>
    </Popup>);
});
PopupType.propTypes = {
    onSelect: PropTypes.func,
};
export default PopupType;
//# sourceMappingURL=index.jsx.map