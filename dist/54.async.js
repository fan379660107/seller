(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[54],{DO7h:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var o=n(a("kLXV")),i=n(a("jehZ"));a("5NDa");var d=n(a("5rEg"));a("+L6B");var s=n(a("2/Rp"));a("T2oS");var c=n(a("W9HT")),u=n(a("eHn4")),r=n(a("p0pE")),m=n(a("2Taf")),g=n(a("vZ4D")),f=n(a("l4Ni")),p=n(a("ujKo")),h=n(a("rlhR")),b=n(a("MhPg"));a("y8nQ");var C,v,_,L,w=n(a("Vl3Y")),S=a("MuoO"),y=l(a("q1tI")),k=a("+n12"),D=n(a("hh8c")),E=n(a("na50")),T=n(a("CkN6")),I=n(a("Lv3o")),N=k.list_com_page_size_10,R=w.default.Item,M=(C=(0,S.connect)(function(e){var t=e.promotion,a=e.common;return{promotion:t,common:a}}),v=w.default.create(),C(_=v((L=function(e){function t(e){var a;return(0,m.default)(this,t),a=(0,f.default)(this,(0,p.default)(t).call(this,e)),a.cur_edit_id="",a.sel_area_name="",a.operate=function(e,t){var n=a.state.params,l=a.props.dispatch,o="",i={};"del"==t&&(o="promotion/del_video_member",i.bindId=e),l({type:o,payload:i,callback:function(e){200==e.state?((0,k.sucTip)(e.msg),a.get_list(n)):(0,k.failTip)(e.msg)}})},a.add=function(){var e=a.state,t=e.addData,n=e.operateData;n=JSON.parse(JSON.stringify(t)),a.setState({modalVisible:!0,type:"add",title:"".concat((0,k.sldComLanguage)("\u7ed1\u5b9a\u4f1a\u5458")),operateData:n})},a.get_list=function(e){a.setState({initLoading:!0});var t=a.props.dispatch;t({type:"promotion/get_video_member_list",payload:(0,r.default)({},e),callback:function(t){a.setState({initLoading:!1}),200==t.state&&((null==t.data.list||0==t.data.list.length)&&a.state.params.current>1?(e.current=e.current-1,a.get_list(e)):a.setState({data:t.data}))}})},a.handleSelectRows=function(e,t){a.setState({selectedRows:e,selectedRowKeys:t})},a.handleTablePagination=function(e,t,n){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"main",o=a.state.formValues;if("main"==l){var i=(0,k.sldHandlePaginationData)(e,t,n,o);N=i.pageSize,a.setState({params:i}),a.get_list(i)}},a.resizeTable=function(e,t,n,l){var o=(0,k.dragSldTableColumn)(e,t,l);a.setState((0,u.default)({},n,o))},a.countDown=function(){var e=a.state.countDownM;e-=1;var t=(0,h.default)(a);a.setState({countDownM:e},function(){e<=0?clearTimeout(t.timeOutId):t.timeOutId=setTimeout(function(){return t.countDown()},1e3)})},a.checkSmsCode=function(e,t,a){t&&(t.length<6||!/^[0-9]+$/.test(t))?a("".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u77ed\u4fe1\u9a8c\u8bc1\u7801"))):a()},a.sldConfirm=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){if(!e){var n=a.props.dispatch;a.setState({submiting:!0}),n({type:"promotion/bind_video_member",payload:t,callback:function(e){200==e.state?((0,k.sucTip)(e.msg),a.get_list({pageSize:N}),a.setState({modalVisible:!1})):(0,k.failTip)(e.msg),a.setState({submiting:!1})}})}})},a.sldCancle=function(){a.setState({modalVisible:!1})},a.search=function(e){var t=(0,r.default)({},e);for(var n in t)""==t[n]&&delete t[n];a.setState({formValues:t,params:{pageSize:N}}),a.get_list((0,r.default)({pageSize:N},t))},a.seaReset=function(){a.setState({formValues:{},params:{pageSize:N}}),a.get_list({pageSize:N})},(0,h.default)(a),a.state={countDownM:0,initLoading:!1,submiting:!1,data:{},selectedRows:[],selectedRowKeys:[],title:"",type:"add",params:{pageSize:N},upload_img_info:{},operateData:[],search_data:[{type:"input",label:"".concat((0,k.sldComLanguage)("\u4f1a\u5458\u540d\u79f0")),name:"memberName",placeholder:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u4f1a\u5458\u540d\u79f0"))},{type:"input",label:"".concat((0,k.sldComLanguage)("\u4f1a\u5458\u6635\u79f0")),name:"memberNickName",placeholder:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u4f1a\u5458\u6635\u79f0"))},{type:"input",label:"".concat((0,k.sldComLanguage)("\u624b\u673a\u53f7")),name:"memberMobile",placeholder:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u4f1a\u5458\u624b\u673a\u53f7"))}],addData:[{type:"input",label:"".concat((0,k.sldComLanguage)("\u624b\u673a\u53f7")),name:"memberMobile",placeholder:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7")),initialValue:"",rules:[{required:!0,message:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7"))},{pattern:k.mobile_reg,message:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7"))}]}],formValues:{},columns:[{title:" ",dataIndex:"bindId",align:"center",width:55,render:function(e,t,n){return(0,k.getTableNum)(a.state.params,N,n)}},{title:"".concat((0,k.sldComLanguage)("\u4f1a\u5458\u540d\u79f0")),dataIndex:"memberName",align:"center",width:100},{title:"".concat((0,k.sldComLanguage)("\u6635\u79f0")),dataIndex:"memberNickName",align:"center",width:100},{title:"".concat((0,k.sldComLanguage)("\u624b\u673a\u53f7")),dataIndex:"memberMobile",align:"center",width:100},{title:"".concat((0,k.sldComLanguage)("\u4f1a\u5458\u72b6\u6001")),dataIndex:"memberStateValue",align:"center",width:100},{title:"".concat((0,k.sldComLanguage)("\u77ed\u89c6\u9891\u72b6\u6001")),dataIndex:"svideoStateValue",align:"center",width:100},{title:"".concat((0,k.sldComLanguage)("\u76f4\u64ad\u72b6\u6001")),dataIndex:"liveStateValue",align:"center",width:100},{title:"".concat((0,k.sldComLanguage)("\u64cd\u4f5c")),width:100,align:"center",render:function(e,t){return y.default.createElement(y.Fragment,null,(0,k.sldPopConfirmDiy)("leftBottom","".concat((0,k.sldComLanguage)("\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u662f\u5426\u786e\u5b9a\u5220\u9664")),function(){return a.operate(t.bindId,"del")},"".concat((0,k.sldComLanguage)("\u786e\u5b9a")),"".concat((0,k.sldComLanguage)("\u53d6\u6d88")),(0,k.sldtbaleOpeBtnText)("".concat((0,k.sldComLanguage)("\u5220\u9664")),function(){return null})))}}]},a}return(0,b.default)(t,e),(0,g.default)(t,[{key:"componentDidMount",value:function(){this.get_list({pageSize:N})}},{key:"getSmsCode",value:function(){var e=this;if(!this.state.countDownM){var t=this.props.form.getFieldValue("mobile");if(void 0==t||void 0!=t&&!t)(0,k.failTip)("".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7")));else if((0,k.sldCheckMobile)(t)){var a=this.props.dispatch,n=this;a({type:"promotion/get_video_sms_code",payload:{mobile:t},callback:function(t){200==t.state?e.setState({countDownM:60},function(){n.countDown()}):(0,k.failTip)(t.msg)}})}else(0,k.failTip)("".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7")))}}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.state,n=a.selectedRows,l=a.columns,u=a.initLoading,r=a.data,m=a.submiting,g=a.modalVisible,f=a.countDownM,p=a.search_data;return y.default.createElement("div",{className:D.default.common_page,style:{flex:1}},(0,k.sldLlineRtextAddGoodsAddMargin)("#69A2F2","".concat((0,k.sldComLanguage)("\u89c6\u9891\u5e26\u8d27\u7ed1\u5b9a\u4f1a\u5458")),0,0,10),y.default.createElement("div",{className:D.default.tableListForm},y.default.createElement(I.default,{search_data:p,seaSubmit:function(t){return e.search(t)},seaReset:function(){return e.seaReset()}})),y.default.createElement("div",{className:D.default.operate_bg},(0,k.sldIconBtn)(function(){return e.add()},"".concat((0,k.sldComLanguage)("\u7ed1\u5b9a\u4f1a\u5458")),7,7)),y.default.createElement(c.default,{spinning:u},y.default.createElement(T.default,{totalHeight:document.body.clientHeight-200,selectedRows:n,data:r,rowKey:"bindId",isCheck:!1,columns:l,onSelectRow:this.handleSelectRows,onChange:function(t,a,n){return e.handleTablePagination(t,a,n,"main")},onSldHandleSeleRow:this.onSldHandleSeleRow,resizeTable:function(t,a){return e.resizeTable(t,a,"columns",l)},isColumnResize:!0})),y.default.createElement(o.default,{destroyOnClose:!0,maskClosable:!1,title:"".concat((0,k.sldComLanguage)("\u7ed1\u5b9a\u4f1a\u5458")),visible:g,width:450,onCancel:this.sldCancle,footer:[y.default.createElement(s.default,{key:"back",onClick:this.sldCancle},(0,k.sldComLanguage)("\u53d6\u6d88")),y.default.createElement(s.default,{key:"submit",type:"primary",loading:m,onClick:this.sldConfirm},(0,k.sldComLanguage)("\u786e\u5b9a"))]},y.default.createElement("div",{style:{width:450,marginBottom:30}},y.default.createElement(w.default,null,(0,k.getSldEmptyH)(30),y.default.createElement(R,(0,i.default)({},k.formItemLayoutModal,{label:"".concat((0,k.sldComLanguage)("\u624b\u673a\u53f7"))}),t("mobile",{rules:[{required:!0,message:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7"))},{pattern:k.mobile_reg,message:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7"))}]})(y.default.createElement(d.default,{style:{width:"100%"},maxLength:11,placeholder:(0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7"),allowClear:!0}))),y.default.createElement(R,(0,i.default)({},k.formItemLayoutModal,{label:"".concat((0,k.sldComLanguage)("\u77ed\u4fe1\u9a8c\u8bc1\u7801"))}),t("smsCode",{rules:[{required:!0,message:"".concat((0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u77ed\u4fe1\u9a8c\u8bc1\u7801"))},{validator:this.checkSmsCode}]})(y.default.createElement(d.default,{style:{width:"100%"},maxLength:6,placeholder:(0,k.sldComLanguage)("\u8bf7\u8f93\u5165\u77ed\u4fe1\u9a8c\u8bc1\u7801"),suffix:y.default.createElement("div",{className:"".concat(D.default.flex_row_between_center," ").concat(E.default.get_sms_code_wrap)},y.default.createElement("span",{className:"".concat(E.default.v_split)},"|"),y.default.createElement("span",{className:E.default.sms_code,style:{opacity:f>0?.3:1},onClick:function(){return e.getSmsCode()}},f?"".concat(f).concat((0,k.sldComLanguage)("s\u540e\u91cd\u65b0\u83b7\u53d6")):"".concat((0,k.sldComLanguage)("\u83b7\u53d6\u9a8c\u8bc1\u7801"))))})))))))}}]),t}(y.Component),_=L))||_)||_);t.default=M},na50:function(e,t,a){e.exports={get_sms_code_wrap:"antd-pro\\pages\\marketing\\video\\video-get_sms_code_wrap",v_split:"antd-pro\\pages\\marketing\\video\\video-v_split",sms_code:"antd-pro\\pages\\marketing\\video\\video-sms_code"}}}]);