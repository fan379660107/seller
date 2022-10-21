import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  validatorMemPwd,
  sldSearchValClear,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  getTableNum,
  sldComLanguage,
  sldPopConfirmDiy,
  list_com_page_more,
  validatorVendorEmail,
  sldtbaleOpeBtnText,
  mobile_reg,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';

let pageSize = list_com_page_size_10;
@connect(({ account }) => ({
  account,
}))
@Form.create()
export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_con: '',
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      operateData: [],
      addData: [{
        type: 'input',
        label: `${sldComLanguage('商户帐号')}`,
        name: 'vendorName',
        extra: `${sldComLanguage('最多输入10位')}`,
        maxLength: 10,
        placeholder: `${sldComLanguage('请输入商户帐号')}`,
        initialValue: '',
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入商户帐号')}`,
        }],
      }, {
        type: 'input',
        label: `${sldComLanguage('登录密码')}`,
        input_type: 'password',
        name: 'vendorPassword',
        placeholder: `${sldComLanguage('请设置6-20位的登录密码')}`,
        initialValue: '',
        maxLength: 20,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请设置登录密码')}`,
        }, { validator: (rule, value, callback) => validatorMemPwd(rule, value, callback) }],
      },
        {
          type: 'input',
          label: `${sldComLanguage('确认密码')}`,
          input_type: 'password',
          name: 'confirmPassword',
          placeholder: `${sldComLanguage('确认密码需要与密码一致')}`,
          initialValue: '',
          maxLength: 20,
          rules: [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入确认密码')}`,
          }, { validator: (rule, value, callback) => validatorMemPwd(rule, value, callback) }],
        }, {
          type: 'input',
          label: `${sldComLanguage('手机号')}`,
          name: 'vendorMobile',
          placeholder: `${sldComLanguage('请输入手机号')}`,
          initialValue: '',
          maxLength: 11,
          rules: [{
            required: true,
            message: `${sldComLanguage('请输入手机号')}`,
          }, {
            pattern: mobile_reg,
            message: `${sldComLanguage('请输入正确的手机号')}`,
          }],
        }, {
          type: 'input',
          label: `${sldComLanguage('邮箱')}`,
          name: 'vendorEmail',
          placeholder: `${sldComLanguage('请输入邮箱')}`,
          extra: `${sldComLanguage('请输入正确的邮箱')}`,
          initialValue: '',
          rules: [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入邮箱')}`,
          }, { validator: (rule, value, callback) => validatorVendorEmail(rule, value, callback) }],
        }, {
          type: 'select',
          label: `${sldComLanguage('权限组')}`,
          name: 'rolesId',
          placeholder: `${sldComLanguage('请选择权限组')}`,
          sel_data: [],
          sele_key: 'rolesId',
          sele_name: 'rolesName',
          diy: true,
          rules: [{
            required: true,
            message: `${sldComLanguage('请选择权限组')}`,
          }],
        }],//modal框的数据
      formValues: {},//搜索条件、
      changePwdData: [{
        type: 'input',
        label: `${sldComLanguage('登录密码')}`,
        input_type: 'password',
        name: 'vendorPassword',
        placeholder: `${sldComLanguage('请设置6-20位的登录密码')}`,
        initialValue: '',
        maxLength: 20,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请设置登录密码')}`,
        }, { validator: (rule, value, callback) => validatorMemPwd(rule, value, callback) }],
      },
        {
          type: 'input',
          label: `${sldComLanguage('确认密码')}`,
          input_type: 'password',
          name: 'confirmPassword',
          placeholder: `${sldComLanguage('确认密码需要与密码一致')}`,
          initialValue: '',
          maxLength: 20,
          rules: [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入确认密码')}`,
          }, { validator: (rule, value, callback) => validatorMemPwd(rule, value, callback) }],
        }],
      columns: [
        {
          title: ' ',
          dataIndex: 'vendorId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('账号')}`,
          dataIndex: 'vendorName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('所属权限组')}`,
          dataIndex: 'rolesName',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('手机号')}`,
          dataIndex: 'vendorMobile',
          align: 'center',
          width: 150,
        }, {
          title: `${sldComLanguage('邮箱')}`,
          dataIndex: 'vendorEmail',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('创建时间')}`,
          dataIndex: 'registerTime',
          align: 'center',
          width: 150,
        }, {
          title: `${sldComLanguage('状态')}`,
          dataIndex: 'isAllowLoginValue',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 150,
          render: (text, record) => (
            record.isStoreAdmin == 0 ? <div>
              {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editAdminMember(record))}
              <span className={global.splitLine}></span>
              {record.isAllowLogin == 1 &&
              <Fragment>
                {
                  sldtbaleOpeBtnText(`${sldComLanguage('冻结')}`, () => this.operateAdminMember({
                    vendorId: record.vendorId,
                    isFreeze: true,
                  }, 'freeze'))
                }
                <span className={global.splitLine}></span>
              </Fragment>
              }
              {record.isAllowLogin == 0 &&
              <Fragment>
                {
                  sldtbaleOpeBtnText(`${sldComLanguage('解冻')}`, () => this.operateAdminMember({
                    vendorId: record.vendorId,
                    isFreeze: false,
                  }, 'freeze'))//解冻
                }
                <span className={global.splitLine}></span>
              </Fragment>
              }
              {
                sldtbaleOpeBtnText(`${sldComLanguage('重置密码')}`, () => this.changePwd(record))
              }
              <span className={global.splitLine}></span>
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateAdminMember(record.vendorId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
            </div> : '--'
          ),
        },
      ],
    };
  }

  cur_edit_id = '';//当前操作数据id
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.get_role_list({ pageSize: list_com_page_more });
  }

  //修改密码
  changePwd = (val) => {
    let { changePwdData } = this.state;
    let operateData = [...changePwdData];
    this.cur_edit_id = val.vendorId;
    this.setState({ type: 'changePwd', title: `${sldComLanguage('重置密码')}`, operateData, modalVisible: true });
  };

  //编辑子账号
  editAdminMember = (val) => {
    let { addData, operateData } = this.state;
    operateData = [...addData];
    operateData = operateData.filter(item => item.input_type != 'password');
    for (let i in operateData) {
      operateData[i].initialValue = val[operateData[i].name];
    }
    this.cur_edit_id = val.vendorId;//当前操作数据id
    this.setState({
      type: 'edit',
      title: `${sldComLanguage('编辑子账号')}`,
      operateData,
      modalVisible: true,
    });//编辑子账号
  };

  //子账号操作  del：删除 edit: 编辑 freeze 冻结
  operateAdminMember = (id, type) => {
    this.setState({ submiting: true });
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    param_data.csrfToken = localStorage.getItem('csrfToken');
    if (type == 'del') {
      dis_type = 'account/del_admin_member';
      param_data = { vendorId: id };
    } else if (type == 'edit') {
      dis_type = 'account/edit_admin_member';
      param_data = id;
    } else if (type == 'freeze') {
      dis_type = 'account/freeze_admin_member';
      param_data = id;
    } else if (type == 'changePwd') {
      dis_type = 'account/reset_admin_member_pwd';
      param_data = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.setState({
            modalVisible: false,
          });
          this.get_list(params);
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //添加子账号
  addAdminMember = () => {
    let { addData, operateData } = this.state;
    operateData = [...addData];
    operateData = operateData.filter(item => item.input_type != 'password');
    for (let i = 0; i < operateData.length; i++) {
      if (operateData[i].name == 'vendorName') {
        operateData.splice(i + 1, 0, {
          type: 'input',
          label: `${sldComLanguage('登录密码')}`,
          input_type: 'password',
          name: 'vendorPassword',
          placeholder: `${sldComLanguage('请设置6-20位的登录密码')}`,
          initialValue: '',
          maxLength: 20,
          rules: [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请设置登录密码')}`,
          }, { validator: (rule, value, callback) => validatorMemPwd(rule, value, callback) }],
        });
        operateData.splice(i + 2, 0, {
          type: 'input',
          label: `${sldComLanguage('确认密码')}`,
          input_type: 'password',
          name: 'confirmPassword',
          placeholder: `${sldComLanguage('确认密码需要与密码一致')}`,
          initialValue: '',
          maxLength: 20,
          rules: [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入确认密码')}`,
          }, { validator: (rule, value, callback) => validatorMemPwd(rule, value, callback) }],
        });
      }
      operateData[i].initialValue = '';
    }
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加子账号')}`,
      operateData: operateData,
    });//添加子账号
  };

  //获取权限组列表
  get_role_list = (params) => {
    const { dispatch } = this.props;
    let { addData } = this.state;
    dispatch({
      type: 'account/get_role_lists',
      payload: params,
      callback: (res) => {
        if (res.state == 200) {
          for (let i in addData) {
            if (addData[i].name == 'rolesId') {
              addData[i].sel_data = res.data.list;
              break;
            }
          }
          this.setState({ addData });
        }
      },
    });
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'account/get_admin_member',
      payload: params,
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if (res.data.list.length == 0 && this.state.params.current > 1) {
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


  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldHandleConfirm = (val) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    this.setState({ submiting: true });
    if (type == 'edit') {
      val.vendorId = this.cur_edit_id;
      this.operateAdminMember(val, 'edit');
    } else if (type == 'changePwd') {
      val.vendorId = this.cur_edit_id;
      if (val.vendorPassword != val.confirmPassword) {
        failTip(`${sldComLanguage('两次密码不一致，请重新输入')}`);
        this.setState({ submiting: false });
        return false;
      }
      val.newPassword = val.vendorPassword;
      val.newPasswordCfm = val.confirmPassword;
      this.operateAdminMember(val, 'changePwd');
    } else {
      dispatch({
        type: 'account/add_admin_member',
        payload: val,
        callback: (res) => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.get_list({ pageSize: pageSize });
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

  //搜索
  sldSearch = (val) => {
    this.setState({
      formValues: { vendorName: val,params: { pageSize: pageSize } },
    });
    this.get_list({ pageSize: pageSize, vendorName: val });
  };

  //搜索框内容的变化
  sldSearChange = (val) => {
    this.setState({
      search_con: val.target.value,
    });
  };

  //清空搜索内容
  sldSearClear = () => {
    this.setState({
      search_con: '',
    });
    this.sldSearch('');
  };

  render() {
    const { selectedRows, columns, initLoading, data, submiting, operateData, modalVisible, title, search_con } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, padding: '10px 0 0 0' }}>
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.addAdminMember(), `${sldComLanguage('新增子账号')}`, 7, 7)}
          {/*请输入子账号账号    搜索*/}
          {sldSearchValClear(`${sldComLanguage('请输入账号名称')}`, 291, this.sldSearch, `${sldComLanguage('搜索')}`, search_con, this.sldSearChange, this.sldSearClear, 65)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 180 - 15}
            selectedRows={selectedRows}
            data={data}
            rowKey={'vendorId'}
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
        />
        {/*新增/编辑对话框-end*/}
      </div>

    );
  }
}
