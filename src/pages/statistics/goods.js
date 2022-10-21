import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Spin, Radio } from 'antd';
import {
  sldLlineRtextAddMargin,
  sldComLanguage,
  noDataPlaceholder,
} from '@/utils/utils';
import {
  statDateSearchParams,statGoodsPreviewData,statDateThreeSearchParams,statGoodsSalesTendTypeData,statGoodsSalesTendLineColor,statGoodsSalesTendAreaColor
} from '@/utils/util_data';
import global from '@/global.less';
import stat from '@/assets/css/stat.less';
import StatisticsReportGoodsSaling from './report/goods_saling';
import SldStatDate from '@/components/SldStatDate';
import GoodsSalesTrendTop from '@/components/SldStat/GoodsSalesTrendTop';
import LineArea from '@/components/SldStatBizcharts/LineArea';
import GoodsSalesRank from '@/components/SldStat/GoodsSalesRank';
import SldScrollbars from '@/components/SldScrollbars';
import OverView from '@/components/SldStat/OverView';

@connect(({ statistics }) => ({
  statistics,
}))
@Form.create()

export default class StatisticsGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsSalesTendLoading: false,//商品动销趋势模块loading
      headerModuleLoadingStatus: false,//头部预览模块loading
      goodsPreviewData: statGoodsPreviewData(),
      goodsSalesTendParams: statDateSearchParams(),//商品动销趋势的筛选条件
      goodsSalesTendData: [],//商品动销趋势图表数据
      goodsSalesTendAllData: [],//商品动销趋势全部数据
      curGoodsSalesTendDataType: 'newGoodsList',//商品动销趋势当前选中的数据类型：newGoodsList-新增商品数，movableGoodsList-动销商品数，orderNumList-下单数，orderPayNumList-支付订单数
      paramsOptions: statDateThreeSearchParams(),
      goodsSalesTendTypeData: statGoodsSalesTendTypeData(),//商品动销趋势的筛选项
      unit: '',//商品动销趋势提示单位
    };
  };

  goodsSalesTendLineColor = statGoodsSalesTendLineColor();//商品动销趋势图表的line颜色
  goodsSalesTendAreaColor = statGoodsSalesTendAreaColor();//商品动销趋势图表的area颜色

  componentDidMount() {
    this.getGoodsSalesTendData();
    this.getGoodsPreviewData();
  }

  //获取商品动销趋势数据
  getGoodsSalesTendData = () => {
    this.setState({ goodsSalesTendLoading: true });
    const { dispatch } = this.props;
    let { goodsSalesTendParams, goodsSalesTendAllData } = this.state;
    dispatch({
      type: 'statistics/get_goods_sales_trend',
      payload: goodsSalesTendParams,
      callback: (res) => {
        this.setState({ goodsSalesTendLoading: false });
        goodsSalesTendAllData = res.data;
        if (res.state == 200) {
          this.handleMemberClientPercentData(res.data);
          this.setState({
            goodsSalesTendAllData,
          });
        }
      },
    });
  };

  //根据当前选中的类型处理图表需要的数据
  handleMemberClientPercentData = (data) => {
    let { curGoodsSalesTendDataType,unit } = this.state;//商品动销趋势当前选中的数据类型
    let goodsSalesTendData = [];
    let curData = data[curGoodsSalesTendDataType];
    unit = '';
    for (let i in curData) {
      let time = curData[i].statsTime;
      if (curGoodsSalesTendDataType == 'newGoodsList') {
        goodsSalesTendData.push({
          month: time,
          city: `${sldComLanguage('新增商品数')}`,
          temperature: curData[i].newGoodsNum,
        });
      } else if (curGoodsSalesTendDataType == 'movableGoodsList') {
        goodsSalesTendData.push({
          month: time,
          city: `${sldComLanguage('动销商品数')}`,
          temperature: curData[i].movableGoodsNum,
        });
      } else if (curGoodsSalesTendDataType == 'orderNumList') {
        goodsSalesTendData.push({
          month: time,
          city: `${sldComLanguage('下单数')}`,
          temperature: curData[i].orderSubmitNum,
        });
      } else if (curGoodsSalesTendDataType == 'orderAmountList') {
        goodsSalesTendData.push({
          month: time,
          city: `${sldComLanguage('下单金额')}`,
          temperature: curData[i].orderSubmitAmount,
        });
        unit = '¥';
      } else if (curGoodsSalesTendDataType == 'orderPayNumList') {
        goodsSalesTendData.push({
          month: time,
          city: `${sldComLanguage('支付订单数')}`,
          temperature: curData[i].orderPayNum,
        });
      } else if (curGoodsSalesTendDataType == 'orderPayAmountList') {
        goodsSalesTendData.push({
          month: time,
          city: `${sldComLanguage('支付金额')}`,
          temperature: curData[i].orderPayAmount,
        });
        unit = '¥';
      }
    }
    this.setState({ goodsSalesTendData,unit });
  };


  //时间筛选器返回的时间数据
  updateSelectDate = (date, index) => {
    let { goodsSalesTendParams } = this.state;
    let _this = this;
    if (index == '_goods_sales_trend') {
      //商品动销趋势的时间筛选
      goodsSalesTendParams = { ...goodsSalesTendParams, ...date };
      this.setState({ goodsSalesTendParams }, () => {
        _this.getGoodsSalesTendData();
      });
    }
  };

  //商品动销趋势筛选事件
  handleGoodsSalesTendType = (e) => {
    let { goodsSalesTendAllData } = this.state;
    this.setState({
      curGoodsSalesTendDataType: e.target.value,
    }, () => {
      this.getGoodsSalesTendData(goodsSalesTendAllData);
    });
  };

  getGoodsPreviewData = (itemIndex, params) => {
    const { dispatch } = this.props;
    this.setState({ headerModuleLoadingStatus: true });
    let { paramsOptions,goodsPreviewData } = this.state;

    function commonResolve(res) {
      this.setState({ headerModuleLoadingStatus: false });
      if (res.state === 200) {
        let tempData = JSON.parse(JSON.stringify(goodsPreviewData));
        let item;
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
      type: 'statistics/get_goods_preview_data',
      payload: params ? params : paramsOptions[0],
      callback: (res) => {
        let tempObj1 = commonResolve.call(this, res);
        this.setState({
          goodsPreviewData: [goodsPreviewData[0], tempObj1[1], tempObj1[2], tempObj1[3], tempObj1[4]],
        });
        if(itemIndex == undefined){
          dispatch({
            type: 'statistics/get_goods_preview_data_static',
            payload: {},
            callback: (res) => {
              let tempObj2 = commonResolve.call(this, res);
              //对特殊参数单独做处理
              //在售商品数
              tempObj2[0].customParams[0].value = res.data.onSaleGoodsNum;
              //违规下架商品数
              tempObj2[0].customParams[1].value = res.data.violationGoodsNum;
              this.setState({
                goodsPreviewData: [tempObj2[0], tempObj1[1], tempObj1[2], tempObj1[3], tempObj1[4]],
              });
            },
          });
        }
      },
    });
  };

  render() {
    const { goodsPreviewData, goodsSalesTendLoading, goodsSalesTendData, goodsSalesTendTypeData, curGoodsSalesTendDataType, headerModuleLoadingStatus, unit } = this.state;
    return (
      <div className={`${stat.saling_stat} ${stat.stat_part}`}
           style={{ flex: 1 }}>
        <SldScrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 60}
        >
          <div className={`${stat.label_panel}`} style={{ background: '#fff' }}>
            {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('商品总览')}`, 10, 0, 0)}
          </div>

          <Spin spinning={headerModuleLoadingStatus}>
            <OverView tabItem={5} data={goodsPreviewData} getMemberPreviewData={this.getGoodsPreviewData}/>
          </Spin>

          {/* 商品动销趋势-start */}
          <div style={{ margin: '10px 0', paddingBottom: 10, width: '100%' }} className={`${stat.common_table_item}`}>
            <div className={`${stat.label_panel} ${global.flex_row_between_center}`}>
              <div className={`${global.flex_row_start_center}`}>
                {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('商品动销趋势')}`, 10, 0, 0)}
              </div>
              <SldStatDate idIndex={'_goods_sales_trend'}
                           updateSelectDate={(date) => this.updateSelectDate(date, '_goods_sales_trend')}/>
            </div>
            <div className={`${stat.change_trend_radio}`}>
              <span>{sldComLanguage('筛选项：')}</span>
              <Radio.Group
                options={goodsSalesTendTypeData}
                onChange={this.handleGoodsSalesTendType}
                defaultValue={curGoodsSalesTendDataType}
              />

            </div>
            <Spin spinning={goodsSalesTendLoading}>
              <div className={`${stat.stat_common_table}`} style={{ paddingLeft: 10,height: 498 }}>
                {goodsSalesTendData.length>0
                  ?<LineArea data={goodsSalesTendData} lineColor={this.goodsSalesTendLineColor}
                             areaColor={this.goodsSalesTendAreaColor} unit={unit}/>
                  :noDataPlaceholder()
                }
              </div>
            </Spin>
          </div>
          {/* 商品动销趋势-end */}

          <div className={`${global.flex_row_start_start}`} style={{ flexWrap: 'wrap', marginTop: -10 }}>
            {/* 商品销售排行-TOP10-start */}
            <GoodsSalesRank/>
            {/* 商品销售排行-TOP10-end */}

            {/* 商品销售变化趋势-TOP10-start */}
            <GoodsSalesTrendTop/>
            {/* 商品销售变化趋势-TOP10-end */}
          </div>
          {/* 商品报表-start */}
          <StatisticsReportGoodsSaling/>
          {/* 商品报表-end */}
        </SldScrollbars>
      </div>
    );
  }
}
