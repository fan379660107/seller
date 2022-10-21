import { sldCommonService } from '@/utils/utils';

export default {
	namespace: 'express',
	state: {
		loading: false,//加载状态
		data: {
			list: [],
			pagination: {},
		},
	},

	effects: {
		//slodon_获取可以添加的平台物流公司列表
		* get_system_express_list({ payload, callback }, { call }) {
			const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/express/expressList');
			if (callback) callback(response);
		},
    //slodon_获取商户物流公司列表
		* get_seller_express_lists({ payload, callback }, { call }) {
			const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/express/list');
			if (callback) callback(response);
		},
		//slodon_添加物流公司
		* add_express({ payload, callback }, { call }) {
			const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/express/add');
			if (callback) callback(response);
    },
    //slodon_删除物流公司
    * del_express({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/express/del');
      if (callback) callback(response);
    },
    //slodon_开启/关闭物流公司
    * switch_express({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/express/openOrCloseExpress');
      if (callback) callback(response);
    },
    //slodon_设置免运费额度
    * saveFreeFreight({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/logistics/setFreeFreight');
      if (callback) callback(response);
    },
    //slodon_添加运费模板
    * add_transport({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsFreightTemplate/add');
      if (callback) callback(response);
    },
    //slodon_编辑运费模板
    * edit_transport({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsFreightTemplate/update');
      if (callback) callback(response);
    },
    //slodon_删除运费模板
    * del_transport({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsFreightTemplate/delete');
      if (callback) callback(response);
    },
    //slodon_复制运费模板
    * copy_transport({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsFreightTemplate/copy');
      if (callback) callback(response);
    },
    //slodon_获取运费模板详情
    * get_transport_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsFreightTemplate/detail');
      if (callback) callback(response);
    },
    //slodon_电子面单设置
    * set_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/express/sheetConfig');
      if (callback) callback(response);
    },
	},
};
