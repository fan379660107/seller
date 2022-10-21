/*
* 导入商城商品
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Form,
  Spin,
  Select,
  Table,
  InputNumber,
  Switch,
  Checkbox,
  Popconfirm,
  Radio, TreeSelect, Input,
} from 'antd';
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
  showMoreHelpTip,
} from '@/utils/utils';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelMoreLeftRightGoods from '@/components/SldSelMoreLeftRightGoods';

let sthis = '';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ point, global, common }) => ({
  point, global, common,
}))
@Form.create()
export default class SelectMallGoods extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;
    this.state = {
      convert_rate: 0,//兑换比例
      battchVal: '',//批量设置里面的值
      point_label_list: [],//积分标签列表
      loading: false,
      modalVisibleGoods: false,
      query: props.location.query,
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      detail: {},//活动详情数据
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
          title: 'SKU规格',
          dataIndex: 'specValues',
          align: 'center',
          width: 100,
          render: (text, record, index) => {
            return text ? text : `${sldComLanguage('默认')}`;
          },
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('商品原价(¥)')}
          </div>,
          dataIndex: 'productPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`productPrice${record.productId}`, {
                initialValue: text, rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }, { validator: (rule, value, callback) => sthis.validatorMarketPrice(rule, value, callback, record.cashPrice) }] : [],
              })(
                <InputNumber
                  min={0.01}
                  max={9999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'productPrice', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('积分')}
          </div>,
          dataIndex: 'integralPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`integralPrice${record.productId}`, {
                initialValue: text,
                rules: (record.cashPrice != undefined && record.cashPrice || record.state != 1) ? [{ validator: (rule, value, callback) => sthis.validatorIntegral(rule, value, callback) }] : [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }, { validator: (rule, value, callback) => sthis.validatorIntegral(rule, value, callback) }],
              })(
                <InputNumber
                  min={record.cashPrice != undefined && record.cashPrice ? 0 : 1}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'integralPrice', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
            {sldComLanguage('现金(¥)')}
          </div>,
          dataIndex: 'cashPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`cashPrice${record.productId}`, {
                initialValue: text, rules: (record.integralPrice || record.state != 1) ? [] : [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }],
              })(
                <InputNumber
                  min={record.integralPrice ? 0 : 0.01}
                  max={9999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'cashPrice', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('库存')}
          </div>,
          dataIndex: 'productStock',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`productStock${record.productId}`, {
                initialValue: text, rules: [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }],
              })(
                <InputNumber
                  min={1}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'productStock', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: `${sldComLanguage('重量(KG)')}`,
          dataIndex: 'weight',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('长(CM)')}`,
          dataIndex: 'length',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('宽(CM)')}`,
          dataIndex: 'width',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('高(CM)')}`,
          dataIndex: 'height',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('预警值')}`,
          dataIndex: 'productStockWarning',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`productStockWarning${record.productId}`, {
                initialValue: text,
              })(
                <InputNumber
                  min={0}
                  max={300}
                  precision={0}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'productStockWarning', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: `${sldComLanguage('货号')}`,
          dataIndex: 'productCode',
          align: 'center',
          width: 150,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`productCode${record.productId}`, {
                initialValue: text,
              })(
                <Input
                  maxLength={20}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e.target.value, 'productCode', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: `${sldComLanguage('条形码')}`,
          dataIndex: 'barCode',
          align: 'center',
          width: 150,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`barCode${record.productId}`, {
                initialValue: text,
              })(
                <Input
                  maxLength={30}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e.target.value, 'barCode', record)}
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

  componentDidMount() {
    this.getPointLabels();//获取积分标签列表
    this.get_common_setting();
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
  }

  componentWillUnmount() {
  }

  point_label_lists = [];//积分标签列表
  sel_label_data = [];//选择的积分标签列表
  sele_more_goods = {
    info: [],//选择的商品数组
    ids: [],//选择的商品id数组
    min_num: 1,//最小数量，0为不限制
  };

  //获取系统配置
  get_common_setting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: { str: 'integral_conversion_ratio' },
      callback: (res) => {
        if (res.state == 200) {
          this.setState({ convert_rate: res.data[0].value * 1 });
        }
      },
    });
  };

  //验证商品原价，必须比现金价大才可以
  validatorMarketPrice = (rule, value, callback, cashPrice) => {
    if (value && value <= cashPrice) {
      callback(`${sldComLanguage('应大于现金价')}`);
    }
    callback();
  };

  //验证积分数需为平台设置的兑换比例积分的整数倍
  validatorIntegral = (rule, value, callback) => {
    const { convert_rate } = this.state;
    if (value % convert_rate > 0) {
      callback(`${sldComLanguage('需为')}${convert_rate}${sldComLanguage('的整数倍')}`);
    }
    callback();
  };

  //获取积分标签列表
  getPointLabels = () => {
    const { dispatch } = this.props;
    let { goods_base_data } = this.state;
    let dis_type = 'point/get_point_label_list';
    let payload = { pageSize: list_com_page_more };
    dispatch({
      type: dis_type,
      payload: payload,
      callback: (res) => {
        if (res.state == 200) {
          for (let i in res.data.list) {
            res.data.list[i].key = res.data.list[i].labelId;
            res.data.list[i].value = res.data.list[i].labelId;
            res.data.list[i].title = res.data.list[i].labelName;
            if (res.data.list[i].children != null && res.data.list[i].children.length > 0) {
              res.data.list[i].children.map(item => {
                item.key = item.labelId;
                item.value = item.labelId;
                item.title = item.labelName;
              });
            } else {
              res.data.list[i].disableCheckbox = true;
            }
          }
          this.point_label_lists = res.data.list;
          this.setState({ point_label_list: res.data.list });
        }
      },
    });
  };


  //批量设置
  batchConfirm = (e, type, val) => {
    const { selectedRows, battchVal } = this.state;
    let sku_product_id = [];
    for (let i in selectedRows) {
      if (selectedRows[i].goodsId == val.goodsId) {
        selectedRows[i].productList.map(item => {
          item[type] = battchVal;
          sku_product_id.push(item.productId);
        });
        break;
      }
    }
    this.setState({ selectedRows, battchVal: '' }, () => {
      sku_product_id.map(item => {
        sthis.props.form.resetFields(['integralPrice' + item, 'cashPrice' + item, 'productStock' + item, 'productStockWarning' + item, 'productCode' + item, 'barCode' + item, 'state' + item]);
      });
    });
  };

  //批量设置
  handleFieldBattchChange = (e, type, item) => {
    this.setState({ battchVal: e });
  };

  //全部参与事件
  setAll = (e, val) => {
    let { selectedRows } = this.state;
    let target_data = [];
    for (let i in selectedRows) {
      if (selectedRows[i].goodsId == val.goodsId) {
        selectedRows[i].productList.map(item => {
          target_data.push(item.productId);
          item.state = e.target.checked ? 1 : 0;
        });
        break;
      }
    }
    this.setState({ selectedRows }, () => {
      target_data.map(item => {
        sthis.props.form.resetFields(['state' + item]);
      });
    });
  };

  //spec_data_table 表格编辑事件
  handleFieldChange(val, fieldName, record) {
    let { selectedRows } = this.state;
    let tar_sku_list = selectedRows.filter(item => item.goodsId == record.goodsId);
    if (tar_sku_list.length > 0) {
      let tar_data = tar_sku_list[0].productList.filter(item => item.productId == record.productId);
      if (tar_data.length > 0) {
        tar_data[0][fieldName] = val;
        this.setState({ selectedRows }, () => {
          sthis.props.form.resetFields(['integralPrice' + record.productId, 'cashPrice' + record.productId, 'productStock' + record.productId, 'productStockWarning' + record.productId, 'productCode' + record.productId, 'barCode' + record.productId, 'state' + record.productId]);
        });
      }
    }
  }

  handleSelectRows = (rows, rowkeys) => {
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
    });
  };

//保存并新增事件
  handleSaveAllData = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let params = [];

          selectedRows.map((item) => {
            let joined_sku_array = [];
            item.productList.map((child) => {
              if (child.state == 1) {
                joined_sku_array.push({
                  productId: child.productId,
                  barCode: child.barCode,
                  cashPrice: child.cashPrice,
                  integralPrice: child.integralPrice,
                  marketPrice: child.productPrice,
                  productCode: child.productCode,
                  productStock: child.productStock,
                  productStockWarning: child.productStockWarning,
                });
              }
            });
            if (joined_sku_array.length > 0) {
              params.push({
                goodsId: item.goodsId,
                productList: joined_sku_array,
                labelIds: this.sel_label_data.join(','),
                sellNow: values.sellNow,
              });
            }
          });

          if (params.length == 0) {
            failTip(`${sldComLanguage('请选择要参与活动的商品')}`);
            return false;
          }
          //商品数据-end

          sthis.setState({ loading: true });
          let dis_type = '';
          dis_type = 'point/import_mall_goods';
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
    selectedRowsP.map((item, index) => {
      item.productList.map((child_item) => {
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

  //积分标签选择事件
  handleSelLabel = (value, label, extra) => {
    let tmp_label_ids = [];
    if (value.length > 0) {
      if (extra.allCheckedNodes.length != undefined && extra.allCheckedNodes.length) {
        extra.allCheckedNodes.map(item => {
          if (item.children != undefined && item.children.length) {
            item.children.map(child => {
              let target = child.node != undefined ? child.node.key : child.key;
              tmp_label_ids.push(target);
            });
          } else {
            let target = item.node != undefined ? item.node.key : item.key;
            tmp_label_ids.push(target);
          }
        });
      }
    }
    this.sel_label_data = tmp_label_ids;
  };

  render() {
    const { loading, modalVisibleGoods, point_label_list, columns_spec, selectedRows, battchVal, convert_rate } = this.state;
    let {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div
        className={`${promotion.full_activity} ${promotion.seckill} ${global.common_page} ${global.com_flex_column}`}
        style={{ position: 'relative' }}>
        <Spin spinning={loading}>
          <Scrollbars
            autoHeight
            autoHeightMin={document.body.clientHeight - 200}
            autoHeightMax={document.body.clientHeight - 165}>
            <Form layout="inline">
              <div className={`${global.goods_sku_tab} ${global.add_goods_wrap}`}>
                {/* 基本信息-start */}
                <div>
                  {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('导入商城商品')}`, 0, 0, 10)}
                  {getSldHorLine(1)}
                  {getSldEmptyH(10)}
                  {showMoreHelpTip('', [`${sldComLanguage('积分兑换现金比例为')}${convert_rate} ：1，${sldComLanguage('即')}${convert_rate}${sldComLanguage('积分')} = 1${sldComLanguage('元。')}`, `${sldComLanguage('积分和现金至少设置一项且需大于0，设置积分数需为平台设置的兑换比例积分')}(${convert_rate})${sldComLanguage('的整数倍。')}`, `${sldComLanguage('会员兑换时，可以根据平台设置的积分与现金兑换比例自由选择使用积分数。')}`])}
                  {getSldEmptyH(10)}
                  {sldCommonTitleByBg(`${sldComLanguage('基本信息')}`)}
                  <div className={`${promotion.full_acm_activity} ${global.flex_column_start_start}`}>
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('商品发布')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                        >
                          {getFieldDecorator('sellNow', {
                            initialValue: true,
                          })(
                            <RadioGroup size={'small'}>
                              <Radio value={true}>{sldComLanguage('立即售卖')}</Radio>
                              <Radio value={false}>{sldComLanguage('暂不售卖，放入仓库中')}</Radio>
                            </RadioGroup>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('积分商品标签')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                        >
                          {getFieldDecorator('labelId', {
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请选择积分商品标签')}`,
                            }],
                          })(
                            <TreeSelect
                              style={{ width: 250 }}
                              treeData={point_label_list}
                              treeCheckable={true}
                              treeDefaultExpandAll={true}
                              showCheckedStrategy={'SHOW_PARENT'}
                              placeholder={`${sldComLanguage('请选择积分商品标签')}`}
                              allowClear={true}
                              onChange={this.handleSelLabel}
                              dropdownStyle={{ maxHeight: 300 }}
                              getPopupContainer={triggerNode => triggerNode.parentNode}
                            />,
                          )}
                        </FormItem>
                      </div>
                    </div>

                  </div>
                </div>
                {/* 基本信息-end */}

                {getSldEmptyH(10)}
                <div className={`${global.flex_row_start_center} ${promotion.add_new}`}>
                  {sldIconBtn(() => this.addGoods(), `${sldComLanguage('添加商城商品')}`, 7, 7)}
                  <span className={`${promotion.add_new_tip}`}>{sldComLanguage('提醒：至少添加一个商品')}</span>
                </div>
                {selectedRows.map((item, index) => {
                  return <div key={index} className={`${promotion.sele_goods}`}>
                    <img onClick={() => this.delSpu(item.goodsId)} className={promotion.del_spu}
                         src={require('../../../assets/del_seckill_goods.png')}/>
                    <div className={`${promotion.goods_info} ${global.flex_row_between_start}`}>
                      <div className={`${promotion.goods_info_left} ${global.flex_row_start_start}`}>
                        <div className={`${promotion.goods_img_wrap} ${global.flex_row_center_center}`}>
                          <img className={`${promotion.goods_img}`} src={item.mainImage}/>
                        </div>
                        <p className={`${promotion.goods_name}`}>{item.goodsName}</p>
                      </div>
                      <div className={`${promotion.goods_info_right} ${global.flex_row_end_end}`}>
                        <Popconfirm
                          title={<InputNumber
                            min={1}
                            max={99999999}
                            precision={0}
                            style={{ width: '100%' }}
                            value={battchVal}
                            onChange={e => this.handleFieldBattchChange(e, 'integralPrice', item)}
                          />}
                          onConfirm={(e) => {
                            this.batchConfirm(e, 'integralPrice', item);
                          }}
                        >
                          <div
                            className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('修改积分')}</div>
                        </Popconfirm>
                        <Popconfirm
                          title={<InputNumber
                            min={0.01}
                            max={9999999}
                            precision={2}
                            style={{ width: '100%' }}
                            value={battchVal}
                            onChange={e => this.handleFieldBattchChange(e, 'cashPrice', item)}
                          />}
                          onConfirm={(e) => {
                            this.batchConfirm(e, 'cashPrice', item);
                          }}
                        >
                          <div
                            className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('修改现金')}</div>
                        </Popconfirm>
                        <Popconfirm
                          title={<InputNumber
                            min={1}
                            max={99999999}
                            precision={0}
                            style={{ width: '100%' }}
                            value={battchVal}
                            onChange={e => this.handleFieldBattchChange(e, 'productStock', item)}
                          />}
                          onConfirm={(e) => {
                            this.batchConfirm(e, 'productStock', item);
                          }}
                        >
                          <div
                            className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('修改库存')}</div>
                        </Popconfirm>
                        <Popconfirm
                          title={<InputNumber
                            min={0}
                            max={99999999}
                            precision={0}
                            style={{ width: '100%' }}
                            value={battchVal}
                            onChange={e => this.handleFieldBattchChange(e, 'productStockWarning', item)}
                          />}
                          onConfirm={(e) => {
                            this.batchConfirm(e, 'productStockWarning', item);
                          }}
                        >
                          <div
                            className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('修改预警值')}</div>
                        </Popconfirm>
                        <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}><Checkbox
                          onChange={(e) => {
                            this.setAll(e, item);
                          }}><span className={`${promotion.sel_all}`}>{sldComLanguage('全部参与')}</span></Checkbox></div>
                      </div>
                    </div>
                    <div className={global.add_goods_sku_list}>
                      <Table rowKey={'productId'} pagination={false} columns={columns_spec}
                             dataSource={item.productList}
                             scroll={{ x: 1700, y: 300 }} size={'small'}/>
                    </div>
                  </div>;
                })}
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
            </Form>
          </Scrollbars>
        </Spin>

        {/*商品多选的modal框-start*/}
        <SldSelMoreLeftRightGoods selectedRows={this.sele_more_goods.info}
                                  selectedRowKeys={this.sele_more_goods.ids}
                                  modalVisible={modalVisibleGoods} width={1000}
                                  height={document.body.clientHeight - 400}
                                  sldHandleSeleMoreModalCancle={this.sldHandleCancle} seleSvideo={this.seleGoods}
                                  title={`${sldComLanguage('请选择商品(至少选择一个)')}`} extra={this.sele_more_goods}/>
        {/*商品多选的modal框-end*/}
      </div>
    );
  }
};
