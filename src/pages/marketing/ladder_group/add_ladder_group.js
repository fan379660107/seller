/*
* 参加阶梯团活动
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
  Input, Radio,
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
  sldSvgIcon,
} from '@/utils/utils';
import { num_to_num } from '@/utils/util_data';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelMoreLeftRightSeckillGoods from '@/components/SldSelMoreLeftRightSeckillGoods';
import moment from 'moment';
import ALibbSvg from '@/components/ALibbSvg';

let sthis = '';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
@connect(({ promotion, global }) => ({
  promotion, global,
}))
@Form.create()
export default class AddLadderGroup extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;
    this.state = {
      discountType: 1,//1为阶梯价格 2为阶梯折扣
      battchVal: '',//批量设置阶梯价格/折扣的值
      activity_labels: [],//活动标签
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
          title: <div style={{ position: 'relative' }}>
            <Checkbox
              onChange={(e) => {
                this.setAll(e);
              }}><span className={`${promotion.sel_all}`}
                       style={{ color: '#333' }}>{sldComLanguage('参与')}</span></Checkbox>
          </div>,
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
    const { query } = this.state;
    if (query.id != undefined && query.id > 0) {
      this.get_detail(query.id);
    }
    this.get_activity_label();
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
  }

  componentWillUnmount() {
  }

  sele_more_goods = {
    info: [],//选择的商品数组
    ids: [],//选择的商品id数组
    total_num: 1,//选择商品的数量
  };

  //处理优惠类型
  handlePromotionType = (e) => {
    if (e.target.value == 1) {
      //阶梯价格
      this.initColumnPrice();
    } else {
      //阶梯折扣
      this.initColumnDiscount();
    }
    this.setState({ discountType: e.target.value });
  };

  initColumnDiscount = () => {
    let { columns_spec, selectedRows } = this.state;
    let { form: { getFieldDecorator } } = this.props;
    columns_spec = columns_spec.filter(item => item.dataIndex.indexOf('ladderPrice') == -1);
    // this.props.form.resetFields(['ladderPrice1','ladderPrice2','ladderPrice3']);
    let tar_index = 4;
    if (selectedRows.length > 0) {
      selectedRows[0].ladder_data.map((item, index) => {
        columns_spec.splice(tar_index, 0, {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
            {sldComLanguage('第')}{item.num}{sldComLanguage('阶梯折扣')}
          </div>,
          dataIndex: 'ladderPrice' + (index + 1),
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator('ladderPrice' + (index + 1) + `_${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }] : [],
              })(
                <InputNumber
                  min={0.1}
                  max={record['ladderPrice' + index] != undefined && record['ladderPrice' + index] ? ((record['ladderPrice' + index] * 1 - 0.1).toFixed(2)) : 9.9}
                  precision={1}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldChange(e, 'ladderPrice' + (index + 1), record)}
                />,
              )}
            </FormItem>
          ),
        });
        tar_index = tar_index + 1;
      });

      selectedRows[0].seckillProductVOList.map((item, index) => {
        item.ladder_data = selectedRows[0].ladder_data;
      });
    }
    this.setState({ columns_spec });
  };


  initColumnPrice = () => {
    let { columns_spec, selectedRows, battchVal } = this.state;
    let { form: { getFieldDecorator } } = this.props;
    columns_spec = columns_spec.filter(item => item.dataIndex.indexOf('ladderPrice') == -1);
    // this.props.form.resetFields(['ladderPrice1','ladderPrice2','ladderPrice3']);
    let tar_index = 4;
    if (selectedRows.length > 0) {
      selectedRows[0].ladder_data.map((item, index) => {
        columns_spec.splice(tar_index, 0, {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
            {sldComLanguage('第')}{item.num}{sldComLanguage('阶梯价格')}
            <Popconfirm
              title={<InputNumber
                val={battchVal}
                min={0.01}
                max={9999999}
                precision={2}
                style={{ width: '100%' }}
                placeholder={'批量设置价格'}
                onChange={e => this.handleFieldBattchChange(e, index)}
              />}
              onConfirm={(e) => {
                this.batchConfirm(e, index);
              }}
            >
              <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>
                <div
                  style={{ right: -15, top: 2, position: 'absolute' }}>{sldSvgIcon('#5586f6', 16, 16, 'bianji2')}</div>
              </div>
            </Popconfirm>
          </div>,
          dataIndex: 'ladderPrice' + (index + 1),
          align: 'center',
          width: 100,
          render: (text, record) => {
            return <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator('ladderPrice' + (index + 1) + `_${record.productId}`, {
                initialValue: text,
                rules: record.state == 1 ? [{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }] : [],
              })(
                <InputNumber
                  min={0.01}
                  max={record['ladderPrice' + index] != undefined && record['ladderPrice' + index] ? ((record['ladderPrice' + index] * 1 - 0.01).toFixed(2)) : ((record.productPrice * 1 - 0.01).toFixed(2))}
                  precision={2}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldChange(e, 'ladderPrice' + (index + 1), record)}
                />,
              )}
            </FormItem>
          },
        });
        tar_index = tar_index + 1;
      });

      selectedRows[0].seckillProductVOList.map((item, index) => {
        item.ladder_data = selectedRows[0].ladder_data;
      });
    }
    this.setState({ columns_spec });
  };

  //批量设置
  batchConfirm = (e, index) => {
    const { selectedRows, battchVal } = this.state;
    let resetFileds = [];
    selectedRows[0].seckillProductVOList.map(item => {
      item['ladderPrice' + (index + 1)] = battchVal;
      resetFileds.push('ladderPrice' + (index + 1) + `_${item.productId}`);
    });
    this.setState({ selectedRows, battchVal: '' }, () => {
      sthis.props.form.resetFields(resetFileds);
    });
  };

  //批量设置
  handleFieldBattchChange = (e) => {
    this.setState({ battchVal: e });
  };

  //全部参与事件
  setAll = (e) => {
    let { selectedRows } = this.state;
    let resetFields = [];
    selectedRows[0].seckillProductVOList.map(item => {
      item.state = e.target.checked ? 1 : 0;
      resetFields.push('state' + item.productId);
    });
    this.setState({ selectedRows }, () => {
      sthis.props.form.resetFields(resetFields);
    });
  };

  //spec_data_table 表格编辑事件
  handleFieldChange(val, fieldName, record) {
    let { selectedRows } = this.state;
    val = val.target!=undefined?val.target.value*1:val*1;
    let tar_data = selectedRows[0].seckillProductVOList.filter(item => item.productId == record.productId);
    if (tar_data.length > 0) {
      tar_data[0][fieldName] = val;
      let resetFiledDatas = [];
      record.ladder_data.map((item, index) => {
        resetFiledDatas.push('ladderPrice' + (index + 1) + '_' + record.productId);
        if(fieldName.indexOf('ladderPrice')>-1&&index>0){
          if(tar_data[0]['ladderPrice' + (index + 1)]!=undefined&&tar_data[0]['ladderPrice' + (index + 1)]){
            if(tar_data[0]['ladderPrice' + (index + 1)]>=tar_data[0]['ladderPrice' + (index)]){
              tar_data[0]['ladderPrice' + (index + 1)] = tar_data[0]['ladderPrice' + (index)]*1-0.01;
            }
          }
        }
      });
      this.setState({ selectedRows:JSON.parse(JSON.stringify(selectedRows)) }, () => {
        sthis.props.form.resetFields([...resetFiledDatas, 'state' + record.productId, fieldName + '_' + record.productId]);
      });
    }
  }

  //获取阶梯团详情
  get_detail = (id) => {
    const { dispatch } = this.props;
    let { detail, selectedRows } = this.state;
    dispatch({
      type: 'promotion/get_ladder_group_detail',
      payload: { groupId: id },
      callback: (res) => {
        if (res.state == 200) {
          detail = res.data;
          //初始化ladder_data数据
          selectedRows.push({
            ladder_data: [],
            seckillProductVOList: [],
            advanceDeposit: detail.goodsInfo.advanceDeposit,
            goodsImage: detail.goodsInfo.goodsImage,
            goodsName: detail.goodsInfo.goodsName,
          });
          detail.ruleList.map(item => {
            selectedRows[0].ladder_data.push({
              num: num_to_num()[item.ladderLevel],
              name: 'ladder_num_' + (item.ladderLevel),
              value: item.joinGroupNum,
            });
          });

          detail.goodsInfo.productList.map(item => {
            let temp = {};
            temp.state = 1;
            temp.productId = item.productId;
            temp.goodsId = item.goodsId;
            temp.productPrice = item.productPrice;
            temp.specValues = item.specValues;
            temp.productStock = item.stock;
            temp.ladderPrice1 = item.ladderPrice1;
            if (item.ladderPrice2 != undefined && item.ladderPrice2) {
              temp.ladderPrice2 = item.ladderPrice2;
            }
            if (item.ladderPrice3 != undefined && item.ladderPrice3) {
              temp.ladderPrice3 = item.ladderPrice3;
            }
            selectedRows[0].seckillProductVOList.push(temp);
          });

          this.setState({
            detail,
            selectedRows,
            discountType: detail.discountType,
          }, () => {
            if (detail.discountType == 1) {
              sthis.initColumnPrice();
            } else {
              sthis.initColumnDiscount();
            }
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
      type: 'promotion/get_activity_ladder_group_label',
      payload: { pageSize: list_com_page_more },
      callback: (res) => {
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
    const { dispatch } = this.props;
    const { query, selectedRows } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let params = {};
          //活动时间处理
          if (values.activityTime) {
            params.startTime = values.activityTime[0] ? values.activityTime[0].format(dateTimeFormat) : '';
            params.endTime = values.activityTime[1] ? values.activityTime[1].format(dateTimeFormat) : '';
            delete values.activityTime;
          }
          //活动开始时间必须小于结束时间
          if (Date.parse(params.startTime) >= Date.parse(params.endTime)) {
            failTip(`${sldComLanguage('活动开始时间必须小于结束时间')}`);
            return false;
          }
          //阶梯团商品
          params.productList = [];

          if (selectedRows.length == 0) {
            failTip(`${sldComLanguage('请选择要参与活动的商品')}`);
            return false;
          }

          let rule_data = [];
          let ladders = selectedRows[0].ladder_data;
          for (let l in ladders) {
            //阶梯人数已经验证过了，不需要再验证了
            rule_data.push({
              joinGroupNum: values[ladders[l].name],
              ladderLevel: l * 1 + 1,
            });
            // if (l > 0 && values[ladders[l].name] * 1 <= values[ladders[l - 1].name] * 1) {
            //   failTip(`第` + num_to_num[l + 1] + '阶梯的人数须大于第' + num_to_num[l] + '阶梯的人数');
            //   return;
            // } else {
            //   rule_data.push({
            //     joinGroupNum: values[ladders[l].name],
            //     ladderLevel: l * 1 + 1,
            //   });
            // }
          }

          let total_ladder = selectedRows[0].ladder_data.length;
          let products = selectedRows[0].seckillProductVOList;
          for (let i in products) {
            if (products[i].state == 1) {
              let product_item = {};
              product_item.advanceDeposit = values.advanceDeposit;
              product_item.productId = products[i].productId;
              for (let j = 0; j < total_ladder; j++) {
                product_item['ladderPrice' + (j + 1)] = products[i]['ladderPrice' + (j + 1)];
              }

              //预付定金必须小于最低优惠价格
              let curLastladderPrice = 0;
              // 阶梯优惠方式：1-阶梯价格；2-阶梯折扣
              if (values.discountType == 1) {
                curLastladderPrice = products[i]['ladderPrice' + total_ladder] * 1;
                if (values.advanceDeposit * 1 >= curLastladderPrice) {
                  failTip(`预付定金须小于最低优惠价，最低优惠价目前是：` + curLastladderPrice + `元`);
                  return;
                }
              } else {
                curLastladderPrice = (products[i]['ladderPrice' + total_ladder] * products[i].productPrice / 10).toFixed(2);
                if (values.advanceDeposit * 1 >= curLastladderPrice) {
                  failTip(`预付定金须小于最低优惠价，最低优惠价目前是：` + products[i]['ladderPrice' + total_ladder] * 1 + `折，` + curLastladderPrice + `元`);
                  return;
                }
              }

              params.productList.push(product_item);
            }
          }
          if(params.productList.length == 0){
            failTip(`${sldComLanguage('请选择参与活动的商品规格')}～`);
            return false;
          }

          params.ruleList = rule_data;

          let dis_type = '';
          params.balanceTime = values.balanceTime;// 尾款时间(活动结束多少小时内需要支付尾款)
          params.buyLimitNum = values.buyLimitNum;// 限购件数，0为不限购
          params.discountType = values.discountType;// 阶梯优惠方式：1-阶梯价格；2-阶梯折扣
          params.groupName = values.groupName;// 阶梯团活动名称
          params.isRefundDeposit = values.isRefundDeposit;// 是否退还定金：1-是；0-否
          params.labelId = values.labelId;// 活动标签id
          sthis.setState({ loading: true });
          dis_type = 'promotion/add_ladder_group';
          if (query.id != undefined && query.id > 0 && query.type == 'edit') {
            params.groupId = query.id;// 活动id
            dis_type = 'promotion/edit_ladder_group';
          }
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
    let { selectedRows, selectedRowKeys, discountType } = this.state;
    selectedRowsP.map((item, index) => {
      item.seckillProductVOList.map((child_item) => {
        child_item.goodsId = item.goodsId;
        child_item.state = 1;
        child_item['ladderPrice1'] = '';
      });
      item.advanceDeposit = '';
      item.ladder_data = [{
        num: '一',
        name: 'ladder_num_1',
        value: '',
      }];
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
    }, () => {
      discountType == 1 ? this.initColumnPrice() : this.initColumnDiscount();
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

  //添加阶梯
  addLadder = (index) => {
    let { selectedRows, discountType } = this.state;
    let cur_data = selectedRows[index].ladder_data;
    let cur_length = cur_data.length;
    cur_data.push({
      num: num_to_num()[cur_length + 1],
      name: 'ladder_num_' + (cur_length + 1),
      value: '',
    });
    selectedRows[index].seckillProductVOList.map((pro_item, pro_index) => {
      pro_item['ladderPrice' + (cur_length + 1)] = '';
    });
    this.setState({ selectedRows }, () => {
      discountType == 1 ? this.initColumnPrice() : this.initColumnDiscount();
    });
  };

  //删除阶梯
  delLadder = (index, ladder_index) => {
    let { selectedRows, discountType } = this.state;
    selectedRows[index].seckillProductVOList.map((pro_item) => {
      pro_item['ladderPrice' + (ladder_index + 1)] = '';
    });
    selectedRows[index].ladder_data = selectedRows[index].ladder_data.filter((item, index) => index != ladder_index);
    //重置form数据
    this.props.form.resetFields(['ladder_num_' + ladder_index]);
    this.setState({ selectedRows: JSON.parse(JSON.stringify(selectedRows)) }, () => {
      discountType == 1 ? this.initColumnPrice() : this.initColumnDiscount();
    });
  };

  //阶梯人数事件
  handleLadderNum = (e, index, ladder_index) => {
    e = e.target.value;
    let { selectedRows } = this.state;
    //需要对每个阶梯做最大值限制
    if (e * 1 > 1000 - (2 - ladder_index * 1)) {
      e = 1000 - (2 - ladder_index * 1);
    }
    selectedRows[index].ladder_data[ladder_index].value = e;
    let resetFields = [];
    selectedRows[index].ladder_data.map(item => {
      resetFields.push(item.name);
    });
    this.setState({ selectedRows: JSON.parse(JSON.stringify(selectedRows)) }, () => {
      this.props.form.resetFields(resetFields);
    });
  };

  render() {
    const { loading, detail, modalVisibleGoods, activity_labels, columns_spec, selectedRows, battchVal } = this.state;
    const disabledDate = (currentDate) => currentDate && currentDate < moment().subtract(1, 'days');
    let {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div
        className={`${promotion.full_activity} ${promotion.seckill} ${global.common_page} ${global.com_flex_column}`}
        style={{ position: 'relative' }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('阶梯团活动')}`, 0, 0, 10)}
        {getSldHorLine(1)}
        <Spin spinning={loading}>
          <Form layout="inline">
            <Scrollbars
              autoHeight
              autoHeightMin={100}
              autoHeightMax={document.body.clientHeight - 160}>
              <div className={`${global.goods_sku_tab} ${global.add_goods_wrap}`}>
                {/* 基本信息-start */}
                <div>
                  {getSldEmptyH(10)}
                  {sldCommonTitleByBg(`${sldComLanguage('活动基本信息')}`)}
                  <div className={`${promotion.full_acm_activity} ${global.flex_column_start_start}`}>
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('活动名称')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('最多输入20个字')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('groupName', {
                            initialValue: detail.groupName, rules: [{
                              required: true,
                              whitespace: true,
                              message: `${sldComLanguage('请输入活动名称')}`,
                            }],
                          })(
                            <Input maxLength={20} style={{ width: 400 }} placeholder={`${sldComLanguage('请输入活动名称')}`}/>,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('活动时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('activityTime', {
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
                              getCalendarContainer={(triggerNode) => {
                                return triggerNode.parentNode;
                              }}
                            />,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('活动标签')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                        >
                          {getFieldDecorator('labelId', {
                            initialValue: detail.labelId?detail.labelId:undefined,
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请选择活动标签')}`,
                            }],
                          })(
                            <Select placeholder={`${sldComLanguage('请选择活动标签')}`}
                                    style={{ width: 300 }}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                            >
                              {activity_labels.map((item, index) => {
                                return <Option key={index}
                                               value={item.labelId}>{item.labelName}</Option>;
                              })}
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('尾款时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('活动结束多少小时内需要支付尾款')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>

                            {getFieldDecorator('balanceTime', {
                              initialValue: detail.balanceTime ? detail.balanceTime : 24, rules: [{
                                required: true,
                                message: `${sldComLanguage('请输入尾款时间')}`,
                              }],
                            })(
                              <InputNumber max={999} min={1} precision={0} style={{ width: 150 }}
                                           placeholder={`${sldComLanguage('请输入尾款时间')}`}/>,
                            )}
                            <span
                              style={{
                                display: 'inline-block',
                                marginLeft: 5,
                                color: 'rgba(0, 0, 0, 0.65)',
                              }}>{sldComLanguage('小时')}</span>
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('限购数量')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('每位会员限制购买的数量，0代表不限制')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>

                            {getFieldDecorator('buyLimitNum', {
                              initialValue: detail.buyLimitNum ? detail.buyLimitNum : 0, rules: [{
                                required: true,
                                message: `${sldComLanguage('请输入限购数量')}`,
                              }],
                            })(
                              <InputNumber max={999} min={0} precision={0} style={{ width: 150 }}
                                           placeholder={`${sldComLanguage('请输入限购数量')}`}/>,
                            )}
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('退还定金')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          style={{ width: 400 }}
                          extra={<div>
                            <div>{sldComLanguage('选择是代表由会员导致的退款退定金，否则不退定金')}</div>
                          </div>}
                        >
                          {getFieldDecorator('isRefundDeposit', {
                            initialValue: detail.isRefundDeposit != undefined ? detail.isRefundDeposit : 1,
                          })(
                            <RadioGroup size={'small'}>
                              <Radio value={1}>{sldComLanguage('是')}</Radio>
                              <Radio value={0}>{sldComLanguage('否')}</Radio>
                            </RadioGroup>,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('阶梯优惠方式')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          style={{ width: 400 }}
                        >
                          {getFieldDecorator('discountType', {
                            initialValue: detail.discountType != undefined ? detail.discountType : 1,
                          })(
                            <RadioGroup size={'small'} onChange={(e) => this.handlePromotionType(e)}>
                              <Radio value={1}>{sldComLanguage('阶梯价格')}</Radio>
                              <Radio value={2}>{sldComLanguage('阶梯折扣')}</Radio>
                            </RadioGroup>,
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
                  <span className={`${promotion.add_new_tip}`}>{sldComLanguage('提醒：已参加活动的商品不可参与该活动')}</span>
                </div>
                <Form onSubmit={(e) => this.handleSaveAllData()} layout="inline">
                  {selectedRows.map((item, index) => {
                    return <div key={index} className={`${promotion.sele_goods}`}>
                      <img onClick={() => this.delSpu(item.goodsId)} className={promotion.del_spu}
                           src={require('../../../assets/del_seckill_goods.png')}/>
                      <div className={`${promotion.goods_info} ${global.flex_row_between_start}`}>
                        <div className={`${promotion.goods_info_left} ${global.flex_row_start_start}`}>
                          <div className={`${promotion.goods_img_wrap} ${global.flex_row_center_center}`}>
                            <img className={`${promotion.goods_img}`} src={item.goodsImage}/>
                          </div>
                          <p className={`${promotion.goods_name}`}>{item.goodsName}</p>
                        </div>
                      </div>
                      <div className={`${global.flex_column_start_start} ${promotion.ladder_part}`}>
                        <div className={`${promotion.deposit_part}`}>

                          <div className={global.flex_row_start_center}>
                          <span
                            style={{
                              display: 'inline-block',
                              marginRight: 5,
                              color: '#333',
                              fontSize: 13,
                            }}><span style={{ color: '#FF1515' }}>*</span>{sldComLanguage('预付定金：')}</span>
                            <FormItem
                              style={{ width: 84 }}
                            >
                              {getFieldDecorator('advanceDeposit', {
                                initialValue: item.advanceDeposit, rules: [{
                                  required: true,
                                  message: `${sldComLanguage('该项必填')}`,
                                }],
                              })(
                                <InputNumber max={1000} min={1} precision={0} style={{ width: 100 }}
                                             placeholder={``}/>,
                              )}
                            </FormItem>
                            <span
                              style={{
                                display: 'inline-block',
                                marginLeft: 5,
                                color: 'rgba(0, 0, 0, 0.65)',
                              }}>{sldComLanguage('元')}</span>
                            <span className={promotion.tip}>
                                预付定金不能大于最小阶梯价格
                              </span>
                          </div>

                        </div>
                        {item.ladder_data.map((item_ladder_num, index_ladder_num) => {
                          return <div key={index_ladder_num} className={`${promotion.ladder_item}`}>
                            <div className={global.flex_row_start_center}>
                              {index_ladder_num == 0 &&
                              <span style={{ color: '#333', fontSize: 13 }}>
                              <span style={{ color: '#FF1515' }}>*</span>
                                {sldComLanguage('参团人数：')}
                              </span>
                              }
                              <span
                                style={{
                                  display: 'inline-block',
                                  marginRight: 5,
                                  color: '#333',
                                  fontSize: 13,
                                  marginLeft: index_ladder_num > 0 ? 70 : 0,
                                }}><span>第{item_ladder_num.num}阶梯</span></span>
                              <FormItem
                                style={{ width: 84 }}
                              >
                                {getFieldDecorator(item_ladder_num.name, {
                                  initialValue: item_ladder_num.value, rules: [{
                                    required: true,
                                    message: `${sldComLanguage('该项必填')}`,
                                  }],
                                })(
                                  <InputNumber max={1000}
                                               min={index_ladder_num == 0 ? 1 : (item.ladder_data[index_ladder_num - 1].value ? (item.ladder_data[index_ladder_num - 1].value * 1 + 1) : 1)}
                                               precision={0} style={{ width: 100 }}
                                               placeholder={``}
                                               onBlur={(e) => this.handleLadderNum(e, index, index_ladder_num)}/>,
                                )}
                              </FormItem>
                              <span
                                style={{
                                  display: 'inline-block',
                                  marginLeft: 5,
                                  color: '#333',
                                  fontSize: 13,
                                }}>{sldComLanguage('人')}</span>
                              {(index_ladder_num == (item.ladder_data.length - 1) && index_ladder_num > 0) &&
                              <div className={promotion.del} onClick={() => this.delLadder(index, index_ladder_num)}>
                                <ALibbSvg fill={'#e20e0e'} width={16} height={16} type={'shanchu7'}/>
                              </div>
                              }
                            </div>
                          </div>;
                        })}
                        {item.ladder_data.length < 3 &&
                        <div className={`${promotion.add_ladder} ${global.flex_row_start_center}`}>
                          <a className={`${global.flex_row_center_center} ${promotion.btn}`}
                             onClick={() => this.addLadder(index)}> 添加阶梯</a>
                          <span className={promotion.tip}>最多添加三级阶梯</span>
                        </div>
                        }
                      </div>
                      <Scrollbars autoHeight
                                  autoHeightMax={300}>
                        <Table rowKey={'productId'} pagination={false} columns={columns_spec}
                               dataSource={item.seckillProductVOList} size={'small'}/>
                      </Scrollbars>
                    </div>;
                  })}
                </Form>
              </div>
              {getSldEmptyH(15)}
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
        <SldSelMoreLeftRightSeckillGoods selectedRows={this.sele_more_goods.info}
                                         selectedRowKeys={this.sele_more_goods.ids}
                                         modalVisible={modalVisibleGoods} width={1000}
                                         height={document.body.clientHeight - 400}
                                         sldHandleSeleMoreModalCancle={this.sldHandleCancle} seleSvideo={this.seleGoods}
                                         title={`${sldComLanguage('请选择商品(只能选择一个)')}`} extra={this.sele_more_goods}/>
        {/*商品多选的modal框-end*/}
      </div>
    );
  }
};
