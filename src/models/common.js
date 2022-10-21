import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'common',

  state: {
    notice: [],
  },

  effects: {
    //slodon_获取图形验证码
    * get_captcha({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/captcha/common/getCaptcha');
      if (callback) callback(response);
    },
    //slodon_获取短信验证码
    * get_sms_code({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/msg/seller/commons/smsCode');
      if (callback) callback(response);
    },
    //slodon_获取店铺运费模板列表
    * get_transport_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/goods/seller/goodsFreightTemplate/list');
      if (callback) callback(response);
    },
    //slodon_获取系统设置信息
    * getSetting({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/setting/getSettingList');
      if (callback) callback(response);
    },
    //slodon_批量保存设置信息
    * saveSetting({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/system/seller/setting/updateSettingList');
      if (callback) callback(response);
    },
    //slodon_获取商品销售排行TOP10
    * get_goods_sales_rank({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/trade/analysis/goodsSalesRank');
      if (callback) callback(response);
    },
    //slodon_获取支付/下单金额趋势数据
    * get_pay_order_trend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/overview/analysis/payOrderTrend');
      if (callback) callback(response);
    },
    //slodon_获取流量趋势数据
    * get_flow_trend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/overview/analysis/flowTrend');
      if (callback) callback(response);
    },
    //slodon_获取会员偏好商品排行-TOP10数据
    * get_goods_prefer_rank({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/preferGoodsRank');
      if (callback) callback(response);
    },
    //slodon_获取商品销售变化趋势-TOP10数据
    * get_goods_sales_trend_top({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsSalesRank');
      if (callback) callback(response);
    },
    //slodon_获取所有秒杀活动列表
    * get_all_seckill_list({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/promotion/seller/seckill/list');
      callback && callback(response);
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
