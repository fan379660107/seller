import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Radio, Empty, Pagination, Modal, Select, Input, InputNumber, Popconfirm } from 'antd';
import Link from 'umi/link';
import {
  dragSldTableColumn,
  sldHandlePaginationData,
  list_com_page_size_10,
  sldComLanguage,
  dateFormat,
  sldLlineRtextAddGoods,
  sldIconBtnBg,
  list_com_page_more,
  formItemLayoutModal,
  sucTip,
  failTip,
  mobile_reg,
  getSldEmptyH,
  sldSvgIcon,
  sldIconBtn,
  sldPopConfirm,
} from '@/utils/utils';
import global from '@/global.less';
import order from './order.less';
import Search from '@/components/Search/Search';
import PrintExterFaceSheet from './print_exter_face_sheet';
import CreateExterFaceSheet from './create_exter_face_sheet';
import SldModal from '@/components/SldModal/SldModal';
import { Scrollbars } from 'react-custom-scrollbars';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

let pageSize = list_com_page_size_10;
let comm_cur_page = 1;//当前页数
let sthis = '';
@connect(({ order }) => ({
  order,
}))
@Form.create()
export default class Order_lists extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      showAllowPrintKDNBtn: false,//批量打印电子面单打印按钮是否显示，默认不显示
      allowPrintOrderSnArray: [],//允许打印电子面单的订单号数组
      exterFaceSheetOptShowFlag: false,//批量生成、打印电子面单弹框是否显示
      exterFaceSheetOptType: 'create',//批量生成、打印电子面单类型， create 生成  print 打印
      exterFaceSheetOrderData: [],//批量生成、打印电子面单的订单数据
      showTopTip: '',//sldmodal顶部提示
      search_height: 0,
      filter_code: '',//过滤器默认值
      loading: false,
      data: {},
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      curData: {},//编辑的数据
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('订单号')}`,
        name: 'orderSn',
        placeholder: `${sldComLanguage('请输入订单号')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('会员名称')}`,
        name: 'memberName',
        placeholder: `${sldComLanguage('请输入会员名称')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('商品名称')}`,
        name: 'goodsName',
        placeholder: `${sldComLanguage('请输入商品名称')}`,
      }, {
        type: 'rangepicker',
        label: `${sldComLanguage('下单时间')}`,
        name: 'search_create_time',
        placeholder1: `${sldComLanguage('开始时间')}`,
        placeholder2: `${sldComLanguage('结束时间')}`,
      },
      ],
      formValues: {},//搜索条件
      operateData: [], //弹框操作数据
      modalVisible: false,
      modalTitle: '',
      submiting: false,
      show_foot: true,
      modal_width: 550,
      modalItem: {},
      demodalVisible: false,
      expressList: [],
      deliverType: '0',
      resList: [], // 取消原因数据
      showPrintExterFaceSheetBtn: false,//是否展示打印电子面单按钮
      exterFaceSheet: '',//通过电子面单获取的物流单号
      isAllowApplyExpressNum: true,//是否允许通过电子面单申请物流单号,默认允许
    };
  }

  order_type_icon = {
    '秒杀': require('@/assets/order/seckill_order_icon.png'),
    '拼团': require('@/assets/order/spell_group_order_icon.png'),
    '定金预售': require('@/assets/order/deposit_presale_order_icon.png'),
    '全款预售': require('@/assets/order/full_presale_order_icon.png'),
    '阶梯团': require('@/assets/order/ladder_grooup_order_icon.png'),
  };//订单类型图标

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.get_express_list();
    this.get_reason_list();
    this.resize();
    window.addEventListener('resize', this.resize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { search_height } = this.state;
    if (this.refs.search_part != undefined) {
      if (this.refs.search_part.clientHeight != search_height) {
        this.setState({ search_height: this.refs.search_part.clientHeight });
      }
    }
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

  //获取店铺启用的物流公司
  get_express_list = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/get_express',
      payload: { pageSize: list_com_page_more, expressState: 1 },
      callback: res => {
        if (res.state == 200) {
          this.setState({
            expressList: res.data.list,
          });
        } else {
          failTip(res.msg);
        }
      },
    });
  };
  //获取数据列表
  get_list = (params) => {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'order/get_order_lists',
      payload: { ...params, orderState: 20 },
      callback: (res) => {
        this.setState({ loading: false });
        if (res.state == 200) {
          if (params.current > 1 && res.data.list.length == 0 && this.state.params.current > 1) {
            params.current = params.current - 1;
            this.get_list(params);
          } else {
            this.setState({
              data: res.data,
            });
          }
        }
      },
    });
  };

  handleSelectRows = (rows, rowkeys) => {
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
    });
  };

  handleTablePagination = (pagination, filtersArg, sorter, type = 'main') => {
    if (type == 'main') {
      const { formValues } = this.state;
      const params = sldHandlePaginationData(pagination, filtersArg, sorter, formValues);
      comm_cur_page = pagination.current;
      pageSize = params.pageSize;
      this.setState({
        params: params,
      });
      this.get_list(params);
    }
  };

  //搜索事件
  search = (data) => {
    const values = { ...data };
    //时间处理
    if (values.search_create_time) {
      values.startTime = values.search_create_time[0] ? values.search_create_time[0].format(dateFormat) + ' 00:00:00' : '';
      values.endTime = values.search_create_time[1] ? values.search_create_time[1].format(dateFormat) + ' 23:59:59' : '';
      values.search_create_time = '';
    }
    for (let i in values) {
      if (values[i] == '') {
        delete values[i];
      }
    }
    this.setState({
      formValues: values,
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize, ...values });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      filter_code: '',
      data: {},
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize });
  };

  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  //改变每页的数量
  onShowSizeChange = (current, pageSizeNew) => {
    let { params, formValues } = this.state;
    params.pageSize = pageSizeNew;
    pageSize = params.pageSize;
    let curParams = { ...params, ...formValues };
    this.setState({ params }, () => {
      this.get_list(curParams);
    });
  };

  //改变页码
  onPageChange = (page, pageSize) => {
    const { formValues } = this.state;
    let curParams = { pageSize: pageSize, current: page, ...formValues };
    this.setState({ params: curParams });
    this.get_list(curParams);
  };

  handleSldExcel = () => {
    const { params, formValues } = this.state;
    let paramData = {
      ...params,
      ...formValues,
    };
    paramData.orderState = 20;
    paramData.fileName = `${sldComLanguage('订单导出')}`;
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch({
      type: 'order/export_order_list',
      payload: paramData,
      callback: (res) => {
        if (res.state != undefined && res.state == 255) {
          failTip(res.msg);
        }
        this.setState({ loading: false });
      },
    });
  };

  sldHandleCancle = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
      operateData: [],
      modalItem: {},
      modalTitle: '',
    });
  };

  //弹框确定操作
  sldHandleConfirm = (val) => {
    const { modalVisible, modalItem } = this.state;
    const { dispatch } = this.props;
    val.orderSn = modalItem.orderSn;
    dispatch({
      type: 'order/cancle_order',
      payload: val,
      callback: res => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.setState({
            modalVisible: false,
            operateData: [],
            modalItem: {},
            modalTitle: '',
          });
          const { formValues, params } = this.state;
          this.get_list({ ...formValues, ...params });
        } else {
          failTip(res.msg);
        }
      },
    });

  };
  agreeReturn = (item) => {
    let { operateData, resList, showTopTip } = this.state;
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
    });
    this.setState({
      modalTitle: `${sldComLanguage('取消订单')}`,
      modalVisible: true,
      operateData: operateData,
      modalItem: item,
      showTopTip,
    });
  };

  agreeDeliver = (item) => {
    this.setState({
      modalItem: item,
      modalTitle: `${sldComLanguage('商品发货')}`,
      demodalVisible: true,
      deliverType: '0',
      exterFaceSheet: item.expressNumber ? item.expressNumber : '',
      isAllowApplyExpressNum: item.expressNumber ? false : true,//是否允许通过电子面单申请物流单号
      showPrintExterFaceSheetBtn: item.expressNumber ? true : false,//已经有物流单号的话直接显示
    }, () => {
      this.props.form.resetFields(['expressNumber']);
    });
  };

  //虚拟订单发货
  virturalGoodsOrderDeliverConfirm = (orderSn) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/confirm_delivery',
      payload: { orderSn: orderSn },
      callback: res => {
        if (res.state == 200) {
          sucTip(res.msg);
          const { formValues, params } = this.state;
          this.get_list({ ...formValues, ...params });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  deliverConfirm = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { modalItem } = this.state;
        const { dispatch } = this.props;
        values.orderSn = modalItem.orderSn;
        dispatch({
          type: 'order/confirm_delivery',
          payload: values,
          callback: res => {
            if (res.state == 200) {
              sucTip(res.msg);
              this.setState({
                modalItem: {},
                modalTitle: '',
                demodalVisible: false,
              });
              const { formValues, params } = this.state;
              this.get_list({ ...formValues, ...params });
              this.props.form.resetFields();
            } else {
              failTip(res.msg);
            }
          },
        });
      }
    });

  };

  sldDeliverHandleCancle = () => {
    this.setState({
      modalItem: {},
      modalTitle: '',
      deliverType: '',
      demodalVisible: false,
    });
    this.props.form.resetFields();
  };

  //选择发货方式
  redioOnChange = (e) => {
    this.setState({
      deliverType: e.target.value,
    });
  };

  //电子面单获取物流单号
  getExterFaceSheetBtn = () => {
    this.props.form.validateFieldsAndScroll(['expressId'], (err, values) => {
      if (!err) {
        let { modalItem, showPrintExterFaceSheetBtn, exterFaceSheet, formValues, params } = this.state;
        const { dispatch } = this.props;
        values.orderSn = modalItem.orderSn;
        dispatch({
          type: 'order/get_exter_face_sheet',
          payload: values,
          callback: res => {
            if (res.state == 200) {
              this.props.form.resetFields(['expressNumber']);
              this.get_list({ ...formValues, ...params });
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
    let { modalItem } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'order/print_exter_face_sheet',
      payload: { orderSns: modalItem.orderSn },
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
    let { modalItem, exterFaceSheet, showPrintExterFaceSheetBtn } = this.state;
    if (val != modalItem.expressId) {
      exterFaceSheet = '';
      showPrintExterFaceSheetBtn = false;
    } else {
      exterFaceSheet = modalItem.expressNumber;
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

  //订单选择事件
  handleSelRows = (orderInfo) => {
    let { selectedRowKeys, selectedRows } = this.state;
    if (selectedRowKeys.indexOf(orderInfo.orderSn) > -1) {
      selectedRowKeys = selectedRowKeys.filter(item => item != orderInfo.orderSn);
      selectedRows = selectedRows.filter(item => item.orderSn != orderInfo.orderSn);
    } else {
      selectedRowKeys.push(orderInfo.orderSn);
      selectedRows.push(orderInfo);
    }
    this.setState({ selectedRowKeys, selectedRows });
  };

  //全选、反选操作
  handleSelAll = () => {
    let { selectedRowKeys, selectedRows, data } = this.state;
    if (selectedRowKeys.length == pageSize) {
      selectedRowKeys = [];
      selectedRows = [];
    } else {
      selectedRowKeys = data.list.map(item => {
        return item.orderSn;
      });
      selectedRows = data.list;
    }

    this.setState({ selectedRowKeys, selectedRows });
  };

  //批量生成电子面单的校验
  checkOrderCreateKDNState = () => {
    this.setState({
      exterFaceSheetOptType: 'create',
      exterFaceSheetOptShowFlag: true,
    });
  };

  //批量打印电子面单的校验
  checkOrderPrintKDNState = () => {
    let { selectedRowKeys, exterFaceSheetOrderData, exterFaceSheetOptShowFlag, showAllowPrintKDNBtn, allowPrintOrderSnArray } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'order/check_order_print_exter_face_sheet',
      payload: { orderSns: selectedRowKeys.join(',') },
      callback: res => {
        if (res.state == 200) {
          exterFaceSheetOrderData = res.data;
          exterFaceSheetOptShowFlag = true;
          res.data.map(item => {
            if (item.isGenerateFaceSheet == 1) allowPrintOrderSnArray.push(item.orderSn);
          });
          showAllowPrintKDNBtn = true;
        } else {
          failTip(res.msg);
          exterFaceSheetOrderData = [];
          exterFaceSheetOptShowFlag = false;
          showAllowPrintKDNBtn = false;
        }
        this.setState({
          exterFaceSheetOptType: 'print',
          exterFaceSheetOrderData,
          exterFaceSheetOptShowFlag,
          showAllowPrintKDNBtn,
          allowPrintOrderSnArray,
        });
      },
    });
  };

  //批量生成、打印电子面单弹框取消操作
  operateExterFaceSheetOptShowFlag = (flag) => {
    if (flag) {
      this.updateOrderList();
    }
    this.setState({ exterFaceSheetOptShowFlag: false, selectedRowKeys: [], selectedRows: [], allowPrintOrderSnArray: [] });
  };

  //批量发货：只针对已经生成电子面单的订单
  batchDeliver = () => {
    let { selectedRowKeys } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'order/batch_deliver',
      payload: { orderSns: selectedRowKeys.join(',') },
      callback: res => {
        if (res.state == 200) {
          sucTip(res.msg);
          selectedRowKeys = [];
          this.updateOrderList();
        } else {
          failTip(res.msg);
        }
        this.setState({
          selectedRowKeys,
        });
      },
    });
  };

  //更新当前数据
  updateOrderList = () => {
    const { formValues, params } = this.state;
    this.get_list({ ...params, ...formValues });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { search_data, data, loading, params, operateData, modalVisible, modalTitle, submiting, show_foot, modal_width, search_height, demodalVisible, modalItem, expressList, deliverType, showTopTip, showPrintExterFaceSheetBtn, exterFaceSheet, isAllowApplyExpressNum, selectedRowKeys, exterFaceSheetOptType, exterFaceSheetOrderData, exterFaceSheetOptShowFlag, showAllowPrintKDNBtn, allowPrintOrderSnArray } = this.state;
    return (
      <div className={`${global.common_page}`}
           style={{ flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
        <div className={global.flex_com_space_between} style={{ marginBottom: 10 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('订单发货')}`)}
          {sldIconBtnBg(() => this.handleSldExcel(), 'ziyuan23', `${sldComLanguage('订单导出')}`, '#fff', 7, 0, 15, 15, 3)}
        </div>
        <div style={{ position: 'relative' }}>

          <div className={global.tableListForm} ref={'search_part'}>
            <Search search_data={search_data}
                    seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
            />
          </div>
          {/*公共功能条-start*/}
          <div className={global.operate_bg}
               style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {selectedRowKeys.length == 0
                ? sldIconBtn(() => {
                  failTip(`${sldComLanguage('请先选中数据')}`);
                }, `${sldComLanguage('批量生成电子面单')}`, 7, 0, 14, 14, 3, 'piliangshengcheng', '#0c93f2')
                : sldIconBtn(() => this.checkOrderCreateKDNState(), `${sldComLanguage('批量生成电子面单')}`, 7, 0, 14, 14, 3, 'piliangshengcheng', '#0c93f2')}
              {selectedRowKeys.length == 0 ? sldIconBtn(() => {
                failTip(`${sldComLanguage('请先选中数据')}`);
              }, `${sldComLanguage('批量发货')}`, 7, 0, 15, 15, 3, 'piliangfahuo', '#ff4f21') : sldPopConfirm('leftBottom', `${sldComLanguage('批量发货只针对已经生成电子面单的数据,确定执行该操作吗')}？`, () => this.batchDeliver(), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('批量发货')}`, 7, 0, 15, 15, 3, 'piliangfahuo', '#ff4f21'), 0, 0, '#ff4f21')}
              {selectedRowKeys.length == 0
                ? sldIconBtn(() => {
                  failTip(`${sldComLanguage('请先选中数据')}`);
                }, `${sldComLanguage('批量打印电子面单')}`, 7, 0, 14, 14, 3, 'piliangdayin', '#0c93f2')
                : sldIconBtn(() => this.checkOrderPrintKDNState(), `${sldComLanguage('批量打印电子面单')}`, 7, 0, 14, 14, 3, 'piliangdayin', '#0c93f2')}
            </div>
          </div>
          {/*公共功能条-end*/}
          <Spin spinning={loading}>
            {/*标准表格-start*/}
            <div className={order.order_list}>
              <ul className={order.header}>
                <div className={order.left_all} onClick={() => this.handleSelAll()}>
                  {selectedRowKeys.length == pageSize
                    ? sldSvgIcon('white', 16, 16, 'duoxuan_yixuanzhong')
                    : sldSvgIcon('white', 16, 16, 'duoxuan_weixuanzhong')
                  }
                </div>
                <li className={`${order.width_40} ${order.pl_100}`}>{sldComLanguage('商品信息')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('单价(元)')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('数量')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('会员')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('实付金额')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('订单状态')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('操作')}</li>
              </ul>
              <div className={order.order_content}>
                {data.list != undefined && data.list.length == 0 &&
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                }
                <Scrollbars autoHeight
                            autoHeightMax={document.body.clientHeight - 265 - search_height}>
                  {data.list != undefined && data.list.length > 0 && data.list.map((item, index) => {
                    return <div className={order.item} key={index}>
                      <div className={`${order.order_info} ${global.flex_row_between_center}`}>
                        <div className={`${order.left} ${global.flex_row_start_start}`}>
                          <div style={{ height: 16 }} onClick={() => this.handleSelRows(item)}>
                            {selectedRowKeys.indexOf(item.orderSn) > -1
                              ? sldSvgIcon('white', 16, 16, 'duoxuan_yixuanzhong')
                              : sldSvgIcon('white', 16, 16, 'duoxuan_weixuanzhong')
                            }
                          </div>
                          <span className={order.order_sn}
                                style={{ marginLeft: 8 }}>{sldComLanguage('订单号：')}{item.orderSn}</span>
                          {item.orderTypeValue &&
                          <div className={order.order_type}>
                            <img className={order.order_type_icon}
                                 src={this.order_type_icon[item.orderTypeValue]}/>
                            <span className={order.order_type_text}>{item.orderTypeValue}</span>
                          </div>
                          }
                          {item.isVirtualGoods == 2 &&
                          <div className={order.order_type} style={{ marginLeft: 8 }}>
                            <img className={order.order_type_icon}
                                 src={require('@/assets/order/virtural_goods_order_icon.png')}/>
                            <span
                              className={order.order_type_text}>{sldComLanguage('虚拟商品订单')}</span>
                          </div>
                          }
                        </div>
                        <span className={order.create_time}>{sldComLanguage('下单时间：')}{item.createTime}</span>
                      </div>
                      <div className={`${order.order_goods_part} ${global.flex_row_start_center}`}>
                        <div
                          className={`${order.goods} ${global.flex_column_start_start} ${order.width_60} ${item.orderProductListVOList != undefined && item.orderProductListVOList.length > 1 ? order.goods_split : null}`}>

                          {item.orderProductListVOList != undefined && item.orderProductListVOList.length > 0 && item.orderProductListVOList.map((item_goods, index_goods) => {
                            return <div className={`${order.goods_item} ${global.flex_row_start_center}`}
                                        style={{ width: '100%' }} key={index_goods}>
                              <div className={`${global.flex_row_start_center}`} style={{ width: '66.66%' }}>
                                <div className={`${order.goods_img_wrap} ${global.flex_row_center_center}`}>
                                  <img
                                    src={item_goods.productImage}/>
                                </div>
                                <div className={`${order.goods_info} ${global.flex_column_start_start}`}>
                                  <span className={`${order.goods_name}`}>{item_goods.goodsName}</span>
                                  <span className={`${order.goods_spec}`}>{item_goods.specValues}</span>
                                </div>
                              </div>
                              <span className={`${order.goods_price} ${order.width_10} ${order.center}`}
                                    style={{ width: '16.68%' }}>￥{item_goods.productShowPrice}</span>
                              <span className={`${order.buy_num} ${order.width_10} ${order.center}`}
                                    style={{ width: '16.66%' }}>{item_goods.productNum}</span>
                            </div>;
                          })}
                        </div>


                        <div className={`${order.member_info} ${global.flex_column_center_center} ${order.width_10}`}>
                          <span className={`${order.mem_name}`}>{item.memberName}</span>
                        </div>
                        <div
                          className={`${order.pay_amount} ${order.width_10} ${order.center}`}>￥{item.orderAmount}</div>
                        <div
                          className={`${order.order_state} ${order.width_10} ${order.center}`}>{item.orderStateValue}</div>
                        <div className={`${order.operate} ${order.width_10} ${order.center}`}>
                          <Link
                            to={{
                              pathname: '/order/order_lists_to_detail',
                              query: {
                                orderSn: item.orderSn,
                              },
                            }}
                          >
                            <div className={`${order.operate_btn}`}>
                              {sldComLanguage('查看详情')}
                            </div>
                          </Link>
                          {
                            (item.orderState == 20 && item.lockState == 0 && (item.isShowDeliverButton == undefined || (item.isShowDeliverButton != undefined && item.isShowDeliverButton)))
                              ? (item.isVirtualGoods == 2
                                ? <Popconfirm
                                  placement={'topRight'}
                                  title={`${sldComLanguage('该订单为虚拟商品订单，确认执行该操作吗')}?`}
                                  onConfirm={() => this.virturalGoodsOrderDeliverConfirm(item.orderSn)}
                                  okText={sldComLanguage('确定')}
                                  cancelText={sldComLanguage('取消')}>
                                  <div className={order.operate_btn}>
                                    <a style={{ color: '#666' }}
                                       href="javascript:void(0)">{sldComLanguage('发货')}
                                    </a>
                                  </div>
                                </Popconfirm>
                                : <div className={order.operate_btn} onClick={() => this.agreeDeliver(item)}>
                                  {sldComLanguage('发货')}
                                </div>
                              )
                              : null
                          }
                          {
                            item.orderState == 10 || item.orderState == 20 ?
                              <div className={order.operate_btn} onClick={() => this.agreeReturn(item)}>
                                {sldComLanguage('取消订单')}
                              </div> : null
                          }
                        </div>
                      </div>
                    </div>;
                  })
                  }
                </Scrollbars>
              </div>
              <div className={order.pagination}>
                {data.list != undefined && data.list.length > 0 && data.pagination != undefined &&
                <Pagination
                  size={'small'}
                  showSizeChanger
                  showQuickJumper
                  pageSize={params.pageSize}
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onPageChange}
                  defaultCurrent={data.pagination.current}
                  total={data.pagination.total}
                />
                }
              </div>
            </div>
            {/*标准表格-end*/}
          </Spin>
          {/* 发货弹框-start */}

          <div className={global.modalsty}>
            <SldModal
              title={modalTitle}
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
          </div>

          <Modal
            centered
            title={modalTitle}
            width={modal_width}
            visible={demodalVisible}
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
                <span>{modalItem.receiverName}</span>
              </FormItem>
              <FormItem
                label={sldComLanguage('收货人电话')}
                {...formItemLayoutModal}
              >
                <span>{modalItem.receiverMobile}</span>
              </FormItem>
              <FormItem></FormItem>
              <FormItem
                label={sldComLanguage('收货人地址')}
                {...formItemLayoutModal}
              >
                <span style={{ wordBreak: 'break-all' }}>{modalItem.receiverAddress}</span>
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
                      initialValue: modalItem.expressId ? modalItem.expressId : undefined,
                      rules: [{
                        required: true,
                        message: `${sldComLanguage('请选择物流公司')}`,
                      }],
                    })(
                      <Select placeholder={sldComLanguage('请选择物流公司')}
                              onChange={(e) => this.handleSelExpress(e)}
                      >
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
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: `${sldComLanguage('请输入联系人')}`,
                        },
                      ],
                    })(
                      <Input maxLength={10} placeholder={sldComLanguage('请输入联系人')}
                      />,
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
                          message: `${sldComLanguage('请输入手机号')}`,
                        }, {
                          pattern: mobile_reg,
                          message: `${sldComLanguage('请输入正确的手机号')}`,
                        },
                      ],
                    })(
                      <Input maxLength={11} placeholder={sldComLanguage('请输入手机号')}/>,
                    )}
                  </FormItem>
                </Fragment> : null
              }

            </Form>
          </Modal>
          {/*批量打印电子面单-start*/}
          {exterFaceSheetOptType == 'print' &&
          <PrintExterFaceSheet exterFaceSheetOptShowFlag={exterFaceSheetOptShowFlag} orderData={exterFaceSheetOrderData}
                               showAllowPrintKDNBtn={showAllowPrintKDNBtn}
                               allowPrintOrderSnArray={allowPrintOrderSnArray}
                               operateExterFaceSheetOptShowFlag={this.operateExterFaceSheetOptShowFlag}/>
          }
          {/*批量打印电子面单-end*/}
          {/*批量生成电子面单-start*/}
          {exterFaceSheetOptType == 'create' &&
          <CreateExterFaceSheet exterFaceSheetOptShowFlag={exterFaceSheetOptShowFlag} orderData={selectedRowKeys}
                                operateExterFaceSheetOptShowFlag={this.operateExterFaceSheetOptShowFlag}
                                expressList={expressList}/>
          }
          {/*批量生成电子面单-end*/}
        </div>
      </div>
    );
  }
}
