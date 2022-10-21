import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Radio, Modal, Select, Input, Button, InputNumber, Popconfirm } from 'antd';
import {
  sldComLanguage,
  failTip,
  sucTip,
  getSldHorLine,
  getSldListGoodsImg80,
  sldLlineRtextAddGoods,
  sldIconBtnBg,
  sldCommonTitle,
  list_com_page_more,
  formItemLayoutModal,
  getSldEmptyH,
  sldtbaleOpeBtnText,
  mobile_reg,
  sldSvgIcon
} from '@/utils/utils';
import global from '@/global.less';
import router from 'umi/router';
import order from './order.less';
import { Scrollbars } from 'react-custom-scrollbars';
import SldTableRowTwo from '@/components/SldTableRowTwo';
import SldModal from '@/components/SldModal/SldModal';
import StandardTable from '@/components/StandardTable';

const { info } = Modal;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

let sthis = '';
@connect(({ order }) => ({
  order,
}))
@Form.create()
export default class Order_detail extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      reserve_info: [],//用户预留信息
      exterFaceSheet: '',//通过电子面单获取的物流单号
      showPrintExterFaceSheetBtn: false,//是否展示打印电子面单按钮
      isAllowApplyExpressNum: true,//是否允许通过电子面单申请物流单号,默认允许
      showTopTip: '',//sldmodal顶部提示
      secondTitle: '',//第二个sldmodal的标题
      secondSubmiting: false,//第二个sldmodal的submiting
      secondModalVisible: false,//第二个sldmodal是否显示
      secondOperateData: [],//第二个sldmodal的数据
      orderRemarkData: [{
        type: 'textarea',
        label: `${sldComLanguage('订单备注')}`,
        name: 'remark',
        placeholder: `${sldComLanguage('请输入订单备注信息')}`,
        extra: `${sldComLanguage('最多输入100字')}`,
        initialValue: '',
        maxLength: 100,
      }],//订单备注数据
      changeVal: '',//改价的运费值
      priceModalVisible: false,//修改价格modal是否显示
      priceSubmiting: false,//修改价格modal的submiting
      query: props.location.query,
      order_detail: {},
      return_progress_data: [], //退货进度条
      invoice_info: [{
        type: 'show_text',
        label: `${sldComLanguage('单位名称')}`,
        name: 'invoiceTitle',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('税号')}`,
        name: 'taxCode',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('收票邮箱')}`,
        name: 'receiverEmail',
        extra: ``,
        item_height: 42,
        text: ``,
      }],//公司——普通发票
      receiver_info: [{ //收货人信息
        type: 'show_text',
        label: `${sldComLanguage('会员名称')}`,
        name: 'memberName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('收货人')}`,
        name: 'receiverName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('收货人手机号')}`,
        name: 'receiverMobile',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('收货地址')}`,
        name: 'receiverAreaInfo',
        extra: ``,
        item_height: 42,
        text: ``,
      }],
      order_info: [{
        type: 'show_text',
        label: `${sldComLanguage('订单类型')}`,
        name: 'orderTypeValue',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('订单号')}`,
        name: 'orderSn',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('支付方式')}`,
        name: 'paymentName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('订单备注')}`,
        name: 'orderRemark',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text_edit',
        label: `${sldComLanguage('商家备注')}`,
        name: 'storeRemark',
        extra: ``,
        item_height: 42,
        text: ``,
        onChange: this.addOrderRemark,
      }, {
        type: 'show_order_star',
        label: `${sldComLanguage('订单星级')}`,
        name: 'star',
        extra: ``,
        item_height: 42,
        text: ``,
        addStar: this.addStar,
      }],//订单信息
      goodsInfoList: [], //商品信息
      orderLogList: [],
      operateData: [], //弹框操作数据
      resList: [], // 取消原因数据
      modalVisible: false,
      titleName: '',
      submiting: false,
      show_foot: true,
      modal_width: 550,
      propType: '',
      deliverModal: false,
      expressList: [], //快递公司数据
      deliverType: '0', //发货方式
    };
  }

  columns_order_goods = [
    {
      title: ' ',
      align: 'center',
      width: 30,
      render: (text, record, index) => index * 1 + 1,
    },
    {
      title: `${sldComLanguage('商品信息')}`,
      dataIndex: 'productImage',
      align: 'center',
      width: 500,
      render: (text, record) => {
        return <div className={`${order.goods_info} ${global.com_flex_row_flex_start}`}>
          <div className={order.goods_img}>{getSldListGoodsImg80(text)}</div>
          <div className={`${global.com_flex_column_space_between} ${order.goods_detail}`}>
    <span className={order.goods_name} style={{ marginTop: 6, width: 380 }} title={record.goodsName}>
    {record.goodsName}
    </span>
            <span className={order.goods_brief} title={record.specValue}>
    {record.specValues}
    </span>
          </div>
        </div>;
      },
    },
    {
      title: `${sldComLanguage('单价(元)')}`,
      dataIndex: 'productShowPrice',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('数量')}`,
      dataIndex: 'productNum',
      align: 'center',
      width: 100,
    }, {
      title: `${sldComLanguage('操作')}`,
      align: 'center',
      width: 80,
      render: (text, record) => (
        <Fragment>
          {record.afsState != undefined && record.afsState
            ? sldtbaleOpeBtnText(record.afsStateValue, () => this.goServiceDetail(record.afsSn))
            : '--'
          }
        </Fragment>
      ),
    },
  ];//订单商品表头

  columns_order_log = [
    {
      title: ' ',
      align: 'center',
      width: 30,
      render: (text, record, index) => index * 1 + 1,
    },
    {
      title: `${sldComLanguage('操作方')}`,
      dataIndex: 'logRole',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        let con = '';
        if (text == 1) {
          con = '系统管理员';
        } else if (text == 2) {
          con = '商家';
        } else if (text == 2) {
          con = '会员';
        }
        return con;
      },
    }, {
      title: `${sldComLanguage('操作人')}`,
      dataIndex: 'logUserName',
      align: 'center',
      width: 100,
    }, {
      title: `${sldComLanguage('操作时间')}`,
      dataIndex: 'logTime',
      align: 'center',
      width: 150,
    }, {
      title: `${sldComLanguage('操作内容')}`,
      dataIndex: 'logContent',
      align: 'center',
      width: 200,
    },
  ];//订单操作日志表头

  invoice_info_other = [{ //收票信息
    type: 'show_text',
    label: `${sldComLanguage('是否需要开票')}`,
    name: 'invoiceStatus',
    extra: ``,
    item_height: 42,
    text: `${sldComLanguage('否')}`,
  }];//不需要发票的情况

  invoice_info_personal = [{
    type: 'show_text',
    label: `${sldComLanguage('发票抬头')}`,
    name: 'invoiceTitle',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('收票邮箱')}`,
    name: 'receiverEmail',
    extra: ``,
    item_height: 42,
    text: ``,
  }];//个人发票

  invoice_info_VAT = [{
    type: 'show_text',
    label: `${sldComLanguage('单位名称')}`,
    name: 'invoiceTitle',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('税号')}`,
    name: 'taxCode',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('注册地址')}`,
    name: 'registerAddr',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('注册电话')}`,
    name: 'registerPhone',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('开户银行')}`,
    name: 'bankName',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('银行账户')}`,
    name: 'bankAccount',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('收票人')}`,
    name: 'receiverName',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('收票电话')}`,
    name: 'receiverMobile',
    extra: ``,
    item_height: 42,
    text: ``,
  }, {
    type: 'show_text',
    label: `${sldComLanguage('收票地址')}`,
    name: 'receiverAddress',
    extra: ``,
    item_height: 42,
    text: ``,
  }];//公司发票——增值税发票

  get_flow_loading = false;

  componentDidMount() {
    const { query } = this.state;
    this.get_order_detail({ orderSn: query.orderSn });
    this.get_reason_list();
  }

  //进入售后详情
  goServiceDetail = (val) => {
    router.push(`/order/service_refund_lists_to_detail?afsSn=${val}`);
  };

  get_order_detail = (params) => {
    const { dispatch } = this.props;
    let { order_detail, return_progress_data, invoice_info, receiver_info, order_info, goodsInfoList, orderLogList, reserve_info } = this.state;
    dispatch({
      type: 'order/get_order_detail',
      payload: params,
      callback: res => {
        if (res.state == 200) {
          order_detail = res.data;
          orderLogList = res.data.orderLogs;
          //收票信息
          if (order_detail.invoiceStatus == 1) {
            let invoice_type = '';
            if (order_detail.invoiceInfo.titleType == 1) {
              //个人发票
              invoice_info = JSON.parse(JSON.stringify(this.invoice_info_personal));
              invoice_type = `${sldComLanguage('个人发票')}`;
            } else {
              //公司发票
              if (order_detail.invoiceInfo.invoiceType != 1) {
                //增值税发票
                invoice_info = JSON.parse(JSON.stringify(this.invoice_info_VAT));
                invoice_type = `${sldComLanguage('增值税专用发票')}`;
              } else {
                invoice_type = `${sldComLanguage('普通发票')}`;
              }
            }

            //需要发票
            for (let item in invoice_info) {
              invoice_info[item].text = !order_detail['invoiceInfo'][invoice_info[item].name] ? '--' : order_detail['invoiceInfo'][invoice_info[item].name];
            }
            let invoice_content = order_detail.invoiceInfo.invoiceContent == 1 ? `${sldComLanguage('商品明细')}` : `${sldComLanguage('商品类别')}`;
            //需要添加发票类型和发票内容
            invoice_info = [{
              type: 'show_text',
              label: `${sldComLanguage('发票类型')}`,
              name: 'invoiceTypeCombine',
              extra: ``,
              item_height: 42,
              text: invoice_type,
            }, {
              type: 'show_text',
              label: `${sldComLanguage('发票内容')}`,
              name: 'invoiceContent',
              extra: ``,
              item_height: 42,
              text: invoice_content,
            }, ...invoice_info];

          } else {
            //不需要发票
            invoice_info = JSON.parse(JSON.stringify(this.invoice_info_other));
          }

          //收货人信息
          receiver_info.map(item=>{
            if (item.name == 'receiverAreaInfo') {
              item.text = order_detail.receiverAreaInfo + ' ' + order_detail.receiverAddress;
            } else {
              item.text = !order_detail[item.name] ? '--' : order_detail[item.name];
            }
          })

          //订单信息
          for (let item in order_info) {
            if (order_info[item].name == 'orderTypeValue') {
              order_info[item].text = order_detail[order_info[item].name]
                ? (`${order_detail[order_info[item].name]}${sldComLanguage('订单')}${order_detail.isVirtualGoods == 2 ? ('、' + sldComLanguage('虚拟订单')) : ''}`)
                : (order_detail.isVirtualGoods == 2 ? `${sldComLanguage('虚拟订单')}` : `${sldComLanguage('普通订单')}`);
            } else if (order_info[item].name == 'star') {
              order_info[item].text = order_detail[order_info[item].name] ? order_detail[order_info[item].name] : 0;
            } else {
              order_info[item].text = order_detail[order_info[item].name] ? order_detail[order_info[item].name] : '--';
            }
          }
          //用户预留信息
          if (order_detail.isVirtualGoods == 2 && order_detail.orderReserveList.length != undefined && order_detail.orderReserveList.length) {
            reserve_info=[];
            order_detail.orderReserveList.map(item => {
              reserve_info.push({
                type: 'show_text',
                label: item.reserveName,
                name: item.reserveId,
                extra: ``,
                item_height: 42,
                text: item.reserveValue,
              });
            });
          }

          return_progress_data = [];
          if (order_detail.orderState == 0) { // 订单取消
            return_progress_data.push({
              icon: require('@/assets/order/submit_pass.png'),
              state: `${sldComLanguage('提交订单')}`,
              time: (orderLogList.length > 0 && orderLogList[0].logTime != undefined) ? orderLogList[0].logTime : '',
              state_color: 'rgba(255, 113, 30, .6)',
              time_color: 'rgba(255, 113, 30, .3)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/fail_current.png'),
              state: `${sldComLanguage('订单取消')}`,
              time: (orderLogList.length > 0 && orderLogList[1].logTime != undefined) ? orderLogList[1].logTime : '',
              state_color: 'rgba(255, 113, 30,1)',
              time_color: 'rgba(255, 113, 30, .5)',
              line_color: 'rgba(255, 113, 30,1)',
            });
          } else if (order_detail.orderState == 10) { //未付款订单
            return_progress_data.push({
              icon: require('@/assets/order/submit_current.png'),
              state: `${sldComLanguage('提交订单')}`,
              time: (orderLogList.length > 0 && orderLogList[0].logTime != undefined) ? orderLogList[0].logTime : '',
              state_color: 'rgba(255, 113, 30,1)',
              time_color: 'rgba(51, 51, 51, 1)',
              line_color: 'rgba(255, 113, 30,1)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/pay_future.png'),
              state: `${sldComLanguage('付款成功')}`,
              time: '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: '#eee',
            });
            return_progress_data.push({
              icon: require('@/assets/order/deliver_future.png'),
              state: `${sldComLanguage('商品发货')}`,
              time: '',
              state_color: '#999999',
              time_color: 'rgba(255, 113, 30, .5)',
              line_color: '#eee',
            });
            return_progress_data.push({
              icon: require('@/assets/order/suc_future.png'),
              state: `${sldComLanguage('订单完成')}`,
              time: '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: '#eee',
            });
          } else if (order_detail.orderState == 20) {
            return_progress_data.push({
              icon: require('@/assets/order/submit_pass.png'),
              state: `${sldComLanguage('提交订单')}`,
              time: (orderLogList.length > 0 && orderLogList[0].logTime != undefined) ? orderLogList[0].logTime : '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/pay_current.png'),
              state: `${sldComLanguage('付款成功')}`,
              time: (orderLogList.length > 0 && orderLogList[1].logTime != undefined) ? orderLogList[1].logTime : '',
              state_color: 'rgba(51, 51, 51, 1)',
              time_color: 'rgba(51, 51, 51, 1)',
              line_color: 'rgba(255, 113, 30,1)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/deliver_future.png'),
              state: `${sldComLanguage('商品发货')}`,
              time: '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: '#eee',
            });
            return_progress_data.push({
              icon: require('@/assets/order/suc_future.png'),
              state: `${sldComLanguage('订单完成')}`,
              time: '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: '#eee',
            });
          } else if (order_detail.orderState == 30) {
            return_progress_data.push({
              icon: require('@/assets/order/submit_pass.png'),
              state: `${sldComLanguage('提交订单')}`,
              time: (orderLogList.length > 0 && orderLogList[0].logTime != undefined) ? orderLogList[0].logTime : '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/pay_pass.png'),
              state: `${sldComLanguage('付款成功')}`,
              time: (orderLogList.length > 0 && orderLogList[1].logTime != undefined) ? orderLogList[1].logTime : '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/deliver_current.png'),
              state: `${sldComLanguage('商品发货')}`,
              time: (orderLogList.length > 0 && orderLogList[2].logTime != undefined) ? orderLogList[2].logTime : '',
              state_color: 'rgba(51, 51, 51, 1)',
              time_color: 'rgba(51, 51, 51, 1)',
              line_color: 'rgba(255, 113, 30,1)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/suc_future.png'),
              state: `${sldComLanguage('订单完成')}`,
              time: '',
              state_color: 'rgba(51, 51, 51, .5)',
              time_color: 'rgba(51, 51, 51, .5)',
              line_color: '#eee',
            });
          } else if (order_detail.orderState == 40) {
            return_progress_data.push({
              icon: require('@/assets/order/submit_pass.png'),
              state: `${sldComLanguage('提交订单')}`,
              time: (orderLogList.length > 0 && orderLogList[0].logTime != undefined) ? orderLogList[0].logTime : '',
              state_color: 'rgba(255, 113, 30, .6)',
              time_color: 'rgba(255, 113, 30, .3)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/pay_pass.png'),
              state: `${sldComLanguage('付款成功')}`,
              time: (orderLogList.length > 0 && orderLogList[1].logTime != undefined) ? orderLogList[1].logTime : '',
              state_color: 'rgba(255, 113, 30, .6)',
              time_color: 'rgba(255, 113, 30, .3)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/deliver_pass.png'),
              state: `${sldComLanguage('商品发货')}`,
              time: (orderLogList.length > 0 && orderLogList[2].logTime != undefined) ? orderLogList[2].logTime : '',
              state_color: 'rgba(255, 113, 30, .6)',
              time_color: 'rgba(255, 113, 30, .3)',
              line_color: 'rgba(255, 113, 30, .3)',
            });
            return_progress_data.push({
              icon: require('@/assets/order/suc_current.png'),
              state: `${sldComLanguage('订单完成')}`,
              time: (orderLogList.length > 0 && orderLogList[3].logTime != undefined) ? orderLogList[3].logTime : '',
              state_color: 'rgba(51, 51, 51, 1)',
              time_color: 'rgba(51, 51, 51, 1)',
              line_color: 'rgba(255, 113, 30,1)',
            });
          }


          this.setState({
            order_detail: res.data,
            invoice_info,
            receiver_info,
            order_info,
            reserve_info,
            return_progress_data,
            goodsInfoList: order_detail.orderProductList,
          });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  get_reason_list = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/get_order_reason',
      payload: {
        type: 108,
        pageSize: list_com_page_more,
      },
      callback: res => {
        if (res.state == 200) {
          this.setState({
            resList: res.data,
          });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  agreeReturn = (type) => {
    const { dispatch } = this.props;
    let { resList, modalVisible, operateData, deliverModal, query, show_foot, order_detail, showTopTip } = this.state;
    let titlename = '';
    let cancleBool = false, deliverBool = false;
    operateData = [];
    showTopTip = ``;
    if (type == 'cancleOrder') {
      showTopTip = `${sldComLanguage('取消订单后，订单将自动关闭')}`;
      operateData.push({
        type: 'select',
        label: `${sldComLanguage('取消理由')}`,
        name: 'reasonId',
        placeholder: `${sldComLanguage('请选择取消理由')}`,
        sel_data: resList,
        sele_key: 'reasonId',
        sele_name: 'content',
        diy: true,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择取消理由')}`,
        }],
      });
      operateData.push({
        type: 'textarea',
        label: `${sldComLanguage('取消备注')}`,
        name: 'remark',
        placeholder: `${sldComLanguage('请输入取消备注，最多50个字')}`,
        initialValue: '',
        maxLength: 50,
      });
      titlename = `${sldComLanguage('取消订单')}`;
      cancleBool = true;
      show_foot = true;
    } else if (type == 'deliver') {
      dispatch({
        type: 'order/get_express',
        payload: { pageSize: list_com_page_more, expressState: 1 },
        callback: res => {
          if (res.state == 200) {
            deliverBool = true;
            this.setState({
              expressList: res.data.list,
              deliverModal: deliverBool && !deliverModal,
              propType: type,
              deliverType: '0',
              show_foot: true,
              exterFaceSheet: order_detail.expressNumber ? order_detail.expressNumber : '',
              isAllowApplyExpressNum: order_detail.expressNumber ? false : true,//是否允许通过电子面单申请物流单号
              showPrintExterFaceSheetBtn: order_detail.expressNumber ? true : false,//已经有物流单号的话直接显示
            }, () => {
              this.props.form.resetFields(['expressNumber']);
            });
          } else {
            failTip(res.msg);
          }
        },
      });
    } else if (type == 'flow') {
      if (this.get_flow_loading) return false;//防止查看物流框多次出现
      if (order_detail.deliverType == 1) {
        //无需物流
        info({
          width: 470,
          title: '该订单是自行配送，您可以联系配送人了解具体进度',
          content: <div>
            <p>配送人姓名：{order_detail.deliverName}</p>
            <p>配送人手机号：{order_detail.deliverMobile}</p>
          </div>,
        });
      } else {
        this.get_flow_loading = true;
        dispatch({
          type: 'order/get_flow',
          payload: { orderSn: query.orderSn },
          callback: res => {
            if (res.state == 200) {
              operateData.push({
                type: 'show_express',
                content: res.data,
              });
              cancleBool = true;
              titlename = `${sldComLanguage('物流信息')}`;
              this.setState({
                operateData: operateData,
                modalVisible: cancleBool && !modalVisible,
                titleName: titlename,
                propType: type,
                show_foot: false,
              });
            } else {
              failTip(res.msg);
            }
            this.get_flow_loading = false;
          },
        });
      }
    }

    this.setState({
      operateData: operateData,
      modalVisible: cancleBool && !modalVisible,
      titleName: titlename,
      propType: type,
      show_foot,
      showTopTip,
    });

  };

  //弹框确定操作
  sldHandleConfirm = (val) => {
    const { propType, query, modalVisible } = this.state;
    const { dispatch } = this.props;
    if (propType == 'cancleOrder') {
      val.orderSn = query.orderSn;
      dispatch({
        type: 'order/cancle_order',
        payload: val,
        callback: res => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.setState({
              modalVisible: !modalVisible,
              return_progress_data: [],
            });
            this.get_order_detail({ orderSn: query.orderSn });
          } else {
            failTip(res.msg);
          }
        },
      });
    }
  };

  //弹框取消操作
  sldHandleCancle = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
      operateData: [],
    });
  };

  sldDeliverHandleCancle = () => {
    this.setState({
      deliverModal: false,
      deliverType: '',
    });
    this.props.form.resetFields();
  };

  //虚拟订单发货
  virturalGoodsOrderDeliverConfirm = () => {
    const { dispatch } = this.props;
    const { query, order_detail } = this.state;
    dispatch({
      type: 'order/confirm_delivery',
      payload: { orderSn: order_detail.orderSn },
      callback: res => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_order_detail({ orderSn: query.orderSn });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  deliverConfirm = (e) => {
    e.preventDefault();
    let deliverType = this.props.form.getFieldValue('deliverType');
    let validateFields = [];
    if (deliverType == 1) {
      //无需物流
      validateFields = ['deliverName', 'deliverMobile', 'deliverType'];
    } else {
      //物流发货
      validateFields = ['expressId', 'expressNumber', 'deliverType'];
    }
    this.props.form.validateFieldsAndScroll(validateFields, (err, values) => {
      if (!err) {
        const { query } = this.state;
        const { dispatch } = this.props;
        values.orderSn = query.orderSn;
        dispatch({
          type: 'order/confirm_delivery',
          payload: values,
          callback: res => {
            if (res.state == 200) {
              sucTip(res.msg);
              this.setState({
                deliverModal: false,
                return_progress_data: [],
                deliverType: '',
              });
              this.get_order_detail({ orderSn: query.orderSn });
              this.props.form.resetFields();
            } else {
              failTip(res.msg);
            }
          },
        });
      }
    });
  };

  //选择发货方式
  redioOnChange = (e) => {
    this.setState({
      deliverType: e.target.value,
    });
  };

  sldHandleSecondCancle = () => {
    this.setState({
      secondModalVisible: false,
      priceModalVisible: false,
    });
  };

  //弹框确定操作
  sldHandleSecondConfirm = (val) => {
    const { order_detail } = this.state;
    val.orderSn = order_detail.orderSn;
    this.operate(val, 'remark');
  };

  //修改价格确认操作
  sldHandleConfirmPrice = (e) => {
    const { order_detail, changeVal } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['moneyAmount', 'expressFee'], (err, values) => {
      if (!err) {
        values.orderSn = order_detail.orderSn;
        values.expressFee = changeVal;
        this.operate(values, 'price');
      }
    });
  };

  //操作  remark:添加订单备注 star:设置订单星级
  operate = (id, type) => {
    this.setState({ secondSubmiting: true, priceSubmiting: true });
    const { query } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'remark') {
      dis_type = 'order/add_order_remark';
      param_data = id;
    } else if (type == 'star') {
      dis_type = 'order/add_order_star';
      param_data = id;
    } else if (type == 'price') {
      dis_type = 'order/change_order_price';
      param_data = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.setState({
            secondModalVisible: false,
            priceModalVisible: false,
          });
          this.get_order_detail({ orderSn: query.orderSn });
        } else {
          failTip(res.msg);
        }
        this.setState({ secondSubmiting: false, priceSubmiting: false });
      },
    });
  };

  //修改价格
  changeOrderPrice = () => {
    const { order_detail } = this.state;
    this.setState({
      priceModalVisible: true,
      changeVal: order_detail.expressFee,
    });
  };

  //修改运费的值
  handleChangeVal = (e) => {
    this.setState({ changeVal: e ? e : 0 });
  };

  //免运费事件
  freeExpress = () => {
    this.setState({ changeVal: 0 });
  };

  //备注事件
  addOrderRemark = () => {
    let { orderRemarkData, secondOperateData, order_detail } = this.state;
    secondOperateData = JSON.parse(JSON.stringify(orderRemarkData));
    if (order_detail.storeRemark) {
      secondOperateData[0].initialValue = order_detail.storeRemark;
    }
    this.setState({
      secondTitle: '商家订单备注',
      secondOperateData,
      secondModalVisible: true,
    });
  };

  //加星事件
  addStar = (e) => {
    const { order_detail } = this.state;
    if (e * 1 != (order_detail.star ? order_detail.star * 1 : 0)) {
      this.operate({ orderSn: order_detail.orderSn, star: e }, 'star');
    }
  };

  //电子面单获取物流单号
  getExterFaceSheetBtn = () => {
    this.props.form.validateFieldsAndScroll(['expressId'], (err, values) => {
      if (!err) {
        let { order_detail, showPrintExterFaceSheetBtn, exterFaceSheet, query } = this.state;
        const { dispatch } = this.props;
        values.orderSn = order_detail.orderSn;
        dispatch({
          type: 'order/get_exter_face_sheet',
          payload: values,
          callback: res => {
            if (res.state == 200) {
              this.props.form.resetFields(['expressNumber']);
              this.get_order_detail({ orderSn: query.orderSn });
              showPrintExterFaceSheetBtn = true;
              exterFaceSheet = res.data.logisticCode;
            } else {
              failTip(res.msg);
            }
            this.setState({ showPrintExterFaceSheetBtn, exterFaceSheet }, () => {
              this.props.form.resetFields(['expressNumber']);
            });
          },
        });
      }
    });
  };

  //打印电子面单
  printExterFaceSheetBtn = () => {
    let { order_detail } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'order/print_exter_face_sheet',
      payload: { orderSns: order_detail.orderSn },
      callback: res => {
        if (res.state == 200) {
          if(res.data){
            window.open(res.data, '_blank');
          }
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //选择物流公司
  handleSelExpress = (val) => {
    let { order_detail, exterFaceSheet, showPrintExterFaceSheetBtn } = this.state;
    if (val != order_detail.expressId) {
      exterFaceSheet = '';
      showPrintExterFaceSheetBtn = false;
    } else {
      exterFaceSheet = order_detail.expressNumber;
      showPrintExterFaceSheetBtn = true;
    }
    this.setState({ exterFaceSheet, showPrintExterFaceSheetBtn }, () => {
      this.props.form.resetFields(['expressNumber']);
    });
  };

  //物流单号输入事件
  handleInputExpressNum = (e) => {
    this.setState({ exterFaceSheet: e.target.value }, () => {
      this.props.form.resetFields(['expressNumber']);
    });
  };

  render() {
    const {
      order_detail, invoice_info, receiver_info, order_info, return_progress_data, deliverType, titleName, submiting, show_foot, modal_width, showTopTip, modalVisible, operateData, deliverModal, expressList, priceModalVisible, changeVal, priceSubmiting, secondTitle, secondSubmiting, secondModalVisible, secondOperateData, exterFaceSheet, showPrintExterFaceSheetBtn, isAllowApplyExpressNum, reserve_info,
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={global.common_page}
           style={{ flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
        <div className={global.flex_com_space_between} style={{ margin: 10, marginTop: 0 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('订单详情')}`)}
          {sldIconBtnBg(() => {this.props.history.goBack()}, 'fanhui', `${sldComLanguage('返回上级页面')}`, '#fff', 7, 0, 15, 15, 5)}
        </div>
        {getSldHorLine(1)}
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 108}
        >
          <div className={`${global.flex_row_center_start} ${order.progress}`}>
            {return_progress_data.map((item, index) => {
              return <div key={index} className={`${global.flex_column_start_center} ${order.item}`}>
                <div className={`${order.top} ${global.flex_row_center_center}`}>
                  <span className={`${order.left_line}`} style={{ borderColor: item.line_color }}/><img
                  src={item.icon}/><span className={`${order.right_line}`} style={{ borderColor: item.line_color }}/>
                </div>
                <span className={`${order.state}`} style={{ color: item.state_color }}>{item.state}</span>
                <span className={`${order.time}`} style={{ color: item.time_color }}>{item.time}</span>
              </div>;
            })}
          </div>

          {
            order_detail.orderState == 0 && <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('订单已取消')}`}</span>
              <span
                className={order.tip}>{sldComLanguage('取消原因')}:{order_detail.refuseReason + (order_detail.refuseRemark ? (',' + order_detail.refuseRemark) : '')}</span>
            </div>
          }

          {
            order_detail.orderState == 10 && <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{order_detail.orderStateValue}</span>
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('cancleOrder')}
                     className={order.cancle_btn}>{sldComLanguage('取消订单')}</div>
                {order_detail.orderType == 1 && <div onClick={() => this.changeOrderPrice()}
                     className={order.deliver_btn}>{sldComLanguage('修改价格')}</div>}
              </div>
            </div>
          }

          {
            (order_detail.orderState == 20 && order_detail.lockState == 0) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{order_detail.orderStateValue}</span>
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('cancleOrder')}
                     className={order.cancle_btn}>{sldComLanguage('取消订单')}</div>
                {(order_detail.isShowDeliverButton == undefined || (order_detail.isShowDeliverButton != undefined && order_detail.isShowDeliverButton)) && (
                  order_detail.isVirtualGoods == 2
                    ? <Popconfirm
                      placement={'topRight'}
                      title={`${sldComLanguage('该订单为虚拟商品订单，确认执行该操作吗')}?`}
                      onConfirm={() => this.virturalGoodsOrderDeliverConfirm()}
                      okText={sldComLanguage('确定')}
                      cancelText={sldComLanguage('取消')}>
                      <div className={order.deliver_btn}>
                        <a style={{ color: '#fff' }}
                           href="javascript:void(0)">{sldComLanguage('发货')}
                        </a>
                      </div>
                    </Popconfirm>
                    : <div onClick={() => this.agreeReturn('deliver')}
                           className={order.deliver_btn}>{sldComLanguage('发货')}
                    </div>
                )
                }
              </div>
            </div>
          }

          {
            (order_detail.orderState == 20 && order_detail.lockState > 0) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{order_detail.orderStateValue}</span>
              <div className={order.btnsty}>
                <div className={order.lock_agree_btn}>{sldComLanguage('取消订单')}</div>
                <div className={order.lock_refuse_btn}>{sldComLanguage('发货')}</div>
              </div>
            </div>
          }

          {
            order_detail.orderState == 30 && <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('商品已发出,等待买家收货')}`}</span>
              {order_detail.isVirtualGoods == 1 &&
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('flow')}
                     className={order.cancle_btn}>{sldComLanguage('查看物流')}</div>
              </div>
              }
            </div>
          }

          {
            order_detail.orderState == 40 && <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('买家已确认收货,订单完成')}`}</span>
              {order_detail.isVirtualGoods == 1 &&
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('flow')}
                     className={order.cancle_btn}>{sldComLanguage('查看物流')}</div>
              </div>
              }
            </div>
          }

          {
            order_detail.orderState == 50 && <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{order_detail.orderStateValue}</span>
            </div>
          }

          {sldCommonTitle(`${sldComLanguage('订单信息')}`, '#333', 5, 15, 15)}
          <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                          data={order_info}/>
          {order_detail.isVirtualGoods == 1 &&
          <Fragment>
            {sldCommonTitle(`${sldComLanguage('收货人信息')}`, '#333', 5, 15, 15)}
            <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                            data={receiver_info}/>
          </Fragment>
          }
          {order_detail.isVirtualGoods == 2 && order_detail.orderReserveList.length > 0 &&
          <Fragment>
            {sldCommonTitle(`${sldComLanguage('用户预留信息')}`, '#333', 5, 15, 15)}
            <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                            data={reserve_info}/>
          </Fragment>
          }
          {sldCommonTitle(`${sldComLanguage('发票信息')}`, '#333', 5, 15, 15)}
          <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                          data={invoice_info}/>
          {order_detail.orderOperateList != undefined && order_detail.orderOperateList.length != undefined && order_detail.orderOperateList.length > 0 &&
          <Fragment>
            {sldCommonTitle(`${sldComLanguage('更多操作日志')}`, '#333', 5, 15, 15)}
            <StandardTable
              totalHeight={99999999}
              selectedRows={[]}
              data={{ list: order_detail.orderOperateList, pagination: {} }}
              size={'small'}
              rowKey={'logId'}
              isCheck={false}
              columns={this.columns_order_log}
              sldpagination={false}
            />
          </Fragment>
          }
          {sldCommonTitle(`${sldComLanguage('商品信息')}`, '#333', 5, 15, 15)}
          <StandardTable
            totalHeight={600}
            selectedRows={[]}
            data={{ list: order_detail.orderProductList, pagination: {} }}
            size={'small'}
            rowKey={'orderProductId'}
            isCheck={false}
            columns={this.columns_order_goods}
            sldpagination={false}
          />
          <div className={`${global.flex_row_end_center} ${order.order_detail_total}`}>
            <span className={order.amount_detail}>
            {sldComLanguage('商品总金额')}({sldComLanguage('¥')}{order_detail.goodsAmount}) + {sldComLanguage('运费')}({sldComLanguage('¥')}{order_detail.expressFee})
              {order_detail.promotionInfo != undefined && order_detail.promotionInfo.length > 0 && order_detail.promotionInfo.map(item => {
                return ` - ${item.promotionName}(${sldComLanguage('¥')}${item.discount})`;
              })}
            </span>
            <span
              className={order.amount_total}> = {sldComLanguage('订单金额')}({sldComLanguage('¥')}{order_detail.orderAmount})</span>
          </div>
          {getSldEmptyH(40)}
        </Scrollbars>
        {/*取消订单-start*/}
        <SldModal
          title={titleName}
          submiting={submiting}
          show_foot={show_foot}
          width={modal_width}
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={operateData}
          showTopTip={showTopTip}
        />
        {/*取消订单-end*/}
        {/* 发货弹框-start */}
        <Modal
          centered
          title={sldComLanguage('商品发货')}
          width={modal_width}
          visible={deliverModal}
          onCancel={() => this.sldDeliverHandleCancle()}
          onOk={this.deliverConfirm}
        >
          {deliverType == 0
            ? <Fragment>
              <div className={`${global.flex_row_start_center} ${global.sld_modal_top_tip}`}>
                <div style={{ lineHeight: 0 }}>
                  {sldSvgIcon('#333', 15, 15, 'tishi3')}
                </div>
                <span style={{ fontSize: 13, marginLeft: 6 }}>{sldComLanguage('请认真填写物流公司及快递单号')}</span>
              </div>
              {getSldEmptyH(40)}
            </Fragment>
            : getSldEmptyH(15)
          }
          <Form layout="horizontal">
            <FormItem
              label={sldComLanguage('收货人姓名')}
              {...formItemLayoutModal}
            >
              <span>{order_detail.receiverName}</span>
            </FormItem>
            <FormItem
              label={sldComLanguage('收货人电话')}
              {...formItemLayoutModal}
            >
              <span>{order_detail.receiverMobile}</span>
            </FormItem>
            <FormItem></FormItem>
            <FormItem
              label={sldComLanguage('收货人地址')}
              {...formItemLayoutModal}
            >
              <span
                style={{ wordBreak: 'break-all' }}>{order_detail.receiverAreaInfo + ' ' + order_detail.receiverAddress}</span>
            </FormItem>
            <FormItem
              label={sldComLanguage('发货方式')}
              {...formItemLayoutModal}
            >
              {getFieldDecorator('deliverType', {
                initialValue: 0,
                rules: [{ required: true, message: `${sldComLanguage('请选择发货方式')}` }],
              })(
                <RadioGroup onChange={(e) => this.redioOnChange(e)}>
                  <Radio value={0}>{sldComLanguage('物流发货')}</Radio>
                  <Radio value={1}>{sldComLanguage('无需物流')}</Radio>
                </RadioGroup>,
              )}
            </FormItem>
            {
              this.state.deliverType == '0' ? <Fragment>
                <FormItem
                  label={sldComLanguage('物流公司')}
                  {...formItemLayoutModal}
                >
                  {getFieldDecorator('expressId', {
                    initialValue: order_detail.expressId ? order_detail.expressId : undefined,
                    rules: [{
                      required: true,
                      message: `${sldComLanguage('请选择物流公司')}`,
                    }],
                  })(
                    <Select placeholder={sldComLanguage('请选择物流公司')} onChange={(e) => this.handleSelExpress(e)}>
                      {
                        expressList.length > 0 && expressList.map(item => <Option
                          value={item.expressId}>{item.expressName}</Option>)
                      }
                    </Select>,
                  )}
                </FormItem>
                <FormItem
                  label={sldComLanguage('快递单号')}
                  {...formItemLayoutModal}
                  extra={sldComLanguage('可以直接输入物流单号，也可以点击获取物流单号通过电子面单自动获取物流单号')}
                >
                  {getFieldDecorator('expressNumber', {
                    initialValue: exterFaceSheet,
                    rules: [{ required: true, whitespace: true, message: `${sldComLanguage('请输入物流单号')}` }, {
                      pattern: /^[0-9a-zA-Z]*$/g,
                      message: `${sldComLanguage('请输入正确的单号')}`,
                    }],
                  })(
                    <div className={`${global.flex_row_start_center}`} style={{ position: 'relative' }}>
                      <Input onChange={(e) => this.handleInputExpressNum(e)} maxLength={20}
                             placeholder={sldComLanguage('请输入物流单号')} value={exterFaceSheet}/>
                      {showPrintExterFaceSheetBtn
                        ? <a className={`${order.free_freight} ${order.get_exter_face_sheet_btn}`}
                             onClick={() => this.printExterFaceSheetBtn()}>打印电子面单</a>
                        : (isAllowApplyExpressNum ?
                          <a className={`${order.free_freight} ${order.get_exter_face_sheet_btn}`}
                             onClick={() => this.getExterFaceSheetBtn()}>获取物流单号</a> : null)
                      }
                    </div>,
                  )}
                </FormItem>
              </Fragment> : null
            }
            {
              this.state.deliverType == '1' ? <Fragment>
                <FormItem
                  label={sldComLanguage('联系人')}
                  {...formItemLayoutModal}
                >
                  {getFieldDecorator('deliverName', {
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: `${sldComLanguage('请输入联系人')}`,
                    }],
                  })(
                    <Input maxLength={10} placeholder={sldComLanguage('请输入联系人')}/>,
                  )}
                </FormItem>
                <FormItem
                  label={sldComLanguage('联系方式')}
                  {...formItemLayoutModal}
                >
                  {getFieldDecorator('deliverMobile', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: `${sldComLanguage('请输入联系方式')}`,
                      }, {
                        pattern: mobile_reg,
                        message: `${sldComLanguage('请输入正确的手机号')}`,
                      },
                    ],
                  })(
                    <Input maxLength={11} placeholder={sldComLanguage('请输入联系方式')}/>,
                  )}
                </FormItem>
              </Fragment> : null
            }
          </Form>
        </Modal>
        {/* 发货弹框-end */}
        {/*新增/编辑对话框-start*/}
        <SldModal
          title={secondTitle}
          submiting={secondSubmiting}
          width={500}
          modalVisible={secondModalVisible}
          sldHandleConfirm={(val) => this.sldHandleSecondConfirm(val)}
          sldHandleCancle={this.sldHandleSecondCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={secondOperateData}
        />
        {/*新增/编辑对话框-end*/}
        {/*订单改价对话框-start*/}
        <Modal
          centered
          title={sldComLanguage('修改价格')}
          width={400}
          visible={priceModalVisible}
          onCancel={(e) => this.sldHandleSecondCancle(e)}
          onOk={(e) => this.sldHandleConfirmPrice(e)}
          footer={[
            <Button key="back" onClick={(e) => this.sldHandleSecondCancle(e)}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={priceSubmiting} onClick={(e) => this.sldHandleConfirmPrice(e)}>
              {sldComLanguage('确定')}
            </Button>,
          ]}
        >
          <div className={`${global.flex_row_start_center}`} style={{
            width: 400,
            padding: '6px 15px',
            marginBottom: 8,
            backgroundColor: '#FFF9E2',
            position: 'absolute',
            top: 42,
            left: 0,
          }}>
            <div style={{ lineHeight: 0 }}>
              {sldSvgIcon('#333', 15, 15, 'tishi3')}
            </div>
            <span style={{ fontSize: 13, marginLeft: 6 }}>{sldComLanguage('只有订单未付款时才支持改价')}</span>
          </div>
          {getSldEmptyH(40)}
          <Form layout="horizontal">
            <FormItem
              label={sldComLanguage('订单价格(¥)')}
              {...formItemLayoutModal}
              extra={sldComLanguage('不含运费')}
              style={{ width: 350, marginLeft: 60 }}
            >
              {getFieldDecorator('moneyAmount', {
                initialValue: order_detail.moneyAmount,
                rules: [
                  {
                    required: true,
                    message: `${sldComLanguage('订单价格不可为空')}`,
                  },
                ],
              })(
                <InputNumber style={{ width: 120 }} min={0.01} max={9999999.99} precision={2} step={1}
                             placeholder={''}/>,
              )}
            </FormItem>

            <FormItem
              label={sldComLanguage('运费(¥)')}
              {...formItemLayoutModal}
              style={{ width: 330, marginLeft: 65 }}
            >
              {getFieldDecorator('expressFee', {
                initialValue: changeVal,
                rules: [
                  {
                    required: true,
                    message: `${sldComLanguage('运费不可为空')}`,
                  },
                ],
              })(
                <div className={`${global.flex_row_start_center}`}>
                  <InputNumber value={changeVal} onChange={(e) => this.handleChangeVal(e)} style={{ width: 120 }}
                               min={0} max={9999999.99} precision={2} step={1} placeholder={''}/>
                  <a className={`${order.free_freight}`} onClick={() => this.freeExpress()}>免运费</a>
                </div>,
              )}
            </FormItem>

          </Form>
        </Modal>
        {/*订单改价对话框-end*/}
      </div>

    );
  }
}
