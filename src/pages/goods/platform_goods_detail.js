import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Empty, Form, Spin, Modal, Button, InputNumber, Radio, Select } from 'antd';
import {
  failTip,
  sucTip,
  sldComLanguage,
  sldLlineRtextAddGoods,
  sldIconBtnBg,
  getSldHorLine,
  sldSvgIcon,
  list_com_page_more,
} from '@/utils/utils';
import global from '@/global.less';
import goods from '@/assets/css/goods.less';
import { Scrollbars } from 'react-custom-scrollbars';
import router from 'umi/router';
import Slider from 'react-slick';
import promotion from '@/assets/css/promotion.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
@connect(({ product, global }) => ({
  product, global,
}))
@Form.create()
export default class PlatformGoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '',//弹框标题
      initLoading: false,
      id: props.location.query.id,//商品id
      detail: {},//平台商品资料详情
      selectedGoodsId: [],//选中的sku id数组
      bigImg: '',//大图
      optSuccess: false,//将商品添加成功标识
      modalVisible: false,//显示弹框标识
      submiting: false,//modal框确认按钮
      expressFeeType: 1,//运费类型 1为固定运费 2为运费模板
      addType: true,//操作类型  true-上架到店铺，false-添加到仓库
      maxChangeValue: 9999999.98,//价格变化最大值
    };
  }

  transport_lists = [];//运费模版

  componentDidMount() {
    this.get_detail();
  }

  //获取运费模板列表
  get_transport_lists = async () => {
    const { dispatch } = this.props;
    let dis_type = 'common/get_transport_lists';
    let payload = { pageSize: list_com_page_more };
    await dispatch({
      type: dis_type,
      payload: payload,
      callback: (res) => {
        if (res.state == 200) {
          this.transport_lists = res.data.list;
        }
      },
    });
  };

  get_detail = () => {
    const { dispatch } = this.props;
    let { detail, id, selectedGoodsId, bigImg, initLoading, maxChangeValue } = this.state;
    this.setState({ initLoading: true });
    dispatch({
      type: 'product/get_platform_goods_detail',
      payload: { platformGoodsId: id },
      callback: (res) => {
        if (res.state == 200) {
          selectedGoodsId = [];
          detail = res.data;
          detail.productList.map(item => {
            selectedGoodsId.push(item.platformProductId);
          });
          bigImg = detail.imageList[0];
          if (detail.maxPrice) {
            maxChangeValue = (9999999.99 - detail.maxPrice).toFixed(2);
          } else {
            maxChangeValue = (9999999.99 - detail.minPrice).toFixed(2);
          }
        } else {
          failTip(res.msg);
        }
        initLoading = false;
        this.setState({ detail, selectedGoodsId, bigImg, initLoading, maxChangeValue });
      },
    });
  };

  //添加商品  type为导入状态，true-上架到店铺，false-添加到仓库
  add = async (type) => {
    let { modalTitle } = this.state;
    if (this.transport_lists.length == 0) {
      await this.get_transport_lists();
    }
    modalTitle = type ? sldComLanguage('上架到店铺') : sldComLanguage('添加到仓库');
    this.setState({ modalVisible: true, modalTitle, addType: type });
  };

  //继续添加商品
  goToAdd = () => {
    router.replace('/goods/goods_import_to_platform');
  };

  //展示当前商品图片
  showCurImg = (index) => {
    const { detail } = this.state;
    this.setState({ bigImg: detail.imageList[index] });
  };

  //规格选择事件
  specSel = (sku_id) => {
    let { selectedGoodsId, detail } = this.state;
    if (selectedGoodsId.indexOf(sku_id) > -1) {
      if (selectedGoodsId.length == 1) {
        failTip(`${sldComLanguage('至少选择一个规格')}～`);
      } else {
        selectedGoodsId = selectedGoodsId.filter(item => item != sku_id);
      }
    } else {
      selectedGoodsId.push(sku_id);
    }
    this.setState({ selectedGoodsId, detail });
  };

  //运费类型
  handleExpressFeeType = (e) => {
    this.setState({ expressFeeType: e.target.value });
  };

  //modal弹框取消事件
  sldCancle = () => {
    this.setState({ modalVisible: false, expressFeeType: 1 });
    this.props.form.resetFields();
  };

  //modal弹框确定事件
  sldConfirm = (e) => {
    const { dispatch } = this.props;
    let { detail, selectedGoodsId, addType, optSuccess } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.importState = addType;//导入状态，true-上架到店铺，false-添加到仓库
        values.platformGoodsId = detail.platformGoodsId;//平台库商品id
        values.platformProductIds = selectedGoodsId.join(',');//平台库货品id集合,用英文逗号隔开
        if (!values.changeValue) {
          delete values.changeValue;
          delete values.changeType;
        }
        delete values.expressFeeType;
        this.setState({ submiting: true });
        dispatch({
          type: 'product/import_platform_goods',
          payload: values,
          callback: async (res) => {
            if (res.state == 200) {
              sucTip(res.msg);
              optSuccess = true;
              this.sldCancle();
            } else {
              failTip(res.msg);
            }
            this.setState({ submiting: false, optSuccess });
          },
        });
      }
    });
  };

  //调整价格类型变化
  handlePriceType = (e) => {
    let { detail, maxChangeValue } = this.state;
    switch (e) {
      case 1:
        if (detail.maxPrice) {
          maxChangeValue = (9999999.99 - detail.maxPrice).toFixed(2);
        } else {
          maxChangeValue = (9999999.99 - detail.minPrice).toFixed(2);
        };
        break;
      case 2:
        maxChangeValue = (detail.minPrice - 0.01).toFixed(2);
        break;
      case 3:
        if (detail.maxPrice) {
          maxChangeValue = (9999999.99 / detail.maxPrice).toFixed(2);
        } else {
          maxChangeValue = (9999999.99 / detail.minPrice).toFixed(2);
        };
        break;
      case 4:
        maxChangeValue = (detail.minPrice / 0.01).toFixed(2);
        break;
    }
    this.setState({ maxChangeValue });
  };

  render() {
    const { initLoading, detail, selectedGoodsId, bigImg, optSuccess, modalTitle, modalVisible, submiting, expressFeeType, maxChangeValue } = this.state;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    let { form: { getFieldDecorator } } = this.props;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        <div className={global.flex_com_space_between} style={{ marginBottom: 10 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('商品资料导入')}`)}
          {sldIconBtnBg(() => this.goToAdd(), 'fanhui', `${sldComLanguage('返回上级页面')}`, '#fff', 7, 0, 15, 15, 5)}
        </div>
        {getSldHorLine(1)}
        <Spin spinning={initLoading}>
          <Scrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={document.body.clientHeight - 125}>
            <div className={`${global.flex_row_center_start} ${goods.platform_goods_detail}`}>
              <div className={`${global.flex_column_start_start} ${goods.content}`}>
                <div className={`${global.flex_row_start_start}`}>
                  <div className={`${global.flex_column_start_start} ${goods.top_left}`}>
                    <div className={`${global.flex_row_center_center} ${goods.main_img}`}>
                      <img src={bigImg}/>
                    </div>
                    <div
                      className={`${goods.small_img} ${detail.imageList != undefined && detail.imageList.length > 5 ? null : global.flex_row_start_start}`}>
                      {detail.imageList != undefined && detail.imageList.length > 5
                        ? <Slider {...settings}>
                          {detail.imageList != undefined && detail.imageList.map((item, index) => {
                            return <div key={index} className={`${goods.item} ${global.flex_row_center_center}`}
                                        onMouseOver={() => this.showCurImg(index)}>
                              <img src={item}/>
                            </div>;
                          })}
                        </Slider>
                        : detail.imageList != undefined && detail.imageList.map((item, index) => {
                        return <div key={index} className={`${goods.item} ${global.flex_row_center_center}`}
                                    onMouseOver={() => this.showCurImg(index)}>
                          <img src={item}/>
                        </div>;
                      })
                      }
                    </div>
                  </div>
                  <div className={`${global.flex_column_start_start} ${goods.top_right}`}>
                    <p className={goods.name}>{detail.goodsName}</p>
                    <p className={goods.desc}>{detail.goodsBrief}</p>
                    <div className={`${global.flex_column_start_start} ${goods.spec}`}>
                      <div className={`${global.flex_row_start_center} ${goods.price}`} style={{
                        backgroundImage: 'url(' + require('@/assets/goods/price_bg.png') + ')',
                      }}>
                        <span className={goods.tip}>{sldComLanguage('价格')}：</span>
                        <div className={goods.price_detail}>
                          <span className={goods.unit}>{sldComLanguage('¥')}</span>
                          <span className={goods.number}>{detail.minPrice && detail.minPrice.toFixed(2)}</span>
                          {detail.maxPrice &&
                          <Fragment>
                            <span className={goods.from_to}>～</span>
                            <span className={goods.unit}>{sldComLanguage('¥')}</span>
                            <span className={goods.number}>{detail.maxPrice.toFixed(2)}</span>
                          </Fragment>
                          }
                        </div>
                      </div>
                      <div className={`${global.flex_row_start_start} ${goods.spec_detail}`}>
                        <span className={goods.tip}>{sldComLanguage('规格')}：</span>
                        <div className={`${global.flex_row_start_start}`} style={{ flexWrap: 'wrap', marginLeft: -10 }}>
                          {detail.productList != undefined && detail.productList.map(item => {
                            return <div key={item.platformProductId}
                                        className={`${global.flex_row_center_center} ${goods.spec_item} ${selectedGoodsId.indexOf(item.platformProductId) > -1 ? goods.selected_spec_item : null}`}
                                        onClick={() => this.specSel(item.platformProductId)}>
                              <span className={goods.spec_name}>{item.specValues}</span>
                              <span
                                className={goods.spec_price}>¥{item.productPrice && item.productPrice.toFixed(2)}</span>
                              <div
                                className={`${goods.selected_spec_item_icon} ${selectedGoodsId.indexOf(item.platformProductId) > -1 ? goods.selected_spec_item : null}`}>
                                {sldSvgIcon('#FE7F2D', 16, 16, 'xuanzhongjiaobiao')}
                              </div>
                            </div>;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={`${global.flex_row_start_start}`} style={{ marginBottom: 30 }}>
                      {optSuccess
                        ? <a className={`${global.flex_row_center_center} ${goods.add_to_store}`}
                             onClick={() => this.goToAdd()}>{sldComLanguage('继续添加商品')}</a>
                        : <Fragment>
                          <a className={`${global.flex_row_center_center} ${goods.add_to_store}`}
                             onClick={() => this.add(true)}>{sldComLanguage('上架到店铺')}</a>
                          <a className={`${global.flex_row_center_center} ${goods.add_to_storage}`}
                             onClick={() => this.add(false)}>{sldComLanguage('添加到仓库')}</a>
                        </Fragment>
                      }
                    </div>
                  </div>
                </div>
                <div className={`${goods.body_title}`}>
                  <span className={`${global.flex_row_center_center} ${goods.con}`}>{sldComLanguage('产品介绍')}</span>
                </div>
                <div className={`${goods.body}`}>
                  {detail.goodsDetails != ''
                    ? <div dangerouslySetInnerHTML={{
                      __html: detail.goodsDetails,
                    }}/>
                    : <Empty
                      image={require('@/assets/moudle_disable.png')}
                      imageStyle={{
                        height: 80,
                        marginTop: 90,
                      }}
                      description={
                        <span>{sldComLanguage(`${sldComLanguage('暂无详情')}`)}</span>
                      }
                    >
                    </Empty>
                  }
                </div>
              </div>
            </div>
          </Scrollbars>
        </Spin>
        <Modal
          title={modalTitle}
          width={500}
          visible={modalVisible}
          onOk={this.sldConfirm}
          onCancel={this.sldCancle}
          footer={[
            <Button key="back" onClick={this.sldCancle}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldConfirm}>
              {sldComLanguage('确定')}
            </Button>,
          ]}
        >
          <div className={`${global.goods_sku_tab} ${global.add_goods_wrap} ${promotion.full_activity}`}
               style={{ marginBottom: 15 }}>
            <Fragment>
              <div className={`${promotion.full_acm_activity} ${global.flex_column_start_start}`}>
                <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                  <div className={`${promotion.left}`} style={{ width: 140 }}>
                    {sldComLanguage('价格变动')}
                  </div>
                  <div className={`${promotion.right} ${global.flex_column_start_start}`}>
                    <div>
                      <FormItem
                        style={{ width: 245, marginRight: 0 }}
                        extra={`${'最大值为：'}${maxChangeValue}，${sldComLanguage('商品为多规格商品时，价格变动对所有sku有同等影响。')}`}
                      >
                        <div className={global.flex_row_start_center}>
                          {getFieldDecorator('changeType', {
                            initialValue: 1, rules: [{
                              required: true,
                              message: `${sldComLanguage('请输入')}`,
                            }],
                          })(
                            <Select
                              style={{ width: 100 }}
                              placeholder={''}
                              onSelect={(e) => this.handlePriceType(e)}
                            >
                              <Option key={1} value={1}>+</Option>
                              <Option key={2} value={2}>-</Option>
                              <Option key={3} value={3}>*</Option>
                              <Option key={4} value={4}>/</Option>
                            </Select>,
                          )}
                          <div style={{ marginLeft: 8 }}>
                            {getFieldDecorator('changeValue')(
                              <InputNumber max={maxChangeValue} min={0.01} precision={2} style={{ width: 140 }}
                                           placeholder={``}/>,
                            )}
                          </div>
                        </div>
                      </FormItem>
                    </div>
                  </div>
                  {/*<div className={`${promotion.right}`}>*/}
                  {/*  <FormItem*/}
                  {/*    style={{ width: 140, marginLeft: 5 }}*/}
                  {/*  >*/}
                  {/*    <div className={global.flex_row_start_center}>*/}
                  {/*      {getFieldDecorator('changeValue')(*/}
                  {/*        <InputNumber max={maxChangeValue} min={0.01} precision={2} style={{ width: 140 }}*/}
                  {/*                     placeholder={``}/>,*/}
                  {/*      )}*/}
                  {/*    </div>*/}
                  {/*  </FormItem>*/}
                  {/*</div>*/}
                </div>
                <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                  <div className={`${promotion.left}`} style={{ width: 140 }}>
                    <span style={{ color: 'red' }}>*</span>{sldComLanguage('库存')}
                  </div>
                  <div className={`${promotion.right}`}>
                    <FormItem
                      style={{ width: 245 }}
                      extra={`${sldComLanguage('商品为多规格商品时，多个sku的库存将被设置为同一库存值')}`}
                    >
                      {getFieldDecorator('productStock', {
                        rules: [{
                          required: true,
                          message: `${sldComLanguage('请输入库存')}`,
                        }],
                      })(
                        <InputNumber max={99999999} min={1} precision={0} style={{ width: 245 }}
                                     placeholder={`${sldComLanguage('请输入库存')}`}/>,
                      )}
                    </FormItem>
                  </div>
                </div>
                {detail.isVirtualGoods == 1 &&
                <Fragment>
                  <div className={`${promotion.item} ${global.flex_row_start_center}`}>
                    <div className={`${promotion.left}`} style={{ width: 140 }}>
                      <span style={{ color: 'red' }}>*</span>{sldComLanguage('运费类型')}
                    </div>
                    <div className={`${promotion.right}`}>
                      <FormItem
                        style={{ width: 245 }}
                      >
                        {getFieldDecorator('expressFeeType', {
                          initialValue: 1,
                        })(
                          <RadioGroup size={'small'} onChange={(e) => this.handleExpressFeeType(e)}>
                            <Radio value={1}>{sldComLanguage('固定运费')}</Radio>
                            <Radio value={2}>{sldComLanguage('运费模板')}</Radio>
                          </RadioGroup>,
                        )}
                      </FormItem>
                    </div>
                  </div>
                  {expressFeeType == 1
                    ? <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`} style={{ width: 140 }}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('固定运费')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          style={{ width: 245 }}
                        >
                          {getFieldDecorator('freightFee', {
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请输入固定运费')}`,
                            }],
                          })(
                            <InputNumber max={99999999} min={0} precision={0} style={{ width: 245 }}
                                         placeholder={`${sldComLanguage('请输入固定运费')}`}/>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                    : <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`} style={{ width: 140 }}>
                        <span style={{ color: 'red' }}>*</span>{sldComLanguage('运费模板')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          style={{ width: 245 }}
                        >
                          {getFieldDecorator('freightId', {
                            rules: [{
                              required: true,
                              message: `${sldComLanguage('请选择运费模板')}`,
                            }],
                          })(
                            <Select
                              style={{ width: 245 }}
                              placeholder={sldComLanguage('请选择运费模板')}
                              onSelect={null}
                            >
                              {this.transport_lists.map(item => {
                                return <Option key={item.freightTemplateId}
                                               value={item.freightTemplateId}>{item.templateName}</Option>;
                              })}
                            </Select>,
                          )}
                        </FormItem>
                      </div>
                    </div>
                  }
                </Fragment>
                }
              </div>
            </Fragment>
          </div>
        </Modal>
      </div>
    );
  }
}
