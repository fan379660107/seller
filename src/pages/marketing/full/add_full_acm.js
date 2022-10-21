/*
* 满优惠——添加满减活动
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Spin, Input, DatePicker, InputNumber, Checkbox } from 'antd';
import {
  failTip,
  sucTip,
  sldLlineRtextAddGoodsAddMargin,
  sldComLanguage,
  getSldHorLine,
  sldCommonTitleByBg,
  dateTimeFormat,
  getSldEmptyH,
} from '@/utils/utils';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelGoodsSingleDiy from '@/components/SldSelGoodsSingleDiy';
import moment from 'moment';

let sthis = '';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
@connect(({ promotion, global }) => ({
  promotion, global,
}))
@Form.create()
export default class AddFullAcm extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      sel_goods: {},//选择的赠品信息
      sel_voucher: {},//选择的优惠券信息
      link_type: '',
      loading: false,
      query: props.location.query,
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      detail: {},//活动详情数据
      viewFlag: props.location.query.tar != undefined && props.location.query.tar == 'view' ? true : false,//查看标识
    };
  }

  componentDidMount() {
    const { query } = this.state;
    if (query.id != undefined && query.id > 0) {
      this.get_detail(query.id);
    }
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
  }

  componentWillUnmount() {
  }

  //获取满减详情
  get_detail = async (id) => {
    const { dispatch } = this.props;
    let { detail,sel_goods,sel_voucher } = this.state;
    dispatch({
      type: 'promotion/get_full_acm_detail',
      payload: { fullId: id },
      callback: async (res) => {
        if (res.state == 200) {
          detail = res.data;
          //初始化选中的优惠券数据
          if (detail.couponList != null && detail.couponList.length != undefined && detail.couponList.length > 0) {
            sel_voucher = detail.couponList[0];
          }
          //初始化选中的商品数据
          if (detail.giftList != null && detail.giftList.length != undefined && detail.giftList.length > 0) {
            sel_goods = detail.giftList[0];
          }
          this.setState({
            detail,sel_goods,sel_voucher
          });
        } else {
          failTip(res.msg);
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

//保存并新增事件
  handleSaveAllData = () => {
    const { dispatch } = this.props;
    const { query, sel_goods, sel_voucher } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          //活动时间处理
          if (values.activityTime) {
            values.startTime = values.activityTime[0] ? values.activityTime[0].format(dateTimeFormat) : '';
            values.endTime = values.activityTime[1] ? values.activityTime[1].format(dateTimeFormat) : '';
            delete values.activityTime;
          }
          //活动开始时间必须小于结束时间
          if(Date.parse(values.startTime) > Date.parse(values.endTime)){
            failTip(`${sldComLanguage('活动开始时间必须小于结束时间')}`);
            return false;
          }

          //优惠券id
          values.sendCouponIds = sel_voucher.couponId != undefined && sel_voucher.couponId > 0 ? sel_voucher.couponId : '';
          //商品id
          values.sendGoodsIds = sel_goods.goodsId != undefined && sel_goods.goodsId > 0 ? sel_goods.goodsId : '';

          //优惠内容必填
          if(!(values.minusValue*1||values.sendCouponIds||values.sendGoodsIds)){
            failTip('请设置优惠内容～');
            return false;
          }
          //满减内容必须小于优惠门槛
          if(values.minusValue>=values.fullValue){
            failTip('优惠内容金额必须小于优惠门槛金额');
            return;
          }
          sthis.setState({ loading: true });
          let dis_type = '';
          if (query.id != undefined && query.id > 0 && query.tar == 'edit') {
            //编辑满减
            values.fullId = query.id;
            dis_type = 'promotion/edit_full_acm';
          } else {
            //新增满减
            dis_type = 'promotion/add_full_acm';
          }
          dispatch({
            type: dis_type,
            payload: values,
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

  //送优惠券事件
  handleVoucher = (e) => {
    if (e.target.checked) {
      this.setState({ link_type: 'voucher' });
    } else {
      this.setState({
        sel_voucher: {},
      });
    }
  };

  //送赠品事件
  handleGoods = (e) => {
    if (e.target.checked) {
      this.setState({ link_type: 'goods' });
    } else {
      this.setState({
        sel_goods: {},
      });
    }
  };

  resetSel = (type) => {
    this.setState({ link_type: type });
  };

  //选择商品或者优惠券取消事件
  sldHandleLinkCancle = () => {
    let { link_type } = this.state;
    if (link_type == 'goods') {
      this.props.form.resetFields(['sendGoodsIds']);
    } else if (link_type == 'voucher') {
      this.props.form.resetFields(['sendCouponIds']);
    }
    this.setState({ link_type: '' });
  };

  //商品或优惠券选中事件
  seleSku = (val) => {
    let { link_type, sel_goods, sel_voucher } = this.state;
    if (link_type == 'goods') {
      sel_goods = val;
    } else if (link_type == 'voucher') {
      sel_voucher = val;
    }
    this.setState({ link_type: '', sel_goods, sel_voucher });
  };

  render() {
    const { loading, detail, link_type, sel_goods, sel_voucher,viewFlag } = this.state;
    let {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={`${promotion.full_activity} ${global.common_page} ${global.com_flex_column}`}
           style={{ position: 'relative' }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('满减活动')}`, 0, 0, 10)}
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
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动名称')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('最多输入20个字')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('fullName', {
                            initialValue: detail.fullName, rules: [{
                              required: true,
                              whitespace: true,
                              message: `${sldComLanguage('请输入活动名称')}`,
                            }],
                          })(
                            <Input maxLength={20} disabled={viewFlag} style={{ width: 400 }} placeholder={`${sldComLanguage('请输入活动名称')}`}/>,
                          )}
                        </FormItem>
                      </div>
                    </div>


                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('活动时间')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('活动时间不可与其他活动重叠')}`}
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
                              disabled={viewFlag}
                              disabledDate={(current)=> current< moment().startOf('day')}
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
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('优惠门槛')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('以元为单位，设置使用该活动的最低金额')}`}
                        >
                          {getFieldDecorator('fullValue', {
                            initialValue: detail.fullValue, rules: [{
                              required: true,
                              message: `${sldComLanguage('请输入优惠门槛')}`,
                            }],
                          })(
                            <InputNumber disabled={viewFlag} style={{ width: 145 }} min={1} max={9999999} precision={2}/>,
                          )}
                        </FormItem>
                      </div>
                    </div>

                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('优惠内容')}
                      </div>
                      <div className={`${promotion.right} ${global.flex_column_start_start}`}>
                        <FormItem
                          style={{ width: 300 }}
                          extra={`${sldComLanguage('以元为单位，满足优惠门槛后可以享受优惠的金额')}`}
                        >
                          <span
                            style={{ marginRight: 10 }}>{sldComLanguage('减')}</span>{getFieldDecorator('minusValue', { initialValue: detail.minusValue })(
                          <InputNumber disabled={viewFlag} style={{ width: 100 }} min={0} max={detail.fullValue-0.01} precision={2}/>,
                        )}<span style={{ marginLeft: 10 }}>{sldComLanguage('元')}{detail.fullValue}</span>
                        </FormItem>

                        {getSldEmptyH(10)}
                        <FormItem
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('sendCouponIds', { initialValue: sel_voucher.couponId != undefined && sel_voucher.couponId?true:false,valuePropName: 'checked', })(
                            <Checkbox
                              disabled={viewFlag}
                              onChange={(e) => this.handleVoucher(e)}
                            >
                              {sldComLanguage('送优惠券')}
                            </Checkbox>,
                          )}
                          {sel_voucher.couponId != undefined && sel_voucher.couponId && !viewFlag &&
                          <span className={`${promotion.reset_sel}`}
                                onClick={() => this.resetSel('voucher')}>{sldComLanguage('重新选择')}</span>
                          }
                        </FormItem>
                        {sel_voucher.couponId != undefined && sel_voucher.couponId &&
                        <div className={`${promotion.sel_goods} ${global.flex_column_start_start}`}>
                          <div className={`${global.flex_row_start_center}`}><span
                            className={`${promotion.sel_tip}`}>{sldComLanguage('您已选择如下优惠券：')}</span></div>
                          <div className={`${promotion.goods_info} ${global.flex_row_start_center}`}>
                            <div className={`${promotion.left} ${global.flex_row_center_center}`}><img
                              src={require('../../../assets/voucher.png')}/></div>
                            <div className={`${global.flex_column_between_start}`}>
                              <span className={`${promotion.goods_name}`}>{sldComLanguage('优惠券')}</span>
                              <span className={`${promotion.goods_price}`}>{sel_voucher.couponName}</span>
                            </div>
                          </div>
                        </div>
                        }
                        {getSldEmptyH(10)}
                        <FormItem
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('sendGoodsIds', { initialValue: sel_goods.goodsId != undefined && sel_goods.goodsId?true:false ,valuePropName: 'checked',})(
                            <Checkbox
                              disabled={viewFlag}
                              onChange={(e) => this.handleGoods(e)}
                            >
                              {sldComLanguage('送赠品')}
                            </Checkbox>,
                          )}
                          {sel_goods.goodsId != undefined && sel_goods.goodsId && !viewFlag &&
                          <span className={`${promotion.reset_sel}`}
                                onClick={() => this.resetSel('goods')}>{sldComLanguage('重新选择')}</span>
                          }
                        </FormItem>
                        {sel_goods.goodsId != undefined && sel_goods.goodsId &&
                        <div className={`${promotion.sel_goods} ${global.flex_column_start_start}`}>
                          <div className={`${global.flex_row_start_center}`}><span
                            className={`${promotion.sel_tip}`}>{sldComLanguage('您已选择如下赠品：')}</span></div>
                          <div className={`${promotion.goods_info} ${global.flex_row_start_center}`}>
                            <div className={`${promotion.left} ${global.flex_row_center_center}`}><img
                              src={sel_goods.mainImgUrl || sel_goods.goodsImage}/></div>
                            <div className={`${global.flex_column_between_start}`}>
                              <span className={`${promotion.goods_name}`}>{sldComLanguage('赠品')}</span>
                              <span className={`${promotion.goods_price}`}>{sel_goods.goodsName}</span>
                            </div>
                          </div>
                        </div>
                        }
                      </div>
                    </div>

                  </div>
                </div>
                {/* 基本信息-end */}
              </div>
              {getSldEmptyH(15)}
              <div className={global.m_diy_bottom_wrap}
                   style={{ position: 'fixed', left: this.props.global.collapsed ? 90 : 160 }}>
                <div onClick={() => this.props.history.goBack()} className={global.add_goods_bottom_btn}>
                  {sldComLanguage('返回')}
                </div>
                {!viewFlag &&
                <div onClick={() => this.props.form.submit(this.handleSaveAllData)}
                     className={`${global.add_goods_bottom_btn} ${global.add_goods_bottom_btn_sel}`}>
                  {sldComLanguage('保存')}
                </div>
                }
              </div>
            </Scrollbars>
          </Form>
        </Spin>
        <SldSelGoodsSingleDiy link_type={link_type}
                              seleSku={this.seleSku}
                              sldHandleCancle={this.sldHandleLinkCancle}
                              client={'mobile'}
                              params={{isVirtualGoods:1}}
        />
      </div>
    );
  }
};
