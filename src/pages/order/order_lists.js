import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import {
  Form,
  Spin,
  Radio,
  Empty,
  Pagination,
  Modal,
  Select,
  Input,
  Rate,
  InputNumber,
  Button,
  Popconfirm,
} from 'antd';
import Link from 'umi/link';
import {
  dragSldTableColumn,
  list_com_page_size_10,
  sldComLanguage,
  dateFormat,
  sldLlineRtextAddGoods,
  sldIconBtnBg,
  list_com_page_more,
  formItemLayoutModal,
  sucTip,
  failTip,
  sldPrint,
  mobile_reg,
  getSldEmptyH,
  sldSvgIcon,
} from '@/utils/utils';
import global from '@/global.less';
import order from './order.less';
import Search from '@/components/Search/Search';
import SldModal from '@/components/SldModal/SldModal';
import { Scrollbars } from 'react-custom-scrollbars';
import PrintOrderDetail from './print_order_detail';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

//搜索组件数据容器（不需要对变量进行监听）
let searchComponentData = {};

let pageSize = list_com_page_size_10;
let sthis = '';
@connect(({ order }) => ({
  order,
}))
@Form.create()
export default class OrderLists extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      exterFaceSheet: '',//通过电子面单获取的物流单号
      showPrintExterFaceSheetBtn: false,//是否展示打印电子面单按钮
      isAllowApplyExpressNum: true,//是否允许通过电子面单申请物流单号,默认允许
      showTopTip: '',//sldmodal顶部提示
      changeVal: '',//改价的运费值
      priceModalVisible: false,//修改价格modal是否显示
      priceSubmiting: false,//修改价格modal的submiting
      secondTitle: '',//第二个sldmodal的标题
      secondSubmiting: false,//第二个sldmodal的submiting
      secondModalVisible: false,//第二个sldmodal是否显示
      secondOperateData: [],//第二个sldmodal的数据
      print_data: {},//发货明细单数据
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
      orderRemarkData: [{
        type: 'textarea',
        label: `${sldComLanguage('订单备注')}`,
        name: 'remark',
        placeholder: `${sldComLanguage('请输入订单备注信息')}`,
        extra: `${sldComLanguage('最多输入100字')}`,
        initialValue: '',
        maxLength: 100,
      }],//订单备注数据
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
      }, {
        type: 'select',
        label: `${sldComLanguage('订单星级')}`,
        name: 'star',
        placeholder: `${sldComLanguage('请选择订单星级')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '5', name: `${sldComLanguage('五星')}` },
          { key: '4', name: `${sldComLanguage('四星')}` },
          { key: '3', name: `${sldComLanguage('三星')}` },
          { key: '2', name: `${sldComLanguage('二星')}` },
          { key: '1', name: `${sldComLanguage('一星')}` },
        ],
      },{
        type: 'select',
        label: `${sldComLanguage('订单类型')}`,
        name: 'isVirtualGoods',
        placeholder: `${sldComLanguage('请选择订单类型')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '1', name: `${sldComLanguage('实物商品订单')}` },
          { key: '2', name: `${sldComLanguage('虚拟商品订单')}` },
        ],
      }],
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
    };
  }

  filter_data = [
    { filter_code: '', filter_name: `${sldComLanguage('全部订单')}` },
    { filter_code: '10', filter_name: `${sldComLanguage('待付款订单')}` },
    { filter_code: '20', filter_name: `${sldComLanguage('待发货订单')}` },
    { filter_code: '30', filter_name: `${sldComLanguage('待收货订单')}` },
    { filter_code: '40', filter_name: `${sldComLanguage('已完成订单')}` },
    { filter_code: '0', filter_name: `${sldComLanguage('已取消订单')}` },
  ];//订单过滤器

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

  resize = () => {
    const { search_height } = this.state;
    if (this.refs.search_part != undefined) {
      if (this.refs.search_part.clientHeight != search_height) {
        this.setState({ search_height: this.refs.search_part.clientHeight });
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

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
    this.setState({ loading: true, params: params });
    const { dispatch } = this.props;
    dispatch({
      type: 'order/get_order_lists',
      payload: { ...params },
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

  //搜索事件
  search = (data) => {
    searchComponentData = data;
    const values = { ...data };
    const { filter_code } = this.state;
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
    let param = { pageSize: pageSize, ...values };
    if (filter_code) {
      param.orderState = filter_code;
    }
    this.get_list(param);
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
    this.search({});
  };

  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  //订单条件过滤器
  clickFilter = (e) => {
    this.setState({
      filter_code: e.target.value,
    }, () => {
      this.search(searchComponentData);
    });
  };

  //改变每页的数量
  onShowSizeChange = (current, pageSizeNew) => {
    let { params, formValues, filter_code } = this.state;
    params.pageSize = pageSizeNew;
    pageSize = params.pageSize;
    let curParams = { ...params, ...formValues };
    if (filter_code) {
      curParams.orderState = filter_code;
    }
    this.setState({ params }, () => {
      this.get_list(curParams);
    });
  };

  //改变页码
  onPageChange = (page, pageSize) => {
    const { formValues, filter_code } = this.state;
    let curParams = { pageSize: pageSize, current: page, ...formValues };
    if (filter_code) {
      curParams.orderState = filter_code;
    }
    this.setState({ params: curParams });
    this.get_list(curParams);
  };

  handleSldExcel = () => {
    const { params, formValues, filter_code } = this.state;
    let paramData = {
      ...params,
      ...formValues,
    };
    if (filter_code) {
      paramData.orderState = filter_code;
    }
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

  sldHandleSecondCancle = () => {
    this.setState({
      secondModalVisible: false,
      priceModalVisible: false,
    });
  };

  //操作  remark:添加订单备注 star:设置订单星级
  operate = (id, type) => {
    this.setState({ secondSubmiting: true, priceSubmiting: true });
    const { params, filter_code, formValues } = this.state;
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
          if (filter_code) {
            params.orderState = filter_code;
          }
          this.get_list({ ...params, ...formValues });
        } else {
          failTip(res.msg);
        }
        this.setState({ secondSubmiting: false, priceSubmiting: false });
      },
    });
  };

  //弹框确定操作
  sldHandleSecondConfirm = (val) => {
    const { modalItem } = this.state;
    val.orderSn = modalItem.orderSn;
    this.operate(val, 'remark');
  };

  //修改价格确认操作
  sldHandleConfirmPrice = (e) => {
    const { modalItem, changeVal } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['moneyAmount', 'expressFee'], (err, values) => {
      if (!err) {
        values.orderSn = modalItem.orderSn;
        values.expressFee = changeVal;
        this.operate(values, 'price');
      }
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
      maxLength: 50,
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

  //打印明细单
  printDetail = (val) => {
    this.setState({ print_data: val }, () => {
      sldPrint('send_detail', 'html');
    });
  };

  //备注事件
  addOrderRemark = (val) => {
    let { orderRemarkData, secondOperateData } = this.state;
    secondOperateData = JSON.parse(JSON.stringify(orderRemarkData));
    if (val.storeRemark) {
      secondOperateData[0].initialValue = val.storeRemark;
    }
    this.setState({
      modalItem: val,
      secondTitle: '商家订单备注',
      secondOperateData,
      secondModalVisible: true,
    });
  };

  //加星事件
  addStar = (e, val) => {
    if (e * 1 != (val.star ? val.star * 1 : 0)) {
      this.operate({ orderSn: val.orderSn, star: e }, 'star');
    }
  };

  //修改价格
  changeOrderPrice = (val) => {
    this.props.form.resetFields();
    this.setState({
      modalItem: val,
      priceModalVisible: true,
      changeVal: val.expressFee,
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

  //电子面单获取物流单号
  getExterFaceSheetBtn = () => {
    this.props.form.validateFieldsAndScroll(['expressId'], (err, values) => {
      if (!err) {
        let { modalItem, showPrintExterFaceSheetBtn, exterFaceSheet, formValues, params, filter_code } = this.state;
        const { dispatch } = this.props;
        values.orderSn = modalItem.orderSn;
        dispatch({
          type: 'order/get_exter_face_sheet',
          payload: values,
          callback: res => {
            if (res.state == 200) {
              this.props.form.resetFields(['expressNumber']);
              if (filter_code) {
                params.orderState = filter_code;
              }
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

  viewDetail = (val) => {
    window.open(`/order/order_lists_to_detail?orderSn=${val}`, '_blank');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { search_data, data, loading, filter_code, params, operateData, modalVisible, modalTitle, submiting, show_foot, modal_width, search_height, demodalVisible, modalItem, expressList, print_data, deliverType, secondTitle, secondSubmiting, secondModalVisible, secondOperateData, priceModalVisible, changeVal, priceSubmiting, showTopTip, exterFaceSheet, showPrintExterFaceSheetBtn, isAllowApplyExpressNum } = this.state;
    return (
      <div className={`${global.common_page}`}
           style={{ flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
        <div className={global.flex_com_space_between} style={{ marginBottom: 10 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('订单管理')}`)}
          {sldIconBtnBg(() => this.handleSldExcel(), 'ziyuan23', `${sldComLanguage('订单导出')}`, '#fff', 7, 0, 15, 15, 3)}
        </div>
        <div style={{ position: 'relative' }}>

          <div className={global.tableListForm} ref={'search_part'}>
            <Search search_data={search_data}
                    seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
            />
          </div>
          {/*筛选器-start*/}
          <div style={{ marginBottom: 10 }}>
            <RadioGroup value={filter_code} size="small" onChange={this.clickFilter}>
              {this.filter_data.map((item, index) => {
                return <RadioButton key={index + 1}
                                    value={item.filter_code}>{item.filter_name}</RadioButton>;
              })}
            </RadioGroup>
          </div>

          <Spin spinning={loading}>
            {/*标准表格-start*/}
            <div className={order.order_list}>
              <ul className={order.header}>
                <li className={`${order.width_40} ${order.pl_100}`}>{sldComLanguage('商品信息')}</li>
                <li className={`${order.width_10} ${order.center}`}>{sldComLanguage('单价')}</li>
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
                            autoHeightMax={document.body.clientHeight - 272 - search_height}>
                  {data.list != undefined && data.list.length > 0 && data.list.map((item, index) => {
                    return <div className={order.item} key={index}>
                      <div className={`${order.order_info} ${global.flex_row_between_center}`}>
                        <div className={`${order.left} ${global.flex_row_start_start}`}>
                          <span className={order.order_sn}>{sldComLanguage('订单号：')}{item.orderSn}</span>
                          {item.orderTypeValue &&
                          <div className={order.order_type}>
                            <img className={order.order_type_icon}
                                 src={this.order_type_icon[item.orderTypeValue]}/>
                            <span
                              className={order.order_type_text}>{item.orderTypeValue}</span>
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
                        <div className={`${global.flex_row_end_center}`}>
                          <div className={`${global.flex_row_start_center} ${order.star_part}`}>
                            {item.star
                              ? <div className={`${order.star} ${order.add_star}`}><Rate value={item.star}
                                                                                         style={{ fontSize: 18 }}/>
                              </div>
                              : <span className={`${order.operate_btn} ${order.add_star}`}>{sldComLanguage('加星')}</span>
                            }
                            <div className={`${global.flex_row_start_center} ${order.star}`}>
                              <img style={{ width: 18, height: 18, marginRight: 5, marginTop: -5, cursor: 'pointer' }}
                                   src={require('@/assets/order/clear_star.png')}
                                   onClick={() => this.addStar(0, item)}/>
                              <Rate value={item.star} style={{ fontSize: 18 }}
                                    onChange={(e) => this.addStar(e, item)}/>
                            </div>
                          </div>
                          <span className={order.operate_btn}
                                onClick={() => this.addOrderRemark(item)}>{sldComLanguage('备注')}</span>
                          <span className={order.create_time}>{sldComLanguage('下单时间：')}{item.createTime}</span>
                        </div>
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
                        <div className={`${order.operate} ${order.width_10} ${order.center}`}
                             style={{ padding: '15px 5px' }}>
                          <div className={`${order.operate_btn}`} onClick={() => this.viewDetail(item.orderSn)}>
                            {sldComLanguage('查看详情')}
                          </div>
                          {
                            item.orderState == 10 && item.orderType == 1 ?
                              <div className={order.operate_btn} onClick={() => this.changeOrderPrice(item)}>
                                {sldComLanguage('修改价格')}
                              </div> : null
                          }
                          {
                            item.orderState == 10 || item.orderState == 20 ?
                              <div className={order.operate_btn} onClick={() => this.agreeReturn(item)}>
                                {sldComLanguage('取消订单')}
                              </div> : null
                          }
                          {item.isVirtualGoods == 1 && item.orderState == 20 ?
                            <div className={order.operate_btn} onClick={() => this.printDetail(item)}>
                              {sldComLanguage('打印发货单')}
                            </div> : null
                          }
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
                        </div>
                      </div>
                      {item.storeRemark &&
                      <div className={`${global.flex_row_start_center} ${order.remark}`}>
                        <span className={`${order.remark_tip}`}>{sldComLanguage('商家备注')}：</span>
                        <span className={`${order.remark_con}`}>{item.storeRemark}</span>
                      </div>
                      }
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
                  current={data.pagination.current}
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
            <Form layout="horizontal">
              {deliverType == 0
                ? <Fragment>
                  <div className={`${global.flex_row_start_center}`} style={{
                    width: modal_width,
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
                    <span style={{ fontSize: 13, marginLeft: 6 }}>{sldComLanguage('请认真填写物流公司及快递单号')}</span>
                  </div>
                  {getSldEmptyH(40)}
                </Fragment>
                : getSldEmptyH(15)
              }
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
                      rules:
                        [{
                          required: true,
                          whitespace: true,
                          message: `${sldComLanguage('请输入物流单号')}`,
                        }, {
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
                      <Input placeholder={sldComLanguage('请输入联系人')} maxLength={10}/>,
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

        </div>
        {/* 打印发货单-start */}
        <div style={{ display: 'none' }}>
          <div id={'send_detail'}>
            <PrintOrderDetail data={print_data}/>
          </div>
        </div>
        {/* 打印发货单-end */}
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
          <div className={`${global.flex_row_start_center} ${global.sld_modal_top_tip}`}>
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
                initialValue: modalItem.moneyAmount,
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
