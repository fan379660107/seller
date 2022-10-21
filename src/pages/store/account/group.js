import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Button, Form, Modal, Spin, Checkbox } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  sldSearchValClear,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  getTableNum,
  sldComLanguage,
  sldPopConfirmDiy,
  sldtbaleOpeBtnText,
  getSldComShowMoreTtex,
} from '@/utils/utils';
import global from '@/global.less';
import account from '@/assets/css/account.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import { Scrollbars } from 'react-custom-scrollbars';

const CheckboxGroup = Checkbox.Group;
let pageSize = list_com_page_size_10;
@connect(({ account }) => ({
  account,
}))
@Form.create()
export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgData: [],//消息数据
      permissionData: [],//权限数据
      expandedKeys: [],
      autoExpandParent: true,
      modalMsgVisible: false,//消息设置弹框属性 false为关闭 true为显示，默认false
      checkedKeys: [],
      selectedKeys: [],
      permissionList: [],//权限数据
      search_con: '',
      initLoading: false,
      modalVisiblePer: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      addData: [{
        type: 'input',
        label: `${sldComLanguage('权限组名称')}`,
        name: 'rolesName',
        extra: `${sldComLanguage('最多输入10个字')}`,
        maxLength: 10,
        placeholder: `${sldComLanguage('请输入权限组名称')}`,
        initialValue: '',
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入权限组名称')}`,
        }],
      }, {
        type: 'textarea',
        label: `${sldComLanguage('权限组描述')}`,
        name: 'description',
        placeholder: `${sldComLanguage('请输入权限组描述')}`,
        initialValue: '',
        maxLength: 50,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入权限组描述')}`,
        }],
      },
      ],//modal框的数据
      formValues: {},//搜索条件
      columns: [
        {
          title: ' ',
          dataIndex: 'rolesId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('权限组名称')}`,
          dataIndex: 'rolesName',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('权限组描述')}`,
          dataIndex: 'description',
          align: 'center',
          width: 150,
          render: (text) => {
            return getSldComShowMoreTtex(text,30,200);
          },
        },
        {
          title: `${sldComLanguage('创建时间')}`,
          dataIndex: 'createTime',
          align: 'center',
          width: 150,
        }, {
          title: `${sldComLanguage('更新时间')}`,
          dataIndex: 'updateTime',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 130,
          render: (text, record) => (
            <Fragment>
              {record.isInner == 0
                ? <Fragment>
                  {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editRole(record))}
                  <span className={global.splitLine}></span>
                  {sldtbaleOpeBtnText(`${sldComLanguage('授权')}`, () => this.setPermission(record))}
                  <span className={global.splitLine}></span>
                  {sldtbaleOpeBtnText(`${sldComLanguage('接收消息')}`, () => this.setMsg(record))}
                  <span className={global.splitLine}></span>
                  {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateRole(record.rolesId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                    sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
                </Fragment>
                : '--'
              }
            </Fragment>
          ),
        },
      ],
    };
  }

  allMsgData = [];//消息类型初始数据
  allPermissionData = [];//全部权限初始数据
  cur_edit_id = '';//当前操作数据id
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.get_all_permission();
    this.get_all_msg_type();
  }

  //设置授权
  setPermission = (val) => {
    this.cur_edit_id = val.rolesId;//当前操作数据id
    let { permissionData } = this.state;
    permissionData = JSON.parse(JSON.stringify(this.allPermissionData));
    permissionData.map(item => {
      item.checkedList = [];
      item.children.map(child => {
        if (val.resourcesList.indexOf(child.value) > -1) {
          item.checkedList.push(child.value);
        }
      });
    });
    this.setState({
      permissionData,
      modalVisiblePer: true,
    });
  };

  //获取全部消息类型
  get_all_msg_type = () => {
    this.props.dispatch({
      type: 'account/get_msg_type_list',
      callback: (res) => {
        if (res.state == 200) {
          res.data.map(item => {
            item.label = item.tplName;
            item.value = item.tplCode;
            if (item.storeTplList.length) {
              item.storeTplList.map(child => {
                child.label = child.tplName;
                child.value = child.tplCode;
              });
            }
          });
          this.allMsgData = res.data;
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //编辑权限组
  editRole = (val) => {
    let { addData } = this.state;
    for (let i in addData) {
      addData[i].initialValue = val[addData[i].name];
    }
    this.cur_edit_id = val.rolesId;//当前操作数据id
    this.setState({
      type: 'edit',
      title: `${sldComLanguage('编辑权限组')}`,
      addData: addData,
      modalVisible: true,
    });//编辑权限组
  };

  //接收消息
  setMsg = (val) => {
    this.cur_edit_id = val.rolesId;//当前操作数据id
    let { msgData } = this.state;
    msgData = JSON.parse(JSON.stringify(this.allMsgData));
    msgData.map(item => {
      item.checkedList = [];
      item.storeTplList.map(child => {
        if (val.msgList.indexOf(child.value) > -1) {
          item.checkedList.push(child.value);
        }
      });
    });
    this.setState({
      msgData,
      modalMsgVisible: true,
    });
  };

  //权限组操作  del：删除 edit: 编辑
  operateRole = (id, type) => {
    this.setState({ submiting: true });
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'account/del_role';
      param_data = { rolesId: id };
    } else if (type == 'edit') {
      dis_type = 'account/edit_role';
      param_data = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({
            modalVisible: false,
          });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //添加权限组
  addRole = () => {
    let { addData } = this.state;
    for (let i in addData) {
      addData[i].initialValue = '';
    }
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加权限组')}`,
      addData: addData,
      checkedKeys: [],
    });//添加权限组
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'account/get_role_lists',
      payload: params,
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if (res.data.length == 0 && this.state.params.currentPage > 1) {
            params.currentPage = params.currentPage - 1;
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

  //获取数据列表
  get_all_permission = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/get_all_permission',
      callback: (res) => {
        if (res.state == 200) {
          res.data.list.map(item => {
            item.label = item.content;
            item.value = item.resourcesId;
            if (item.children != undefined && item.children.length) {
              item.children.map(child => {
                child.label = child.content;
                child.value = child.resourcesId;
              });
            }
          });
          this.allPermissionData = res.data.list;
        }
      },
    });
  };

  setDefaultExpandedKeys = (data) => {
    for (let i in data) {
      if (data[i].children != undefined && data[i].children.length > 0) {
        this.ExpandedKeys.push(data[i].resourcesId.toString());
        if (data[i].children.length > 0) {
          this.setDefaultExpandedKeys(data[i].children);
        }
      }
    }
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
      val.rolesId = this.cur_edit_id;
      this.operateRole(val, 'edit');
    } else {
      dispatch({
        type: 'account/add_role',
        payload: val,
        callback: (res) => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.get_list({ pageSize: pageSize });
            this.setState({
              modalVisible: false,
              params: { pageSize: pageSize },
              formValues: {},
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
      formValues: { rolesName: val, params: { pageSize: pageSize } },
    });
    this.get_list({ pageSize: pageSize, rolesName: val });
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

  //取消授权操作
  sldHandleCanclePer = () => {
    this.setState({ modalVisiblePer: false });
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  //消息的选择事件
  onMsgChange = (e, item, index) => {
    let { msgData } = this.state;
    msgData[index].checkedList = e;
    this.setState({ msgData });
  };

  //消息的全选/反选操作
  onMsgCheckAllChange = (e, item, index) => {
    let { msgData } = this.state;
    if (e.target.checked) {
      msgData[index].checkedList = [];
      item.storeTplList.map(child => {
        msgData[index].checkedList.push(child.tplCode);
      });
    } else {
      msgData[index].checkedList = [];
    }
    this.setState({ msgData });
  };

  //权限的选择事件
  onPerChange = (e, item, index) => {
    let { permissionData } = this.state;
    permissionData[index].checkedList = e;
    this.setState({ permissionData });
  };

  //权限的全选/反选操作
  onPerCheckAllChange = (e, item, index) => {
    let { permissionData } = this.state;
    if (e.target.checked) {
      permissionData[index].checkedList = [];
      item.children.map(child => {
        permissionData[index].checkedList.push(child.value);
      });
    } else {
      permissionData[index].checkedList = [];
    }
    this.setState({ permissionData });
  };

  //接收消息的确定事件
  sldMsgConfirm = () => {
    const { msgData } = this.state;
    const { dispatch } = this.props;
    let { params } = this.state;
    let tplCodes = [];
    msgData.map(item => {
      if (item.checkedList != undefined && item.checkedList.length > 0) {
        tplCodes = tplCodes.concat(item.checkedList);
      }
    });
    this.setState({ submiting: true });
    dispatch({
      type: 'account/bind_role_msg_type',
      payload: { roleId: this.cur_edit_id, tplCodes: tplCodes.join(',') },
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({
            modalMsgVisible: false,
          });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //授权确定操作
  sldHandleConfirmPer = () => {
    const { dispatch } = this.props;
    let { params, permissionData } = this.state;
    let resourceIds = [];
    permissionData.map(item => {
      if (item.checkedList != undefined && item.checkedList.length > 0) {
        resourceIds = resourceIds.concat(item.checkedList);
      }
    });
    this.setState({ submiting: true });
    dispatch({
      type: 'account/bind_role_permission',
      payload: { roleId: this.cur_edit_id, resourceIds: resourceIds.join(',') },
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({
            modalVisiblePer: false,
          });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });

  };

  //接收消息的取消事件
  sldMsgCancle = () => {
    this.setState({ modalMsgVisible: false });
  };

  render() {
    const { selectedRows, columns, initLoading, data, submiting, addData, modalVisible, title, search_con, modalVisiblePer, permissionList, msgData, modalMsgVisible, permissionData } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, padding: '10px 0 0 0' }}>
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.addRole(), `${sldComLanguage('新增权限组')}`, 7, 7)}
          {/*请输入权限组名称    搜索*/}
          {sldSearchValClear(`${sldComLanguage('请输入权限组名称')}`, 291, this.sldSearch, `${sldComLanguage('搜索')}`, search_con, this.sldSearChange, this.sldSearClear, 65)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 180 - 15}
            selectedRows={selectedRows}
            data={data}
            rowKey={'rolesId'}
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
          content={addData}
        />
        {/*新增/编辑对话框-end*/}
        {/*授权对话框-start*/}
        <SldModal
          title={`${sldComLanguage('授权')}`}
          width={500}
          submiting={submiting}
          modalVisible={modalVisiblePer}
          sldHandleConfirm={this.sldHandleConfirmPer}
          sldHandleCancle={this.sldHandleCanclePer}
          formItemLayoutModal={formItemLayoutModal}
          content={permissionList}
          java_permission={true}
          selectedKeys={this.state.selectedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          autoExpandParent={this.state.autoExpandParent}
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
        />
        {/*授权对话框-end*/}
        {/*消息设置对话框-start*/}
        <Modal
          destroyOnClose={true}
          maskClosable={false}
          title={'接收消息设置'}
          zIndex={9999}
          width={500}
          visible={modalMsgVisible}
          onOk={this.sldMsgConfirm}
          onCancel={this.sldMsgCancle}
          footer={[
            <Button key="back" onClick={this.sldMsgCancle}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldMsgConfirm}>
              {sldComLanguage('确定')}
            </Button>,
          ]}
        >
          <Scrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={document.body.clientHeight - 400}>
            <div className={`${global.flex_column_start_start}`} style={{ padding: 20 }}>
              {msgData.map((item, index) => {
                return <div key={index}
                            className={`${global.flex_column_start_start} ${index == (msgData.length - 1) ? null : account.msg_item_split}`}>
                  <Checkbox
                    indeterminate={item.checkedList != undefined && item.checkedList.length > 0 && item.checkedList.length < item.storeTplList.length ? true : false}
                    onChange={(e) => this.onMsgCheckAllChange(e, item, index)}
                    checked={item.checkedList != undefined && item.checkedList.length == item.storeTplList.length ? true : false}
                  >
                    <span style={{ fontWeight: 'bold' }}>{item.label}</span>
                  </Checkbox>
                  <br/>
                  <CheckboxGroup
                    options={item.storeTplList}
                    value={item.checkedList != undefined ? item.checkedList : []}
                    onChange={(e) => this.onMsgChange(e, item, index)}
                  />
                </div>;
              })}
            </div>
          </Scrollbars>
        </Modal>
        {/*消息设置对话框-end*/}
        {/*授权对话框-start*/}
        <Modal
          destroyOnClose={true}
          maskClosable={false}
          title={sldComLanguage('授权')}
          zIndex={9999}
          width={900}
          visible={modalVisiblePer}
          onOk={this.sldHandleConfirmPer}
          onCancel={this.sldHandleCanclePer}
          footer={[
            <Button key="back" onClick={this.sldHandleCanclePer}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldHandleConfirmPer}>
              {sldComLanguage('确定')}
            </Button>,
          ]}
        >
          <Scrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={document.body.clientHeight - 400}>
            <div className={`${global.flex_column_start_start}`} style={{ padding: 20 }}>
              {permissionData.map((item, index) => {
                return <div key={index}
                            className={`${global.flex_column_start_start} ${index == (permissionData.length - 1) ? null : account.msg_item_split}`}>
                  <Checkbox
                    indeterminate={item.checkedList != undefined && item.checkedList.length > 0 && item.checkedList.length < item.children.length ? true : false}
                    onChange={(e) => this.onPerCheckAllChange(e, item, index)}
                    checked={item.checkedList != undefined && item.checkedList.length == item.children.length ? true : false}
                  >
                    <span style={{ fontWeight: 'bold' }}>{item.label}</span>
                  </Checkbox>
                  <br/>
                  <CheckboxGroup
                    options={item.children}
                    value={item.checkedList != undefined ? item.checkedList : []}
                    onChange={(e) => this.onPerChange(e, item, index)}
                  />
                </div>;
              })}
            </div>
          </Scrollbars>
        </Modal>
        {/*授权对话框-end*/}
      </div>
    );
  }
}
