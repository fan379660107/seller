import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Empty, Form, Tabs } from 'antd';
import { sldLlineRtextAddGoodsAddMargin,sldComLanguage,getSldEmptyH } from '@/utils/utils';
import global from '@/global.less';
import ALLList from './all_list';
import JoinedList from './joined_list';

const TabPane = Tabs.TabPane;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading:true,
      enableFlag:0,//秒杀活动开关
    };
  }
  componentDidMount() {
    this.getSetting();
  }

  //获取系统配置(秒杀活动是否开启)
  getSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'seckill_is_enable'},
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
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('秒杀活动管理')}`, 0, 0, 10)}
        {enableFlag == 1&&!isFirstLoading
          &&<Tabs type="card" defaultActiveKey="1" animated={false} onTabClick={this.onHandleTabClick}>
          <TabPane tab={`${sldComLanguage('秒杀活动')}`} key="1">
            <ALLList/>
          </TabPane>
          <TabPane tab={`${sldComLanguage('已参加活动')}`} key="4">
            <JoinedList/>
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
              <span>{sldComLanguage('秒杀活动模块暂未开启')}</span>
            }
          >
          </Empty>
        </Fragment>
        }
      </div>

    );
  }
}
