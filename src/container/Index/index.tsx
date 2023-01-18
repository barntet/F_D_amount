import css from './Index.module.less';
import { Button } from 'antd-mobile';
import { getData } from '@/services/count/get';

export default function Index() {
  return (
    <div className={css.index}>
      Index
      <Button color="primary" className={css.btn} onClick={() => getData()}>
        按钮
      </Button>
    </div>
  );
}
