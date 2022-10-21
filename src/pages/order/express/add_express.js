import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Button, Form, Modal } from 'antd';
import {
  failTip,
  sucTip,
  list_com_page_size_10,
  sldHandlePaginationData,
  dragSldTableColumn,
  getTableNum,
  sldComLanguage,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';

let pageSize = list_com_page_size_10;
@connect(({ express }) => ({
  express,
}))
@Form.create()
export default class AddExpress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReset: false,
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
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
          dataIndex: 'expressId',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('物流名称')}`,
          dataIndex: 'expressName',
          align: 'center',
          width: 100,
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

      ],
    };
  }

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.addExpressFlag >= this.props.addExpressFlag){
      this.seaReset()
    }
  }

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'express/get_system_express_list',
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

  sldHandleCancle = (flag=false) => {
    this.props.hideAddExpressModal(flag);
    this.setState({
      formValues: {},
      params: { pageSize: pageSize },
      data: {},
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  sldHandleConfirm = (e) => {
    const { dispatch } = this.props;
    let { selectedRowKeys } = this.state;
    if (selectedRowKeys.length == 0) {
      failTip(`${sldComLanguage('请选择物流公司')}`);
      return;
    }
    this.setState({ submiting: true });
    dispatch({
      type: 'express/add_express',
      payload: { expressIds: selectedRowKeys.join(',') },
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list({ pageSize: pageSize });
          this.sldHandleCancle(true);
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
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
      isReset:true,
    },()=>{
      this.setState({isReset:false})
    });
    this.get_list({ pageSize: pageSize });
  };

  render() {
    const { selectedRows, columns, data, submiting, search_data,isReset } = this.state;
    const { modalVisible } = this.props;
    return (
      <div className={global.common_page} style={{ flex: 1, padding: 0 }}>
        <Modal
          centered
          title={sldComLanguage('添加物流公司')}
          width={550}
          visible={modalVisible}
          onCancel={() => this.sldHandleCancle()}
          footer={[
            <Button key="back" onClick={() => this.sldHandleCancle()}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting}
                    onClick={(e) => this.sldHandleConfirm(e)}>
              {sldComLanguage('确定')}
            </Button>]}
        >
          <div className={global.tableListForm}>
            <Search search_data={search_data} isReset={isReset}
                    seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}/>
          </div>
          {/*标准表格-start*/}
          <StandardTable
            selectedRows={selectedRows}
            data={data}
            rowKey={'expressId'}
            isCheck={true}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            onSldHandleSeleRow={this.onSldHandleSeleRow}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
          />
          {/*标准表格-end*/}
        </Modal>
      </div>

    );
  }
}
