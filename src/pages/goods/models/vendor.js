import { sldCommonService } from '@/utils/utils';
import { sldComLanguage } from '@/utils/utils';

export default {
	namespace: 'vendor',
	state: {
		loading: false,//加载状态
		data: {
			list: [],
			pagination: {},
		},
	},

	effects: {
		//slodon_编辑店铺基本信息
		* save_vendor_base_info({ payload, callback }, { call }) {
			const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/store/updateSetting');
			if (callback) callback(response);
		},
    //slodon_获取商户品牌列表
    * get_brand_apply_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/Brand/list');
      if (callback) callback(response);
    },
    //slodon_申请品牌
    * apply_brand({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/Brand/apply');
      if (callback) callback(response);
    },
    //slodon_编辑品牌
    * edit_brand({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/Brand/edit');
      if (callback) callback(response);
    },
    //slodon_删除品牌
    * del_brand({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/Brand/delete');
      if (callback) callback(response);
    },
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
