import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import { sldLlineRtextAddGoodsAddMargin,sldComLanguage } from '@/utils/utils';
import global from '@/global.less';
import ExpressList from './express_list';
import ExpressSetting from './setting';
import Transport from './transport';

const TabPane = Tabs.TabPane;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class OrderExpressIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
    };
  }
  componentDidMount() {
    if(this.props.location.query.tab!=undefined&&this.props.location.query.tab){
      this.setState({activeKey:this.props.location.query.tab})
    }
  }

  onHandleTabClick = (e) => {
    this.setState({activeKey:e})
  }

  render() {
    const {activeKey} = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('物流管理')}`, 0, 0, 10)}
        <Tabs type="card" activeKey={activeKey} animated={false} onTabClick={this.onHandleTabClick}>
          <TabPane tab={`${sldComLanguage('运费模板')}`} key="1">
            <Transport/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('免运费设置')}`} key="2">
            <ExpressSetting/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('物流公司')}`} key="3">
            <ExpressList/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
