(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[94],{"8tfQ":function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var o=n(a("W9HT")),r=n(a("eHn4")),d=n(a("p0pE")),i=n(a("2Taf")),c=n(a("vZ4D")),s=n(a("l4Ni")),u=n(a("ujKo")),g=n(a("MhPg"));a("y8nQ");var m,p,f,h,_=n(a("Vl3Y")),L=a("MuoO"),C=l(a("q1tI")),v=n(a("mOP9")),y=a("+n12"),b=n(a("hh8c")),S=n(a("CkN6")),w=n(a("Lv3o")),E=y.list_com_page_size_10,T=(m=(0,L.connect)(function(e){var t=e.promotion;return{promotion:t}}),p=_.default.create(),m(f=p((h=function(e){function t(e){var a;return(0,i.default)(this,t),a=(0,s.default)(this,(0,u.default)(t).call(this,e)),a.resize=function(){var e=a.state.search_height;void 0!=a.refs.search_part&&a.refs.search_part.clientHeight!=e&&a.setState({search_height:a.refs.search_part.clientHeight})},a.moreSearchToggle=function(){var e=a.state.search_height;void 0!=a.refs.search_part&&a.refs.search_part.clientHeight!=e&&a.setState({search_height:a.refs.search_part.clientHeight})},a.getSetting=function(){var e=a.props.dispatch;e({type:"common/getSetting",payload:{str:"ladder_group_is_enable"},callback:function(e){200==e.state&&a.setState({enableFlag:e.data[0].value,isFirstLoading:!1})}})},a.get_list=function(e){a.setState({initLoading:!0});var t=a.props.dispatch;t({type:"promotion/get_all_ladder_group_list",payload:(0,d.default)({},e),callback:function(t){a.setState({initLoading:!1}),200==t.state&&(0==t.data.length&&a.state.params.current>1?(e.current=e.current-1,a.get_list(e)):a.setState({data:t.data}))}})},a.handleSelectRows=function(e,t){a.setState({selectedRows:e,selectedRowKeys:t})},a.handleTablePagination=function(e,t,n){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"main",o=a.state.formValues;if("main"==l){var r=(0,y.sldHandlePaginationData)(e,t,n,o);E=r.pageSize,a.setState({params:r}),a.get_list(r)}},a.resizeTable=function(e,t,n,l){var o=(0,y.dragSldTableColumn)(e,t,l);a.setState((0,r.default)({},n,o))},a.search=function(e){var t=(0,d.default)({},e);for(var n in t.search_activity_time&&(t.startTime=t.search_activity_time[0]?t.search_activity_time[0].format(y.dateFormat)+" 00:00:00":"",t.endTime=t.search_activity_time[1]?t.search_activity_time[1].format(y.dateFormat)+" 23:59:59":"",delete t.search_activity_time),t)""==t[n]&&delete t[n];a.setState({formValues:t,params:{pageSize:E}}),a.get_list((0,d.default)({pageSize:E},t))},a.seaReset=function(){a.setState({formValues:{},params:{pageSize:E}}),a.get_list({pageSize:E})},a.operate=function(e,t){var n=a.state.params,l=a.props.dispatch,o={},r="";"invalid"==t?(r="promotion/invalid_ladder_group",o.groupId=e):"copy"==t?(r="promotion/copy_ladder_group",o.groupId=e):"del"==t?(r="promotion/del_ladder_group",o.groupId=e):"publish"==t&&(r="promotion/publish_ladder_group",o.groupId=e),a.setState({submiting:!0}),l({type:r,payload:o,callback:function(e){200==e.state?((0,y.sucTip)(e.msg),a.get_list(n),a.setState({modalVisible:!1})):(0,y.failTip)(e.msg),a.setState({submiting:!1})}})},a.state={search_height:0,isFirstLoading:!0,enableFlag:0,initLoading:!1,data:{},selectedRows:[],selectedRowKeys:[],title:"",type:"add",params:{pageSize:E},search_data:[{type:"input",label:"".concat((0,y.sldComLanguage)("\u6d3b\u52a8\u540d\u79f0")),name:"groupName",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u8f93\u5165\u6d3b\u52a8\u540d\u79f0"))},{type:"input",label:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u540d\u79f0")),name:"goodsName",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u8f93\u5165\u5546\u54c1\u540d\u79f0"))},{type:"rangepicker",label:"".concat((0,y.sldComLanguage)("\u6d3b\u52a8\u65f6\u95f4")),name:"search_activity_time",placeholder1:"".concat((0,y.sldComLanguage)("\u5f00\u59cb\u65f6\u95f4")),placeholder2:"".concat((0,y.sldComLanguage)("\u7ed3\u675f\u65f6\u95f4"))},{type:"select",label:"".concat((0,y.sldComLanguage)("\u6d3b\u52a8\u72b6\u6001")),name:"state",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u9009\u62e9\u6d3b\u52a8\u72b6\u6001")),sel_data:[{key:"",name:"".concat((0,y.sldComLanguage)("\u5168\u90e8"))},{key:"1",name:"".concat((0,y.sldComLanguage)("\u5f85\u53d1\u5e03"))},{key:"2",name:"".concat((0,y.sldComLanguage)("\u672a\u5f00\u59cb"))},{key:"3",name:"".concat((0,y.sldComLanguage)("\u8fdb\u884c\u4e2d"))},{key:"4",name:"".concat((0,y.sldComLanguage)("\u5df2\u5931\u6548"))},{key:"5",name:"".concat((0,y.sldComLanguage)("\u5df2\u7ed3\u675f"))}]}],formValues:{},columns:[{title:" ",dataIndex:"groupId",align:"center",width:30,render:function(e,t,n){return(0,y.getTableNum)(a.state.params,E,n)}},{title:"".concat((0,y.sldComLanguage)("\u6d3b\u52a8\u540d\u79f0")),dataIndex:"groupName",align:"center",width:100},{title:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u540d\u79f0")),dataIndex:"goodsName",align:"center",width:100},{title:"".concat((0,y.sldComLanguage)("\u6d3b\u52a8\u65f6\u95f4")),dataIndex:"startTime",align:"center",width:100,render:function(e,t){return C.default.createElement("div",{className:b.default.voucher_time_wrap},C.default.createElement("p",null,e),C.default.createElement("p",null,"~"),C.default.createElement("p",null,t.endTime))}},{title:"".concat((0,y.sldComLanguage)("\u6d3b\u52a8\u72b6\u6001")),dataIndex:"stateValue",align:"center",width:100},{title:"".concat((0,y.sldComLanguage)("\u64cd\u4f5c")),align:"center",width:100,render:function(e,t){return C.default.createElement(C.Fragment,null,C.default.createElement(v.default,{to:{pathname:"/marketing/ladder_group_to_view",query:{id:t.groupId,tar:"view"}}},(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u67e5\u770b\u8be6\u60c5")),function(){return null})),C.default.createElement("span",{className:b.default.splitLine}),C.default.createElement(v.default,{to:{pathname:"/marketing/ladder_group_to_add",query:{id:t.groupId,type:"copy"}}},(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u590d\u5236")),function(){return null})),1==t.state&&C.default.createElement(C.Fragment,null,C.default.createElement(v.default,{to:{pathname:"/marketing/ladder_group_to_add",query:{id:t.groupId,type:"edit"}}},(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u7f16\u8f91")),function(){return null}))),(3==t.state||4==t.state||5==t.state)&&C.default.createElement(C.Fragment,null,C.default.createElement(v.default,{to:{pathname:"/marketing/ladder_group_team_list",query:{id:t.groupId}}},(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u67e5\u770b\u56e2\u961f")),function(){return null}))),1==t.state&&C.default.createElement(C.Fragment,null,(0,y.sldPopConfirmDiy)("leftBottom","".concat((0,y.sldComLanguage)("\u53d1\u5e03\u540e\u4e0d\u53ef\u64a4\u9500\uff0c\u662f\u5426\u786e\u5b9a\u53d1\u5e03\uff1f")),function(){return a.operate(t.groupId,"publish")},"".concat((0,y.sldComLanguage)("\u786e\u5b9a")),"".concat((0,y.sldComLanguage)("\u53d6\u6d88")),(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u53d1\u5e03")),function(){return null}))),(2==t.state||3==t.state)&&C.default.createElement(C.Fragment,null,(0,y.sldPopConfirmDiy)("leftBottom","".concat((0,y.sldComLanguage)("\u5931\u6548\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u662f\u5426\u786e\u5b9a\u5931\u6548\uff1f")),function(){return a.operate(t.groupId,"invalid")},"".concat((0,y.sldComLanguage)("\u786e\u5b9a")),"".concat((0,y.sldComLanguage)("\u53d6\u6d88")),(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u5931\u6548")),function(){return null}))),(1==t.state||4==t.state||5==t.state)&&C.default.createElement(C.Fragment,null,(0,y.sldPopConfirmDiy)("leftBottom","".concat((0,y.sldComLanguage)("\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u662f\u5426\u786e\u5b9a\u5220\u9664\uff1f")),function(){return a.operate(t.groupId,"del")},"".concat((0,y.sldComLanguage)("\u786e\u5b9a")),"".concat((0,y.sldComLanguage)("\u53d6\u6d88")),(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u5220\u9664")),function(){return null}))))}}]},a}return(0,g.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value:function(){this.get_list({pageSize:E}),this.getSetting(),this.resize(),window.addEventListener("resize",this.resize,{passive:!0})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resize)}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRows,n=t.search_data,l=t.columns,r=t.initLoading,d=t.data,i=t.isFirstLoading,c=t.enableFlag,s=t.search_height;return C.default.createElement("div",{className:b.default.common_page,style:{flex:1,paddingTop:0}},(0,y.getSldEmptyH)(10),(0,y.sldLlineRtextAddGoodsAddMargin)("#FA6F1E","".concat((0,y.sldComLanguage)("\u9636\u68af\u56e2\u6d3b\u52a8")),0,0,10),C.default.createElement("div",{className:b.default.tableListForm,ref:"search_part"},C.default.createElement(w.default,{search_data:n,moreSearchToggle:function(){return e.moreSearchToggle()},seaSubmit:function(t){return e.search(t)},seaReset:function(){return e.seaReset()}})),C.default.createElement("div",{className:b.default.operate_bg},1==c||i?C.default.createElement(v.default,{to:{pathname:"/marketing/ladder_group_to_add"}},(0,y.sldIconBtn)(function(){return null},"".concat((0,y.sldComLanguage)("\u65b0\u5efa\u9636\u68af\u56e2")),7,0,12,12,3,"fabu1","#08A9B7")):C.default.createElement(v.default,{to:{}},(0,y.sldIconBtnNo)(function(){return null},"".concat((0,y.sldComLanguage)("\u65b0\u5efa\u9636\u68af\u56e2")),7,0,12,12,3,"fabu1","#08A9B7","".concat((0,y.sldComLanguage)("\u9636\u68af\u56e2\u6d3b\u52a8\u672a\u5f00\u542f"))))),C.default.createElement(o.default,{spinning:r},C.default.createElement(S.default,{totalHeight:document.body.clientHeight-165-s,bordered:!1,selectedRows:a,data:d,rowKey:"groupId",isCheck:!1,columns:l,onSelectRow:this.handleSelectRows,onChange:function(t,a,n){return e.handleTablePagination(t,a,n,"main")},onSldHandleSeleRow:this.onSldHandleSeleRow,resizeTable:function(t,a){return e.resizeTable(t,a,"columns",l)},isColumnResize:!0})))}}]),t}(C.Component),f=h))||f)||f);t.default=T}}]);