import { routerRedux } from 'dva/router';
import { getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, failTip, sldCommonService,sldComLanguage } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { apiUrl } from '@/utils/sldconfig';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({ payload, callback }, { call, put }) {
      //登录
      const response = yield call(sldCommonService, payload, 'post', 'v3/sellerLogin/oauth/token');
      // Login successfully
      if(response.state == 267){
        let cur_top_nav = ['apply'];//顶部菜单
        let cur_top_nav_info = [{
          top_nav: 'apply',
          name: `${sldComLanguage('商户入驻')}`,
          left_icon: require('../assets/nav/store.png'),
          path: '/apply/settled_protocol',
        }];//顶部菜单详细信息
        if (response.data.resourceList.length > 0) {
          localStorage.setItem('sld_menu_data', JSON.stringify(response.data.resourceList));
          let sld_all_routes = [];//所有页面的路由
          response.data.resourceList.map(item=>{
            item.children.map(child=>{
              sld_all_routes.push(child.frontPath)
            })
          })
          localStorage.setItem('sld_all_routes', JSON.stringify(sld_all_routes));
        }
        localStorage.setItem('cur_top_nav', JSON.stringify(cur_top_nav));
        localStorage.setItem('cur_top_nav_info', JSON.stringify(cur_top_nav_info));
      }
      if (callback) callback(response);
      let cur_top_nav = [];//顶部菜单
      let cur_top_nav_info = [];//顶部菜单详细信息
      if (response.state === 200) {
        localStorage.setItem('storeId',response.data.storeId);
        localStorage.setItem('vendorId',response.data.vendorId);
        localStorage.setItem('isStoreAdmin',response.data.isStoreAdmin);
        if (response.data.resourceList.length > 0) {
          localStorage.setItem('sld_menu_data', JSON.stringify(response.data.resourceList));
          let sld_all_routes = [];//所有页面的路由
          response.data.resourceList.map(item=>{
            item.children.map(child=>{
              sld_all_routes.push(child.frontPath)
            })
          })
          localStorage.setItem('sld_all_routes', JSON.stringify(sld_all_routes));
          let tmp_data = response.data.resourceList;
          for (let i in tmp_data) {
            let split_first = tmp_data[i].frontPath.split('/');
            let target = split_first[1];
            if (cur_top_nav.indexOf(target) == -1) {
              let target_data = {};
              target_data.top_nav = target;
              target_data.path = tmp_data[i].children[0].frontPath;
              if (target == 'basic') {
                target_data.name = '概况';
                target_data.left_icon = require('../assets/nav/basic.png');
              } else if (target == 'goods') {
                target_data.name = '商品';
                target_data.left_icon = require('../assets/nav/goods.png');
              } else if (target == 'order') {
                target_data.name = '订单';
                target_data.left_icon = require('../assets/nav/order.png');
              } else if (target == 'store') {
                target_data.name = '店铺';
                target_data.left_icon = require('../assets/nav/store.png');
              } else if (target == 'bill') {
                target_data.name = '结算';
                target_data.left_icon = require('../assets/nav/bill.png');
              } else if (target == 'point') {
                target_data.name = '积分商城';
                target_data.left_icon = require('../assets/nav/point.png');
              } else if (target == 'im') {
                target_data.name = '客服';
                target_data.left_icon = require('../assets/nav/point.png');
              } else if (target == 'spreader') {
                target_data.name = '推手';
                target_data.left_icon = require('../assets/nav/spreader.png');
              } else if (target == 'statistics') {
                target_data.name = '统计';
                target_data.left_icon = require('../assets/nav/statistics.png');
              } else if (target == 'marketing') {
                target_data.name = '应用';
                target_data.left_icon = require('../assets/nav/marketing.png');
              }else if (target == 'blindBox'){
                target_data.name = '盲盒';
                target_data.left_icon = require('../assets/nav/blindBox.png');
              }
              cur_top_nav.push(target);
              cur_top_nav_info.push(target_data);
            }
          }

          localStorage.setItem('cur_top_nav', JSON.stringify(cur_top_nav));
          localStorage.setItem('cur_top_nav_info', JSON.stringify(cur_top_nav_info));

        } else {
          failTip(`${sldComLanguage('抱歉，该账号未授予权限，请先授予权限～')}`);
          return false;
        }
        if (callback) callback(response);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        let all_routes = JSON.parse(localStorage.sld_all_routes);
        //如果只有客服得权限，则直接跳转到客服页面
        if(cur_top_nav_info.length == 1 && cur_top_nav_info[0].top_nav == 'im'){
          window.location.href = apiUrl+'im/';
          return false;
        }

        if (redirect) {
          //如果上次路由是入驻的话，需要进入已有路由的第一个页面
          if(redirect.indexOf('/apply')>-1){
            window.location.href = JSON.parse(localStorage.sld_all_routes)[0];
            return false;
          }
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }else{
          yield put(routerRedux.replace(all_routes[0]));
          return;
        }
        //如果redirect在用户拥有的路由内，则跳转，否则跳转第一个页面
        let contain_redirect_flag = false;
        for(let i= 0;i<all_routes.length;i++){
          if(redirect.indexOf(all_routes[i])>-1){
            contain_redirect_flag = true;
            break;
          }
        }
        if(!contain_redirect_flag){
          redirect = all_routes[0]
        }
        yield put(routerRedux.replace(redirect));
      }
    },
    * get_login_img({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'get', 'v3/system/seller/setting/getStoreSetting');
      if (callback) callback(response);
    },
    * register({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/vendor/register');
      if(response.state == 267){
        let cur_top_nav = ['apply'];//顶部菜单
        let cur_top_nav_info = [{
          top_nav: 'apply',
          name: `${sldComLanguage('商户入驻')}`,
          left_icon: require('../assets/nav/store.png'),
          path: '/apply/settled_protocol',
        }];//顶部菜单详细信息
        if (response.data.resourceList.length > 0) {
          localStorage.setItem('sld_menu_data', JSON.stringify(response.data.resourceList));
          let sld_all_routes = [];//所有页面的路由
          response.data.resourceList.map(item=>{
            item.children.map(child=>{
              sld_all_routes.push(child.frontPath)
            })
          })
          localStorage.setItem('sld_all_routes', JSON.stringify(sld_all_routes));
        }
        localStorage.setItem('cur_top_nav', JSON.stringify(cur_top_nav));
        localStorage.setItem('cur_top_nav_info', JSON.stringify(cur_top_nav_info));
      }
      if (callback) callback(response);
    },
    * lookForPwd({ payload, callback }, { call }) {
      const response = yield call(sldCommonService, payload, 'post', 'v3/seller/seller/vendor/retrievePwd');
      if (callback) callback(response);
    },
    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
