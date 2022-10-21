import { sldCommonService } from '@/utils/utils';
import { sldComLanguage } from '@/utils/utils';

export default {
  namespace: 'product',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
     //slodon_获取分类列表_根据分类id获取下级分类
    * get_cate_list_by_id({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsCategory/list`);
      if (callback) callback(response);
    },
    //slodon_获取商品规格列表
    * get_goods_spec_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsSpec/list`);
      if (callback) callback(response);
    },
    //slodon_添加商品规格
    * add_goods_spec({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goodsSpec/add`);
      if (callback) callback(response);
    },
    //slodon_添加商品规格值
    * add_goods_spec_val({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goodsSpec/addSpecValue`);
      if (callback) callback(response);
    },
    //slodon_批量设置推荐/取消推荐商品
    * set_goods_recommend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goods/isRecommend`);
      if (callback) callback(response);
    },
    //slodon_获取商品标签列表
    * get_goods_label_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsLabel/list`);
      if (callback) callback(response);
    },
    //slodon_删除商品标签
    * del_goods_label({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/admin/goodsLabel/del`);
      if (callback) callback(response);
    },
    //slodon_添加商品标签
    * add_goods_label({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/admin/goodsLabel/add`);
      if (callback) callback(response);
    },
    //slodon_编辑商品标签
    * edit_goods_label({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/admin/goodsLabel/edit`);
      if (callback) callback(response);
    },
    //slodon_获取分类绑定的品牌和属性信息
    * get_brand_attr_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsAttribute/listByCategoryId');
      if (callback) callback(response);
    },
    //slodon_发布商品
    * add_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goods/add', 'json');
      if (callback) callback(response);
    },
    //slodon_获取店铺分类列表
    * get_store_category_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/storeCategory/list');
      if (callback) callback(response);
    },
    //slodon_获取商品详情
    * get_goods_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/getGoodsInfo');
      if (callback) callback(response);
    },
    //slodon_编辑商品
    * edit_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goods/edit', 'json');
      if (callback) callback(response);
    },
    //slodon_获取商品列表
    * get_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/list');
      if (callback) callback(response);
    },
    //slodon_商品列表_下架商品
    * lockup_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goods/lockup`);
      if (callback) callback(response);
    },
    //slodon_商品列表_上架商品
    * up_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goods/upperShelf`);
      if (callback) callback(response);
    },
    //slodon_商品列表_删除商品
    * del_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goods/deleteGoods`);
      if (callback) callback(response);
    },
    // slodon_获取关联版式列表
    * get_related_template_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsRelatedTemplate/list`);
      if (callback) callback(response);
    },
    //slodon_ 添加关联版式
    * add_related_template({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goodsRelatedTemplate/add`);
      if (callback) callback(response);
    },
    //slodon_获取关联版式详情
    * get_related_template_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsRelatedTemplate/details`);
      if (callback) callback(response);
    },
    //slodon_ 编辑关联版式
    * edit_related_template({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goodsRelatedTemplate/edit`);
      if (callback) callback(response);
    },
    //slodon_删除关联版式
    * del_related_template({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goodsRelatedTemplate/delete`);
      if (callback) callback(response);
    },
    //slodon_为商品批量设置关联版式
    * set_related_template({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/goods/seller/goods/setRelatedTemplate`);
      if (callback) callback(response);
    },
    //slodon_获取属性分组列表
    * get_attribute_group_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsParameterGroup/list');
      if (callback) callback(response);
    },
    //slodon_获取可用的属性分组列表
    * get_attribute_group_lists_can_use({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsParameterGroup/canUseList');
      if (callback) callback(response);
    },
    //slodon_添加属性分组
    * add_attribute_group({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsParameterGroup/add');
      if (callback) callback(response);
    },
    //slodon_编辑属性分组
    * edit_attribute_group({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsParameterGroup/edit');
      if (callback) callback(response);
    },
    //slodon_删除属性分组
    * del_attribute_group({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsParameterGroup/del');
      if (callback) callback(response);
    },
    //slodon_获取属性列表
    * get_attribute_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsParameter/list');
      if (callback) callback(response);
    },
    //slodon_获取可用的属性列表
    * get_attribute_lists_can_use({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsParameter/canUseList');
      if (callback) callback(response);
    },
    //slodon_添加属性
    * add_attribute({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsParameter/add');
      if (callback) callback(response);
    },
    //slodon_编辑属性
    * edit_attribute({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsParameter/edit');
      if (callback) callback(response);
    },
    //slodon_删除属性
    * del_attribute({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsParameter/del');
      if (callback) callback(response);
    },
    //slodon_申请通过的商品分类
    * get_system_seller_cate_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsCategory/list');
      if (callback) callback(response);
    },
    //slodon_验证是否允许发布商品
    * check_is_allow_add_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/enablePublish');
      if (callback) callback(response);
    },
    //slodon_下载商品导入模板
    * download_goods_mould({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/download');
      if (callback) callback(response);
    },
    //slodon_获取商品资料库列表
    * get_platform_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/platform/list');
      if (callback) callback(response);
    },
    //slodon_根据一级分类id获取该分类下的所有分类数据
    * get_all_cat_by_one_id({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsCategory/bottomCategory');
      if (callback) callback(response);
    },
    //slodon_获取平台商品详情
    * get_platform_goods_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/platform/detail');
      if (callback) callback(response);
    },
    //slodon_导入平台商品
    * import_platform_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goods/platform/goodsImport');
      if (callback) callback(response);
    },
  },
};
