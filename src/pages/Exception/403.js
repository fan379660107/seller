import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception403 = () => (
  <Exception
    type="403"
    desc={formatMessage({ id: '更新中...' })}
    linkElement={Link}
    backText={formatMessage({ id: '返回首页' })}
  />
);

export default Exception403;
