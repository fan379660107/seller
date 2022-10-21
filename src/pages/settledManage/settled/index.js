import React, { Component, Fragment } from 'react';
import { Form, Spin, Button, } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
} from '@/utils/utils';
import global from '@/global.less';
import styles from './index.less';

export default class SupplierSettled extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  handleGoToProtocol = () => {
    this.props.history.push('/apply/settled_protocol')
  }

  render() {
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('店铺入驻')}`, 0, 0, 5)}
        <div className={styles.no_data_wrap}>
          <img src={require('../../../assets/no_data.png')} />
          <p>{sldComLanguage('当前店铺暂未开通')}</p>
          <Button className={styles.settledBtn} onClick={this.handleGoToProtocol}>{sldComLanguage('店铺入驻')}</Button>
        </div>
      </div>

    );
  }
}
