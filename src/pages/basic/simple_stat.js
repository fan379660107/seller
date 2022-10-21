import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Rate, Tooltip as TooltipAntd } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddMargin,
  formatNum,
  noDataPlaceholder,
  sldtbaleOpeBtnText,
} from '@/utils/utils';
import { statDateSearchParams, simpleStatTodayData, simpleStatWaitEventData } from '@/utils/util_data';
import global from '@/global.less';
import styles from './basic.less';
import stat from '@/assets/css/stat.less';
import SldStatDate from '@/components/SldStatDate';
import LineArea from '@/components/SldStatBizcharts/LineArea';
import GoodsSalesRank from '@/components/SldStat/GoodsSalesRank';
import router from 'umi/router';
import StandardTable from '@/components/StandardTable';
import Link from 'umi/link';
import SldScrollbars from '@/components/SldScrollbars';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);
@connect(({ sldsetting, home, common }) => ({
  sldsetting, home, common,
}))
@Form.create()

export default class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedFlag: false,//顶部数据是否加载完成
      todayLoadedFlag: false,//今日交易概况是否加载完成
      waitEventData: simpleStatWaitEventData(),
      store_info: {},
      todayOverViewLoading: false,//今日概况模块loading
      waitingLoading: false,//待办模块loading
      baseInfoLoading: false,//基本信息模块loading
      activityLoading: false,//平台活动模块loading
      todayData: simpleStatTodayData(),
      globalUpdateTime: '',
      payOrderTrendInitLoading: '',
      payOrderTrendData: [],//支付/下单金额趋势数据
      flowTrendInitLoading: '',
      flowTrendData: [],//流量趋势数据
      payOrderTrendParams: statDateSearchParams(),
      flowTrendParams: statDateSearchParams(),
      columns: [
        {
          'title': '活动名称',
          'dataIndex': 'seckillName',
          'align': 'center',
          'width': 150,
          render: (text) => {
            return <span title={text}>{text}</span>;
          },
        },
        {
          'title': '活动时间',
          'dataIndex': 'startTime',
          'align': 'center',
          'width': 120,
        },
        {
          'title': '活动状态',
          'dataIndex': 'stateValue',
          'align': 'center',
          'width': 80,
        },
        {
          'title': '操作',
          'dataIndex': 'seckillId',
          'align': 'center',
          'width': 80,
          render: (text) => (
            <Fragment>
              <Link to={{
                pathname: '/marketing/seckill_to_add',
                query: {
                  id: text,
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('立即参加')}`, () => null)}
              </Link>
            </Fragment>
          ),
        },
      ],
      platformActivityData: { list: [], pagination: {} },
    };

  };

  componentDidMount() {
    this.get_store_info();
    this.getPayOrderTrend();
    this.getFlowTrend();
    this.getWaitEventData();
    this.getActivity();
  }

  //获取秒杀活动列表
  getActivity = () => {
    this.setState({ activityLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'common/get_all_seckill_list',
      payload: { pageSize: 10 },
      callback: (res) => {
        this.setState({ activityLoading: false });
        if (res.state == 200) {
          this.setState({
            platformActivityData: res.data,
          });
        }
      },
    });
  };

  //获取待办栏目数据
  getWaitEventData = () => {
    const { dispatch } = this.props;
    this.setState({ todayOverViewLoading: true });
    dispatch({
      type: 'home/get_store_realtime_preview_data',
      callback: (res) => {
        if (res.state === 200) {
          const { sellerSummary, sellerTodaySummary, sellerWaitDeal } = res.data;
          let { todayData, globalUpdateTime } = this.state;
          globalUpdateTime = res.data.statsTime;
          //简单平铺对象，易于后续赋值
          let singleLevelObjTemp = { ...sellerSummary, ...sellerTodaySummary, ...sellerWaitDeal };
          todayData.forEach((item, index) => {
            item.children.forEach((item2, index2) => {
              if (!singleLevelObjTemp[item2.mapKey] && singleLevelObjTemp[item2.mapKey] !== 0) {
                //如果为0，则显示 --
                todayData[index]['children'][index2]['value'] = 0;
                return;
              }
              todayData[index]['children'][index2]['value'] = singleLevelObjTemp[item2.mapKey];
            });
          });
          this.setState({ todayData, globalUpdateTime });
        }
        this.setState({ todayOverViewLoading: false, todayLoadedFlag: true });
      },
    });
  };
  //获取支付/下单金额趋势的数据
  getPayOrderTrend = () => {
    this.setState({ payOrderTrendInitLoading: true });
    const { dispatch } = this.props;
    let { payOrderTrendParams } = this.state;
    let payOrderTrendData = [];
    dispatch({
      type: 'common/get_pay_order_trend',
      payload: payOrderTrendParams,
      callback: (res) => {
        this.setState({ payOrderTrendInitLoading: false });
        if (res.state == 200) {
          let data = res.data;
          for (let i in data.orderAmountList) {
            payOrderTrendData.push({
              month: data.payAmountList[i].statsTime,
              city: `${sldComLanguage('支付金额')}`,
              temperature: data.payAmountList[i].orderPayAmount,
            });
            payOrderTrendData.push({
              month: data.orderAmountList[i].statsTime,
              city: `${sldComLanguage('下单金额')}`,
              temperature: data.orderAmountList[i].orderSubmitAmount,
            });
          }
          this.setState({
            payOrderTrendData,
          });
        }
      },
    });
  };
  //获取店铺信息
  get_store_info = () => {
    const { dispatch } = this.props;
    const { waitEventData } = this.state;
    this.setState({ waitingLoading: true, baseInfoLoading: true });
    dispatch({
      type: 'home/get_store_info',
      callback: (res) => {
        if (res.state == 200) {
          this.setState({
            store_info: res.data,
          });
        }
        this.setState({ baseInfoLoading: false });
      },
    });
    dispatch({
      type: 'home/get_store_wait_data',
      callback: (res) => {
        if (res.state === 200) {
          waitEventData.forEach(item => {
            item.num = res.data.sellerWaitDeal[item.mapKey];
          });
          this.setState({ waitEventData });
        }
        this.setState({ waitingLoading: false, loadedFlag: true });
      },
    });
  };
  //时间筛选器返回的时间数据
  updateSelectDate = (date, index) => {
    let { payOrderTrendParams, flowTrendParams } = this.state;
    let _this = this;
    if (index == '_pay_order_trend') {
      //支付/下单金额趋势的时间筛选
      payOrderTrendParams = { ...payOrderTrendParams, ...date };
      this.setState({ payOrderTrendParams }, () => {
        _this.getPayOrderTrend();
      });
    } else if (index == '_flow_trend') {
      //流量趋势的时间筛选
      flowTrendParams = { ...flowTrendParams, ...date };
      this.setState({ flowTrendParams }, () => {
        _this.getFlowTrend();
      });
    }
  };
  //获取流量趋势的数据
  getFlowTrend = () => {
    this.setState({ flowTrendInitLoading: true });
    const { dispatch } = this.props;
    let { flowTrendParams } = this.state;
    let flowTrendData = [];
    dispatch({
      type: 'common/get_flow_trend',
      payload: flowTrendParams,
      callback: (res) => {
        this.setState({ flowTrendInitLoading: false });
        if (res.state == 200) {
          let data = res.data;
          for (let i in data.visitorNumList) {
            flowTrendData.push({
              month: data.visitorNumList[i].statsTime,
              city: `${sldComLanguage('访客数')}`,
              temperature: data.visitorNumList[i].visitorNum,
            });
            flowTrendData.push({
              month: data.viewNumList[i].statsTime,
              city: `${sldComLanguage('浏览量')}`,
              temperature: data.viewNumList[i].viewNum,
            });
          }
          this.setState({
            flowTrendData,
          });
        }
      },
    });
  };
  //评分浮点数格式化
  rateFormatter = (number) => {
    number = parseFloat(number).toFixed(1);
    if (+number.toString().substr(2) > 0) {
      number = number.toString().substring(0, 1) + '.5';
    }
    return parseFloat(number);
  };

  //待办事项跳转
  menuItemGoPage = (path) => {
    router.push(path);
  };

  //平台活动查看更多事件
  viewMoreActivity = (type) => {
    if (type == 'seckill') {
      router.push('/marketing/seckill');
    }
  };

  render() {
    const { columns, platformActivityData, flowTrendData, flowTrendInitLoading, waitEventData, store_info, todayOverViewLoading, todayData, globalUpdateTime, payOrderTrendInitLoading, payOrderTrendData, waitingLoading, baseInfoLoading, activityLoading, loadedFlag, todayLoadedFlag } = this.state;
    return (
      <div className={`${styles.gray_main} ${styles.new_stat} ${styles.basic_new} ${stat.stat_part}`}
           style={{ flex: 1 }}>
        <SldScrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 60}
        >
          <div className={`${stat.seller_panel}`}>
            <div style={{ backgroundColor: '#ffffff', paddingBottom: '30px' }}>
              <Spin spinning={baseInfoLoading}>
                <div className={`${stat.up_seller_info} ${global.flex_row_start_center}`}>
                  <div className={`${stat.left_info_main} ${global.flex_row_start_center}`}>
                    <div className={`${stat.store_logo} ${global.flex_row_center_center}`}>
                      <img src={store_info.storeLogoUrl} alt=''/>
                    </div>
                    <div className={`${stat.base_info}`}>
                      <div className={`${stat.title}`}>{store_info.storeName}</div>
                      <div className={`${stat.username}`}>{sldComLanguage('登录账号')}：<span>{store_info.vendorName}</span>
                      </div>
                      <div className={`${stat.up_store_info}`}>
                        <span>{sldComLanguage('店铺类型')}：{store_info.isOwnStoreValue}</span>
                        <span>{sldComLanguage('店铺权限')}：{store_info.rolesName}</span>
                      </div>
                      <div className={`${stat.store_validate_time}`}>
                        {sldComLanguage('店铺有效期限')}：{store_info.isOwnStore == 1 ? sldComLanguage('永久有效') : store_info.storeExpireTime}
                      </div>
                    </div>
                  </div>
                  <div className={`${stat.store_score} ${global.flex_row_start_center}`}>
                    <div className={`${stat.all_store_panel} ${global.flex_column_center_center}`}>
                      <img src={require('@/assets/star_icon.png')} alt=''/>
                      <span className={`${stat.title}`}>{sldComLanguage('店铺评分')}</span>
                      <span className={`${stat.num}`}>{store_info.comprehensiveScore}</span>
                    </div>
                    <div className={`${stat.right_store_level}`}>
                      {this.rateFormatter(store_info.descriptionScore) ? <ul>
                        <li className={`${global.flex_row_start_center}`}>
                          <div className={`${stat.label}`}>{sldComLanguage('描述相符')}：</div>
                          <div className={`${stat.level}`}><Rate allowHalf disabled
                                                                 defaultValue={this.rateFormatter(store_info.descriptionScore)}/>
                          </div>
                          <div className={`${stat.score}`}>{store_info.descriptionScore}</div>
                        </li>
                        <li className={`${global.flex_row_start_center}`}>
                          <div className={`${stat.label}`}>{sldComLanguage('服务态度')}：</div>
                          <div className={`${stat.level}`}><Rate allowHalf disabled
                                                                 defaultValue={this.rateFormatter(store_info.serviceScore)}/>
                          </div>
                          <div className={`${stat.score}`}>{store_info.serviceScore}</div>
                        </li>
                        <li className={`${global.flex_row_start_center}`}>
                          <div className={`${stat.label}`}>{sldComLanguage('物流服务')}：</div>
                          <div className={`${stat.level}`}><Rate allowHalf disabled
                                                                 defaultValue={this.rateFormatter(store_info.deliverScore)}/>
                          </div>
                          <div className={`${stat.score}`}>{store_info.deliverScore}</div>
                        </li>

                      </ul> : ''}

                    </div>
                  </div>
                </div>
              </Spin>
              <Spin spinning={waitingLoading}>
                <div className={`${stat.down_goods_info}`}>
                  <ul className={`${global.flex_row_between_center}`}>
                    {waitEventData.map((item, index) => (
                      <li key={index} onClick={() => (this.menuItemGoPage(item.path))}
                          className={`${global.flex_column_start_center}`}>
                        <div className={`${stat.label} ${global.flex_row_start_center}`}>
                          <i></i>
                          <span>{item.label}</span>
                        </div>
                        <div className={`${stat.num}`} title={item.num || 0}>
                          {loadedFlag && (
                            item.num > 10000
                              ? formatNum(item.num)
                              : <TweenOne animation={{
                                Children: {
                                  value: item.num, floatLength: 0,
                                  formatMoney: true,
                                },
                                duration: 1000,
                              }}/>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Spin>
            </div>
            <Spin spinning={todayOverViewLoading}>
              <div className={`${styles.today_info_panel} ${global.flex_com_space_between}`}>
                {todayData.map((item, index) => (
                  <div key={index} className={`${styles.today_info_item}`}>
                    <div className={`${styles.position_title} ${global.flex_row_start_center}`}>
                      {item.label}
                    </div>
                    <div className={`${styles.title} ${global.flex_row_end_center}`}>
                      <span className={`${styles.update_time}`}>{globalUpdateTime}</span>
                    </div>
                    <div className={`${styles.info_children}`}>
                      <ul>
                        {item.children.map((item2, index2) => (
                          <li key={index2}>
                            <div className={`${styles.key} ${global.flex_row_start_center}`}>
                              <span>{item2.key}</span>
                              <TooltipAntd placement="right" title={item2.tip}>
                                <img style={{ cursor: 'pointer' }}
                                     src={require('../../assets/home_basic/help_icon.png')}></img>
                              </TooltipAntd>
                            </div>
                            <div className={`${styles.value}`}
                                 title={item2.value}>
                              {todayLoadedFlag && (
                                item2.value > 10000
                                  ? formatNum(item2.value, item2.isMoney ? 2 : 0)
                                  : <TweenOne animation={{
                                    Children: {
                                      value: item2.value, floatLength: item2.isMoney ? 2 : 0,
                                      formatMoney: true,
                                    },
                                    duration: 1000,
                                  }}/>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

              </div>
            </Spin>
            <div className={`${styles.visualized_panel} ${global.flex_row_between_start}`}>
              {/* 支付/下单金额趋势-start */}
              <div className={`${styles.visualized_item}`}>
                <div className={`${styles.top_info_operate} ${global.flex_com_space_between}`}>
                  <div className={`${styles.left_label}`}>
                    {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('支付/下单金额趋势')}`, 10, 0, 0)}
                  </div>
                  <SldStatDate idIndex={'_pay_order_trend'}
                               updateSelectDate={(date) => this.updateSelectDate(date, '_pay_order_trend')}/>
                </div>
                <Spin spinning={payOrderTrendInitLoading}>
                  <div className={`${styles.main_area}`}>
                    {payOrderTrendData.length>0
                      ?<LineArea data={payOrderTrendData} unit={'¥'}/>
                      :noDataPlaceholder()
                    }
                  </div>
                </Spin>
              </div>
              {/* 支付/下单金额趋势-end */}

              {/* 流量趋势-start */}
              <div className={`${styles.visualized_item}`}>
                <div className={`${styles.top_info_operate} ${global.flex_com_space_between}`}>
                  <div className={`${styles.left_label}`}>
                    {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('流量趋势')}`, 10, 0, 0)}
                  </div>
                  <SldStatDate idIndex={'_flow_trend'}
                               updateSelectDate={(date) => this.updateSelectDate(date, '_flow_trend')}/>
                </div>
                <Spin spinning={flowTrendInitLoading}>
                  <div className={`${styles.main_area}`}>
                    {flowTrendData.length>0
                      ?<LineArea data={flowTrendData}/>
                      :noDataPlaceholder()
                    }
                  </div>
                </Spin>
              </div>
              {/* 流量趋势-end */}
            </div>
            <div style={{ flexWrap: 'wrap', marginBottom: '10px' }} className={`${global.flex_row_between_start}`}>
              <GoodsSalesRank/>
              <div className={`${styles.platform_activity}`}>
                <div className={`${styles.up_table_panel} ${global.flex_row_between_center}`}>
                  {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('秒杀活动')}`, 10, 0, 0)}
                  <div className={`${styles.right_more}`}
                       onClick={() => this.viewMoreActivity('seckill')}>{sldComLanguage('查看更多')}</div>
                </div>
                <Spin spinning={activityLoading}>
                  <div className={`${styles.down_platform_panel} ${stat.stat_common_table}`}>
                    {(!platformActivityData || !platformActivityData.list || !platformActivityData.list.length) ? noDataPlaceholder() :
                      <StandardTable
                        className={`${stat.goods_sales_rank_table}`}
                        rowKey={'goodsId'}
                        data={platformActivityData}
                        isColumnResize={false}
                        columns={columns}
                        sldpagination={false}
                        border={false}
                        showScrollbar={false}
                        onChange={null}
                      />}
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </SldScrollbars>
      </div>
    );
  }
}
