(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{Mdp1:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var d=n(a("W9HT"));a("7Kak");var r=n(a("9yH6")),c=n(a("p0pE")),o=n(a("2Taf")),u=n(a("vZ4D")),s=n(a("l4Ni")),i=n(a("ujKo")),f=n(a("rlhR")),m=n(a("MhPg"));a("y8nQ");var g,p,h,v,_=n(a("Vl3Y")),y=a("MuoO"),T=l(a("q1tI")),E=a("+n12"),C=a("wGLq"),N=n(a("hh8c")),b=n(a("t46H")),w=n(a("CHyz")),S=n(a("c1uR")),D=n(a("TPim")),L=n(a("zNm5")),A=n(a("dBb5")),x=n(a("7tf/")),P=n(a("6y1p")),R=n(a("6WWT"));P.default.plugins.push(R.default);var k=(0,C.statTradeBarColor)(),M=(g=(0,y.connect)(function(e){var t=e.common;return{common:t}}),p=_.default.create(),g(h=p((v=function(e){function t(e){var a;return(0,o.default)(this,t),a=(0,s.default)(this,(0,i.default)(t).call(this,e)),a.getOrderChangeTrendData=function(){a.setState({orderChangeTrendLoading:!0});var e=a.props.dispatch,t=a.state,n=t.orderChangeTrendData,l=t.orderChangeTrendParams,d=(0,c.default)({},l);e({type:"statistics/get_order_change_trend",payload:d,callback:function(e){if(a.setState({orderChangeTrendLoading:!1}),200==e.state){if(n=[],e.data.orderPayNumList.length>0)for(var t in e.data.orderPayNumList)n.push({month:e.data.orderPayNumList[t].statsTime,city:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u8ba2\u5355\u6570")),temperature:e.data.orderPayNumList[t].orderPayNum}),n.push({month:e.data.orderPayNumList[t].statsTime,city:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u6570")),temperature:e.data.orderSubmitNumList[t].orderSubmitNum});a.setState({orderChangeTrendData:n})}}})},a.getChangeTrendData=function(){a.setState({changeTrendLoading:!0});var e=a.props.dispatch,t=a.state.changeTrendAllData;e({type:"statistics/get_change_trend_data",callback:function(e){t=e.data,200==e.state&&(a.handleChangeTendTypeData(e.data),a.setState({changeTrendAllData:t}))}})},a.handleChangeTendTypeData=function(e){var t=a.state,n=t.curChangeTrendDataType,l=t.changeTrendDataBarColor,d=t.changeTrendDataFlag,r=t.unit,c=[],o=e;for(var u in l=k.two,d=2,o){var s=o[u].statsTime;"orderSubmitAmount"==n?(c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u91d1\u989d")),value:o[u].orderSubmitAmount}),c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u91d1\u989d")),value:o[u].orderPayAmount}),r="".concat((0,E.sldComLanguage)("\xa5"))):"orderSubmitNum"==n?(c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u6570")),value:o[u].orderSubmitNum}),c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u8ba2\u5355\u6570")),value:o[u].orderPayNum}),r=""):"orderSubmitAtv"==n?(c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u5ba2\u5355\u4ef7")),value:o[u].orderSubmitAtv}),c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u5ba2\u5355\u4ef7")),value:o[u].orderPayAtv}),r="".concat((0,E.sldComLanguage)("\xa5"))):"viewNum"==n?(c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u5e97\u94fa\u6d4f\u89c8\u91cf")),value:o[u].viewNum}),l=k.single,d=1,r=""):"pvPayRate"==n&&(c.push({key:s,name:"".concat((0,E.sldComLanguage)("\u6d4f\u89c8-\u4ed8\u6b3e\u8f6c\u5316\u7387")),value:o[u].pvPayRate}),l=k.single,d=1,r="")}a.setState({changeTrendData:c,changeTrendDataBarColor:l,changeTrendDataFlag:d,changeTrendLoading:!1,unit:r})},a.updateSelectDate=function(e,t){var n=a.state.orderChangeTrendParams,l=(0,f.default)(a);"_order_change_trend"==t&&(n=(0,c.default)({},n,e),a.setState({orderChangeTrendParams:n},function(){l.getOrderChangeTrendData()}))},a.handleChangeTrendType=function(e){var t=a.state.changeTrendAllData;a.setState({curChangeTrendDataType:e.target.value,changeTrendLoading:!0},function(){a.handleChangeTendTypeData(t)})},a.state={pvData:(0,C.statTradeOverViewData)(),changeTrendTypeData:(0,C.statTradeChangeTrendTypeData)(),changeTrendLoading:!1,orderChangeTrendLoading:!1,curChangeTrendDataType:"orderSubmitAmount",changeTrendData:[],orderChangeTrendData:[],changeTrendAllData:[],changeTrendDataBarColor:k.two,changeTrendDataFlag:2,orderChangeTrendParams:(0,C.statDateSearchParams)(),unit:"".concat((0,E.sldComLanguage)("\xa5"))},a}return(0,m.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){this.getChangeTrendData(),this.getOrderChangeTrendData()}},{key:"render",value:function(){var e=this,t=this.state,a=t.changeTrendLoading,n=t.changeTrendTypeData,l=t.curChangeTrendDataType,c=t.changeTrendData,o=t.changeTrendDataFlag,u=t.changeTrendDataBarColor,s=t.orderChangeTrendLoading,i=t.orderChangeTrendData,f=t.unit;return T.default.createElement(T.Fragment,null,T.default.createElement("div",{style:{backgroundColor:"#f0f2f5"},className:"".concat(N.default.flex_row_between_start)},T.default.createElement("div",{style:{marginTop:"10px",width:"100%",marginRight:0},className:"".concat(b.default.common_table_item)},T.default.createElement("div",{className:"".concat(b.default.label_panel," ").concat(N.default.flex_row_start_center)},(0,E.sldLlineRtextAddMargin)("#FA6F1E","".concat((0,E.sldComLanguage)("\u8fd130\u5929\u53d8\u5316\u8d8b\u52bf")),10,0,0)),T.default.createElement("div",{className:"".concat(b.default.change_trend_radio)},T.default.createElement("span",null,(0,E.sldComLanguage)("\u7b5b\u9009\u9879\uff1a")),T.default.createElement(r.default.Group,{options:n,onChange:this.handleChangeTrendType,defaultValue:l})),T.default.createElement(d.default,{spinning:a},T.default.createElement("div",{style:{height:400}},c.length>0&&2==o&&T.default.createElement(D.default,{data:c,color:u,flag:o,unit:f}),c.length>0&&1==o&&T.default.createElement(L.default,{data:c,color:u,flag:o}))))),T.default.createElement("div",{style:{flexWrap:"wrap",backgroundColor:"#f0f2f5",marginTop:10},className:"".concat(N.default.flex_row_between_start)},T.default.createElement(w.default,null),T.default.createElement("div",{className:"".concat(b.default.common_table_item),style:{marginTop:10}},T.default.createElement("div",{className:"".concat(b.default.label_panel," ").concat(N.default.flex_row_between_center)},T.default.createElement("div",{className:"".concat(N.default.flex_row_start_center)},(0,E.sldLlineRtextAddMargin)("#FA6F1E","".concat((0,E.sldComLanguage)("\u8ba2\u5355\u53d8\u5316\u8d8b\u52bf")),10,0,0)),T.default.createElement(x.default,{idIndex:"_order_change_trend",updateSelectDate:function(t){return e.updateSelectDate(t,"_order_change_trend")}})),T.default.createElement(d.default,{spinning:s},T.default.createElement("div",{className:"".concat(b.default.table_main)},i.length>0?T.default.createElement(A.default,{data:i}):(0,E.noDataPlaceholder)()))),T.default.createElement(S.default,null)))}}]),t}(T.Component),h=v))||h)||h);t.default=M},TPim:function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=l(a("2Taf")),r=l(a("vZ4D")),c=l(a("l4Ni")),o=l(a("ujKo")),u=l(a("MhPg")),s=n(a("q1tI")),i=l(a("hh8c")),f=a("yP6+"),m=l(a("QLqA")),g=function(e){function t(e){var a;return(0,d.default)(this,t),a=(0,c.default)(this,(0,o.default)(t).call(this,e)),a.initData=function(e){var t=m.default.DataView,n=new t;e.length>0?n.source(e).transform({type:"map",callback:function(e){return e["\u6708\u4efd"]=" "+e["key"],e["\u6708\u5747\u964d\u96e8\u91cf"]=e["value"],e}}):n="",a.setState({dv:n})},a.state={dv:"",data:e.data},a}return(0,u.default)(t,e),(0,r.default)(t,[{key:"componentDidMount",value:function(){this.initData(this.props.data)}},{key:"componentWillReceiveProps",value:function(e,t){var a=this;JSON.stringify(e.data)!=JSON.stringify(this.props.data)&&this.setState({data:JSON.parse(JSON.stringify(e.data))},function(){a.initData(e.data)})}},{key:"render",value:function(){var e=this.state.dv,t={day:{type:"cat"}},a=this.props,n=a.color,l=a.unit,d=void 0!=l&&l?l:"";return e&&s.default.createElement(f.Chart,{padding:[80,64,56,64],height:400,data:e,forceFit:!0,scale:t},s.default.createElement(f.Axis,{line:{stroke:"rgba(119, 119, 119, .8)"},name:"\u6708\u4efd"}),s.default.createElement(f.Axis,{line:{stroke:"rgba(119, 119, 119, .5)"},name:"\u6708\u5747\u964d\u96e8\u91cf"}),s.default.createElement(f.Legend,{position:"top",offsetY:-30,allowAllCanceled:!0}),s.default.createElement(f.Tooltip,{crosshairs:{type:"y"},htmlContent:function(e,t){return'<div class="g2_tooltip_custom" style=\'position:absolute;\'>\n<div class="g2-tooltip-title">'.concat(e," </div>\n<ul>\n").concat(t.map(function(e){return"<li className='".concat(i.default.flex_row_start_center,"'>\n                <i style=\"background-color: ").concat(e["point"]["color"].split("1:")[1],";\"></i>\n                <span style='margin-right: 5px;'>").concat(e.name,":</span>\n                ").concat(d).concat(e.value,"</li>")}).join(""),"\n</ul>\n</div>")}}),s.default.createElement(f.Geom,{type:"interval",position:"\u6708\u4efd*\u6708\u5747\u964d\u96e8\u91cf",color:n,adjust:[{type:"dodge",marginRatio:0}]}))}}]),t}(s.Component);t.default=g},XTRn:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABK0lEQVQ4T6XT2SvFQRjG8Q+ylSwRFyRStoSS8PdbSsoFN7Y6KEsRspTsvTVT069zLk6mfhe/eWe+887zPNPin6Olzv5WjGAI3Yg173jENb7KPVVAL+bQ1aCx2HyCu1wvAX1YRHTwgws84BdRm0B7+g/IbUAyoA2r6EzkU9xgFFG7Qg+WUj0O2IurZcAYpoq2tzGA+TR3njpaLw6JDo4zIMj9BeAVHemL6egoBNwo5j6xkwEludTvG0e4xzgmK+JuZcBaA+XP0skzydqqOZsZsIDBOtbtJxGzeOWSyMZuBgwn/5vJ5SVqZQ5WklUl5DB5P1shfyQbv0pApG+5sCn21NIVQsA8QtgDPJdBysWwbrqBHrHmJbzHW70ol11G6qqPKWL9VBWp3mtsRkh/33c4FtaRAKgAAAAASUVORK5CYII="},c1uR:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var d=n(a("W9HT"));a("5Dmo");var r=n(a("3S7+")),c=n(a("eHn4")),o=n(a("p0pE")),u=n(a("2Taf")),s=n(a("vZ4D")),i=n(a("l4Ni")),f=n(a("ujKo")),m=n(a("MhPg"));a("y8nQ");var g,p,h,v,_=n(a("Vl3Y")),y=a("MuoO"),T=l(a("q1tI")),E=a("+n12"),C=a("wGLq"),N=n(a("hh8c")),b=n(a("t46H")),w=n(a("CkN6")),S=n(a("7tf/")),D=E.list_com_page_size_10,L=(g=(0,y.connect)(function(e){var t=e.statistics;return{statistics:t}}),p=_.default.create(),g(h=p((v=function(e){function t(e){var a;return(0,u.default)(this,t),a=(0,i.default)(this,(0,f.default)(t).call(this,e)),a.get_list=function(e){a.setState({initLoading:!0});var t=a.props.dispatch;t({type:"statistics/get_trade_report_lists",payload:e,callback:function(e){a.setState({initLoading:!1}),200==e.state&&a.setState({data:e.data})}})},a.handleSelectRows=function(e,t){a.setState({selectedRows:e,selectedRowKeys:t})},a.handleTablePagination=function(e,t,n){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"main",d=a.state,r=d.formValues,c=d.params;if("main"==l){var u=(0,E.sldHandlePaginationDataStat)(e,t,n,r,2,D);D=c.pageSize,c=(0,o.default)({},c,u),a.setState({params:c}),a.get_list(c)}},a.resizeTable=function(e,t,n,l){var d=(0,E.dragSldTableColumn)(e,t,l);a.setState((0,c.default)({},n,d))},a.updateSelectDate=function(e,t){var n=a.state.params;n=(0,o.default)({},n,e,{current:1}),a.get_list(n),a.setState({params:n})},a.handleSldExcel=function(){var e=a.state.params,t=(0,o.default)({},e);t.fileName="".concat((0,E.sldComLanguage)("\u8ba2\u5355\u5bfc\u51fa"));var n=a.props.dispatch;a.setState({initLoading:!0}),n({type:"statistics/export_trade_report",payload:t,callback:function(e){void 0!=e.state&&255==e.state&&(0,E.failTip)(e.msg),a.setState({initLoading:!1})}})},a.state={selectedRows:[],data:{},params:(0,o.default)({},(0,C.statDateSearchParams)(),{pageSize:D}),columns:[{title:"".concat((0,E.sldComLanguage)("\u65f6\u95f4")),dataIndex:"statsTime",align:"center",sorter:!0,width:80,defaultSortOrder:"descend"},{title:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u6570")),dataIndex:"orderSubmitNum",align:"center",sorter:!0,width:100},{title:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u4eba\u6570")),dataIndex:"orderSubmitMemberNum",align:"center",sorter:!0,width:100},{title:"".concat((0,E.sldComLanguage)("\u4e0b\u5355\u91d1\u989d")),dataIndex:"orderSubmitAmount",align:"center",sorter:!0,width:100,render:function(e){return"\xa5".concat(e.toFixed(2))}},{title:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u8ba2\u5355\u6570")),dataIndex:"orderPayNum",align:"center",sorter:!0,width:100},{title:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u4eba\u6570")),dataIndex:"orderPayMemberNum",align:"center",sorter:!0,width:100},{title:"".concat((0,E.sldComLanguage)("\u652f\u4ed8\u91d1\u989d")),dataIndex:"orderPayAmount",align:"center",sorter:!0,width:100,render:function(e){return"\xa5".concat(e.toFixed(2))}},{title:T.default.createElement("div",{style:{position:"relative"}},T.default.createElement("span",{style:{marginRight:17}},(0,E.sldComLanguage)("\u652f\u4ed8\u8f6c\u5316\u7387")),T.default.createElement(r.default,{placement:"bottomLeft",title:"".concat((0,E.sldComLanguage)("\u4e0b\u5355-\u652f\u4ed8\u8f6c\u5316\u7387\uff1a\u7edf\u8ba1\u65f6\u95f4\u5185\uff0c\u652f\u4ed8\u4eba\u6570/\u4e0b\u5355\u4eba\u6570"))},T.default.createElement("div",{style:{right:0,top:2,position:"absolute"}},(0,E.sldSvgIcon)("#bfbbba",14,14,"wen")))),dataIndex:"submitPayRate",align:"center",sorter:!0,width:100,render:function(e){return"".concat(e||"--")}}]},a}return(0,m.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){this.get_list(this.state.params)}},{key:"render",value:function(){var e=this,t=this.state,a=t.columns,n=t.selectedRows,l=t.data,r=t.initLoading;return T.default.createElement("div",{className:"".concat(b.default.stat_common_table)},T.default.createElement("div",{style:{margin:"10px 0",paddingBottom:10,width:"100%"},className:"".concat(b.default.common_table_item)},T.default.createElement("div",{className:"".concat(b.default.label_panel," ").concat(N.default.flex_row_between_center)},(0,E.sldLlineRtextAddMargin)("#FA6F1E","".concat((0,E.sldComLanguage)("\u4ea4\u6613\u62a5\u8868")),10,0,0),(0,E.sldIconBtnBg)(function(){return e.handleSldExcel()},"ziyuan23","".concat((0,E.sldComLanguage)("\u5bfc\u51fa\u62a5\u8868")),"#fff",7,10,15,15,3)),T.default.createElement("div",{className:"".concat(N.default.flex_row_between_center),style:{margin:"10px 0 10px 10px"}},T.default.createElement(S.default,{idIndex:"_report_trade",updateSelectDate:function(t){return e.updateSelectDate(t,"_report_trade")}})),T.default.createElement(d.default,{spinning:r},T.default.createElement("div",{className:"".concat(b.default.stat_common_table),style:{paddingLeft:10}},T.default.createElement(w.default,{selectedRows:n,data:l,rowKey:"statsTime",isCheck:!1,columns:a,onSelectRow:this.handleSelectRows,onChange:function(t,a,n){return e.handleTablePagination(t,a,n,"main")},onSldHandleSeleRow:this.onSldHandleSeleRow,resizeTable:function(t,n){return e.resizeTable(t,n,"columns",a)},isColumnResize:!1,border:!1,showScrollbar:!1})))))}}]),t}(T.Component),h=v))||h)||h);t.default=L},lfbV:function(e,t,a){"use strict";var n=a("g09b"),l=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var d=n(a("W9HT"));a("5Dmo");var r=n(a("3S7+")),c=n(a("p0pE")),o=n(a("2Taf")),u=n(a("vZ4D")),s=n(a("l4Ni")),i=n(a("ujKo")),f=n(a("rlhR")),m=n(a("MhPg"));a("y8nQ");var g,p,h,v,_=n(a("Vl3Y")),y=a("MuoO"),T=l(a("q1tI")),E=a("+n12"),C=a("wGLq"),N=n(a("hh8c")),b=n(a("t46H")),w=n(a("Ug63")),S=n(a("7tf/")),D=n(a("Mdp1")),L=n(a("6y1p")),A=n(a("6WWT"));L.default.plugins.push(A.default);(0,C.statTradeBarColor)();var x=(g=(0,y.connect)(function(e){var t=e.common;return{common:t}}),p=_.default.create(),g(h=p((v=function(e){function t(e){var a;return(0,o.default)(this,t),a=(0,s.default)(this,(0,i.default)(t).call(this,e)),a.getTradeOverview=function(){var e=a.props.dispatch,t=a.state,n=t.pvData,l=t.tradeOverviewParams,d=t.chartsInfoData,r=(0,c.default)({},l);e({type:"statistics/get_analysis_trade_overview",payload:r,callback:function(e){200===e.state&&(d.pvPayRate=e.data.pvPayRate||"--",d.pvSubmitRate=e.data.pvSubmitRate||"--",d.submitPayRate=e.data.submitPayRate||"--",n.forEach(function(t,a){t.children.forEach(function(t,a){e.data[t.mapDifferentValue]&&0!=e.data[t.mapDifferentValue].indexOf("-")?(t["differenceNum"]="+"+e.data[t.mapDifferentValue],t.isUp=!0):(t["differenceNum"]=e.data[t.mapDifferentValue],t.isUp=!1),t["num"]=t.isMoney?parseFloat(e.data[t.mapValue]).toFixed(2):e.data[t.mapValue]})}),a.setState({pvData:n})),a.setState({loadedFlag:!0})}})},a.updateSelectDate=function(e,t){var n=a.state.tradeOverviewParams,l=(0,f.default)(a);"_trade_over_view"==t&&(n=(0,c.default)({},n,e),a.setState({tradeOverviewParams:n},function(){l.getTradeOverview()}))},a.state={overViewLoading:!1,loadedFlag:!1,pvData:(0,C.statTradeOverViewData)(),tradeOverviewParams:(0,C.statDateSearchParams)(),chartsInfoData:{}},a}return(0,m.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){this.getTradeOverview()}},{key:"render",value:function(){var e=this,t=this.state,n=t.loadedFlag,l=t.chartsInfoData,c=t.pvData,o=t.overViewLoading;return T.default.createElement("div",{className:"".concat(b.default.trade_stat," ").concat(b.default.stat_part),style:{flex:1,overflow:"auto"}},T.default.createElement(w.default,{autoHeight:!0,autoHeightMin:100,autoHeightMax:document.body.clientHeight-60},T.default.createElement("div",{className:"".concat(b.default.label_panel," ").concat(N.default.flex_row_start_center)},(0,E.sldLlineRtextAddMargin)("#FA6F1E","".concat((0,E.sldComLanguage)("\u4ea4\u6613\u603b\u89c8")),10,0,0)),(0,E.getSldHorLineBgColor)(1,"rgba(216, 216, 216, 0.5)"),T.default.createElement("div",{className:"".concat(b.default.change_trend_radio),style:{marginLeft:25,marginTop:15,marginBottom:15}},T.default.createElement(S.default,{idIndex:"_trade_over_view",updateSelectDate:function(t){return e.updateSelectDate(t,"_trade_over_view")}})),T.default.createElement(d.default,{spinning:o},T.default.createElement("div",{className:"".concat(b.default.preview_stat_panel)},T.default.createElement("div",{className:"".concat(b.default.charts_panel," ").concat(b.default.funnel)},T.default.createElement("div",{className:b.default.part},T.default.createElement("div",{className:N.default.flex_column_center_center},T.default.createElement("div",{className:b.default.center_item_top},T.default.createElement("div",{className:"".concat(b.default.top_content," ").concat(N.default.flex_row_center_center)},T.default.createElement("img",{className:b.default.funnel_center_img,src:a("7yVS"),alt:""}),T.default.createElement("span",{className:b.default.funnel_center_img_desc},(0,E.sldComLanguage)("\u8bbf\u95ee")))),T.default.createElement("div",{className:b.default.center_item_center},T.default.createElement("div",{className:"".concat(b.default.center_content," ").concat(N.default.flex_row_center_center)},T.default.createElement("img",{className:b.default.funnel_center_img,src:a("4yYT"),alt:""}),T.default.createElement("span",{className:b.default.funnel_center_img_desc},(0,E.sldComLanguage)("\u4e0b\u5355")))),T.default.createElement("div",{className:b.default.center_item_bottom},T.default.createElement("div",{className:"".concat(b.default.bottom_content," ").concat(N.default.flex_row_center_center)},T.default.createElement("img",{className:b.default.funnel_center_img,src:a("q8oB"),alt:""}),T.default.createElement("span",{className:b.default.funnel_center_img_desc},(0,E.sldComLanguage)("\u652f\u4ed8"))))),T.default.createElement("div",{className:b.default.left_top_line}),T.default.createElement("div",{className:b.default.left_bottom_line}),T.default.createElement("div",{className:b.default.right_line}),T.default.createElement("div",{className:b.default.left_top_content},T.default.createElement("p",{className:b.default.side_content_desc},(0,E.sldComLanguage)("\u8bbf\u95ee-\u4e0b\u5355\u8f6c\u5316\u7387")),T.default.createElement("p",{className:b.default.side_content_desc},l.pvSubmitRate||"--")),T.default.createElement("div",{className:b.default.left_bottom_content},T.default.createElement("p",{className:b.default.side_content_desc},(0,E.sldComLanguage)("\u4e0b\u5355-\u652f\u4ed8\u8f6c\u5316\u7387")),T.default.createElement("p",{className:b.default.side_content_desc},l.submitPayRate||"--")),T.default.createElement("div",{className:b.default.right_content},T.default.createElement("p",{className:b.default.side_content_desc},(0,E.sldComLanguage)("\u8bbf\u95ee-\u652f\u4ed8\u8f6c\u5316\u7387")),T.default.createElement("p",{className:b.default.side_content_desc},l.pvPayRate||"--")))),c.map(function(e,t){return T.default.createElement("div",{key:t,className:"".concat(b.default.stat_item)},T.default.createElement("ul",{className:"".concat(N.default.flex_row_start_center)},e.children.map(function(e,t){return T.default.createElement("li",{key:t},T.default.createElement("div",{className:"".concat(b.default.up_label," ").concat(N.default.flex_row_start_center)},T.default.createElement("span",null,e.label),T.default.createElement(r.default,{placement:"right",title:e.tip},T.default.createElement("img",{src:a("XTRn"),alt:""}))),T.default.createElement("div",{style:{marginLeft:e.isMoney?"-6px":""},className:"".concat(b.default.num)},n&&(e.num>1e4?(0,E.formatNum)(e.num,e.isMoney?2:0):T.default.createElement(L.default,{animation:{Children:{value:e.num,floatLength:e.isMoney?2:0,formatMoney:!0},duration:1e3}}))),T.default.createElement("div",{className:"".concat(b.default.down_difference)},T.default.createElement("span",{className:"".concat(b.default.label)},(0,E.sldComLanguage)("\u8f83\u4e0a\u671f")),e.differenceNum?T.default.createElement("span",{style:{color:e.isUp?"#52C41A":"#C41A1A"},className:"".concat(b.default.difference_num)},e.differenceNum,T.default.createElement("span",{className:"".concat(b.default.custom_svg_iconfont)},(0,E.sldSvgIcon)(e.isUp?"#52C41A":"#C41A1A",16,16,e.isUp?"shangsheng":"xiajiang"))):T.default.createElement("span",null,"--")))})))}))),T.default.createElement(D.default,null)))}}]),t}(T.Component),h=v))||h)||h);t.default=x}}]);