import { useState } from 'react';
import BillItem from '../../components/BillItem';
import CSS from './index.module.less';

export default function Home() {
  const [list, setList] = useState([
    {
      date: 1675070070167,
      bills: [
        {
          id: 1,
          pay_type: 2,
          amount: 10,
          date: 1673859770182,
          type_id: 1,
          type_name: '收入',
          remark: '备注信息',
        },
      ],
    },
  ]);
  return (
    <div className={CSS.home}>
      <div className={CSS.header}>
        <div className={CSS.dataWrap}>
          <span className={CSS.expense}>
            总支出：<b>￥ 200</b>
          </span>
          <span className={CSS.income}>
            总收入：<b>￥ 500</b>
          </span>
        </div>
        <div className={CSS.typeWrap}>
          <div className={CSS.left}>
            <span className={CSS.title}>类型 </span>
          </div>
          <div className={CSS.right}>
            <span>2023-01</span>
          </div>
        </div>
      </div>
      <div className={CSS.contentWrap}>
        {list.map((item, index) => (
          <BillItem />
        ))}
      </div>
    </div>
  );
}
