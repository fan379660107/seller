/*
* 申请续签弹框
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Button, message, Modal } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
  saveSettleData,
  getSettleData,
  getSldEmptyH,
  sucTip,
  failTip,
  list_com_page_more,
} from '@/utils/utils';
import styles from './open_time_modal.less';
import global from '@/global.less';

import SldTableRowThree from '@/components/SldTableRowThree';
import { Scrollbars } from 'react-custom-scrollbars';

@connect(({ store, project }) => ({
  store, project,
}))
@Form.create()
export default class OpenTimeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //经营信息
      base_info: [
        {
          type: 'show_text',
          label: `${sldComLanguage('应付金额')}`,
          name: 'payAmount',
          placeholder: ``,
          initialValue: '',
          text: '--',
        },
      ],
      store_grade_data: [{
        type: 'scroll_table',
        lwidth: '12',
        label: `${sldComLanguage('店铺等级')}`,
        name: 'grade',
        data: [],
        width: 640,
        columns: this.store_grade_column,
        rowKey: 'gradeId',
        item_height: 250,
        scroll_height: 220,
        required: true,
        handleSelectRows: this.handleSelectGrade,
        selectedRows: this.selectedRows,
        selectedRowKeys: this.selectedRowKeys,
      }],//店铺等级数据
      open_time_data: [{
        type: 'select',
        label: `${sldComLanguage('开店时长')}`,
        name: 'duration',
        placeholder: `${sldComLanguage('请选择开店时长')}`,
        sel_data: [],
        required: true,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择开店时长')}`,
        }],
        onChange: this.handleSelOpenTime,
      }, {
        type: 'radio',
        label: `${sldComLanguage('支付方式')}`,
        name: 'payMethod',
        placeholder: '',
        width: 250,
        sel_data: [
          { name: `${sldComLanguage('支付宝')}`, key: 'alipay' },
          { name: `${sldComLanguage('微信')}`, key: 'wx' },
        ],
        initialValue: 'alipay',
      }],//开店时长
      submiting: false,
      modalWxPayVisible: false,
      wx_pay_qrcode: '',
      pay_data: [{
        type: 'radio',
        label: `${sldComLanguage('支付方式')}`,
        name: 'payMethod',
        placeholder: '',
        width: 250,
        sel_data: [
          { name: `${sldComLanguage('支付宝')}`, key: 'alipay' },
          { name: `${sldComLanguage('微信')}`, key: 'wx' },
        ],
        initialValue: 'alipay',
      }],
    };
  }

  selectedRows = [];
  selectedRowKeys = [];
  store_grade_column = [
    {
      title: `${sldComLanguage('店铺等级')}`,//店铺等级
      dataIndex: 'gradeName',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('可发布商品')}`,//可发布商品
      dataIndex: 'goodsLimit',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('可推荐商品')}`,//可推荐商品
      dataIndex: 'recommendLimit',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('收费标准')}`,//收费标准
      dataIndex: 'price',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('申请说明')}`,//申请说明
      dataIndex: 'description',
      align: 'center',
      width: 200,
    },
  ];

  selected_pay_method = '';//选择的支付方式
  sel_grade_row = '';//选择的店铺等级的年费
  sel_open_time = '';//选择的开店时间
  pay_sn = '';//支付号
  renew_id = '';//续签id

  componentDidMount() {
    this.getStoreGrade();
    this.getStoreOpenTime();
  }

  //店铺等级选择
  handleSelectGrade = (rows, rowkeys) => {
    let { store_grade_data } = this.state;
    store_grade_data[0].selectedRows = rows;
    store_grade_data[0].selectedRowKeys = rowkeys;
    //计算应付金额
    this.sel_grade_row = rows[0].price;
    let { base_info } = this.state;
    if (this.sel_open_time) {
      base_info[0].text = (this.sel_open_time * this.sel_grade_row).toFixed(0)+`${sldComLanguage('元')}`;
    }
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
      store_grade_data,
      base_info,
    });
  };

  //选择开店时间操作
  handleSelOpenTime = (val) => {
    //计算应付金额
    this.sel_open_time = val;
    let { base_info } = this.state;
    if (this.sel_grade_row) {
      base_info[0].text = (this.sel_open_time * this.sel_grade_row).toFixed(0)+`${sldComLanguage('元')}`;
      this.setState({ base_info });
    }
  };

  //获取店铺等级
  getStoreGrade = () => {
    let { store_grade_data } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'store/get_store_grade',
      payload: { pageSize: list_com_page_more },
      callback: (res) => {
        if (res.state == 200) {
          store_grade_data[0].data = res.data.list;
          this.setState({
            store_grade_data,
          });
        }
      },
    });
  };

  //获取开店时长列表
  getStoreOpenTime = () => {
    let { open_time_data } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'store/get_store_open_time',
      callback: (res) => {
        if (res.state == 200) {
          let tmp_data = [];
          res.data.map(item => {
            tmp_data.push({ key: item, name: item + `${sldComLanguage('年')}` });
          });
          open_time_data[0].sel_data = tmp_data;
          this.setState({
            open_time_data,
          });
        }
      },
    });
  };

  sldConfirm = () => {
    let { store_grade_data } = this.state;
    const { dispatch, payData } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (payData.renewId != undefined && payData.renewId) {
        //直接去支付
        this.pay_sn = payData.paySn;
        this.renew_id = payData.renewId;
        this.selected_pay_method = values.payMethod;
        //继续走支付
        this.goPay();
        return false;
      }
      if (!err) {
        let params = {};
        params.duration = values.duration;
        if (store_grade_data[0].selectedRowKeys.length == 0) {
          failTip(`${sldComLanguage('请选择店铺等级～')}`);
          return false;
        } else {
          params.gradeId = store_grade_data[0].selectedRowKeys[0];//店铺等级
        }
        this.selected_pay_method = values.payMethod;
        dispatch({
          type: 'store/apply_renew',
          payload: params,
          callback: res => {
            if (res.state == 200) {
              this.pay_sn = res.data.paySn;
              this.renew_id = res.data.renewId;
              //继续走支付
              this.goPay();
            }else{
              sucTip(res.msg);
            }
          },
        });
      }
    });
  };

  queryPayState = () => {
    this.props.dispatch({
      type: 'store/get_renew_state',
      payload: { renewId: this.renew_id },
      callback: res => {
        if (res.state == 200) {
          if (res.data.state == 2) {
            //已付款
            //清除定时器
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = 0;
            }
            this.setState({ modalWxPayVisible: false });
            //更新上级页面数据
            this.props.payComplete();
          }
        }
      },
    });
  };

  //支付
  goPay = () => {
    this.props.dispatch({
      type: 'store/renew_pay',
      payload: { payMethod: this.selected_pay_method, paySn: this.pay_sn },
      callback: res => {
        if (res.state == 200) {
          if (this.selected_pay_method == 'alipay') {
            document.write(res.data.payData);//自动提交表单数据
          } else if (this.selected_pay_method == 'wx') {
            this.sldCancle();
            this.setState({
              modalWxPayVisible: true,
              wx_pay_qrcode: 'data:image/png;base64,' + res.data.payData,//微信支付二维码
            });
            // 定时查询是否支付成功
            let _this = this;
            this.timer = setInterval(() => {
              _this.queryPayState();
            }, 3000);
          }
        }
      },
    });
  };

  sldCancle = () => {
    this.props.closeModal();
    //重置modal数据
    let { base_info, store_grade_data, open_time_data } = this.state;
    base_info[0].text = '--';
    store_grade_data[0].selectedRows = [];
    store_grade_data[0].selectedRowKeys = [];
    this.selectedRows = [];
    this.selectedRowKeys = [];
    open_time_data.map(item => {
      if (item.name == 'duration') {
        delete item.initialValue;
      } else if (item.name == 'payMethod') {
        item.initialValue = 'alipay';
      }
    });
    this.setState({ base_info, store_grade_data, open_time_data });
  };

  sldWxPayCancle = () => {
    //更新上级页面数据
    this.props.payComplete();
    this.setState({ modalWxPayVisible: false });
    this.selected_pay_method = '';//选择的支付方式
    this.sel_grade_row = '';//选择的店铺等级的年费
    this.sel_open_time = '';//选择的开店时间
    this.pay_sn = '';//支付号
  };

  refreshWxQrcode = () => {
    this.goPay();
  };

  render() {
    const {
      base_info,
      open_time_data,
      store_grade_data,
      submiting,
      modalWxPayVisible,
      wx_pay_qrcode,
      pay_data,
    } = this.state;
    const { modalVisible, payData } = this.props;
    return (
      <Fragment>
        <Modal
          destroyOnClose={true}
          maskClosable={false}
          title={payData.renewId != undefined && payData.renewId ? `${sldComLanguage('续签付款')}` : `${sldComLanguage('申请续签')}`}
          zIndex={999}
          width={payData.renewId != undefined && payData.renewId ? 400 : 800}
          visible={modalVisible}
          onOk={this.sldConfirm}
          onCancel={this.sldCancle}
          footer={[
            <Button key="back" onClick={this.sldCancle}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldConfirm}>
              {sldComLanguage('去付款')}
            </Button>,
          ]}
        >
          <div style={{ flex: 1 }}>
            <Scrollbars
              autoHeight
              autoHeightMin={100}
              autoHeightMax={document.body.clientHeight - 130}>
              <div className={styles.commen_wrap}>
                {payData.renewId != undefined && payData.renewId
                  ? <SldTableRowThree form={this.props.form} data={pay_data}/>
                  : <Fragment>
                    <SldTableRowThree form={this.props.form} data={store_grade_data}/>
                    <SldTableRowThree form={this.props.form} data={base_info}/>
                    <SldTableRowThree form={this.props.form} data={open_time_data}/>
                  </Fragment>
                }
              </div>
              {getSldEmptyH(10)}
            </Scrollbars>
          </div>
        </Modal>
        {/* 微信支付弹框 start */}
        <Modal
          destroyOnClose={true}
          maskClosable={false}
          title={`${sldComLanguage('微信支付')}`}
          zIndex={999}
          width={400}
          visible={modalWxPayVisible}
          onOk={this.sldWxPayCancle}
          onCancel={this.sldWxPayCancle}
          footer={[
            <Button key="back" onClick={this.sldWxPayCancle}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldWxPayCancle}>
              {sldComLanguage('已支付')}
            </Button>,
          ]}
        >
          <div className={`${global.flex_column_center_center} ${styles.wx_pay_qrcode}`}>
            <img src={wx_pay_qrcode}/>
            <p className={styles.pay_tip}>{sldComLanguage('使用')}<span style={{ color: '#228AFF' }}>{sldComLanguage('微信APP')}</span>{sldComLanguage('扫码支付')}</p>
            <a className={styles.wx_refresh} onClick={() => this.refreshWxQrcode()}>{sldComLanguage('刷新')}</a>
          </div>
        </Modal>
        {/* 微信支付弹框 end */}
      </Fragment>
    );
  }
}
