import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Empty } from 'antd';
import {
  failTip,
  sucTip,
  list_com_page_size_20,
  sldComLanguage,
  sldTsvg,
  sldLlineRtextAddGoods,
  sldIconBtnBg,
  getSldHorLine,
} from '@/utils/utils';
import global from '@/global.less';
import Search from '@/components/Search/Search';
import goods from '@/assets/css/goods.less';
import { Scrollbars } from 'react-custom-scrollbars';
import SldScrollbars from '@/components/SldScrollbars';
import router from 'umi/router';
import styles from './product.less';

let pageSize = list_com_page_size_20;
@connect(({ product, global }) => ({
  product, global,
}))
@Form.create()
export default class ImportStoreGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenW: document.body.clientWidth,//屏幕宽度
      showMoreCat: false,//是否展示二三级分类的标识，默认不显示
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      title: `${sldComLanguage('商品规格')}`,
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      goodsOneCat: [],//一级分类数据
      goodsOneToAllCat: [],//一级分类下的所有二三级数据
      curSelCatId: [],//当前选中的一、二、三级分类id
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('商品名称')}`,
        name: 'goodsName',
        placeholder: `${sldComLanguage('请输入商品名称')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('商品品牌')}`,
        name: 'brandName',
        placeholder: `${sldComLanguage('请输入品牌名称')}`,
      }, {
        type: 'select',
        label: `${sldComLanguage('商品类型')}`,
        name: 'isVirtualGoods',
        placeholder: `${sldComLanguage('请选择商品类型')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: 1, name: `${sldComLanguage('实物商品')}` },
          { key: 2, name: `${sldComLanguage('虚拟商品')}` },
        ],
      }],
      formValues: {},//搜索条件
    };
  }

  loading_pagination_flag = false;//分页加载标识，防止分页重复加载

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.get_one_cat();
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
    this.resize();
    window.addEventListener('resize', this.resize, { passive: true });
  }

  resize = () => {
    this.setState({ screenW: document.body.clientWidth });
  };

  componentWillReceiveProps(nextProps, nextContext) {

  }

  //操作
  operate = (id) => {
    const { params, formValues } = this.state;
    const { dispatch } = this.props;
    let param_data = {};
    let dis_type = 'goods_platform/import_goods';
    param_data = id;
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list({ ...params, ...formValues });
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //获取数据列表
  get_list = (params) => {
    const { dispatch } = this.props;
    let { data } = this.state;
    this.setState({ initLoading: true });
    dispatch({
      type: 'product/get_platform_goods_lists',
      payload: { ...params },
      callback: (res) => {
        if (res.state == 200) {
          if (res.data.pagination != undefined) {
            if (res.data.pagination.current == 1) {
              data = res.data;
            } else {
              data.list = data.list.concat(res.data.list);
              data.pagination = res.data.pagination;
            }
          }
        }
        this.loading_pagination_flag = false;
        this.setState({ initLoading: false, data });
      },
    });
  };

  //获取一级分类
  get_one_cat = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/get_system_seller_cate_list',
      payload: { grade: 1 },
      callback: (res) => {
        let goodsOneCat = [];
        if (res.state == 200) {
          goodsOneCat = res.data;
        } else {
          failTip(res.data.msg);
        }
        this.setState({
          goodsOneCat,
        });
      },
    });
  };


  //搜索事件
  search = (data) => {
    const values = { ...data };
    for (let i in values) {
      if (values[i] == '') {
        delete values[i];
      }
    }
    this.setState({
      formValues: values,
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize, ...values });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      params: { pageSize: pageSize },
      curSelCatId: [],
    });
    this.get_list({ pageSize: pageSize });
  };

  //选中一级分类事件
  selCat = (id) => {
    this.setState({ showMoreCat: true });
    //获取该一级分类下的所有分类
    this.getAllCat(id);
  };

  //根据一级分类id获取该一级分类下的所有分类
  getAllCat = (id) => {
    const { dispatch } = this.props;
    this.setState({ submiting: true });
    dispatch({
      type: 'product/get_all_cat_by_one_id',
      payload: { categoryId1: id },
      callback: (res) => {
        this.setState({
          submiting: false,
        }, () => {
          let goodsOneToAllCat = [];
          if (res.state == 200) {
            goodsOneToAllCat = res.data;
          } else {
            failTip(res.data.msg);
          }
          this.setState({ goodsOneToAllCat });
        });
      },
    });
  };

  //选中分类进行搜索
  selCatSearch = (id, grade = 1, second = 0) => {
    let { params, formValues, curSelCatId } = this.state;
    this.get_list({ ...params, ...formValues, categoryId: id });
    [1, 2, 3].map((item, index) => {
      if (index == grade - 1) {
        curSelCatId[index] = id;
      } else if (index > grade - 1) {
        curSelCatId[index] = 0;
      }
      if (grade == 3) {
        curSelCatId[1] = second;
      }
    });

    this.setState({ showMoreCat: false, formValues: { categoryId: id }, curSelCatId });
  };

  //是否显示更多分类事件
  isShowMoreCat = (flag) => {
    this.setState({ showMoreCat: flag });
  };

  //滚动条滚动到底部事件
  handleScrollLeft = (e) => {
    let { data } = this.state;
    //是否还有数据
    if (data.pagination.current * pageSize < data.pagination.total && !this.loading_pagination_flag) {
      //请求分页数据
      this.loading_pagination_flag = true;
      this.get_list({ pageSize: pageSize, current: data.pagination.current * 1 + 1 });
    }
  };

  //查看资料详情
  goDetail = (id) => {
    window.open('/goods/goods_import_to_add?id=' + id, '_blank');
  };

  //返回上级页面
  goBack = () => {
    if (this.props.history.length == 1) {
      //没有上级路由，直接进入商品导入页面
      router.replace('/goods/goods_import');
    } else {
      router.go(-1);
    }
  };

  render() {
    const { search_data, initLoading, goodsOneCat, showMoreCat, goodsOneToAllCat, curSelCatId, submiting, screenW, data } = this.state;
    let goods_total_width = (screenW - (this.props.global.collapsed ? 80 : 150) - 20 - 220 - 20);
    let goods_item_width = (goods_total_width - 50) / 5;//每个商品的宽度
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        <div className={global.flex_com_space_between} style={{ marginBottom: 10 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('商品资料库导入')}`)}
          {sldIconBtnBg(() => this.goBack(), 'fanhui', `${sldComLanguage('返回上级页面')}`, '#fff', 7, 0, 15, 15, 5)}
        </div>
        {getSldHorLine(1)}
        <div className={global.tableListForm}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}/>
        </div>
        <Spin spinning={initLoading}>
          <div className={`${global.flex_row_start_start} ${goods.import_store_goods}`}>
            <div className={`${global.flex_column_start_start} ${goods.left_part}`}>
              <p className={`${goods.title} ${global.flex_row_start_center}`}>{sldComLanguage('商品分类')}</p>
              <Scrollbars
                autoHeight
                autoHeightMin={100}
                autoHeightMax={document.body.clientHeight - 230}>
                <div className={`${goods.goods_cat}`} onMouseEnter={() => this.isShowMoreCat(true)}>
                  {goodsOneCat.map((item) => {
                    return <div key={item.categoryId}
                                className={`${goods.cat_item} ${global.flex_row_between_center} ${curSelCatId[0] == item.categoryId ? goods.selected_cat_item : null}`}
                                onMouseEnter={() => this.selCat(item.categoryId)}
                                onMouseLeave={() => this.isShowMoreCat(false)}
                                onClick={() => this.selCatSearch(item.categoryId)}>
                      <span className={goods.cat_name}>{item.categoryName}</span>
                      <div className={goods.to_right_icon}>
                        {sldTsvg('gengduo2', curSelCatId[0] == item.categoryId ? '#FF701E' : '#101010', 14, 14)}
                      </div>
                    </div>;
                  })}
                </div>
              </Scrollbars>

              {showMoreCat &&
              <div className={`${goods.more_cat} ${global.flex_column_start_start}`}
                   style={{ height: document.body.clientHeight - 228 }}
                   onMouseEnter={() => this.isShowMoreCat(true)}
                   onMouseLeave={() => this.isShowMoreCat(false)}>

                {goodsOneToAllCat.length > 0
                  ? <Fragment>
                    {submiting &&
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      textAlign: 'center',
                      marginTop: (document.body.clientHeight - 228) / 2 - 60,
                      top: 0,
                      bottom: 0,
                      left: 0,
                    }}>
                      <Spin spinning={submiting}>
                      </Spin>
                    </div>
                    }
                    <SldScrollbars
                      autoHeight
                      autoHeightMin={100}
                      autoHeightMax={document.body.clientHeight - 230}
                    >
                      {goodsOneToAllCat.map((second_item, second_index) => {
                        return <div key={'2_' + second_index}
                                    className={`${goods.item} ${global.flex_row_start_start}`}>
                          <div className={`${goods.second_cat} ${global.flex_row_end_center}`}
                               onClick={() => this.selCatSearch(second_item.categoryId, 2)}>
                          <span className={goods.cat_name}
                                style={{ color: curSelCatId[1] == second_item.categoryId ? '#FF701E' : '#4C4C4C' }}>{second_item.categoryName}</span>
                            <div className={goods.to_right_icon}>
                              {sldTsvg('gengduo2', curSelCatId[1] == second_item.categoryId ? '#FF701E' : '#101010', 14, 14)}
                            </div>
                          </div>
                          <div className={`${global.flex_row_start_start} ${goods.third_cat}`}>
                            {second_item.children.length > 0 && second_item.children.map((third_item, third_index) => {
                              return <a key={'3_' + third_index} className={goods.item}
                                        onClick={() => this.selCatSearch(third_item.categoryId, 3, third_item.pid)}
                                        style={{ color: curSelCatId[2] == third_item.categoryId ? '#FF701E' : '#999' }}>{third_item.categoryName}</a>;
                            })}
                          </div>
                        </div>;
                      })}
                    </SldScrollbars>
                  </Fragment>
                  : <div className={global.flex_row_center_center} style={{ width: '100%', flex: 1 }}>
                    <Empty
                      image={require('@/assets/moudle_disable.png')}
                      imageStyle={{
                        height: 80,
                      }}
                      description={
                        <span>{sldComLanguage(`${sldComLanguage('暂无下级分类')}`)}</span>
                      }
                    >
                    </Empty>
                  </div>
                }
              </div>
              }
            </div>

            <div className={`${goods.right_goods} ${global.flex_row_start_start}`}
                 style={{ height: document.body.clientHeight - 169 }}>
              {data.list != undefined && data.list.length != undefined && data.list.length > 0
                ? <Scrollbars
                  onScrollFrame={(e) => this.handleScrollLeft(e)}
                  style={{ width: goods_total_width, zIndex: 1 }}>
                  <div className={`${goods.right_goods} ${global.flex_row_start_start}`}>
                    {data.list.map(item => {
                      return <div key={item.platformGoodsId}
                                  className={`${global.flex_column_start_start} ${goods.item}`}
                                  style={{ width: goods_item_width }}
                                  onClick={() => this.goDetail(item.platformGoodsId)}>
                        {item.isVirtualGoods == 2 && <span className={`${goods.virtual_goods_flag}`}>虚拟</span>}
                        <div className={`${global.flex_row_center_center} ${goods.img_wrap}`}
                             style={{ width: goods_item_width - 2, height: goods_item_width - 2 }}>
                          <img src={item.mainImage}/>
                        </div>
                        <p style={{ width: goods_item_width }} title={item.goodsName}
                           className={goods.goods_name}>{item.isVirtualGoods == 2 ? '【虚拟】' : ''}{item.goodsName}</p>
                        <span className={goods.price}>¥{item.goodsPrice}</span>
                      </div>;
                    })}
                  </div>
                </Scrollbars>
                : <div className={global.flex_row_center_center}
                       style={{ width: '100%', height: document.body.clientHeight - 169 }}>
                  <Empty
                    image={require('@/assets/moudle_disable.png')}
                    imageStyle={{ height: 80 }}
                    description={<span>{sldComLanguage(`${sldComLanguage('暂无商品数据')}`)}</span>}
                  >
                  </Empty>
                </div>
              }
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}
