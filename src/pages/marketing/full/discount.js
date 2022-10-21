import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import { sldComLanguage, getSldEmptyH, sldLlineRtextAddGoodsAddMargin } from '@/utils/utils';
import global from '@/global.less';
import FullAcmList from './full_acm_list';
import FullAsmList from './full_asm_list';
import FullAldList from './full_ald_list';
import FullNldList from './full_nld_list';

const TabPane = Tabs.TabPane;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sld_show_tip: true,//是否显示页面提示，默认显示
    };
  }

  componentDidMount() {
  }

  handleToggleTip = () => {
    this.setState({
      sld_show_tip: !this.state.sld_show_tip,
    });
  };

  render() {
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#FA6F1E', `${sldComLanguage('满优惠活动')}`, 0, 0, 10)}
        {getSldEmptyH(8)}
        <Tabs type="card" defaultActiveKey="1" animated={false} onTabClick={this.onHandleTabClick}>
          <TabPane tab={`${sldComLanguage('满减')}`} key="1">
            <FullAcmList/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('阶梯满减')}`} key="2">
            <FullAsmList/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('满N元折扣')}`} key="3">
            <FullAldList/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('满N件折扣')}`} key="4">
            <FullNldList/>
          </TabPane>
        </Tabs>

      </div>

    );
  }
}
