(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[64],{H3ny:function(e,a,t){"use strict";var n=t("g09b"),l=t("tAuX");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("T2oS");var d=n(t("W9HT"));t("BoS7");var s=n(t("Sdc0")),o=n(t("eHn4")),r=n(t("p0pE")),i=n(t("2Taf")),c=n(t("vZ4D")),u=n(t("l4Ni")),g=n(t("ujKo")),m=n(t("rlhR")),f=n(t("MhPg"));t("y8nQ");var p,C,h,L,_=n(t("Vl3Y")),y=t("MuoO"),v=l(t("q1tI")),b=t("+n12"),S=n(t("hh8c")),w=n(t("CkN6")),T=n(t("RTFr")),D=n(t("Lv3o")),I=n(t("zw2x")),V=b.list_com_page_size_10,R=(p=(0,y.connect)(function(e){var a=e.order,t=e.common;return{order:a,common:t}}),C=_.default.create(),p(h=C((L=function(e){function a(e){var t;return(0,i.default)(this,a),t=(0,u.default)(this,(0,g.default)(a).call(this,e)),t.cur_edit_id="",t.sel_area_name="",t.editAddress=function(e){var a=t.state,n=a.addData,l=a.operateData,d=a.addressType;for(var s in l=(0,b.getSldCopyData)(n),l)if("area"==l[s].name){var o=[],r=["provinceCode","cityCode","areaCode"];for(var i in r)void 0!=r[i]&&r[i]&&o.push(e[r[i]]);l[s].initialValue=o}else l[s].initialValue=e[l[s].name];t.cur_edit_id=e.addressId,t.sel_area_name=e.areaInfo,t.setState({type:"edit",title:"".concat((0,b.sldComLanguage)("\u7f16\u8f91")).concat(1==d?(0,b.sldComLanguage)("\u53d1\u8d27"):(0,b.sldComLanguage)("\u9000\u8d27")).concat((0,b.sldComLanguage)("\u5730\u5740")),operateData:l,modalVisible:!0})},t.operateAddress=function(e,a){var n=t.state,l=n.params,d=n.formValues,s=t.props.dispatch,o="",i={};"del"==a?(o="order/del_return_address",i.addressId=e):"edit"==a?(o="order/edit_return_address",i=e):"set_default"==a&&(o="order/set_return_address_default",i=e),s({type:o,payload:i,callback:function(e){200==e.state?((0,b.sucTip)(e.msg),t.sel_area_name="",t.get_list((0,r.default)({},l,d)),t.setState({modalVisible:!1})):(0,b.failTip)(e.msg),t.setState({submiting:!1})}})},t.addAddress=function(){var e=t.state,a=e.addData,n=e.operateData,l=e.addressType;n=(0,b.getSldCopyData)(a),t.setState({modalVisible:!0,type:"add",title:"".concat((0,b.sldComLanguage)("\u6dfb\u52a0")).concat(1==l?(0,b.sldComLanguage)("\u53d1\u8d27"):(0,b.sldComLanguage)("\u9000\u8d27")).concat((0,b.sldComLanguage)("\u5730\u5740")),operateData:n})},t.get_list=function(e){t.setState({initLoading:!0});var a=t.props.dispatch,n=t.state.addressType;a({type:"order/get_return_address_lists",payload:(0,r.default)({},e,{type:n}),callback:function(a){t.setState({initLoading:!1}),200==a.state&&((null==a.data.list||0==a.data.list.length)&&t.state.params.current>1?(e.current=e.current-1,t.get_list(e)):t.setState({data:a.data}))}})},t.handleSelectRows=function(e,a){t.setState({selectedRows:e,selectedRowKeys:a})},t.handleTablePagination=function(e,a,n){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"main",d=t.state.formValues;if("main"==l){var s=(0,b.sldHandlePaginationData)(e,a,n,d);V=s.pageSize,t.setState({params:s}),t.get_list(s)}},t.resizeTable=function(e,a,n,l){var d=(0,b.dragSldTableColumn)(e,a,l);t.setState((0,o.default)({},n,d))},t.getAreaInfo=function(e){for(var a in t.sel_area_name="",e)t.sel_area_name+=e[a].regionName},t.sldHandleCancle=function(){t.setState({modalVisible:!1})},t.sldHandleConfirm=function(e){var a=t.state,n=a.addressType,l=a.type,d=t.props.dispatch,s=(0,m.default)(t);e.area&&(e.provinceCode=void 0!=e.area[0]?e.area[0]:"",e.cityCode=void 0!=e.area[1]?e.area[1]:"",e.areaCode=void 0!=e.area[2]?e.area[2]:"",delete e.area),e.areaInfo=t.sel_area_name,e.isDefault=e.isDefault?1:0,t.setState({submiting:!0}),"edit"==l?(e.addressId=t.cur_edit_id,t.operateAddress(e,"edit")):(e.type=n,d({type:"order/add_return_address",payload:e,callback:function(e){200==e.state?((0,b.sucTip)(e.msg),t.sel_area_name="",s.get_list({pageSize:V}),t.setState({modalVisible:!1})):(0,b.failTip)(e.msg),t.setState({submiting:!1})}}))},t.sldSearChange=function(e){t.setState({search_con:e.target.value})},t.sldSearClear=function(){t.setState({search_con:""}),t.sldSearch("")},t.search=function(e){var a=(0,r.default)({},e);for(var n in a)""==a[n]&&delete a[n];t.setState({formValues:a,params:{pageSize:V}}),t.get_list((0,r.default)({pageSize:V},a))},t.seaReset=function(){t.setState({formValues:{},params:{pageSize:V}}),t.get_list({pageSize:V})},t.state={initLoading:!1,submiting:!1,data:{},selectedRows:[],selectedRowKeys:[],title:"",addressType:e.type,type:"add",params:{pageSize:V},upload_img_info:{},operateData:[],addData:[{type:"input",label:"".concat((0,b.sldComLanguage)("\u8054\u7cfb\u4eba")),name:"contactName",placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba")),extra:"".concat((0,b.sldComLanguage)("\u6700\u591a\u8f93\u51656\u4e2a\u5b57")),initialValue:"",maxLength:6,rules:[{required:!0,whitespace:!0,message:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba"))}]},{type:"input",label:"".concat((0,b.sldComLanguage)("\u624b\u673a\u53f7")),name:"telphone",placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7")),initialValue:"",rules:[{required:!0,message:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7"))},{pattern:b.mobile_reg,message:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7"))}]},{type:"cascader_common",label:1==e.type?"".concat((0,b.sldComLanguage)("\u53d1\u8d27\u5730\u5740")):"".concat((0,b.sldComLanguage)("\u9000\u8d27\u5730\u5740")),name:"area",data:I.default,fieldNames:{label:"regionName",value:"regionCode",children:"children"},placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u9009\u62e9")).concat(1==e.type?(0,b.sldComLanguage)("\u53d1\u8d27\u5730\u5740"):(0,b.sldComLanguage)("\u9000\u8d27\u5730\u5740")),initialValue:[],onChange:t.getAreaInfo,rules:[{required:!0,message:"".concat((0,b.sldComLanguage)("\u8bf7\u9009\u62e9")).concat(1==e.type?(0,b.sldComLanguage)("\u53d1\u8d27\u5730\u5740"):(0,b.sldComLanguage)("\u9000\u8d27\u5730\u5740"))}]},{type:"textarea",label:"".concat((0,b.sldComLanguage)("\u8be6\u7ec6\u5730\u5740")),name:"address",placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u8be6\u7ec6\u5730\u5740")),extra:"".concat((0,b.sldComLanguage)("\u6700\u591a40\u4e2a\u5b57")),initialValue:"",maxLength:40,rules:[{required:!0,whitespace:!0,message:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u8be6\u7ec6\u5730\u5740"))}]},{type:"switch",label:"".concat((0,b.sldComLanguage)("\u8bbe\u4e3a\u9ed8\u8ba4\u5730\u5740")),name:"isDefault",placeholder:"",initialValue:1}],formValues:{},columns:[{title:" ",dataIndex:"addressId",align:"center",width:55,render:function(e,a,n){return(0,b.getTableNum)(t.state.params,V,n)}},{title:"".concat((0,b.sldComLanguage)("\u8054\u7cfb\u4eba")),dataIndex:"contactName",align:"center",width:100},{title:"".concat((0,b.sldComLanguage)("\u624b\u673a\u53f7")),dataIndex:"telphone",align:"center",width:150},{title:1==e.type?"".concat((0,b.sldComLanguage)("\u53d1\u8d27\u5730\u5740")):"".concat((0,b.sldComLanguage)("\u9000\u8d27\u5730\u5740")),dataIndex:"address",align:"center",width:200},{title:"".concat((0,b.sldComLanguage)("\u8bbe\u4e3a\u9ed8\u8ba4")),dataIndex:"isDefault",align:"center",width:80,render:function(e,a){return v.default.createElement(s.default,{onChange:function(e){return t.operateAddress({addressId:a.addressId,isDefault:e?1:0},"set_default")},checked:1==e,valuepropname:"checked"})}},{title:"".concat((0,b.sldComLanguage)("\u64cd\u4f5c")),width:100,align:"center",render:function(e,a){return v.default.createElement(v.Fragment,null,(0,b.sldtbaleOpeBtnText)("".concat((0,b.sldComLanguage)("\u7f16\u8f91")),function(){return t.editAddress(a)}),v.default.createElement("span",{className:S.default.splitLine}),(0,b.sldPopConfirmDiy)("leftBottom","".concat((0,b.sldComLanguage)("\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u662f\u5426\u786e\u5b9a\u5220\u9664")),function(){return t.operateAddress(a.addressId,"del")},"".concat((0,b.sldComLanguage)("\u786e\u5b9a")),"".concat((0,b.sldComLanguage)("\u53d6\u6d88")),(0,b.sldtbaleOpeBtnText)("".concat((0,b.sldComLanguage)("\u5220\u9664")),function(){return null})))}}],search_data:[{type:"input",label:"".concat((0,b.sldComLanguage)("\u8054\u7cfb\u4eba")),name:"contactName",placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba"))},{type:"input",label:"".concat((0,b.sldComLanguage)("\u624b\u673a\u53f7")),name:"telphone",placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7"))}]},t}return(0,f.default)(a,e),(0,c.default)(a,[{key:"componentDidMount",value:function(){this.get_list({pageSize:V})}},{key:"render",value:function(){var e=this,a=this.state,t=a.selectedRows,n=a.search_data,l=a.columns,s=a.initLoading,o=a.data,r=a.submiting,i=a.operateData,c=a.modalVisible,u=a.title,g=a.addressType;return v.default.createElement("div",{className:S.default.common_page,style:{flex:1,padding:0}},(0,b.showMoreHelpTip)("",["".concat((0,b.sldComLanguage)("\u53d1\u8d27\u5730\u5740\u53d6\u4e0b\u9762\u7684\u9ed8\u8ba4\u5730\u5740"))]),v.default.createElement("div",{className:S.default.tableListForm},v.default.createElement(D.default,{search_data:n,seaSubmit:function(a){return e.search(a)},seaReset:function(){return e.seaReset()}})),v.default.createElement("div",{className:S.default.operate_bg},(0,b.sldIconBtn)(function(){return e.addAddress()},"".concat((0,b.sldComLanguage)("\u6dfb\u52a0")).concat(1==g?(0,b.sldComLanguage)("\u53d1\u8d27"):(0,b.sldComLanguage)("\u9000\u8d27")).concat((0,b.sldComLanguage)("\u5730\u5740")),7,7)),v.default.createElement(d.default,{spinning:s},v.default.createElement(w.default,{selectedRows:t,data:o,rowKey:"addressId",isCheck:!1,columns:l,onSelectRow:this.handleSelectRows,onChange:function(a,t,n){return e.handleTablePagination(a,t,n,"main")},onSldHandleSeleRow:this.onSldHandleSeleRow,resizeTable:function(a,t){return e.resizeTable(a,t,"columns",l)},isColumnResize:!0})),v.default.createElement(T.default,{title:u,submiting:r,width:500,modalVisible:c,sldHandleConfirm:function(a){return e.sldHandleConfirm(a)},sldHandleCancle:this.sldHandleCancle,formItemLayoutModal:b.formItemLayoutModal,content:i}))}}]),a}(v.Component),h=L))||h)||h);a.default=R},LRlz:function(e,a,t){"use strict";var n=t("g09b"),l=t("tAuX");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var d=n(t("2Taf")),s=n(t("vZ4D")),o=n(t("l4Ni")),r=n(t("ujKo")),i=n(t("MhPg"));t("y8nQ");var c,u,g,m=n(t("Vl3Y")),f=t("MuoO"),p=l(t("q1tI")),C=t("+n12"),h=n(t("hh8c")),L=n(t("H3ny")),_=(c=(0,f.connect)(function(e){var a=e.order;return{order:a}}),u=m.default.create(),c(g=u(g=function(e){function a(e){var t;return(0,d.default)(this,a),t=(0,o.default)(this,(0,r.default)(a).call(this,e)),t.state={},t}return(0,i.default)(a,e),(0,s.default)(a,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return p.default.createElement("div",{className:h.default.common_page},(0,C.sldLlineRtextAddGoodsAddMargin)("#69A2F2","".concat((0,C.sldComLanguage)("\u5730\u5740\u7ba1\u7406")),0,0,10),p.default.createElement(L.default,{type:2}))}}]),a}(p.Component))||g)||g);a.default=_}}]);