import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Empty, Form, Tabs } from 'antd';
import { sldLlineRtextAddGoodsAddMargin,sldComLanguage,getSldEmptyH } from '@/utils/utils';
import global from '@/global.less';
import PresaleLists from './presale_lists';
import PresaleListsAll from './presale_lists_all';

const TabPane = Tabs.TabPane;
@connect(({ promotion }) => ({
  promotion,
}))
@Form.create()
export default class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading:true,
      enableFlag:0,//预售活动开关
    };
  }
  componentDidMount() {
    this.getSetting();
  }

  //获取系统配置(预售活动是否开启)
  getSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'presale_is_enable'},
      callback: (res) => {
        if (res.state == 200) {
          this.setState({enableFlag:res.data[0].value,isFirstLoading:false})
        }
      },
    });
  };

  render() {
    const {isFirstLoading,enableFlag} = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('预售活动')}`, 0, 0, 10)}
        {enableFlag == 1&&!isFirstLoading
          &&<Tabs type="card" defaultActiveKey="1" animated={false} onTabClick={this.onHandleTabClick}>
          <TabPane tab={`${sldComLanguage('定金预售')}`} key="1">
            <PresaleLists/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('全款预售')}`} key="2">
            <PresaleListsAll/>
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
              <span>{sldComLanguage('预售活动模块暂未开启')}</span>
            }
          >
          </Empty>
        </Fragment>
        }
      </div>

    );
  }
}
