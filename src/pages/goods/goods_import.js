import React, { Component, Fragment } from 'react';
import {
  sldComLanguage,
} from '@/utils/utils';
import global from '@/global.less';
import product from './product.less';
import router from 'umi/router';

export default class AttributeGroup extends Component {
  constructor(props) {
    super(props);
  }

  data = [{
    icon: require('@/assets/goods/platform_goods_icon.png'),
    title: sldComLanguage('商品资料库导入'),
    desc: sldComLanguage('商品资料库是由平台运营人员维护的商品数据库，店铺可挑选计划售卖的商品一键导入进行售卖。'),
    path: '/goods/goods_import_to_platform',
  }, {
    icon: require('@/assets/goods/excel_import_icon.png'),
    title: sldComLanguage('Excel导入'),
    desc: sldComLanguage('通过Excel文件批量导入商品数据。'),
    path: '/goods/goods_import_to_excel',
  }];//页面数据数组

  componentDidMount() {
  }

  toImport = (path) => {
    router.push(path);
  }

  render() {
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        <div className={`${product.goods_import_title} ${global.flex_row_start_ceter}`}>
          {sldComLanguage('商品导入')}
        </div>
        <div className={`${global.flex_row_start_start} ${product.goods_import_con}`}>
          {this.data.map((item) => {
            return <div key={item.path} className={`${product.item} ${global.flex_row_start_center}`} onClick={()=>this.toImport(item.path)}>
              <img className={product.icon} src={item.icon}/>
              <div className={`${product.right_con} ${global.flex_column_between_start}`}>
                <div className={`${global.flex_column_start_start} ${product.top}`}>
                  <span className={product.title}>{item.title}</span>
                  <span className={product.desc}>{item.desc}</span>
                </div>
                <a className={product.import_btn}>{sldComLanguage('立即导入')}</a>
              </div>
            </div>;
          })}
        </div>
      </div>
    );
  }
}
