(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[104],{"/WN8":function(e,t,a){"use strict";var o=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("gWZ8")),r=o(a("2Taf")),c=o(a("vZ4D")),i=o(a("l4Ni")),s=o(a("ujKo")),d=o(a("rlhR")),m=o(a("MhPg"));a("OaEy");var g=o(a("2fM7"));a("7Kak");var u=o(a("9yH6"));a("y8nQ");var f=o(a("Vl3Y"));a("2qtc");var _,p,h,x,b=o(a("kLXV")),v=a("MuoO"),C=l(a("q1tI")),L=a("+n12"),w=o(a("hh8c")),y=o(a("usdK")),T=o(a("dnYI")),N=a("k82f"),E=o(a("nVqQ")),S=o(a("RTFr")),V=o(a("CkN6")),I=b.default.info,k=(f.default.Item,u.default.Group,g.default.Option,_=(0,v.connect)(function(e){var t=e.order;return{order:t}}),p=f.default.create(),_(h=p((x=function(e){function t(e){var o;return(0,r.default)(this,t),o=(0,i.default)(this,(0,s.default)(t).call(this,e)),o.columns_order_goods=[{title:" ",align:"center",width:30,render:function(e,t,a){return 1*a+1}},{title:"".concat((0,L.sldComLanguage)("\u5546\u54c1\u4fe1\u606f")),dataIndex:"productImage",align:"center",width:500,render:function(e,t){return C.default.createElement("div",{className:"".concat(T.default.goods_info," ").concat(w.default.com_flex_row_flex_start)},C.default.createElement("div",{className:T.default.goods_img},(0,L.getSldListGoodsImg80)(e)),C.default.createElement("div",{className:"".concat(w.default.com_flex_column_space_between," ").concat(T.default.goods_detail)},C.default.createElement("span",{className:T.default.goods_name,style:{marginTop:6,width:380},title:t.goodsName},t.goodsName),C.default.createElement("span",{className:T.default.goods_brief,title:t.specValue},t.specValues)))}},{title:"".concat((0,L.sldComLanguage)("\u5355\u4ef7(\u5143)")),dataIndex:"productShowPrice",align:"center",width:100},{title:"".concat((0,L.sldComLanguage)("\u6570\u91cf")),dataIndex:"productNum",align:"center",width:100},{title:"".concat((0,L.sldComLanguage)("\u64cd\u4f5c")),align:"center",width:80,render:function(e,t){return C.default.createElement(C.Fragment,null,void 0!=t.afsState&&t.afsState?(0,L.sldtbaleOpeBtnText)(t.afsStateValue,function(){return o.goServiceDetail(t.afsSn)}):"--")}}],o.columns_order_log=[{title:" ",align:"center",width:30,render:function(e,t,a){return 1*a+1}},{title:"".concat((0,L.sldComLanguage)("\u64cd\u4f5c\u65b9")),dataIndex:"logRole",align:"center",width:100,render:function(e,t,a){var o="";return 1==e?o="\u7cfb\u7edf\u7ba1\u7406\u5458":2==e?o="\u5546\u5bb6":2==e&&(o="\u4f1a\u5458"),o}},{title:"".concat((0,L.sldComLanguage)("\u64cd\u4f5c\u4eba")),dataIndex:"logUserName",align:"center",width:100},{title:"".concat((0,L.sldComLanguage)("\u64cd\u4f5c\u65f6\u95f4")),dataIndex:"logTime",align:"center",width:150},{title:"".concat((0,L.sldComLanguage)("\u64cd\u4f5c\u5185\u5bb9")),dataIndex:"logContent",align:"center",width:200}],o.invoice_info_other=[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u662f\u5426\u9700\u8981\u5f00\u7968")),name:"invoiceStatus",extra:"",item_height:42,text:"".concat((0,L.sldComLanguage)("\u5426"))}],o.invoice_info_personal=[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u53d1\u7968\u62ac\u5934")),name:"invoiceTitle",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u7968\u90ae\u7bb1")),name:"receiverEmail",extra:"",item_height:42,text:""}],o.invoice_info_VAT=[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u5355\u4f4d\u540d\u79f0")),name:"invoiceTitle",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u7a0e\u53f7")),name:"taxCode",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6ce8\u518c\u5730\u5740")),name:"registerAddr",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6ce8\u518c\u7535\u8bdd")),name:"registerPhone",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u5f00\u6237\u94f6\u884c")),name:"bankName",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u94f6\u884c\u8d26\u6237")),name:"bankAccount",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u7968\u4eba")),name:"receiverName",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u7968\u7535\u8bdd")),name:"receiverMobile",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u7968\u5730\u5740")),name:"receiverAddress",extra:"",item_height:42,text:""}],o.get_flow_loading=!1,o.goServiceDetail=function(e){y.default.push("/order/service_refund_lists_to_detail?afsSn=".concat(e))},o.get_order_detail=function(e){var t=o.props.dispatch,l=o.state,r=l.order_detail,c=l.return_progress_data,i=l.invoice_info,s=l.receiver_info,d=l.order_info,m=(l.goodsInfoList,l.orderLogList),g=l.reserve_info;t({type:"order/get_order_detail",payload:e,callback:function(e){if(200==e.state){if(r=e.data,m=e.data.orderLogs,1==r.invoiceStatus){var t="";for(var l in 1==r.invoiceInfo.titleType?(i=JSON.parse(JSON.stringify(o.invoice_info_personal)),t="".concat((0,L.sldComLanguage)("\u4e2a\u4eba\u53d1\u7968"))):1!=r.invoiceInfo.invoiceType?(i=JSON.parse(JSON.stringify(o.invoice_info_VAT)),t="".concat((0,L.sldComLanguage)("\u589e\u503c\u7a0e\u4e13\u7528\u53d1\u7968"))):t="".concat((0,L.sldComLanguage)("\u666e\u901a\u53d1\u7968")),i)i[l].text=r["invoiceInfo"][i[l].name]?r["invoiceInfo"][i[l].name]:"--";var u=1==r.invoiceInfo.invoiceContent?"".concat((0,L.sldComLanguage)("\u5546\u54c1\u660e\u7ec6")):"".concat((0,L.sldComLanguage)("\u5546\u54c1\u7c7b\u522b"));i=[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u53d1\u7968\u7c7b\u578b")),name:"invoiceTypeCombine",extra:"",item_height:42,text:t},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u53d1\u7968\u5185\u5bb9")),name:"invoiceContent",extra:"",item_height:42,text:u}].concat((0,n.default)(i))}else i=JSON.parse(JSON.stringify(o.invoice_info_other));for(var f in s.map(function(e){"receiverAreaInfo"==e.name?e.text=r.receiverAreaInfo+" "+r.receiverAddress:e.text=r[e.name]?r[e.name]:"--"}),d)"orderTypeValue"==d[f].name?d[f].text=r[d[f].name]?"".concat(r[d[f].name]).concat((0,L.sldComLanguage)("\u8ba2\u5355")).concat(2==r.isVirtualGoods?"\u3001"+(0,L.sldComLanguage)("\u865a\u62df\u8ba2\u5355"):""):2==r.isVirtualGoods?"".concat((0,L.sldComLanguage)("\u865a\u62df\u8ba2\u5355")):"".concat((0,L.sldComLanguage)("\u666e\u901a\u8ba2\u5355")):"star"==d[f].name?d[f].text=r[d[f].name]?r[d[f].name]:0:d[f].text=r[d[f].name]?r[d[f].name]:"--";2==r.isVirtualGoods&&void 0!=r.orderReserveList.length&&r.orderReserveList.length&&(g=[],r.orderReserveList.map(function(e){g.push({type:"show_text",label:e.reserveName,name:e.reserveId,extra:"",item_height:42,text:e.reserveValue})})),c=[],0==r.orderState?(c.push({icon:a("xkDd"),state:"".concat((0,L.sldComLanguage)("\u63d0\u4ea4\u8ba2\u5355")),time:m.length>0&&void 0!=m[0].logTime?m[0].logTime:"",state_color:"rgba(255, 113, 30, .6)",time_color:"rgba(255, 113, 30, .3)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("7un2"),state:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u53d6\u6d88")),time:m.length>0&&void 0!=m[1].logTime?m[1].logTime:"",state_color:"rgba(255, 113, 30,1)",time_color:"rgba(255, 113, 30, .5)",line_color:"rgba(255, 113, 30,1)"})):10==r.orderState?(c.push({icon:a("Jf4I"),state:"".concat((0,L.sldComLanguage)("\u63d0\u4ea4\u8ba2\u5355")),time:m.length>0&&void 0!=m[0].logTime?m[0].logTime:"",state_color:"rgba(255, 113, 30,1)",time_color:"rgba(51, 51, 51, 1)",line_color:"rgba(255, 113, 30,1)"}),c.push({icon:a("X3/m"),state:"".concat((0,L.sldComLanguage)("\u4ed8\u6b3e\u6210\u529f")),time:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"#eee"}),c.push({icon:a("woAG"),state:"".concat((0,L.sldComLanguage)("\u5546\u54c1\u53d1\u8d27")),time:"",state_color:"#999999",time_color:"rgba(255, 113, 30, .5)",line_color:"#eee"}),c.push({icon:a("6Awp"),state:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5b8c\u6210")),time:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"#eee"})):20==r.orderState?(c.push({icon:a("xkDd"),state:"".concat((0,L.sldComLanguage)("\u63d0\u4ea4\u8ba2\u5355")),time:m.length>0&&void 0!=m[0].logTime?m[0].logTime:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("uL9w"),state:"".concat((0,L.sldComLanguage)("\u4ed8\u6b3e\u6210\u529f")),time:m.length>0&&void 0!=m[1].logTime?m[1].logTime:"",state_color:"rgba(51, 51, 51, 1)",time_color:"rgba(51, 51, 51, 1)",line_color:"rgba(255, 113, 30,1)"}),c.push({icon:a("woAG"),state:"".concat((0,L.sldComLanguage)("\u5546\u54c1\u53d1\u8d27")),time:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"#eee"}),c.push({icon:a("6Awp"),state:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5b8c\u6210")),time:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"#eee"})):30==r.orderState?(c.push({icon:a("xkDd"),state:"".concat((0,L.sldComLanguage)("\u63d0\u4ea4\u8ba2\u5355")),time:m.length>0&&void 0!=m[0].logTime?m[0].logTime:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("VXeM"),state:"".concat((0,L.sldComLanguage)("\u4ed8\u6b3e\u6210\u529f")),time:m.length>0&&void 0!=m[1].logTime?m[1].logTime:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("69Qp"),state:"".concat((0,L.sldComLanguage)("\u5546\u54c1\u53d1\u8d27")),time:m.length>0&&void 0!=m[2].logTime?m[2].logTime:"",state_color:"rgba(51, 51, 51, 1)",time_color:"rgba(51, 51, 51, 1)",line_color:"rgba(255, 113, 30,1)"}),c.push({icon:a("6Awp"),state:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5b8c\u6210")),time:"",state_color:"rgba(51, 51, 51, .5)",time_color:"rgba(51, 51, 51, .5)",line_color:"#eee"})):40==r.orderState&&(c.push({icon:a("xkDd"),state:"".concat((0,L.sldComLanguage)("\u63d0\u4ea4\u8ba2\u5355")),time:m.length>0&&void 0!=m[0].logTime?m[0].logTime:"",state_color:"rgba(255, 113, 30, .6)",time_color:"rgba(255, 113, 30, .3)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("VXeM"),state:"".concat((0,L.sldComLanguage)("\u4ed8\u6b3e\u6210\u529f")),time:m.length>0&&void 0!=m[1].logTime?m[1].logTime:"",state_color:"rgba(255, 113, 30, .6)",time_color:"rgba(255, 113, 30, .3)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("jOec"),state:"".concat((0,L.sldComLanguage)("\u5546\u54c1\u53d1\u8d27")),time:m.length>0&&void 0!=m[2].logTime?m[2].logTime:"",state_color:"rgba(255, 113, 30, .6)",time_color:"rgba(255, 113, 30, .3)",line_color:"rgba(255, 113, 30, .3)"}),c.push({icon:a("FyX7"),state:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5b8c\u6210")),time:m.length>0&&void 0!=m[3].logTime?m[3].logTime:"",state_color:"rgba(51, 51, 51, 1)",time_color:"rgba(51, 51, 51, 1)",line_color:"rgba(255, 113, 30,1)"})),o.setState({order_detail:e.data,invoice_info:i,receiver_info:s,order_info:d,reserve_info:g,return_progress_data:c,goodsInfoList:r.orderProductList})}else(0,L.failTip)(e.msg)}})},o.sldHandleCancle=function(){var e=o.state.modalVisible;o.setState({modalVisible:!e,operateData:[]})},o.sldHandleSecondCancle=function(){o.setState({secondModalVisible:!1,priceModalVisible:!1})},o.agreeReturn=function(e){var t=o.props.dispatch,a=o.state,l=(a.resList,a.modalVisible),n=a.operateData,r=(a.deliverModal,a.query),c=a.show_foot,i=a.order_detail,s=a.showTopTip,d="",m=!1;if(n=[],s="","flow"==e){if(o.get_flow_loading)return!1;1==i.deliverType?I({width:470,title:"\u8be5\u8ba2\u5355\u662f\u81ea\u884c\u914d\u9001\uff0c\u60a8\u53ef\u4ee5\u8054\u7cfb\u914d\u9001\u4eba\u4e86\u89e3\u5177\u4f53\u8fdb\u5ea6",content:C.default.createElement("div",null,C.default.createElement("p",null,"\u914d\u9001\u4eba\u59d3\u540d\uff1a",i.deliverName),C.default.createElement("p",null,"\u914d\u9001\u4eba\u624b\u673a\u53f7\uff1a",i.deliverMobile))}):(o.get_flow_loading=!0,t({type:"order/get_flow",payload:{orderSn:r.orderSn},callback:function(t){200==t.state?(n.push({type:"show_express",content:t.data}),m=!0,d="".concat((0,L.sldComLanguage)("\u7269\u6d41\u4fe1\u606f")),o.setState({operateData:n,modalVisible:m&&!l,titleName:d,propType:e,show_foot:!1})):(0,L.failTip)(t.msg),o.get_flow_loading=!1}}))}o.setState({operateData:n,modalVisible:m&&!l,titleName:d,propType:e,show_foot:c,showTopTip:s})},(0,d.default)(o),o.state={reserve_info:[],exterFaceSheet:"",showPrintExterFaceSheetBtn:!1,isAllowApplyExpressNum:!0,showTopTip:"",secondTitle:"",secondSubmiting:!1,secondModalVisible:!1,secondOperateData:[],orderRemarkData:[{type:"textarea",label:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5907\u6ce8")),name:"remark",placeholder:"".concat((0,L.sldComLanguage)("\u8bf7\u8f93\u5165\u8ba2\u5355\u5907\u6ce8\u4fe1\u606f")),extra:"".concat((0,L.sldComLanguage)("\u6700\u591a\u8f93\u5165100\u5b57")),initialValue:"",maxLength:100}],changeVal:"",priceModalVisible:!1,priceSubmiting:!1,query:e.location.query,order_detail:{},return_progress_data:[],invoice_info:[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u5355\u4f4d\u540d\u79f0")),name:"invoiceTitle",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u7a0e\u53f7")),name:"taxCode",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u7968\u90ae\u7bb1")),name:"receiverEmail",extra:"",item_height:42,text:""}],receiver_info:[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u4f1a\u5458\u540d\u79f0")),name:"memberName",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u8d27\u4eba")),name:"receiverName",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u8d27\u4eba\u624b\u673a\u53f7")),name:"receiverMobile",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u6536\u8d27\u5730\u5740")),name:"receiverAreaInfo",extra:"",item_height:42,text:""}],order_info:[{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u7c7b\u578b")),name:"orderTypeValue",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u53f7")),name:"orderSn",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u652f\u4ed8\u65b9\u5f0f")),name:"paymentName",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5907\u6ce8")),name:"orderRemark",extra:"",item_height:42,text:""},{type:"show_text",label:"".concat((0,L.sldComLanguage)("\u5546\u5bb6\u5907\u6ce8")),name:"storeRemark",extra:"",item_height:42,text:""},{type:"show_order_star_style",label:"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u661f\u7ea7")),name:"star",extra:"",item_height:42,text:""}],goodsInfoList:[],orderLogList:[],operateData:[],resList:[],modalVisible:!1,titleName:"",submiting:!1,show_foot:!0,modal_width:550,propType:"",deliverModal:!1,expressList:[],deliverType:"0"},o}return(0,m.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value:function(){var e=this.state.query;this.get_order_detail({orderSn:e.orderSn})}},{key:"render",value:function(){var e=this,t=this.state,a=t.order_detail,o=t.invoice_info,l=t.receiver_info,n=t.order_info,r=t.return_progress_data,c=t.titleName,i=t.submiting,s=t.show_foot,d=t.modal_width,m=t.showTopTip,g=t.modalVisible,u=t.operateData,f=t.secondTitle,_=t.secondSubmiting,p=t.secondModalVisible,h=t.secondOperateData,x=t.reserve_info;return C.default.createElement("div",{className:w.default.common_page,style:{flex:1,flexDirection:"column",overflow:"hidden"}},C.default.createElement("div",{className:w.default.flex_com_space_between,style:{margin:10,marginTop:0}},(0,L.sldLlineRtextAddGoods)("#69A2F2","".concat((0,L.sldComLanguage)("\u8ba2\u5355\u8be6\u60c5"))),(0,L.sldIconBtnBg)(function(){return(0,L.pageClose)()},"fanhui","".concat((0,L.sldComLanguage)("\u8fd4\u56de\u4e0a\u7ea7\u9875\u9762")),"#fff",7,0,15,15,5)),(0,L.getSldHorLine)(1),C.default.createElement(N.Scrollbars,{autoHeight:!0,autoHeightMin:100,autoHeightMax:document.body.clientHeight-60},C.default.createElement("div",{className:"".concat(w.default.flex_row_center_start," ").concat(T.default.progress)},r.map(function(e,t){return C.default.createElement("div",{key:t,className:"".concat(w.default.flex_column_start_center," ").concat(T.default.item)},C.default.createElement("div",{className:"".concat(T.default.top," ").concat(w.default.flex_row_center_center)},C.default.createElement("span",{className:"".concat(T.default.left_line),style:{borderColor:e.line_color}}),C.default.createElement("img",{src:e.icon}),C.default.createElement("span",{className:"".concat(T.default.right_line),style:{borderColor:e.line_color}})),C.default.createElement("span",{className:"".concat(T.default.state),style:{color:e.state_color}},e.state),C.default.createElement("span",{className:"".concat(T.default.time),style:{color:e.time_color}},e.time))})),0==a.orderState&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},"".concat((0,L.sldComLanguage)("\u8ba2\u5355\u5df2\u53d6\u6d88"))),C.default.createElement("span",{className:T.default.tip},(0,L.sldComLanguage)("\u53d6\u6d88\u539f\u56e0"),":",a.refuseReason+(a.refuseRemark?","+a.refuseRemark:""))),10==a.orderState&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},a.orderStateValue)),20==a.orderState&&0==a.lockState&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},a.orderStateValue)),20==a.orderState&&a.lockState>0&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},a.orderStateValue)),30==a.orderState&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},"".concat((0,L.sldComLanguage)("\u5546\u54c1\u5df2\u53d1\u51fa,\u7b49\u5f85\u4e70\u5bb6\u6536\u8d27"))),1==a.isVirtualGoods&&C.default.createElement("div",{className:T.default.btnsty},C.default.createElement("div",{onClick:function(){return e.agreeReturn("flow")},className:T.default.cancle_btn},(0,L.sldComLanguage)("\u67e5\u770b\u7269\u6d41")))),40==a.orderState&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},"".concat((0,L.sldComLanguage)("\u4e70\u5bb6\u5df2\u786e\u8ba4\u6536\u8d27,\u8ba2\u5355\u5b8c\u6210"))),1==a.isVirtualGoods&&C.default.createElement("div",{className:T.default.btnsty},C.default.createElement("div",{onClick:function(){return e.agreeReturn("flow")},className:T.default.cancle_btn},(0,L.sldComLanguage)("\u67e5\u770b\u7269\u6d41")))),50==a.orderState&&C.default.createElement("div",{className:"".concat(T.default.state_part," ").concat(w.default.flex_column_start_center)},C.default.createElement("span",{className:T.default.title},a.orderStateValue)),(0,L.sldCommonTitle)("".concat((0,L.sldComLanguage)("\u8ba2\u5355\u4fe1\u606f")),"#333",5,15,15),C.default.createElement(E.default,{r_color:"#333",l_color:"#999",l_fontw:500,r_fontw:600,form:this.props.form,data:n}),1==a.isVirtualGoods&&C.default.createElement(C.Fragment,null,(0,L.sldCommonTitle)("".concat((0,L.sldComLanguage)("\u6536\u8d27\u4eba\u4fe1\u606f")),"#333",5,15,15),C.default.createElement(E.default,{r_color:"#333",l_color:"#999",l_fontw:500,r_fontw:600,form:this.props.form,data:l})),2==a.isVirtualGoods&&a.orderReserveList.length>0&&C.default.createElement(C.Fragment,null,(0,L.sldCommonTitle)("".concat((0,L.sldComLanguage)("\u7528\u6237\u9884\u7559\u4fe1\u606f")),"#333",5,15,15),C.default.createElement(E.default,{r_color:"#333",l_color:"#999",l_fontw:500,r_fontw:600,form:this.props.form,data:x})),(0,L.sldCommonTitle)("".concat((0,L.sldComLanguage)("\u53d1\u7968\u4fe1\u606f")),"#333",5,15,15),C.default.createElement(E.default,{r_color:"#333",l_color:"#999",l_fontw:500,r_fontw:600,form:this.props.form,data:o}),void 0!=a.orderOperateList&&void 0!=a.orderOperateList.length&&a.orderOperateList.length>0&&C.default.createElement(C.Fragment,null,(0,L.sldCommonTitle)("".concat((0,L.sldComLanguage)("\u66f4\u591a\u64cd\u4f5c\u65e5\u5fd7")),"#333",5,15,15),C.default.createElement(V.default,{selectedRows:[],data:{list:a.orderOperateList,pagination:{}},size:"small",rowKey:"logId",isCheck:!1,columns:this.columns_order_log,sldpagination:!1})),(0,L.sldCommonTitle)("".concat((0,L.sldComLanguage)("\u5546\u54c1\u4fe1\u606f")),"#333",5,15,15),C.default.createElement(V.default,{selectedRows:[],data:{list:a.orderProductList,pagination:{}},size:"small",rowKey:"orderProductId",isCheck:!1,columns:this.columns_order_goods,sldpagination:!1}),C.default.createElement("div",{className:"".concat(w.default.flex_row_end_center," ").concat(T.default.order_detail_total)},C.default.createElement("span",{className:T.default.amount_detail},(0,L.sldComLanguage)("\u5546\u54c1\u603b\u91d1\u989d"),"(",(0,L.sldComLanguage)("\xa5"),a.goodsAmount,") + ",(0,L.sldComLanguage)("\u8fd0\u8d39"),"(",(0,L.sldComLanguage)("\xa5"),a.expressFee,")",void 0!=a.promotionInfo&&a.promotionInfo.length>0&&a.promotionInfo.map(function(e){return" - ".concat(e.promotionName,"(").concat((0,L.sldComLanguage)("\xa5")).concat(e.discount,")")})),C.default.createElement("span",{className:T.default.amount_total}," = ",(0,L.sldComLanguage)("\u8ba2\u5355\u91d1\u989d"),"(",(0,L.sldComLanguage)("\xa5"),a.orderAmount,")")),(0,L.getSldEmptyH)(40)),C.default.createElement(S.default,{title:c,submiting:i,show_foot:s,width:d,modalVisible:g,sldHandleConfirm:function(t){return e.sldHandleConfirm(t)},sldHandleCancle:this.sldHandleCancle,formItemLayoutModal:L.formItemLayoutModal,content:u,showTopTip:m}),C.default.createElement(S.default,{title:f,submiting:_,width:500,modalVisible:p,sldHandleConfirm:function(t){return e.sldHandleSecondConfirm(t)},sldHandleCancle:this.sldHandleSecondCancle,formItemLayoutModal:L.formItemLayoutModal,content:h}))}}]),t}(C.Component),h=x))||h)||h);t.default=k}}]);