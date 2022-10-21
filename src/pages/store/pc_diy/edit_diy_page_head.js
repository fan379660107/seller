/*
* 装修页面头部
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { sldComLanguage } from '@/utils/utils';
import { Form } from 'antd';
import {sldSvgIcon} from '@/utils/utils';
import global from '@/global.less';
import styles from './edit_diy_page_head.less';

let sthis = '';
@connect(({ decorate, manage }) => ({
  decorate, manage,
}))
@Form.create()

export default class EditDdiyPageHead extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    const {
      form: { getFieldDecorator },
    } = props;
    this.state = {
      store_base_info: {},//店铺基本信息
      store_cat: [],//店铺分类
    };
  }


  componentDidMount() {
    this.get_vendor_base_info();
    this.get_store_cat();
  }

  componentWillUnmount() {

  }

  //获取店铺的基本信息
  get_vendor_base_info = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'decorate/get_store_info',
      callback: (res) => {
        if (res.state == 200) {
          this.setState({ store_base_info: res.data });
        }
      },
    });
  };

  //获取店铺分类
  get_store_cat = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'decorate/get_store_category_list',
      callback: (res) => {
        if (res.state == 200) {
          this.setState({ store_cat: res.data });
        }
      },
    });
  };


  render() {
    const {store_cat,store_base_info} = this.state;
    return (
      <Fragment>
        {/* 最顶部 start */}
        <div className={styles.header_wrap}>
          <div className={styles.header}>
            <div className={styles.header_left}>
              <span className={styles.hello}>{sldComLanguage('您好，欢迎来到')}</span>
              <span className={`${styles.register} ${styles.h1}`}>{sldComLanguage('登录')}</span>
              <span className={`${styles.register} ${styles.h1}`}>{sldComLanguage('注册')}</span>
            </div>
            <div className={styles.header_right}>
              <ul>
                <li>
                  <div className={styles.li_item}>{sldComLanguage('商城首页')}</div>
                </li>
                <li>
                  <div className={`${styles.has_more} ${styles.li_item}`}>
                    {sldComLanguage('我的订单')}
                    <div className={styles.li_item_more}>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('待支付订单')}</a>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('待收货订单')}</a>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('待评价订单')}</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.li_item}>{sldComLanguage('个人中心')}</div>
                </li>
                <li>
                  <div className={`${styles.has_more} ${styles.li_item}`}>
                    {sldComLanguage('我的收藏')}
                    <div className={styles.li_item_more}>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('商品收藏')}</a>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('店铺收藏')}</a>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('我的足迹')}</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${styles.has_more} ${styles.li_item}`}>
                    {sldComLanguage('我的账户')}
                    <div className={styles.li_item_more}>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('我的优惠券')}</a>
                      <a href="javascript:void(0)" className={styles.li_item_more_item}>{sldComLanguage('我的余额')}</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${styles.li_item}`}>{sldComLanguage('服务中心')}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* 最顶部 end */}

        {/* 搜索部分 start */}
        <div className={styles.sld_store_header}>
          <div className={styles.container}>
            <div className={`${styles.ld} ${styles.left}`}>
              <a className={`${styles.sld_img_center} ${styles.fl}`}>
                <img src={store_base_info.adminLogoUrl} alt={'商城logo'}/>
              </a>
              <span className={`${styles.fl} ${styles.line}`}></span>
              <div className={`${styles.sld_store_rate} ${styles.fl}`}>
                <p className={styles.name}>{store_base_info.storeName}</p>
                <p className={styles.rate}>{sldComLanguage('综合评分：')}<em>{store_base_info.comprehensiveScore}</em> <i className={styles.sld_sjx}></i>
                </p>
                <div className={styles.sld_store_info_more}>
                  <div className={`${styles.top} ${styles.clearfix}`}>
                    <div className={styles.fl}>
                      <h4>{sldComLanguage('店铺评分')}</h4>
                      <p>{sldComLanguage('描述相符：')}{store_base_info.descriptionScore}</p>
                      <p>{sldComLanguage('服务态度：')}{store_base_info.serviceScore}</p>
                      <p>{sldComLanguage('发货速度：')}{store_base_info.deliverScore}</p>
                    </div>
                    <div className={`${styles.fr} ${global.flex_row_center_center}`}>
                      <img src={store_base_info.storeLogoUrl} alt="${sldComLanguage('店铺logo')}"/>
                    </div>
                  </div>
                  <div className={styles.center}>
                    <p>{sldComLanguage('服务承诺：')}<a href="JavaScript:;">{sldComLanguage('正品保障')}</a></p>
                    <p>{sldComLanguage('客服电话：')}--</p>
                    <p>{sldComLanguage('联系客服：')}
                      <a className={styles.kefu} href="javascript:void(0)">--</a>
                    </p>
                  </div>
                  <div className={styles.bottom}>
                    <a className={styles.go_store_btn} href={'javascript:void(0)'}>
                      {sldComLanguage('店铺首页')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.search_wrap} ${styles.clearfix}`}>
              <form className={`${styles.fl}`} action="javascript:void(0)" method="get">
                <input type="text" className={styles.text} placeholder={sldComLanguage('请输入关键词')} autocomplete="off"
                       style={{ color: 'rgb(153,153,153)' }}/>
                <input type="submit" value={sldComLanguage('搜索')} className={styles.button}/>
              </form>
              <input type="submit" value={sldComLanguage('搜本店')} className={`${styles.button} ${styles.fl}`}
                     style={{ background: '#333' }}/>
            </div>

            <div className={styles.sld_cart_wrap}>
              <dl>
                <dt className={`${styles.ld} ${styles.cart_icon_text_wrap}`}
                    style={{ borderBottom: '1px solid rgb(239, 239, 239)' }}>

                  <span className={styles.iconfont}>{sldSvgIcon('#e2231a',16,16,'gouwuche1')}</span>
                  <a href="javascript:void(0)">
                    {sldComLanguage('我的购物车')}
                  </a>
                  <div className={styles.cart_goods_num}>0</div>
                </dt>
              </dl>
            </div>
          </div>
          <div className={styles.sld_store_label_nav_wrap}>
            <div className={styles.sld_store_label_wrap}>
              <img src={store_base_info.storeBannerPc}/>
            </div>
            <div className={styles.sld_store_nav}>
              <ul className={styles.clearfix}>
                <li className={styles.sld_all_store_cat}>
                  <p className={styles.all_type} style={{ fontWeight: 'bold' }}><span>{sldComLanguage('本店全部分类')}</span></p>
                </li>
                <ul className={styles.sld_store_cat_horizontal}>
                  <li><a href="javascript:void(0)">{sldComLanguage('首页')}</a></li>
                  <li><a href="javascript:void(0)">{sldComLanguage('所有商品')}</a></li>
                  {store_cat.length>0&&store_cat.map((item,index)=>{
                    return <li key={index}><a href="javascript:void(0)">{item.innerLabelName}</a></li>
                  })}
                </ul>
                <div className={styles.search_line}></div>
                <div className={`${styles.search_modle} ${global.flex_row_center_center}`}>
                  <input type="text" className={styles.search_input} placeholder={sldComLanguage('请输入...')}/>
                  <span className={styles.search_input_button}>{sldComLanguage(`${sldComLanguage('搜索')}`)}</span>
                </div>
              </ul>
            </div>
          </div>
        </div>
        {/* 搜索部分 end */}
      </Fragment>
    );
  }
}
