import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Spin } from 'antd';
import {
  sldLlineRtextAddGoods,
  failTip,
  sucTip,
  getSldEmptyH,sldComLanguage
} from '@/utils/utils';
import global from '@/global.less';
import SldTableEdit from '@/components/SldTableEdit/SldTableEdit';

let sthis = '';
@connect(({ order }) => ({
  order,
}))
@Form.create()
export default class OrderPrintSetting extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      expressType: 2,//快递类型，1-快递鸟，2-快递100
      flag: 0,
      submitting: false,//提交按钮加载状态
      initLoading: false,//页面初始化加载状态
      info_data: [{
        type: 'input',
        label: `${sldComLanguage('快递鸟id')}`,
        name: 'businessId',
        placeholder: `${sldComLanguage('请输入快递鸟id')}`,
        initialValue: '',
        maxLength:50,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入快递鸟id')}`,
        }],
      },{
        type: 'input',
        label: `${sldComLanguage('快递鸟key')}`,
        extra: `${sldComLanguage('快递鸟密钥')}`,
        name: 'appKey',
        placeholder: `${sldComLanguage('请输入快递鸟key')}`,
        initialValue: '',
        maxLength:50,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入快递鸟key')}`,
        }],
        },{
        type: 'radio_single',
        label: `${sldComLanguage('快递鸟接口类型')}`,
        extra: `${sldComLanguage('若购买的套餐为免费，则选择免费接口，否则为付费接口')}`,
        name: 'requestType',
        placeholder: ``,
        initialValue: 0,
        sel_data:[{key:0,value:sldComLanguage('免费接口')},{key:1,value:sldComLanguage('付费接口')}],
        },{
          type: 'input',
          label: `${sldComLanguage('打印机名称')}`,
          extra: `${sldComLanguage('用于打印快递鸟电子面单')}`,
          name: 'printerName',
          placeholder: `${sldComLanguage('请输入打印机名称')}`,
          initialValue: '',
          maxLength:50,
          rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入打印机名称')}`,
          }],
        },
      ],
    };
  }

  componentDidMount() {
    this.getSetting();
  }

  componentWillUnmount() {

  }

  //获取系统配置
  getSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'express_type'},
      callback: (res) => {
        if (res.state == 200) {
          this.setState({ expressType: res.data[0].value }, () => {
            this.get_detail();
          })
        }
      },
    });
  };

  //获取详情
  get_detail = () => {
    const { dispatch } = this.props;
    let { info_data, expressType } = this.state;
    dispatch({
      type: 'order/get_KDN_detail',
      callback: (res) => {
        if (res.state == 200) {
          if(res.data.isHidden == 1){
            info_data = info_data.filter(item=>item.name == 'printerName');
          }
          for (let i in info_data) {
            info_data[i].initialValue = res.data[info_data[i].name];
            if(expressType == 2 && info_data[i].name == 'printerName'){
              info_data[i].label = `${sldComLanguage('打印机设备码')}`;
              info_data[i].extra = `${sldComLanguage('用于打印快递100电子面单')}`;
            }
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
    dispatch({
      type: 'order/save_KDN_setting',
      payload: values,
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
        <div className={global.common_page_20}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('电子面单打印机设置')}`)}
          <div className={`${global.flex_com_column} ${global.comm_line_sperator}`}>
            {getSldEmptyH(15)}
            {flag == 1 &&
            <SldTableEdit
              submiting={submitting}
              width={1000}
              data={info_data}
              handleSubmit={this.handleSubmit}
            />
            }
          </div>
        </div>
      </Spin>
    );
  }
}
