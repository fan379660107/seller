import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'decorate',

  state: {
    notice: [],
  },

  effects: {
    //slodon_获取店铺分类列表，用户装修页面展示
    * get_store_category_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/storeCategory/list');
      if (callback) callback(response);
    },
    //slodon_获取店铺信息，用户装修页面展示
    * get_store_info({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/store/indexStoreInfor');
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
