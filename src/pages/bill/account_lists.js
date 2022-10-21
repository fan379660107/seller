import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Switch } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  getTableNum,
  sldComLanguage,
  sldtbaleOpeBtnText,
  sldPopConfirmDiy,
  sldLlineRtextAddGoodsAddMargin,
  validatorNumber,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import areaData from '@/assets/area.json';

let pageSize = list_com_page_size_10;
let sthis = '';
@connect(({ bill, common }) => ({
  bill,
  common,
}))
@Form.create()
export default class AccountLists extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      resetFlag: false,//sldmodal组件是否需要resetFiled
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      addressType: props.type,//地址类型：1-发货地址；2-收货地址
      type: 'add',
      params: { pageSize: pageSize },//搜索条件
      upload_img_info: {},//上传的图片信息
      operateData: [],//操作的数据
      addData: [{
        type: 'radio',
        label: `${sldComLanguage('账号类型')}`,
        name: 'accountType',
        placeholder: '',
        sel_data: [
          { name: `${sldComLanguage('银行账号')}`, key: 1 },
          { name: `${sldComLanguage('支付宝账号')}`, key: 2 },
        ],
        initialValue: 1,
        onChange: this.handleAccountType,
      },
      ],//modal框的数据
      formValues: {},//搜索条件、
      columns: [
        {
          title: ' ',
          dataIndex: 'accountId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('结算账号')}`,
          dataIndex: 'billNumber',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('账户类型')}`,
          dataIndex: 'accountTypeValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('默认账号')}`,
          dataIndex: 'isDefault',
          align: 'center',
          width: 80,
          render: (text, record) => (
            <Switch
              onChange={(checked) => this.operate({
                accountId: record.accountId,
                isDefault: checked ? 1 : 0,
              }, 'set_default')}
              checked={text == 1 ? true : false}
              valuepropname={'checked'}/>
          ),
        },
        {
          title: `${sldComLanguage('操作')}`,
          width: 100,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {sldtbaleOpeBtnText('编辑', () => this.edit(record))}
              <span className={global.splitLine}></span>
              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operate(record.accountId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText('删除', () => null))}
            </Fragment>
          ),
        },
      ],
    };
  }

  bankAccount = [{
    type: 'input',
    label: `${sldComLanguage('银行开户名')}`,
    name: 'bankAccountName',
    placeholder: `${sldComLanguage('请输入银行开户名')}`,
    extra: `${sldComLanguage('最多输入50个字')}`,
    initialValue: '',
    maxLength: 50,
    rules: [{
      required: true,
      whitespace: true,
      message: `${sldComLanguage('请输入银行开户名')}`,
    }],
  }, {
    type: 'input',
    label: `${sldComLanguage('公司银行账号')}`,
    name: 'bankAccountNumber',
    placeholder: `${sldComLanguage('请输入公司银行账号')}`,
    extra: `${sldComLanguage('最多输入30位数字')}`,
    initialValue: '',
    maxLength: 30,
    rules: [{
      required: true,
      message: `${sldComLanguage('请输入公司银行账号')}`,
    }, { validator: (rule, value, callback) => validatorNumber(rule, value, callback) }],
  }, {
    type: 'input',
    label: `${sldComLanguage('开户银行')}`,
    name: 'bankBranch',
    placeholder: `${sldComLanguage('请输入开户银行名称')}`,
    extra: `${sldComLanguage('最多输入30字')}`,
    initialValue: '',
    maxLength: 30,
    rules: [{
      required: true,
      whitespace: true,
      message: `${sldComLanguage('请输入开户银行名称')}`,
    }],
  }, {
    type: 'cascader_common',
    label: `${sldComLanguage('开户行所在地')}`,
    name: 'area',
    data: areaData,//三级地址
    fieldNames: { label: 'regionName', value: 'regionCode', children: 'children' },
    placeholder: `${sldComLanguage('请选择开户行所在地')}`,
    initialValue: [],
    onChange: this.getAreaInfo,
    rules: [{
      required: true,
      message: `${sldComLanguage('请选择开户行所在地')}`,
    }],
  },
    {
      type: 'switch',
      label: `${sldComLanguage('设为默认')}`,
      name: 'isDefault',
      placeholder: ``,
      initialValue: 1,
    }];//银行账号
  alipayAccount = [{
    type: 'input',
    label: `${sldComLanguage('支付宝姓名')}`,
    name: 'alipayName',
    placeholder: `${sldComLanguage('请输入支付宝姓名')}`,
    extra: `${sldComLanguage('最多输入10字')}`,
    initialValue: '',
    maxLength: 10,
    rules: [{
      required: true,
      whitespace: true,
      message: `${sldComLanguage('请输入支付宝姓名')}`,
    }],
  }, {
    type: 'input',
    label: `${sldComLanguage('支付宝账号')}`,
    name: 'alipayAccount',
    placeholder: `${sldComLanguage('请输入支付宝账号')}`,
    extra: `${sldComLanguage('最多输入30字')}`,
    initialValue: '',
    maxLength: 30,
    rules: [{
      required: true,
      whitespace: true,
      message: `${sldComLanguage('请输入支付宝账号')}`,
    }, {
      pattern: /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/,
      message: `${sldComLanguage('请输入正确的支付宝账号')}`,
    }],
  }, {
    type: 'switch',
    label: `${sldComLanguage('设为默认')}`,
    name: 'isDefault',
    placeholder: ``,
    initialValue: 1,
  }];//支付宝账号

  cur_edit_id = '';//当前操作数据id
  cur_edit_info = '';//当前操作数据的信息
  sel_area_name = '';//选择的地区名称
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  //编辑结算账号
  edit = (val) => {
    let { addData, operateData } = this.state;
    operateData = JSON.parse(JSON.stringify(addData));
    if (val.accountType == 1) {
      //银行账号
      operateData = operateData.concat(JSON.parse(JSON.stringify(this.bankAccount)));
      for (let i in operateData) {
        operateData[i].initialValue = val[operateData[i].name];
        if (operateData[i].name == 'accountType') {
          operateData[i].onChange = function(val) {
            sthis.handleAccountType(val);
          };
        } else if (operateData[i].name == 'bankAccountNumber') {
          operateData[i].rules = [{
            required: true,
            message: `${sldComLanguage('请输入公司银行账号')}`,
          }, { validator: (rule, value, callback) => validatorNumber(rule, value, callback) }];
        } else if (operateData[i].name == 'area') {
          operateData[i].onChange = function(val) {
            sthis.getAreaInfo(val);
          };
          let tmp_area_code = [];
          let tmp_key = ['provinceCode', 'cityCode', 'districtCode'];
          for (let i in tmp_key) {
            if (tmp_key[i] != undefined && tmp_key[i]) {
              tmp_area_code.push(val[tmp_key[i]]);
            }
          }
          operateData[i].initialValue = tmp_area_code;
          this.sel_area_name = val.addressAll;
        }
      }
    } else {
      //支付宝账号
      operateData = operateData.concat(JSON.parse(JSON.stringify(this.alipayAccount)));
      for (let i in operateData) {
        operateData[i].initialValue = val[operateData[i].name];
        if (operateData[i].name == 'accountType') {
          operateData[i].onChange = function(val) {
            sthis.handleAccountType(val);
          };
        } else if (operateData[i].name == 'alipayAccount') {
          operateData[i].rules = [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入支付宝账号')}`,
          }, {
            pattern: /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/,
            message: `${sldComLanguage('请输入正确的支付宝账号')}`,
          }];
        }
      }
    }
    this.cur_edit_id = val.accountId;//当前操作数据id
    this.cur_edit_info = val;//当前操作数据的信息
    this.setState({
      resetFlag: false,
      type: 'edit',
      title: `${sldComLanguage('编辑结算账号')}`,
      operateData,
      modalVisible: true,
    });//编辑结算账号
  };

  //账号类型的切换事件
  handleAccountType = (val) => {
    let { addData, operateData, type } = this.state;
    operateData = JSON.parse(JSON.stringify(addData));
    if (val == 1) {
      operateData = operateData.concat(JSON.parse(JSON.stringify(this.bankAccount)));
      for (let i in operateData) {
        if (operateData[i].name == 'accountType') {
          operateData[i].initialValue = val;
          operateData[i].onChange = function(val) {
            sthis.handleAccountType(val);
          };
        } else if (operateData[i].name == 'area') {
          operateData[i].onChange = function(val) {
            sthis.getAreaInfo(val);
          };
        }
      }
    } else if (val == 2) {
      operateData = operateData.concat(JSON.parse(JSON.stringify(this.alipayAccount)));
      for (let i in operateData) {
        if (operateData[i].name == 'accountType') {
          operateData[i].initialValue = val;
          operateData[i].onChange = function(val) {
            sthis.handleAccountType(val);
          };
        } else if (operateData[i].name == 'alipayAccount') {
          operateData[i].rules = [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入支付宝账号')}`,
          }, {
            pattern: /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/,
            message: `${sldComLanguage('请输入正确的支付宝账号')}`,
          }];
        }
      }
    }
    //如果是编辑的话,而且账号类型一样的话，原先的值要显示
    if(type == 'edit'&&val == this.cur_edit_info.accountType){
      for (let i in operateData) {
        operateData[i].initialValue = this.cur_edit_info[operateData[i].name];
        if (operateData[i].name == 'area') {
          let tmp_area_code = [];
          let tmp_key = ['provinceCode', 'cityCode', 'districtCode'];
          for (let i in tmp_key) {
            if (tmp_key[i] != undefined && tmp_key[i]) {
              tmp_area_code.push(this.cur_edit_info[tmp_key[i]]);
            }
          }
          operateData[i].initialValue = tmp_area_code;
          this.sel_area_name = this.cur_edit_info.addressAll;
        }
      }
    }
    this.setState({
      operateData,
      resetFlag:true,
    },()=>{
      setTimeout(() => {
        this.setState({resetFlag:false,})
      }, 500);
    });
  };

  //结算账号操作  del：删除 edit：编辑 set_default：设置默认地址
  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'bill/del_account';
      param_data.accountId = id;
    } else if (type == 'edit') {
      dis_type = 'bill/edit_account';
      param_data = id;
    } else if (type == 'set_default') {
      dis_type = 'bill/set_account_default';
      param_data = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({ modalVisible: false });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //添加结算账号
  add = () => {
    let { addData, operateData } = this.state;
    operateData = JSON.parse(JSON.stringify(addData));
    operateData = operateData.concat(JSON.parse(JSON.stringify(this.bankAccount)));
    for (let i in operateData) {
      if (operateData[i].name == 'accountType') {
        operateData[i].onChange = function(val) {
          sthis.handleAccountType(val);
        };
      } else if (operateData[i].name == 'bankAccountNumber') {
        operateData[i].rules = [{
          required: true,
          message: `${sldComLanguage('请输入公司银行账号')}`,
        }, { validator: (rule, value, callback) => validatorNumber(rule, value, callback) }];
      } else if (operateData[i].name == 'area') {
        operateData[i].onChange = function(val) {
          sthis.getAreaInfo(val);
        };
      }
    }
    this.setState({
      resetFlag: false,
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('新增结算账号')}`,
      operateData,
    });//添加结算账号
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/get_account_lists',
      payload: { ...params },
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if ((res.data.list == null || res.data.list.length == 0) && this.state.params.current > 1) {
            params.current = params.current - 1;
            this.get_list(params);
          } else {
            this.setState({
              data: res.data,
            });
          }
        }
      },
    });
  };

  handleSelectRows = (rows, rowkeys) => {
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
    });
  };

  handleTablePagination = (pagination, filtersArg, sorter, type = 'main') => {
    const { formValues } = this.state;
    if (type == 'main') {
      const params = sldHandlePaginationData(pagination, filtersArg, sorter, formValues);
      pageSize = params.pageSize;
      this.setState({ params });
      this.get_list(params);
    }
  };


  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  //获取地址信息
  getAreaInfo = (area) => {
    for (let i in area) {
      this.sel_area_name += area[i].regionName;
    }
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldHandleConfirm = (val) => {
    const { addressType, type } = this.state;
    const { dispatch } = this.props;
    let _this = this;
    if (val.accountType == 1) {
      if (val.area) {
        val.provinceCode = val.area[0] != undefined ? val.area[0] : '';
        val.cityCode = val.area[1] != undefined ? val.area[1] : '';
        val.districtCode = val.area[2] != undefined ? val.area[2] : '';
        delete val.area;
      }
      val.addressAll = this.sel_area_name;
    }
    val.isDefault = val.isDefault ? 1 : 0;
    this.setState({ submiting: true });
    if (type == 'edit') {
      val.accountId = this.cur_edit_id;
      this.operate(val, 'edit');
    } else {
      val.type = addressType;
      dispatch({
        type: 'bill/add_account',
        payload: val,
        callback: (res) => {
          if (res.state == 200) {
            sucTip(res.msg);
            _this.get_list({ pageSize: pageSize });
            this.setState({
              modalVisible: false,
            });
          } else {
            failTip(res.msg);
          }
          this.setState({ submiting: false });
        },
      });
    }
  };

  render() {
    const { selectedRows, columns, initLoading, data, submiting, operateData, modalVisible, title, resetFlag } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('结算账号')}`, 0, 0, 10)}
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.add(), `${sldComLanguage('新增结算账号')}`, 7, 7)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 150 - 15}
            selectedRows={selectedRows}
            data={data}
            rowKey={'accountId'}
            isCheck={false}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            onSldHandleSeleRow={this.onSldHandleSeleRow}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
          />
          {/*标准表格-end*/}

        </Spin>
        {/*新增/编辑对话框-start*/}
        <SldModal
          title={title}
          submiting={submiting}
          width={500}
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={operateData}
          resetFlag={resetFlag}
        />
        {/*新增/编辑对话框-end*/}
      </div>
    );
  }
}
