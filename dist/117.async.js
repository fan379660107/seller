(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[117],{xs31:function(a,e,t){"use strict";var o=t("g09b"),n=t("tAuX");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t("T2oS");var i=o(t("W9HT")),l=o(t("p0pE")),u=o(t("2Taf")),s=o(t("vZ4D")),r=o(t("l4Ni")),d=o(t("ujKo")),c=o(t("rlhR")),m=o(t("MhPg"));t("y8nQ");var g,f,p,_,v=o(t("Vl3Y")),h=t("MuoO"),L=n(t("q1tI")),b=t("+n12"),C=o(t("hh8c")),P=o(t("fneV")),y=t("UWOa"),B=(g=(0,h.connect)(function(a){var e=a.store;return{store:e}}),f=v.default.create(),g(p=f((_=function(a){function e(a){var t;return(0,u.default)(this,e),t=(0,r.default)(this,(0,d.default)(e).call(this,a)),t.get_vendor_base_info=function(){var a=t.props.dispatch,e=t.state.info_data;a({type:"manage/getVendorSetting",callback:function(a){if(200==a.state){for(var o in a.data.storeGradeName||(e=e.filter(function(a){return"storeGradeName"!=a.name})),e)if("storeLogo"==e[o].name){var n=[];if(a.data.storeLogo){var i={};i.uid=new Date,i.name=a.data.storeLogo,i.status="done",i.url=a.data.storeLogoPath,n.push(i)}e[o].fileList=n,e[o].img_succ_info={path:a.data.storeLogo}}else if("storeBannerPc"==e[o].name){var l=[];if(a.data.storeBannerPc){var u={};u.uid=new Date,u.name=a.data.storeBannerPc,u.status="done",u.url=a.data.storeBannerPcPath,l.push(u)}e[o].fileList=l,e[o].img_succ_info={path:a.data.storeBannerPc}}else if("storeBannerMobile"==e[o].name){var s=[];if(a.data.storeBannerMobile){var r={};r.uid=new Date,r.name=a.data.storeBannerMobile,r.status="done",r.url=a.data.storeBannerMobilePath,s.push(r)}e[o].fileList=s,e[o].img_succ_info={path:a.data.storeBannerMobile}}else e[o].initialValue=a.data[e[o].name];e.length>0&&e.push({type:"button",label:"",name:"button"})}t.setState({info_data:e,flag:1})}})},t.uploadImgPre=function(a){t.viewImg(!0,a.name)},t.uploadImg=function(a,e){var o=t.state.info_data;if(void 0!=a.file.status&&"error"!=a.file.status){for(var n in o)o[n].name==e&&(o[n].fileList=a.fileList,o[n].img_succ_info=void 0!=a.file.response&&a.fileList.length>0&&void 0!=a.file.response.data?a.file.response.data:[]);t.setState({info_data:o})}},t.handleSubmit=function(a){t.setState({submitting:!0});var e=t.props.dispatch,o=t.state.info_data,n={};for(var i in delete o.button,o)"storeLogo"==o[i].name?n.storeLogo=void 0!=o[i].img_succ_info&&void 0!=o[i].img_succ_info.path?o[i].img_succ_info.path:"":"storeBannerMobile"==o[i].name?n.storeBannerMobile=void 0!=o[i].img_succ_info&&void 0!=o[i].img_succ_info.path?o[i].img_succ_info.path:"":"storeBannerPc"==o[i].name&&(n.storeBannerPc=void 0!=o[i].img_succ_info&&void 0!=o[i].img_succ_info.path?o[i].img_succ_info.path:"");e({type:"store/save_vendor_base_info",payload:(0,l.default)({},n,a),callback:function(a){200==a.state?(0,b.sucTip)(a.msg):(0,b.failTip)(a.msg),t.setState({submitting:!1})}})},(0,c.default)(t),t.state={flag:0,submitting:!1,initLoading:!1,info_data:[{type:"show_content",label:"".concat((0,b.sldComLanguage)("\u5e97\u94fa\u7b49\u7ea7")),name:"storeGradeName",initialValue:""},{type:"textarea",label:"".concat((0,b.sldComLanguage)("\u4e3b\u8425\u5546\u54c1")),extra:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u5e97\u94fa\u4e3b\u8425\u5546\u54c1\u5173\u952e\u5b57\uff0c\u5982\u9700\u586b\u5199\u591a\u4e2a\u5546\u54c1\uff0c\u8bf7\u7528\u82f1\u6587\u7b26\u53f7\u201c\uff0c\u201d\u8fdb\u884c\u5206\u5272\uff0c\u5982\u201c\u6212\u6307\uff0c\u9879\u94fe\uff0c\u8033\u73af\u201d\uff0c\u6700\u591a\u53ef\u8f93\u516550\u5b57\u3002\u4e3b\u8981\u5728\u79fb\u52a8\u7aef\u5e97\u94fa\u4fe1\u606f\u9875\u5c55\u793a")),name:"mainBusiness",maxLength:50,placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u5e97\u94fa\u4e3b\u8425\u5546\u54c1\u5173\u952e\u5b57")),initialValue:""},{type:"upload_img_upload",label:"".concat((0,b.sldComLanguage)("\u5e97\u94falogo")),name:"storeLogo",extra:"".concat((0,b.sldComLanguage)("\u5efa\u8bae\u4e0a\u4f20\u5bbd130\u50cf\u7d20*\u9ad8130\u50cf\u7d20\u7684\u56fe\u7247")),fileList:[],upload_name:"file",upload_url:y.apiUrl+"v3/oss/common/upload?source=logo",uploadChange:function(a){return t.uploadImg(a,"storeLogo")},uploadPreview:t.uploadImgPre,initialValue:""},{type:"upload_img_upload",label:"".concat((0,b.sldComLanguage)("PC\u5e97\u94fa\u6a2a\u5e45")),name:"storeBannerPc",extra:"".concat((0,b.sldComLanguage)("\u8bf7\u4e0a\u4f201920*104\u7684\u56fe\u7247")),fileList:[],upload_name:"file",upload_url:y.apiUrl+"v3/oss/common/upload?source=logo",uploadChange:function(a){return t.uploadImg(a,"storeBannerPc")},uploadPreview:t.uploadImgPre,initialValue:""},{type:"upload_img_upload",label:"".concat((0,b.sldComLanguage)("\u79fb\u52a8\u7aef\u5e97\u94fa\u6a2a\u5e45")),name:"storeBannerMobile",extra:"".concat((0,b.sldComLanguage)("\u8bf7\u4e0a\u4f20750*253\u7684\u56fe\u7247")),fileList:[],upload_name:"file",upload_url:y.apiUrl+"v3/oss/common/upload?source=logo",uploadChange:function(a){return t.uploadImg(a,"storeBannerMobile")},uploadPreview:t.uploadImgPre,initialValue:""},{type:"input",label:"".concat((0,b.sldComLanguage)("\u5e97\u94fa\u5ba2\u670d\u7535\u8bdd")),extra:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165\u7528\u4e8e\u4ea4\u6613\u8054\u7cfb\u7684\u7535\u8bdd\u53f7\u7801\uff0c\u65b9\u4fbf\u4e70\u5bb6\u8fdb\u884c\u54a8\u8be2\u6c9f\u901a")),name:"servicePhone",placeholder:"",initialValue:"",rules:[{validator:function(a,e,t){return(0,b.validatorVendorPhone)(a,e,t)}}]},{type:"textarea",label:"".concat((0,b.sldComLanguage)("SEO\u5173\u952e\u5b57")),extra:"".concat((0,b.sldComLanguage)("\u7528\u4e8e\u5e97\u94fa\u5f15\u64ce\u4f18\u5316\uff0c\u5173\u952e\u5b57\u4e4b\u95f4\u8bf7\u7528\u82f1\u6587\u7b26\u53f7\u201c\uff0c\u201d\u8fdb\u884c\u5206\u5272")),name:"storeSeoKeyword",maxLength:200,placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165SEO\u5173\u952e\u5b57")),initialValue:""},{type:"textarea",label:"".concat((0,b.sldComLanguage)("SEO\u5e97\u94fa\u63cf\u8ff0")),extra:"".concat((0,b.sldComLanguage)("\u7528\u4e8e\u5e97\u94fa\u5f15\u64ce\u4f18\u5316")),maxLength:120,name:"storeSeoDesc",placeholder:"".concat((0,b.sldComLanguage)("\u8bf7\u8f93\u5165SEO\u5e97\u94fa\u63cf\u8ff0")),initialValue:""}]},t}return(0,m.default)(e,a),(0,s.default)(e,[{key:"componentDidMount",value:function(){this.get_vendor_base_info()}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var a=this.state,e=a.info_data,t=a.submitting,o=a.initLoading,n=a.flag;return L.default.createElement(i.default,{spinning:o},L.default.createElement("div",{className:C.default.common_page_20},(0,b.sldLlineRtextAddGoods)("#69A2F2","".concat((0,b.sldComLanguage)("\u5e97\u94fa\u8bbe\u7f6e"))),L.default.createElement("div",{className:"".concat(C.default.flex_com_column," ").concat(C.default.comm_line_sperator)},(0,b.getSldEmptyH)(15),1==n&&L.default.createElement(P.default,{submiting:t,width:1e3,data:e,handleSubmit:this.handleSubmit}))))}}]),e}(L.Component),p=_))||p)||p);e.default=B}}]);