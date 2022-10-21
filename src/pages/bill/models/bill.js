import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'bill',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    //slodon_获取账号列表
    * get_account_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/bill/account/list');
      if (callback) callback(response);
    },
    //slodon_添加结算账号
    * add_account({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/system/seller/bill/account/add');
      if (callback) callback(response);
    },
    //slodon_编辑结算账号
    * edit_account({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/system/seller/bill/account/update');
      if (callback) callback(response);
    },
    //slodon_删除结算账号
    * del_account({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/system/seller/bill/account/del');
      if (callback) callback(response);
    },
    //slodon_设置默认结算账号
    * set_account_default({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/system/seller/bill/account/setDefault');
      if (callback) callback(response);
    },
    //slodon_获取结算账单列表
    * get_bill_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/bill/list');
      if (callback) callback(response);
    },
    //slodon_获取结算账单详情
    * get_bill_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/bill/detail');
      if (callback) callback(response);
    },
    //slodon_确认结算账单
    * confirm_bill({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/system/seller/bill/confirm');
      if (callback) callback(response);
    },

  },
};
