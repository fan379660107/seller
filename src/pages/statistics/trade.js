import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Tooltip as TooltipAntd, Spin } from 'antd';
import {
  sldLlineRtextAddMargin,
  sldComLanguage,
  sldSvgIcon,
  getSldHorLineBgColor,
  formatNum,
} from '@/utils/utils';
import {
  statDateSearchParams, statTradeOverViewData, statTradeBarColor,
} from '@/utils/util_data';
import global from '@/global.less';
import stat from '@/assets/css/stat.less';
import SldScrollbars from '@/components/SldScrollbars';
import SldStatDate from '@/components/SldStatDate';
import StatisticsTradeOther from './trade_other';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);
const barColor = statTradeBarColor();
@connect(({ common }) => ({
  common,
}))
@Form.create()

export default class StatisticsTrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overViewLoading: false,//总览数据loading
      loadedFlag: false,//顶部数据是否加载完成
      pvData: statTradeOverViewData(),
      tradeOverviewParams: statDateSearchParams(),
      chartsInfoData: {},
    };
  };

  componentDidMount() {
    this.getTradeOverview();
  }

  //获取交易总览的数据
  getTradeOverview = () => {
    const { dispatch } = this.props;
    const { pvData, tradeOverviewParams, chartsInfoData } = this.state;
    let params = { ...tradeOverviewParams };
    dispatch({
      type: 'statistics/get_analysis_trade_overview',
      payload: params,
      callback: (res) => {
        if (res.state === 200) {
          chartsInfoData.pvPayRate = res.data.pvPayRate || '--';
          chartsInfoData.pvSubmitRate = res.data.pvSubmitRate || '--';
          chartsInfoData.submitPayRate = res.data.submitPayRate || '--';
          pvData.forEach((item, index) => {
            item.children.forEach((item2, index2) => {
              if (res.data[item2.mapDifferentValue] && res.data[item2.mapDifferentValue].indexOf('-') != 0) {
                //上涨
                item2['differenceNum'] = '+' + res.data[item2.mapDifferentValue];
                item2.isUp = true;
              } else {
                //下降
                item2['differenceNum'] = res.data[item2.mapDifferentValue];
                item2.isUp = false;
              }
              item2['num'] = item2.isMoney ? parseFloat(res.data[item2.mapValue]).toFixed(2) : res.data[item2.mapValue];
            });
          });
          this.setState({ pvData });
        }
        this.setState({ loadedFlag: true });
      },
    });
  };

  //时间筛选器返回的时间数据
  updateSelectDate = (date, index) => {
    let { tradeOverviewParams } = this.state;
    let _this = this;
    if (index == '_trade_over_view') {
      //交易总览的时间筛选
      tradeOverviewParams = { ...tradeOverviewParams, ...date };
      this.setState({ tradeOverviewParams }, () => {
        _this.getTradeOverview();
      });
    }
  };

  render() {
    const { loadedFlag, chartsInfoData, pvData, overViewLoading } = this.state;
    return (
      <div className={`${stat.trade_stat} ${stat.stat_part}`}
           style={{ flex: 1, overflow: 'auto' }}>
        <SldScrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 60}
        >
          <div className={`${stat.label_panel} ${global.flex_row_start_center}`}>
            {sldLlineRtextAddMargin('#FA6F1E', `${sldComLanguage('交易总览')}`, 10, 0, 0)}
          </div>
          {getSldHorLineBgColor(1, 'rgba(216, 216, 216, 0.5)')}
          <div className={`${stat.change_trend_radio}`} style={{ marginLeft: 25, marginTop: 15, marginBottom: 15 }}>
            <SldStatDate idIndex={'_trade_over_view'}
                         updateSelectDate={(date) => this.updateSelectDate(date, '_trade_over_view')}/>
          </div>
          <Spin spinning={overViewLoading}>
            <div className={`${stat.preview_stat_panel}`}>
              <div className={`${stat.charts_panel} ${stat.funnel}`}>
                <div className={stat.part}>
                  <div className={global.flex_column_center_center}>
                    <div className={stat.center_item_top}>
                      <div className={`${stat.top_content} ${global.flex_row_center_center}`}>
                        <img className={stat.funnel_center_img} src={require('@/assets/charts_li_icon-3.png')} alt=''/>
                        <span className={stat.funnel_center_img_desc}>{sldComLanguage('访问')}</span>
                      </div>
                    </div>
                    <div className={stat.center_item_center}>
                      <div className={`${stat.center_content} ${global.flex_row_center_center}`}>
                        <img className={stat.funnel_center_img} src={require('@/assets/charts_li_icon-1.png')} alt=''/>
                        <span className={stat.funnel_center_img_desc}>{sldComLanguage('下单')}</span>
                      </div>
                    </div>
                    <div className={stat.center_item_bottom}>
                      <div className={`${stat.bottom_content} ${global.flex_row_center_center}`}>
                        <img className={stat.funnel_center_img} src={require('@/assets/charts_li_icon-2.png')} alt=''/>
                        <span className={stat.funnel_center_img_desc}>{sldComLanguage('支付')}</span>
                      </div>
                    </div>
                  </div>
                  <div className={stat.left_top_line}></div>
                  <div className={stat.left_bottom_line}></div>
                  <div className={stat.right_line}></div>
                  <div className={stat.left_top_content}>
                    <p className={stat.side_content_desc}>{sldComLanguage('访问-下单转化率')}</p>
                    <p className={stat.side_content_desc}>{chartsInfoData.pvSubmitRate || '--'}</p>
                  </div>
                  <div className={stat.left_bottom_content}>
                    <p className={stat.side_content_desc}>{sldComLanguage('下单-支付转化率')}</p>
                    <p className={stat.side_content_desc}>{chartsInfoData.submitPayRate || '--'}</p>
                  </div>
                  <div className={stat.right_content}>
                    <p className={stat.side_content_desc}>{sldComLanguage('访问-支付转化率')}</p>
                    <p className={stat.side_content_desc}>{chartsInfoData.pvPayRate || '--'}</p>
                  </div>
                </div>
              </div>
              {pvData.map((item2, index2) => (
                <div key={index2} className={`${stat.stat_item}`}>
                  <ul className={`${global.flex_row_start_center}`}>
                    {item2.children.map((item, index) => (
                      <li key={index}>
                        <div className={`${stat.up_label} ${global.flex_row_start_center}`}>
                          <span>{item.label}</span>
                          <TooltipAntd placement="right" title={item.tip}>
                            <img src={require('@/assets/pv_icon.png')} alt=''/>
                          </TooltipAntd>
                        </div>
                        <div style={{ marginLeft: item.isMoney ? '-6px' : '' }}
                             className={`${stat.num}`}>
                          {loadedFlag && (
                            item.num > 10000
                              ? formatNum(item.num, item.isMoney ? 2 : 0)
                              : <TweenOne animation={{
                                Children: {
                                  value: item.num, floatLength: item.isMoney ? 2 : 0,
                                  formatMoney: true,
                                },
                                duration: 1000,
                              }}/>
                          )}
                        </div>
                        <div className={`${stat.down_difference}`}>
                          <span className={`${stat.label}`}>{sldComLanguage('较上期')}</span>
                          {item.differenceNum ? (<span style={{ color: item.isUp ? '#52C41A' : '#C41A1A' }}
                                                       className={`${stat.difference_num}`}>{item.differenceNum}<span
                            className={`${stat.custom_svg_iconfont}`}>{sldSvgIcon(item.isUp ? '#52C41A' : '#C41A1A', 16, 16, item.isUp ? 'shangsheng' : 'xiajiang')}</span></span>) : (
                            <span>--</span>)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Spin>
          <StatisticsTradeOther/>
        </SldScrollbars>
      </div>
    );
  }
}
