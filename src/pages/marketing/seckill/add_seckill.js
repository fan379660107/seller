/*
* 参加秒杀活动
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Spin, DatePicker, Select, Table, InputNumber, Switch, Tooltip, Checkbox, Popconfirm, Icon } from 'antd';
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
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelMoreLeftRightSeckillGoods from '@/components/SldSelMoreLeftRightSeckillGoods';
import moment from 'moment';

let sthis = '';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ promotion, global }) => ({
  promotion, global,
}))
@Form.create()
export default class AddSecill extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;
    this.state = {
      battchVal: '',//批量设置里面的值
      activity_stages: [],//活动场次
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
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('秒杀价')}
          </div>,
          dataIndex: 'seckillPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`seckillPrice${record.productId}`, {
                initialValue: text,
                rules: record.state == 1?[{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }]:[],
              })(
                <InputNumber
                  min={0.01}
                  max={9999999}
                  precision={2}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'seckillPrice', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>{sldComLanguage('秒杀库存')}
          </div>,
          dataIndex: 'seckillStock',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`seckillStock${record.productId}`, {
                initialValue: text,
                rules: record.state == 1?[{
                  required: true,
                  message: `${sldComLanguage('该项必填')}`,
                }]:[],
              })(
                <InputNumber
                  min={1}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'seckillStock', record)}
                />,
              )}
            </FormItem>
          ),
        },
        {
          title: <div style={{ position: 'relative' }}>
            {sldComLanguage('限购数量')}
            <Tooltip placement="bottomLeft" title={sldComLanguage('限制每个会员ID在本场活动中的购买数量')}>
              <div style={{ right: -15, top: 2, position: 'absolute' }}>{sldSvgIcon('#bfbbba', 14, 14, 'wen')}</div>
            </Tooltip></div>,
          dataIndex: 'upperLimit',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator(`upperLimit${record.productId}`, {
                initialValue: text,
              })(
                <InputNumber
                  min={0}
                  max={99999999}
                  precision={0}
                  style={{ width: '100%' }}
                  onChange={e => this.handleFieldChange(e, 'upperLimit', record)}
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
    const { query } = this.state;
    if (query.id != undefined && query.id > 0) {
      this.get_detail(query.id);
    }
    this.get_activity_stage(query.id);
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
    min_num: 1,//最小数量，0为不限制
  };

  //批量设置
  batchConfirm = (e, type, val) => {
    const { selectedRows, battchVal } = this.state;
    let sku_product_id = [];
    for (let i in selectedRows) {
      if (selectedRows[i].goodsId == val.goodsId) {
        selectedRows[i].seckillProductVOList.map(item => {
          item[type] = battchVal;
          sku_product_id.push(item.productId);
        });
        break;
      }
    }
    this.setState({ selectedRows, battchVal: '' }, () => {
      sku_product_id.map(item=>{
        sthis.props.form.resetFields(['seckillStock'+item,'upperLimit'+item,'seckillPrice'+item,'state'+item]);
      })
    });
  };

  //批量设置
  handleFieldBattchChange = (e, type, item) => {
    //将sku里对应的数据抽成数组，排序，获取最小的值，批量设置的值不能大于最小的值
    let tmp_type_key = type == 'seckillPrice' ? 'productPrice' : 'productStock';
    let typeAarry = [];
    item.seckillProductVOList.map(val => {
      typeAarry.push(val[tmp_type_key]);
    });

    let minVal = typeAarry.sort()[0];
    if (e > minVal) {
      e = minVal;
    }
    this.setState({ battchVal: e });
  };

  //全部参与事件
  setAll = (e, val) => {
    let { selectedRows } = this.state;
    let states = [];
    for (let i in selectedRows) {
      if (selectedRows[i].goodsId == val.goodsId) {
        selectedRows[i].seckillProductVOList.map(item => {
          item.state = e.target.checked ? 1 : 0;
          states.push('state'+item.productId);
        });
        break;
      }
    }
    this.setState({ selectedRows }, () => {
      sthis.props.form.resetFields(states);
    });
  };

  //spec_data_table 表格编辑事件
  handleFieldChange(val, fieldName, record) {
    //秒杀库存和限购数量都不可以超过最大库存
    if ((fieldName == 'seckillStock' || fieldName == 'upperLimit') && val > record.productStock) {
      val = record.productStock;
    }
    //秒杀价格都不可以超过商品价格
    if (fieldName == 'seckillPrice' && val > record.productPrice) {
      val = record.productPrice;
    }
    let { selectedRows } = this.state;
    let tar_sku_list = selectedRows.filter(item => item.goodsId == record.goodsId);
    if (tar_sku_list.length > 0) {
      let tar_data = tar_sku_list[0].seckillProductVOList.filter(item => item.productId == record.productId);
      if (tar_data.length > 0) {
        tar_data[0][fieldName] = val;
        this.setState({ selectedRows }, () => {
          sthis.props.form.resetFields(['seckillStock'+record.productId,'upperLimit'+record.productId,'seckillPrice'+record.productId,'state'+record.productId]);
        });
      }
    }
  }

  //获取秒杀详情
  get_detail = (id) => {
    const { dispatch } = this.props;
    let { detail } = this.state;
    dispatch({
      type: 'promotion/get_seckill_detail',
      payload: { seckillId: id },
      callback: (res) => {
        if (res.state == 200) {
          detail = res.data;
          this.setState({
            detail,
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
      payload: { seckillId: id, pageSize: list_com_page_more },
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
      type: 'promotion/get_activity_label',
      payload: { pageSize: list_com_page_more },
      callback: (res) => {
        if (res.state == 200) {
          activity_labels = res.data.list.filter(item => item.isShow == 1);
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
          //秒杀商品结束时间
          if (values.activityTime) {
            params.endTime = values.activityTime.format(dateTimeFormat);
            delete values.activityTime;
          }
          //秒杀商品
          params.goodsInfoList = [];

          selectedRows.map((item) => {
            let joined_sku_array = [];
            item.seckillProductVOList.map((child) => {
              if (child.state == 1) {
                joined_sku_array.push({
                  productId: child.productId,
                  seckillPrice: child.seckillPrice,
                  seckillStock: child.seckillStock,
                  upperLimit: child.upperLimit != undefined ? child.upperLimit : 0,
                });
              }
            });
            if (joined_sku_array.length > 0) {
              params.goodsInfoList.push({
                goodsId: item.goodsId,
                productInfoList: joined_sku_array,
              });
            }
          });

          if (params.goodsInfoList.length == 0) {
            failTip(`${sldComLanguage('请选择要参与活动的商品')}`);
            return false;
          }
          sthis.setState({ loading: true });
          let dis_type = '';
          params.seckillId = query.id;// 秒杀活动id
          params.labelId = values.labelId;// 活动标签id
          params.stageId = values.stageId;// 秒杀场次id
          dis_type = 'promotion/join_seckill_activity';
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
    const { loading, detail, modalVisibleGoods, activity_stages, activity_labels, columns_spec, selectedRows, battchVal } = this.state;
    let {
      form: { getFieldDecorator },
    } = this.props;
    const disabledDate = (currentDate) => currentDate && currentDate < moment().subtract(1, 'days');
    return (
      <div
        className={`${promotion.full_activity} ${promotion.seckill} ${global.common_page} ${global.com_flex_column}`}
        style={{ position: 'relative' }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('秒杀活动')}`, 0, 0, 10)}
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
                        {sldComLanguage('活动名称')}
                      </div>
                      <div className={`${promotion.right} ${promotion.right_show_content}`}>
                        {detail.seckillName}
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        {sldComLanguage('活动时间')}
                      </div>
                      <div className={`${promotion.right} ${promotion.right_show_content}`}>
                        {detail.startTime} ~ {detail.endTime}
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动场次')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                        >
                          {getFieldDecorator('stageId', {
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请选择活动场次')}`,
                            }],
                          })(
                            <Select placeholder={`${sldComLanguage('请选择活动场次')}`}
                                    style={{ width: 300 }}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                            >
                              {activity_stages.map((item, index) => {
                                return <Option key={index}
                                               value={item.stageId}>{item.stageName}</Option>;
                              })}
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动标签')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                        >
                          {getFieldDecorator('labelId', {
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
                        {sldComLanguage('商品秒杀结束时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('设置后商品的秒杀结束时间以设置时间为准，若未设置秒杀时间，则本场秒杀结束时，商品同时结束秒杀。')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('activityTime')(
                            <DatePicker
                              disabledDate={disabledDate}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm:00"
                              style={{ width: '100%' }} placeholder={`${sldComLanguage('请选择商品秒杀结束时间')}`}
                              getCalendarContainer={(triggerNode)=>{
                                return triggerNode.parentNode
                              }}
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
                  {sldIconBtn(() => this.addGoods(), `${sldComLanguage('添加活动商品')}`, 7, 7)}
                  <span className={`${promotion.add_new_tip}`}>{sldComLanguage('提醒：至少添加一个商品,已参加其他平台活动或其他秒杀场次的商品不可参与该活动')}</span>
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
                        <div className={`${promotion.goods_info_right} ${global.flex_row_end_end}`}>
                          <Popconfirm
                            title={<InputNumber
                              min={0.01}
                              max={9999999}
                              precision={2}
                              style={{ width: '100%' }}
                              value={battchVal}
                              onChange={e => this.handleFieldBattchChange(e, 'seckillPrice', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'seckillPrice', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('批量设置秒杀价')}</div>
                          </Popconfirm>
                          <Popconfirm
                            title={<InputNumber
                              min={1}
                              max={99999999}
                              precision={0}
                              style={{ width: '100%' }}
                              value={battchVal}
                              onChange={e => this.handleFieldBattchChange(e, 'seckillStock', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'seckillStock', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('批量设置秒杀库存')}</div>
                          </Popconfirm>
                          <Popconfirm
                            title={<InputNumber
                              min={0}
                              max={99999999}
                              precision={0}
                              style={{ width: '100%' }}
                              value={battchVal}
                              onChange={e => this.handleFieldBattchChange(e, 'upperLimit', item)}
                            />}
                            onConfirm={(e) => {
                              this.batchConfirm(e, 'upperLimit', item);
                            }}
                          >
                            <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}>{sldComLanguage('批量设置限购数量')}</div>
                          </Popconfirm>
                          <div className={`${promotion.batch_btn} ${global.flex_row_center_center}`}><Checkbox
                            onChange={(e) => {
                              this.setAll(e, item);
                            }}><span className={`${promotion.sel_all}`}>{sldComLanguage('全部参与')}</span></Checkbox></div>
                        </div>
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
                                         title={`${sldComLanguage('请选择商品(至少选择一个)')}`} extra={this.sele_more_goods}/>
        {/*商品多选的modal框-end*/}
      </div>
    );
  }
};
