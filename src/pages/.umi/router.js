import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  
  component: () => import('../User/Login'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/apply",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
    "Routes": [require('../CheckSettle').default],
    "routes": [
      {
        "path": "/apply/settled",
        "icon": "usergroup-add",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/settledManage/models/settled.js').then(m => { return { namespace: 'settled',...m.default}})
],
  component: () => import('../settledManage/settled/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/apply/settled_protocol",
        "icon": "file-done",
        "name": "apply_protocol",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/settledManage/models/settled.js').then(m => { return { namespace: 'settled',...m.default}})
],
  component: () => import('../settledManage/protocol/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/apply/base_info",
        "icon": "trophy",
        "name": "apply_base_info",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/settledManage/models/settled.js').then(m => { return { namespace: 'settled',...m.default}})
],
  component: () => import('../settledManage/baseInfo/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/apply/business_info",
        "icon": "dollar",
        "name": "apply_business_info",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/settledManage/models/settled.js').then(m => { return { namespace: 'settled',...m.default}})
],
  component: () => import('../settledManage/businessInfo/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/apply/open_up",
        "icon": "control",
        "name": "apply_open_up",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/settledManage/models/settled.js').then(m => { return { namespace: 'settled',...m.default}})
],
  component: () => import('../settledManage/openUp/open_up'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/store/decorate_pc_home_to_edit",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
    "Routes": [require('../CheckLogin').default],
    "routes": [
      {
        "path": "/store/decorate_pc_home_to_edit",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/pc_diy/edit_diy_page'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/goods/goods_detail",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/goods/goods_detail",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/goods_common_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/order/order_detail",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
    "name": "",
    "routes": [
      {
        "path": "/order/order_detail",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_common_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
    "Routes": [require('../CheckLogin').default],
    "routes": [
      {
        "path": "/basic/simple_stat",
        "icon": "setting",
        "name": "basic_simple_stat",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/basic/models/home.js').then(m => { return { namespace: 'home',...m.default}})
],
  component: () => import('../basic/simple_stat'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_list",
        "icon": "shopping",
        "name": "goods_goods_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/goods_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_list_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/add_goods'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_storage_list",
        "icon": "project",
        "name": "goods_goods_storage_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/goods_storage_lists_title'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_storage_list_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/add_goods'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_check_list",
        "icon": "audit",
        "name": "goods_goods_check_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/goods_check_lists_title'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_check_list_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/add_goods'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/related_template",
        "icon": "api",
        "name": "goods_related_template",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/related_template'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/related_template_to_edit",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/edit_related_template'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/attribute_group",
        "icon": "layout",
        "name": "goods_attribute_group",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/attribute_group'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/attribute_group_to_detail",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/attribute_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_import",
        "icon": "cloud-upload",
        "name": "goods_import",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/goods_import'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_import_to_platform",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/platform_goods_import'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_import_to_excel",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/excel_import'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/goods/goods_import_to_add",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/article.js').then(m => { return { namespace: 'article',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/evaluate.js').then(m => { return { namespace: 'evaluate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/member.js').then(m => { return { namespace: 'member',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/product.js').then(m => { return { namespace: 'product',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/reason.js').then(m => { return { namespace: 'reason',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/goods/models/vendor.js').then(m => { return { namespace: 'vendor',...m.default}})
],
  component: () => import('../goods/platform_goods_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/order_lists",
        "icon": "container",
        "name": "order_order_lists",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/spell_group_order_lists",
        "icon": "solution",
        "name": "spell_group__order_lists",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/spell_group/order_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/spell_group_order_lists_to_detail",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/order_lists_to_detail",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/order_deliver",
        "icon": "rocket",
        "name": "order_order_deliver",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_deliver'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/service",
        "icon": "transaction",
        "name": "service",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/service/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/service_refund_lists_to_detail",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/service/detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/service_return_lists_to_detail",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/service/detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/evaluation",
        "icon": "message",
        "name": "order_evaluation",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/evaluation'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/express",
        "icon": "read",
        "name": "express",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/express/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/express_transport_to_add",
        "icon": "setting",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/express/add_transport'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/address_list",
        "icon": "environment",
        "name": "order_address_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/address_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/order/print_setting",
        "icon": "setting",
        "name": "order_print_setting",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/print_setting'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/setting",
        "icon": "shop",
        "name": "store_setting",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/setting'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/decorate_pc",
        "icon": "cluster",
        "name": "diy_decorate_pc",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/pc_diy/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/decorate_pc_instance_template_lists_to_edit",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/pc_diy/add_template'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/decorate_mhome",
        "icon": "mobile",
        "name": "diy_decorate_mhome",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/m_diy/m_diy_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/decorate_mhome_to_edit",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/m_diy/edit_m_diy_page'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/info",
        "icon": "profile",
        "name": "store_info",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/info'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/category",
        "icon": "appstore",
        "name": "store_category",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/category'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/brand_lists",
        "icon": "trademark",
        "name": "store_brand_lists",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/brand_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/msg_setting",
        "icon": "setting",
        "name": "store_msg_setting",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/msg_setting'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/msg_lists",
        "icon": "bell",
        "name": "store_msg_lists",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/msg_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/store/account",
        "icon": "trademark",
        "name": "account",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/account.js').then(m => { return { namespace: 'account',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/mdecorate.js').then(m => { return { namespace: 'mdecorate',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/pc_home.js').then(m => { return { namespace: 'pc_home',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/store/models/store.js').then(m => { return { namespace: 'store',...m.default}})
],
  component: () => import('../store/account/index'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/bill/account",
        "icon": "property-safety",
        "name": "bill_account",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/bill/models/bill.js').then(m => { return { namespace: 'bill',...m.default}})
],
  component: () => import('../bill/account_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/bill/lists",
        "icon": "transaction",
        "name": "bill_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/bill/models/bill.js').then(m => { return { namespace: 'bill',...m.default}})
],
  component: () => import('../bill/lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/bill/lists_to_detail",
        "icon": "transaction",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/bill/models/bill.js').then(m => { return { namespace: 'bill',...m.default}})
],
  component: () => import('../bill/detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/goods_list_to_add",
        "icon": "export",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/goods/add_goods'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/goods_list",
        "icon": "shopping",
        "name": "point_goods_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/goods/goods_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/goods_list_to_import",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/goods/select_mall_goods'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/order_list",
        "icon": "profile",
        "name": "point_order_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/order/order_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/order_list_to_detail",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/order/order_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/bill_list",
        "icon": "pay-circle",
        "name": "point_bill_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/bill/lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/point/bill_list_to_detail",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/point/models/point.js').then(m => { return { namespace: 'point',...m.default}})
],
  component: () => import('../point/bill/detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/statistics/realtime",
        "icon": "dashboard",
        "name": "statistics_realtime",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/statistics/models/statistics.js').then(m => { return { namespace: 'statistics',...m.default}})
],
  component: () => import('../statistics/realtime'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/statistics/trade",
        "icon": "dollar",
        "name": "statistics_trade",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/statistics/models/statistics.js').then(m => { return { namespace: 'statistics',...m.default}})
],
  component: () => import('../statistics/trade'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/statistics/flow",
        "icon": "line-chart",
        "name": "statistics_flow",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/statistics/models/statistics.js').then(m => { return { namespace: 'statistics',...m.default}})
],
  component: () => import('../statistics/flow'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/statistics/goods",
        "icon": "deployment-unit",
        "name": "statistics_goods",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/statistics/models/statistics.js').then(m => { return { namespace: 'statistics',...m.default}})
],
  component: () => import('../statistics/goods'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/statistics/member",
        "icon": "solution",
        "name": "statistics_member",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/statistics/models/statistics.js').then(m => { return { namespace: 'statistics',...m.default}})
],
  component: () => import('../statistics/member'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/center",
        "icon": "chrome",
        "name": "marketing_center",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/center'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/coupon_list",
        "icon": "red-envelope",
        "name": "promotion_coupon_list",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/coupon/coupon_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/coupon_list_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/coupon/add_coupon'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/coupon_list_to_view",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/coupon/view_coupon'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/coupon_list_to_receive_list",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/coupon/member_receive_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_acm",
        "icon": "fire",
        "name": "promotion_full_acm",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/full_acm_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_acm_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/add_full_acm'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_asm",
        "icon": "gold",
        "name": "promotion_full_asm",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/full_asm_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_asm_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/add_full_asm'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_ald",
        "icon": "money-collect",
        "name": "promotion_full_ald",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/full_ald_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_ald_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/add_full_ald'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_nld",
        "icon": "medicine-box",
        "name": "promotion_full_nld",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/full_nld_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/full_nld_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/full/add_full_nld'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/seckill",
        "icon": "thunderbolt",
        "name": "promotion_seckill",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/seckill/list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/seckill_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/seckill/add_seckill'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/seckill_bind_goods",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/seckill/joined_goods_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/blindBox/blindBox_list",
        "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "name": "blindBox_list",
        "routes": [
          {
            "path": "/blindBox/blindBox_list",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/blindBox/models/blindBox.js').then(m => { return { namespace: 'blindBox',...m.default}})
],
  component: () => import('../blindBox/blindBox_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/marketing/spell_group_to_view",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/view_spell_group'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_bind_goods",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/joined_goods_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_order",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/order_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_order_to_detail",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group",
        "icon": "flag",
        "name": "promotion_spell_group",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/all_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/add_spell_group'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/blindBox/blindBox_list_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/blindBox/models/blindBox.js').then(m => { return { namespace: 'blindBox',...m.default}})
],
  component: () => import('../blindBox/blindBox_to_add'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_to_view",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/view_spell_group'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_bind_goods",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/joined_goods_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_order",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/order_lists'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_order_to_detail",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/express.js').then(m => { return { namespace: 'express',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/order.js').then(m => { return { namespace: 'order',...m.default}}),
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/order/models/service.js').then(m => { return { namespace: 'service',...m.default}})
],
  component: () => import('../order/order_detail'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/spell_group_team_list",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/spell_group/team_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/ladder_group",
        "icon": "build",
        "name": "promotion_ladder_group",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/ladder_group/all_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/ladder_group_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/ladder_group/add_ladder_group'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/ladder_group_to_view",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/ladder_group/view_ladder_group'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/ladder_group_team_list",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/ladder_group/team_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/presale",
        "icon": "gift",
        "name": "promotion_presale",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/presale/list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/presale_to_view",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/presale/view_presale'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/presale_bind_goods",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/presale/joined_goods_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/presale_to_add",
        "icon": "",
        "name": "",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/presale/add_presale'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/marketing/video",
        "icon": "instagram",
        "name": "promotion_video",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/pages/marketing/models/promotion.js').then(m => { return { namespace: 'promotion',...m.default}})
],
  component: () => import('../marketing/video/member_list'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
