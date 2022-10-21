import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
  sldIconBtn, failTip, sucTip, list_com_page_size_10, dragSldTableColumn, sldHandlePaginationData, sldLlineRtextAddGoodsAddMargin, formItemLayoutModal, getTableNum, sldComLanguage, getSldCopyData, sldtbaleOpeBtnText, sldPopConfirmDiy
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import Search from '@/components/Search/Search';
import Link from 'umi/link';

let pageSize = list_com_page_size_10;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class RelatedTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      upload_img_info: {},//上传的图片信息
      operateData: [],//操作的数据
      formValues: {},//搜索条件、
      columns: [
        {
          title: ' ',
          dataIndex: 'templateId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('版式名称')}`,
          dataIndex: 'templateName',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('版式位置')}`,
          dataIndex: 'templatePosition',
          align: 'center',
          width: 100,
          render: (text) => text==1?`${sldComLanguage('顶部')}`:`${sldComLanguage('底部')}`,
        },
        {
          title: `${sldComLanguage('操作')}`,
          width: 100,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              <Link to={{
                pathname: '/goods/related_template_to_edit',
                query: {
                  id: record.templateId,
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => null)}
              </Link>
              <span className={global.splitLine}></span>
              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operate(record.templateId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
            </Fragment>
          ),
        },
      ],
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('版式名称')}`,
        name: 'templateName',
        placeholder: `${sldComLanguage('版式名称')}`,
      },{
        type: 'select',
        label: `${sldComLanguage('版式位置')}`,
        name: 'templatePosition',
        placeholder: `${sldComLanguage('请选择版式位置')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: 1, name: `${sldComLanguage('顶部')}`},
          { key: 2, name: `${sldComLanguage('底部')}`},
        ],
      },
      ],
    };
  }

  cur_edit_id = '';//当前操作数据id
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  //编辑关联版式
  edit = (val) => {
    let { addData, operateData } = this.state;
    operateData = getSldCopyData(addData);
    for (let i in operateData) {
      operateData[i].initialValue = val[operateData[i].name];
    }
    this.cur_edit_id = val.templateId;//当前操作数据id
    this.setState({ type: 'edit', title: `${sldComLanguage('编辑关联版式')}`, operateData, modalVisible: true });
  };

  //版式公司操作  del：删除 edit：编辑
  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'product/del_related_template';
      param_data.templateIds = id;
    } else if (type == 'edit') {
      dis_type = 'product/edit_related_template';
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

  //添加关联版式
  add = () => {
    let { addData, operateData } = this.state;
    operateData = getSldCopyData(addData);
    this.setState({ modalVisible: true, type: 'add', title: `${sldComLanguage('添加关联版式')}`, operateData });
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'product/get_related_template_lists',
      payload: params,
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if ((res.data.list==null||res.data.list.length == 0) && this.state.params.current > 1) {
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
    const { type, addData } = this.state;
    const { dispatch } = this.props;
    let _this = this;
    val.expressState = val.expressState?1:0;
    this.setState({ submiting: true });
    if (type == 'edit') {
      val.templateId = this.cur_edit_id;
      this.operate(val, 'edit');
    } else {
      dispatch({
        type: 'product/add_related_template',
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
      params: { pageSize: pageSize }
    });
    this.get_list({ pageSize: pageSize, ...values });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      params: { pageSize: pageSize }
    });
    this.get_list({ pageSize: pageSize });
  };

  render() {
    const { selectedRows, search_data, columns, initLoading, data, submiting, operateData, modalVisible, title, search_con } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('关联版式')}`, 0, 0, 10)}
        <div className={global.tableListForm}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
          />
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          <Link to={{
            pathname: '/goods/related_template_to_edit',
          }}>
            {sldIconBtn(() => null, `${sldComLanguage('新增关联版式')}`, 7, 7)}
          </Link>
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 190 - 15}
            selectedRows={selectedRows}
            data={data}
            rowKey={'templateId'}
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
