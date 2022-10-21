import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'home',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    //slodon_获取首页概况信息
    * get_home_basic_info({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/dashboard/indexInfo');
      if (callback) callback(response);
    },
   //slodon_获取首页店铺信息
    * get_store_info({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/store/indexStoreInfor');
      if (callback) callback(response);
    },
    //slodon_获取首页待办事项数据
    * get_store_wait_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/overview/analysis/presentData');
      if (callback) callback(response);
    },
    //slodon_获取首页概况实时统计数据
    * get_store_realtime_preview_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/overview/analysis/presentData');
      if (callback) callback(response);
    },
  },
};
