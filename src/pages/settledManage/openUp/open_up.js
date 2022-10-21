import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Button, message, Table, Radio, Modal } from 'antd';
import {
  sldComLanguage,
  getSettleData,
  sldLlineRtextAddGoodsAddMargin,
  saveSettleData,
  getSldHorLine,
} from '@/utils/utils';
import styles from './open_up.less';
import global from '@/global.less';
import router from 'umi/router';
import SldTableRowTwo from '@/components/SldTableRowTwo';
import { Scrollbars } from 'react-custom-scrollbars';

const state_img_data = {
  apply_success: require('@/assets/apply_success.png'),
  apply_pending: require('@/assets/apply_pending.png'),
  apply_fail: require('@/assets/apply_fail.png'),
};

@connect(({ settled }) => ({
  settled,
}))
@Form.create()
export default class openUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      wx_pay_qrcode: '',//微信支付二维码
      submiting: false,
      check_state: getSettleData('state'),
      detail: {},//入驻详情
      pay_method: 'alipay',//支付方式
      apply_progress: {},//入驻进度
      store_pay_data: [{
        type: 'show_text',
        label: `${sldComLanguage('店铺等级')}`,
        name: 'gradeName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('收费标准')}`,
        name: 'price',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('开店时长')}`,
        name: 'applyYear',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('应付金额')}`,
        name: 'payAmount',
        extra: ``,
        item_height: 42,
        text: ``,
      }],//付费清单数据
    };
  }

  timer = 0;//定时器

  componentDidMount() {
    this.getProgress();
    this.getApplyInfo();
  }

  //获取入驻进度
  getProgress = () => {
    const { dispatch } = this.props;
    let { store_pay_data, modalVisible } = this.state;
    dispatch({
      type: 'settled/get_apply_progress',
      callback: res => {
        if (res.state == 200) {
          store_pay_data.map(item => {
            item.text = res.data[item.name];
          });
          if (res.data.applyStep != 2) {
            modalVisible = false;
          }
          saveSettleData('state', res.data.applyStep);//1 待审核  2 待付款 3 已拒绝 4已开通
          this.setState({ apply_progress: res.data, store_pay_data, modalVisible });
        }
      },
    });
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  //获取入驻信息
  getApplyInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'settled/get_apply_detail',
      callback: res => {
        if (res.state == 200) {
          let result = res.data;
          //更新缓存
          //同意协议
          saveSettleData('agree_protocol', true);
          //基本信息
          let base_info = {};
          base_info.enterType = result.enterType;
          base_info.companyProvinceCode = result.companyProvinceCode;
          base_info.companyCityCode = result.companyCityCode;
          base_info.companyAreaCode = result.companyAreaCode;
          base_info.area = [base_info.companyProvinceCode, base_info.companyCityCode, base_info.companyAreaCode];
          base_info.companyAddress = result.companyAddress;
          base_info.areaInfo = result.areaInfo;//省市区组合
          base_info.contactName = result.contactName;
          base_info.contactPhone = result.contactPhone;
          base_info.personCardUp = result.personCardUp;
          base_info.personCardUpUrl = result.personCardUpPath;
          base_info.personCardDown = result.personCardDown;
          base_info.personCardDownUrl = result.personCardDownPath;
          if(result.enterType == 1){
            //企业入驻
            base_info.companyName = result.companyName;
            base_info.businessLicenseImage = result.businessLicenseImage;
            base_info.businessLicenseImageUrl = result.businessLicenseImagePath;
            if(result.moreQualification1){
              base_info.moreQualification1 = result.moreQualification1;
              base_info.moreQualification1Url = result.moreQualification1Path;
            }
            if(result.moreQualification2){
              base_info.moreQualification2 = result.moreQualification2;
              base_info.moreQualification2Url = result.moreQualification2Path;
            }
            if(result.moreQualification3){
              base_info.moreQualification3 = result.moreQualification3;
              base_info.moreQualification3Url = result.moreQualification3Path;
            }
          }
          saveSettleData('baseInfo', JSON.stringify(base_info));//基本信息存缓存
          //经营信息
          let business_info = {};
          business_info.applyYear = result.applyYear;
          business_info.storeName = result.storeName;//店铺名称
          business_info.storeGradeId = result.storeGradeId;//店铺等级
          //经营类目信息
          let sel_cat_id_array = [];//选择的分类id
          let select_cat_id_three = [];//选择的分类id，eg：1级-2级-3级
          result.storeGoodsCateVOList.map(item => {
            sel_cat_id_array.push(item.goodsCategoryId3);
            select_cat_id_three.push(`${item.goodsCategoryId1}-${item.goodsCategoryId2}-${item.goodsCategoryId3}`);
          });
          business_info.goodsCategoryIds = select_cat_id_three.join(',');//申请分类id字符串,例1级-2级-3级;1级-2级-3级
          business_info.sel_cat_id_array = sel_cat_id_array;//选择的分类id数组，用于选中分类tree
          saveSettleData('bussinessInfo', JSON.stringify(business_info));//经营信息存缓存
          this.setState({
            detail: result,
          });
        } else {
          message.error(res.msg);
        }
      },
    });
  };

  columns_store_grade = [];
  columns_apply_cat = [{
    title: `${sldComLanguage('一级类目')}`,
    dataIndex: 'goodsCateName1',
    align: 'center',
    width: 100,
  }, {
    title: `${sldComLanguage('二级类目')}`,
    dataIndex: 'goodsCateName2',
    align: 'center',
    width: 100,
  }, {
    title: `${sldComLanguage('三级类目')}`,
    dataIndex: 'goodsCateName3',
    align: 'center',
    width: 100,
  }, {
    title: `${sldComLanguage('佣金比例')}`,
    dataIndex: 'scaling',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return (text*100).toFixed(1)+'%'
    },
  }];

  //支付方式的选择事件
  handlePayMethod = (e) => {
    this.setState({ pay_method: e.target.value });
  };

  //支付
  goPay = () => {
    const { pay_method, apply_progress } = this.state;
    this.props.dispatch({
      type: 'settled/register_pay',
      payload: { payMethod: pay_method, paySn: apply_progress.paySn },
      callback: res => {
        if (res.state == 200) {
          if (pay_method == 'alipay') {
            document.write(res.data.payData);//自动提交表单数据
          } else if (pay_method == 'wx') {
            this.setState({
              modalVisible: true,
              wx_pay_qrcode: 'data:image/png;base64,' + res.data.payData,//微信支付二维码
            });
            // 定时查询是否支付成功
            let _this = this;
            if(!this.timer){
              this.timer = setInterval(() => {
                _this.queryPayState();
              }, 5000);
            }
          }
        }
      },
    });
  };

  // 定时查询是否支付成功
  queryPayState = () => {
    this.getProgress();
  };

  //刷新微信支付二维码
  refreshWxQrcode = () => {
    this.goPay();
  };

  //修改信息
  changeInfo = () => {
    router.push(`/apply/base_info`);
  };

  //进入店铺
  goStore = () => {
    router.replace(`/user/login`);
  };

  sldCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldConfirm = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { detail, store_pay_data, pay_method, modalVisible, submiting, wx_pay_qrcode, apply_progress } = this.state;
    return (
      <div style={{ flex: 1, background: '#FFF' }}>
        <div className={`${global.flex_column_star_start} ${styles.title}`}>
          {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('店铺入驻结果')}`, 0, 0, 10)}
          {getSldHorLine(1)}
        </div>
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 150}>
          <div className={styles.commen_wrap}>
            {apply_progress.applyStep == 1 &&
            <img className={styles.apply_state_img} src={state_img_data.apply_pending}/>}
            {(apply_progress.applyStep == 2 || apply_progress.applyStep == 4) &&
            <img className={styles.apply_state_img} src={state_img_data.apply_success}/>}
            {apply_progress.applyStep == 3 && <img className={styles.apply_state_img} src={state_img_data.apply_fail}/>}
            <p className={styles.apply_state_con}>{apply_progress.stateValue}</p>

            {apply_progress.applyStep == 3 &&
            <div className={`${styles.check_fail_wrap} ${global.flex_column_center_center}`}>
              <p>{sldComLanguage('审核拒绝原因：')}{apply_progress.refuseReason}</p>
              {apply_progress.auditInfo && <p>{sldComLanguage('备注：')}{apply_progress.auditInfo}</p>}
            </div>
            }

            <div style={{ height: 1 }} className={styles.split_line}></div>
            {/* 待付款2 start */}
            {apply_progress.applyStep == 2 &&
            <div>
              <div className={styles.settle_pay}>
                <Radio.Group onChange={this.handlePayMethod} value={pay_method}>
                  <Radio value={'alipay'}>
                    <div className={`${styles.pay_item} ${global.flex_row_center_center} ${styles.pay_item_mr}`}>
                      <img className={styles.pay_item_img} src={require('@/assets/alipay.png')}/>
                    </div>
                  </Radio>
                  <Radio value={'wx'}>
                    <div className={`${styles.pay_item} ${global.flex_row_center_center}`}>
                      <img className={styles.pay_item_img} src={require('@/assets/wx.png')}/>
                    </div>
                  </Radio>
                </Radio.Group>
              </div>
              <div className={global.flex_column_center_center}>
                <div className={styles.pay_line}/>
                <a className={styles.go_pay} onClick={() => this.goPay()}>{sldComLanguage('立即付款')}</a>
              </div>
            </div>
            }
            {/* 待付款2 end */}
            {/* 待审核1和待付款2的付款清单和经营类型信息 start */}
            {(apply_progress.applyStep == 1 || apply_progress.applyStep == 2) &&
            <div>
              <div>
                <p className={`${global.flex_row_start_center} ${styles.table_title}`}>{sldComLanguage('付费清单列表')}</p>
                <div>
                  <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                                  data={store_pay_data}/>
                </div>
              </div>
              <div>
                <p className={`${global.flex_row_start_center} ${styles.table_title}`}>{sldComLanguage('经营类目列表')}</p>
                <div className={`${global.flex_row_center_center}`}>
                  <Table bordered style={{ width: '100%' }} rowKey={'goodsCategoryId3'} pagination={false}
                         columns={this.columns_apply_cat}
                         dataSource={apply_progress.storeGoodsCateVOList} size={'small'}/>
                </div>
              </div>
            </div>
            }
            {/* 待审核1和待付款2的付款清单和经营类型信息 end */}

            <div className={global.flex_row_center_center}>
              {/* 审核拒绝3 start */}
              {apply_progress.applyStep == 3 &&
              <a className={styles.operate_btn} onClick={() => this.changeInfo()}>
                {sldComLanguage('修改信息')}
              </a>
              }
              {/* 审核拒绝3 end */}

              {/* 入驻完成4 start */}
              {apply_progress.applyStep == 4 &&
              <a className={styles.operate_btn} onClick={() => this.goStore()}>
                {sldComLanguage('进入商户后台')}
              </a>
              }
              {/* 入驻完成4 end */}
            </div>
          </div>
        </Scrollbars>
        {/* 微信支付弹框 start */}
        <Modal
          destroyOnClose={true}
          maskClosable={false}
          title={`${sldComLanguage('微信支付')}`}
          zIndex={999}
          width={400}
          visible={modalVisible}
          onOk={this.sldConfirm}
          onCancel={this.sldCancle}
          footer={[
            <Button key="back" onClick={this.sldCancle}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldConfirm}>
              {sldComLanguage('已支付')}
            </Button>,
          ]}
        >
          <div className={`${global.flex_column_center_center} ${styles.wx_pay_qrcode}`}>
            <img src={wx_pay_qrcode}/>
            <p className={styles.pay_tip}>{sldComLanguage('使用')}<span style={{ color: '#228AFF' }}>{sldComLanguage('微信APP')}</span>{sldComLanguage('扫码支付')}</p>
            <a className={styles.wx_refresh} onClick={() => this.refreshWxQrcode()}>{sldComLanguage('刷新')}</a>
          </div>
        </Modal>
        {/* 微信支付弹框 end */}
      </div>
    );
  }
}
