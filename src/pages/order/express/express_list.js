import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Switch } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  list_com_page_size_10,
  formItemLayoutModal,
  sldHandlePaginationData,
  dragSldTableColumn,
  getTableNum,
  sldComLanguage,
  sldPopConfirmDiy,
  sldtbaleOpeBtnText,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import Search from '@/components/Search/Search';
import AddExpress from './add_express';

let pageSize = list_com_page_size_10;
@connect(({ express }) => ({
  express,
}))
@Form.create()
export default class ExpressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expressType: 2,//快递类型，1-快递鸟，2-快递100
      addExpressFlag:1,
      modal_width: 700,//modal框宽度
      initLoading: false,
      addExpressModalVisible: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      addData: [{
        type: 'checkboxgroup',
        label: `${sldComLanguage('选择物流')}`,
        name: 'sel_express',
        placeholder: `${sldComLanguage('请选择物流')}`,
        initialValue: '',
        sldOptions: [],
        operate_obj: 'search_express',
        sldCheckShop: this.sldCheckExpress,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择物流公司')}`,
        }],
      },
      ],
      operateData: [],//modal框的数据
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('物流名称')}`,
        name: 'expressName',
        placeholder: `${sldComLanguage('请输入物流名称')}`,
      }],
      formValues: {},//搜索条件
      columns: [
        {
          title: ' ',
          dataIndex: 'bindId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('物流名称')}`,
          dataIndex: 'expressName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('显示状态')}`,
          dataIndex: 'expressState',
          align: 'center',
          width: 100,
          render: (text, record) => (
            <Switch
              onChange={(checked) => this.operateExpress({
                bindId: record.bindId,
                expressState: checked ? 1 : 0,
              }, 'switch')}
              checked={text == 1 ? true : false} valuepropname={'checked'}/>
          ),
        },
        {
          title: `${sldComLanguage('添加时间')}`,
          dataIndex: 'createTime',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('电子面单')}`,
          dataIndex: 'isSupportFaceSheet',
          align: 'center',
          width: 50,
          render: (text, record) => {
            return text ? sldComLanguage('支持') : sldComLanguage('不支持');
          },
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => {
            return <Fragment>
              {JSON.stringify(record.needFields) != '{}' &&
              sldtbaleOpeBtnText(`${sldComLanguage('电子面单配置')}`, () => this.operateExterfaceSheet(record))}
              {
                sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateExpress(record.bindId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))
              }
            </Fragment>;
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.getSetting();
  }

  cur_sel_data = [];//选择的物流公司
  cur_operate_data = {};//当前操作数据
  correspondenceData = {'partnerId':'customerName','partnerKey':'customerPwd','net':'sendSite','checkMan':'sendStaff'};//快递鸟对应的快递100的参数

  //获取系统配置
  getSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'express_type'},
      callback: (res) => {
        if (res.state == 200) {
          this.setState({expressType:res.data[0].value})
        }
      },
    });
  };

  //物流操作 type:switch 开关  del删除
  operateExpress = (id, type) => {
    this.setState({ submiting: true });
    const { params, formValues } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'express/del_express';
      param_data.bindId = id;
    } else if (type == 'switch') {
      dis_type = 'express/switch_express';
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
          this.get_list({ ...params, ...formValues });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //电子面单设置
  operateExterfaceSheet = (val) => {
    let { operateData } = this.state;
    operateData = [];
    for (let i in val.needFields) {
      let temp = val[i] ? val[i] : '';
      if(i == 'partnerId'||i == 'partnerKey'||i == 'net'||i == 'checkMan'){
        temp = val[this.correspondenceData[i]] ? val[this.correspondenceData[i]] : '';
      }
      operateData.push({
        type: 'input',
        label: val.needFields[i],
        name: i,
        extra: ``,
        placeholder: `${sldComLanguage('请输入')}${val.needFields[i]}`,
        initialValue: temp,
        maxLength: 50,
      });
    }
    if(val.expType!=undefined){
      operateData.push({
        type: 'input',
        label: `${sldComLanguage('产品类型')}`,
        name: 'expType',
        extra: `${sldComLanguage('默认为标准快递，可根据实际情况修改')}`,
        placeholder: `${sldComLanguage('请输入产品类型')}`,
        initialValue: val.expType,
        maxLength: 10,
      });
    }
    this.cur_operate_data = val;
    this.setState({
      modalVisible: true,
      title: `${sldComLanguage('电子面单配置')}`,
      operateData,
      modal_width: 500,
      type: 'setting',
    });
  };

  //添加物流公司
  addExpress = () => {
    this.setState({addExpressModalVisible:true});
  };

  sldCheckExpress = (data) => {
    this.cur_sel_data = data;
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'express/get_seller_express_lists',
      payload: params,
      callback: (res) => {
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
        this.setState({ initLoading: false });
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

  //表格列拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldHandleConfirm = (val) => {
    const { dispatch } = this.props;
    let { params, formValues, modalVisible, expressType } = this.state;
    let curParam = {bindId: this.cur_operate_data.bindId};
    if(expressType == 1){
      //快递类型，1-快递鸟，2-快递100
      curParam = {...curParam,...val};
    }else{
      for(let i in val){
        if(i == 'code'||i == 'expType'||i == 'monthCode'||i == 'partnerName'||i == 'payType'||i == 'templateId'||i == 'templateSize'){
          curParam[i] = val[i]
        }else if(i == 'partnerId'||i == 'partnerKey'||i == 'net'||i == 'checkMan'){
          curParam[this.correspondenceData[i]] = val[i];
        }
      }
    }
    //电子面单配置
    this.setState({ submiting: true });
    dispatch({
      type: 'express/set_exter_face_sheet',
      payload: curParam,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list({ ...params, ...formValues });
          modalVisible = false;
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false, modalVisible });
      },
    });
  };

  //搜索事件
  search = (data) => {
    const values = { ...data };
    for (let i in values) {
      if (values[i] == '') {
        delete values[i];
      }
    }
    this.setState({
      formValues: values,
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize, ...values });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize });
  };

  hideAddExpressModal = (flag) => {
    let {addExpressFlag} = this.state;
    addExpressFlag ++;
    if(flag){
      this.get_list({ pageSize: pageSize });
    }
    this.setState({addExpressModalVisible:false,addExpressFlag})
  }

  render() {
    const { selectedRows, columns, initLoading, data, modalVisible, search_data,scrToBottom,submiting,title,addExpressModalVisible,modal_width,operateData,addExpressFlag} = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, padding: 0 }}>
        <div className={global.tableListForm}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}/>
        </div>
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.addExpress(), `${sldComLanguage('添加物流公司')}`, 7, 7)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            selectedRows={selectedRows}
            data={data}
            rowKey={'bindId'}
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
          scrToBottom={scrToBottom}
          title={title}
          submiting={submiting}
          width={modal_width}
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={operateData}
        />
        {/*新增/编辑对话框-end*/}
        <AddExpress modalVisible={addExpressModalVisible} addExpressFlag={addExpressFlag} hideAddExpressModal={this.hideAddExpressModal}/>
      </div>
    );
  }
}
