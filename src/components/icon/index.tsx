import React from 'react';

import './index.less';

interface IconProps {
  type: string;
}

const Icon: React.FunctionComponent<IconProps> = ({ type }) => {
  const className = `iconfont ${type || ''}`;
  return <span className={className}></span>;
};

export default Icon;
