import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'manage',

  state: {
    notice: [],
  },

  effects: {
    * getVendorSetting({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/seller/seller/store/settingDetail`);
      if (callback) callback(response);
    },
    //获取商户绑定的商品分类
    * getVendorGoodsCategory({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsCategory/list`);
      if (callback) callback(response);
    },
    //逐级获取商户绑定的商品分类,如果有下级，children返回空数组，否则返回null
    * getVendorGoodsCategoryById({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/goods/seller/goodsCategory/listByPId`);
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
