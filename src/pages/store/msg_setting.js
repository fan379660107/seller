import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Switch } from 'antd';
import {
  failTip,
  sucTip,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  getTableNum,
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';

let pageSize = list_com_page_size_10;
let sthis = '';
@connect(({ store, common }) => ({
  store,
  common,
}))
@Form.create()
export default class MsgSetting extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',
      params: { pageSize: pageSize },//搜索条件
      formValues: {},//搜索条件、
      columns: [
        {
          title: ' ',
          dataIndex: 'tplCode',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('消息模板')}`,
          dataIndex: 'tplName',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('是否接收')}`,//是否接收
          dataIndex: 'isReceive',
          align: 'center',
          width: 80,
          render: (text, record) => (
            <Switch
              onChange={(checked) => this.operate({
                tplCode: record.tplCode,
                isReceive: checked ? 1 : 0,
              }, 'set')}
              checked={text == 1 ? true : false}
              valuepropname={'checked'}/>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  //消息接收设置操作  del：删除 edit：编辑 set_default：设置默认地址
  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'set') {
      dis_type = 'store/set_msg_receive_state';
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

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    let {data} = this.state;
    dispatch({
      type: 'store/get_msg_setting_lists',
      payload: { ...params },
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          data.list = res.data;
          this.setState({ data });
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

  render() {
    const { selectedRows, columns, initLoading, data } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('消息接收设置')}`, 0, 0, 10)}{/* 消息接收设置*/}
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 110 - 15}
            selectedRows={selectedRows}
            data={data}
            rowKey={'tplCode'}
            isCheck={false}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            onSldHandleSeleRow={this.onSldHandleSeleRow}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
            sldpagination={false}
          />
          {/*标准表格-end*/}
        </Spin>
      </div>
    );
  }
}
