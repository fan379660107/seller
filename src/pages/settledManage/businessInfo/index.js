/*
* 商户入驻——经营信息
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Button, message } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
  saveSettleData,
  getSettleData,
  getSldEmptyH,
  sucTip,
  failTip,
  list_com_page_more,
} from '@/utils/utils';
import styles from './index.less';

import SldTableRowThree from '@/components/SldTableRowThree';
import { Scrollbars } from 'react-custom-scrollbars';

@connect(({ settled,project }) => ({
  settled,project
}))
@Form.create()
export default class BusinessInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //经营信息
      base_info: [
        {
          type: 'input',
          label: `${sldComLanguage('店铺名称')}`,
          name: 'storeName',
          placeholder: `${sldComLanguage('请输入店铺名称,最多10个字')}`,
          initialValue: '',
          required: true,
          maxLength:10,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入店铺名称')}`,
          }],
        },
      ],
      store_grade_data:[{
        type: 'scroll_table',
        label: `${sldComLanguage('店铺等级')}`,
        name: 'grade',
        data:[],
        width:600,
        columns:this.store_grade_column,
        rowKey:'gradeId',
        item_height: 300,
        scroll_height:200,
        required: true,
        handleSelectRows:this.handleSelectGrade,
        selectedRows:this.selectedRows,
        selectedRowKeys:this.selectedRowKeys,
      }],//店铺等级数据
      open_time_data:[{
        type: 'select',
        label: `${sldComLanguage('开店时长')}`,
        name: 'applyYear',
        placeholder: `${sldComLanguage('请选择开店时长')}`,
        sel_data: [],
        required: true,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择开店时长')}`,
        }],
      }],//开店时长
      select_cat:[{
        width:200,
        type: 'select_cat',
        label: `${sldComLanguage('经营类型')}`,
        name: 'goodsCategoryIds',
        item_height: 300,
        placeholder: ``,
        tree_data: [],
        selected_keys:[],//选择的key数组
        onCheck:this.handleCatCheck,
        required: true,
      }],//选择经营类目
      company_qualification: {},

    };
  }

  store_grade_column = [
    {
      title: `${sldComLanguage('店铺等级')}`,//店铺等级
      dataIndex: 'gradeName',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('可发布商品')}`,//可发布商品
      dataIndex: 'goodsLimit',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('可推荐商品')}`,//可推荐商品
      dataIndex: 'recommendLimit',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('收费标准')}`,//收费标准
      dataIndex: 'price',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('申请说明')}`,//申请说明
      dataIndex: 'description',
      align: 'center',
      width: 200,
    },
  ];
  select_cat_id = [];//选择的分类id数组，格式：1级-2级-3级
  selectedRows = [];
  selectedRowKeys = [];

  async componentDidMount () {
    this.getStoreGrade();
    this.getStoreOpenTime();
    await this.getSystemCat()
    this.initData();
  }

  //选择分类事件
  handleCatCheck = (checkedKeys, e) => {
    let {select_cat} = this.state;
    this.select_cat_id = [];
    if(e.checkedNodes.length>0){
      e.checkedNodes.map(item_one=>{
        if(item_one.props.grade == 3){
          let tmp_data = item_one.props.path.split('/');
          this.select_cat_id.push(`${tmp_data[1]}-${tmp_data[2]}-${item_one.props.categoryId}`);
        }
      })
    }
    select_cat[0].selected_keys = checkedKeys;
    this.setState({select_cat})
  };

  //店铺等级选择
  handleSelectGrade = (rows, rowkeys) => {
    let {store_grade_data} = this.state;
    store_grade_data[0].selectedRows = rows;
    store_grade_data[0].selectedRowKeys = rowkeys;
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
      store_grade_data
    });
  }

  //获取店铺等级
  getStoreGrade = () => {
    let {store_grade_data} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'settled/get_store_grade',
      payload: {pageSize:list_com_page_more},
      callback: (res) => {
        if (res.state == 200) {
          store_grade_data[0].data = res.data.list;
          this.setState({
            store_grade_data
          });
        }
      },
    });
  }

  //获取开店时长列表
  getStoreOpenTime = () => {
    let {open_time_data} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'settled/get_store_open_time',
      callback: (res) => {
        if (res.state == 200) {
          let tmp_data = [];
          res.data.map(item=>{
            tmp_data.push({key:item,name:item+'年'})
          });
          open_time_data[0].sel_data = tmp_data
          this.setState({
            open_time_data
          });
        }
      },
    });
  }

  //获取平台分类
  getSystemCat = async() => {
    let {select_cat} = this.state;
    const { dispatch } = this.props;
    await dispatch({
      type: 'project/get_system_cat_tree_grade3',
      callback: (res) => {
        if(res.state == 200){
          if (res.data.length > 0) {
            res.data.map(item => {
              item.key = item.categoryId;
              item.title = item.categoryName;
              if (item.children != null&&item.children.length>0) {
                item.children.map(second => {
                  second.key = second.categoryId;
                  second.title = second.categoryName;
                  if (second.children != null&&second.children.length>0) {
                    second.children.map(third => {
                      third.key = third.categoryId;
                      third.title = third.categoryName;
                    });
                  }else{
                    second.disableCheckbox = true;
                  }
                });
              }else{
                item.disableCheckbox = true;
              }
            });
          }
          select_cat[0].tree_data = res.data
        }
        this.setState({select_cat})
      },
    });
  }

  //初始化页面数据
  initData = () => {
    let tmp_data = getSettleData('bussinessInfo');
    let { base_info, store_grade_data, open_time_data,select_cat } = this.state;
    if (tmp_data) {
      base_info.map(item=>{
        item.initialValue = tmp_data[item.name];
      });

      store_grade_data[0].selectedRowKeys = [tmp_data.storeGradeId];
      store_grade_data[0].selectedRows =  store_grade_data[0].data.filter(item=>item.gradeId == tmp_data.storeGradeId);
      open_time_data.map(item=>{
        item.initialValue = tmp_data[item.name];
      });

      select_cat[0].selected_keys = tmp_data.sel_cat_id_array;
      this.select_cat_id = tmp_data.goodsCategoryIds.split(',');

      this.setState({
        base_info,
        store_grade_data,
        open_time_data,
        select_cat,
      });
    }
  };

  //下一步
  handleNextStep = (e) => {
    e.preventDefault();
    let {store_grade_data,select_cat} = this.state;
    const { dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = { ...values };
        if(store_grade_data[0].selectedRowKeys.length == 0){
          failTip(`${sldComLanguage('请选择店铺等级～')}`);
          return false;
        }
        if(this.select_cat_id.length == 0){
          failTip(`${sldComLanguage('请选择经营类型～')}`);
          return false;
        }
        params.goodsCategoryIds = this.select_cat_id.join(',');//申请分类id字符串,例1级-2级-3级;1级-2级-3级
        params.storeGradeId = store_grade_data[0].selectedRowKeys[0];//店铺等级
        let base_info = JSON.parse(localStorage.getItem('baseInfo').replace(/&quot;/g,"\""));
        saveSettleData('bussinessInfo', JSON.stringify({...params,sel_cat_id_array:select_cat[0].selected_keys}));//经营信息存缓存
        let tar_params = {...params};
        tar_params.companyAddress = base_info.companyAddress;//公司详细地址
        tar_params.companyProvinceCode = base_info.companyProvinceCode;//企业注册省编码
        tar_params.companyCityCode = base_info.companyCityCode;//	企业注册市编码
        tar_params.companyAreaCode = base_info.companyAreaCode;//企业注册区编码
        tar_params.areaInfo = base_info.areaInfo;//省市区名称
        tar_params.contactName = base_info.contactName;//联系人姓名
        tar_params.contactPhone = base_info.contactPhone;//联系人电话
        tar_params.enterType = base_info.enterType;//入驻类型：0-个人入驻，1-企业入驻
        tar_params.personCardDown = base_info.personCardDown;//身份证背面扫描件
        tar_params.personCardUp = base_info.personCardUp;//身份证正面扫描件
        if(tar_params.enterType == 1){
          //企业入驻
          tar_params.companyName = base_info.companyName;//公司名称
          tar_params.businessLicenseImage = base_info.businessLicenseImage;//营业执照扫描件,企业入驻时必传
          tar_params.moreQualification1 = base_info.moreQualification1?base_info.moreQualification1:'';//补充认证一
          tar_params.moreQualification2 = base_info.moreQualification2?base_info.moreQualification2:'';//补充认证二
          tar_params.moreQualification3 = base_info.moreQualification3?base_info.moreQualification3:'';//补充认证三
        }
        //只有小于当前的才需要更新
        if(getSettleData('cur_step')*1 < 3){
          saveSettleData('cur_step', 3);
        }
        dispatch({
          type: 'settled/save_apply',
          payload: tar_params,
          callback: res => {
            if (res.state == 200) {
              saveSettleData('cur_step', 3);
              message.success(res.msg);
              setTimeout(() => {
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
      open_time_data,
      store_grade_data,
      select_cat,
    } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <div className={styles.title}>
          {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('经营信息')}`, 0, 0, 5)}
        </div>
        {getSldEmptyH(10)}
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 130}>
        <div className={styles.commen_wrap}>
          <SldTableRowThree form={this.props.form} data={base_info}/>
          <SldTableRowThree form={this.props.form} data={store_grade_data}/>
          <SldTableRowThree form={this.props.form} data={open_time_data}/>
          <SldTableRowThree form={this.props.form} data={select_cat}/>
          {((getSettleData('state')&&getSettleData('state')==3)||!getSettleData('state'))&&
          <div className={styles.commen_wrap} style={{borderTopRightRadius:0,borderTopLeftRadius:0,marginTop:-30,paddingBottom:20,textAlign:'center'}}>
            <Button type='primary' onClick={this.handleNextStep} className={styles.next_step}>提交</Button>
          </div>
          }
        </div>
          {getSldEmptyH(10)}
        </Scrollbars>
      </div>
    );
  }
}
