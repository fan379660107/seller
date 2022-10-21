import { sldCommonService } from '@/utils/utils';

export default {
	namespace: 'store',
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
    //slodon_获取品牌详情
    * get_brand_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/Brand/detail');
      if (callback) callback(response);
    },
    //slodon_获取分类列表
    * get_category_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/storeCategory/list');
      if (callback) callback(response);
    },
    //slodon_添加分类
    * add_category({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/storeCategory/add');
      if (callback) callback(response);
    },
    //slodon_编辑分类
    * edit_category({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/storeCategory/edit');
      if (callback) callback(response);
    },
    //slodon_删除分类
    * del_category({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/storeCategory/del');
      if (callback) callback(response);
    },
    //slodon_分类是否显示的开关切换
    * switch_category({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/storeCategory/isShow');
      if (callback) callback(response);
    },
    //slodon_获取消息接收设置列表
    * get_msg_setting_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/msg/seller/msg/setting/list');
      if (callback) callback(response);
    },
    //slodon_设置消息的接收状态
    * set_msg_receive_state({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/msg/seller/msg/setting/isReceive');
      if (callback) callback(response);
    },
    //slodon_获取消息列表
    * get_msg_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/msg/seller/msg/list');
      if (callback) callback(response);
    },
    //slodon_删除消息
    * del_msg({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/msg/seller/msg/del');
      if (callback) callback(response);
    },
    //slodon_设置消息为已读状态
    * set_msg_readed({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/msg/seller/msg/read');
      if (callback) callback(response);
    },
    //slodon_获取店铺的入驻信息
    * get_settled_store_apply_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/store/detail');
      if (callback) callback(response);
    },
    //slodon_获取申请的经营类目
    * get_applied_category_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/bindCate/list');
      if (callback) callback(response);
    },
    //slodon_删除申请的经营类目
    * del_applied_category({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/bindCate/delBindCate');
      if (callback) callback(response);
    },
    //slodon_申请经营类目
    * apply_category({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/bindCate/apply');
      if (callback) callback(response);
    },
    //slodon_获取续签列表
    * get_renew_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/renew/list');
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
    //slodon_发起续签
    *apply_renew({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/renew/doRenew');
      if (callback) callback(response);
    },
    //slodon_删除续签数据
    *del_apply_renew({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/renew/delRenew');
      if (callback) callback(response);
    },
    //slodon_续签支付
    *renew_pay({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/pay/renewPay');
      if (callback) callback(response);
    },
    //slodon_查询续签状态
    *get_renew_state({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/renew/getDetail');
      if (callback) callback(response);
    },
    //slodon_获取店铺到期时间
    *get_store_expired_time({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/renew/getExpireTime');
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
