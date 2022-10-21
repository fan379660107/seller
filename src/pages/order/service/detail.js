//退款详情
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Modal, Table } from 'antd';
import { sldComLanguage } from '@/utils/utils';
import {
  sldCommonTitle,
  list_com_page_size_10,
  sldLlineRtextAddGoods,
  getSldHorLine,
  sldIconBtnBg,
  getSldListGoodsImg80,
  sucTip,
  failTip,
  formItemLayoutModal,
  list_com_page_more,
  getSldEmptyH,
} from '@/utils/utils';
import global from '@/global.less';
import SldTableRowTwo from '@/components/SldTableRowTwo';
import { Scrollbars } from 'react-custom-scrollbars';
import StandardTable from '@/components/StandardTable';
import router from 'umi/router';
import order from './order.less';
import SldModal from '@/components/SldModal/SldModal';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';

const { confirm } = Modal;
let pageSize = list_com_page_size_10;
let sthis = '';
@connect(({ service }) => ({
  service,
}))
@Form.create()
export default class AfterSalesDetail extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      show_preview_modal: false,//预览图片modal框是否展示
      preview_img: '',//预览图片
      preview_alt_con: '',//预览图片内容
      modal_width: 700,//modal框的宽度
      show_foot: true,//是否展示modal框的底部操作按钮
      title: '',//modal框title
      submiting: false,
      modalVisible: false,
      query: props.location.query,
      params: { pageSize: pageSize },//搜索条件
      order_return_img_data: [{
        type: 'show_goods_img_more',
        label: `${sldComLanguage('退款凭证')}`,
        name: 'imgMore',
        extra: ``,
        item_height: 140,
        data: [],
        preView: this.preView,
      }],//退款凭证信息数据
      order_return_data: [{
        type: 'show_text',
        label: `${sldComLanguage('订单号')}`,
        name: 'orderSn',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('退款编码')}`,
        name: 'afsSn',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('退款金额(元)')}`,
        name: 'returnMoneyAmount',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('退款原因')}`,
        name: 'applyReasonContent',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('退款类型')}`,
        name: 'returnTypeValue',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('会员')}`,
        name: 'memberName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text1',
        label: `${sldComLanguage('退款说明')}`,
        name: 'afsDescription',
        extra: ``,
        item_height: 42,
        text: ``,
      }],//订单信息
      goods_detail_data: {},//商品详情数据
      operateData: [],//modal框数据
      return_progress_data: [],//退货进度数据
      goods_InfoColumon: [{
        title: '商品信息',
        dataIndex: 'goodsImage',
        align: 'left',
        render: (text, record) => {
          return <div className={`${order.goods_info1} ${global.com_flex_row_flex_start}`}>
            <div className={order.goods_img}>{getSldListGoodsImg80(text)}</div>
            <div className={`${global.com_flex_column_space_between} ${order.goods_detail}`}>
                            <span className={order.goods_name}>
                                {record.goodsName}
                            </span>
            </div>
          </div>;
        },
      }, {
        title: `${sldComLanguage('商品单价')}`,
        dataIndex: 'productCode',
        align: 'center',
      }, {
        title: `${sldComLanguage('退款数量')}`,
        dataIndex: 'returnNum',
        align: 'center',
      }, {
        title: `${sldComLanguage('退款金额(元)')}`,
        dataIndex: 'returnAmount',
        align: 'center',
      }], //商品信息
      addressList: [], //地址列表
      isagress: false,
      islocalModalVisible: false,
      selectedRowKeys: [],
      addressColu: [{
        title: `${sldComLanguage('请选择收货地址')}`,
        dataIndex: 'areaInfo',
        align: 'left',
        render: (text, record) => {
          return <div>
            <span>{text}</span><span>{record.address}</span>
          </div>;
        },
      }],
      reutrnType: 0,
      isflowVisible: false,
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
      title: `${sldComLanguage('商品单价(元)')}`,
      dataIndex: 'productShowPrice',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('退款数量')}`,
      dataIndex: 'returnNum',
      align: 'center',
      width: 100,
    }, {
      title: `${sldComLanguage('退款金额(元)')}`,
      dataIndex: 'returnMoneyAmount',
      align: 'center',
      width: 100,
    },
  ];//订单商品表头


  componentDidMount() {
    const { query } = this.state;
    this.get_address_list({ pageSize: list_com_page_more });
    this.get_return_detail(query.afsSn);
  }

  //预览图片
  preView = (flag, info) => {
    this.viewImg(flag, info);
  };

  //预览图片/关闭预览图片
  viewImg = (flag, img = '', text = '') => {
    this.setState({
      preview_img: img,
      preview_alt_con: text,
      show_preview_modal: flag,
    });
  };

  //获取买家退货地址
  get_address_list = (params) => {
    const { dispatch } = this.props;
    let { selectedRowKeys } = this.props;
    dispatch({
      type: 'service/get_return_address_lists',
      payload: { ...params, type: 2 },
      callback: res => {
        if (res.state == 200) {
          //设置默认选中的数据
          for (let i in res.data.list) {
            if (res.data.list[i].isDefault == 1) {
              selectedRowKeys = [res.data.list[i].addressId];
              break;
            }
          }
          this.setState({
            addressList: res.data.list,
            selectedRowKeys,
          });
        }
      },
    });
  };
  //获取退货详情
  get_return_detail = (id) => {
    const { dispatch } = this.props;
    let { order_return_data, goods_detail_data, return_progress_data, order_return_img_data } = this.state;
    dispatch({
      type: 'service/get_refund_detail',
      payload: { afsSn: id },
      callback: async (res) => {
        if (res.state == 200) {
          goods_detail_data = res.data;
          let logInfo = res.data.returnLogList;
          //订单信息
          for (let reagent in order_return_data) {
            order_return_data[reagent].text = goods_detail_data[order_return_data[reagent].name]?goods_detail_data[order_return_data[reagent].name]:'--';
          }

          order_return_img_data[0].data = [];//清空数据，防止操作完成之后数据追加
          if (res.data.applyImageList.length > 0) {
            res.data.applyImageList.map(item => {
              order_return_img_data[0].data.push({ imageUrl: item });
            });
          }

          return_progress_data = [];
          //退货状态数据处理
          if (goods_detail_data.returnType == 1) { //仅退款
            if (goods_detail_data.state == 100) {
              //买家申请仅退款
              return_progress_data.push({
                icon: require('@/assets/return/tui_current.png'),
                state: `${sldComLanguage('买家申请仅退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_pass.png'),
                state: `${sldComLanguage('商家处理仅退款申请')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_pass.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
            } else if (goods_detail_data.state == 200) {
              //退款完成
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请仅退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .3)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_current.png'),
                state: `${sldComLanguage('商家处理仅退款申请')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_pass.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: '#eee',
              });
            } else if (goods_detail_data.state == 300) {
              //退款完成
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请仅退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .3)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_future.png'),
                state: `${sldComLanguage('商家处理仅退款申请')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .3)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_current.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: (logInfo.length > 0 && logInfo[2].createTime != undefined) ? logInfo[2].createTime : '',
                state_color: 'rgba(255, 109, 31, 1)',
                time_color: 'rgba(255, 109, 31, 1)',
                line_color: '#FF711E',
              });
            } else if (goods_detail_data.state == 202) {
              //退款关闭
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请仅退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .3)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/refu_current.png'),
                state: `${sldComLanguage('退款关闭')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
            }
          } else { // 退货退款
            if (goods_detail_data.state == 101) {
              //买家申请退货退款
              return_progress_data.push({
                icon: require('@/assets/return/tui_current.png'),
                state: `${sldComLanguage('买家申请退货退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_pass.png'),
                state: `${sldComLanguage('商家同意退货退款申请')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/buyer_pass.png'),
                state: `${sldComLanguage('买家退货给商家')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/received_pass.png'),
                state: `${sldComLanguage('商家确认收货')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_pass.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
            } else if (goods_detail_data.state == 201) {
              //买家申请退货退款
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请退货退款')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_current.png'),
                state: `${sldComLanguage('商家处理退货退款申请')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
              return_progress_data.push({
                icon: require('@/assets/return/buyer_pass.png'),
                state: `${sldComLanguage('买家退货给商家')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/received_pass.png'),
                state: `${sldComLanguage('商家确认收货')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_pass.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
            } else if (goods_detail_data.state == 202) {
              //退款退货申请关闭
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请仅退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .3)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/refu_current.png'),
                state: `${sldComLanguage('退款退货申请关闭')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: 'rgba(255, 109, 31, 1)',
                time_color: 'rgba(255, 109, 31, 1)',
                line_color: '#FF711E',
              });
            } else if (goods_detail_data.state == 102) {
              //买家申请退货退款
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请退货退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_future.png'),
                state: `${sldComLanguage('商家处理退货退款申请')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/buyer_current.png'),
                state: `${sldComLanguage('买家退货给商家')}`,
                time: (logInfo.length > 0 && logInfo[2].createTime != undefined) ? logInfo[2].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
              return_progress_data.push({
                icon: require('@/assets/return/received_pass.png'),
                state: `${sldComLanguage('商家确认收货')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_pass.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
            } else if (goods_detail_data.state == 300) {
              //买家申请退货退款
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请退货退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_future.png'),
                state: `${sldComLanguage('商家处理退货退款申请')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/buyer_future.png'),
                state: `${sldComLanguage('买家退货给商家')}`,
                time: (logInfo.length > 0 && logInfo[2].createTime != undefined) ? logInfo[2].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/received_future.png'),
                state: `${sldComLanguage('商家确认收货')}`,
                time: (logInfo.length > 0 && logInfo[3] != undefined && logInfo[3].createTime != undefined) ? logInfo[3].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_current.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: (logInfo.length > 0 && logInfo[4] != undefined && logInfo[4].createTime != undefined) ? logInfo[4].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
            } else if (goods_detail_data.state == 203) {
              //待平台处理
              return_progress_data.push({
                icon: require('@/assets/return/tui_future.png'),
                state: `${sldComLanguage('买家申请退货退款')}`,
                time: (logInfo.length > 0 && logInfo[0].createTime != undefined) ? logInfo[0].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/shoper_future.png'),
                state: `${sldComLanguage('商家处理退货退款申请')}`,
                time: (logInfo.length > 0 && logInfo[1].createTime != undefined) ? logInfo[1].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/buyer_future.png'),
                state: `${sldComLanguage('买家退货给商家')}`,
                time: (logInfo.length > 0 && logInfo[2].createTime != undefined) ? logInfo[2].createTime : '',
                state_color: 'rgba(255, 109, 31, .6)',
                time_color: 'rgba(255, 109, 31, .5)',
                line_color: 'rgba(255, 109, 31, .3)',
              });
              return_progress_data.push({
                icon: require('@/assets/return/received_current.png'),
                state: `${sldComLanguage('商家确认收货')}`,
                time: (logInfo.length > 0 && logInfo[3] != undefined && logInfo[3].createTime != undefined) ? logInfo[3].createTime : '',
                state_color: '#FF711E',
                time_color: '#FF711E',
                line_color: '#FF711E',
              });
              return_progress_data.push({
                icon: require('@/assets/return/complete_pass.png'),
                state: `${sldComLanguage('退款完成')}`,
                time: '',
                state_color: '#999999',
                time_color: 'rgba(153, 153, 153, .5)',
                line_color: '#eee',
              });
            }
          }

          this.setState({
            loading: false,
            order_return_data,//订单信息
            goods_detail_data,
            return_progress_data,
            order_return_img_data,
          });
        }
      },
    });
  };

  //同意退货
  agreeReturn = (type, returntype) => {
    const { goods_detail_data, modalVisible, islocalModalVisible } = this.state;
    let operate = [];
    let agressNum = 0, isunlocal = false;
    if (type == 'agreegoods') {
      operate.push({
        type: 'show_content',
        label: `${sldComLanguage('退款方式')}`,
        content: goods_detail_data.returnTypeValue,
      });
      operate.push({
        type: 'show_content',
        label: `${sldComLanguage('退款金额(元)')}`,
        content: goods_detail_data.returnMoneyAmount + `${sldComLanguage('元')}`,
      });
      operate.push({
        type: 'onlytxt',
        label: '',
        content: '*' + goods_detail_data.returnMethod,
        fontSize: '12px',
        fontColor: 'rgba(255, 109, 31, 0.8)',
        right: 18,
        bgcColor: '#fff',
      });
      agressNum = 1;
      isunlocal = true;
    } else if (type == 'refusegoods') {
      operate.push({
        type: 'show_content',
        label: `${sldComLanguage('退款方式')}`,
        content: goods_detail_data.returnTypeValue,
      });
      operate.push({
        type: 'show_content',
        label: `${sldComLanguage('退款金额(元)')}`,
        content: goods_detail_data.returnMoneyAmount,
      });
      operate.push({
        type: 'textarea',
        label: `${sldComLanguage('拒绝理由')}`,
        name: 'remark',
        placeholder: `${sldComLanguage('请输入拒绝理由，最多20个字')}`,
        initialValue: '',
        maxLength: 20,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入拒绝理由')}`,
        }],
      });
      agressNum = 0;
      isunlocal = true;
    } else if (type == 'agreelocal') {

      isunlocal = false;
    }

    this.setState({
      title: `${sldComLanguage('处理退款申请')}`,
      modalVisible: isunlocal && !modalVisible,
      islocalModalVisible: !isunlocal && !islocalModalVisible,
      operateData: operate,
      isagress: agressNum == 1 ? true : false,
      returnType: returntype,
      show_foot:true,
    });
  };


  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  // 根据 returnType 的值判断 仅退款 或 退货退款 调接口
  sldHandleConfirm = (val) => {
    const { dispatch } = this.props;
    const { query, isagress, modalVisible, returnType } = this.state;
    if (returnType == 1 || (returnType == 2 && !isagress)) {
      let params = {};
      params.afsSn = query.afsSn;
      params.isPass = isagress;
      params.remark = val.remark != undefined ? val.remark : '';
      dispatch({
        type: 'service/confirm_return',
        payload: params,
        callback: res => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.setState({
              modalVisible: !modalVisible,
            });
            this.get_return_detail(query.afsSn);
          } else {
            failTip(res.msg);
          }
        },
      });
    } else if (returnType == 2 && isagress) {
      let params = {};
      params.afsSn = query.afsSn;
      params.isReceive = true;
      dispatch({
        type: 'service/confirm_receive',
        payload: params,
        callback: res => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.setState({
              modalVisible: !modalVisible,
            });
            this.get_return_detail(query.afsSn);
          } else {
            failTip(res.msg);
          }
        },
      });
    }
  };

  //查看物流
  checkFlow = () => {
    const { goods_detail_data, modalVisible } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'service/get_return_flow',
      payload: { afsSn: goods_detail_data.afsSn },
      callback: res => {
        if (res.state == 200) {
          let operateData = [];
          operateData.push({
            type: 'show_express',
            content: res.data,
          });
          this.setState({
            title: `${sldComLanguage('查看物流')}`,
            modalVisible: !modalVisible,
            operateData: operateData,
            show_foot:false,
          });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //退货退款 申请发地址
  sldConfirm = () => {
    const { dispatch } = this.props;
    const { selectedRowKeys, query, islocalModalVisible } = this.state;
    let params = {};
    params.afsSn = query.afsSn;
    params.isPass = true;
    params.remark = '';
    params.storeAddressId = selectedRowKeys[0];
    if (params.storeAddressId) {
      dispatch({
        type: 'service/confirm_return',
        payload: params,
        callback: res => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.setState({
              islocalModalVisible: !islocalModalVisible,
            });
            this.get_return_detail(query.afsSn);
          } else {
            this.setState({
              islocalModalVisible: !islocalModalVisible,
            });
            failTip(res.msg);
          }
        },
      });
    } else {
      sucTip(`${sldComLanguage('请选择收货地址')}`);
    }

  };

  onhandleModalVisible = () => {
    this.setState({
      islocalModalVisible: false,
      isflowVisible: false,
    });
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };


  render() {
    const { order_return_data, goods_detail_data, submiting, modalVisible, islocalModalVisible, operateData, title, show_foot, modal_width, return_progress_data, selectedRowKeys, addressList, addressColu, order_return_img_data, preview_img, show_preview_modal, preview_alt_con } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        <div className={global.flex_com_space_between} style={{ margin: 10, marginTop: 0 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('退款详情')}`)}
          {sldIconBtnBg(() => router.go(-1), 'fanhui', `${sldComLanguage('返回上级页面')}`, '#fff', 7, 0, 15, 15, 5)}
        </div>
        {getSldHorLine(1)}
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 108}>
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
            (goods_detail_data.returnType == 1 && goods_detail_data.state == 100) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{goods_detail_data.stateValue}</span>
              <span className={order.tip}>{`${sldComLanguage('收到买家仅退款申请，请尽快处理')}`}</span>
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('agreegoods', goods_detail_data.returnType)}
                     className={order.agree_btn}>{sldComLanguage('同意退款申请')}</div>
                <div onClick={() => this.agreeReturn('refusegoods', goods_detail_data.returnType)}
                     className={order.cancle_btn}>{sldComLanguage('拒绝退款申请')}</div>
              </div>
            </div>
          }
          {
            ((goods_detail_data.returnType == 1 || goods_detail_data.state == 2) && goods_detail_data.state == 300) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('退款成功')}`}</span>
              <span className={order.tip} style={{color:'#333'}}>{sldComLanguage('退款金额：')}<span style={{color:'#FF1818'}}>{sldComLanguage('¥')}{goods_detail_data.returnMoneyAmount}</span></span>
              <span className={order.tip}>{sldComLanguage('平台审核备注：')}{goods_detail_data.platformRemark}</span>
            </div>
          }
          {
            ((goods_detail_data.returnType == 1 || goods_detail_data.returnType == 2) && goods_detail_data.state == 202) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{goods_detail_data.stateValue}</span>
              <span className={order.tip}>{sldComLanguage('拒绝原因：')}{goods_detail_data.storeRemark}{goods_detail_data.refuseReason}</span>
            </div>
          }
          {
            (goods_detail_data.returnType == 1 && goods_detail_data.state == 200) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('待平台审核')}`}</span>
            </div>
          }
          {
            (goods_detail_data.returnType == 2 && goods_detail_data.state == 101) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{goods_detail_data.stateValue}</span>
              <span className={order.tip}>{`${sldComLanguage('收到买家退货退款申请，请尽快处理')}`}</span>
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('agreelocal', goods_detail_data.returnType)}
                     className={order.agree_btn}>{sldComLanguage('同意退款申请，发送退货地址')}</div>
                <div onClick={() => this.agreeReturn('refusegoods', goods_detail_data.returnType)}
                     className={order.refuse_btn}>{sldComLanguage('拒绝退款申请')}</div>
              </div>
            </div>
          }
          {
            (goods_detail_data.returnType == 2 && goods_detail_data.state == 201) &&
            <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('商家已同意退货申请，等待买家退货')}`}</span>
              <span className={order.tip}>{`${sldComLanguage('您已同意本次退货退款申请，等待买家发货')}`}</span>
              <span
                className={order.tip}>{sldComLanguage('买家需')}<span>{goods_detail_data.deadline}</span>{sldComLanguage('之前发货,否则退款申请将自动撤销。')}</span>
              <div className={order.btnsty}>
              </div>
            </div>
          }

          {
            (goods_detail_data.returnType == 2 && goods_detail_data.state == 102) &&
          <div className={`${order.state_part} ${global.flex_column_start_center}`}>
              <span className={order.title}>{`${sldComLanguage('买家已退货，等待商家确认收货')}`}</span>
              <span className={order.tip}>{sldComLanguage('买家已退货，退货物流公司:')}{goods_detail_data.buyerExpressName}，</span>
              <span className={order.tip}>{sldComLanguage('退货物流单号')}:{goods_detail_data.buyerExpressNumber} <a
                src="javascript: void(0);" style={{ color: '#FF711E' }}
                onClick={() => this.checkFlow()}>{sldComLanguage('查看物流')}</a></span>
              <div className={order.btnsty}>
                <div onClick={() => this.agreeReturn('agreegoods', goods_detail_data.returnType)}
                     className={order.cancle_btn}>{sldComLanguage('已收到货,同意退款')}</div>
                 <div onClick={() => this.agreeReturn('refusegoods', goods_detail_data.returnType)} className={order.refuse_btn}>拒绝退款申请</div>
              </div>
            </div>
          }


          {sldCommonTitle(`${sldComLanguage('退款信息')}`, '#333', 5, 15, 15)}
          <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                          data={order_return_data}/>

          {sldCommonTitle(`${sldComLanguage('退款凭证信息')}`, '#333', 5, 15, 15)}
          <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                          part_width={100} lwidth={10} rwidth={90}
                          data={order_return_img_data}/>
          {sldCommonTitle(`${sldComLanguage('商品信息')}`, '#333', 5, 15, 15)}
          <StandardTable
            selectedRows={[]}
            data={{ list: [goods_detail_data], pagination: {} }}
            size={'small'}
            rowKey={'orderProductId'}
            isCheck={false}
            columns={this.columns_order_goods}
            sldpagination={false}
          />
          {getSldEmptyH(40)}
        </Scrollbars>
        {/*新增/编辑对话框-start*/}
        <SldModal
          title={title}
          submiting={submiting}
          show_foot={show_foot}
          width={modal_width}
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={operateData}
        />
        {/*新增/编辑对话框-end*/}
        <Modal
          centered
          title={sldComLanguage('选择退货地址')}
          visible={islocalModalVisible}
          onOk={this.sldConfirm}
          onCancel={() => this.onhandleModalVisible()}
        >
          <div style={{ margin: 20 }}>
            <Table
              rowKey={'addressId'}
              rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
              columns={addressColu}
              dataSource={addressList}
              pagination={false}
              bordered={true}
              showHeader={false}
            />
          </div>
        </Modal>
        {/*图片预览-start*/}
        <SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={400}
                       preview_alt_con={preview_alt_con} closePreviewModal={() => this.viewImg(false)}/>
        {/*图片预览-end*/}
      </div>

    );
  }
}
