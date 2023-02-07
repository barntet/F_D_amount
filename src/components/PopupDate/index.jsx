import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popup, DatePicker } from 'zarm';
import dayjs from 'dayjs';
const PopupDate = forwardRef(({ onSelect, mode = 'date' }, ref) => {
    const [show, setShow] = useState(false);
    const [now, setNow] = useState(new Date());
    const choseDate = (item) => {
        setNow(item);
        setShow(false);
        onSelect(dayjs(item).valueOf());
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
    return (<Popup visible={show} direction="bottom" onMaskClick={() => setShow(false)} destroy={false} mountContainer={() => document.body}>
        <div>
          <DatePicker visible={show} value={now} mode={mode} onOk={choseDate} onCancel={() => setShow(false)}/>
        </div>
      </Popup>);
});
PopupDate.propTypes = {
    mode: PropTypes.string,
    onSelect: PropTypes.func,
};
export default PopupDate;
//# sourceMappingURL=index.jsx.map