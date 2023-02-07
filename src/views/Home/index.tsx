import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Icon, Pull } from 'zarm';
import { REFRESH_STATE, LOAD_STATE } from '../../utils';
import { getBillList } from '../../services/bill/bill';
import BillItem from '../../components/BillItem';
import PopupType from '../../components/PopupType';
import PopupDate from '../../components/PopupDate';
import PopupAddBill from '../../components/PopupAddBill';
import CSS from './index.module.less';
import CustomIcon from '../../components/icon/index';

const Home = () => {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(dayjs().valueOf());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载
  const [currentSelect, setCurrentSelect] = useState({}) as any;
  const typeRef: any = useRef(); // 账单类型 ref
  const monthRef: any = useRef(); // 月份筛选 ref
  const addRef: any = useRef();

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    getBillData(); // 初始化
  }, [page, currentSelect, currentTime]);

  // 获取账单方法
  const getBillData = async () => {
    console.log(1);
    const { list, totalPage, totalExpense, totalIncome } = await getBillList({
      page,
      date: currentTime,
      type_id: currentSelect.id || 'all',
    });

    if (page === 1) {
      //  下拉刷新
      setData(list);
    } else {
      setData(data.concat(list));
    }

    setExpense(totalExpense.toFixed(2));
    setIncome(totalIncome.toFixed(2));

    setTotal(totalPage);
    // 上滑加载
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
  };

  // 请求列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading);
    if (page !== 1) {
      setPage(1);
    } else {
      getBillData();
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
  const select = (item: any) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentSelect(item);
  };
  // 筛选月份
  const selectMonth = (item: any) => {
    setRefreshing(REFRESH_STATE.loading);
    setPage(1);
    setCurrentTime(item);
  };

  return (
    <div className={CSS.home}>
      <div className={CSS.header}>
        <div className={CSS.dataWrap}>
          <span>
            总支出：<b>￥ {expense}</b>
          </span>
          <span className={CSS.income}>
            总收入：<b>￥ {income}</b>
          </span>
        </div>
        <div className={CSS.typeWrap}>
          <div className={CSS.left} onClick={toggle}>
            <span className={CSS.title}>
              {currentSelect.name || '全部类型'}
              <Icon className={CSS.arrow} type="arrow-bottom" />
            </span>
          </div>
          <div className={CSS.right} onClick={monthToggle}>
            <span>
              {dayjs(currentTime).format('YYYY-MM') || '2023-01'}
              <Icon className={CSS.arrow} type="arrow-bottom" />
            </span>
          </div>
        </div>
      </div>
      <div className={CSS.contentWrap}>
        {Array.isArray(data) && data.length ? (
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
      <div className={CSS.add} onClick={addToggle}>
        <CustomIcon type="tianjia" />
      </div>
      <PopupType ref={typeRef} onSelect={select} />
      <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
      <PopupAddBill ref={addRef} onReload={refreshData} />
    </div>
  );
};

export default Home;
