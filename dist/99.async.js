(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[99],{kIl7:function(e,t,a){"use strict";var l=a("g09b"),n=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var o=l(a("W9HT"));a("g9YV");var c=l(a("wCAj"));a("sRBo");var d=l(a("kaz8"));a("P2fV");var i=l(a("NJEC"));a("iQDF");var s=l(a("+eQT"));a("BoS7");var r=l(a("Sdc0"));a("5Dmo");var u=l(a("3S7+"));a("giR+");var f=l(a("fyUT")),m=l(a("gWZ8")),g=l(a("p0pE")),p=l(a("2Taf")),_=l(a("vZ4D")),h=l(a("l4Ni")),v=l(a("ujKo")),y=l(a("rlhR")),E=l(a("MhPg"));a("OaEy");var w=l(a("2fM7"));a("y8nQ");var k,C,b,L,S=l(a("Vl3Y")),I=a("MuoO"),N=n(a("q1tI")),x=a("k82f"),P=a("+n12"),R=l(a("hh8c")),V=l(a("JMh9")),F=l(a("+Hvy")),H=l(a("wd/R")),T="",O=S.default.Item,M=w.default.Option,D=(k=(0,I.connect)(function(e){var t=e.promotion,a=e.global;return{promotion:t,global:a}}),C=S.default.create(),k(b=C((L=function(e){function t(e){var a;(0,p.default)(this,t),a=(0,h.default)(this,(0,v.default)(t).call(this,e)),a.sele_more_goods={info:[],ids:[],min_num:1},a.batchConfirm=function(e,t,l){var n=a.state,o=n.selectedRows,c=n.battchVal,d=[];for(var i in o)if(o[i].goodsId==l.goodsId){o[i].seckillProductVOList.map(function(e){e[t]=c,d.push(e.productId)});break}a.setState({selectedRows:o,battchVal:""},function(){d.map(function(e){T.props.form.resetFields(["seckillStock"+e,"upperLimit"+e,"seckillPrice"+e,"state"+e])})})},a.handleFieldBattchChange=function(e,t,l){var n="seckillPrice"==t?"productPrice":"productStock",o=[];l.seckillProductVOList.map(function(e){o.push(e[n])});var c=o.sort()[0];e>c&&(e=c),a.setState({battchVal:e})},a.setAll=function(e,t){var l=a.state.selectedRows,n=[];for(var o in l)if(l[o].goodsId==t.goodsId){l[o].seckillProductVOList.map(function(t){t.state=e.target.checked?1:0,n.push("state"+t.productId)});break}a.setState({selectedRows:l},function(){T.props.form.resetFields(n)})},a.get_detail=function(e){var t=a.props.dispatch,l=a.state.detail;t({type:"promotion/get_seckill_detail",payload:{seckillId:e},callback:function(e){200==e.state?(l=e.data,a.setState({detail:l})):(0,P.failTip)(e.msg)}})},a.get_activity_stage=function(e){var t=a.props.dispatch,l=a.state.activity_stages;t({type:"promotion/get_activity_stage",payload:{seckillId:e,pageSize:P.list_com_page_more},callback:function(e){200==e.state&&(l=e.data.list),a.setState({activity_stages:l})}})},a.get_activity_label=function(){var e=a.props.dispatch,t=a.state.activity_labels;e({type:"promotion/get_activity_label",payload:{pageSize:P.list_com_page_more},callback:function(e){200==e.state&&(t=e.data.list.filter(function(e){return 1==e.isShow})),a.setState({activity_labels:t})}})},a.handleSelectRows=function(e,t){a.setState({selectedRows:e,selectedRowKeys:t})},a.handleSaveAllData=function(){var e=a.props.dispatch,t=a.state,l=t.query,n=t.selectedRows;a.props.form.validateFieldsAndScroll(function(t,a){if(!t){var o={};if(a.activityTime&&(o.endTime=a.activityTime.format(P.dateTimeFormat),delete a.activityTime),o.goodsInfoList=[],n.map(function(e){var t=[];e.seckillProductVOList.map(function(e){1==e.state&&t.push({productId:e.productId,seckillPrice:e.seckillPrice,seckillStock:e.seckillStock,upperLimit:void 0!=e.upperLimit?e.upperLimit:0})}),t.length>0&&o.goodsInfoList.push({goodsId:e.goodsId,productInfoList:t})}),0==o.goodsInfoList.length)return(0,P.failTip)("".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u8981\u53c2\u4e0e\u6d3b\u52a8\u7684\u5546\u54c1"))),!1;T.setState({loading:!0});var c="";o.seckillId=l.id,o.labelId=a.labelId,o.stageId=a.stageId,c="promotion/join_seckill_activity",e({type:c,payload:o,callback:function(e){T.setState({loading:!1}),200==e.state?((0,P.sucTip)(e.msg),setTimeout(function(){T.props.history.goBack()},500)):(0,P.failTip)(e.msg)}})}})},a.sldHandleCancle=function(){a.setState({modalVisibleGoods:!1})},a.seleGoods=function(e,t){var l=a.state,n=l.selectedRows,o=l.selectedRowKeys;e.map(function(e,t){e.seckillProductVOList.map(function(t){t.goodsId=e.goodsId,t.state=1})}),o.map(function(a){if(t.indexOf(a)>-1)for(var l=n.filter(function(e){return e.goodsId==a})[0],o=0;o<e.length;o++)if(e[o].goodsId==a){e[o]=(0,g.default)({},l);break}}),a.sele_more_goods.ids=(0,m.default)(t),a.sele_more_goods.info=JSON.parse(JSON.stringify(e)),a.setState({selectedRows:e,selectedRowKeys:t}),a.sldHandleCancle()},a.delSpu=function(e){var t=a.state,l=t.selectedRows,n=t.selectedRowKeys;l=l.filter(function(t){return t.goodsId!=e}),n=n.filter(function(t){return t!=e}),a.sele_more_goods.ids=(0,m.default)(n),a.sele_more_goods.info=JSON.parse(JSON.stringify(l)),a.setState({selectedRows:l,selectedRowKeys:n})},a.addGoods=function(){a.setState({modalVisibleGoods:!0})},T=(0,y.default)(a);var l=e.form.getFieldDecorator;return a.state={battchVal:"",activity_stages:[],activity_labels:[],loading:!1,modalVisibleGoods:!1,query:e.location.query,selectedRows:[],selectedRowKeys:[],detail:{},columns_spec:[{title:" ",dataIndex:"key",align:"center",width:30,render:function(e,t,a){return a+1}},{title:"".concat((0,P.sldComLanguage)("SKU\u89c4\u683c")),dataIndex:"specValues",align:"center",width:100,render:function(e,t,a){return e||"".concat((0,P.sldComLanguage)("\u9ed8\u8ba4"))}},{title:"".concat((0,P.sldComLanguage)("\u539f\u4ef7(\xa5)")),dataIndex:"productPrice",align:"center",width:100},{title:"".concat((0,P.sldComLanguage)("\u5e93\u5b58")),dataIndex:"productStock",align:"center",width:100},{title:N.default.createElement("div",{style:{position:"relative"}},N.default.createElement("span",{style:{color:"#FF2929",fontSize:13}},"*"),(0,P.sldComLanguage)("\u79d2\u6740\u4ef7")),dataIndex:"seckillPrice",align:"center",width:100,render:function(e,t){return N.default.createElement(O,{style:{width:"100%"}},l("seckillPrice".concat(t.productId),{initialValue:e,rules:1==t.state?[{required:!0,message:"".concat((0,P.sldComLanguage)("\u8be5\u9879\u5fc5\u586b"))}]:[]})(N.default.createElement(f.default,{min:.01,max:9999999,precision:2,style:{width:"100%"},onChange:function(e){return a.handleFieldChange(e,"seckillPrice",t)}})))}},{title:N.default.createElement("div",{style:{position:"relative"}},N.default.createElement("span",{style:{color:"#FF2929",fontSize:13}},"*"),(0,P.sldComLanguage)("\u79d2\u6740\u5e93\u5b58")),dataIndex:"seckillStock",align:"center",width:100,render:function(e,t){return N.default.createElement(O,{style:{width:"100%"}},l("seckillStock".concat(t.productId),{initialValue:e,rules:1==t.state?[{required:!0,message:"".concat((0,P.sldComLanguage)("\u8be5\u9879\u5fc5\u586b"))}]:[]})(N.default.createElement(f.default,{min:1,max:99999999,precision:0,style:{width:"100%"},onChange:function(e){return a.handleFieldChange(e,"seckillStock",t)}})))}},{title:N.default.createElement("div",{style:{position:"relative"}},(0,P.sldComLanguage)("\u9650\u8d2d\u6570\u91cf"),N.default.createElement(u.default,{placement:"bottomLeft",title:(0,P.sldComLanguage)("\u9650\u5236\u6bcf\u4e2a\u4f1a\u5458ID\u5728\u672c\u573a\u6d3b\u52a8\u4e2d\u7684\u8d2d\u4e70\u6570\u91cf")},N.default.createElement("div",{style:{right:-15,top:2,position:"absolute"}},(0,P.sldSvgIcon)("#bfbbba",14,14,"wen")))),dataIndex:"upperLimit",align:"center",width:100,render:function(e,t){return N.default.createElement(O,{style:{width:"100%"}},l("upperLimit".concat(t.productId),{initialValue:e})(N.default.createElement(f.default,{min:0,max:99999999,precision:0,style:{width:"100%"},onChange:function(e){return a.handleFieldChange(e,"upperLimit",t)}})))}},{title:"".concat((0,P.sldComLanguage)("\u53c2\u4e0e")),dataIndex:"state",align:"center",width:60,render:function(e,t){return N.default.createElement(O,{style:{width:"100%"}},l("state".concat(t.productId),{valuePropName:"checked",initialValue:1==e})(N.default.createElement(r.default,{style:{width:"100%"},onChange:function(e){return a.handleFieldChange(e?1:2,"state",t)}})))}}]},a}return(0,E.default)(t,e),(0,_.default)(t,[{key:"componentDidMount",value:function(){var e=this.state.query;void 0!=e.id&&e.id>0&&this.get_detail(e.id),this.get_activity_stage(e.id),this.get_activity_label(),this.props.dispatch({type:"global/getLayoutCollapsed"})}},{key:"componentWillUnmount",value:function(){}},{key:"handleFieldChange",value:function(e,t,a){("seckillStock"==t||"upperLimit"==t)&&e>a.productStock&&(e=a.productStock),"seckillPrice"==t&&e>a.productPrice&&(e=a.productPrice);var l=this.state.selectedRows,n=l.filter(function(e){return e.goodsId==a.goodsId});if(n.length>0){var o=n[0].seckillProductVOList.filter(function(e){return e.productId==a.productId});o.length>0&&(o[0][t]=e,this.setState({selectedRows:l},function(){T.props.form.resetFields(["seckillStock"+a.productId,"upperLimit"+a.productId,"seckillPrice"+a.productId,"state"+a.productId])}))}}},{key:"render",value:function(){var e=this,t=this.state,l=t.loading,n=t.detail,r=t.modalVisibleGoods,u=t.activity_stages,m=t.activity_labels,g=t.columns_spec,p=t.selectedRows,_=t.battchVal,h=this.props.form.getFieldDecorator,v=function(e){return e&&e<(0,H.default)().subtract(1,"days")};return N.default.createElement("div",{className:"".concat(V.default.full_activity," ").concat(V.default.seckill," ").concat(R.default.common_page," ").concat(R.default.com_flex_column),style:{position:"relative"}},(0,P.sldLlineRtextAddGoodsAddMargin)("#69A2F2","".concat((0,P.sldComLanguage)("\u79d2\u6740\u6d3b\u52a8")),0,0,10),(0,P.getSldHorLine)(1),N.default.createElement(o.default,{spinning:l},N.default.createElement(S.default,{layout:"inline"},N.default.createElement(x.Scrollbars,{autoHeight:!0,autoHeightMin:100,autoHeightMax:document.body.clientHeight-160},N.default.createElement("div",{className:"".concat(R.default.goods_sku_tab," ").concat(R.default.add_goods_wrap)},N.default.createElement("div",null,(0,P.getSldEmptyH)(10),(0,P.sldCommonTitleByBg)("".concat((0,P.sldComLanguage)("\u6d3b\u52a8\u57fa\u672c\u4fe1\u606f"))),N.default.createElement("div",{className:"".concat(V.default.full_acm_activity," ").concat(R.default.flex_column_start_start)},N.default.createElement("div",{className:"".concat(V.default.item," ").concat(R.default.flex_row_start_start)},N.default.createElement("div",{className:"".concat(V.default.left)},(0,P.sldComLanguage)("\u6d3b\u52a8\u540d\u79f0")),N.default.createElement("div",{className:"".concat(V.default.right," ").concat(V.default.right_show_content)},n.seckillName)),N.default.createElement("div",{className:"".concat(V.default.item," ").concat(R.default.flex_row_start_start)},N.default.createElement("div",{className:"".concat(V.default.left)},(0,P.sldComLanguage)("\u6d3b\u52a8\u65f6\u95f4")),N.default.createElement("div",{className:"".concat(V.default.right," ").concat(V.default.right_show_content)},n.startTime," ~ ",n.endTime)),N.default.createElement("div",{className:"".concat(V.default.item," ").concat(R.default.flex_row_start_start)},N.default.createElement("div",{className:"".concat(V.default.left)},N.default.createElement("span",{style:{color:"red"}},"*"),(0,P.sldComLanguage)("\u6d3b\u52a8\u573a\u6b21")),N.default.createElement("div",{className:"".concat(V.default.right)},N.default.createElement(O,null,h("stageId",{rules:[{required:!0,message:"".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u6d3b\u52a8\u573a\u6b21"))}]})(N.default.createElement(w.default,{placeholder:"".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u6d3b\u52a8\u573a\u6b21")),style:{width:300},getPopupContainer:function(e){return e.parentNode}},u.map(function(e,t){return N.default.createElement(M,{key:t,value:e.stageId},e.stageName)})))))),N.default.createElement("div",{className:"".concat(V.default.item," ").concat(R.default.flex_row_start_start)},N.default.createElement("div",{className:"".concat(V.default.left)},N.default.createElement("span",{style:{color:"red"}},"*"),(0,P.sldComLanguage)("\u6d3b\u52a8\u6807\u7b7e")),N.default.createElement("div",{className:"".concat(V.default.right)},N.default.createElement(O,null,h("labelId",{rules:[{required:!0,message:"".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u6d3b\u52a8\u6807\u7b7e"))}]})(N.default.createElement(w.default,{placeholder:"".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u6d3b\u52a8\u6807\u7b7e")),style:{width:300},getPopupContainer:function(e){return e.parentNode}},m.map(function(e,t){return N.default.createElement(M,{key:t,value:e.labelId},e.labelName)})))))),N.default.createElement("div",{className:"".concat(V.default.item," ").concat(R.default.flex_row_start_start)},N.default.createElement("div",{className:"".concat(V.default.left)},(0,P.sldComLanguage)("\u5546\u54c1\u79d2\u6740\u7ed3\u675f\u65f6\u95f4")),N.default.createElement("div",{className:"".concat(V.default.right)},N.default.createElement(O,{extra:"".concat((0,P.sldComLanguage)("\u8bbe\u7f6e\u540e\u5546\u54c1\u7684\u79d2\u6740\u7ed3\u675f\u65f6\u95f4\u4ee5\u8bbe\u7f6e\u65f6\u95f4\u4e3a\u51c6\uff0c\u82e5\u672a\u8bbe\u7f6e\u79d2\u6740\u65f6\u95f4\uff0c\u5219\u672c\u573a\u79d2\u6740\u7ed3\u675f\u65f6\uff0c\u5546\u54c1\u540c\u65f6\u7ed3\u675f\u79d2\u6740\u3002")),style:{width:300}},h("activityTime")(N.default.createElement(s.default,{disabledDate:v,showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm:00",style:{width:"100%"},placeholder:"".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u5546\u54c1\u79d2\u6740\u7ed3\u675f\u65f6\u95f4")),getCalendarContainer:function(e){return e.parentNode}}))))))),(0,P.getSldEmptyH)(10),N.default.createElement("div",{className:"".concat(R.default.flex_row_start_center," ").concat(V.default.add_new)},(0,P.sldIconBtn)(function(){return e.addGoods()},"".concat((0,P.sldComLanguage)("\u6dfb\u52a0\u6d3b\u52a8\u5546\u54c1")),7,7),N.default.createElement("span",{className:"".concat(V.default.add_new_tip)},(0,P.sldComLanguage)("\u63d0\u9192\uff1a\u81f3\u5c11\u6dfb\u52a0\u4e00\u4e2a\u5546\u54c1,\u5df2\u53c2\u52a0\u5176\u4ed6\u5e73\u53f0\u6d3b\u52a8\u6216\u5176\u4ed6\u79d2\u6740\u573a\u6b21\u7684\u5546\u54c1\u4e0d\u53ef\u53c2\u4e0e\u8be5\u6d3b\u52a8"))),N.default.createElement(S.default,{onSubmit:function(t){return e.handleSaveAllData()},layout:"inline"},p.map(function(t,l){return N.default.createElement("div",{key:l,className:"".concat(V.default.sele_goods)},N.default.createElement("img",{onClick:function(){return e.delSpu(t.goodsId)},className:V.default.del_spu,src:a("deTX")}),N.default.createElement("div",{className:"".concat(V.default.goods_info," ").concat(R.default.flex_row_between_start)},N.default.createElement("div",{className:"".concat(V.default.goods_info_left," ").concat(R.default.flex_row_start_start)},N.default.createElement("div",{className:"".concat(V.default.goods_img_wrap," ").concat(R.default.flex_row_center_center)},N.default.createElement("img",{className:"".concat(V.default.goods_img),src:t.goodsImage})),N.default.createElement("p",{className:"".concat(V.default.goods_name)},t.goodsName)),N.default.createElement("div",{className:"".concat(V.default.goods_info_right," ").concat(R.default.flex_row_end_end)},N.default.createElement(i.default,{title:N.default.createElement(f.default,{min:.01,max:9999999,precision:2,style:{width:"100%"},value:_,onChange:function(a){return e.handleFieldBattchChange(a,"seckillPrice",t)}}),onConfirm:function(a){e.batchConfirm(a,"seckillPrice",t)}},N.default.createElement("div",{className:"".concat(V.default.batch_btn," ").concat(R.default.flex_row_center_center)},(0,P.sldComLanguage)("\u6279\u91cf\u8bbe\u7f6e\u79d2\u6740\u4ef7"))),N.default.createElement(i.default,{title:N.default.createElement(f.default,{min:1,max:99999999,precision:0,style:{width:"100%"},value:_,onChange:function(a){return e.handleFieldBattchChange(a,"seckillStock",t)}}),onConfirm:function(a){e.batchConfirm(a,"seckillStock",t)}},N.default.createElement("div",{className:"".concat(V.default.batch_btn," ").concat(R.default.flex_row_center_center)},(0,P.sldComLanguage)("\u6279\u91cf\u8bbe\u7f6e\u79d2\u6740\u5e93\u5b58"))),N.default.createElement(i.default,{title:N.default.createElement(f.default,{min:0,max:99999999,precision:0,style:{width:"100%"},value:_,onChange:function(a){return e.handleFieldBattchChange(a,"upperLimit",t)}}),onConfirm:function(a){e.batchConfirm(a,"upperLimit",t)}},N.default.createElement("div",{className:"".concat(V.default.batch_btn," ").concat(R.default.flex_row_center_center)},(0,P.sldComLanguage)("\u6279\u91cf\u8bbe\u7f6e\u9650\u8d2d\u6570\u91cf"))),N.default.createElement("div",{className:"".concat(V.default.batch_btn," ").concat(R.default.flex_row_center_center)},N.default.createElement(d.default,{onChange:function(a){e.setAll(a,t)}},N.default.createElement("span",{className:"".concat(V.default.sel_all)},(0,P.sldComLanguage)("\u5168\u90e8\u53c2\u4e0e")))))),N.default.createElement(x.Scrollbars,{autoHeight:!0,autoHeightMax:300},N.default.createElement(c.default,{rowKey:"productId",pagination:!1,columns:g,dataSource:t.seckillProductVOList,size:"small"})))}))),(0,P.getSldEmptyH)(15),N.default.createElement("div",{className:R.default.m_diy_bottom_wrap,style:{position:"fixed",left:this.props.global.collapsed?90:160}},N.default.createElement("div",{onClick:function(){return e.props.history.goBack()},className:R.default.add_goods_bottom_btn},(0,P.sldComLanguage)("\u8fd4\u56de")),N.default.createElement("div",{onClick:function(){return e.props.form.submit(e.handleSaveAllData)},className:"".concat(R.default.add_goods_bottom_btn," ").concat(R.default.add_goods_bottom_btn_sel)},(0,P.sldComLanguage)("\u4fdd\u5b58")))))),N.default.createElement(F.default,{selectedRows:this.sele_more_goods.info,selectedRowKeys:this.sele_more_goods.ids,modalVisible:r,width:1e3,height:document.body.clientHeight-400,sldHandleSeleMoreModalCancle:this.sldHandleCancle,seleSvideo:this.seleGoods,title:"".concat((0,P.sldComLanguage)("\u8bf7\u9009\u62e9\u5546\u54c1(\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a)")),extra:this.sele_more_goods}))}}]),t}(N.Component),b=L))||b)||b);t.default=D}}]);