import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'order',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    //slodon_获取订单列表
    * get_order_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/orderInfo/list');
      if (callback) callback(response);
    },
    //slodon_获取订单详情
    * get_order_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/orderInfo/detail');
      if (callback) callback(response);
    },
    //slodon_导出订单
    * export_order_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/orderInfo/export');
      if (callback) callback(response);
    },
    //slodon_获取订单取消/退换货理由
    * get_order_reason({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/reason/list');
      if (callback) callback(response);
    },
    //获取物流轨迹
    * get_flow({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/logistics/order/getTrace');
      callback && callback(response);
    },
    //取消订单接口
    * cancle_order({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/orderInfo/cancel');
      callback && callback(response);
    },
    //确认发货
    * confirm_delivery({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/orderInfo/deliver');
      callback && callback(response);
    },
    //获取快递公司
    * get_express({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/express/list');
      callback && callback(response);
    },
    //slodon_获取发货/退货地址列表
    * get_return_address_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/address/list');
      if (callback) callback(response);
    },
    //slodon_添加发货/退货地址
    * add_return_address({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/address/add');
      if (callback) callback(response);
    },
    //slodon_编辑发货/退货地址
    * edit_return_address({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/address/edit');
      if (callback) callback(response);
    },
    //slodon_删除发货/退货地址
    * del_return_address({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/address/del');
      if (callback) callback(response);
    },
    //slodon_设置默认发货/退货地址
    * set_return_address_default({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/address/isDefault');
      if (callback) callback(response);
    },
    //slodon_获取商品评价列表
    * get_goods_comment_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsComment/list');
      if (callback) callback(response);
    },
    //slodon_商家回复评价
    * comment_replay({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/goods/seller/goodsComment/editReply');
      if (callback) callback(response);
    },
    //slodon_获取店铺评价列表
    * get_store_comment_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/seller/seller/storeComment/list');
      if (callback) callback(response);
    },
    //slodon_获取拼团订单列表
    * get_spell_group_order_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/promotion/seller/spell/order/spellList');
      if (callback) callback(response);
    },
    //slodon_添加订单备注
    * add_order_remark({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/orderInfo/remark');
      if (callback) callback(response);
    },
    //slodon_订单设置星级
    * add_order_star({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/orderInfo/star');
      if (callback) callback(response);
    },
    //slodon_订单改价
    * change_order_price({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/orderInfo/updatePrice');
      if (callback) callback(response);
    },
    //slodon_获取快递鸟设置详情
    * get_KDN_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/seller/seller/express/setting/detail`);
      if (callback) callback(response);
    },
    //slodon_保存快递鸟设置
    * save_KDN_setting({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/seller/seller/express/setting/save`);
      if (callback) callback(response);
    },
    //slodon_电子面单获取物流单号
    * get_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/business/seller/faceSheet/getLogisticCode`);
      if (callback) callback(response);
    },
    //slodon_打印电子面单
    * print_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/business/seller/faceSheet/print`);
      if (callback) callback(response);
    },
    //slodon_批量生成电子面单
    * create_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/business/seller/faceSheet/generate`);
      if (callback) callback(response);
    },
    //slodon_校验订单是否能打印电子面单
    * check_order_print_exter_face_sheet({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/business/seller/faceSheet/printCheckOrders`);
      if (callback) callback(response);
    },
    //slodon_批量发货，只针对已经生成电子面单的订单
    * batch_deliver({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', `v3/business/seller/orderInfo/batchDeliver`);
      if (callback) callback(response);
    },
  },
};
