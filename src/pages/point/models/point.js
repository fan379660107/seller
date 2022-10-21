import { sldCommonService } from '@/utils/utils';

export default {
	namespace: 'point',
	state: {
		loading: false,//加载状态
		data: {
			list: [],
			pagination: {},
		},
	},

	effects: {
    //slodon_发布商品
    * add_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/integral/seller/integral/goods/add', 'json');
      if (callback) callback(response);
    },
    //slodon_编辑商品
    * edit_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/integral/seller/integral/goods/edit', 'json');
      if (callback) callback(response);
    },
    //slodon_获取平台积分标签列表
    * get_point_label_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/integral/seller/integral/goods/labelList');
      if (callback) callback(response);
    },
    //slodon_获取商品规格列表
    * get_goods_spec_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/integral/seller/integral/goodsSpec/list`);
      if (callback) callback(response);
    },
    //slodon_添加商品规格
    * add_goods_spec({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/goodsSpec/add`);
      if (callback) callback(response);
    },
    //slodon_添加商品规格值
    * add_goods_spec_val({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/goodsSpec/addSpecValue`);
      if (callback) callback(response);
    },
    //slodon_获取商品列表
    * get_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/integral/seller/integral/goods/list`);
      if (callback) callback(response);
    },
    //slodon_下架商品
    * lockup_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/goods/lockup`);
      if (callback) callback(response);
    },
    //slodon_上架商品
    * up_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/goods/upperShelf`);
      if (callback) callback(response);
    },
    //slodon_删除商品
    * del_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/goods/deleteGoods`);
      if (callback) callback(response);
    },
    //slodon_导入商城商品
    * import_mall_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/goods/importGoods`, 'json');
      if (callback) callback(response);
    },
    //slodon_获取商品详情
    * get_goods_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/integral/seller/integral/goods/detail`);
      if (callback) callback(response);
    },
    //slodon_获取订单列表
    * get_order_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/integral/seller/integral/order/list`);
      if (callback) callback(response);
    },
    //slodon_获取订单详情
    * get_order_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/order/detail`);
      if (callback) callback(response);
    },
    //确认发货
    * confirm_delivery({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/integral/seller/integral/order/deliver');
      callback && callback(response);
    },
    //获取快递公司
    * get_express({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/express/list');
      callback && callback(response);
    },
    //获取物流轨迹
    * get_flow({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/integral/seller/integral/order/getTrace');
      callback && callback(response);
    },
    //slodon_获取结算账单列表
    * get_bill_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/integral/seller/integralBill/list');
      if (callback) callback(response);
    },
    //slodon_获取结算账单详情
    * get_bill_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/integral/seller/integralBill/detail');
      if (callback) callback(response);
    },
    //slodon_确认结算账单
    * confirm_bill({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/integral/seller/integralBill/confirm');
      if (callback) callback(response);
    },
    //slodon_电子面单获取物流单号
    * get_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/integral/seller/integral/faceSheet/getLogisticCode`);
      if (callback) callback(response);
    },
    //slodon_打印电子面单
    * print_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/integral/seller/integral/faceSheet/print`);
      if (callback) callback(response);
    },
	},
};
