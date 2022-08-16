import { Spin } from 'antd';

import classNames from './Loader.module.scss';

const Loader = () => {
  return <Spin size="large" className={classNames.loader} />;
};

export default Loader;
