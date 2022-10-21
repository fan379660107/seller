import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'project',

  state: {
    notice: [],
  },

  effects: {
    //slodon_获取系统配置信息
    * get_system_info({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/system/seller/setting/getSettingList`);
      if (callback) callback(response);
    },
    //slodon_获取分类列表_根据分类id获取下级分类
    * get_cate_list_by_id({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/admin/goodsCategory/list`);
      if (callback) callback(response);
    },
    //slodon_获取商品列表（用于秒杀商品的选择）
    * get_seckill_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsSeckill/goodsList');
      if (callback) callback(response);
    },
    //获取商品列表
    * get_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goods/list');
      if (callback) callback(response);
    },
    // 选择商品下的货品列表
    * get_presale_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/promotion/seller/preSell/productList');
      if (callback) callback(response);
    },

    //获取优惠券列表（只获取未开始和进行中的）
    * get_voucher_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/promotion/seller/coupon/sendList');
      if (callback) callback(response);
    },
    //获取平台商品分类树
    * get_system_cat_tree({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsCategory/getCateTree');
      if (callback) callback(response);
    },
    //获取平台商品分类树——有三级的才显示，没有的不显示
    * get_system_cat_tree_grade3({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsCategory/getCateList');
      if (callback) callback(response);
    },
    //推手——获取店铺商品列表用于导入推手商品
    * get_goods_list_to_import_spreader({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/spreader/seller/spreaderGoods/goodsList');
      if (callback) callback(response);
    },
    //推手——获取商品标签列表
    * get_spreader_goods_label_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/spreader/seller/spreaderGoodsLabel/list');
      if (callback) callback(response);
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};
