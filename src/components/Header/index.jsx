import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { NavBar, Icon } from 'zarm';
import CSS from './index.module.less';
const Header = ({ title }) => {
    const navigateTo = useNavigate();
    return (<div className={CSS.headerWrap}>
      <div className={CSS.block}>
        <NavBar className={CSS.header} left={<Icon type="arrow-left" theme="primary" onClick={() => navigateTo(-1)}/>} title={title}/>
      </div>
    </div>);
};
Header.propTypes = {
    title: PropTypes.string,
};
export default Header;
//# sourceMappingURL=index.jsx.map