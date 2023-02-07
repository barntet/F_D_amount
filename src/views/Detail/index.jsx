import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import dayjs from 'dayjs';
import cx from 'classnames';
import { Toast, Modal } from 'zarm';
import CSS from './index.module.less';
import { getBillDetail, deleteBill } from '../../services/bill/bill';
import { typeMap } from '../../utils';
import Header from '../../components/Header';
import CustomIcon from '../../components/icon';
import PopupAddBill from '../../components/PopupAddBill';
const Detail = () => {
    const location = useLocation();
    const { id } = qs.parse(location.search);
    const [detail, setDetail] = useState({});
    const navigateTo = useNavigate();
    const editRef = useRef();
    useEffect(() => {
        getDetail();
    }, []);
    const getDetail = async () => {
        const data = await getBillDetail(Number(id));
        setDetail(data);
    };
    const deleteDetail = () => {
        Modal.confirm({
            title: '删除',
            content: '确定删除？',
            onOk: async () => {
                await deleteBill(Number(id));
                Toast.show('删除成功');
                navigateTo(-1);
            },
        });
    };
    return (<div className={CSS.detail}>
      <Header title="账单详情"/>
      <div className={CSS.card}>
        <div className={CSS.type}>
          <span className={cx({
            [CSS.expense]: detail.pay_type == 1,
            [CSS.income]: detail.pay_type == 2,
        }, CSS.iconfont)}>
            <CustomIcon type={detail.type_id ? typeMap[detail.type_id].icon : 1}/>
          </span>
          <span>{detail.type_name || ''}</span>
        </div>
        {detail.pay_type == 1 ? (<div className={cx(CSS.amount, CSS.expense)}>-{detail.amount}</div>) : (<div className={cx(CSS.amount, CSS.income)}>+{detail.amount}</div>)}
        <div className={CSS.info}>
          <div className={CSS.time}>
            <span>记录时间：</span>
            <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
          </div>
          <div className={CSS.remark}>
            <span>备注：</span>
            <span>{detail.remark || ''}</span>
          </div>
        </div>
        <div className={CSS.operation}>
          <span onClick={deleteDetail}>
            <CustomIcon type="shanchu"/>
            删除
          </span>
          <span onClick={() => editRef.current && editRef.current.show()}>
            <CustomIcon type="tianjia"/>
            编辑
          </span>
        </div>
        <PopupAddBill ref={editRef} detail={detail} onReload={getDetail}/>
      </div>
    </div>);
};
export default Detail;
//# sourceMappingURL=index.jsx.map