import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Spin, Radio } from 'antd';
import {
  sldLlineRtextAddMargin,
  sldComLanguage,
  noDataPlaceholder,
} from '@/utils/utils';
import {
  statDateSearchParams,
  statDateThreeSearchParams,
  statMemberOverViewData,
  statMemberChangeTrendTypeData,
  statMemberChangeTrendLineColor,
  statMemberChangeTrendAreaColor,
} from '@/utils/util_data';
import global from '@/global.less';
import stat from '@/assets/css/stat.less';
import StatisticsReportMember from './report/member';
import SldStatDate from '@/components/SldStatDate';
import GoodsPreferRank from '@/components/SldStat/GoodsPreferRank';
import OverView from '@/components/SldStat/OverView';
import LineArea from '@/components/SldStatBizcharts/LineArea';
import SldScrollbars from '@/components/SldScrollbars';

@connect(({ statistics }) => ({
  statistics,
}))
@Form.create()

export default class StatisticsMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeTrendLoading: false,//变化趋势模块loading
      orderPayTrendLoading: false,//支付客单价变化趋势模块的loading
      overViewData: statMemberOverViewData(),
      headerModuleLoadingStatus: false,
      paramsOptions: statDateThreeSearchParams(),
      changeTrendParams: statDateSearchParams(),//变化趋势的筛选条件
      changeTrendData: [],//变化趋势图表数据
      changeTrendAllData: [],//变化趋势全部数据
      curChangeTrengDataType: 'newMemberNum',//变化趋势当前选中的数据类型
      changeTrendTypeData: statMemberChangeTrendTypeData(),//变化趋势的筛选项
      orderPayTrendParams: statDateSearchParams(),//支付客单价变化趋势的筛选条件
      orderPayTrendData: [],//支付客单价变化趋势的数据
    };
  };

  changeTrendLineColor = statMemberChangeTrendLineColor();//变化趋势图表的line颜色
  changeTrendAreaColor = statMemberChangeTrendAreaColor();//变化趋势图表的area颜色

  componentDidMount() {
    this.getMemberPreviewData();
    this.getChangeTrendData();
    this.getOrderPayTrendData();
  }

  //获取支付客单价变化趋势的数据
  getOrderPayTrendData = () => {
    this.setState({ orderPayTrendLoading: true });
    const { dispatch } = this.props;
    let { orderPayTrendData, orderPayTrendParams } = this.state;
    let params = { ...orderPayTrendParams };
    dispatch({
      type: 'statistics/get_order_pay_trend',
      payload: params,
      callback: (res) => {
        this.setState({ orderPayTrendLoading: false });
        if (res.state == 200) {
          orderPayTrendData = [];
          if (res.data.length > 0) {
            res.data.map(item => {
              orderPayTrendData.push({
                month: item.statsTime,//横轴
                city: `${sldComLanguage('支付客单价')}`,
                temperature: item.orderPayAtv,//纵轴
              });
            });
          }
          this.setState({
            orderPayTrendData,
          });
        }
      },
    });
  };


  //获取变化趋势数据
  getChangeTrendData = () => {
    this.setState({ changeTrendLoading: true });
    const { dispatch } = this.props;
    let { changeTrendParams, changeTrendAllData } = this.state;
    dispatch({
      type: 'statistics/get_change_trend',
      payload: changeTrendParams,
      callback: (res) => {
        this.setState({ changeTrendLoading: false });
        changeTrendAllData = res.data;
        if (res.state == 200) {
          if (res.data.length > 0) {
            this.handleMemberClientPercentData(res.data);
            this.setState({
              changeTrendAllData,
            });
          } else {
            this.setState({ changeTrendData: [] });
          }
        }
      },
    });
  };

  //根据当前选中的类型处理图表需要的数据
  handleMemberClientPercentData = (data) => {
    const { curChangeTrengDataType, changeTrendTypeData } = this.state;//变化趋势当前选中的数据类型
    let changeTrendData = [];
    let showName = changeTrendTypeData.filter(item => item.value == curChangeTrengDataType)[0].label;
    data.map(item => {
      changeTrendData.push({
        month: item.statsTime,
        city: showName,
        temperature: item[curChangeTrengDataType],
      });
    });
    this.setState({ changeTrendData });
  };

  getMemberPreviewData = (itemIndex, params) => {
    const { dispatch } = this.props;
    this.setState({ headerModuleLoadingStatus: true });
    let { paramsOptions, overViewData } = this.state;

    function commonResolve(res) {
      this.setState({ headerModuleLoadingStatus: false });
      if (res.state === 200) {
        let item;
        let tempData = JSON.parse(JSON.stringify(overViewData));
        for (let i = 0, len = tempData.length; i < len; i++) {
          if (itemIndex != undefined) {
            itemIndex = itemIndex + 1;
            item = tempData[itemIndex];
          } else {
            item = tempData[i];
          }
          if (res.data[item.mapDifferentValue] && res.data[item.mapDifferentValue].indexOf('-') === 0) {
            //较上期下降
            item.differenceNum = res.data[item.mapDifferentValue];
          } else {
            //较上期上涨
            item.differenceNum = '+' + (res.data[item.mapDifferentValue] || '0');
          }
          item.num = res.data[item.mapValue];
          if (itemIndex) {
            break;
          }
        }

        return JSON.parse(JSON.stringify(tempData));
      }
    }

    dispatch({
      type: 'statistics/get_user_overview',
      payload: params ? params : paramsOptions[0],
      callback: (res) => {
        let tempObj1 = commonResolve.call(this, res);
        this.setState({
          overViewData: [overViewData[0], tempObj1[1], tempObj1[2], tempObj1[3]],
        }, () => {
          if (itemIndex == undefined) {
            dispatch({
              type: 'statistics/get_user_overview_static',
              payload: {},
              callback: (res) => {
                let tempObj2 = commonResolve.call(this, res);
                this.setState({
                  overViewData: [tempObj2[0], tempObj1[1], tempObj1[2], tempObj1[3]],
                });
              },
            });
          }
        });
      },
    });
  };

  //时间筛选器返回的时间数据
  updateSelectDate = (date, index) => {
    let { changeTrendParams, orderPayTrendParams } = this.state;
    let _this = this;
    if (index == '_change_trend') {
      //变化趋势的时间筛选
      changeTrendParams = { ...changeTrendParams, ...date };
      this.setState({ changeTrendParams }, () => {
        _this.getChangeTrendData();
      });
    } else if (index == '_order_pay_trend') {
      //支付客单价变化趋势的时间筛选
      orderPayTrendParams = { ...orderPayTrendParams, ...date };
      this.setState({ orderPayTrendParams }, () => {
        _this.getOrderPayTrendData();
      });
    }
  };

  //变化趋势筛选事件
  handleChangeTrendType = (e) => {
    const { changeTrendAllData } = this.state;
    this.setState({
      curChangeTrengDataType: e.target.value,
    }, () => {
      this.handleMemberClientPercentData(changeTrendAllData);
    });
  };

  render() {
    const { headerModuleLoadingStatus, overViewData, changeTrendLoading, changeTrendData, changeTrendTypeData, curChangeTrengDataType, orderPayTrendLoading, orderPayTrendData } = this.state;
    return (
      <div className={`${stat.saling_stat} ${stat.stat_part}`}
           style={{ flex: 1 }}>
        <SldScrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 60}
        >
          <div className={`${stat.label_panel}`} style={{ background: '#fff' }}>
            {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('用户总览')}`, 10, 0, 0)}
          </div>

          {/* 用户总览-start */}
          <Spin spinning={headerModuleLoadingStatus}>
            <OverView data={overViewData} getMemberPreviewData={this.getMemberPreviewData}/>
          </Spin>
          {/* 用户总览-end */}

          {/* 变化趋势-start */}
          <div style={{ margin: '10px 0', width: '100%' }} className={`${stat.common_table_item}`}>
            <div className={`${stat.label_panel} ${global.flex_row_between_center}`}>
              <div className={`${global.flex_row_start_center}`}>
                {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('变化趋势')}`, 10, 0, 0)}
              </div>
              <SldStatDate idIndex={'_change_trend'}
                           updateSelectDate={(date) => this.updateSelectDate(date, '_change_trend')}/>
            </div>
            <div className={`${stat.change_trend_radio}`}>
              <span>{sldComLanguage('筛选项：')}</span>
              <Radio.Group
                options={changeTrendTypeData}
                onChange={this.handleChangeTrendType}
                defaultValue={curChangeTrengDataType}
              />
            </div>
            <Spin spinning={changeTrendLoading}>
              <div className={`${stat.stat_common_table}`} style={{ paddingLeft: 10, height: 498 }}>
                {changeTrendData.length > 0
                  ? <LineArea data={changeTrendData} lineColor={this.changeTrendLineColor}
                              areaColor={this.changeTrendAreaColor}/>
                  : noDataPlaceholder()
                }
              </div>
            </Spin>
          </div>
          {/* 变化趋势-end */}

          <div className={`${global.flex_row_start_start}`} style={{ flexWrap: 'wrap' }} style={{ marginTop: -10 }}>
            {/* 用户偏好商品排行-TOP10-start */}
            <GoodsPreferRank/>
            {/* 用户偏好商品排行-TOP10-end */}

            {/* 支付客单价变化趋势-start */}
            <div className={`${stat.common_table_item}`} style={{ marginTop: 10 }}>
              <div className={`${stat.label_panel} ${global.flex_row_between_center}`}>
                <div className={`${global.flex_row_start_center}`}>
                  {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('支付客单价变化趋势')}`, 10, 0, 0)}
                </div>
                <SldStatDate idIndex={'_order_pay_trend'}
                             updateSelectDate={(date) => this.updateSelectDate(date, '_order_pay_trend')}/>
              </div>
              <Spin spinning={orderPayTrendLoading}>
                <div className={`${stat.table_main}`}>
                  {orderPayTrendData.length > 0
                    ? <LineArea data={orderPayTrendData} unit={'¥'}/>
                    : noDataPlaceholder()
                  }
                </div>
              </Spin>
            </div>
            {/* 支付客单价变化趋势-end */}
          </div>

          {/* 会员报表-start */}
          <StatisticsReportMember/>
          {/* 会员报表-end */}
        </SldScrollbars>
      </div>
    );
  }
}
