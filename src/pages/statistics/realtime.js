import { connect } from 'dva/index';
import React, { Component,Fragment } from 'react';
import { Form, Spin, Tooltip } from 'antd';
import {
  getSldComImg,
  sldLlineRtextAddMargin,
  sldComLanguage,
  formatNum,
  noDataPlaceholder,
} from '@/utils/utils';
import {
  statRealTimeTodayData, statRealTimeStoreData,
} from '@/utils/util_data';
import global from '@/global.less';
import stat from '@/assets/css/stat.less';
import StandardTable from '@/components/StandardTable';
import LineArea from '@/components/SldStatBizcharts/LineArea';
import SldScrollbars from '@/components/SldScrollbars';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);
@connect(({ statistics, global }) => ({
  statistics, global,
}))
@Form.create()

export default class StatisticsRealtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedFlag: false,//店铺汇总、实时数据是否加载完成
      screenW: document.body.clientWidth,//屏幕宽度
      orderSubmitAmountData: [],//分时支付/下单金额趋势
      newMemberNumData: [],//分时新增用户趋势
      viewNumData: [],//分时流量趋势
      initLoading: false,
      detailData: {},//页面数据
      goodsSalesColumns: [
        {
          'title': `${sldComLanguage('序号')}`, 'dataIndex': 'goodsId', 'align': 'center', 'width': 35,
          render: (text, record, index) => index + 1,
        },
        {
          'title': `${sldComLanguage('商品名称')}`, 'dataIndex': 'goodsName', 'align': 'center', 'width': 100,
          render: (text, record) => {

            return <div
              className={`${global.flex_row_start_center} ${stat.table_td_center_elliplis}`}>{getSldComImg(record.goodsImage, 200, 200, 25, 25)}<span
              title={text}>{text}</span></div>;
          },
        },
        {
          'title': `${sldComLanguage('销售额')}`,
          'dataIndex': 'saleAmount',
          'align': 'center',
          'width': 100,
          'sorter': true,
          defaultSortOrder: 'descend',
          sortDirections: ['descend'],
          render: (text) => {
            return `${sldComLanguage('¥')}${text.toFixed(2)}`;
          },
        },
        {
          'title': `${sldComLanguage('销量')}`,
          'dataIndex': 'saleNum',
          'align': 'center',
          'width': 100,
          'sorter': true,
          sortDirections: ['descend'],
        }],//实时商品销售排行-TOP10表格列设置
      goodsSalesRankData: { list: [], pagination: {} },//实时商品销售排行-TOP10表格数据
      realTimeData1: statRealTimeStoreData(),
      realTimeData2: statRealTimeTodayData(),
    };
  }

  componentDidMount() {
    this.resize();
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
    window.addEventListener('resize', this.resize, { passive: true });
    this.initData();
  }

  resize = () => {
    this.setState({ screenW: document.body.clientWidth });
  };

  //获取页面数据
  initData = (type = '') => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    let { goodsSalesRankData, detailData, realTimeData2, realTimeData1 } = this.state;
    let params = {};
    let orderSubmitAmountData = [];//分时支付/下单金额趋势
    let newMemberNumData = [];//分时新增用户趋势
    let viewNumData = [];//分时流量趋势
    if (type) {
      params.refresh = true;
    }
    dispatch({
      type: 'statistics/get_realtime_data',
      payload: params,
      callback: (res) => {
        if (res.state == 200) {
          detailData = res.data;
          goodsSalesRankData.list = res.data.goodsSaleAmountList;
          //分时支付/下单金额趋势
          for (let i in res.data.orderPayAmountList) {
            orderSubmitAmountData.push({
              month: res.data.orderPayAmountList[i].hour,//横轴
              city: `${sldComLanguage('支付金额')}`,
              temperature: res.data.orderPayAmountList[i].amount,//纵轴
            });
            orderSubmitAmountData.push({
              month: res.data.orderSubmitAmountList[i].hour,//横轴
              city: `${sldComLanguage('下单金额')}`,
              temperature: res.data.orderSubmitAmountList[i].amount,//纵轴
            });
          }

          //分时流量趋势
          for (let i in res.data.viewNumList) {
            viewNumData.push({
              month: res.data.visitorNumList[i].hour,//横轴
              city: `${sldComLanguage('店铺访客数')}`,
              temperature: res.data.visitorNumList[i].num,//纵轴
            });
            viewNumData.push({
              month: res.data.viewNumList[i].hour,//横轴
              city: `${sldComLanguage('店铺浏览量')}`,
              temperature: res.data.viewNumList[i].num,//纵轴
            });
          }

          //分时新增用户趋势
          for (let i in res.data.newMemberNumList) {
            newMemberNumData.push({
              month: res.data.newMemberNumList[i].hour,//横轴
              city: `${sldComLanguage('店铺新增用户数')}`,
              temperature: res.data.newMemberNumList[i].num,//纵轴
            });
          }
          //渲染头部实时分析的数据
          const { realTimeData1, realTimeData2 } = this.state;
          const tempArray = [...realTimeData1.list, ...realTimeData2.list];
          res.data.sellerSummary.orderPayAmountTotal = res.data.sellerSummary.orderPayAmount;
          const tempActionData = { ...res.data.sellerSummary, ...res.data.sellerTodaySummary };
          tempArray.forEach((item, index) => {
            tempArray[index]['value'] = tempActionData[item.mapKey] || 0;
          });
          this.setState({
            goodsSalesRankData,
            detailData,
            orderSubmitAmountData,
            viewNumData,
            newMemberNumData,
            realTimeData2,
            realTimeData1,
          });
        }
        this.setState({ initLoading: false, loadedFlag: true });
      },
    });
  };

  //类型用于区分是哪一部分，自己定义好就可以
  handleTablePagination = (pagination, filtersArg, sorter, type = 'main') => {
    let { detailData, goodsSalesRankData } = this.state;
    if (sorter.field == undefined) {
      return false;
    }
    if (type == 'goods') {
      goodsSalesRankData.list = sorter.field == 'saleAmount' ? detailData.goodsSaleAmountList : detailData.goodsSaleNumList;
    }
    this.setState({
      goodsSalesRankData,
    });
  };

  render() {
    const { detailData, realTimeData2, realTimeData1, goodsSalesColumns, goodsSalesRankData, initLoading, orderSubmitAmountData, viewNumData, newMemberNumData, screenW, loadedFlag } = this.state;
    const leftW = this.props.global != undefined && this.props.global.collapsed != undefined && this.props.global.collapsed ? 90 : 150;
    let itemW = (screenW * 1 - leftW - 20 - 100 - 30 - 80) / 5;
    return (
      <div className={`${stat.real_stat} ${stat.stat_part}`}
           style={{ flex: 1 }}>
        <SldScrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 60}
        >
          <Spin spinning={initLoading}>
            <div className={`${stat.module_item}`}>
              <div className={`${stat.label_panel} ${global.flex_row_start_center}`}>
                {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('实时分析')}`, 10, 0, 0)}
                <Tooltip placement="right" title={`${sldComLanguage('今日实时数据的统计时间均为今日零时截至当前更新时间。点击按钮可强制刷新')}`}>
                  <img style={{ display: 'inline-block', marginLeft: '10px' }}
                       src={require('../../assets/home_basic/help_icon.png')}></img>
                </Tooltip>
                <div className={`${stat.update_time_panel} ${global.flex_row_start_center}`}>
                  <span>{sldComLanguage('更新时间：')}{detailData.statsTime}</span>
                  <i onClick={() => this.initData(true)} className={`${stat.reload_icon}`}></i>
                </div>
              </div>
              <div className={`${stat.real_num_panel}`}>
                <div className={`${stat.num_stat_item} ${global.flex_row_start_center}`}>
                  <div className={`${stat.left_slide} ${global.flex_column_center_center}`}>
                    <img src={realTimeData1.icon} className={`${stat.slide_icon}`}></img>
                    <span className={`${stat.slide_title}`}>{realTimeData1.title}</span>
                  </div>
                  <div className={`${stat.right_main}`}>
                    <ul className={`${global.flex_row_start_center}`}>
                      {realTimeData1.list.map((item, index) => (
                        <li key={index} className={`${global.flex_column_center_start}`} style={{ width: itemW }}>
                          <div className={`${stat.up_desc}`}>
                            <span>{item.name}</span>

                            {item.isHelpIcon ? <Tooltip placement="right" title={item.tip}>
                              <img src={require('../../assets/home_basic/help_icon.png')}></img>
                            </Tooltip> : ''}
                          </div>
                          <div className={`${stat.down_num}`} title={item.value}>
                            <span>
                              {loadedFlag && (
                                item.value > 10000
                                  ? formatNum(item.value, item.isMoney ? 2 : 0)
                                  : <TweenOne animation={{
                                    Children: {
                                      value: item.value, floatLength: item.isMoney ? 2 : 0,
                                      formatMoney: true,
                                    },
                                    duration: 1000,
                                  }}/>
                              )}
                            </span>
                          </div>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
                <div>
                  <div className={`${stat.num_stat_item} ${global.flex_row_start_start}`}>
                    <div className={`${stat.left_slide} ${global.flex_column_center_center}`}>
                      <img src={realTimeData2.icon} className={`${stat.slide_icon}`}></img>
                      <span className={`${stat.slide_title}`}>{realTimeData2.title}</span>
                    </div>
                    <div className={`${stat.right_main}`}>
                      <ul style={{ flexWrap: 'wrap', marginTop: '20px' }} className={`${global.flex_row_start_center}`}>
                        {realTimeData2.list.map((item, index) => (
                          item.isBr ?
                            <li style={{ height: '20px', width: '100%', backgroundColor: '#ffffff' }}></li>
                            :
                            <li className={`${global.flex_column_center_start}`} style={{ width: itemW }}>
                              <div className={`${stat.up_desc}`}>
                                <span>{item.name}</span>
                                {item.isHelpIcon ? <Tooltip placement="right" title={item.tip}>
                                  <img src={require('../../assets/home_basic/help_icon.png')}></img>
                                </Tooltip> : ''}
                              </div>
                              <div className={`${stat.down_num}`} title={item.value}>
                                <span>
                                  {loadedFlag && (item.mapKey != 'pvSubmitRate') && (item.mapKey != 'pvPayRate') && (
                                    item.value > 10000
                                      ? formatNum(item.value, item.isMoney ? 2 : 0)
                                      : <TweenOne animation={{
                                        Children: {
                                          value: item.value, floatLength: item.isMoney ? 2 : 0,
                                          formatMoney: true,
                                        },
                                        duration: 1000,
                                      }}/>
                                  )}
                                  {loadedFlag && (item.mapKey == 'pvSubmitRate' || item.mapKey == 'pvPayRate') &&
                                  <Fragment>
                                    {item.value}
                                  </Fragment>
                                  }
                                </span>
                              </div>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flexWrap: 'wrap', backgroundColor: '#f0f2f5' }}
                 className={`${global.flex_row_between_start}`}>

              {/* 分时流量趋势-start */}
              <div style={{ margin: '10px 0' }} className={`${stat.common_table_item}`}>
                <div className={`${stat.label_panel}`}>
                  {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('分时流量趋势')}`, 10, 0, 0)}
                </div>
                <div className={`${stat.table_main_overflow_hidden}`}>
                  <LineArea data={viewNumData}/>
                </div>
              </div>
              {/* 分时流量趋势-end */}

              {/* 分时新增用户趋势-start */}
              <div style={{ margin: '10px 0' }} className={`${stat.common_table_item}`}>
                <div className={`${stat.label_panel}`}>
                  {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('分时新增用户趋势')}`, 10, 0, 0)}
                </div>
                <div className={`${stat.table_main_overflow_hidden}`}>
                  <LineArea data={newMemberNumData}/>
                </div>
              </div>
              {/* 分时新增用户趋势-end */}

              {/* 分时支付/下单金额趋势-start */}
              <div className={`${stat.common_table_item}`}>
                <div className={`${stat.label_panel}`}>
                  {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('分时支付/下单金额趋势')}`, 10, 0, 0)}
                </div>
                <div className={`${stat.table_main_overflow_hidden}`}>
                  <LineArea data={orderSubmitAmountData} unit={'¥'}/>
                </div>
              </div>
              {/* 分时支付/下单金额趋势-end */}

              {/* 实时商品销售排行 - TOP10-start */}
              <div style={{ marginBottom: '10px' }} className={`${stat.common_table_item}`}>
                <div className={`${stat.label_panel}`}>
                  {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('实时商品销售排行 - TOP10')}`, 10, 0, 0)}
                </div>
                <div className={`${stat.table_main} ${stat.stat_common_table}`}>
                  {(goodsSalesRankData.list==undefined||(goodsSalesRankData.list!=undefined&&goodsSalesRankData.list.length == 0)) ? noDataPlaceholder() : <StandardTable
                    rowKey={'goodsId'}
                    data={goodsSalesRankData}
                    isColumnResize={true}
                    columns={goodsSalesColumns}
                    sldpagination={false}
                    border={false}
                    showScrollbar={false}
                    onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'goods')}
                  />}
                </div>
              </div>
              {/* 实时商品销售排行 - TOP10-end */}

            </div>
          </Spin>
        </SldScrollbars>
      </div>
    );
  }
}
