(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{gf4g:function(e,t,a){"use strict";var r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=r(a("d6i3")),l=a("+n12"),o={namespace:"product",state:{loading:!1,data:{list:[],pagination:{}}},effects:{get_cate_list_by_id:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsCategory/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_goods_spec_list:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsSpec/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_goods_spec:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsSpec/add");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_goods_spec_val:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsSpec/addSpecValue");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),set_goods_recommend:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/isRecommend");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_goods_label_lists:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsLabel/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),del_goods_label:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/admin/goodsLabel/del");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_goods_label:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/admin/goodsLabel/add");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),edit_goods_label:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/admin/goodsLabel/edit");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_brand_attr_detail:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsAttribute/listByCategoryId");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/add","json");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_store_category_list:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/seller/seller/storeCategory/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_goods_detail:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goods/getGoodsInfo");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),edit_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/edit","json");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_goods_lists:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goods/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),lockup_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/lockup");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),up_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/upperShelf");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),del_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/deleteGoods");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_related_template_lists:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsRelatedTemplate/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_related_template:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsRelatedTemplate/add");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_related_template_detail:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsRelatedTemplate/details");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),edit_related_template:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsRelatedTemplate/edit");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),del_related_template:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsRelatedTemplate/delete");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),set_related_template:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/setRelatedTemplate");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_attribute_group_lists:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsParameterGroup/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_attribute_group_lists_can_use:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsParameterGroup/canUseList");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_attribute_group:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsParameterGroup/add");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),edit_attribute_group:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsParameterGroup/edit");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),del_attribute_group:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsParameterGroup/del");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_attribute_lists:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsParameter/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_attribute_lists_can_use:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsParameter/canUseList");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),add_attribute:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsParameter/add");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),edit_attribute:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsParameter/edit");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),del_attribute:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goodsParameter/del");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_system_seller_cate_list:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsCategory/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),check_is_allow_add_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goods/enablePublish");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),download_goods_mould:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goods/download");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_platform_goods_lists:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goods/platform/list");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_all_cat_by_one_id:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goodsCategory/bottomCategory");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),get_platform_goods_detail:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"get","v3/goods/seller/goods/platform/detail");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)}),import_platform_goods:s.default.mark(function e(t,a){var r,o,n,c;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,o=t.callback,n=a.call,e.next=4,n(l.sldCommonService,r,"post","v3/goods/seller/goods/platform/goodsImport");case 4:c=e.sent,o&&o(c);case 6:case"end":return e.stop()}},e)})}};t.default=o}}]);