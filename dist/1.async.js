(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{zzs8:function(e,l,a){"use strict";var t=a("g09b");Object.defineProperty(l,"__esModule",{value:!0}),l.default=void 0;var r=t(a("d6i3")),n=a("+n12"),c={namespace:"promotion",state:{loading:!1,data:{list:[],pagination:{}}},effects:{get_coupon_lists:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/coupon/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_coupon:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/coupon/add");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_coupon:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/coupon/update");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_coupon:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/coupon/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_coupon:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/coupon/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_coupon:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/coupon/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_coupon_receive_lists:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/coupon/receiveDetails");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_coupon_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/coupon/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_coupon_goods_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/coupon/goodsList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_acm_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullAcm/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_full_acm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAcm/add");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_acm_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullAcm/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_full_acm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAcm/update");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_full_acm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAcm/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_full_acm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAcm/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_full_acm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAcm/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_full_acm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAcm/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_asm_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullAsm/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_full_asm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAsm/add");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_asm_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullAsm/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_full_asm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAsm/update");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_full_asm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAsm/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_full_asm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAsm/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_full_asm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAsm/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_full_asm:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAsm/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_ald_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullAld/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_full_ald:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAld/add");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_ald_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullAld/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_full_ald:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAld/update");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_full_ald:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAld/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_full_ald:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAld/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_full_ald:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAld/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_full_ald:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullAld/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_nld_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullNld/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_full_nld:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullNld/add");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_full_nld_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/fullNld/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_full_nld:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullNld/update");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_full_nld:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullNld/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_full_nld:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullNld/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_full_nld:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullNld/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_full_nld:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/fullNld/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_all_seckill_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/seckill/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_seckill_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/seckill/datail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_activity_stage:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/seckillStage/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_activity_label:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/seckillLabel/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),join_seckill_activity:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/seckill/joinSeckill","json");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_joined_seckill_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/joinSeckill/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_joined_seckill_goods:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/joinSeckill/goodsList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_seckill_goods:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/joinSeckill/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_seckill_goods_sku:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/joinSeckill/productList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_activity_ladder_group_label:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/ladder/group/labelList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_video_member_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/video/seller/video/member/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_video_sms_code:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/video/seller/video/member/smsCode");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),bind_video_member:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/video/seller/video/member/bindMember");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_video_member:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/video/seller/video/member/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_ladder_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/ladder/group/add","json");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_ladder_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/ladder/group/update","json");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_all_ladder_group_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/ladder/group/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_ladder_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/ladder/group/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_ladder_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/ladder/group/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_ladder_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/ladder/group/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_ladder_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/ladder/group/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_ladder_group_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/ladder/group/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_ladder_group_team_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/ladder/group/teamList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_all_presale_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/preSell/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_presale_joined_goods_lists:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/preSell/goodList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_presale_goods:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/delGoods");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_full_acm_pre:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_full_acm_pre:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_full_acm_pre:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_presale_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/preSell/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_full_acm_pre:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_activity_label_presale:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/preSell/labelList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_presale_activity:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/add","json");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_presale_activity:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/preSell/update","json");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_all_spell_group_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/spell/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_activity_spell_group_label:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/spell/labelList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),add_spell_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/add");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),edit_spell_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/update");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),publish_spell_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/publish");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),invalid_spell_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/invalid");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),copy_spell_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/copy");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_spell_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/del");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_spell_group_detail:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/spell/detail");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_spell_group_joined_goods_lists:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/spell/goodList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),del_spell_group_goods:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/delGoods");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_spell_group_order_lists:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/spell/order/list");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),spell_group_team_to_simulate_group:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"post","v3/promotion/seller/spell/simulateGroup");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)}),get_spell_group_team_list:r.default.mark(function e(l,a){var t,c,s,o;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.payload,c=l.callback,s=a.call,e.next=4,s(n.sldCommonService,t,"get","v3/promotion/seller/spell/teamList");case 4:o=e.sent,c&&c(o);case 6:case"end":return e.stop()}},e)})}};l.default=c}}]);