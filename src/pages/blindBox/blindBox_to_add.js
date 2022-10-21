/*
 * 发布盲盒活动
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
  Upload,
  Button,
  Icon,
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
  sldBeforeUpload,
  getLocalStorageStingVal,
} from '@/utils/utils';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldSelMoreLeftRightSeckillGoods from '@/components/SldSelMoreLeftRightSeckillGoods';
import moment from 'moment';
import { apiUrl } from '@/utils/sldconfig.js';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';
import { log } from 'lodash-decorators/utils';

let sthis = '';
const FormItem = Form.Item;
const Option = Select.Option; //下拉选择器
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ promotion, global }) => ({
  promotion,
  global,
}))
@Form.create()
export default class BlindBoxToAdd extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;
    this.state = {
      probability: [],

      // leaderPromotion:0,//团长优惠是否开启，默认为0 未开启，1为开启
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
              {sldComLanguage('寄售价格(¥)')}
            </div>
          ),
          dataIndex: 'resellPrice',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator(`resellPrice${record.productId}`, {
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
                  onBlur={e => this.handleFieldBlur(e, 'resellPrice', record)}
                />
              )}
            </FormItem>
          ),
        },
        {
          title: (
            <div style={{ position: 'relative' }}>
              <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
              {sldComLanguage('抽取比例(%)')}
            </div>
          ),
          dataIndex: 'blindBoxRatio',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator(`blindBoxRatio${record.productId}`, {
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
                  min={0}
                  max={100}
                  step={0.01}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'blindBoxRatio', record)}
                />
              )}
            </FormItem>
          ),
        },
        // 范建明
        {
          title: (
            <div style={{ position: 'relative' }}>
              <span style={{ color: '#FF2929', fontSize: 13 }}>*</span>
              {sldComLanguage('显示比例(%)')}
            </div>
          ),
          dataIndex: 'displayExtractionRatio',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <FormItem style={{ width: '100%' }}>
              {getFieldDecorator(`displayExtractionRatio${record.productId}`, {
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
                  min={0}
                  max={100}
                  step={0.01}
                  style={{ width: '100%' }}
                  onBlur={e => this.handleFieldBlur(e, 'displayExtractionRatio', record)}
                />
              )}
            </FormItem>
          ),
        },
      ], //商品规格表头
      imgFileList: [],
      classifyList: [], //盲盒分类数据-范建明
      categoryId: '', //选择的盲盒分类id-范建明
    };
  }
  componentDidMount() {
    this.get_blindBox_classify(); //调用获取盲盒分类数据-范建明
    const { query } = this.state;
    if (query.id != undefined && query.id > 0) {
      this.get_detail(query.id);
    }
    // this.get_activity_label();
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
    if (fieldName == 'stockQuantity' && val > record.productStock) {
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
    let tar_data = [];
    if (tar_sku_list.length > 0) {
      if (tar_sku_list[0].blindBoxGoods) {
        tar_data = tar_sku_list[0].blindBoxGoods.filter(item => item.productId == record.productId);
      }
      if (tar_sku_list[0].seckillProductVOList) {
        tar_data = tar_sku_list[0].seckillProductVOList.filter(
          item => item.productId == record.productId
        );
      }

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

  //获取盲盒详情
  get_blindBox_detail = id => {
    const { dispatch } = this.props;
    let { detail, selectedRows, leaderPromotion, selectedRowKeys, query } = this.state;

    dispatch({
      type: 'promotion/get_blindBox_detail',
      payload: { id: id },
      callback: res => {
        if (res.state == 200) {
          detail = res.data;
          // leaderPromotion = detail.leaderIsPromotion;//团长是否有优惠
          this.initColumn(leaderPromotion);
          let list = detail.list;
          list.map(item => {
            selectedRowKeys.push(item.goodsId);
            let blindBoxGoods = [];
            console.log(item, '测试');
            item.seckillProductVOList.map(child => {
              blindBoxGoods.push({
                goodsId: item.goodsId,
                goodsImage: child.goodsImage,
                goodsName: item.goodsName,
                goodsPrice: item.goodsPrice,
                goodsPicture: item.goodsImage,
                resellPrice: child.resellPrice,
                blindBoxRatio: child.blindBoxRatio,
                displayExtractionRatio: child.displayExtractionRatio,
                productId: child.productId,
                state: 1,
              });
            });
            selectedRows.push({
              goodsImage: item.goodsImage,
              goodsName: item.goodsName,
              activityDesc: item.activityDesc,
              activityState: item.activityState,
              goodsPrice: item.goodsPrice,
              goodsStock: item.goodsStock,
              goodsId: item.goodsId,
              blindBoxGoods: item.seckillProductVOList,
            });
          });

          this.sele_more_goods.ids = [...selectedRowKeys];
          this.sele_more_goods.info = JSON.parse(JSON.stringify(selectedRows));
          if (query.tar == 'copy') {
            //复制功能需要部分内容
            detail.blindBoxName = ''; //清空活动名称
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
          // activity_labels = res.data;
          activity_labels = [
            {
              spellLabelId: 2,
              spellLabelName: '进口严选',
            },
            {
              spellLabelId: 3,
              spellLabelName: '国货之光',
            },
            {
              spellLabelId: 4,
              spellLabelName: '拼购好物',
            },
            {
              spellLabelId: 5,
              spellLabelName: '品牌推荐',
            },
          ];
        } else {
        }
        this.setState({ activity_labels });
      },
    });
  };

  //保存并新增事件
  handleSaveAllData = () => {
    const { dispatch } = this.props;
    const { query, selectedRows, leaderPromotion, imgFileList, categoryId } = this.state;
    console.log(this.state);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {};
        console.log(values);
        //盲盒商品
        let blindBoxGoods = [];
        console.log(selectedRows.length);
        selectedRows.map(item => {
          console.log(item);
          // console.log(JSON.parse(JSON.stringify(item)), 'item打印');
          item.seckillProductVOList.map(child => {
            console.log(child + '====child.state');
            // console.log(JSON.parse(JSON.stringify(child)), 'child打印');
            if (1) {
              blindBoxGoods.push({
                goodsId: item.goodsId,
                goodsName: item.goodsName, //商品名称
                categoryId: item.categoryId, //盲盒分类-范建明
                goodsPrice: item.goodsPrice, //商品价格
                goodsPicture: item.goodsImage, //主图的路径
                resellPrice: child.resellPrice, //盲盒商品寄售价格
                blindBoxRatio: child.blindBoxRatio, //商品抽取比例
                displayExtractionRatio: child.displayExtractionRatio, //显示比例-范建明
                productId: child.productId, //产品id
                specValues: child.specValues, //规格值用,分割
                state: child.state,
              });

              console.log(blindBoxGoods, '11111');
            }
          });
        });
        let dis_type = '';
        console.log(values);

        // params.buyLimit = values.buyLimit;// 活动最大限购数量；0为不限购
        // params.cycle = values.cycle;// 成团周期（开团-截团时长），单位：小时

        params.blindBoxName = values.blindBoxName; // 盲盒名称
        params.categoryId = values.categoryId; // 盲盒分类id-范建明
        params.blindBoxPrice = values.blindBoxPrice; // 盲盒价格
        params.stockQuantity = values.stockQuantity; // 盲盒数量
        params.assistQuantity = values.assistQuantity; // 助力人数
        params.imagePath = imgFileList[0].response.data.path; //图片路径
        // console.log(imgFileList);
        params.sort = 0; //sort

        params.blindBoxGoods = blindBoxGoods; //盲盒商品
        sthis.setState({ loading: true });
        dis_type = 'promotion/create_blindBox';
        if (query.id != undefined && query.id > 0 && query.tar == 'edit') {
          params.id = query.id; // 活动id
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
              console.log(111);
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
      item.blindBoxGoods
        ? item.blindBoxGoods
        : item.seckillProductVOList.map(child_item => {
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

  //上传图片
  uploadChange = info => {
    let { imgFileList } = this.state;
    if (info.file.status != undefined && info.file.status != 'error') {
      imgFileList = info.fileList;
    }
    this.setState({ imgFileList });
    console.log(imgFileList);
  };
  //预览图片
  uploadPreview = info => {
    this.viewImg(true, info.response.data.url);
    console.log(info.response.data.path);
  };
  //预览图片/关闭预览图片
  viewImg = (flag, img = '', text = '') => {
    this.setState({
      preview_img: img,
      preview_alt_con: text,
      show_preview_modal: flag,
    });
  };
  //获取盲盒分类列表-范建明

  get_blindBox_classify = params => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/get_all_blindBox_classify',
      payload: { ...params },
      callback: res => {
        console.log(res.data);
        this.setState({
          classifyList: res.data,
        });
        // const classifyList = res.data.map(item => {
        //   return <Option value={item.categoryName}>{item.categoryName}</Option>;
        // });
        // console.log(classifyList);
        // if (res.state == 200) {
        //   if (res.data.length == 0 && this.state.params.current > 1) {
        //     params.current = params.current - 1;
        //     this.get_list(params);
        //   } else {
        //     this.setState({
        //       data: res.data,
        //     });
        //     console.log(res.data);
        //   }
        // }
      },
    });
  };
  // 获取当前选择得盲盒分类-范建明
  handleChange = e => {
    console.log(e);
    this.setState({
      categoryId: e,
    });
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
      imgFileList,
      preview_img,
      show_preview_modal,
      classifyList, //盲盒分类数据-范建明
      categoryId, //盲盒分类当前选择得数据-范建明
    } = this.state;
    // console.log(this.state);
    const disabledDate = currentDate => currentDate && currentDate < moment().subtract(1, 'days');
    let {
      form: { getFieldDecorator },
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{sldComLanguage('上传图片')}</div>
      </div>
    );
    return (
      <div
        className={`${promotion.full_activity} ${promotion.seckill} ${global.common_page} ${
          global.com_flex_column
        }`}
        style={{ position: 'relative' }}
      >
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('盲盒活动')}`, 0, 0, 10)}
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
                  {sldCommonTitleByBg(`${sldComLanguage('盲盒基本信息')}`)}
                  <div
                    className={`${promotion.full_acm_activity} ${global.flex_column_start_start}`}
                  >
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('盲盒名称')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('最多输入21个字')}`}
                          style={{ width: 300 }}
                        >
                          {getFieldDecorator('blindBoxName', {
                            initialValue: detail.blindBoxName,
                            rules: [
                              {
                                // required: true,
                                required: true,
                                whitespace: true,
                                message: `${sldComLanguage('请输入盲盒名称')}`,
                              },
                            ],
                          })(
                            <Input
                              maxLength={21}
                              style={{ width: 400 }}
                              placeholder={`${sldComLanguage('请输入盲盒名称')} `}
                            />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    {/* 盲盒分类 */}
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('盲盒分类')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('请选择盲盒分类')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('categoryId', {
                              initialValue: categoryId,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请选择盲盒分类')}`,
                                },
                              ],
                            })(
                              <div>
                                <Select
                                  placeholder={`${sldComLanguage('请选择盲盒分类')} `}
                                  style={{ width: 200 }}
                                  onChange={this.handleChange}
                                >
                                  {classifyList?.map(item => {
                                    return (
                                      <Option key={item.categoryId} value={item.categoryId}>
                                        {item.categoryName}
                                      </Option>
                                    );
                                  })}
                                </Select>
                              </div>
                            )}
                          </div>
                        </FormItem>
                      </div>
                    </div>
                    {/* 盲盒数量 */}
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('盲盒数量')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('请填写大于0的整数')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('stockQuantity', {
                              initialValue: detail.stockQuantity,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请输入盲盒数量')}`,
                                },
                              ],
                            })(
                              <InputNumber
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
                              {sldComLanguage('个')}
                            </span>
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    {/* 盲盒价格 */}
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('盲盒价格')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem extra={`${sldComLanguage('请填写价格')}`} style={{ width: 300 }}>
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('blindBoxPrice', {
                              initialValue: detail.blindBoxPrice,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请输入盲盒价格')}`,
                                },
                              ],
                            })(
                              <InputNumber
                                min={0.01}
                                precision={2}
                                step={1}
                                style={{ width: 90 }}
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
                              {sldComLanguage('元')}
                            </span>
                          </div>
                        </FormItem>
                      </div>
                    </div>

                    {/* 盲盒 */}
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('助力人数')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                          extra={`${sldComLanguage('请填写2～100的数字')}`}
                          style={{ width: 300 }}
                        >
                          <div className={global.flex_row_start_center}>
                            {getFieldDecorator('assistQuantity', {
                              initialValue: detail.assistQuantity,
                              rules: [
                                {
                                  required: true,
                                  message: `${sldComLanguage('请输入助力人数')}`,
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

                    {/*上传图片*/}
                    <div className={`${promotion.item} ${global.flex_row_start_start}`}>
                      <div className={`${promotion.left}`}>
                        <span style={{ color: '#FF1515' }}>*</span>
                        {sldComLanguage('上传图片')}
                      </div>
                      <div className={`${promotion.right}`}>
                        <FormItem
                        // style={{ width: 300 }}
                        >
                          <div className={`${global.flex_row_start_start}`}>
                            <Upload
                              withCredentials={true}
                              beforeUpload={sldBeforeUpload}
                              accept={'.gif, .jpeg, .png,.jpg,'}
                              name={'file'}
                              action={`${apiUrl}v3/oss/common/upload?source=setting`}
                              listType="picture-card"
                              fileList={imgFileList}
                              onPreview={info => this.uploadPreview(info)}
                              onChange={info => this.uploadChange(info)}
                            >
                              {imgFileList.length >= 1 ? null : uploadButton}
                            </Upload>
                          </div>
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 基本信息-end */}

                {/* 添加盲盒商品 */}
                {getSldEmptyH(10)}
                <div className={`${global.flex_row_start_center} ${promotion.add_new}`}>
                  {sldIconBtn(() => this.addGoods(), `${sldComLanguage('添加盲盒商品')}`, 7, 7)}
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
                          src={require('@/assets/del_seckill_goods.png')}
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
        {/*图片预览-start*/}
        <SldPreviewImg
          img={preview_img}
          show_preview_modal={show_preview_modal}
          modal_width={500}
          preview_alt_con={`商品图片`}
          closePreviewModal={() => this.viewImg(false)}
        />
        {/*图片预览-end*/}
      </div>
    );
  }
}
