(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[76],{"14Dl":function(e,t,a){"use strict";var n=a("g09b"),o=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var l=n(a("W9HT")),d=n(a("eHn4")),c=n(a("p0pE")),s=n(a("2Taf")),i=n(a("vZ4D")),r=n(a("l4Ni")),u=n(a("ujKo")),g=n(a("MhPg"));a("y8nQ");var m,f,p,h,_=n(a("Vl3Y")),C=a("MuoO"),L=o(a("q1tI")),w=n(a("mOP9")),y=a("+n12"),b=n(a("hh8c")),v=n(a("Yb6x")),S=n(a("CkN6")),I=n(a("Lv3o")),T=n(a("RTFr")),k=y.list_com_page_size_10,x=(m=(0,C.connect)(function(e){var t=e.product;return{product:t}}),f=_.default.create(),m(p=f((h=function(e){function t(e){var a;return(0,s.default)(this,t),a=(0,r.default)(this,(0,u.default)(t).call(this,e)),a.goods_spec_columns=[{title:" ",dataIndex:"productId",align:"center",width:30,render:function(e,t,a){return a+1}},{title:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u89c4\u683c")),dataIndex:"specValues",align:"center",width:200,render:function(e,t,a){return L.default.createElement("div",{style:{width:200,wordBreak:"normal",wordWrap:"break-word"}},e)}},{title:"".concat((0,y.sldComLanguage)("\u4ef7\u683c(\u5143)")),dataIndex:"productPrice",align:"center",width:110},{title:"".concat((0,y.sldComLanguage)("\u5e93\u5b58")),dataIndex:"productStock",align:"center",width:100,render:function(e,t,a){return L.default.createElement("span",{style:{color:t.warning?"#FF490A":"#696969",fontWeight:t.warning?"700":"500"}},e)}},{title:"".concat((0,y.sldComLanguage)("\u8d27\u53f7")),dataIndex:"productCode",align:"center",width:150,render:function(e){return e||"--"}},{title:"".concat((0,y.sldComLanguage)("\u6761\u5f62\u7801")),dataIndex:"barCode",align:"center",width:150,render:function(e){return e||"--"}}],a.resize=function(){var e=a.state.search_height;void 0!=a.refs.search_part&&a.refs.search_part.clientHeight!=e&&a.setState({search_height:a.refs.search_part.clientHeight})},a.getStoreCat=function(){var e=a.props.dispatch,t=a.state.search_data,n="product/get_store_category_list",o={pageSize:y.list_com_page_more};e({type:n,payload:o,callback:function(e){if(200==e.state){var n=t.filter(function(e){return"StoreCategoryId"==e.name})[0];for(var o in e.data)e.data[o].key=e.data[o].innerLabelId,e.data[o].value=e.data[o].innerLabelId,e.data[o].title=e.data[o].innerLabelName,null!=e.data[o].children&&e.data[o].children.length>0&&e.data[o].children.map(function(e){e.key=e.innerLabelId,e.value=e.innerLabelId,e.title=e.innerLabelName});n.data=e.data,a.setState({search_data:t})}}})},a.setTemplate=function(){var e=a.state.addData;a.setState({operateData:JSON.parse(JSON.stringify(e)),title:"".concat((0,y.sldComLanguage)("\u8bbe\u7f6e\u5173\u8054\u7248\u5f0f")),modal_width:500,modalVisible:!0,type:"template",show_foot:!0})},a.sldHandleConfirm=function(e){var t=a.state.selectedRowKeys;if(e.goodsIds=t.join(","),void 0==e.topTemplateId&&void 0==e.bottomTemplateId)return(0,y.failTip)("".concat((0,y.sldComLanguage)("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u6a21\u7248"))),!1;a.operateGoods(e,"template")},a.viewSpec=function(e){var t=a.state,n=t.view_spec_data,o=t.operateData;o=JSON.parse(JSON.stringify(n)),o[0].columns=a.goods_spec_columns,o[0].data=e.productList,a.setState({modalVisible:!0,show_foot:!1,title:"".concat((0,y.sldComLanguage)("\u67e5\u770b\u89c4\u683c")),modal_width:760,operateData:o})},a.operateGoods=function(e,t){a.setState({submiting:!0});var n=a.state.params,o=a.props.dispatch,l={},d="";"lockup"==t?(d="product/lockup_goods",l=e):"recommend"==t?(d="product/set_goods_recommend",l=e):"del"==t?(d="product/del_goods",l=e):"template"==t&&(d="product/set_related_template",l=e),o({type:d,payload:l,callback:function(e){a.setState({submiting:!1}),200==e.state?((0,y.sucTip)(e.msg),a.get_list(n),a.setState({selectedRows:[],selectedRowKeys:[],modalVisible:!1})):(0,y.failTip)(e.msg)}})},a.get_list=function(e){a.setState({initLoading:!0});var t=a.props.dispatch;t({type:"product/get_goods_lists",payload:(0,c.default)({},e,{state:2}),callback:function(t){a.setState({initLoading:!1}),200==t.state&&(0==t.data.length&&a.state.params.current>1?(e.current=e.current-1,a.get_list(e)):a.setState({data:t.data}))}})},a.getTemplateList=function(){var e=a.props.dispatch,t=a.state.addData;e({type:"product/get_related_template_lists",payload:{pageSize:y.list_com_page_more},callback:function(e){if(a.setState({initLoading:!1}),200==e.state){var n=e.data.list.filter(function(e){return 1==e.templatePosition}),o=e.data.list.filter(function(e){return 2==e.templatePosition});for(var l in t)"topTemplateId"==t[l].name?t[l].sel_data=n:t[l].sel_data=o;a.setState({addData:t})}}})},a.handleSelectRows=function(e,t){a.setState({selectedRows:e,selectedRowKeys:t})},a.handleTablePagination=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"main",l=a.state.formValues;if("main"==o){var d=(0,y.sldHandlePaginationData)(e,t,n,l);k=d.pageSize,a.setState({params:d}),a.get_list(d)}},a.resizeTable=function(e,t,n,o){var l=(0,y.dragSldTableColumn)(e,t,o);a.setState((0,d.default)({},n,l))},a.search=function(e){var t=(0,c.default)({},e);for(var n in t.search_create_time&&(t.startTime=t.search_create_time[0]?t.search_create_time[0].format(y.dateFormat)+" 00:00:00":"",t.endTime=t.search_create_time[1]?t.search_create_time[1].format(y.dateFormat)+" 23:59:59":"",t.search_create_time=""),t)""==t[n]&&delete t[n];a.setState({formValues:t,params:{pageSize:k}}),a.get_list((0,c.default)({pageSize:k},t))},a.seaReset=function(){a.setState({formValues:{},params:{pageSize:k}}),a.get_list({pageSize:k})},a.sldHandleCancle=function(){a.setState({modalVisible:!1})},a.moreSearchToggle=function(){var e=a.state.search_height;void 0!=a.refs.search_part&&a.refs.search_part.clientHeight!=e&&a.setState({search_height:a.refs.search_part.clientHeight})},a.state={search_height:0,modal_width:700,modalVisibleDetail:!1,initLoading:!1,submiting:!1,show_foot:!1,modalVisible:!1,data:{},selectedRows:[],selectedRowKeys:[],title:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u89c4\u683c")),type:"add",params:{pageSize:k},search_data:[{type:"input",label:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u540d\u79f0")),name:"goodsName",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u8f93\u5165\u5546\u54c1\u540d\u79f0"))},{type:"input",label:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u8d27\u53f7")),name:"goodsCode",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u8f93\u5165\u5546\u54c1\u8d27\u53f7"))},{type:"input",label:"".concat((0,y.sldComLanguage)("\u6761\u5f62\u7801")),name:"barCode",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u8f93\u5165\u5546\u54c1\u6761\u5f62\u7801"))},{type:"tree_select",label:"".concat((0,y.sldComLanguage)("\u5e97\u94fa\u5206\u7c7b")),name:"StoreCategoryId",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u9009\u62e9\u5e97\u94fa\u5206\u7c7b")),data:[]},{type:"select",label:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u7c7b\u578b")),name:"isVirtualGoods",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u9009\u62e9\u5546\u54c1\u7c7b\u578b")),sel_data:[{key:"",name:"".concat((0,y.sldComLanguage)("\u5168\u90e8"))},{key:1,name:"".concat((0,y.sldComLanguage)("\u5b9e\u7269\u5546\u54c1"))},{key:2,name:"".concat((0,y.sldComLanguage)("\u865a\u62df\u5546\u54c1"))}]},{type:"select",label:"".concat((0,y.sldComLanguage)("\u5ba1\u6838\u72b6\u6001")),name:"auditState",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u9009\u62e9\u4f1a\u5458\u72b6\u6001")),sel_data:[{key:"",name:"".concat((0,y.sldComLanguage)("\u5168\u90e8"))},{key:"2",name:"".concat((0,y.sldComLanguage)("\u5f85\u5ba1\u6838"))},{key:"4",name:"".concat((0,y.sldComLanguage)("\u5ba1\u6838\u62d2\u7edd"))}]}],view_spec_data:[{type:"scroll_table",name:"",label:"",width:740,content:"",data:[],columns:a.goods_spec_columns,rowKey:"productId"}],formValues:{},addData:[{type:"select",label:"".concat((0,y.sldComLanguage)("\u9876\u90e8\u7248\u5f0f")),name:"topTemplateId",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u9009\u62e9\u9876\u90e8\u5173\u8054\u7248\u5f0f")),sel_data:[],sele_key:"templateId",sele_name:"templateName",diy:!0},{type:"select",label:"".concat((0,y.sldComLanguage)("\u5e95\u90e8\u7248\u5f0f")),name:"bottomTemplateId",placeholder:"".concat((0,y.sldComLanguage)("\u8bf7\u9009\u62e9\u5e95\u90e8\u5173\u8054\u7248\u5f0f")),sel_data:[],sele_key:"templateId",sele_name:"templateName",diy:!0}],operateData:[],columns:[{title:" ",align:"center",width:30,render:function(e,t,n){return(0,y.getTableNum)(a.state.params,k,n)}},{title:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u4fe1\u606f")),dataIndex:"mainImage",align:"center",width:250,render:function(e,t){return L.default.createElement("div",{className:"".concat(v.default.goods_info," ").concat(b.default.com_flex_row_flex_start)},2==t.isVirtualGoods&&L.default.createElement("span",{className:"".concat(v.default.virtual_goods_flag)},"\u865a\u62df"),L.default.createElement("div",{className:v.default.goods_img},(0,y.getSldListGoodsImg80)(e)),L.default.createElement("div",{className:"".concat(b.default.com_flex_column_space_between," ").concat(v.default.goods_detail)},L.default.createElement("span",{className:v.default.goods_name},t.goodsName),L.default.createElement("span",{className:v.default.goods_brief},t.categoryPath)))}},{title:"".concat((0,y.sldComLanguage)("\u5e97\u94fa\u5206\u7c7b")),dataIndex:"innerLabelList",align:"center",width:150,render:function(e,t,a){return L.default.createElement("div",{className:"".concat(b.default.flex_column_center_center)},void 0!=e&&e.length>0?L.default.createElement(L.Fragment,null,e.map(function(e,t){return L.default.createElement("div",{key:t},(0,y.quillEscapeToHtml)((0,y.quillEscapeToHtml)(e)))})):"--")}},{title:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u4ef7\u683c")),dataIndex:"goodsPrice",align:"center",width:100},{title:"".concat((0,y.sldComLanguage)("\u5546\u54c1\u5e93\u5b58")),dataIndex:"goodsStock",align:"center",width:100,render:function(e,t,a){return L.default.createElement("span",{style:{color:t.warning?"#FF490A":"#696969",fontWeight:t.warning?"700":"500"}},e)}},{title:"".concat((0,y.sldComLanguage)("\u662f\u5426\u63a8\u8350")),dataIndex:"storeIsRecommend",align:"center",width:100,render:function(e,t){return"".concat(1==e?(0,y.sldComLanguage)("\u63a8\u8350"):(0,y.sldComLanguage)("\u4e0d\u63a8\u8350"))}},{title:"".concat((0,y.sldComLanguage)("\u5ba1\u6838\u72b6\u6001")),dataIndex:"stateValue",align:"center",width:100},{title:"".concat((0,y.sldComLanguage)("\u62d2\u7edd\u7406\u7531")),dataIndex:"auditReason",align:"center",width:150,render:function(e,t){return(e||"")+(t.auditComment?","+t.auditComment:"")}},{title:"".concat((0,y.sldComLanguage)("\u64cd\u4f5c")),align:"center",width:100,render:function(e,t){return L.default.createElement(L.Fragment,null,(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u67e5\u770b\u89c4\u683c")),function(){return a.viewSpec(t)}),L.default.createElement("span",{className:b.default.splitLine}),L.default.createElement(w.default,{to:{pathname:"/goods/goods_check_list_to_add",query:{id:t.goodsId}}},(0,y.sldtbaleOpeBtnText)("".concat((0,y.sldComLanguage)("\u7f16\u8f91")),function(){return null})))}}]},a}return(0,g.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.get_list({pageSize:k}),this.getTemplateList(),this.getStoreCat(),this.resize(),window.addEventListener("resize",this.resize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resize)}},{key:"render",value:function(){var e=this,t=this.state,a=t.selectedRows,n=t.selectedRowKeys,o=t.search_data,d=t.columns,c=t.initLoading,s=t.data,i=t.modalVisible,r=t.operateData,u=t.title,g=t.modal_width,m=t.show_foot,f=t.submiting,p=t.search_height;return L.default.createElement("div",{className:b.default.common_page,style:{flex:1}},(0,y.sldLlineRtextAddGoodsAddMargin)("#69A2F2","".concat((0,y.sldComLanguage)("\u5f85\u5ba1\u6838\u5546\u54c1")),0,0,10),L.default.createElement("div",{className:b.default.tableListForm,ref:"search_part"},L.default.createElement(I.default,{search_data:o,moreSearchToggle:function(){return e.moreSearchToggle()},seaSubmit:function(t){return e.search(t)},seaReset:function(){return e.seaReset()}})),L.default.createElement("div",{className:b.default.operate_bg,style:{display:"flex",flexDirection:"row",justifyContent:"space-between"}},L.default.createElement("div",{style:{display:"flex",flexDirection:"row"}},0==n.length?(0,y.sldIconBtn)(function(){(0,y.failTip)("".concat((0,y.sldComLanguage)("\u8bf7\u5148\u9009\u4e2d\u6570\u636e")))},"".concat((0,y.sldComLanguage)("\u5220\u9664")),7,0,15,15,3,"piliangshanchu","#F21414"):(0,y.sldPopConfirm)("leftBottom","".concat((0,y.sldComLanguage)("\u786e\u8ba4\u5220\u9664\u9009\u4e2d\u7684\u5546\u54c1\u5417\uff1f")),function(){return e.operateGoods({goodsIds:n.join(",")},"del")},"".concat((0,y.sldComLanguage)("\u786e\u5b9a")),"".concat((0,y.sldComLanguage)("\u53d6\u6d88")),(0,y.sldIconBtn)(null,"".concat((0,y.sldComLanguage)("\u5220\u9664")),7,0,15,15,3,"piliangshanchu","#F21414"),0,0,"#F21414"),0==n.length?(0,y.sldIconBtn)(function(){(0,y.failTip)("".concat((0,y.sldComLanguage)("\u8bf7\u5148\u9009\u4e2d\u6570\u636e")))},"".concat((0,y.sldComLanguage)("\u8bbe\u7f6e\u63a8\u8350")),7,0,15,15,3,"nav-tuijian","#ffa70f"):(0,y.sldPopConfirm)("leftBottom","".concat((0,y.sldComLanguage)("\u786e\u8ba4\u5c06\u9009\u4e2d\u7684\u5546\u54c1\u8bbe\u7f6e\u4e3a\u63a8\u8350\u5546\u54c1\u5417\uff1f")),function(){return e.operateGoods({goodsIds:n.join(","),isRecommend:1},"recommend")},"".concat((0,y.sldComLanguage)("\u786e\u5b9a")),"".concat((0,y.sldComLanguage)("\u53d6\u6d88")),(0,y.sldIconBtn)(null,"".concat((0,y.sldComLanguage)("\u8bbe\u7f6e\u63a8\u8350")),7,0,15,15,3,"nav-tuijian","#ffa70f"),0,0,"#ffa70f"),0==n.length?(0,y.sldIconBtn)(function(){(0,y.failTip)("".concat((0,y.sldComLanguage)("\u8bf7\u5148\u9009\u4e2d\u6570\u636e")))},"".concat((0,y.sldComLanguage)("\u53d6\u6d88\u63a8\u8350")),7,0,15,15,3,"quxiaotuijian2","#0f419c"):(0,y.sldPopConfirm)("leftBottom","".concat((0,y.sldComLanguage)("\u786e\u8ba4\u5c06\u9009\u4e2d\u7684\u5546\u54c1\u53d6\u6d88\u63a8\u8350\u5417\uff1f")),function(){return e.operateGoods({goodsIds:n.join(","),isRecommend:0},"recommend")},"".concat((0,y.sldComLanguage)("\u786e\u5b9a")),"".concat((0,y.sldComLanguage)("\u53d6\u6d88")),(0,y.sldIconBtn)(null,"".concat((0,y.sldComLanguage)("\u53d6\u6d88\u63a8\u8350")),7,0,15,15,3,"quxiaotuijian2","#0f419c"),0,0,"#0f419c"),0==n.length?(0,y.sldIconBtn)(function(){(0,y.failTip)("".concat((0,y.sldComLanguage)("\u8bf7\u5148\u9009\u4e2d\u6570\u636e")))},"".concat((0,y.sldComLanguage)("\u8bbe\u7f6e\u5173\u8054\u7248\u5f0f")),7,0,14,14,3,"glsz","#0c93f2"):(0,y.sldIconBtn)(function(){return e.setTemplate()},"".concat((0,y.sldComLanguage)("\u8bbe\u7f6e\u5173\u8054\u7248\u5f0f")),7,0,14,14,3,"glsz","#0c93f2"))),L.default.createElement(l.default,{spinning:c},L.default.createElement(S.default,{totalHeight:document.body.clientHeight-145-p-15,bordered:!1,selectedRows:a,data:s,rowKey:"goodsId",isCheck:!0,columns:d,onSelectRow:this.handleSelectRows,onChange:function(t,a,n){return e.handleTablePagination(t,a,n,"main")},onSldHandleSeleRow:this.onSldHandleSeleRow,resizeTable:function(t,a){return e.resizeTable(t,a,"columns",d)},isColumnResize:!0})),L.default.createElement(T.default,{width:g,title:u,submiting:f,modalVisible:i,sldHandleConfirm:function(t){return e.sldHandleConfirm(t)},sldHandleCancle:this.sldHandleCancle,formItemLayoutModal:y.formItemLayoutModal,content:r,show_foot:m}))}}]),t}(L.Component),p=h))||p)||p);t.default=x}}]);