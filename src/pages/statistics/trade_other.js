import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Radio, Spin } from 'antd';
import {
  sldLlineRtextAddMargin,
  sldComLanguage,
  noDataPlaceholder,
} from '@/utils/utils';
import {
  statDateSearchParams, statTradeOverViewData, statTradeChangeTrendTypeData, statTradeBarColor,
} from '@/utils/util_data';
import global from '@/global.less';
import stat from '@/assets/css/stat.less';
import GoodsSalesRank from '@/components/SldStat/GoodsSalesRank';
import StatisticsReportTrade from './report/trade';
import Bars from '@/components/SldStatBizcharts/Bars';
import BarSingle from '@/components/SldStatBizcharts/BarSingle';
import LineArea from '@/components/SldStatBizcharts/LineArea';
import SldStatDate from '@/components/SldStatDate';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);
const barColor = statTradeBarColor();
@connect(({ common }) => ({
  common,
}))
@Form.create()

export default class StatisticsTradeOther extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pvData: statTradeOverViewData(),
      changeTrendTypeData: statTradeChangeTrendTypeData(),//近30天变化趋势的筛选项
      changeTrendLoading: false,//近30天变化趋势模块的loading
      orderChangeTrendLoading: false,//订单变化趋势模块的loading
      curChangeTrendDataType: 'orderSubmitAmount',//近30天变化趋势的选中项
      changeTrendData: [],//近30天变化趋势的数据
      orderChangeTrendData: [],//订单变化趋势的数据
      changeTrendAllData: [],//近30天变化趋势的全部数据
      changeTrendDataBarColor: barColor.two,//柱状图颜色
      changeTrendDataFlag: 2,//近30天变化趋势的柱子类型：1为一组一条柱子的 2为一组两条柱子的
      orderChangeTrendParams: statDateSearchParams(),//订单变化趋势的筛选条件
      unit: `${sldComLanguage('¥')}`,//近30天变化趋势图表的单位
    };
  };

  componentDidMount() {
    this.getChangeTrendData();
    this.getOrderChangeTrendData();
  }

  //获取订单变化趋势的数据
  getOrderChangeTrendData = () => {
    this.setState({ orderChangeTrendLoading: true });
    const { dispatch } = this.props;
    let { orderChangeTrendData, orderChangeTrendParams } = this.state;
    let params = { ...orderChangeTrendParams };
    dispatch({
      type: 'statistics/get_order_change_trend',
      payload: params,
      callback: (res) => {
        this.setState({ orderChangeTrendLoading: false });
        if (res.state == 200) {
          orderChangeTrendData = [];
          if (res.data.orderPayNumList.length > 0) {
            for (let i in res.data.orderPayNumList) {
              orderChangeTrendData.push({
                month: res.data.orderPayNumList[i].statsTime,//横轴
                city: `${sldComLanguage('支付订单数')}`,
                temperature: res.data.orderPayNumList[i].orderPayNum,//纵轴
              });
              orderChangeTrendData.push({
                month: res.data.orderPayNumList[i].statsTime,//横轴
                city: `${sldComLanguage('下单数')}`,
                temperature: res.data.orderSubmitNumList[i].orderSubmitNum,//纵轴
              });
            }
          }
          this.setState({
            orderChangeTrendData,
          });
        }
      },
    });
  };

  //获取近30天变化趋势的数据
  getChangeTrendData = () => {
    this.setState({ changeTrendLoading: true });
    const { dispatch } = this.props;
    let { changeTrendAllData } = this.state;
    dispatch({
      type: 'statistics/get_change_trend_data',
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
    let { curChangeTrendDataType, changeTrendDataBarColor, changeTrendDataFlag, unit } = this.state;//近30天变化趋势的选中项
    let changeTrendData = [];
    let curData = data;
    changeTrendDataBarColor = barColor.two;
    changeTrendDataFlag = 2;
    for (let i in curData) {
      let time = curData[i].statsTime;
      if (curChangeTrendDataType == 'orderSubmitAmount') {
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('下单金额')}`,
          value: curData[i].orderSubmitAmount,
        });
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('支付金额')}`,
          value: curData[i].orderPayAmount,
        });
        unit = `${sldComLanguage('¥')}`;
      } else if (curChangeTrendDataType == 'orderSubmitNum') {
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('下单数')}`,
          value: curData[i].orderSubmitNum,
        });
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('支付订单数')}`,
          value: curData[i].orderPayNum,
        });
        unit = '';
      } else if (curChangeTrendDataType == 'orderSubmitAtv') {
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('下单客单价')}`,
          value: curData[i].orderSubmitAtv,
        });
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('支付客单价')}`,
          value: curData[i].orderPayAtv,
        });
        unit = `${sldComLanguage('¥')}`;
      } else if (curChangeTrendDataType == 'viewNum') {
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('店铺浏览量')}`,
          value: curData[i].viewNum,
        });
        changeTrendDataBarColor = barColor.single;
        changeTrendDataFlag = 1;
        unit = '';
      } else if (curChangeTrendDataType == 'pvPayRate') {
        changeTrendData.push({
          key: time,
          name: `${sldComLanguage('浏览-付款转化率')}`,
          value: curData[i].pvPayRate,
        });
        changeTrendDataBarColor = barColor.single;
        changeTrendDataFlag = 1;
        unit = '';
      }
    }
    this.setState({ changeTrendData, changeTrendDataBarColor, changeTrendDataFlag, changeTrendLoading: false, unit });
  };

  //时间筛选器返回的时间数据
  updateSelectDate = (date, index) => {
    let { orderChangeTrendParams } = this.state;
    let _this = this;
    if (index == '_order_change_trend') {
      //订单变化趋势的时间筛选
      orderChangeTrendParams = { ...orderChangeTrendParams, ...date };
      this.setState({ orderChangeTrendParams }, () => {
        _this.getOrderChangeTrendData();
      });
    }
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

  render() {
    const { changeTrendLoading, changeTrendTypeData, curChangeTrendDataType, changeTrendData, changeTrendDataFlag, changeTrendDataBarColor, orderChangeTrendLoading, orderChangeTrendData, unit } = this.state;
    return (
      <Fragment>
        {/* 近30天变化趋势-start */}
        <div style={{ backgroundColor: '#f0f2f5' }} className={`${global.flex_row_between_start}`}>
          <div style={{ marginTop: '10px', width: '100%', marginRight: 0 }} className={`${stat.common_table_item}`}>
            <div className={`${stat.label_panel} ${global.flex_row_start_center}`}>
              {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('近30天变化趋势')}`, 10, 0, 0)}
            </div>
            <div className={`${stat.change_trend_radio}`}>
              <span>{sldComLanguage('筛选项：')}</span>
              <Radio.Group
                options={changeTrendTypeData}
                onChange={this.handleChangeTrendType}
                defaultValue={curChangeTrendDataType}
              />
            </div>
            <Spin spinning={changeTrendLoading}>
              <div style={{ height: 400 }}>
                {changeTrendData.length > 0 && changeTrendDataFlag == 2 &&
                <Bars data={changeTrendData} color={changeTrendDataBarColor} flag={changeTrendDataFlag} unit={unit}/>}
                {changeTrendData.length > 0 && changeTrendDataFlag == 1 &&
                <BarSingle data={changeTrendData} color={changeTrendDataBarColor} flag={changeTrendDataFlag}/>}
              </div>
            </Spin>
          </div>
        </div>
        {/* 近30天变化趋势-end */}

        <div style={{ flexWrap: 'wrap', backgroundColor: '#f0f2f5', marginTop: 10 }}
             className={`${global.flex_row_between_start}`}>

          {/* 商品销售排行-TOP10-start */}
          <GoodsSalesRank/>
          {/* 商品销售排行-TOP10-end */}

          {/* 订单变化趋势-start */}
          <div className={`${stat.common_table_item}`} style={{ marginTop: 10 }}>
            <div className={`${stat.label_panel} ${global.flex_row_between_center}`}>
              <div className={`${global.flex_row_start_center}`}>
                {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('订单变化趋势')}`, 10, 0, 0)}
              </div>
              <SldStatDate idIndex={'_order_change_trend'}
                           updateSelectDate={(date) => this.updateSelectDate(date, '_order_change_trend')}/>
            </div>
            <Spin spinning={orderChangeTrendLoading}>
              <div className={`${stat.table_main}`}>
                {orderChangeTrendData.length > 0
                  ? <LineArea data={orderChangeTrendData}/>
                  : noDataPlaceholder()
                }
              </div>
            </Spin>
          </div>
          {/* 订单变化趋势-end */}

          {/* 交易报表-start */}
          <StatisticsReportTrade/>
          {/* 交易报表-end */}
        </div>
      </Fragment>
    );
  }
}
