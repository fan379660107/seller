/*
* 定金预售活动列表
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import Link from 'umi/link';
import {
  list_com_page_size_10,
  dragSldTableColumn,
  getTableNum,
  sldComLanguage,
  dateFormat,
  failTip,
  sucTip,
  sldHandlePaginationData,
  sldtbaleOpeBtnText,
  sldIconBtn,
  showHelpTip,
  sldPopConfirmDiy,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';
import { getSldEmptyH } from '../../../utils/utils';

let pageSize = list_com_page_size_10;
@connect(({ promotion,common }) => ({
  promotion,common
}))
@Form.create()
export default class PresaleLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('活动名称')}`,
        name: 'presellName',
        placeholder: `${sldComLanguage('请输入活动名称')}`,
      }, {
        type: 'rangepicker',
        label: `${sldComLanguage('定金时间')}`,
        name: 'search_activity_time',
        placeholder1: `${sldComLanguage('开始时间')}`,
        placeholder2: `${sldComLanguage('结束时间')}`,
      }, {
        type: 'select',
        label: `${sldComLanguage('状态')}`,
        name: 'state',
        placeholder: `${sldComLanguage('请选择活动状态')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '1', name: `${sldComLanguage('待发布')}` },
          { key: '2', name: `${sldComLanguage('未开始')}` },
          { key: '3', name: `${sldComLanguage('进行中')}` },
          { key: '4', name: `${sldComLanguage('已失效')}` },
          { key: '5', name: `${sldComLanguage('已结束')}` },
        ],
      }],
      formValues: {},//搜索条件
      columns: [
        {
          title: '',
          dataIndex: 'presellId',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('活动名称')}`,
          dataIndex: 'presellName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('定金时间')}`,
          dataIndex: 'startTime',
          align: 'center',
          width: 100,
          render: function (text, record) {
            return <div className={global.voucher_time_wrap}>
              <p>{text}</p>
              <p>~</p>
              <p>{record.endTime}</p>
            </div>;
          },
        },
        {
          title: `${sldComLanguage('活动状态')}`,
          dataIndex: 'stateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => (
            <Fragment>
              {(record.state == 1 || record.state == 2 || record.state == 3) && <Link to={{
                pathname: '/marketing/presale_bind_goods',
                query: {
                  id: record.presellId,
                  tar: 'view',
                  type: 1
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('查看商品')}`, () => null)}
              </Link>}

              <Link to={{
                pathname: '/marketing/presale_to_view',
                query: {
                  id: record.presellId,
                  tar: 'view',
                  type: 1
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('查看详情')}`, () => null)}
              </Link>
              <span className={global.splitLine}></span>
              <Link to={{
                pathname: '/marketing/presale_to_add',
                query: {
                  id: record.presellId,
                  tar: 'copy',
                  type:1
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('复制')}`, () => null)}
              </Link>
              {/* 只有待发布的才可以编辑 */}
              {record.state == 1 &&
                <Fragment>
                  <span className={global.splitLine}></span>
                  <Link to={{
                    pathname: '/marketing/presale_to_add',
                    query: {
                      id: record.presellId,
                      tar: 'edit',
                      type:1
                    },
                  }}>
                    {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => null)}
                  </Link>
                </Fragment>
              }
              {/* 只有待发布的才可以发布 */}
              {record.state == 1 &&
              <Fragment>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('发布后不可撤销，是否确定发布？')}`, () => this.operate(record.presellId,'publish'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('发布')}`, () => null))}
              </Fragment>
              }
              {/* 只有未开始、进行中的才可以失效 */}
              {(record.state == 2 || record.state == 3) &&
              <Fragment>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('确定失效该活动吗？')}`, () => this.operate(record.presellId,'invalid'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('失效')}`, () => null))}
              </Fragment>
              }
              {/* 只有待发布、已失效、已结束的才可以删除 */}
              {(record.state == 1 || record.state == 4 || record.state == 5) &&
              <Fragment>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除？')}`, () => this.operate(record.presellId,'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
              </Fragment>
              }
            </Fragment>
          ),
        },
      ],
    };
    //优惠券操作  type: invalid 失效 copy 复制  del 删除

  }

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let param_data = {};
    let dis_type = '';
    if (type == 'invalid') {
      dis_type = 'promotion/invalid_full_acm_pre';
      param_data.presellId = id;
    } else if (type == 'del') {
      dis_type = 'promotion/del_full_acm_pre';
      param_data.presellId = id;
    } else if (type == 'publish') {
      dis_type = 'promotion/publish_full_acm_pre';
      param_data.presellId = id;
    }
    this.setState({ submiting: true });
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
  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/get_all_presale_list',
      payload: { ...params },//列表默认返回定金预售
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if (res.data.length == 0 && this.state.params.current > 1) {
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

  //搜索事件
  search = (data) => {
    const values = { ...data };
    //活动时间处理
    if (values.search_activity_time) {
      values.startTime = values.search_activity_time[0] ? values.search_activity_time[0].format(dateFormat) + ' 00:00:00' : '';
      values.endTime = values.search_activity_time[1] ? values.search_activity_time[1].format(dateFormat) + ' 23:59:59' : '';
      delete values.search_activity_time;
    }
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
    const { selectedRows, search_data, columns, initLoading, data } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, paddingTop: 0 }}>
        {getSldEmptyH(10)}
        {showHelpTip(`${sldComLanguage('温馨提示：定金期间指定金预售活动从开始至结束时间段。')}`)}
        <div className={global.tableListForm}>
          <Search search_data={search_data}
            seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()} />
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          <Link to={{
            pathname: '/marketing/presale_to_add',
            query: {
              type: 1,
            },
          }}>
            {sldIconBtn(() => null, `${sldComLanguage('新建定金预售')}`, 7, 0, 12, 12, 3, 'fabu1', '#08A9B7')}
          </Link>
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 275-15}
            bordered={false}
            selectedRows={selectedRows}
            data={data}
            rowKey={'presellId'}
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
      </div>

    );
  }
}
