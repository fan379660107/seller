import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import { sldLlineRtextAddGoodsAddMargin,sldComLanguage } from '@/utils/utils';
import global from '@/global.less';
import GoodsOnlineLists from './goods_online_lists';
import GoodsOfflineLists from './goods_offline_lists';
import GoodsCheckLists from './goods_check_lists';
import GoodsStorageLists from './goods_storage_lists';

const TabPane = Tabs.TabPane;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class GoodsList extends Component {
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
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('商品管理')}`, 0, 0, 10)}
        <Tabs type="card" activeKey={activeKey} animated={false} onTabClick={this.onHandleTabClick}>
          <TabPane tab={`${sldComLanguage('在售商品')}`} key="1">{/* 在售商品 */}
            <GoodsOnlineLists/>
          </TabPane>
          {/*<TabPane tab={`${sldComLanguage('仓库中商品')}`} key="2">*/}
          {/*  <GoodsStorageLists/>*/}
          {/*</TabPane>*/}
          {/*<TabPane tab={`${sldComLanguage('待审核商品')}`} key="3">*/}
          {/*  <GoodsCheckLists/>*/}
          {/*</TabPane>*/}
          <TabPane tab={`${sldComLanguage('违规下架商品')}`} key="4">
            <GoodsOfflineLists/>
          </TabPane>
        </Tabs>

      </div>

    );
  }
}
