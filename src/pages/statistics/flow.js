import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Radio, Tooltip as TooltipAntd, Spin } from 'antd';
import {
  sldLlineRtextAddMargin,
  sldComLanguage, sldSvgIcon, getSldHorLineBgColor, formatNum,
} from '@/utils/utils';
import {
  statFlowChangeTrendTypeData,
  statDateSearchParams,
  statFlowChangeTrendTypeSelectedData,
  statFlowViewNumData,
  statFlowOrderPayRateData,
  statFlowBarColor,
} from '@/utils/util_data';
import global from '@/global.less';
import stat from '@/assets/css/stat.less';
import BarSingle from '@/components/SldStatBizcharts/BarSingle';
import StatisticsReportFlow from './report/flow';
import SldScrollbars from '@/components/SldScrollbars';
import SldStatDate from '@/components/SldStatDate';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);
const barColor = statFlowBarColor();
@connect(({ statistics }) => ({
  statistics,
}))
@Form.create()

export default class StatisticsFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedFlag: false,//顶部数据是否加载完成
      changeTrendLoading: false,//近30天变化趋势模块的loading
      flowData1: statFlowViewNumData(),
      flowData2: statFlowOrderPayRateData(),
      changeTrendTypeData: statFlowChangeTrendTypeSelectedData(),//近30天变化趋势的筛选项
      curChangeTrendDataType: 'visitorNum',//近30天变化趋势的筛选项——默认选项
      changeTrendData: [],//近30天变化趋势的数据
      changeTrendAllData: [],//近30天变化趋势的全部数据
      changeTrendDataBarColor: barColor.two,//柱状图颜色
      changeTrendDataFlag: 2,//近30天变化趋势的柱子类型：1为一组一条柱子的 2为一组两条柱子的
      flowPreviewParams: statDateSearchParams(),
      flowPreviewLoadingStatus: false,
    };
  };

  statFlowChangeTrendTypeData = statFlowChangeTrendTypeData();

  componentDidMount() {
    this.getChangeTrendData();
    this.getFlowPreviewData();
  }

  //获取近30天变化趋势的数据
  getChangeTrendData = () => {
    this.setState({ changeTrendLoading: true });
    const { dispatch } = this.props;
    let { changeTrendAllData } = this.state;
    dispatch({
      type: 'statistics/get_flow_change_trend_data',
      callback: (res) => {
        changeTrendAllData = res.data;
        if (res.state == 200) {
          this.handleChangeTendTypeData(res.data);
          this.setState({
            changeTrendAllData,
          });
        }
      },
    });
  };

  //根据当前选中的近30天变化趋势类型处理图表需要的数据
  handleChangeTendTypeData = (data) => {
    let { curChangeTrendDataType, changeTrendDataBarColor, changeTrendDataFlag } = this.state;
    let changeTrendData = [];
    let curData = data;
    for (let i in curData) {
      let time = curData[i].statsTime;
      let showName = this.statFlowChangeTrendTypeData[curChangeTrendDataType];
      changeTrendData.push({
        key: time,
        name: showName,
        value: curData[i][curChangeTrendDataType],
      });
    }
    changeTrendDataBarColor = barColor.single;
    changeTrendDataFlag = 1;
    this.setState({ changeTrendLoading: false });
    this.setState({ changeTrendData, changeTrendDataBarColor, changeTrendDataFlag });
  };

  //近30天变化趋势筛选事件
  handleChangeTrendType = (e) => {
    let { changeTrendAllData } = this.state;
    this.setState({
      curChangeTrendDataType: e.target.value,
      changeTrendLoading: true,
    }, () => {
      this.handleChangeTendTypeData(changeTrendAllData);
    });
  };

  //时间筛选器返回的时间数据
  updateSelectDate = (date, index) => {
    let { flowPreviewParams } = this.state;
    let _this = this;
    if (index == '_flow_over_view') {
      //各省份销售占比的时间筛选
      flowPreviewParams = { ...flowPreviewParams, ...date };
      this.setState({ flowPreviewParams }, () => {
        _this.getFlowPreviewData();
      });
    }
  };
  //获取流量总览的数据
  getFlowPreviewData = () => {
    const { dispatch } = this.props;
    const { flowData1, flowData2, flowPreviewParams } = this.state;
    this.setState({ flowPreviewLoadingStatus: true });
    dispatch({
      type: 'statistics/get_flow_preview_data',
      payload: flowPreviewParams,
      callback: (res) => {
        if (res.state === 200) {
          flowData1.list.forEach((item, index) => {
            if (res.data[item.mapDifferentKey] && res.data[item.mapDifferentKey].indexOf('-') === 0) {
              //下降
              item.differenceNum = res.data[item.mapDifferentKey];
              item.isUp = false;
            } else if (res.data[item.mapDifferentKey]) {
              //上涨
              item.differenceNum = '+' + res.data[item.mapDifferentKey];
              item.isUp = true;
            } else {
              item.differenceNum = '--';
            }
            item.value = (item.isMoney && res.data[item.mapKey] ? '￥' : '') + res.data[item.mapKey] || '--';
          });
          flowData2.list.forEach((item, index) => {
            if (res.data[item.mapDifferentKey] && res.data[item.mapDifferentKey].indexOf('-') === 0) {
              //下降
              item.differenceNum = res.data[item.mapDifferentKey];
              item.isUp = false;
            } else if (res.data[item.mapDifferentKey]) {
              //上涨
              item.differenceNum = '+' + res.data[item.mapDifferentKey];
              item.isUp = true;
            } else {
              item.differenceNum = '--';
            }

            item.value = res.data[item.mapKey] || '0';

          });
          this.setState({
            flowData2, flowData1,
          });
        }
        this.setState({ flowPreviewLoadingStatus: false, loadedFlag: true });
      },

    });
  };


  render() {
    const { flowPreviewLoadingStatus, flowData1, flowData2, changeTrendTypeData, curChangeTrendDataType, changeTrendLoading, changeTrendData, changeTrendDataBarColor, changeTrendDataFlag, loadedFlag } = this.state;
    return (
      <div className={`${stat.trade_stat} ${stat.stat_part}`}
           style={{ flex: 1, overflow: 'auto' }}>
        <SldScrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 60}
        >
          <div className={`${stat.label_panel} ${global.flex_row_start_center}`}>
            {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('流量总览')}`, 10, 0, 0)}
          </div>
          {getSldHorLineBgColor(1, 'rgba(216, 216, 216, 0.5)')}
          <div className={`${stat.change_trend_radio}`} style={{ marginLeft: 25, marginTop: 15 }}>
            <SldStatDate idIndex={'_trade_over_view'}
                         updateSelectDate={(date) => this.updateSelectDate(date, '_flow_over_view')}/>
          </div>
          <Spin spinning={flowPreviewLoadingStatus}>
            <div className={`${stat.real_num_panel}`}>
              {
                [0, 1].map((number, index) => (
                  <div key={index} style={{ height: '180px' }}
                       className={`${stat.num_stat_item_flow} ${global.flex_row_start_center}`}>
                    <div className={`${stat.left_slide} ${global.flex_column_center_center}`}>
                      <img src={[flowData1, flowData2][number].icon} className={`${stat.slide_icon}`}></img>
                      <span className={`${stat.slide_title}`}>{[flowData1, flowData2][number].title}</span>
                    </div>
                    <div className={`${stat.right_main}`}>
                      <ul className={`${global.flex_row_start_center}`}>
                        {[flowData1, flowData2][number].list.map((item, index) => (
                          <li className={`${global.flex_column_center_start}`}>
                            <div className={`${stat.up_desc}`}>
                              <span>{item.name}</span>

                              {item.isHelpIcon ? <TooltipAntd placement="right" title={item.tip}>
                                <img src={require('../../assets/home_basic/help_icon.png')}></img>
                              </TooltipAntd> : ''}
                            </div>
                            <div className={`${stat.down_num}`} title={item.value}>
                              <span>
                                {loadedFlag && (item.mapKey == 'pvPayRate'
                                    ? item.value
                                    : (item.value > 10000
                                      ? formatNum(item.value, item.isMoney ? 2 : 0)
                                      : <TweenOne animation={{
                                        Children: {
                                          value: item.value, floatLength: item.isMoney ? 2 : 0,
                                          formatMoney: true,
                                        },
                                        duration: 1000,
                                      }}/>)
                                )}
                              </span>
                            </div>
                            <div className={`${stat.difference_label} ${global.flex_row_start_center}`}>
                              <div className={`${stat.label_key}`}>{sldComLanguage('较上期')}</div>
                              <div style={{ color: item.isUp ? '#52C41A' : '#C41A1A' }}
                                   className={`${stat.label_value}`}>{item.differenceNum}<i>{sldSvgIcon(item.isUp ? '#52C41A' : '#C41A1A', 16, 16, item.isUp ? 'shangsheng' : 'xiajiang')}</i>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div>
          </Spin>

          {/* 近30天变化趋势-start */}
          <div style={{ backgroundColor: '#f0f2f5' }} className={`${global.flex_row_between_start}`}>
            <div style={{ marginTop: '10px', width: '100%', marginRight: 0 }} className={`${stat.common_table_item}`}>
              <div className={`${stat.label_panel} ${global.flex_row_start_center}`}>
                {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('近30天变化趋势')}`, 10, 0, 0)}
              </div>
              <div className={`${stat.change_trend_radio}`}>
                <span>筛选项：</span>
                <Radio.Group
                  options={changeTrendTypeData}
                  onChange={this.handleChangeTrendType}
                  defaultValue={curChangeTrendDataType}
                />
              </div>
              <Spin spinning={changeTrendLoading}>
                <div style={{ height: 400 }}>
                  {changeTrendData.length > 0 && changeTrendDataFlag == 1 &&
                  <BarSingle data={changeTrendData} color={changeTrendDataBarColor} flag={changeTrendDataFlag}/>}
                </div>
              </Spin>
            </div>
          </div>
          {/* 近30天变化趋势-end */}

          <div style={{ flexWrap: 'wrap', backgroundColor: '#f0f2f5' }} className={`${global.flex_row_between_start}`}>
            {/* 流量报表-start */}
            <StatisticsReportFlow/>
            {/* 流量报表-end */}
          </div>
        </SldScrollbars>
      </div>
    );
  }
}
