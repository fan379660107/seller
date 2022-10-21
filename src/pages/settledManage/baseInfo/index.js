import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Button } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
  getSldEmptyH,
  saveSettleData,
  getSettleData,
  getSldHorLine,
  sldApplyTitleByBg,
  failTip,
  mobile_reg,
} from '@/utils/utils';
import styles from './index.less';
import SldTableRowThree from '@/components/SldTableRowThree';
import { apiUrl } from '@/utils/sldconfig.js';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';
import { Scrollbars } from 'react-custom-scrollbars';
import areaData from '@/assets/area.json';

@connect(({ settled }) => ({
  settled,
}))
@Form.create()
export default class BaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_width: 800,//图片预览宽度
      show_preview_modal: false,//预览图片modal框是否展示
      preview_img: '',//预览图片
      preview_alt_con: '',//预览图片内容
      cur_apply_type: 0,//0-个人入驻，1-企业入驻
      show_apply_type_flag: false,//是否展示radio类型的数据
      apply_type: [{
        type: 'radio',
        label: `${sldComLanguage('入驻类型')}`,
        name: 'enterType',
        placeholder: '',
        width: 250,
        required: true,
        sel_data: [
          { name: `${sldComLanguage('个人入驻')}`, key: 0 },
          { name: `${sldComLanguage('企业入驻')}`, key: 1 },
        ],
        initialValue: 0,
        onChange: this.handleApplyType,
      }],//入驻类型
      //店铺基本信息——个人入驻
      personal_base_info: [{
        type: 'cascader_common',
        label: `${sldComLanguage('所在地')}`,
        name: 'area',
        width: '80%',
        data: areaData,//三级地址
        fieldNames: { label: 'regionName', value: 'regionCode', children: 'children' },
        placeholder: `${sldComLanguage('请选择店铺所在地')}`,//请选择店铺所在地
        initialValue: [],
        required: true,
        onChange: this.getAreaInfo,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择店铺所在地')}`,//请选择店铺所在地
        }],
      },
        {
          type: 'textarea',
          maxLength: 40,
          label: `${sldComLanguage('详细地址')}`,
          name: 'companyAddress',
          placeholder: `${sldComLanguage('请输入店铺详细地址,最多40字')}`,
          initialValue: '',
          required: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入详细地址')}`,
          }],
        },
        {
          type: 'input',
          maxLength: 6,
          label: `${sldComLanguage('联系人')}`,
          name: 'contactName',
          placeholder: `${sldComLanguage('请输入联系人姓名,最多6个字')}`,
          initialValue: '',
          required: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入联系人姓名')}`,
          }],
        },
        {
          type: 'input',
          label: `${sldComLanguage('联系人手机号')}`,
          name: 'contactPhone',
          placeholder: `${sldComLanguage('请输入联系人手机号')}`,
          initialValue: '',
          required: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入联系人手机号')}`,
          }, {
            pattern: mobile_reg,
            message: `${sldComLanguage('请输入正确的手机号')}`,
          }],
        },
      ],
      personal_front_card_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('身份证正面')}`,
        name: 'personCardUp',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('personal_front_card_img', 'personCardUp', info),
        initialValue: '',
        img_succ_info: {},
        required: true,
        num: 1,
        item_height: 130,
      }],//身份证正面信息——个人入驻
      personal_back_card_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('身份证反面')}`,
        name: 'personCardDown',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('personal_back_card_img', 'personCardDown', info),
        initialValue: '',
        img_succ_info: {},
        required: true,
        num: 1,
        item_height: 130,
      }],//身份证反面信息——个人入驻
      company_base_info: [{
        type: 'input',
        maxLength: 20,
        label: `${sldComLanguage('公司名称')}`,
        name: 'companyName',
        placeholder: `${sldComLanguage('请输入公司名称,最多20个字')}`,
        initialValue: '',
        required: true,
        rules: [{
          required: true,
          message: `${sldComLanguage('请输入公司名称')}`,
        }],
      }, {
        type: 'cascader_common',
        label: `${sldComLanguage('所在地')}`,
        name: 'area',
        width: '80%',
        data: areaData,//三级地址
        fieldNames: { label: 'regionName', value: 'regionCode', children: 'children' },
        placeholder: `${sldComLanguage('请选择店铺所在地')}`,//请选择店铺所在地
        initialValue: [],
        required: true,
        onChange: this.getAreaInfo,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择店铺所在地')}`,//请选择店铺所在地
        }],
      },
        {
          type: 'textarea',
          maxLength: 40,
          label: `${sldComLanguage('详细地址')}`,
          name: 'companyAddress',
          placeholder: `${sldComLanguage('请输入店铺详细地址,最多40字')}`,
          initialValue: '',
          required: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入详细地址')}`,
          }],
        },
        {
          type: 'input',
          maxLength: 6,
          label: `${sldComLanguage('联系人')}`,
          name: 'contactName',
          placeholder: `${sldComLanguage('请输入联系人姓名,最多6个字')}`,
          initialValue: '',
          required: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入联系人姓名')}`,
          }],
        },
        {
          type: 'input',
          label: `${sldComLanguage('联系人手机号')}`,
          name: 'contactPhone',
          placeholder: `${sldComLanguage('请输入联系人手机号')}`,
          initialValue: '',
          required: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入联系人手机号')}`,
          }, {
            pattern: mobile_reg,
            message: `${sldComLanguage('请输入正确的手机号')}`,
          }],
        },
      ],//公司联系人信息——企业入驻
      business_license_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('营业执照')}`,
        name: 'businessLicenseImage',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('business_license_img', 'businessLicenseImage', info),
        initialValue: '',
        img_succ_info: {},
        required: true,
        num: 1,
        item_height: 130,
      }],//营业执照信息——企业入驻
      legal_front_card_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('身份证正面')}`,
        name: 'personCardUp',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('legal_front_card_img', 'personCardUp', info),
        initialValue: '',
        img_succ_info: {},
        required: true,
        num: 1,
        item_height: 130,
      }],//法人身份证正面信息——企业入驻
      legal_back_card_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('身份证反面')}`,
        name: 'personCardDown',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('legal_back_card_img', 'personCardDown', info),
        initialValue: '',
        img_succ_info: {},
        required: true,
        num: 1,
        item_height: 130,
      }],//法人身份证反面信息——企业入驻
      replenish_1_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('补充认证一')}`,
        name: 'moreQualification1',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('replenish_1_img', 'moreQualification1', info),
        initialValue: '',
        img_succ_info: {},
        num: 1,
        item_height: 130,
      }],//补充认证1一信息——企业入驻
      replenish_2_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('补充认证二')}`,
        name: 'moreQualification2',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('replenish_2_img', 'moreQualification2', info),
        initialValue: '',
        img_succ_info: {},
        num: 1,
        item_height: 130,
      }],//补充2认证一信息——企业入驻
      replenish_3_img: [{
        type: 'upload_img_upload',
        label: `${sldComLanguage('补充认证三')}`,
        name: 'moreQualification3',
        extra: `${sldComLanguage('支持JPG/PNG,大小不超过20M')}`,
        fileList: [],
        upload_name: 'file',
        upload_url: apiUrl + `v3/oss/common/upload?source=sellerApply`,
        uploadPreview: this.uploadImgPre,
        uploadChange: (info) => this.uploadImg('replenish_3_img', 'moreQualification3', info),
        initialValue: '',
        img_succ_info: {},
        num: 1,
        item_height: 130,
      }],//补充认证3一信息——企业入驻
    };
  }

  sel_area_name = '';//选择店铺地址的文本内容

  componentDidMount() {
    this.initData();
  }

  //获取地址信息
  getAreaInfo = (area) => {
    this.sel_area_name = '';//置空，防止数据累加
    for (let i in area) {
      this.sel_area_name += area[i].regionName;
    }
  };

  handleApplyType = (val) => {
    this.setState({ cur_apply_type: val });
  };

  //上传图片 key  name ,info
  uploadImg = (key, name, info) => {
    let tmp_data = this.state[key];
    if (info.file.status != undefined && info.file.status != 'error') {
      for (let i in tmp_data) {
        if (tmp_data[i].name == name) {
          tmp_data[i].fileList = info.fileList;
          break;
        }
      }
      this.setState({ [key]: tmp_data });
    }
  };

  //初始化页面数据
  initData = async () => {
    let { cur_apply_type, apply_type, personal_base_info, personal_front_card_img, personal_back_card_img, company_base_info, business_license_img, legal_front_card_img, legal_back_card_img, replenish_1_img, replenish_2_img, replenish_3_img, show_apply_type_flag } = this.state;
    let tmp_data = getSettleData('baseInfo');
    if (!tmp_data) {
      this.setState({ show_apply_type_flag: true });
      return false;
    }
    cur_apply_type = tmp_data.enterType;
    apply_type[0].initialValue = cur_apply_type;
    if (cur_apply_type == 0) {
      //个人入驻
      personal_base_info.map(item => {
        item.initialValue = tmp_data[item.name];
      });

      //身份证正面图片
      personal_front_card_img[0].fileList.push({
        response: {
          data: {
            path: tmp_data.personCardUp,
            url: tmp_data.personCardUpUrl,
          },
        },
        name: tmp_data.personCardUp,
        uid: tmp_data.personCardUp,
        status: 'done',
        thumbUrl: tmp_data.personCardUpUrl,
      });

      //身份证反面图片
      personal_back_card_img[0].fileList.push({
        response: {
          data: {
            path: tmp_data.personCardDown,
            url: tmp_data.personCardDownUrl,
          },
        },
        name: tmp_data.personCardDown,
        uid: tmp_data.personCardDown,
        status: 'done',
        thumbUrl: tmp_data.personCardDownUrl,
      });

    } else {
      //企业入驻

      company_base_info.map(item => {
        item.initialValue = tmp_data[item.name];
      });

      //营业执照图片
      business_license_img[0].fileList.push({
        response: {
          data: {
            path: tmp_data.businessLicenseImage,
            url: tmp_data.businessLicenseImageUrl,
          },
        },
        name: tmp_data.businessLicenseImage,
        uid: tmp_data.businessLicenseImage,
        status: 'done',
        thumbUrl: tmp_data.businessLicenseImageUrl,
      });

      //法人身份证正面图片
      legal_front_card_img[0].fileList.push({
        response: {
          data: {
            path: tmp_data.personCardUp,
            url: tmp_data.personCardUpUrl,
          },
        },
        name: tmp_data.personCardUp,
        uid: tmp_data.personCardUp,
        status: 'done',
        thumbUrl: tmp_data.personCardUpUrl,
      });

      //法人身份证反面图片
      legal_back_card_img[0].fileList.push({
        response: {
          data: {
            path: tmp_data.personCardDown,
            url: tmp_data.personCardDownUrl,
          },
        },
        name: tmp_data.personCardDown,
        uid: tmp_data.personCardDown,
        status: 'done',
        thumbUrl: tmp_data.personCardDownUrl,
      });

      //补充认证1图片
      if (tmp_data.moreQualification1) {
        replenish_1_img[0].fileList.push({
          response: {
            data: {
              path: tmp_data.moreQualification1,
              url: tmp_data.moreQualification1Url,
            },
          },
          name: tmp_data.moreQualification1,
          uid: tmp_data.moreQualification1,
          status: 'done',
          thumbUrl: tmp_data.moreQualification1Url,
        });
      }

      //补充认证2图片
      if (tmp_data.moreQualification2) {
        replenish_2_img[0].fileList.push({
          response: {
            data: {
              path: tmp_data.moreQualification2,
              url: tmp_data.moreQualification2Url,
            },
          },
          name: tmp_data.moreQualification2,
          uid: tmp_data.moreQualification2,
          status: 'done',
          thumbUrl: tmp_data.moreQualification2Url,
        });
      }

      //补充认证3图片
      if (tmp_data.moreQualification3) {
        replenish_3_img[0].fileList.push({
          response: {
            data: {
              path: tmp_data.moreQualification3,
              url: tmp_data.moreQualification3Url,
            },
          },
          name: tmp_data.moreQualification3,
          uid: tmp_data.moreQualification3,
          status: 'done',
          thumbUrl: tmp_data.moreQualification3Url,
        });
      }

    }
    this.setState({
      cur_apply_type,
      apply_type,
      personal_base_info,
      personal_front_card_img,
      personal_back_card_img,
      company_base_info,
      legal_front_card_img,
      business_license_img,
      legal_back_card_img,
      replenish_1_img,
      replenish_2_img,
      replenish_3_img,
      show_apply_type_flag: true,
    });
  };


  //预览图片
  uploadImgPre = (img) => {
    this.viewImg(true, img.url || img.thumbUrl);
  };

  //预览图片/关闭预览图片
  viewImg = (flag, img = '', text = '') => {
    this.setState({
      preview_img: img,
      preview_alt_con: text,
      show_preview_modal: flag,
    });
  };

  //下一步
  handleNextStep = (e) => {
    e.preventDefault();
    const { cur_apply_type, personal_front_card_img, personal_back_card_img, business_license_img, legal_front_card_img, legal_back_card_img, replenish_1_img, replenish_2_img, replenish_3_img } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {};
        let params_local = {};//存缓存数据，和params相比，多了图片的绝对路径，主要用于展示图片

        params.enterType = values.enterType;//入驻类型
        params.companyProvinceCode = values.area[0];//省编码
        params.companyCityCode = values.area[1];//市编码
        params.companyAreaCode = values.area[2];//区编码
        params_local.area = values.area;//省市区id数组
        params_local.areaInfo = this.sel_area_name;//省市区名称组合
        params.areaInfo = this.sel_area_name;//省市区名称组合
        params.companyAddress = values.companyAddress;//详细地址
        params.contactName = values.contactName;//联系人姓名
        params.contactPhone = values.contactPhone;//联系人电话
        if (cur_apply_type == 0) {
          //个人入驻
          if (personal_front_card_img[0].fileList.length == 0) {
            failTip(`${sldComLanguage('请上传身份证正面图片')}`);
            return false;
          } else {
            params.personCardUp = personal_front_card_img[0].fileList[0].response.data.path;//身份证正面图片
            params_local.personCardUpUrl = personal_front_card_img[0].fileList[0].response.data.url;//身份证正面图片
          }

          if (personal_back_card_img[0].fileList.length == 0) {
            failTip(`${sldComLanguage('请上传身份证反面图片')}`);
            return false;
          } else {
            params.personCardDown = personal_back_card_img[0].fileList[0].response.data.path;//身份证反面图片
            params_local.personCardDownUrl = personal_back_card_img[0].fileList[0].response.data.url;//身份证反面图片
          }

        } else {
          //企业入驻
          params.companyName = values.companyName;//公司名称

          if (business_license_img[0].fileList.length == 0) {
            failTip(`${sldComLanguage('请上传营业执照图片')}`);
            return false;
          } else {
            params.businessLicenseImage = business_license_img[0].fileList[0].response.data.path;//营业执照图片
            params_local.businessLicenseImageUrl = business_license_img[0].fileList[0].response.data.url;//营业执照图片
          }

          if (legal_front_card_img[0].fileList.length == 0) {
            failTip(`${sldComLanguage('请上传法人身份证正面图片')}`);
            return false;
          } else {
            params.personCardUp = legal_front_card_img[0].fileList[0].response.data.path;//身份证正面图片
            params_local.personCardUpUrl = legal_front_card_img[0].fileList[0].response.data.url;//身份证正面图片
          }

          if (legal_back_card_img[0].fileList.length == 0) {
            failTip(`${sldComLanguage('请上传法人身份证反面图片')}`);
            return false;
          } else {
            params.personCardDown = legal_back_card_img[0].fileList[0].response.data.path;//身份证反面图片
            params_local.personCardDownUrl = legal_back_card_img[0].fileList[0].response.data.url;//身份证反面图片
          }

          if (replenish_1_img[0].fileList.length > 0) {
            params.moreQualification1 = replenish_1_img[0].fileList[0].response.data.path;//补充认证一图片
            params_local.moreQualification1Url = replenish_1_img[0].fileList[0].response.data.url;//补充认证一图片
          }

          if (replenish_2_img[0].fileList.length > 0) {
            params.moreQualification2 = replenish_2_img[0].fileList[0].response.data.path;//补充认证二图片
            params_local.moreQualification2Url = replenish_2_img[0].fileList[0].response.data.url;//补充认证二图片
          }

          if (replenish_3_img[0].fileList.length > 0) {
            params.moreQualification3 = replenish_3_img[0].fileList[0].response.data.path;//补充认证三图片
            params_local.moreQualification3Url = replenish_3_img[0].fileList[0].response.data.url;//补充认证三图片
          }
        }

        //将店铺基本信息存入sessionStorage 进入下一步入驻
        params_local = { ...params_local, ...params };
        sessionStorage.setItem('baseInfo', JSON.stringify(params));
        saveSettleData('baseInfo', JSON.stringify(params_local));
        //只有小于当前的才需要更新
        if (getSettleData('cur_step') * 1 < 2) {
          saveSettleData('cur_step', 2);
        }
        this.props.history.push('/apply/business_info');
      }
    });
  };

  render() {
    const {
      personal_base_info, apply_type, personal_front_card_img, personal_back_card_img, preview_img, show_preview_modal, modal_width, preview_alt_con, cur_apply_type, company_base_info, business_license_img, legal_front_card_img, legal_back_card_img, replenish_1_img, replenish_2_img, replenish_3_img, show_apply_type_flag,
    } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <div className={styles.title}>
          {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('店铺信息')}`, 0, 0, 5)}
        </div>
        {getSldHorLine(1)}
        {getSldEmptyH(10)}
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 130}>
          {sldApplyTitleByBg(`${sldComLanguage('入驻类型')}`)}
          {show_apply_type_flag && <SldTableRowThree form={this.props.form} data={apply_type}/>}
          {cur_apply_type == 0 &&
          <Fragment>
            {sldApplyTitleByBg(`${sldComLanguage('店铺联系人信息')}`)}
            {getSldEmptyH(10)}
            <SldTableRowThree form={this.props.form} data={personal_base_info}/>
            {sldApplyTitleByBg(`${sldComLanguage('身份证信息')}`)}
            {getSldEmptyH(10)}
            <SldTableRowThree form={this.props.form} data={personal_front_card_img}/>
            <SldTableRowThree form={this.props.form} data={personal_back_card_img}/>
          </Fragment>
          }

          {cur_apply_type == 1 &&
          <Fragment>
            {sldApplyTitleByBg(`${sldComLanguage('公司联系人信息')}`)}
            {getSldEmptyH(10)}
            <SldTableRowThree form={this.props.form} data={company_base_info}/>
            {sldApplyTitleByBg(`${sldComLanguage('营业执照信息')}`)}
            {getSldEmptyH(10)}
            <SldTableRowThree form={this.props.form} data={business_license_img}/>
            {sldApplyTitleByBg(`${sldComLanguage('法人身份信息')}`)}
            {getSldEmptyH(10)}
            <SldTableRowThree form={this.props.form} data={legal_front_card_img}/>
            <SldTableRowThree form={this.props.form} data={legal_back_card_img}/>
            {sldApplyTitleByBg(`${sldComLanguage('补充认证信息')}`)}
            {getSldEmptyH(10)}
            <SldTableRowThree form={this.props.form} data={replenish_1_img}/>
            <SldTableRowThree form={this.props.form} data={replenish_2_img}/>
            <SldTableRowThree form={this.props.form} data={replenish_3_img}/>
          </Fragment>
          }
          {((getSettleData('state') && getSettleData('state') == 3) || !getSettleData('state')) &&
          <div className={styles.commen_wrap}
               style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, marginTop: -30, paddingBottom: 20 }}>
            <Button type='primary' onClick={this.handleNextStep} className={styles.next_step}>下一步</Button>
          </div>
          }
          {getSldEmptyH(10)}
          {/*图片预览-start*/}
          <SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={modal_width}
                         preview_alt_con={preview_alt_con} closePreviewModal={() => this.viewImg(false)}/>
          {/*图片预览-end*/}
        </Scrollbars>
      </div>

    );
  }
}
