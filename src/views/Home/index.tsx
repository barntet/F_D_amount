import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { List, InfiniteScroll } from 'antd-mobile';
import { REFRESH_STATE, LOAD_STATE } from '@/utils';
import { getBillData } from '../../services/bill/bill';
import BillItem from '../../components/BillItem';
import CSS from './index.module.less';

const aaa = [
  {
    date: 1675152569996,
    bills: [
      {
        id: 17,
        pay_type: 2,
        amount: 130,
        date: 1675152569996,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
      {
        id: 19,
        pay_type: 2,
        amount: 150,
        date: 1675152575657,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
      {
        id: 20,
        pay_type: 2,
        amount: 160,
        date: 1675152578401,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
      {
        id: 21,
        pay_type: 2,
        amount: 170,
        date: 1675152581134,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
      {
        id: 22,
        pay_type: 2,
        amount: 180,
        date: 1675152583954,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
      {
        id: 23,
        pay_type: 2,
        amount: 190,
        date: 1675152586984,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
      {
        id: 24,
        pay_type: 2,
        amount: 200,
        date: 1675152590401,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1674144000000,
    bills: [
      {
        id: 18,
        pay_type: 2,
        amount: 140,
        date: 1674144000000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673712000000,
    bills: [
      {
        id: 16,
        pay_type: 2,
        amount: 120,
        date: 1673712000000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673625600000,
    bills: [
      {
        id: 15,
        pay_type: 2,
        amount: 110,
        date: 1673625600000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673539200000,
    bills: [
      {
        id: 14,
        pay_type: 2,
        amount: 100,
        date: 1673539200000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673452800000,
    bills: [
      {
        id: 13,
        pay_type: 2,
        amount: 90,
        date: 1673452800000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673366400000,
    bills: [
      {
        id: 12,
        pay_type: 2,
        amount: 80,
        date: 1673366400000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673280000000,
    bills: [
      {
        id: 11,
        pay_type: 2,
        amount: 70,
        date: 1673280000000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673193600000,
    bills: [
      {
        id: 10,
        pay_type: 2,
        amount: 60,
        date: 1673193600000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
  {
    date: 1673107200000,
    bills: [
      {
        id: 9,
        pay_type: 2,
        amount: 50,
        date: 1673107200000,
        type_id: 13,
        type_name: '理财',
        remark: '',
      },
    ],
  },
];

export default function Home() {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(dayjs().valueOf());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    getBillList(page); // 初始化
  }, [page]);

  const loadMore = async (page = 1) => {
    if (page >= 5) return;
    console.log(page);
    const list: any = await Promise.resolve(aaa);
    setData(data.concat(list));
    setHasMore(list.length > 0);
    setPage(page + 1);
  };

  // 获取账单方法
  const getBillList = async (currentPage: any) => {
    console.log(currentPage);

    if (!currentPage || page > total) {
      setHasMore(false);
      return;
    }
    const { list, totalPage } = await getBillData({
      page,
    });

    if (page === 1) {
      //  下拉刷新
      setData(list);
    } else {
      setData(data.concat(list));
    }

    // if (totalPage <= page) {
    //   setHasMore(false);
    //   return;
    // }

    setTotal(totalPage);
    // 上滑加载
    setLoading(LOAD_STATE.success);
    setRefreshing(REFRESH_STATE.success);
    console.log(totalPage > page);
    setHasMore(list.length > 0);
    setPage(page + 1);
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
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading);
      setPage(page + 1);
    }
  };

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
        {Array.isArray(data) && data.length ? (
          <>
            {data.map((item: any, index) => (
              <BillItem bill={item} key={index} />
            ))}
            <InfiniteScroll loadMore={getBillList} hasMore={hasMore} />
          </>
        ) : null}
      </div>
    </div>
  );
}
