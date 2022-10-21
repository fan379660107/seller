import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import Link from 'umi/link';
import { Form, Button, message } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
  saveSettleData,
  getSettleData,
} from '@/utils/utils';
import styles from './more_aptitude.less';

import SldTableRowThree from '@/components/SldTableRowThree';
import { apiUrl } from '@/utils/sldconfig.js';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';


@connect(({ settledmanage, loading }) => ({
  settledmanage,
}))
@Form.create()
export default class moreAptitude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_width: 800,//图片预览宽度
      show_preview_modal: false,//预览图片modal框是否展示
      preview_img: '',//预览图片
      preview_alt_con: '',//预览图片内容
      base_info: [
        {
          type: 'upload_img_upload',
          label: `${sldComLanguage('更多资质')}`,
          name: 'storeMoreQualification',
          extra: `${sldComLanguage('上传供应商更多资质，有助于审核通过，最多上传5张（非必填）')}`,
          fileList: [],
          upload_name: 'imageFile',
          upload_url: apiUrl + `/v1/seller/commons/uploadImg?source=apply`,
          uploadPreview: this.uploadImgPre,
          uploadChange: this.uploadImgManage,
          initialValue: '',
          img_succ_info: {},
          num: 5,
          item_height: 250,
          part_width: 100,
          lwidth: 15,
          rwidth: 65,
        },
      ],
      finance_qualification: {},
    };
  }

  componentDidMount() {
    this.setState({
      finance_qualification: JSON.parse(sessionStorage.getItem('finance_qualification').replace(/&quot;/g,"\"")),
    });
    this.initData();
  }

  initData = () => {
    let { base_info } = this.state;
    let tmp_data = getSettleData('more_qualification');
    if(tmp_data&&tmp_data.storeMoreQualification!=undefined&&tmp_data.storeMoreQualification){
      let imgPath = tmp_data.storeMoreQualification.split(',');
      let imgUrl = tmp_data.storeMoreQualificationUrl.split(',');
      for(let i in imgPath){
        base_info[0].fileList.push({
          response: {
            data: {
              path: imgPath[i],
              url: imgUrl[i],
            },
          },
          name: imgPath[i],
          uid: imgPath[i],
          status: 'done',
          thumbUrl: imgUrl[i],
        });
      }
      this.setState({base_info});
    }
  }

  uploadImgManage = (info) => {
    let { base_info } = this.state;
    if (info.file.status != undefined && info.file.status != 'error') {
      for (let i in base_info) {
        if (base_info[i].name == 'storeMoreQualification') {
          base_info[i].fileList = info.fileList;
          break;
        }
      }
      this.setState({ base_info });
    }
  };

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
    let { finance_qualification, base_info } = this.state;
    const { dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = { ...getSettleData('company_qualification'),...getSettleData('finance_qualification') };
        let params_local = {};
        //更多资质 图片
        let fileList = [];
        base_info.map((item, index) => {
          if (item.name == 'storeMoreQualification') {
            fileList = item.fileList;
          }
        });

        let img_data = [];
        let img_data_url = [];
        fileList.map((item, index) => {
          let items = item.response;
          if (items.state == 200) {
            img_data.push(items.data.path);
            img_data_url.push(items.data.url);
          }
        });

        params.storeMoreQualification = img_data.join(',');
        params.companyType  = params.companyType.join(',');//公司资质——企业基础信息——企业类型里面数组转为字符串
        params_local.storeMoreQualificationUrl = img_data_url.join(',');
        params_local = {...params_local,...params};
        dispatch({
          type: 'settledmanage/saveApply',
          payload: params,
          callback: res => {
            if (res.state == 200) {
              message.success(res.msg);
              sessionStorage.removeItem('finance_qualification');
              setTimeout(() => {
                saveSettleData('more_qualification', JSON.stringify(params_local));
                saveSettleData('cur_step', 4);
                saveSettleData('state', 4);
                this.props.history.push('/apply/open_up');
              }, 1500);
            } else {
              message.error(res.msg);
            }
          },
        });
      }

    });
  };

  render() {
    const {
      base_info,
      preview_img,
      show_preview_modal,
      modal_width,
      preview_alt_con,
    } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <div className={styles.title}>
          {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('供应商更多资质')}`, 0, 0, 5)}
        </div>

        <div className={styles.commen_wrap}>
          <SldTableRowThree form={this.props.form} data={base_info}/>

          <Button type='primary' onClick={this.handleNextStep} className={styles.next_step}>下一步</Button>

        </div>
        {/*图片预览-start*/}
        <SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={modal_width}
                       preview_alt_con={preview_alt_con} closePreviewModal={() => this.viewImg(false)}/>
        {/*图片预览-end*/}

      </div>
    );
  }
}
