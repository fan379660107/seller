import { connect } from 'dva/index';
import React, { Component } from 'react';
import { sldComLanguage } from '@/utils/utils';
import { Form, Spin } from 'antd';
import {
  sldLlineRtextAddGoods,
  failTip,
  sucTip,
  getSldEmptyH,
} from '@/utils/utils';
import global from '@/global.less';
import SldTableEdit from '@/components/SldTableEdit/SldTableEdit';
import { apiUrl } from '@/utils/sldconfig.js';

let sthis = '';
@connect(({ express }) => ({
  express,
}))
@Form.create()
export default class ExpressSetting extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      flag: 0,
      submitting: false,//提交按钮加载状态
      initLoading: false,//页面初始化加载状态
      info_data: [{
          type: 'inputnum',
          label: `${sldComLanguage('免运费额度(元)')}`,
          min: 0,
          max: 999999,
          extra: `${sldComLanguage('默认为“0”，不填或0表示不设置免运费额度，大于0则表示购买金额达到该额度时免运费。')}`,
          name: 'freeFreightLimit',
          placeholder: ``,
          initialValue: '',
        },
      ],
    };
  }

  componentDidMount() {
    this.get_vendor_base_info();
  }

  componentWillUnmount() {

  }

  //获取店铺的基本信息
  get_vendor_base_info = () => {
    const { dispatch } = this.props;
    let { info_data } = this.state;
    dispatch({
      type: 'manage/getVendorSetting',
      callback: (res) => {
        if (res.state == 200) {
          for (let i in info_data) {
            info_data[i].initialValue = res.data[info_data[i].name]?res.data[info_data[i].name]:0;
          }
          if (info_data.length > 0) {
            info_data.push({
              type: 'button',
              label: '',
              name: 'button',
            });
          }
        }
        this.setState({ info_data, flag: 1 });
      },
    });
  };

  //保存事件
  handleSubmit = (values) => {
    this.setState({ submitting: true });
    const { dispatch } = this.props;
    const { info_data } = this.state;
    delete info_data.button;
    dispatch({
      type: 'express/saveFreeFreight',
      payload: { ...values },
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
        } else {
          failTip(res.msg);
        }
        this.setState({ submitting: false });
      },
    });
  };

  render() {
    const { info_data, submitting, initLoading, flag } = this.state;
    return (
      <Spin spinning={initLoading}>
        <div className={global.common_page_20} style={{padding:0}}>
          {getSldEmptyH(10)}
          {flag == 1 &&
          <SldTableEdit
            submiting={submitting}
            width={1000}
            data={info_data}
            handleSubmit={this.handleSubmit}
          />
          }
        </div>
      </Spin>
    );
  }
}
