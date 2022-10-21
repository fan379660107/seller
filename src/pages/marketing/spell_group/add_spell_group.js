/*
 * 发布拼团活动
 * */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Form,
  Spin,
  DatePicker,
  Select,
  Table,
  InputNumber,
  Switch,
  Checkbox,
  Popconfirm,
  Input,
} from 'antd';
import {
  failTip,
  sucTip,
  sldLlineRtextAddGoodsAddMargin,
  sldComLanguage,
  getSldHorLine,
  sldCommonTitleByBg,
  dateTimeFormat,
  getSldEmptyH,
  list_com_page_more,
  sldIconBtn,
} from '@/utils/utils';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelMoreLeftRightSeckillGoods from '@/components/SldSelMoreLeftRightSeckillGoods';
import moment from 'moment';

let sthis = '';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ promotion, global }) => ({
  promotion,
  global,
}))
@Form.create()
export default class AddSpellGroup extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;
    this.state = {
      leaderPromotion: 0, //团长优惠是否开启，默认为0 未开启，1为开启
      battchVal: '', //批量设置阶梯价格/折扣的值
      activity_labels: [], //活动标签
      loading: false,
      modalVisibleGoods: false,
      query: props.location.query,
      selectedRows: [],
      selectedRowKeys: [], //selectedRows的key
      detail: {}, //活动详情数据
      // 未开启团长优惠
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
          title: (
            <div style={{ position: 'relative' }}>
              <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
              {sldComLanguage('拼团价(¥)')}
            </div>
          ),
          dataIndex: 'spellPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator(`spellPrice${record.productId}`, {
                initialValue: text,
                rules:
                  record.state == 1
                    ? [
                        {
                          required: true,
                          message: `${sldComLanguage('该项必填')}`,
                        },
                      ]
                    : [],
              })(
                <InputNumber
                  min={0.01}
                  max={9999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'spellPrice', record)}
                />
              )}
            </FormItem>
          ),
        },
        {
          title: (
            <div style={{ position: 'relative' }}>
              <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
              {sldComLanguage('拼团库存')}
            </div>
          ),
          dataIndex: 'spellStock',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator(`spellStock${record.productId}`, {
                initialValue: text,
                rules:
                  record.state == 1
                    ? [
                        {
                          required: true,
                          message: `${sldComLanguage('该项必填')}`,
                        },
                      ]
                    : [],
              })(
                <InputNumber
                  min={1}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'spellStock', record)}
                />
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
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator(`state${record.productId}`, {
                valuePropName: 'checked',
                initialValue: text == 1 ? true : false,
              })(
                <Switch
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e ? 1 : 2, 'state', record)}
                />
              )}
            </FormItem>
          ),
        },
      ], //商品规格表头
    };
  }

  componentDidMount() {
    const { query } = this.state;
    if (query.id != undefined && query.id > 0) {
      this.get_detail(query.id);
    }
    this.get_activity_label();
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
  }

  componentWillUnmount() {}

  sele_more_goods = {
    info: [], //选择的商品数组
    ids: [], //选择的商品id数组
    min_num: 1, //最小数量，0为不限制
  };

  //批量设置
  batchConfirm = (e, type, val) => {
    let { selectedRows, battchVal, leaderPromotion } = this.state;
    let cur_goods = selectedRows.filter(item => item.goodsId == val.goodsId)[0];
    if (!battchVal) {
      return false;
    }
    //数据验证
    for (let i = 0; i < cur_goods.seckillProductVOList.length; i++) {
      let item_data = cur_goods.seckillProductVOList[i];
      let specValuesName = item_data.specValues ? item_data.specValues : sldComLanguage('默认规格');
      if (type == 'spellStock' && battchVal > item_data.productStock) {
        //库存不能超过所有sku里面的最小库存
        battchVal = item_data.productStock;
      }

      if (type == 'spellPrice') {
        //拼团价必须小于原价格
        if (battchVal >= item_data.productPrice) {
          failTip(`${specValuesName}${sldComLanguage('的拼团价必须小于商品原价')}`);
          this.setState({ battchVal: '' });
          return false;
        } else if (
          leaderPromotion == 1 &&
          item_data.leaderPrice &&
          battchVal <= item_data.leaderPrice
        ) {
          //如果开启团长优惠，拼团价必须高于团长优惠价
          failTip(`${specValuesName}${sldComLanguage('的拼团价必须高于团长优惠价')}`);
          this.setState({ battchVal: '' });
          return false;
        }
      }

      if (type == 'leaderPrice') {
        if (item_data.spellPrice && battchVal >= item_data.spellPrice) {
          //团长优惠价必须小于拼团价
          failTip(`${specValuesName}${sldComLanguage('的团长优惠价必须小于拼团价')}`);
          this.setState({ battchVal: '' });
          return false;
        } else if (battchVal >= item_data.productPrice) {
          //团长优惠价必须小于商品原价
          failTip(`${specValuesName}${sldComLanguage('的团长优惠价必须小于商品原价')}`);
          this.setState({ battchVal: '' });
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
        sthis.props.form.resetFields([
          'spellPrice' + item,
          'leaderPrice' + item,
          'spellStock' + item,
          'state' + item,
        ]);
      });
    });
  };

  //批量设置
  handleFieldBattchChange = e => {
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

  handleFieldBlur(val, fieldName, record) {
    this.handleFiledContent(val.target.value * 1, fieldName, record);
  }

  //spec_data_table 表格编辑事件
  handleFieldChange(val, fieldName, record) {
    this.handleFiledContent(val, fieldName, record);
  }

  handleFiledContent(val, fieldName, record) {
    let { leaderPromotion } = this.state;

    //拼团库存不能超过商品库存
    if (fieldName == 'spellStock' && val > record.productStock) {
      val = record.productStock;
    }

    //拼团价必须小于原价格
    if (fieldName == 'spellPrice' && val) {
      if (val >= record.productPrice) {
        val = '';
        failTip(`${sldComLanguage('拼团价必须小于商品原价')}`);
      } else if (leaderPromotion == 1 && record.leaderPrice && val <= record.leaderPrice) {
        //如果开启团长优惠，拼团价必须高于团长优惠价
        val = '';
        failTip(`${sldComLanguage('拼团价必须高于团长优惠价')}`);
      }
    }

    if (fieldName == 'leaderPrice' && val) {
      if (record.spellPrice && val >= record.spellPrice) {
        //团长优惠价必须小于拼团价
        val = '';
        failTip(`${sldComLanguage('团长优惠价必须小于拼团价')}`);
      } else if (val >= record.productPrice) {
        //团长优惠价必须小于商品原价
        val = '';
        failTip(`${sldComLanguage('团长优惠价必须小于商品原价')}`);
      }
    }

    let { selectedRows } = this.state;
    let tar_sku_list = selectedRows.filter(item => item.goodsId == record.goodsId);
    if (tar_sku_list.length > 0) {
      let tar_data = tar_sku_list[0].seckillProductVOList.filter(
        item => item.productId == record.productId
      );
      if (tar_data.length > 0) {
        tar_data[0][fieldName] = val;
        this.setState({ selectedRows }, () => {
          sthis.props.form.resetFields([
            'leaderPrice' + record.productId,
            'spellPrice' + record.productId,
            'state' + record.productId,
            'spellStock' + record.productId,
          ]);
        });
      }
    }
  }

  //获取拼团详情
  get_detail = id => {
    const { dispatch } = this.props;
    let { detail, selectedRows, leaderPromotion, selectedRowKeys, query } = this.state;
    dispatch({
      type: 'promotion/get_spell_group_detail',
      payload: { spellId: id },
      callback: res => {
        if (res.state == 200) {
          detail = res.data;
          leaderPromotion = detail.leaderIsPromotion; //团长是否有优惠
          this.initColumn(leaderPromotion);
          let goodsList = detail.goodsList;
          goodsList.map(item => {
            selectedRowKeys.push(item.goodsId);
            let seckillProductVOList = [];
            item.productList.map(child => {
              seckillProductVOList.push({
                goodsId: item.goodsId,
                productId: child.productId,
                productPrice: child.productPrice,
                productStock: child.stock,
                specValues: child.specValues,
                spellPrice: child.spellPrice,
                spellStock: child.spellStock,
                leaderPrice: child.leaderPrice,
                state: 1,
              });
            });
            selectedRows.push({
              goodsId: item.goodsId,
              goodsImage: item.goodsImage,
              goodsName: item.goodsName,
              seckillProductVOList: seckillProductVOList,
            });
          });

          this.sele_more_goods.ids = [...selectedRowKeys];
          this.sele_more_goods.info = JSON.parse(JSON.stringify(selectedRows));
          if (query.tar == 'copy') {
            //复制功能需要部分内容
            detail.spellName = ''; //清空活动名称
            //清空活动时间
            detail.startTime = '';
            detail.endTime = '';
          }
          this.setState({
            detail,
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys,
            leaderPromotion,
          });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //获取活动标签
  get_activity_label = () => {
    const { dispatch } = this.props;
    let { activity_labels } = this.state;
    dispatch({
      type: 'promotion/get_activity_spell_group_label',
      payload: { pageSize: list_com_page_more },
      callback: res => {
        if (res.state == 200) {
          activity_labels = res.data;
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
    // console.log(selectedRows);
    const { dispatch } = this.props;
    const { query, selectedRows, leaderPromotion } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {};
        //活动时间处理
        if (values.activityTime) {
          params.startTime = values.activityTime[0]
            ? values.activityTime[0].format(dateTimeFormat)
            : '';
          params.endTime = values.activityTime[1]
            ? values.activityTime[1].format(dateTimeFormat)
            : '';
        }
        //活动开始时间必须小于结束时间
        if (Date.parse(params.startTime) >= Date.parse(params.endTime)) {
          failTip(`${sldComLanguage('活动开始时间必须小于结束时间')}`);
          return false;
        }
        //拼团商品
        let goodsList = [];

        selectedRows.map(item => {
          item.seckillProductVOList.map(child => {
            if (child.state == 1) {
              goodsList.push({
                productId: child.productId,
                spellPrice: child.spellPrice,
                leaderPrice:
                  leaderPromotion == 1 ? (child.leaderPrice ? child.leaderPrice : 0.01) : '',
                spellStock: child.spellStock,
              });
            }
          });
        });

        if (goodsList.length == 0) {
          failTip(`${sldComLanguage('请选择要参与活动的商品')}`);
          return false;
        }
        let dis_type = '';
        params.goodsList = JSON.stringify(goodsList);
        params.buyLimit = values.buyLimit; // 活动最大限购数量；0为不限购
        params.cycle = values.cycle; // 成团周期（开团-截团时长），单位：小时
        params.requiredNum = values.requiredNum; // 要求成团人数
        params.spellName = values.spellName; // 拼团活动名称
        params.spellLabelId = values.spellLabelId; // 活动标签id
        params.isSimulateGroup =
          values.isSimulateGroup != undefined && values.isSimulateGroup ? 1 : 0; // 	是否模拟成团(0-关闭/1-开启）
        params.leaderIsPromotion = leaderPromotion; // 团长是否有优惠(0-没有/1-有）
        sthis.setState({ loading: true });
        dis_type = 'promotion/add_spell_group';
        if (query.id != undefined && query.id > 0 && query.tar == 'edit') {
          params.spellId = query.id; // 活动id
          dis_type = 'promotion/edit_spell_group';
        }
        dispatch({
          type: dis_type,
          payload: params,
          callback: res => {
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
    });
  };

  sldHandleCancle = () => {
    this.setState({ modalVisibleGoods: false });
  };

  //商品多选-回调事件
  seleGoods = (selectedRowsP, selectedRowKeysP) => {
    let { selectedRows, selectedRowKeys } = this.state;
    selectedRowsP.map((item, index) => {
      item.seckillProductVOList.map(child_item => {
        child_item.goodsId = item.goodsId;
        child_item.state = 1;
      });
    });

    //如果多次选择的话，数据要保留之前的
    selectedRowKeys.map(item => {
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
  delSpu = goodsId => {
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

  //是否开启团长优惠事件
  handleLeaderPromotion = e => {
    let { leaderPromotion } = this.state;
    leaderPromotion = e.target.checked ? 1 : 0;
    this.initColumn(leaderPromotion);
    this.setState({ leaderPromotion });
  };

  //初始化column，leaderPromotion为true则显示团长优惠价，否则不显示
  initColumn = leaderPromotion => {
    let { columns_spec } = this.state;
    let {
      form: { getFieldDecorator },
    } = this.props;
    columns_spec = columns_spec.filter(item => item.dataIndex != 'leaderPrice');
    if (leaderPromotion) {
      //开启团长优惠，商品信息需要显示团长优惠价
      for (let i = 0; i < columns_spec.length; i++) {
        if (columns_spec[i].dataIndex == 'spellPrice') {
          columns_spec.splice(i + 1, 0, {
            title: (
              <div style={{ position: 'relative' }}>
                <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
                {sldComLanguage('团长优惠价(¥)')}
              </div>
            ),
            dataIndex: 'leaderPrice',
            align: 'center',
            width: 100,
            render: (text, record) => (
              <FormItem style={{ width: '100%' }}>
                {getFieldDecorator(`leaderPrice${record.productId}`, {
                  initialValue: text,
                  rules:
                    record.state == 1
                      ? [
                          {
                            required: true,
                            message: `${sldComLanguage('该项必填')}`,
                          },
                        ]
                      : [],
                })(
                  <InputNumber
                    min={0.01}
                    max={9999999}
                    precision={2}
                    style={{ width: '100%' }}
                    onBlur={e => this.handleFieldBlur(e, 'leaderPrice', record)}
                  />
                )}
              </FormItem>
            ),
          });
          break;
        }
      }
    }
    this.setState({ columns_spec });
  };

  render() {
    const {
      loading,
      detail,
      modalVisibleGoods,
      activity_labels,
      columns_spec,
      selectedRows,
      battchVal,
      leaderPromotion,
    } = this.state;
    const disabledDate = currentDate => currentDate && currentDate < moment().subtract(1, 'days');
    let {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div
        className={`${promotion.full_activity} ${promotion.seckill} ${global.common_page} ${
          global.com_flex_column
        }`}
        style={{ position: 'relative' }}
      >
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('拼团活动')}`, 0, 0, 10)}
        {getSldHorLine(1)}
        <Spin spinning={loading}>
          <Form layout="inline">
            <Scrollbars
              autoHeight
              autoHeightMin={100}
              autoHeightMax={document.body.clientHeight - 160}
            >
              <div className={`${global.goods_sku_tab} ${global.add_goods_wrap}`}>
                {/* 基本信息-start */}
                <div>
                  {getSldEmptyH(10)}
                  {sldCommonTitleByBg(`${sldComLanguage('活动基本信息')}`)}
                  <div
                    className={`${promotion.full_acm_activity} ${global.flex_column_start_start}`}
                  >
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('活动名称')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('最多输入20个字')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('spellName', {
                            initialValue: detail.spellName,
                            rules: [
                              {
                                required: true,
                                whitespace: true,
                                message: `${sldComLanguage('请输入活动名称')}`,
                              },
                            ],
                          })(
                            <Input
                              maxLength={20}
                              style={{ width: 400 }}
                              placeholder={`${sldComLanguage('请输入活动名称')}`}
                            />
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('活动时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem style={{ width: 300 }}>
                          {getFieldDecorator('activityTime', {
                            initialValue:
                              detail.startTime != undefined && detail.startTime
                                ? [
                                    moment(detail.startTime, dateTimeFormat),
                                    moment(detail.endTime, dateTimeFormat),
                                  ]
                                : '',
                            rules: [
                              {
                                required: true,
                                message: `${sldComLanguage('请选择活动时间')}`,
                              },
                            ],
                          })(
                            <RangePicker
                              disabledDate={disabledDate}
                              style={{ width: 400 }}
                              placeholder={[
                                `${sldComLanguage('开始时间')}`,
                                `${sldComLanguage('结束时间')}`,
                              ]}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm:00"
                              getCalendarContainer={triggerNode => {
                                return triggerNode.parentNode;
                              }}
                            />
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('活动标签')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem>
                          {getFieldDecorator('spellLabelId', {
                            initialValue: detail.spellLabelId ? detail.spellLabelId : undefined,
                            rules: [
                              {
                                required: true,
                                message: `${sldComLanguage('请选择活动标签')}`,
                              },
                            ],
                          })(
                            <Select
                              placeholder={`${sldComLanguage('请选择活动标签')}`}
                              style={{ width: 300 }}
                              getPopupContainer={triggerNode => triggerNode.parentNode}
                            >
                              {activity_labels.map((item, index) => {
                                return (
                                  <Option key={index} value={item.spellLabelId}>
                                    {item.spellLabelName}
                                  </Option>
                                );
                              })}
                            </Select>
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('参团人数')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('请填写2～100的数字')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('requiredNum', {
                              initialValue: detail.requiredNum,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请输入参团人数')}`,
                                },
                              ],
                            })(
                              <InputNumber
                                max={100}
                                min={2}
                                precision={0}
                                style={{ width: 70 }}
                                placeholder={``}
                              />
                            )}
                            <span
                              style={{
                                display: 'inline-block',
                                marginLeft: 5,
                                color: 'rgba(0, 0, 0, 0.65)',
                              }}
                            >
                              {sldComLanguage('人')}
                            </span>
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('拼团有效期')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage(
                            '设置拼团的有效时间，用户开团后，需要在设置的时间内拼购指定人数，否则拼团失败'
                          )}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('cycle', {
                              initialValue: detail.cycle,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请输入拼团有效期')}`,
                                },
                              ],
                            })(
                              <InputNumber
                                max={23 * 9}
                                min={1}
                                precision={0}
                                style={{ width: 70 }}
                                placeholder={``}
                              />
                            )}
                            <span
                              style={{
                                display: 'inline-block',
                                marginLeft: 5,
                                color: 'rgba(0, 0, 0, 0.65)',
                              }}
                            >
                              {sldComLanguage('小时')}
                            </span>
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('限购数量')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('每位会员限制购买的数量，0代表不限制')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('buyLimit', {
                              initialValue: detail.buyLimit ? detail.buyLimit : 0,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请输入限购数量')}`,
                                },
                              ],
                            })(
                              <InputNumber
                                max={999}
                                min={0}
                                precision={0}
                                style={{ width: 150 }}
                                placeholder={`${sldComLanguage('请输入限购数量')}`}
                              />
                            )}
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>{sldComLanguage('模拟成团')}</div>
                      <div className={`${promotion.right} ${global.flex_column_start_start}`}>
                        <FormItem
                          style={{ width: 450 }}
                          extra={`${sldComLanguage(
                            '开启模拟成团后，拼团有效期内人数未满的团，可以点击模拟成团按钮，使该团成团。你只需要对已付款参团的真实买家发货。建议合理开启，以提高成团率'
                          )}`}
                        >
                          {getFieldDecorator('isSimulateGroup', {
                            initialValue: detail.isSimulateGroup == 1 ? true : false,
                            valuePropName: 'checked',
                          })(<Checkbox>{sldComLanguage('开启')}</Checkbox>)}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>{sldComLanguage('团长优惠')}</div>
                      <div className={`${promotion.right} ${global.flex_column_start_start}`}>
                        <FormItem
                          style={{ width: 450 }}
                          extra={`${sldComLanguage(
                            '开启团长(开团人)优惠后，团长将享受更优惠价格，有助于提高开团率和成团率。请注意：模拟成团的团长也能享受团长优惠，请谨慎设置，避免资金损失'
                          )}`}
                        >
                          {getFieldDecorator('leaderIsPromotion', {
                            initialValue: leaderPromotion == 1 ? true : false,
                            valuePropName: 'checked',
                          })(
                            <Checkbox onChange={e => this.handleLeaderPromotion(e)}>
                              {sldComLanguage('开启')}
                            </Checkbox>
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 基本信息-end */}

                {getSldEmptyH(10)}
                <div className={`${global.flex_row_start_center} ${promotion.add_new}`}>
                  {sldIconBtn(() => this.addGoods(), `${sldComLanguage('添加活动商品')}`, 7, 7)}
                  <span className={`${promotion.add_new_tip}`}>
                    {sldComLanguage('提醒：已参加活动的商品不可参与该活动')}
                  </span>
                </div>
                <Form onSubmit={e => this.handleSaveAllData()} layout="inline">
                  {selectedRows.map((item, index) => {
                    return (
                      <div key={index} className={`${promotion.sele_goods}`}>
                        <img
                          onClick={() => this.delSpu(item.goodsId)}
                          className={promotion.del_spu}
                          src={require('../../../assets/del_seckill_goods.png')}
                        />
                        <div className={`${promotion.goods_info} ${global.flex_row_between_start}`}>
                          <div
                            className={`${promotion.goods_info_left} ${
                              global.flex_row_start_start
                            }`}
                          >
                            <div
                              className={`${promotion.goods_img_wrap} ${
                                global.flex_row_center_center
                              }`}
                            >
                              <img className={`${promotion.goods_img}`} src={item.goodsImage} />
                            </div>
                            <p className={`${promotion.goods_name}`}>{item.goodsName}</p>
                          </div>
                          <div
                            className={`${promotion.goods_info_right} ${global.flex_row_end_end}`}
                          >
                            <Popconfirm
                              title={
                                <InputNumber
                                  min={0.01}
                                  max={9999999}
                                  precision={2}
                                  style={{ width: '100%' }}
                                  value={battchVal}
                                  placeholder={sldComLanguage('批量设置拼团价')}
                                  onChange={e =>
                                    this.handleFieldBattchChange(e, 'spellPrice', item)
                                  }
                                />
                              }
                              onConfirm={e => {
                                this.batchConfirm(e, 'spellPrice', item);
                              }}
                            >
                              <div
                                className={`${promotion.batch_btn} ${
                                  global.flex_row_center_center
                                }`}
                              >
                                {sldComLanguage('设置拼团价')}
                              </div>
                            </Popconfirm>
                            {leaderPromotion == 1 && (
                              <Popconfirm
                                title={
                                  <InputNumber
                                    min={0.01}
                                    max={9999999}
                                    precision={2}
                                    style={{ width: '100%' }}
                                    value={battchVal}
                                    placeholder={sldComLanguage('批量设置团长优惠价')}
                                    onChange={e =>
                                      this.handleFieldBattchChange(e, 'leaderPrice', item)
                                    }
                                  />
                                }
                                onConfirm={e => {
                                  this.batchConfirm(e, 'leaderPrice', item);
                                }}
                              >
                                <div
                                  className={`${promotion.batch_btn} ${
                                    global.flex_row_center_center
                                  }`}
                                >
                                  {sldComLanguage('设置团长优惠价')}
                                </div>
                              </Popconfirm>
                            )}
                            <Popconfirm
                              title={
                                <InputNumber
                                  min={1}
                                  max={99999999}
                                  precision={0}
                                  style={{ width: '100%' }}
                                  value={battchVal}
                                  placeholder={sldComLanguage('批量设置拼团库存')}
                                  onChange={e =>
                                    this.handleFieldBattchChange(e, 'spellStock', item)
                                  }
                                />
                              }
                              onConfirm={e => {
                                this.batchConfirm(e, 'spellStock', item);
                              }}
                            >
                              <div
                                className={`${promotion.batch_btn} ${
                                  global.flex_row_center_center
                                }`}
                              >
                                {sldComLanguage('设置拼团库存')}
                              </div>
                            </Popconfirm>
                            <div
                              className={`${promotion.batch_btn} ${global.flex_row_center_center}`}
                            >
                              <Checkbox
                                onChange={e => {
                                  this.setAll(e, item);
                                }}
                              >
                                <span className={`${promotion.sel_all}`}>
                                  {sldComLanguage('全部参与')}
                                </span>
                              </Checkbox>
                            </div>
                          </div>
                        </div>
                        <Scrollbars autoHeight autoHeightMax={300}>
                          <Table
                            rowKey={'productId'}
                            pagination={false}
                            columns={columns_spec}
                            dataSource={item.seckillProductVOList}
                            size={'small'}
                          />
                        </Scrollbars>
                      </div>
                    );
                  })}
                </Form>
              </div>
              {getSldEmptyH(15)}
              <div
                className={global.m_diy_bottom_wrap}
                style={{ position: 'fixed', left: this.props.global.collapsed ? 90 : 160 }}
              >
                <div
                  onClick={() => this.props.history.goBack()}
                  className={global.add_goods_bottom_btn}
                >
                  {sldComLanguage('返回')}
                </div>
                <div
                  onClick={() => this.props.form.submit(this.handleSaveAllData)}
                  className={`${global.add_goods_bottom_btn} ${global.add_goods_bottom_btn_sel}`}
                >
                  {sldComLanguage('保存')}
                </div>
              </div>
            </Scrollbars>
          </Form>
        </Spin>

        {/*商品多选的modal框-start*/}
        <SldSelMoreLeftRightSeckillGoods
          selectedRows={this.sele_more_goods.info}
          selectedRowKeys={this.sele_more_goods.ids}
          modalVisible={modalVisibleGoods}
          width={1000}
          height={document.body.clientHeight - 400}
          sldHandleSeleMoreModalCancle={this.sldHandleCancle}
          seleSvideo={this.seleGoods}
          title={`${sldComLanguage('请选择商品(只能选择一个)')}`}
          extra={this.sele_more_goods}
        />
        {/*商品多选的modal框-end*/}
      </div>
    );
  }
}
