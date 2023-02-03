import { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popup, Icon, Toast, Keyboard, Input } from 'zarm';
import dayjs from 'dayjs';

import CSS from './index.module.less';
import PopupDate from '../PopupDate';
import CustomIcon from '../icon';
import { typeMap } from '../../utils';
import { getType } from '@/services/type/type';
import { addBill, updateBill } from '@/services/bill/bill';

const PopupAddBill = forwardRef(
  ({ detail = {}, onReload }: { detail: any; onReload: any }, ref: any) => {
    let id = detail && detail.id;
    const [show, setShow] = useState(false);
    const [payType, setPayType] = useState('expense');
    const [date, setDate] = useState(new Date());
    const dateRef = useRef();
    const [showRemark, setShowRemark] = useState(false);
    const [amount, setAmount] = useState('');
    const [currentType, setCurrentType] = useState({});
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);
    const [remark, setRemark] = useState('');

    useEffect(() => {
      if (detail.id) {
        setPayType(detail.pay_type == 1 ? 'expense' : 'income');
        setCurrentType({
          id: detail.type_id,
          name: detail.type_name,
        });
        setShowRemark(detail.remark);
        setAmount(String(detail.amount));
        setDate(dayjs(Number(detail.date)).$d);
      }
    }, [detail]);

    useEffect(() => {
      getList();
    }, []);

    const getList = async () => {
      const list = await getType();
      const _expense = list.filter((i: any) => i.type === 1);
      const _income = list.filter((i: any) => i.type === 2);
      setExpense(_expense);
      setIncome(_income);

      if (!id) {
        setCurrentType(_expense[0]);
      }
    };

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

    const changeType = (type: any) => {
      setPayType(type);
      if (type === 'expense') {
        setCurrentType(expense[0]);
      } else {
        setCurrentType(income[0]);
      }
    };

    const handleDatePop = () => {
      dateRef.current && dateRef.current.show();
    };

    const selectDate = (date: any) => {
      setDate(date);
    };

    const choseType = (item: any) => {
      setCurrentType(item);
    };

    const handleMoney = (value: any) => {
      console.log(value, amount);
      value = String(value);

      if (value === 'close') return;

      if (value === 'delete') {
        let _amount = amount.slice(0, amount.length - 1);
        setAmount(_amount);
        return;
      }
      if (value === 'ok') {
        addMoney();
        return;
      }

      if (value == '.' && amount.includes('.')) return;
      if (
        value != '.' &&
        amount.includes('.') &&
        amount &&
        amount.split('.')[1].length >= 2
      )
        return;
      setAmount(amount + value);
    };

    const addMoney = async () => {
      if (!amount) {
        Toast.show('请输入具体金额');
        return;
      }

      const params = {
        amount: Number(amount).toFixed(2),
        type_id: currentType.id,
        type_name: currentType.name,
        date: dayjs(date).unix() * 1000,
        pay_type: payType == 'expense' ? 1 : 2,
        remark: remark || '',
      };
      if (id) {
        params.id = id;
        await updateBill(params);
        Toast.show('修改成功');
      } else {
        await addBill(params);
        setAmount('');
        setPayType('expense');
        setCurrentType(expense[0]);
        setDate(new Date());
        setRemark('');
        Toast.show('添加成功');
      }
      setShow(false);
      if (onReload) onReload();
    };

    return (
      <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => setShow(false)}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div className={CSS.addWrap}>
          <header className={CSS.header}>
            <span className={CSS.close} onClick={() => setShow(false)}>
              <Icon type="wrong" />
            </span>
          </header>
          <div className={CSS.filter}>
            <div className={CSS.type}>
              <span
                className={cx({
                  [CSS.expense]: true,
                  [CSS.active]: payType === 'expense',
                })}
                onClick={() => changeType('expense')}
              >
                支出
              </span>
              <span
                className={cx({
                  [CSS.income]: true,
                  [CSS.active]: payType === 'income',
                })}
                onClick={() => changeType('income')}
              >
                收入
              </span>
            </div>
            <div className={CSS.item} onClick={() => handleDatePop}>
              {dayjs(date).format('MM-DD')}
              <Icon className={CSS.arrow} type="arrow.bottom" />
            </div>
          </div>
          <div className={CSS.money}>
            <span className={CSS.sufix}>￥</span>
            <span className={cx(CSS.amount, CSS.animation)}>{amount}</span>
          </div>
          <div className={CSS.typeWrap}>
            <div className={CSS.typeBody}>
              {(payType === 'expense' ? expense : income).map((item: any) => (
                <div
                  className={CSS.typeItem}
                  key={item.id}
                  onClick={() => choseType(item)}
                >
                  <span
                    className={cx({
                      [CSS.iconfont]: true,
                      [CSS.iconfontWrap]: true,
                      [CSS.expense]: payType === 'expense',
                      [CSS.income]: payType === 'income',
                      [CSS.active]: currentType.id == item.id,
                    })}
                  >
                    <CustomIcon type={typeMap[item.id].icon} />
                  </span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={CSS.remark}>
            {showRemark ? (
              <Input
                autoHeight
                showLength
                maxLength={50}
                type="text"
                rows={3}
                value={remark}
                placeholder="请输入备注信息"
                onChange={(val: any) => setRemark(val)}
                onBlur={() => setShowRemark(false)}
              />
            ) : (
              <span onClick={() => setShowRemark(true)}>
                {remark || '添加备注信息'}
              </span>
            )}
          </div>
          <Keyboard
            type="price"
            onKeyClick={(value: any) => handleMoney(value)}
          />
          <PopupDate ref={dateRef} onSelect={selectDate} />
        </div>
      </Popup>
    );
  }
);

PopupAddBill.propTypes = {
  detail: PropTypes.object,
  onReload: PropTypes.func,
};

export default PopupAddBill;
