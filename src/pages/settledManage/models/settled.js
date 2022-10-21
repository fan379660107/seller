import { sldCommonService } from '@/utils/utils';

export default {
	namespace: 'settled',
	state: {
		loading: false,//加载状态
		data: {
			list: [],
			pagination: {},
		},
	},

	effects: {
    //slodon_获取入驻协议
    * get_agreement({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/agreement/detail');
      if (callback) callback(response);
    },
    //slodon_获取店铺等级
    *get_store_grade({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/storeGrade/list');
      if (callback) callback(response);
    },
    //slodon_获取开店时长列表
    *get_store_open_time({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/apply/openTime');
      if (callback) callback(response);
    },
    //保存入驻信息
    *save_apply({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/apply/saveApply');
      if (callback) callback(response);
    },
    //slodon_获取入驻信息
    *get_apply_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/apply/applyDetail');
      if (callback) callback(response);
    },
    //slodon_获取入驻进度
    *get_apply_progress({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/apply/process');
      if (callback) callback(response);
    },
    //slodon_商户入驻支付接口
    *register_pay({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/pay/registerPay');
      if (callback) callback(response);
    }
	},

	reducers: {
		save(state, action) {
			return {
				...state,
				data: action.payload.data,
			};
		},
		changeLoading(state, action) {
			return {
				...state,
				loading: action.payload,
			};
		},
	},
};
