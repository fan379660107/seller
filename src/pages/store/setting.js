import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form, Spin } from 'antd';
import {
  sldLlineRtextAddGoods,
  failTip,
  sucTip,
  getSldEmptyH,
  validatorVendorPhone,sldComLanguage
} from '@/utils/utils';
import global from '@/global.less';
import SldTableEdit from '@/components/SldTableEdit/SldTableEdit';
import { apiUrl } from '@/utils/sldconfig.js';

let sthis = '';
@connect(({ store }) => ({
  store,
}))
@Form.create()
export default class Setting extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      flag: 0,
      submitting: false,//提交按钮加载状态
      initLoading: false,//页面初始化加载状态
      info_data: [{
        type: 'show_content',
        label: `${sldComLanguage('店铺等级')}`,//店铺等级
        name: 'storeGradeName',
        initialValue: '',
      }, {
        type: 'textarea',
        label: `${sldComLanguage('主营商品')}`,//主营商品
        extra: `${sldComLanguage('请输入店铺主营商品关键字，如需填写多个商品，请用英文符号“，”进行分割，如“戒指，项链，耳环”，最多可输入50字。主要在移动端店铺信息页展示')}`,
        name: 'mainBusiness',
        maxLength: 50,
        placeholder: `${sldComLanguage('请输入店铺主营商品关键字')}`,//请输入店铺主营商品关键字
        initialValue: '',
      }, {
        type: 'upload_img_upload',
        label: `${sldComLanguage('店铺logo')}`,//店铺logo
        name: 'storeLogo',
        extra: `${sldComLanguage('建议上传宽130像素*高130像素的图片')}`,//建议上传宽130像素*高130像素的图片
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=logo`,
        uploadChange: (info) => this.uploadImg(info, 'storeLogo'),
        uploadPreview: this.uploadImgPre,
        initialValue: '',
      }, {
        type: 'upload_img_upload',
        label: `${sldComLanguage('PC店铺横幅')}`,//PC店铺横幅
        name: 'storeBannerPc',
        extra: `${sldComLanguage('请上传1920*104的图片')}`,//请上传1920*104的图片
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=logo`,
        uploadChange: (info) => this.uploadImg(info, 'storeBannerPc'),
        uploadPreview: this.uploadImgPre,
        initialValue: '',
      },
        {
          type: 'upload_img_upload',
          label: `${sldComLanguage('移动端店铺横幅')}`,//移动端店铺横幅
          name: 'storeBannerMobile',
          extra: `${sldComLanguage('请上传750*253的图片')}`,//请上传750*253的图片
          fileList: [],
          upload_name: 'file',
          upload_url: apiUrl + `v3/oss/common/upload?source=logo`,
          uploadChange: (info) => this.uploadImg(info, 'storeBannerMobile'),
          uploadPreview: this.uploadImgPre,
          initialValue: '',
        },
        {
          type: 'input',
          label: `${sldComLanguage('店铺客服电话')}`,//店铺客服电话
          extra: `${sldComLanguage('请输入用于交易联系的电话号码，方便买家进行咨询沟通')}`,//请输入用于交易联系的电话号码，方便买家进行咨询沟通
          name: 'servicePhone',
          placeholder: '',
          initialValue: '',
          rules: [{ validator: (rule, value, callback) => validatorVendorPhone(rule, value, callback) }],
        }, {
          type: 'textarea',
          label: `${sldComLanguage('SEO关键字')}`,//SEO关键字
          extra: `${sldComLanguage('用于店铺引擎优化，关键字之间请用英文符号“，”进行分割')}`,//用于店铺引擎优化，关键字之间请用英文符号“，”进行分割
          name: 'storeSeoKeyword',
          maxLength: 200,
          placeholder: `${sldComLanguage('请输入SEO关键字')}`,//请输入SEO关键字
          initialValue: '',
        }, {
          type: 'textarea',
          label: `${sldComLanguage('SEO店铺描述')}`,//SEO店铺描述
          extra: `${sldComLanguage('用于店铺引擎优化')}`,//用于店铺引擎优化，最多输入120字
          maxLength: 120,
          name: 'storeSeoDesc',
          placeholder: `${sldComLanguage('请输入SEO店铺描述')}`,//请输入SEO店铺描述
          initialValue: '',
        },
      ],
    };
  }

  componentDidMount() {
    this.get_vendor_base_info();
  }

  componentWillUnmount() {

  }

  //获取店铺的基本信息
  get_vendor_base_info = () => {
    const { dispatch } = this.props;
    let { info_data } = this.state;
    dispatch({
      type: 'manage/getVendorSetting',
      callback: (res) => {
        if (res.state == 200) {
          if(!res.data.storeGradeName){
            info_data = info_data.filter(item=>item.name!='storeGradeName');
          }
          for (let i in info_data) {
            if (info_data[i].name == 'storeLogo') {
              let fileList = [];
              if (res.data.storeLogo) {
                let tmp_data = {};
                tmp_data.uid = new Date();
                tmp_data.name = res.data.storeLogo;
                tmp_data.status = 'done';
                tmp_data.url = res.data.storeLogoPath;
                fileList.push(tmp_data);
              }
              info_data[i].fileList = fileList;
              info_data[i].img_succ_info = { path: res.data.storeLogo };
            } else if (info_data[i].name == 'storeBannerPc') {
              let fileList = [];
              if (res.data.storeBannerPc) {
                let tmp_data = {};
                tmp_data.uid = new Date();
                tmp_data.name = res.data.storeBannerPc;
                tmp_data.status = 'done';
                tmp_data.url = res.data.storeBannerPcPath;
                fileList.push(tmp_data);
              }
              info_data[i].fileList = fileList;
              info_data[i].img_succ_info = { path: res.data.storeBannerPc };
            } else if (info_data[i].name == 'storeBannerMobile') {
              let fileList = [];
              if (res.data.storeBannerMobile) {
                let tmp_data = {};
                tmp_data.uid = new Date();
                tmp_data.name = res.data.storeBannerMobile;
                tmp_data.status = 'done';
                tmp_data.url = res.data.storeBannerMobilePath;
                fileList.push(tmp_data);
              }
              info_data[i].fileList = fileList;
              info_data[i].img_succ_info = { path: res.data.storeBannerMobile };
            } else {
              info_data[i].initialValue = res.data[info_data[i].name];
            }
          }
          if (info_data.length > 0) {
            info_data.push({
              type: 'button',
              label: '',
              name: 'button',
            });
          }
        }
        this.setState({ info_data, flag: 1 });
      },
    });
  };

  //预览图片
  uploadImgPre = (info) => {
    this.viewImg(true, info.name);
  };

  //上传图片 dataType:用于区分更改那个数据
  uploadImg = (info, dataType) => {
    let { info_data } = this.state;
    if (info.file.status != undefined && info.file.status != 'error') {
      for (let i in info_data) {
        if (info_data[i].name == dataType) {
          info_data[i].fileList = info.fileList;
          info_data[i].img_succ_info = (info.file.response != undefined && info.fileList.length > 0 && info.file.response.data != undefined) ? info.file.response.data : [];
        }
      }
      this.setState({ info_data });
    }
  };

  //保存事件
  handleSubmit = (values) => {
    this.setState({ submitting: true });
    const { dispatch } = this.props;
    const { info_data } = this.state;
    let param = {};
    delete info_data.button;
    for (let i in info_data) {
      if (info_data[i].name == 'storeLogo') {
        param.storeLogo = info_data[i].img_succ_info != undefined && info_data[i].img_succ_info.path != undefined ? info_data[i].img_succ_info.path : '';
      } else if (info_data[i].name == 'storeBannerMobile') {
        param.storeBannerMobile = info_data[i].img_succ_info != undefined && info_data[i].img_succ_info.path != undefined ? info_data[i].img_succ_info.path : '';
      } else if (info_data[i].name == 'storeBannerPc') {
        param.storeBannerPc = info_data[i].img_succ_info != undefined && info_data[i].img_succ_info.path != undefined ? info_data[i].img_succ_info.path : '';
      }
    }
    dispatch({
      type: 'store/save_vendor_base_info',
      payload: { ...param, ...values },
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
        } else {
          failTip(res.msg);
        }
        this.setState({ submitting: false });
      },
    });
  };

  render() {
    const { info_data, submitting, initLoading, flag } = this.state;
    return (
      <Spin spinning={initLoading}>
        <div className={global.common_page_20}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('店铺设置')}`)}{/*店铺设置*/}
          <div className={`${global.flex_com_column} ${global.comm_line_sperator}`}>
            {getSldEmptyH(15)}
            {flag == 1 &&
            <SldTableEdit
              submiting={submitting}
              width={1000}
              data={info_data}
              handleSubmit={this.handleSubmit}
            />
            }
          </div>
        </div>
      </Spin>
    );
  }
}
