/*
* 新建预售活动
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Spin, DatePicker, Select, Table, InputNumber, Switch, Tooltip, Checkbox, Popconfirm, Icon, Input, } from 'antd';
import {
  failTip,
  sucTip,
  sldLlineRtextAddGoodsAddMargin,
  sldComLanguage,
  getSldHorLine,
  sldCommonTitleByBg,
  getSldEmptyH,
  list_com_page_more,
  sldIconBtn,
  dateTimeFormat,
  sldSvgIcon,
} from '@/utils/utils';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelMoreLeftRightPresaleGoods from '@/components/SldSelMoreLeftRightPresaleGoods';
import moment from 'moment';

let sthis = '';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker
@connect(({ promotion, global }) => ({
  promotion, global,
}))
@Form.create()
export default class AddPresale extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;

    this.state = {
      compensateRate:0,//赔偿倍数
      Pagetitle: (props.location.query.tar!=undefined&&props.location.query.tar=='edit'?`${sldComLanguage('编辑')}`:`${sldComLanguage('新建')}`)+(props.location.query.type==1?`${sldComLanguage('定金预售')}`:`${sldComLanguage('全款预售')}`),//页面标题
      battchVal: '',//批量设置里面的值
      activity_stages: [],//活动场次
      activity_labels: [],//活动标签
      loading: false,
      modalVisibleGoods: false,
      query: props.location.query,
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      detail: {},//活动详情数据
      // 定金预售
      columns_spec: [
        {
          title: ' ',
          dataIndex: 'key',
          align: 'center',
          width: 30,
          render: (text, record, index) => {
            return index + 1;
          },
        },
        {
          title: `${sldComLanguage('SKU规格')}`,
          dataIndex: 'specValues',
          align: 'center',
          width: 100,
          render: (text, record, index) => {
            return text ? text : `${sldComLanguage('默认')}`;
          },
        },
        {
          title: `${sldComLanguage('原价(￥)')}`,
          dataIndex: 'productPrice',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('库存')}`,
          dataIndex: 'productStock',
          align: 'center',
          width: 100,
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('预售价格')}
          </div>,
          dataIndex: 'presellPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`presellPrice${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }] : [],
              })(
                <InputNumber
                  min={0.01}
                  max={9999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onBlur={e=>this.handleFieldBlur(e, 'presellPrice', record)}
                />,
              )}
            </FormItem>
          ),
        },

        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('预售定金')}
          </div>,
          dataIndex: 'firstMoney',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`firstMoney${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `该项必填`,
                }] : [],
              })(
                <InputNumber
                  min={0.01}
                  max={99999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'firstMoney', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            {sldComLanguage('定金膨胀')}
            <Tooltip placement="bottomLeft" title={`${sldComLanguage('设置定金可抵用金额，如商品总价为1000元，定金设置100元，定金膨胀设置200元，则定金抵用200元，尾款需支付800元')}`}>
              <div style={{ right: -15, top: 2, position: 'absolute' }}>{sldSvgIcon('#bfbbba', 14, 14, 'wen')}</div>
            </Tooltip>
                </div>,
          dataIndex: 'firstExpand',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`firstExpand${record.productId}`, {
                initialValue: text&&text!=undefined?text:'',
              })(
                <InputNumber
                  min={0.01}
                  max={99999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'firstExpand', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('预售库存')}
          </div>,
          dataIndex: 'presellStock',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`presellStock${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }] : [],
              })(
                <InputNumber
                  min={1}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'presellStock', record)}
                />,
              )}
            </FormItem>
          ),
        },

        {
          title: `${sldComLanguage('参与')}`,
          dataIndex: 'state',
          align: 'center',
          width: 60,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`state${record.productId}`, {
                valuePropName: 'checked',
                initialValue: text == 1 ? true : false,
              })(
                <Switch
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e ? 1 : 2, 'state', record)}
                />,
              )}
            </FormItem>
          ),
        }],//商品规格表头
      //  全款预售
      columns_spec_all: [
        {
          title: ' ',
          dataIndex: 'key',
          align: 'center',
          width: 30,
          render: (text, record, index) => {
            return index + 1;
          },
        },
        {
          title: `${sldComLanguage('SKU规格')}`,
          dataIndex: 'specValues',
          align: 'center',
          width: 100,
          render: (text, record, index) => {
            return text ? text : '默认';
          },
        },
        {
          title: `${sldComLanguage('原价(¥)')}`,
          dataIndex: 'productPrice',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('库存')}`,
          dataIndex: 'productStock',
          align: 'center',
          width: 100,
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('预售价格')}
            </div>,
          dataIndex: 'presellPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`presellPrice${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }] : [],
              })(
                <InputNumber
                  min={0.01}
                  max={9999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'presellPrice', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('预售库存')}
            </div>,
          dataIndex: 'presellStock',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`presellStock${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }] : [],
              })(
                <InputNumber
                  min={1}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'presellStock', record)}
                />,
              )}
            </FormItem>
          ),
        },

        {
          title: `${sldComLanguage('参与')}`,
          dataIndex: 'state',
          align: 'center',
          width: 60,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`state${record.productId}`, {
                valuePropName: 'checked',
                initialValue: text == 1 ? true : false,
              })(
                <Switch
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e ? 1 : 2, 'state', record)}
                />,
              )}
            </FormItem>
          ),
        }],//商品规格表头
    };
  }

  sele_more_goods = {
    info: [],//选择的商品数组
    ids: [],//选择的商品id数组
    min_num: 1,//最小数量，0为不限制
  };

  componentDidMount() {
    const { query } = this.state;
    if (query.id != undefined && query.id > 0) {
      this.get_detail(query.id);
    }
    if(query.type != undefined && query.type == 1){
      this.getSetting();
    }
    this.get_activity_label();
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
  }

  componentWillUnmount() {
  }

  //获取系统配置(预售活动赔偿倍数)
  getSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'presale_compensate'},
      callback: (res) => {
        if (res.state == 200) {
          this.setState({compensateRate:res.data[0].value,isFirstLoading:false})
        }
      },
    });
  };

  //批量设置
  batchConfirm = (e, type, val) => {
    let { selectedRows, battchVal, query } = this.state;
    let cur_goods = selectedRows.filter(item=>item.goodsId == val.goodsId)[0];
    if(!battchVal){
      return false
    }

    //数据验证
    for(let i=0;i<cur_goods.seckillProductVOList.length;i++){
      let item_data = cur_goods.seckillProductVOList[i];
      let specValuesName = item_data.specValues?item_data.specValues:sldComLanguage('默认规格');
      if(type == 'presellStock' && battchVal > item_data.productStock){
        //预售库存不能超过所有sku里面的最小库存
        battchVal = item_data.productStock;
      }

      //预售价格必须小于商品价格
      if(type == 'presellPrice'){
        if(battchVal>=item_data.productPrice){
          failTip(`${specValuesName}${sldComLanguage('的预售价格必须小于商品价格')}`);
          this.setState({battchVal: ''});
          return false;
        }
        if(query.type == 1){
          if(item_data.firstMoney && battchVal <= item_data.firstMoney){
            failTip(`${specValuesName}${sldComLanguage('的预售价格必须大于预售定金')}`);
            this.setState({battchVal: ''});
            return false;
          }else if(item_data.firstExpand && battchVal <= item_data.firstExpand){
            failTip(`${specValuesName}${sldComLanguage('的预售价格必须大于膨胀金额')}`);
            this.setState({battchVal: ''});
            return false;
          }
        }
      }

      //预售定金不可以超过预售价格，且不可以超过定金膨胀
      if(type == 'firstMoney'){
        if (item_data.presellPrice && battchVal >= item_data.presellPrice) {
          failTip(`${specValuesName}${sldComLanguage('的预售定金必须小于预售价格')}`);
          this.setState({battchVal: ''});
          return false;
        }
        if (item_data.firstExpand && battchVal >= item_data.firstExpand) {
          failTip(`${specValuesName}${sldComLanguage('的预售定金必须小于定金膨胀金额')}`);
          this.setState({battchVal: ''});
          return false;
        }
        if(!item_data.presellPrice && !item_data.firstExpand && battchVal >= item_data.productPrice){
          failTip(`${specValuesName}${sldComLanguage('的预售定金必须小于商品价格')}`);
          this.setState({battchVal: ''});
          return false;
        }
      }

      //定金膨胀不可以超过预售价格，但是要大于预售定金
      if(type == 'firstExpand'){
        if (item_data.firstMoney && battchVal <= item_data.firstMoney) {
          failTip(`${specValuesName}${sldComLanguage('的定金膨胀必须大于预售定金')}`);
          this.setState({battchVal: ''});
          return false;
        }else if(item_data.presellPrice && battchVal >= item_data.presellPrice){
          failTip(`${specValuesName}${sldComLanguage('的定金膨胀必须小于预售价格')}`);
          this.setState({battchVal: ''});
          return false;
        }
        if(!item_data.presellPrice && !item_data.firstExpand && battchVal >= item_data.productPrice){
          failTip(`${specValuesName}${sldComLanguage('的定金膨胀必须小于商品价格')}`);
          this.setState({battchVal: ''});
          return false;
        }
      }
    }

    let sku_product_id = [];
    cur_goods.seckillProductVOList.map(item => {
      item[type] = battchVal;
      sku_product_id.push(item.productId);
    });
    this.setState({ selectedRows, battchVal: '' }, () => {
      sku_product_id.map(item => {
        sthis.props.form.resetFields(['presellStock' + item, 'presellPrice' + item, 'firstMoney' + item, 'firstExpand' + item, 'state' + item]);
      })
    });
  };

  //批量设置
  handleFieldBattchChange = (e) => {
    this.setState({ battchVal: e });
  };

  //全部参与事件
  setAll = (e, val) => {
    let { selectedRows } = this.state;
    let resetFields = [];
    for (let i in selectedRows) {
      if (selectedRows[i].goodsId == val.goodsId) {
        selectedRows[i].seckillProductVOList.map(item => {
          item.state = e.target.checked ? 1 : 0;
          resetFields.push('state' + item.productId);
        });
        break;
      }
    }
    this.setState({ selectedRows }, () => {
      sthis.props.form.resetFields(resetFields);
    });
  };

  handleFiledContent(val, fieldName, record){
    let {query} = this.state
    //预售库存都不可以超过最大库存
    if (fieldName == 'presellStock' && val > record.productStock) {
      val = record.productStock;
    }
    //预售价格必须小于商品价格
    if (fieldName == 'presellPrice') {
      if(val >= record.productPrice){
        val = '';
        failTip(`${sldComLanguage('预售价格必须小于商品价格')}`);
      }
      if(query.type == 1){
        if(record.firstMoney && val <= record.firstMoney){
          val = '';
          failTip(`${sldComLanguage('预售价格必须大于预售定金')}`);
        }else if(record.firstExpand && val <= record.firstExpand){
          val = '';
          failTip(`${sldComLanguage('预售价格必须大于膨胀金额')}`);
        }
      }
    }

    //预售定金不可以超过预售价格，且不可以超过定金膨胀
    if (fieldName == 'firstMoney' && val) {
      if (record.presellPrice && val >= record.presellPrice) {
        val = '';
        failTip(`${sldComLanguage('预售定金必须小于预售价格')}`);
      }else if (record.firstExpand && val >= record.firstExpand) {
        val = '';
        failTip(`${sldComLanguage('预售定金必须小于定金膨胀金额')}`);
      }else if(!record.presellPrice && !record.firstExpand && val >= record.productPrice){
        val = '';
        failTip(`${sldComLanguage('预售定金必须小于商品价格')}`);
      }
    }

    //定金膨胀不可以超过预售价格，但是要大于预售定金
    if(fieldName == 'firstExpand' && val){
      if (record.firstMoney && val <= record.firstMoney) {
        val = '';
        failTip(`${sldComLanguage('定金膨胀必须大于预售定金')}`);
      }else if(record.presellPrice && val >= record.presellPrice){
        val = '';
        failTip(`${sldComLanguage('定金膨胀必须小于预售价格')}`);
      }else if(!record.presellPrice && !record.firstExpand && val >= record.productPrice){
        val = '';
        failTip(`${sldComLanguage('定金膨胀必须小于商品价格')}`);
      }
    }

    let { selectedRows } = this.state;
    let tar_sku_list = selectedRows.filter(item => item.goodsId == record.goodsId);
    if (tar_sku_list.length > 0) {
      let tar_data = tar_sku_list[0].seckillProductVOList.filter(item => item.productId == record.productId);
      if (tar_data.length > 0) {
        tar_data[0][fieldName] = val;
        this.setState({ selectedRows }, () => {
          sthis.props.form.resetFields(['presellStock' + record.productId, 'presellPrice' + record.productId, 'firstMoney' + record.productId, 'firstExpand' + record.productId, 'state' + record.productId, 'firstMoney' + record.productId, 'firstExpand' + record.productId]);
        });
      }
    }
  }

  handleFieldBlur(val, fieldName, record){
    this.handleFiledContent(val.target.value*1,fieldName, record);
  }

  //spec_data_table 表格编辑事件
  handleFieldChange(val, fieldName, record) {
    if(fieldName == 'firstExpand'&&!val){
      sthis.props.form.resetFields(['firstExpand' + record.productId]);
      return false;
    }
    this.handleFiledContent(val, fieldName, record);
  }

  //获取预售详情
  get_detail = (id) => {
    const { dispatch } = this.props;
    let { detail, selectedRows, selectedRowKeys,query } = this.state;
    dispatch({
      type: 'promotion/get_presale_detail',
      payload: { presellId: id },
      callback: (res) => {
        if (res.state == 200) {
          detail = res.data;
          let goodsInfo = detail.goodsList;
          goodsInfo.map(item=>{
            selectedRowKeys.push(item.goodsId);
            let seckillProductVOList = [];
            item.productList.map(child=>{
              seckillProductVOList.push({
                goodsId:item.goodsId,
                productId:child.productId,
                productPrice:child.productPrice,
                productStock:child.stock,
                specValues:child.specValues,
                presellPrice:child.presellPrice,
                presellStock:child.presellStock,
                firstMoney:child.firstMoney,
                firstExpand:child.firstExpand*1,
                state:1,
              });
            })
            selectedRows.push({
              goodsId:item.goodsId,
              goodsPrice:item.goodsPrice,
              goodsImage:item.goodsImage,
              goodsName:item.goodsName,
              seckillProductVOList:seckillProductVOList,
            });
          });

          this.sele_more_goods.ids = [...selectedRowKeys];
          this.sele_more_goods.info = JSON.parse(JSON.stringify(selectedRows));
          if(query.tar == 'copy'){
              //复制功能需要部分内容
              detail.presellName = '';//清空活动名称
              //清空活动时间
              detail.startTime = '';
              detail.endTime = '';
              //清空发货时间
              detail.deliverTime = '';
              if(query.type == 1){
                //定金预售清空尾款时间
                detail.remainStartTime = '';
                detail.remainEndTime = '';
              }
          }
          this.setState({
            detail,
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys,
          });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //获取活动场次
  get_activity_stage = (id) => {
    const { dispatch } = this.props;
    let { activity_stages } = this.state;
    dispatch({
      type: 'promotion/get_activity_stage',
      payload: { presellId: id, pageSize: list_com_page_more },
      callback: (res) => {
        if (res.state == 200) {
          activity_stages = res.data.list;
        }
        this.setState({ activity_stages });
      },
    });
  };

  //获取活动标签
  get_activity_label = () => {
    const { dispatch } = this.props;
    let { activity_labels } = this.state;
    dispatch({
      type: 'promotion/get_activity_label_presale',
      payload: { pageSize: list_com_page_more },
      callback: (res) => {
        if (res.state == 200) {
          activity_labels = res.data
        }
        this.setState({ activity_labels });
      },
    });
  };

  handleSelectRows = (rows, rowkeys) => {
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
    });
  };

  //保存并新增事件
  handleSaveAllData = () => {
    const { dispatch } = this.props;
    const { query, selectedRows } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {}
        if (values.remainStart) {
          params.startTime = values.remainStart[0] ? values.remainStart[0].format(dateTimeFormat) : '';
          params.endTime = values.remainStart[1] ? values.remainStart[1].format(dateTimeFormat) : '';
          values.remainStart = '';
        }
        let dis_type = '';
        params.presellId = query.id;// 预售活动id
        params.presellName = values.presellName
        params.presellLabelId = values.presellLabelId
        params.buyLimit = values.buyLimit
        if (values.remain) {
          params.remainStartTime = values.remain[0] ? values.remain[0].format(dateTimeFormat) : '';
          params.remainEndTime = values.remain[1] ? values.remain[1].format(dateTimeFormat) : '';
          values.remain = '';
        }
        if (values.deliverTime) {
          params.deliverTime = values.deliverTime.format(dateTimeFormat);
        }

        if(query.type == 1){
          //定金预售
          //定金开始时间必须小于结束时间
          if(Date.parse(params.startTime) >= Date.parse(params.endTime)){
            failTip(`${sldComLanguage('定金开始时间必须小于结束时间')}`);
            return false;
          }

          //尾款开始时间必须小于结束时间
          if(Date.parse(params.remainStartTime) >= Date.parse(params.remainEndTime)){
            failTip(`${sldComLanguage('尾款开始时间必须小于结束时间')}`);
            return false;
          }

          if(Date.parse(params.remainStartTime) <= Date.parse(params.endTime)){
            //尾款开始时间必须大于定金结束时间
            failTip(`${sldComLanguage('尾款开始时间必须大于定金结束时间')}`);
            return false;
          }
          if(Date.parse(params.deliverTime) < Date.parse(params.remainEndTime)){
            //发货时间不能小于尾款结束时间
            failTip(`${sldComLanguage('发货时间不能小于尾款结束时间')}`);
            return false;
          }
        }else{
          //全款预售
          //活动开始时间必须小于结束时间
          if(Date.parse(params.startTime) >= Date.parse(params.endTime)){
            failTip(`${sldComLanguage('活动开始时间必须小于结束时间')}`);
            return false;
          }
          if(Date.parse(params.deliverTime) < Date.parse(params.endTime)){
            //发货时间不能小于活动结束时间
            failTip(`${sldComLanguage('发货时间不能小于活动结束时间')}`);
            return false;
          }
        }
        params.goodsInfoList = [];
        params.type = query.type*1;
        let joined_sku_array = [];
        selectedRows.map((item) => {
          item.seckillProductVOList.map((child) => {
            if (child.state == 1) {
              joined_sku_array.push({
                productId: child.productId,
                presellPrice: child.presellPrice,
                presellStock: child.presellStock,
                firstMoney: child.firstMoney,
                firstExpand: child.firstExpand,
              });
            }
          });
        });
        if (joined_sku_array.length == 0) {
          failTip(`${sldComLanguage('请选择要参与活动的商品')}`);
          return false;
        }
        let goodsList = JSON.stringify(joined_sku_array)
        params.goodsList = goodsList
        delete params.goodsInfoList
        dis_type = 'promotion/add_presale_activity';
        if (query.id != undefined && query.id > 0 && query.tar == 'edit') {
          params.presellId = query.id;// 活动id
          dis_type = 'promotion/edit_presale_activity';
        }
        sthis.setState({ loading: true });
        dispatch({
          type: dis_type,
          payload: params,
          callback: (res) => {
            sthis.setState({ loading: false });
            if (res.state == 200) {
              sucTip(res.msg);
              setTimeout(() => {
                sthis.props.history.goBack();
              }, 500);
            } else {
              failTip(res.msg);
            }
          },
        });
      }
    },
    );
  };

  sldHandleCancle = () => {
    this.setState({ modalVisibleGoods: false });
  };

  //商品多选-回调事件
  seleGoods = (selectedRowsP, selectedRowKeysP) => {
    let { selectedRows, selectedRowKeys } = this.state;
    selectedRowsP.map(item => {
      item.seckillProductVOList.map((child_item) => {
        child_item.goodsId = item.goodsId;
        child_item.state = 1;
      });
    });

    //如果多次选择的话，数据要保留之前的
    selectedRowKeys.map((item) => {
      if (selectedRowKeysP.indexOf(item) > -1) {
        let pre_item_data = selectedRows.filter(val => val.goodsId == item)[0];
        for (let i = 0; i < selectedRowsP.length; i++) {
          if (selectedRowsP[i].goodsId == item) {
            selectedRowsP[i] = { ...pre_item_data };
            break;
          }
        }
      }
    });

    this.sele_more_goods.ids = [...selectedRowKeysP];
    this.sele_more_goods.info = JSON.parse(JSON.stringify(selectedRowsP));
    this.setState({
      selectedRows: selectedRowsP,
      selectedRowKeys: selectedRowKeysP,
    });
    this.sldHandleCancle();
  };

  //删除添加的商品spu
  delSpu = (goodsId) => {
    let { selectedRows, selectedRowKeys } = this.state;
    selectedRows = selectedRows.filter(item => item.goodsId != goodsId);
    selectedRowKeys = selectedRowKeys.filter(item => item != goodsId);
    this.sele_more_goods.ids = [...selectedRowKeys];
    this.sele_more_goods.info = JSON.parse(JSON.stringify(selectedRows));
    this.setState({ selectedRows, selectedRowKeys });
  };

  addGoods = () => {
    this.setState({ modalVisibleGoods: true });
  };

  render() {
    const { loading, detail, modalVisibleGoods, Pagetitle, activity_labels, columns_spec, selectedRows, battchVal, columns_spec_all, query,compensateRate } = this.state;
    let {
      form: { getFieldDecorator },
    } = this.props;
    const disabledDate = (currentDate) => currentDate && currentDate < moment().subtract(1, 'days');
    return (
      <div
        className={`${promotion.full_activity} ${promotion.seckill} ${global.common_page} ${global.com_flex_column}`}
        style={{ position: 'relative' }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', Pagetitle, 0, 0, 10)}
        {getSldHorLine(1)}
        <Spin spinning={loading}>
          <Form layout="inline">
            <Scrollbars
              autoHeight
              autoHeightMin={100}
              autoHeightMax={document.body.clientHeight - 165}>
              <div className={`${global.goods_sku_tab} ${global.add_goods_wrap}`}>
                {/* 基本信息-start */}
                <div>
                  {query.type == 2&&getSldEmptyH(10)}
                  {query.type == 1
                    ?<div className={`${global.flex_row_start_center} ${promotion.add_new}`} style={{marginTop:10}}>
                      <span style={{fontSize:14,color:'#333',marginLeft:10,lineHeight:14}}>{sldComLanguage('活动基本信息')}</span>
                      <span style={{ color: 'gray', fontSize: '12px', paddingLeft: '10px' }}>{sldComLanguage('温馨提示：若因商家问题导致无法发货，需要对会员进行赔偿，赔偿金额为定金的')}{compensateRate}{sldComLanguage('倍。')}</span>
                    </div>
                    :sldCommonTitleByBg(`${sldComLanguage('活动基本信息')}`)
                  }
                  <div className={`${promotion.full_acm_activity} ${global.flex_column_start_start}`}>
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动名称')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={sldComLanguage('最多输入20个字')}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('presellName', {
                            initialValue: detail.presellName, rules: [{
                              required: true,
                              whitespace: true,
                              message: `${sldComLanguage('请输入活动名称')}`,
                            }],
                          })(
                            <Input maxLength={20} style={{ width: 400 }} placeholder={`${sldComLanguage('请输入活动名称')}`} />,
                          )}
                        </FormItem>

                      </div>
                    </div>
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动标签')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem>
                          {getFieldDecorator('presellLabelId', {
                           initialValue: detail.presellLabelId?detail.presellLabelId:undefined,
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请选择活动标签')}`,
                            }],
                          })(
                            <Select placeholder={`${sldComLanguage('请选择活动标签')}`}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    style={{ width: 300 }}
                            >
                              {activity_labels.map((item, index) => {
                                return <Option key={index}
                                  value={item.presellLabelId}>{item.presellLabelName}</Option>;
                              })}
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    {query.type == 1 && <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('定金时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('请设置定金的支付时间')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('remainStart', {
                            initialValue: detail.startTime != undefined && detail.startTime
                              ? [moment(detail.startTime, dateTimeFormat), moment(detail.endTime, dateTimeFormat)]
                              : '', rules: [{
                                required: true,
                                message: `${sldComLanguage('请选择定金时间')}`,
                              }],
                          })(
                            <RangePicker
                              disabledDate={disabledDate}
                              style={{ width: 400 }}
                              placeholder={[`${sldComLanguage('开始时间')}`, `${sldComLanguage('结束时间')}`]}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm:00"
                              getCalendarContainer={(triggerNode)=>{
                                return triggerNode.parentNode
                              }}
                            />,
                          )}
                        </FormItem>
                      </div>
                    </div>}

                    {query.type == 2 && <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('设置活动时间')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('remainStart', {
                            initialValue: detail.startTime != undefined && detail.startTime
                              ? [moment(detail.startTime, dateTimeFormat), moment(detail.endTime, dateTimeFormat)]
                              : '', rules: [{
                                required: true,
                                message: `${sldComLanguage('请选择活动时间')}`,
                              }],
                          })(
                            <RangePicker
                              disabledDate={disabledDate}
                              style={{ width: 400 }}
                              placeholder={[`${sldComLanguage('开始时间')}`, `${sldComLanguage('结束时间')}`]}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm:00"
                              getCalendarContainer={(triggerNode)=>{
                                return triggerNode.parentNode
                              }}
                            />,
                          )}
                        </FormItem>
                      </div>
                    </div>}

                    {query.type == 1 && <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('尾款时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('请设置尾款的支付时间')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('remain', {
                            initialValue: detail.remainStartTime != undefined && detail.remainStartTime
                              ? [moment(detail.remainStartTime, dateTimeFormat), moment(detail.remainEndTime, dateTimeFormat)]
                              : '', rules: [{
                                required: true,
                                message: `${sldComLanguage('请选择尾款时间')}`,
                              }],
                          })(
                            <RangePicker
                              disabledDate={disabledDate}
                              style={{ width: 400 }}
                              placeholder={[`${sldComLanguage('开始时间')}`, `${sldComLanguage('结束时间')}`]}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm:00"
                              getCalendarContainer={(triggerNode)=>{
                                return triggerNode.parentNode
                              }}
                            />,
                          )}
                        </FormItem>
                      </div>
                    </div>}
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('发货时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={query.type ==1?`${sldComLanguage('请设置具体的发货时间，若因商家未在约定时间内发货，导致买家退款，商家需退还定金并赔偿买家定金金额的')}${compensateRate}${sldComLanguage('倍。')}`:`${sldComLanguage('请设置具体的发货时间')}`}
                          style={{ width: 400 }}
                        >
                          {getFieldDecorator('deliverTime', {
                            initialValue:detail.deliverTime != undefined && detail.deliverTime?moment(detail.deliverTime, dateTimeFormat):'', rules: [{
                              required: true,
                              message: `${sldComLanguage('请选择发货时间')}`,
                            }]
                          })(
                            <DatePicker
                              disabledDate={disabledDate}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm:00"
                              style={{ width: '100%' }} placeholder={`${sldComLanguage('请选择发货时间')}`}
                              getCalendarContainer={(triggerNode)=>{
                                return triggerNode.parentNode
                              }}
                            />,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('限购件数')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('每位会员限制购买的件数，0代表不限制件数')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('buyLimit', {
                            initialValue: detail.buyLimit,
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请输入限购件数')}`,
                            }],
                          })(
                            <InputNumber min={0} max={9999} style={{ width: 300 }} placeholder={`${sldComLanguage('请输入限购件数')}`} /> ,
                          )}
                        </FormItem>

                      </div>
                    </div>
                  </div>
                </div>
                {/* 基本信息-end */}

                {getSldEmptyH(10)}
                <div className={`${global.flex_row_start_center} ${promotion.add_new}`}>
                  {sldIconBtn(() => this.addGoods(), `${sldComLanguage('选择商品')}`, 7, 7)}
                  <span style={{ color: 'gray', fontSize: '12px', paddingLeft: '10px' }}>{sldComLanguage('预售商品规则：')}{query.type == 1?`${sldComLanguage('预付定金不能大于预售价，预售价不能大于商品原价')}`:`${sldComLanguage('预售价不能大于商品原价')}`}</span>
                </div>
                <Form onSubmit={(e) => this.handleSaveAllData()} layout="inline">
                  {selectedRows.map((item, index) => {
                    return <div key={index} className={`${promotion.sele_goods}`}>
                      <img onClick={() => this.delSpu(item.goodsId)} className={promotion.del_spu}
                        src={require('../../../assets/del_seckill_goods.png')} />
                      <div className={`${promotion.goods_info} ${global.flex_row_between_start}`}>
                        <div className={`${promotion.goods_info_left} ${global.flex_row_start_start}`}>
                          <div className={`${promotion.goods_img_wrap} ${global.flex_row_center_center}`}>
                            <img className={`${promotion.goods_img}`} src={item.goodsImage} />
                          </div>
                          <p className={`${promotion.goods_name}`}>{item.goodsName}</p>
                        </div>
                        <div className={`${promotion.goods_info_right} ${global.flex_row_end_end}`}>
                          <Popconfirm
                            title={<InputNumber
                              min={0.01}
                              max={9999999}
                              precision={2}
                              style={{ width: '100%' }}
                              value={battchVal}
                              placeholder={sldComLanguage('批量设置预售价')}
                              onChange={e => this.handleFieldBattchChange(e, 'presellPrice', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'presellPrice', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('设置预售价')}</div>
                          </Popconfirm>
                          {query.type == 1 && <Popconfirm
                            title={<InputNumber
                              min={1}
                              max={99999999}
                              precision={0}
                              style={{ width: '100%' }}
                              value={battchVal}
                              placeholder={sldComLanguage('批量设置定金')}
                              onChange={e => this.handleFieldBattchChange(e, 'firstMoney', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'firstMoney', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('设置定金')}</div>
                          </Popconfirm>}
                          {query.type == 1 && <Popconfirm
                            title={<InputNumber
                              min={1}
                              max={99999999}
                              precision={0}
                              style={{ width: '100%' }}
                              value={battchVal}
                              placeholder={sldComLanguage('批量设置膨胀金')}
                              onChange={e => this.handleFieldBattchChange(e, 'firstExpand', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'firstExpand', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('设置膨胀')}</div>
                          </Popconfirm>}

                          <Popconfirm
                            title={<InputNumber
                              min={1}
                              max={99999999}
                              precision={0}
                              style={{ width: '100%' }}
                              value={battchVal}
                              placeholder={sldComLanguage('批量设置预售库存')}
                              onChange={e => this.handleFieldBattchChange(e, 'presellStock', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'presellStock', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('设置预售库存')}</div>
                          </Popconfirm>
                          <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}><Checkbox
                            onChange={(e) => {
                              this.setAll(e, item);
                            }}><span className={`${promotion.sel_all}`}>{sldComLanguage('全部参与')}</span></Checkbox></div>
                        </div>
                      </div>
                      <Scrollbars autoHeight
                        autoHeightMax={300}>
                        <Table rowKey={'productId'} pagination={false} columns={query.type == 1 ? columns_spec : columns_spec_all}
                          dataSource={item.seckillProductVOList} size={'small'} />
                      </Scrollbars>
                    </div>;
                  })}
                </Form>
              </div>

              <div className={global.m_diy_bottom_wrap}
                style={{ position: 'fixed', left: this.props.global.collapsed ? 90 : 160 }}>
                <div onClick={() => this.props.history.goBack()} className={global.add_goods_bottom_btn}>
                  {sldComLanguage('返回')}
                </div>
                <div onClick={() => this.props.form.submit(this.handleSaveAllData)}
                  className={`${global.add_goods_bottom_btn} ${global.add_goods_bottom_btn_sel}`}>
                  {sldComLanguage('保存')}
                </div>
              </div>
            </Scrollbars>
          </Form>
        </Spin>

        {/*商品多选的modal框-start*/}
        <SldSelMoreLeftRightPresaleGoods selectedRows={this.sele_more_goods.info}
          selectedRowKeys={this.sele_more_goods.ids}
          modalVisible={modalVisibleGoods} width={1000}
          height={document.body.clientHeight - 400}
          sldHandleSeleMoreModalCancle={this.sldHandleCancle} seleSvideo={this.seleGoods}
          title={`${sldComLanguage('请选择商品(至少选择一个)')}`} extra={this.sele_more_goods} />
        {/*商品多选的modal框-end*/}
      </div>
    );
  }
};
