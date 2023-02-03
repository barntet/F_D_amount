import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Cell } from 'zarm';
import { typeMap } from '@/utils';
import CustomIcon from '@/components/icon/index';

import CSS from './index.module.less';

const BillItem = ({ bill }: { bill: any }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const navigateTo = useNavigate();

  useEffect(() => {
    const _income = bill.bills
      .filter((i: any) => i.pay_type === 2)
      .reduce((total: any, current: any) => {
        total += Number(current.amount);
        return total;
      }, 0);
    setIncome(_income);

    const _expense = bill.bills
      .filter((i: any) => i.pay_type === 1)
      .reduce((total: any, current: any) => {
        total += Number(current.amount);
        return total;
      }, 0);
    setExpense(_expense);
  }, [bill.bills]);

  //  前端账单详情
  const goToDetail = (item: any) => {
    navigateTo(`/detail?id=${item.id}`);
  };

  return (
    <div className={CSS.item}>
      <div className={CSS.headerDate} onClick={() => null}>
        <div className={CSS.date}>{dayjs(bill.date).format('YYYY-MM-DD')}</div>
        <div className={CSS.money}>
          <span>
            <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>￥{expense.toFixed(2)}</span>
          </span>
          <span>
            <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>￥{income.toFixed(2)}</span>
          </span>
        </div>
      </div>
      {bill &&
        bill.bills.map((item: any) => (
          <Cell
            className={CSS.bill}
            key={item.id}
            onClick={() => goToDetail(item)}
            title={
              <>
                <CustomIcon
                  className={CSS.itemIcon}
                  type={item.type_id ? typeMap[item.type_id].icon : null}
                />
                <span>{item.type_name}</span>
              </>
            }
            description={
              <span
                style={{ color: item.pay_type === 2 ? 'red' : '#39be77' }}
              >{`${item.pay_type === 1 ? '-' : '+'}${item.amount}`}</span>
            }
            help={
              <div>
                {dayjs(Number(item.date)).format('HH:mm')}{' '}
                {item.remark ? `| ${item.remark}` : ''}
              </div>
            }
          ></Cell>
        ))}
    </div>
  );
};

BillItem.propTypes = {
  bill: PropTypes.object,
};

export default BillItem;
