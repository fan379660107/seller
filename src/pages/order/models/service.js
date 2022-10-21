import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'service',
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
    //slodon_获取订单取消/退换货理由
    * get_order_reason({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/reason/list');
      if (callback) callback(response);
    },
    //退款退货列表
    * get_refund_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/after/sale/list');
      if (callback) callback(response);
    },
    //退款/退货详情
    * get_refund_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/after/sale/detail');
      callback && callback(response);
    },
    //商家审核退款申请
    * confirm_return({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/after/sale/audit');
      callback && callback(response);
    },
    //退货退款 商家确认收货
    * confirm_receive({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/business/seller/after/sale/confirmReceive');
      callback && callback(response);
    },
    //获取订单物流轨迹
    * get_flow({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/logistics/order/getTrace');
      callback && callback(response);
    },
    //获取退货单物流轨迹
    * get_return_flow({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/business/seller/logistics/afs/getTrace');
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

  },
};
