(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[98],{ZFTa:function(e,t,a){"use strict";var l=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var c=l(a("W9HT"));a("g9YV");var d=l(a("wCAj")),o=l(a("d6i3")),r=l(a("1l/V")),s=l(a("2Taf")),u=l(a("vZ4D")),i=l(a("l4Ni")),f=l(a("ujKo")),m=l(a("rlhR")),g=l(a("MhPg"));a("y8nQ");var p,_,v,E,y=l(a("Vl3Y")),h=a("MuoO"),w=n(a("q1tI")),L=a("k82f"),x=a("+n12"),N=l(a("hh8c")),C=l(a("JMh9")),S=l(a("usdK")),I=(p=(0,h.connect)(function(e){var t=e.promotion,a=e.global;return{promotion:t,global:a}}),_=y.default.create(),p(v=_((E=function(e){function t(e){var a;return(0,s.default)(this,t),a=(0,i.default)(this,(0,f.default)(t).call(this,e)),a.getSetting=function(){var e=a.props.dispatch;e({type:"common/getSetting",payload:{str:"presale_compensate"},callback:function(e){200==e.state&&a.setState({compensateRate:e.data[0].value,isFirstLoading:!1})}})},a.get_detail=function(){var e=(0,r.default)(o.default.mark(function e(t){var l;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:l=a.props.dispatch,a.setState({loading:!0}),l({type:"promotion/get_presale_detail",payload:{presellId:t},callback:function(){var e=(0,r.default)(o.default.mark(function e(t){return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:200==t.state&&a.setState({detail:t.data,goodsInfo:t.data.goodsList}),a.setState({loading:!1});case 2:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()});case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),(0,m.default)(a),a.state={compensateRate:0,detail:{},goodsInfo:[],query:e.location.query,loading:!1,columns_spec:[{title:" ",dataIndex:"key",align:"center",width:30,render:function(e,t,a){return a+1}},{title:"".concat((0,x.sldComLanguage)("SKU\u89c4\u683c")),dataIndex:"specValues",align:"center",width:100,render:function(e,t,a){return e||"".concat((0,x.sldComLanguage)("\u9ed8\u8ba4"))}},{title:"".concat((0,x.sldComLanguage)("\u539f\u4ef7(\uffe5)")),dataIndex:"productPrice",align:"center",width:110},{title:"".concat((0,x.sldComLanguage)("\u5e93\u5b58")),dataIndex:"stock",align:"center",width:100},{title:"".concat((0,x.sldComLanguage)("\u9884\u552e\u4ef7\u683c(\uffe5)")),dataIndex:"presellPrice",align:"center",width:110},{title:"".concat((0,x.sldComLanguage)("\u9884\u552e\u5b9a\u91d1(\uffe5)")),dataIndex:"firstMoney",align:"center",width:100},{title:"".concat((0,x.sldComLanguage)("\u5b9a\u91d1\u81a8\u80c0(\uffe5)")),dataIndex:"firstExpand",align:"center",width:100},{title:"".concat((0,x.sldComLanguage)("\u9884\u552e\u5e93\u5b58")),dataIndex:"presellStock",align:"center",width:100}],columns_spec_all:[{title:" ",dataIndex:"key",align:"center",width:30,render:function(e,t,a){return a+1}},{title:"".concat((0,x.sldComLanguage)("SKU\u89c4\u683c")),dataIndex:"specValues",align:"center",width:100,render:function(e,t,a){return e||"".concat((0,x.sldComLanguage)("\u9ed8\u8ba4"))}},{title:"".concat((0,x.sldComLanguage)("\u539f\u4ef7(\xa5)")),dataIndex:"productPrice",align:"center",width:100},{title:"".concat((0,x.sldComLanguage)("\u5e93\u5b58")),dataIndex:"stock",align:"center",width:100},{title:"".concat((0,x.sldComLanguage)("\u9884\u552e\u4ef7\u683c(\uffe5)")),dataIndex:"presellPrice",align:"center",width:100},{title:"".concat((0,x.sldComLanguage)("\u9884\u552e\u5e93\u5b58")),dataIndex:"presellStock",align:"center",width:100}]},a}return(0,g.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){var e=this.state.query;void 0!=e.id&&e.id>0&&this.get_detail(e.id),void 0!=e.type&&1==e.type&&this.getSetting()}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this.state,t=e.loading,a=e.detail,l=e.columns_spec_all,n=e.goodsInfo,o=e.compensateRate,r=e.query,s=e.columns_spec;return w.default.createElement("div",{className:"".concat(N.default.common_page," ").concat(C.default.seckill," ").concat(N.default.com_flex_column),style:{position:"relative"}},w.default.createElement(c.default,{spinning:t},w.default.createElement(y.default,{layout:"inline"},w.default.createElement("div",{className:"".concat(N.default.goods_sku_tab," ").concat(N.default.add_goods_wrap," ").concat(C.default.full_activity)},w.default.createElement("div",{className:N.default.flex_com_space_between,style:{margin:10,marginTop:0}},(0,x.sldLlineRtextAddGoodsAddMargin)("#FA6F1E","".concat((0,x.sldComLanguage)("\u9884\u552e\u8be6\u60c5")),0,0,0),(0,x.sldIconBtnBg)(function(){return S.default.go(-1)},"fanhui","".concat((0,x.sldComLanguage)("\u8fd4\u56de\u4e0a\u7ea7\u9875\u9762")),"#fff",7,0,15,15,5)),(0,x.getSldHorLine)(1),w.default.createElement(L.Scrollbars,{autoHeight:!0,autoHeightMin:100,autoHeightMax:document.body.clientHeight-108},2==r.type&&(0,x.getSldEmptyH)(10),1==r.type?w.default.createElement("div",{className:"".concat(N.default.flex_row_start_center," ").concat(C.default.add_new),style:{marginTop:10}},w.default.createElement("span",{style:{fontSize:14,color:"#333",marginLeft:10,lineHeight:14}},(0,x.sldComLanguage)("\u6d3b\u52a8\u57fa\u672c\u4fe1\u606f")),w.default.createElement("span",{style:{color:"gray",fontSize:"12px",paddingLeft:"10px"}},(0,x.sldComLanguage)("\u6e29\u99a8\u63d0\u793a\uff1a\u82e5\u56e0\u5546\u5bb6\u95ee\u9898\u5bfc\u81f4\u65e0\u6cd5\u53d1\u8d27\uff0c\u9700\u8981\u5bf9\u4f1a\u5458\u8fdb\u884c\u8d54\u507f\uff0c\u8d54\u507f\u91d1\u989d\u4e3a\u5b9a\u91d1\u7684"),o,(0,x.sldComLanguage)("\u500d\u3002"))):(0,x.sldCommonTitleByBg)("".concat((0,x.sldComLanguage)("\u6d3b\u52a8\u57fa\u672c\u4fe1\u606f"))),w.default.createElement("div",{className:"".concat(C.default.full_acm_activity," ").concat(N.default.flex_column_start_start)},w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u6d3b\u52a8\u540d\u79f0")),w.default.createElement("div",{className:"".concat(C.default.right)},a.presellName)),w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u6d3b\u52a8\u6807\u7b7e")),w.default.createElement("div",{className:"".concat(C.default.right)},a.presellLabelName)),1==r.type&&w.default.createElement(w.Fragment,null,w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u5b9a\u91d1\u65f6\u95f4")),w.default.createElement("div",{className:"".concat(C.default.right)},a.startTime," ~ ",a.endTime)),w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u5c3e\u6b3e\u65f6\u95f4")),w.default.createElement("div",{className:"".concat(C.default.right)},a.remainStartTime," ~ ",a.remainEndTime))),2==r.type&&w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u6d3b\u52a8\u65f6\u95f4")),w.default.createElement("div",{className:"".concat(C.default.right)},a.startTime," ~ ",a.endTime)),w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u53d1\u8d27\u65f6\u95f4")),w.default.createElement("div",{className:"".concat(C.default.right)},a.deliverTime)),w.default.createElement("div",{className:"".concat(C.default.item," ").concat(N.default.flex_row_start_center)},w.default.createElement("div",{className:"".concat(C.default.left)},w.default.createElement("span",{style:{color:"#FF1515"}},"*"),(0,x.sldComLanguage)("\u9650\u8d2d\u4ef6\u6570")),w.default.createElement("div",{className:"".concat(C.default.right)},a.buyLimit,"\u4ef6"))),(0,x.getSldEmptyH)(10),(0,x.sldCommonTitleByBg)("".concat((0,x.sldComLanguage)("\u5546\u54c1\u4fe1\u606f"))),(0,x.getSldEmptyH)(10),w.default.createElement("div",{className:"".concat(C.default.full_acm_activity," ").concat(N.default.flex_column_start_start)},n.map(function(e,t){return w.default.createElement("div",{key:t,className:"".concat(C.default.sele_goods),style:{width:"100%"}},w.default.createElement("div",{className:"".concat(C.default.goods_info," ").concat(N.default.flex_row_between_start)},w.default.createElement("div",{className:"".concat(C.default.goods_info_left," ").concat(N.default.flex_row_start_start)},w.default.createElement("div",{className:"".concat(C.default.goods_img_wrap," ").concat(N.default.flex_row_center_center)},w.default.createElement("img",{className:"".concat(C.default.goods_img),src:e.goodsImage})),w.default.createElement("p",{className:"".concat(C.default.goods_name)},e.goodsName))),void 0!=e.productList&&e.productList.length>0&&w.default.createElement(L.Scrollbars,{autoHeight:!0,autoHeightMax:300},w.default.createElement(d.default,{rowKey:"productId",pagination:!1,columns:1==r.type?s:l,dataSource:e.productList,size:"small"})))})),(0,x.getSldEmptyH)(40))))))}}]),t}(w.Component),v=E))||v)||v);t.default=I}}]);