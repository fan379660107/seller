(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[79],{yC9n:function(e,t,a){"use strict";var l=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("R9oj");var o=l(a("ECub"));a("T2oS");var c=l(a("W9HT")),d=l(a("p0pE")),s=l(a("2Taf")),i=l(a("vZ4D")),r=l(a("l4Ni")),u=l(a("ujKo")),g=l(a("MhPg"));a("y8nQ");var f,m,p,_,h=l(a("Vl3Y")),y=a("MuoO"),v=n(a("q1tI")),C=a("+n12"),E=l(a("hh8c")),w=l(a("Lv3o")),S=l(a("hdKV")),b=a("k82f"),N=l(a("Ug63")),L=l(a("usdK")),k=(l(a("Yb6x")),C.list_com_page_size_20),I=(f=(0,y.connect)(function(e){var t=e.product,a=e.global;return{product:t,global:a}}),m=h.default.create(),f(p=m((_=function(e){function t(e){var a;return(0,s.default)(this,t),a=(0,r.default)(this,(0,u.default)(t).call(this,e)),a.loading_pagination_flag=!1,a.resize=function(){a.setState({screenW:document.body.clientWidth})},a.operate=function(e){var t=a.state,l=t.params,n=t.formValues,o=a.props.dispatch,c={},s="goods_platform/import_goods";c=e,o({type:s,payload:c,callback:function(e){200==e.state?((0,C.sucTip)(e.msg),a.get_list((0,d.default)({},l,n))):(0,C.failTip)(e.msg)}})},a.get_list=function(e){var t=a.props.dispatch,l=a.state.data;a.setState({initLoading:!0}),t({type:"product/get_platform_goods_lists",payload:(0,d.default)({},e),callback:function(e){200==e.state&&void 0!=e.data.pagination&&(1==e.data.pagination.current?l=e.data:(l.list=l.list.concat(e.data.list),l.pagination=e.data.pagination)),a.loading_pagination_flag=!1,a.setState({initLoading:!1,data:l})}})},a.get_one_cat=function(){var e=a.props.dispatch;e({type:"product/get_system_seller_cate_list",payload:{grade:1},callback:function(e){var t=[];200==e.state?t=e.data:(0,C.failTip)(e.data.msg),a.setState({goodsOneCat:t})}})},a.search=function(e){var t=(0,d.default)({},e);for(var l in t)""==t[l]&&delete t[l];a.setState({formValues:t,params:{pageSize:k}}),a.get_list((0,d.default)({pageSize:k},t))},a.seaReset=function(){a.setState({formValues:{},params:{pageSize:k},curSelCatId:[]}),a.get_list({pageSize:k})},a.selCat=function(e){a.setState({showMoreCat:!0}),a.getAllCat(e)},a.getAllCat=function(e){var t=a.props.dispatch;a.setState({submiting:!0}),t({type:"product/get_all_cat_by_one_id",payload:{categoryId1:e},callback:function(e){a.setState({submiting:!1},function(){var t=[];200==e.state?t=e.data:(0,C.failTip)(e.data.msg),a.setState({goodsOneToAllCat:t})})}})},a.selCatSearch=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=a.state,o=n.params,c=n.formValues,s=n.curSelCatId;a.get_list((0,d.default)({},o,c,{categoryId:e})),[1,2,3].map(function(a,n){n==t-1?s[n]=e:n>t-1&&(s[n]=0),3==t&&(s[1]=l)}),a.setState({showMoreCat:!1,formValues:{categoryId:e},curSelCatId:s})},a.isShowMoreCat=function(e){a.setState({showMoreCat:e})},a.handleScrollLeft=function(e){var t=a.state.data;t.pagination.current*k<t.pagination.total&&!a.loading_pagination_flag&&(a.loading_pagination_flag=!0,a.get_list({pageSize:k,current:1*t.pagination.current+1}))},a.goDetail=function(e){window.open("/goods/goods_import_to_add?id="+e,"_blank")},a.goBack=function(){1==a.props.history.length?L.default.replace("/goods/goods_import"):L.default.go(-1)},a.state={screenW:document.body.clientWidth,showMoreCat:!1,initLoading:!1,submiting:!1,data:{},title:"".concat((0,C.sldComLanguage)("\u5546\u54c1\u89c4\u683c")),type:"add",params:{pageSize:k},goodsOneCat:[],goodsOneToAllCat:[],curSelCatId:[],search_data:[{type:"input",label:"".concat((0,C.sldComLanguage)("\u5546\u54c1\u540d\u79f0")),name:"goodsName",placeholder:"".concat((0,C.sldComLanguage)("\u8bf7\u8f93\u5165\u5546\u54c1\u540d\u79f0"))},{type:"input",label:"".concat((0,C.sldComLanguage)("\u5546\u54c1\u54c1\u724c")),name:"brandName",placeholder:"".concat((0,C.sldComLanguage)("\u8bf7\u8f93\u5165\u54c1\u724c\u540d\u79f0"))},{type:"select",label:"".concat((0,C.sldComLanguage)("\u5546\u54c1\u7c7b\u578b")),name:"isVirtualGoods",placeholder:"".concat((0,C.sldComLanguage)("\u8bf7\u9009\u62e9\u5546\u54c1\u7c7b\u578b")),sel_data:[{key:"",name:"".concat((0,C.sldComLanguage)("\u5168\u90e8"))},{key:1,name:"".concat((0,C.sldComLanguage)("\u5b9e\u7269\u5546\u54c1"))},{key:2,name:"".concat((0,C.sldComLanguage)("\u865a\u62df\u5546\u54c1"))}]}],formValues:{}},a}return(0,g.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.get_list({pageSize:k}),this.get_one_cat(),this.props.dispatch({type:"global/getLayoutCollapsed"}),this.resize(),window.addEventListener("resize",this.resize,{passive:!0})}},{key:"componentWillReceiveProps",value:function(e,t){}},{key:"render",value:function(){var e=this,t=this.state,l=t.search_data,n=t.initLoading,d=t.goodsOneCat,s=t.showMoreCat,i=t.goodsOneToAllCat,r=t.curSelCatId,u=t.submiting,g=t.screenW,f=t.data,m=g-(this.props.global.collapsed?80:150)-20-220-20,p=(m-50)/5;return v.default.createElement("div",{className:E.default.common_page,style:{flex:1}},v.default.createElement("div",{className:E.default.flex_com_space_between,style:{marginBottom:10}},(0,C.sldLlineRtextAddGoods)("#69A2F2","".concat((0,C.sldComLanguage)("\u5546\u54c1\u8d44\u6599\u5e93\u5bfc\u5165"))),(0,C.sldIconBtnBg)(function(){return e.goBack()},"fanhui","".concat((0,C.sldComLanguage)("\u8fd4\u56de\u4e0a\u7ea7\u9875\u9762")),"#fff",7,0,15,15,5)),(0,C.getSldHorLine)(1),v.default.createElement("div",{className:E.default.tableListForm},v.default.createElement(w.default,{search_data:l,seaSubmit:function(t){return e.search(t)},seaReset:function(){return e.seaReset()}})),v.default.createElement(c.default,{spinning:n},v.default.createElement("div",{className:"".concat(E.default.flex_row_start_start," ").concat(S.default.import_store_goods)},v.default.createElement("div",{className:"".concat(E.default.flex_column_start_start," ").concat(S.default.left_part)},v.default.createElement("p",{className:"".concat(S.default.title," ").concat(E.default.flex_row_start_center)},(0,C.sldComLanguage)("\u5546\u54c1\u5206\u7c7b")),v.default.createElement(b.Scrollbars,{autoHeight:!0,autoHeightMin:100,autoHeightMax:document.body.clientHeight-230},v.default.createElement("div",{className:"".concat(S.default.goods_cat),onMouseEnter:function(){return e.isShowMoreCat(!0)}},d.map(function(t){return v.default.createElement("div",{key:t.categoryId,className:"".concat(S.default.cat_item," ").concat(E.default.flex_row_between_center," ").concat(r[0]==t.categoryId?S.default.selected_cat_item:null),onMouseEnter:function(){return e.selCat(t.categoryId)},onMouseLeave:function(){return e.isShowMoreCat(!1)},onClick:function(){return e.selCatSearch(t.categoryId)}},v.default.createElement("span",{className:S.default.cat_name},t.categoryName),v.default.createElement("div",{className:S.default.to_right_icon},(0,C.sldTsvg)("gengduo2",r[0]==t.categoryId?"#FF701E":"#101010",14,14)))}))),s&&v.default.createElement("div",{className:"".concat(S.default.more_cat," ").concat(E.default.flex_column_start_start),style:{height:document.body.clientHeight-228},onMouseEnter:function(){return e.isShowMoreCat(!0)},onMouseLeave:function(){return e.isShowMoreCat(!1)}},i.length>0?v.default.createElement(v.Fragment,null,u&&v.default.createElement("div",{style:{position:"absolute",width:"100%",textAlign:"center",marginTop:(document.body.clientHeight-228)/2-60,top:0,bottom:0,left:0}},v.default.createElement(c.default,{spinning:u})),v.default.createElement(N.default,{autoHeight:!0,autoHeightMin:100,autoHeightMax:document.body.clientHeight-230},i.map(function(t,a){return v.default.createElement("div",{key:"2_"+a,className:"".concat(S.default.item," ").concat(E.default.flex_row_start_start)},v.default.createElement("div",{className:"".concat(S.default.second_cat," ").concat(E.default.flex_row_end_center),onClick:function(){return e.selCatSearch(t.categoryId,2)}},v.default.createElement("span",{className:S.default.cat_name,style:{color:r[1]==t.categoryId?"#FF701E":"#4C4C4C"}},t.categoryName),v.default.createElement("div",{className:S.default.to_right_icon},(0,C.sldTsvg)("gengduo2",r[1]==t.categoryId?"#FF701E":"#101010",14,14))),v.default.createElement("div",{className:"".concat(E.default.flex_row_start_start," ").concat(S.default.third_cat)},t.children.length>0&&t.children.map(function(t,a){return v.default.createElement("a",{key:"3_"+a,className:S.default.item,onClick:function(){return e.selCatSearch(t.categoryId,3,t.pid)},style:{color:r[2]==t.categoryId?"#FF701E":"#999"}},t.categoryName)})))}))):v.default.createElement("div",{className:E.default.flex_row_center_center,style:{width:"100%",flex:1}},v.default.createElement(o.default,{image:a("LwD8"),imageStyle:{height:80},description:v.default.createElement("span",null,(0,C.sldComLanguage)("".concat((0,C.sldComLanguage)("\u6682\u65e0\u4e0b\u7ea7\u5206\u7c7b"))))})))),v.default.createElement("div",{className:"".concat(S.default.right_goods," ").concat(E.default.flex_row_start_start),style:{height:document.body.clientHeight-169}},void 0!=f.list&&void 0!=f.list.length&&f.list.length>0?v.default.createElement(b.Scrollbars,{onScrollFrame:function(t){return e.handleScrollLeft(t)},style:{width:m,zIndex:1}},v.default.createElement("div",{className:"".concat(S.default.right_goods," ").concat(E.default.flex_row_start_start)},f.list.map(function(t){return v.default.createElement("div",{key:t.platformGoodsId,className:"".concat(E.default.flex_column_start_start," ").concat(S.default.item),style:{width:p},onClick:function(){return e.goDetail(t.platformGoodsId)}},2==t.isVirtualGoods&&v.default.createElement("span",{className:"".concat(S.default.virtual_goods_flag)},"\u865a\u62df"),v.default.createElement("div",{className:"".concat(E.default.flex_row_center_center," ").concat(S.default.img_wrap),style:{width:p-2,height:p-2}},v.default.createElement("img",{src:t.mainImage})),v.default.createElement("p",{style:{width:p},title:t.goodsName,className:S.default.goods_name},2==t.isVirtualGoods?"\u3010\u865a\u62df\u3011":"",t.goodsName),v.default.createElement("span",{className:S.default.price},"\xa5",t.goodsPrice))}))):v.default.createElement("div",{className:E.default.flex_row_center_center,style:{width:"100%",height:document.body.clientHeight-169}},v.default.createElement(o.default,{image:a("LwD8"),imageStyle:{height:80},description:v.default.createElement("span",null,(0,C.sldComLanguage)("".concat((0,C.sldComLanguage)("\u6682\u65e0\u5546\u54c1\u6570\u636e"))))}))))))}}]),t}(v.Component),p=_))||p)||p);t.default=I}}]);