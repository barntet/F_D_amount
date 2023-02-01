// import { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import { Icon, Pull, Popup } from 'zarm';
// import { REFRESH_STATE, LOAD_STATE } from '@/utils';
// import { getBillData } from '../../services/bill/bill';
// import BillItem from '../../components/BillItem';
// import PopupType from '../../components/PopupType';
// import PopupDate from '../../components/PopupDate';
// import CSS from './index.module.less';

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [currentTime, setCurrentTime] = useState(dayjs().valueOf());
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
//   const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载
//   const [hasMore, setHasMore] = useState(false);
//   const [currentSelect, setCurrentSelect] = useState({});
//   const typeRef: any = useRef(); // 账单类型 ref
//   const monthRef: any = useRef(); // 月份筛选 ref

//   const [expense, setExpense] = useState(0);
//   const [income, setIncome] = useState(0);

//   useEffect(() => {
//     getBillList(); // 初始化
//   }, [page, currentSelect, currentTime]);

//   // 获取账单方法
//   const getBillList = async () => {
//     const { list, totalPage, totalExpense, totalIncome } = await getBillData({
//       page,
//     });

//     if (page === 1) {
//       //  下拉刷新
//       setData(list);
//     } else {
//       setData(data.concat(list));
//     }

//     setExpense(totalExpense.toFixed(2));
//     setIncome(totalIncome.toFixed(2));

//     setTotal(totalPage);
//     // 上滑加载
//     setLoading(LOAD_STATE.success);
//     setRefreshing(REFRESH_STATE.success);
//   };

//   // 请求列表数据
//   const refreshData = () => {
//     setRefreshing(REFRESH_STATE.loading);
//     if (page != 1) {
//       setPage(1);
//     } else {
//       getBillList();
//     }
//   };

//   const loadData = () => {
//     if (page < total) {
//       setLoading(LOAD_STATE.loading);
//       setPage(page + 1);
//     }
//   };

//   // 添加账单弹窗
//   const toggle = () => {
//     typeRef.current && typeRef.current.show();
//   };
//   // 选择月份弹窗
//   const monthToggle = () => {
//     monthRef.current && monthRef.current.show();
//   };
//   // // 添加账单弹窗
//   // const addToggle = () => {
//   //   addRef.current && addRef.current.show();
//   // };

//   // 筛选类型
//   const select = (item: any) => {
//     setRefreshing(REFRESH_STATE.loading);
//     setPage(1);
//     setCurrentSelect(item);
//   };
//   // 筛选月份
//   const selectMonth = (item: any) => {
//     setRefreshing(REFRESH_STATE.loading);
//     setPage(1);
//     setCurrentTime(item);
//   };
//   return (
//     <div className={CSS.home}>
//       <div className={CSS.header}>
//         <div className={CSS.dataWrap}>
//           <span>
//             总支出：<b>￥ {expense}</b>
//           </span>
//           <span className={CSS.income}>
//             总收入：<b>￥ {income}</b>
//           </span>
//         </div>
//         <div className={CSS.typeWrap}>
//           <div className={CSS.left} onClick={toggle}>
//             <span className={CSS.title}>
//               {currentSelect.name || '类型'}
//               <Icon className={CSS.arrow} type="arrow-bottom" />
//             </span>
//           </div>
//           <div className={CSS.right} onClick={monthToggle}>
//             <span>
//               {dayjs(currentTime).format('YYYY-MM') || '2023-01'}
//               <Icon className={CSS.arrow} type="arrow-bottom" />
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className={CSS.contentWrap}>
//         {Array.isArray(data) && data.length ? (
//           <Pull
//             animationDuration={200}
//             stayTime={400}
//             refresh={{
//               state: refreshing,
//               handler: refreshData,
//             }}
//             load={{
//               state: loading,
//               distance: 200,
//               handler: loadData,
//             }}
//           >
//             {data.map((item, index) => (
//               <BillItem bill={item} key={index} />
//             ))}
//           </Pull>
//         ) : null}
//       </div>
//       <PopupType ref={typeRef} onSelect={select} />
//       <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from 'react';
import { Icon, Pull } from 'zarm';
import dayjs from 'dayjs';
import PopupType from '@/components/PopupType';
import PopupDate from '@/components/PopupDate';
// import PopupAddBill from '@/components/PopupAddBill';
import BillItem from '@/components/BillItem';
// import Empty from '@/components/Empty';
import CustomIcon from '@/components/CustomIcon';
import { REFRESH_STATE, LOAD_STATE } from '@/utils';
import { getBillData } from '../../services/bill/bill';

import s from './index.module.less';

const Home = () => {
  const typeRef = useRef(); // 账单类型 ref
  const monthRef = useRef(); // 月份筛选 ref
  const addRef = useRef(); // 添加账单 ref
  const [expense, setTotalExpense] = useState(0); // 总支出
  const [income, setTotalIncome] = useState(0); // 总收入
  const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
  const [page, setPage] = useState(1); // 分页
  const [data, setData] = useState([]); // 账单列表
  const [total, setTotal] = useState(0); // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

  useEffect(() => {
    getBillList(); // 初始化
  }, [page, currentSelect, currentTime]);

  const getBillList = async () => {
    const { list, totalPage, totalExpense, totalIncome } = await getBillData({
      page,
    });
    // 下拉刷新，重制数据
    if (page === 1) {
      setData(list);
    } else {
      setData(data.concat(list));
    }
    setTotalExpense(totalExpense.toFixed(2));
    setTotalIncome(totalIncome.toFixed(2));
    setTotal(totalPage);
    // 上滑加载状态
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  };

  // 请求列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page !== 1) {
      setPage(1);
    } else {
      getBillList();
    }
  };

  const loadData = () => {
    if (page < total) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  };

  // 添加账单弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show();
  };
  // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show();
  };
  // 添加账单弹窗
  const addToggle = () => {
    addRef.current && addRef.current.show();
  };

  // 筛选类型
  const select = item => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentSelect(item);
  };
  // 筛选月份
  const selectMonth = item => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item);
  };

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>
            总支出：<b>¥ {expense}</b>
          </span>
          <span className={s.income}>
            总收入：<b>¥ {income}</b>
          </span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left} onClick={toggle}>
            <span className={s.title}>
              {currentSelect.name || '全部类型'}{' '}
              <Icon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
          <div className={s.right}>
            <span className={s.time} onClick={monthToggle}>
              {currentTime}
              <Icon className={s.arrow} type="arrow-bottom" />
            </span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {data.length ? (
          <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshing,
              handler: refreshData,
            }}
            load={{
              state: loading,
              distance: 200,
              handler: loadData,
            }}
          >
            {data.map((item, index) => (
              <BillItem bill={item} key={index} />
            ))}
          </Pull>
        ) : null}
      </div>
      <PopupType ref={typeRef} onSelect={select} />
      <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
    </div>
  );
};

export default Home;
