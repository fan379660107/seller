import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Spin } from 'antd';
import { sldComLanguage, getSldEmptyH } from '@/utils/utils';
import global from '@/global.less';
import promotion from '@/assets/css/promotion.less';
import SldScrollbars from '@/components/SldScrollbars';
import { specialFlag } from '@/utils/sldconfig';
import router from 'umi/router';

@connect(({ product, global }) => ({
  product, global,
}))
@Form.create()
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenW: document.body.clientWidth,//屏幕宽度
      emptyFlag: false,//是否展示空提示
      loading: false,//是否展示标识
      all_data: [
        {
          name: 'spell_group',
          icon: require('@/assets/center/spell_group.png'),
          title: `${sldComLanguage('拼团')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('通过社交关系，降低拉新成本提提高获客效率。')}`,
          path: '/marketing/spell_group',
        },
        {
          name: 'ladder_group',
          icon: require('@/assets/center/ladder_group.png'),
          title: `${sldComLanguage('阶梯团')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('进阶版拼团，可设置阶梯拼团价格。')}`,
          path: '/marketing/ladder_group',
        },
        {
          name: 'spreader',
          icon: require('@/assets/center/spreader.png'),
          title: `${sldComLanguage('推手')}`,
          extraFlag: true,
          showFlag: false,
          desc: `${sldComLanguage('招募分销员，提高销售效率。')}`,
          path: '/spreader',
        },
        {
          name: 'sckill',
          icon: require('@/assets/center/sckill.png'),
          title: `${sldComLanguage('秒杀')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('快速抢购，引导顾客完成消费。')}`,
          path: '/marketing/seckill',
        },
        {
          name: 'store_coupon',
          icon: require('@/assets/center/store_coupon.png'),
          title: `${sldComLanguage('店铺优惠券')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('查看和管理平台内店铺的优惠券。')}`,
          path: '/marketing/coupon_list',
        },
        {
          name: 'svideo',
          icon: require('@/assets/center/svideo.png'),
          title: `${sldComLanguage('短视频')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('短视频带货，以直观的内容促进转化。')}`,
          path: '/marketing/video',
        },
        {
          name: 'live',
          icon: require('@/assets/center/live.png'),
          title: `${sldComLanguage('直播')}`,
          extraFlag: true,
          showFlag: false,
          desc: `${sldComLanguage('会员与带货主播实时交流互动促进转化。')}`,
          path: '/marketing/video',
        },
        {
          name: 'presale',
          icon: require('@/assets/center/presale.png'),
          title: `${sldComLanguage('预售')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('热门商品提前预发。')}`,
          path: '/marketing/presale',
        },
        {
          name: 'full_acm',
          icon: require('@/assets/center/full_acm.png'),
          title: `${sldComLanguage('满减')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('满足条件的用户享受减价购买。')}`,
          path: '/marketing/full_acm',
        },
        {
          name: 'full_asm',
          icon: require('@/assets/center/full_asm.png'),
          title: `${sldComLanguage('阶梯满减')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('进阶版满减，满足条件的可享受多级优惠。')}`,
          path: '/marketing/full_asm',
        },
        {
          name: 'full_ald',
          icon: require('@/assets/center/full_ald.png'),
          title: `${sldComLanguage('满N元折扣')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('购买满N元享受折扣。')}`,
          path: '/marketing/full_ald',
        },
        {
          name: 'full_nld',
          icon: require('@/assets/center/full_nld.png'),
          title: `${sldComLanguage('满N件折扣')}`,
          extraFlag: false,
          showFlag: false,
          desc: `${sldComLanguage('购买满N件享受折扣。')}`,
          path: '/marketing/full_nld',
        },
        {
          name: 'point',
          icon: require('@/assets/center/point.png'),
          title: `${sldComLanguage('积分商城')}`,
          extraFlag: false,
          desc: `${sldComLanguage('积分换购商品，促进用户购买。')}`,
          path: '/point',
        },
      ],////所有应用一维数据
      data: [
        {
          title: `${sldComLanguage('拉新获客')}`,
          child_name_array: ['spreader', 'spell_group', 'ladder_group'],
          show_num: 0,//展示应用的数量
          child: [],
        },
        {
          title: `${sldComLanguage('促进转化')}`,
          child_name_array: ['svideo', 'live', 'sckill', 'store_coupon'],
          show_num: 0,//展示应用的数量
          child: [],
        },
        {
          title: `${sldComLanguage('提高客单价')}`,
          child_name_array: ['presale', 'full_acm', 'full_asm', 'full_ald', 'full_nld'],
          show_num: 0,//展示应用的数量
          child: [],
        },
        {
          title: `${sldComLanguage('留存复购')}`,
          child_name_array: ['point'],
          show_num: 0,//展示应用的数量
          child: [],
        },
      ],//应用中心数据
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, { passive: true });
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
    this.initData();
  }

  menu = ['/marketing', '/point', '/spreader'];//拥有的菜单字符串数组

  initData = () => {
    let { emptyFlag, data, all_data } = this.state;
    let sld_menu_data = localStorage.getItem('sld_menu_data');
    if (sld_menu_data != undefined && sld_menu_data) {
      sld_menu_data = JSON.parse(sld_menu_data);//全部菜单缓存数据
    }
    let cur_menu_data = sld_menu_data.filter(item => this.menu.indexOf(item.frontPath) > -1);//当前页面拥有的菜单数据
    if (cur_menu_data.length > 0) {
      cur_menu_data.map(item => {
        if (item.frontPath == '/point' || item.frontPath == '/spreader') {
          let temp_data = all_data.filter(child => child.path == item.frontPath);
          temp_data[0].showFlag = true;
          temp_data[0].path = item.children[0].frontPath;
        } else if (item.frontPath == '/marketing') {
          let all_child_path = [];//该管理员所拥有的应用中心菜单名称数组
          item.children.map(child => {
            all_child_path.push(child.frontPath);
          });
          all_data.map(child => {
            if (all_child_path.indexOf(child.path) > -1) {
              child.showFlag = true;
            }
          });
        }
      });

      //将all_data 下面的数据都分别组装到data里面
      data.map(item => {
        all_data.map(child => {
          if (item.child_name_array.indexOf(child.name) > -1 && child.showFlag) {
            item.child.push({ ...child });
            item.show_num += 1;
          }
        });
      });

    } else {
      emptyFlag = true;
    }
    this.setState({
      emptyFlag,
      data,
      all_data,
      loading: false,
    });
  };

  resize = () => {
    this.setState({ screenW: document.body.clientWidth });
  };

  go = (val) => {
    router.push(val.path);
  };

  render() {
    const { data, screenW, loading } = this.state;
    const mainW = this.props.global != undefined && this.props.global.collapsed != undefined && this.props.global.collapsed ? 90 : 150;
    let itemW = (screenW * 1 - mainW - 120) / 4;
    let descW = itemW - 60 - 40 - 15;
    return (
      <Spin spinning={loading}>
        <div className={`${global.common_page} ${promotion.center}`} style={{ flex: 1 }}>
          <SldScrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={document.body.clientHeight - 60}
          >
            <div className={`${promotion.center_title} ${global.flex_row_start_ceter}`}>{sldComLanguage('应用中心')}</div>
            {data.map((item, index) => {
              return item.show_num?<div key={index} className={`${promotion.center_item} ${global.flex_column_start_start}`}>
                <div className={`${promotion.center_item_title}`}>{item.title}</div>
                <div className={`${promotion.center_item_content} ${global.flex_row_start_center}`}
                     style={{ flexWrap: 'wrap' }}>
                  {item.child.map((child_item, child_index) => {
                    return <div key={child_index} className={`${promotion.child_item} ${global.flex_row_start_start}`}
                                style={{ marginLeft: child_index % 4 > 0 ? 20 : 0, width: itemW }}
                                onClick={() => this.go(child_item)}>
                      <img className={`${promotion.left_img}`} src={child_item.icon}/>
                      <div className={`${promotion.right_part} ${global.flex_column_center_start}`}>
                        <div className={`${promotion.right_part_top} ${global.flex_row_start_start}`}>
                          <span className={`${promotion.top_title}`}>{child_item.title}</span>
                          {child_item.extraFlag && specialFlag > -3 &&
                          <span className={`${promotion.top_flag} ${global.flex_row_center_center}`}>{sldComLanguage('加配')}</span>
                          }
                        </div>
                        <span className={`${promotion.desc}`} style={{ width: descW }}
                              title={child_item.desc}>{child_item.desc}</span>
                      </div>
                    </div>;
                  })
                  }
                </div>
              </div>:null;
            })}
            {getSldEmptyH(60)}
          </SldScrollbars>
        </div>
      </Spin>
    );
  }
}
