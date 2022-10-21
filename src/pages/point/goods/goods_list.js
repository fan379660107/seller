import { connect } from 'dva/index';
import React, { Component,Fragment } from 'react';
import { Form, Tabs,Empty } from 'antd';
import { sldLlineRtextAddGoodsAddMargin,sldComLanguage,getSldEmptyH } from '@/utils/utils';
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
      updateFlag:'',//更新数据标识
      isFirstLoading:true,
      enableFlag:0,//积分商城开关
    };
  }
  componentDidMount() {
    this.getSetting();
  }

  //获取系统配置(积分商城是否开启)
  getSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'integral_mall_is_enable'},
      callback: (res) => {
        if (res.state == 200) {
          this.setState({enableFlag:res.data[0].value,isFirstLoading:false})
        }
      },
    });
  };

  setUpdateFlag = (flag) => {
    this.setState({updateFlag:flag})
  }

  render() {
    const {updateFlag,enableFlag,isFirstLoading} = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('商品管理')}`, 0, 0, 10)}
        {enableFlag == 1&&!isFirstLoading
          &&<Tabs type="card" defaultActiveKey="1" animated={false} onTabClick={this.onHandleTabClick}>
            <TabPane tab={`${sldComLanguage('在售商品')}`} key="1">
              <GoodsOnlineLists updateFlag={updateFlag} setUpdateFlag={this.setUpdateFlag}/>
            </TabPane>
            <TabPane tab={`${sldComLanguage('仓库中商品')}`} key="2">
              <GoodsStorageLists updateFlag={updateFlag} setUpdateFlag={this.setUpdateFlag}/>
            </TabPane>
            <TabPane tab={`${sldComLanguage('待审核商品')}`} key="3">
              <GoodsCheckLists/>
            </TabPane>
            <TabPane tab={`${sldComLanguage('违规下架商品')}`} key="4">
              <GoodsOfflineLists/>
            </TabPane>
          </Tabs>
        }
        {enableFlag != 1&&!isFirstLoading&&
          <Fragment>
            {getSldEmptyH(150)}
            <Empty
              image={require('@/assets/moudle_disable.png')}
              imageStyle={{
                height: 80,
              }}
              description={
                <span>{sldComLanguage(`${sldComLanguage('积分商城模块暂未开启')}`)}</span>
              }
            >
            </Empty>
          </Fragment>
        }
      </div>

    );
  }
}
