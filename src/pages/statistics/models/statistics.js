import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'statistics',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    //slodon_获取交易报表列表
    * get_trade_report_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/trade/analysis/tradeReport');
      if (callback) callback(response);
    },
    //slodon_导出交易报表
    * export_trade_report({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/trade/analysis/export');
      if (callback) callback(response);
    },
    //slodon_获取流量报表列表（按天）
    * get_flow_report_by_day_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/flow/analysis/flowReport');
      if (callback) callback(response);
    },
    //slodon_导出流量报表（按天）
    * export_trade_report_by_day({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/flow/analysis/export');
      if (callback) callback(response);
    },
    //slodon_获取商品动销报表列表（按天）
    * get_goods_saling_report_by_day_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/dayReport');
      if (callback) callback(response);
    },
    //slodon_获取商品动销报表列表（按商品）
    * get_goods_saling_report_by_goods_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsReport');
      if (callback) callback(response);
    },
    //slodon_导出商品动销报表（按天）
    * export_goods_saling_report_by_day({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/dayExport');
      if (callback) callback(response);
    },
    //slodon_导出商品动销报表（按商品）
    * export_goods_saling_report_by_goods({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsExport');
      if (callback) callback(response);
    },
    //slodon_获取会员报表列表（按天）
    * get_member_report_by_day_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/dayReport');
      if (callback) callback(response);
    },
    //slodon_获取会员报表列表（按会员）
    * get_member_report_by_member_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/memberReport');
      if (callback) callback(response);
    },
    //slodon_导出会员报表（按天）
    * export_member_report_by_day({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/dayExport');
      if (callback) callback(response);
    },
    //slodon_导出会员报表（按会员）
    * export_member_report_by_member({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/memberExport');
      if (callback) callback(response);
    },
    //slodon_获取实时统计数据
    * get_realtime_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/present/analysis/presentData');
      if (callback) callback(response);
    },
    //slodon_获取会员分析变化趋势数据
    * get_change_trend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/changeTrend');
      if (callback) callback(response);
    },
    //slodon_获取商品动销趋势数据
    * get_goods_sales_trend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsSalesTrend');
      if (callback) callback(response);
    },
    //slodon_获取近30天变化趋势数据
    * get_change_trend_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/trade/analysis/changeTrend');
      if (callback) callback(response);
    },
    //slodon_流量分析_获取近30天变化趋势数据
    * get_flow_change_trend_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/flow/analysis/changeTrend');
      if (callback) callback(response);
    },
    //slodon_获取交易分析动态头部数据
    * get_analysis_trade_overview({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/trade/analysis/tradeOverview');
      if (callback) callback(response);
    },
    //slodon_获取订单变化趋势数据
    * get_order_change_trend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/trade/analysis/orderTrend');
      if (callback) callback(response);
    },
    //slodon_获取商品总览数据(仅实时数据)
    * get_goods_preview_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsOverview');
      if (callback) callback(response);
    },
    //slodon_获取商品总览数据
    * get_goods_preview_data_static({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsNum');
      if (callback) callback(response);
    },
    //slodon_获取店铺总览数据
    * get_store_preview_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/goods/analysis/goodsNum');
      if (callback) callback(response);
    },
    //slodon_获取支付客单价变化趋势数据
    * get_order_pay_trend({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/orderPayTrend');
      if (callback) callback(response);
    },
    //slodon_获取用户总览（静态）
    * get_user_overview_static({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/memberNum');
      if (callback) callback(response);
    },
    //slodon_获取用户总览
    * get_user_overview({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/member/analysis/goodsOverview');
      if (callback) callback(response);
    },
    //slodon_获取流量总览数据
    * get_flow_preview_data({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/statistics/seller/flow/analysis/flowOverview');
      if (callback) callback(response);
    },
  },
};
