import { useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import { Icon, Progress } from 'zarm';

import CSS from './index.module.less';
import { getBillData } from '../../services/bill/bill';
import PopupDate from '../../components/PopupDate';
import CustomIcon from '../../components/icon';
import { typeMap } from '../../utils';

let proportionChart: any = null; // 用于存放echart初始化返回的实例

const Data = () => {
  const monthRef = useRef() as any;
  const [currentMonth, setCurrentMonth] = useState(dayjs().valueOf());
  const [totalType, setTotalType] = useState('income');
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [pieType, setPieType] = useState('income');

  useEffect(() => {
    getData();
    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      proportionChart.dispose();
    };
  }, [currentMonth]);

  const getData = async () => {
    const { list, totalExpense, totalIncome } = await getBillData(currentMonth);

    setExpense(totalExpense);
    setIncome(totalIncome);

    const _expenseData = list
      .filter((item: any) => item.pay_type === 1)
      .sort((a: any, b: any) => b.number - a.number);

    const _incomeData = list
      .filter((item: any) => item.pay_type === 2)
      .sort((a: any, b: any) => b.number - a.number);
    setExpenseData(_expenseData);
    setIncomeData(_incomeData); // 异步的，这里不能直接用incomeData

    setPieChart(pieType == 'expense' ? _expenseData : _incomeData);
  };

  const setPieChart = (data: []) => {
    if (!window.echarts) return;
    const echar = (window ? window.echarts : null) as any;
    if (window && echar) {
      console.log(data);
      // 初始化 饼图返回实例
      proportionChart = window.echarts.init(
        document.getElementById('proportion')
      );
      proportionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        // 图例
        legend: {
          data: data.map((item: any) => item.type_name),
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '55%',
            data: data.map((item: any) => ({
              value: item.number,
              name: item.type_name,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
  };

  const changePieType = (type: string) => {
    setPieType(type);
    // 重绘
    setPieChart((type == 'expense' ? expenseData : incomeData) as []);
  };

  // 切换收支构成类型
  const changeTotalType = (type: string) => {
    setTotalType(type);
  };

  const selectMonth = (date: number) => {
    setCurrentMonth(date);
  };

  const monthShow = () => {
    monthRef.current && monthRef.current.show();
  };

  return (
    <div className={CSS.data}>
      <div className={CSS.total}>
        <div className={CSS.time} onClick={monthShow}>
          <span>{dayjs(currentMonth).format('YYYY-MM')}</span>
          <Icon className={CSS.date} type="date" />
        </div>
        <div className={CSS.title}>共收入</div>
        <div className={CSS.income}>￥{income}</div>
        <br />
        <div className={CSS.expense}>共支出￥{expense}</div>
      </div>
      <div className={CSS.structure}>
        <div className={CSS.head}>
          <span className={CSS.title}>收支构成</span>
          <div className={CSS.tab}>
            <span
              className={cx({
                [CSS.expense]: true,
                [CSS.active]: totalType == 'expense',
              })}
              onClick={() => changeTotalType('expense')}
            >
              支出
            </span>
            <span
              className={cx({
                [CSS.income]: true,
                [CSS.active]: totalType == 'income',
              })}
              onClick={() => changeTotalType('income')}
            >
              收入
            </span>
          </div>
        </div>
        <div className={CSS.content}>
          {(totalType == 'expense' ? expenseData : incomeData).map(
            (item: any) => (
              <div className={CSS.item} key={item.type_id}>
                <div className={CSS.left}>
                  <div className={CSS.type}>
                    <span
                      className={cx({
                        [CSS.expense]: totalType == 'expense',
                        [CSS.income]: totalType == 'income',
                      })}
                    >
                      <CustomIcon
                        type={item.type_id ? typeMap[item.type_id].icon : 1}
                      />
                    </span>
                    <span className={CSS.name}>{item.type_name}</span>
                  </div>
                  <div className={CSS.progress}>
                    ￥{Number(item.number).toFixed(2) || 0}
                  </div>
                </div>
                <div className={CSS.right}>
                  <div className={CSS.percent}>
                    <Progress
                      shape="line"
                      percent={Number(
                        (item.number /
                          Number(totalType == 'expense' ? expense : income)) *
                          100
                      )}
                      theme="primary"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className={CSS.proportion}>
          <div className={CSS.head}>
            <span className={CSS.title}>收支构成</span>
            <div className={CSS.tab}>
              <span
                className={cx({
                  [CSS.expense]: true,
                  [CSS.active]: pieType == 'expense',
                })}
                onClick={() => changePieType('expense')}
              >
                支出
              </span>
              <span
                className={cx({
                  [CSS.income]: true,
                  [CSS.active]: pieType == 'income',
                })}
                onClick={() => changePieType('income')}
              >
                收入
              </span>
            </div>
          </div>
          <div id="proportion"></div>
        </div>
      </div>
      <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
    </div>
  );
};
export default Data;
