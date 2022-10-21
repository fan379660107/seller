import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'member',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    /*-------会员模块-start-----*/
    //slodon_获取会员列表
    * get_member_lists({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/member/admin/member/list');
      if (callback) callback(response);
    },
    //slodon_新增会员
    * add_member_members({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/member/admin/member/add');
      if (callback) callback(response);
    },
    //slodon_编辑会员
    * edit_member({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/member/admin/member/edit');
      if (callback) callback(response);
    },
    //slodon_修改会员状态
    * switch_member_state({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/member/admin/member/editState');
      if (callback) callback(response);
    },
    //slodon_会员管理_修改会员密码
    * change_member_pwd({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/member/admin/member/editPwd');
      if (callback) callback(response);
    },
    //slodon_会员列表-会员详情
    * get_member_detail({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', `v3/member/admin/member/detail`);
      if (callback) callback(response);
    },
    /*-------会员模块-end-----*/

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
